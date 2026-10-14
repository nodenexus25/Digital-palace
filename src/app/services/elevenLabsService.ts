// ElevenLabs TTS client — proxies all synthesis through /api/tts so the API
// key and voice IDs never reach the browser.

export type VoiceType = 'male' | 'female'
export type Lang = 'en' | 'hi'

const CHUNK_MAX = 2000
const API_PATH = '/api/tts'

// Cache the enabled state for the page lifetime so we don't hit /api/tts on
// every speak() call.
let enabledCache: boolean | null = null

/**
 * Split text into sentence-friendly chunks that never exceed CHUNK_MAX chars.
 * Mirrors the provider's splitIntoChunks but with a larger bound for the
 * server-side TTS endpoint (which allows up to 2500 chars).
 */
export function splitIntoChunks(src: string, maxLen = CHUNK_MAX): string[] {
  if (!src) return []
  const sentences = src
    .replace(/\s+/g, ' ')
    .split(/(?<=[।.!?])\s+|\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean)
  const chunks: string[] = []
  let buffer = ''
  for (const sentence of sentences) {
    if (!sentence) continue
    if ((buffer + ' ' + sentence).trim().length <= maxLen) {
      buffer = (buffer + ' ' + sentence).trim()
    } else {
      if (buffer) chunks.push(buffer)
      if (sentence.length <= maxLen) {
        buffer = sentence
      } else {
        const phrases = sentence.split(/(?<=[,;:])\s+/)
        let subBuf = ''
        for (const p of phrases) {
          if ((subBuf + ' ' + p).trim().length <= maxLen) {
            subBuf = (subBuf + ' ' + p).trim()
          } else {
            if (subBuf) chunks.push(subBuf)
            let remaining = p
            while (remaining.length > maxLen) {
              chunks.push(remaining.slice(0, maxLen))
              remaining = remaining.slice(maxLen)
            }
            subBuf = remaining
          }
        }
        buffer = subBuf
      }
    }
  }
  if (buffer) chunks.push(buffer)
  return chunks
}

class ElevenLabsService {
  private currentAudio: HTMLAudioElement | null = null
  private activeController: AbortController | null = null

  /**
   * Ask the server whether ElevenLabs is configured. Result is cached for the
   * page lifetime.
   */
  async isApiConfigured(): Promise<boolean> {
    if (enabledCache !== null) return enabledCache
    try {
      const res = await fetch(API_PATH, { method: 'GET' })
      if (!res.ok) {
        enabledCache = false
        return false
      }
      const data = (await res.json()) as { enabled?: boolean }
      enabledCache = Boolean(data.enabled)
      return enabledCache
    } catch {
      enabledCache = false
      return false
    }
  }

  /**
   * Synthesize a single chunk via /api/tts. Throws on any failure so the
   * caller (LanguageProvider) can fall back to browser TTS.
   */
  async synthesizeSpeech(
    text: string,
    voiceType?: VoiceType,
    _lang?: Lang,
  ): Promise<ArrayBuffer> {
    const controller = new AbortController()
    this.activeController = controller

    const res = await fetch(API_PATH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voiceType, lang: _lang }),
      signal: controller.signal,
    })

    if (!res.ok) {
      throw new Error(`TTS API error: ${res.status}`)
    }
    return await res.arrayBuffer()
  }

  private playAudio(audioBuffer: ArrayBuffer): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.stopCurrentAudio()
        const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' })
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio()
        audio.preload = 'none'
        audio.src = audioUrl
        this.currentAudio = audio

        audio.onended = () => {
          URL.revokeObjectURL(audioUrl)
          this.currentAudio = null
          resolve()
        }
        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl)
          this.currentAudio = null
          reject(new Error('Audio playback failed'))
        }
        audio.play().catch(reject)
      } catch (err) {
        reject(err)
      }
    })
  }

  private stopCurrentAudio(): void {
    if (this.currentAudio) {
      this.currentAudio.pause()
      this.currentAudio.currentTime = 0
      this.currentAudio = null
    }
    if (this.activeController) {
      this.activeController.abort()
      this.activeController = null
    }
  }

  /**
   * Speak text by splitting into ≤2000-char chunks and synthesizing each.
   * Throws on failure — the LanguageProvider owns the browser-TTS fallback.
   */
  async speakText(
    text: string,
    voiceType?: VoiceType,
    lang?: Lang,
  ): Promise<void> {
    const chunks = splitIntoChunks(text)
    for (const chunk of chunks) {
      const audioBuffer = await this.synthesizeSpeech(chunk, voiceType, lang)
      await this.playAudio(audioBuffer)
    }
  }

  stopSpeech(): void {
    this.stopCurrentAudio()
  }
}

export const elevenLabsService = new ElevenLabsService()
export default ElevenLabsService
