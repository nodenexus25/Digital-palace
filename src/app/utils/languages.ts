import en from '../i18n/en.json';
import hi from '../i18n/hi.json';

export type Language = 'en' | 'hi';

export type TranslationKeys = keyof typeof en;

export const languages: { code: Language; name: string; nativeName: string }[] = [
 { code: 'en', name: 'English', nativeName: 'English' },
 { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' }
];

export const translations = {
 en,
 hi
};

export function serverTranslate(lang: Language, key: string): string {
  const dict = translations[lang] as Record<string, string>;
  const fallback = translations.en as Record<string, string>;
  return dict?.[key] ?? fallback?.[key] ?? key;
}

type LocalizedItem = { lang: string; content: string; isDefault?: boolean };

export function getLocalizedContent(
  items: LocalizedItem[] | undefined,
  lang: Language
): string {
  if (!items || items.length === 0) return "";
  const exact = items.find(i => i.lang === lang)?.content;
  if (exact && exact.trim()) return exact;
  const def = items.find(i => i.isDefault)?.content;
  if (def && def.trim()) return def;
  const enText = items.find(i => i.lang === 'en')?.content;
  if (enText && enText.trim()) return enText;
  
  // Return the first available translation if nothing else found
  return items[0]?.content || "";
}
