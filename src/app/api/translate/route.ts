import { NextRequest, NextResponse } from 'next/server';

type Language = 'en' | 'hi';

type TranslateRequestBody = {
  texts: string[];
  source: Language;
  target: Language;
};

const getCache = () => {
  const g = globalThis as unknown as { __rajputanaTranslateCache?: Map<string, string> };
  if (!g.__rajputanaTranslateCache) {
    g.__rajputanaTranslateCache = new Map<string, string>();
  }
  return g.__rajputanaTranslateCache;
};

const isHindiText = (value: string) => /[\u0900-\u097F]/.test(value);

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
    .map((segment: unknown) => (Array.isArray(segment) ? String(segment[0] ?? '') : ''))
    .join('');
};

const translateChunk = async (text: string, source: Language, target: Language) => {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(
    text,
  )}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json,text/plain,*/*',
    },
  });

  if (!res.ok) {
    throw new Error(`Translate failed: ${res.status}`);
  }

  const data = (await res.json()) as unknown;
  return parseGoogleTranslateResponse(data);
};

const translateText = async (text: string, source: Language, target: Language) => {
  if (!text || !text.trim()) return text;
  if (source === target) return text;
  if (target === 'hi' && isHindiText(text)) return text;

  const cache = getCache();
  const cacheKey = `${source}:${target}:${text}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const chunks = splitIntoChunks(text, 1200);
  const translatedChunks: string[] = [];
  for (const chunk of chunks) {
    const translated = await translateChunk(chunk, source, target);
    translatedChunks.push(translated || chunk);
  }

  const result = translatedChunks.join('');
  cache.set(cacheKey, result);
  return result;
};

const withConcurrencyLimit = async <T, R>(
  items: T[],
  limit: number,
  handler: (item: T) => Promise<R>,
) => {
  const results: R[] = new Array(items.length) as R[];
  let nextIndex = 0;

  const workers = new Array(Math.max(1, limit)).fill(null).map(async () => {
    while (nextIndex < items.length) {
      const idx = nextIndex++;
      results[idx] = await handler(items[idx]);
    }
  });

  await Promise.all(workers);
  return results;
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as TranslateRequestBody;
  const texts = Array.isArray(body.texts) ? body.texts : [];
  const source = body.source === 'hi' ? 'hi' : 'en';
  const target = body.target === 'hi' ? 'hi' : 'en';

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

  return NextResponse.json({ translations: payload });
}

