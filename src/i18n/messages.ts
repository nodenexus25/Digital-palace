import 'server-only';
import en from '@/app/i18n/en.json';
import hi from '@/app/i18n/hi.json';
import type { Locale } from './config';

export type Messages = Record<string, string>;

const dictionaries: Record<Locale, Messages> = { en, hi };

/**
 * UI strings for one language. Only this language's dictionary is sent to
 * the browser (via the root layout), so a Hindi page never ships English UI
 * text and vice versa.
 */
export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}

/** Server-side lookup for metadata and other non-React text. */
export function translate(locale: Locale, key: string): string {
  const value = dictionaries[locale][key];
  if (value === undefined && process.env.NODE_ENV !== 'production') {
    console.warn(`[i18n] missing ${locale} key: ${key}`);
  }
  return value ?? key;
}
