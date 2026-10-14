import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_CHARS = 2500
const RATE_LIMIT_MAX = 30
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const REQUEST_TIMEOUT_MS = 20000

const ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1'

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]!.trim()
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp
  // Fallback; NextRequest doesn't expose socket directly in all runtimes.
  return 'unknown'
}

function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin') || req.headers.get('referer')
  if (!origin) return false // no origin header -> reject to be safe
  const host = req.headers.get('host')
  if (!host) return false
  try {
    const url = new URL(origin)
    return url.host === host
  } catch {
    return false
  }
}

export async function GET(): Promise<NextResponse> {
  const enabled = Boolean(process.env.ELEVENLABS_API_KEY)
  return NextResponse.json({ enabled })
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const ip = getClientIp(req)
  const rl = rateLimit(ip, { max: RATE_LIMIT_MAX, windowMs: RATE_LIMIT_WINDOW_MS })
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(rl.resetMs / 1000)),
        },
      },
    )
  }

  let body: { text?: string; voiceType?: 'male' | 'female'; lang?: 'en' | 'hi' }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const text = typeof body.text === 'string' ? body.text.trim() : ''
  if (!text) {
    return NextResponse.json({ error: 'text is required' }, { status: 400 })
  }
  if (text.length > MAX_CHARS) {
    return NextResponse.json(
      { error: `text exceeds ${MAX_CHARS} characters` },
      { status: 413 },
    )
  }

  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'TTS service not configured' }, { status: 503 })
  }

  const voiceId =
    body.voiceType === 'female'
      ? process.env.ELEVENLABS_VOICE_FEMALE
      : process.env.ELEVENLABS_VOICE_MALE
  if (!voiceId) {
    return NextResponse.json({ error: 'TTS voice not configured' }, { status: 503 })
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    const upstream = await fetch(`${ELEVENLABS_BASE_URL}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        Accept: 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.7,
          style: 0.1,
          use_speaker_boost: false,
        },
      }),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => '')
      console.error('[api/tts] ElevenLabs error:', upstream.status, errText)
      return NextResponse.json(
        { error: `TTS upstream error: ${upstream.status}` },
        { status: 502 },
      )
    }

    if (!upstream.body) {
      return NextResponse.json({ error: 'Empty TTS response' }, { status: 502 })
    }

    // Stream the audio back to the client.
    const stream = new ReadableStream({
      async start(controller) {
        const reader = upstream.body!.getReader()
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            controller.enqueue(value)
          }
        } finally {
          controller.close()
          reader.releaseLock()
        }
      },
    })

    return new NextResponse(stream, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      return NextResponse.json({ error: 'TTS request timed out' }, { status: 504 })
    }
    console.error('[api/tts] request failed:', err)
    return NextResponse.json({ error: 'TTS request failed' }, { status: 502 })
  }
}
