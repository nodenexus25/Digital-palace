import 'server-only';
import type { Locale } from '@/i18n/config';

/**
 * Pick the text for `lang`. Every value is expected to exist in both
 * languages (enforced by `npm run check:i18n`). If one is ever missing, the
 * other language is used rather than rendering a hole, and the gap is
 * reported in development.
 */
export function pick<T>(
  lang: Locale,
  primary: T | null | undefined,
  fallback: T | null | undefined,
  where: string,
): T {
  if (primary !== null && primary !== undefined) return primary;
  if (process.env.NODE_ENV !== 'production') {
    reportGap(`${lang}:${where}`);
  }
  return (fallback ?? (Array.isArray(primary) ? [] : '')) as T;
}

const reported = new Set<string>();
function reportGap(key: string) {
  if (reported.has(key) || reported.size > 50) return;
  reported.add(key);
  console.warn(`[content] untranslated ${key}`);
}

/** Text record for one item, in both languages, keyed by collection + id. */
export type TextTable = Record<string, Record<string, Record<string, unknown>>>;

/**
 * Returns a field reader for one item: `get('name')` yields the localized
 * string, falling back to the other language only if untranslated.
 */
export function reader(lang: Locale, primary: TextTable, fallback: TextTable, coll: string, id: string) {
  const p = primary[coll]?.[id] ?? {};
  const f = fallback[coll]?.[id] ?? {};
  return function get<T = string>(field: string): T {
    return pick<T>(lang, p[field] as T, f[field] as T, `${coll}.${id}.${field}`);
  };
}

/** Same as `reader` but for list fields that may be absent entirely. */
export function listOr<T>(value: T[] | null | undefined): T[] {
  return Array.isArray(value) ? value : [];
}
