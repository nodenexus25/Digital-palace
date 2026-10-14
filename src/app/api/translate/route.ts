import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';

/**
 * Translate proxy — calls Google's unofficial `translate_a/single` endpoint.
 *
 * ⚠️ This uses an unofficial, undocumented Google Translate endpoint. It can
 * break or be rate-limited at any time. Keep the request volume low and cache
 * aggressively (see LRU_CACHE_SIZE below).
 */

type Language = 'en' | 'hi';

type TranslateRequestBody = {
  texts: string[];
  source: Language;
  target: Language;
};

const MAX_TEXTS = 60;
const MAX_TEXT_LENGTH = 1500;
const MAX_TOTAL_LENGTH = 30000;
const LRU_CACHE_SIZE = 3000;
const UPSTREAM_TIMEOUT_MS = 8000;

// LRU cache backed by a Map (insertion order). On overflow the oldest entry is
// deleted. Keyed by `source:target:text`.
const getCache = () => {
  const g = globalThis as unknown as {
    __rajputanaTranslateCache?: Map<string, string>;
  };
  if (!g.__rajputanaTranslateCache) {
    g.__rajputanaTranslateCache = new Map<string, string>();
  }
  return g.__rajputanaTranslateCache;
};

const cacheSet = (key: string, value: string) => {
  const cache = getCache();
  // Re-insert to move to "most recent" position.
  if (cache.has(key)) cache.delete(key);
  cache.set(key, value);
  while (cache.size > LRU_CACHE_SIZE) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey === undefined) break;
    cache.delete(oldestKey);
  }
};

const isHindiText = (value: string) => /[\u0900-\u097F]/.test(value);

const getClientIp = (req: NextRequest): string => {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]?.trim() || 'unknown';
  return req.headers.get('x-real-ip') || 'unknown';
};

const isSameOrigin = (req: NextRequest): boolean => {
  const host = req.headers.get('host');
  if (!host) return false;
  const origin = req.headers.get('origin');
  if (origin) {
    try {
      const url = new URL(origin);
      return url.host === host;
    } catch {
      return false;
    }
  }
  const referer = req.headers.get('referer');
  if (referer) {
    try {
      const url = new URL(referer);
      return url.host === host;
    } catch {
      return false;
    }
  }
  // No origin/referer — allow (e.g. server-side fetch or direct API use).
  return true;
};

const splitIntoChunks = (value: string, chunkSize: number) => {
  if (value.length <= chunkSize) return [value];
  const chunks: string[] = [];
  let current = '';

  const tokens = value.split(/(\s+)/);
  for (const token of tokens) {
    if (current.length + token.length > chunkSize && current.trim()) {
      chunks.push(current);
      current = token;
      continue;
    }
    current += token;
  }
  if (current.trim()) chunks.push(current);
  return chunks;
};

const parseGoogleTranslateResponse = (data: unknown): string => {
  if (!Array.isArray(data)) return '';
  const first = data[0];
  if (!Array.isArray(first)) return '';
  return first
    .map((segment: unknown) =>
      Array.isArray(segment) ? String(segment[0] ?? '') : '',
    )
    .join('');
};

const translateChunk = async (
  text: string,
  source: Language,
  target: Language,
) => {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(
    text,
  )}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json,text/plain,*/*',
    },
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`Translate failed: ${res.status}`);
  }

  const data = (await res.json()) as unknown;
  return parseGoogleTranslateResponse(data);
};

const translateText = async (
  text: string,
  source: Language,
  target: Language,
) => {
  if (!text || !text.trim()) return text;
  if (source === target) return text;
  if (target === 'hi' && isHindiText(text)) return text;

  const cache = getCache();
  const cacheKey = `${source}:${target}:${text}`;
  const cached = cache.get(cacheKey);
  if (cached !== undefined) return cached;

  const chunks = splitIntoChunks(text, 1200);
  const translatedChunks: string[] = [];
  for (const chunk of chunks) {
    const translated = await translateChunk(chunk, source, target);
    translatedChunks.push(translated || chunk);
  }

  const result = translatedChunks.join('');
  cacheSet(cacheKey, result);
  return result;
};

const withConcurrencyLimit = async <T, R>(
  items: T[],
  limit: number,
  handler: (item: T) => Promise<R>,
) => {
  const results: R[] = new Array(items.length) as R[];
  let nextIndex = 0;

  const workers = new Array(Math.max(1, limit))
    .fill(null)
    .map(async () => {
      while (nextIndex < items.length) {
        const idx = nextIndex++;
        results[idx] = await handler(items[idx]);
      }
    });

  await Promise.all(workers);
  return results;
};

export async function POST(req: NextRequest) {
  // Same-origin check to prevent external abuse of this proxy.
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Per-IP rate limit: 60 requests / minute.
  const ip = getClientIp(req);
  const rl = rateLimit(`translate:${ip}`, { max: 60, windowMs: 60_000 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(rl.resetMs / 1000)),
        },
      },
    );
  }

  let body: TranslateRequestBody;
  try {
    body = (await req.json()) as TranslateRequestBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const texts = Array.isArray(body.texts) ? body.texts : [];
  const source = body.source === 'hi' ? 'hi' : 'en';
  const target = body.target === 'hi' ? 'hi' : 'en';

  // Only en → hi translation is supported (and used by the app).
  if (source !== 'en' || target !== 'hi') {
    return NextResponse.json(
      { error: 'Only en→hi translation is supported' },
      { status: 400 },
    );
  }

  // Validate counts and lengths.
  if (texts.length > MAX_TEXTS) {
    return NextResponse.json(
      { error: `Too many texts (max ${MAX_TEXTS})` },
      { status: 413 },
    );
  }

  let totalLength = 0;
  for (const t of texts) {
    if (typeof t !== 'string') {
      return NextResponse.json(
        { error: 'All texts must be strings' },
        { status: 400 },
      );
    }
    if (t.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { error: `Text too long (max ${MAX_TEXT_LENGTH} chars)` },
        { status: 413 },
      );
    }
    totalLength += t.length;
  }
  if (totalLength > MAX_TOTAL_LENGTH) {
    return NextResponse.json(
      { error: `Total text too long (max ${MAX_TOTAL_LENGTH} chars)` },
      { status: 413 },
    );
  }

  const uniqueTexts = Array.from(new Set(texts.filter((t) => typeof t === 'string')));

  const translations = await withConcurrencyLimit(uniqueTexts, 3, async (text) => {
    try {
      const translated = await translateText(text, source, target);
      return { text, translated };
    } catch {
      return { text, translated: text };
    }
  });

  const payload: Record<string, string> = {};
  for (const item of translations) {
    payload[item.text] = item.translated;
  }

  return NextResponse.json(
    { translations: payload },
    {
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    },
  );
}
