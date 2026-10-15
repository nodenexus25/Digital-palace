import type { Metadata } from 'next';
import { locales, type Locale } from './config';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rajputanadigitalpalace.com';

/**
 * Canonical + hreflang alternates for a page. `path` is the locale-less
 * route, e.g. '' for home or '/forts'.
 */
export function alternatesFor(lang: Locale, path: string): NonNullable<Metadata['alternates']> {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}${path}`;
  languages['x-default'] = `/en${path}`;
  return { canonical: `/${lang}${path}`, languages };
}
