// Single source of truth for the site's languages. Every public URL starts
// with one of these segments (/en/..., /hi/...).

export const locales = ['en', 'hi'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Cookie that remembers the reader's language between visits. */
export const LOCALE_COOKIE = 'rajputana-language';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export function toLocale(value: unknown): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'hi' : 'en';
}

/** Each language's name written in that language (used by the toggle). */
export const localeNativeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिंदी',
};

/** Short toggle labels. */
export const localeShortNames: Record<Locale, string> = {
  en: 'EN',
  hi: 'हिं',
};

/** BCP-47 tags for <html lang>, Intl, and speech synthesis. */
export const localeTags: Record<Locale, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
};

export const ogLocales: Record<Locale, string> = {
  en: 'en_IN',
  hi: 'hi_IN',
};

/**
 * Replace (or add) the locale segment of a pathname.
 * `/en/forts` -> `/hi/forts`, `/forts` -> `/hi/forts`, `/` -> `/hi`.
 */
export function switchLocalePath(pathname: string, locale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) segments[0] = locale;
  else segments.unshift(locale);
  return '/' + segments.join('/');
}

/** Prefix an app-internal path with a locale. External links pass through. */
export function localizeHref(href: string, locale: Locale): string {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  if (href === '/' || href === '') return `/${locale}`;
  const path = href.startsWith('/') ? href : `/${href}`;
  const first = path.split('/')[1];
  if (isLocale(first)) return switchLocalePath(path, locale);
  return `/${locale}${path}`;
}
