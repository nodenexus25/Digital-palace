'use client';

import { useLanguage } from '../LanguageProvider';
import { locales, localeNativeNames, localeShortNames, otherLocale } from '@/i18n/config';

/**
 * Compact per-story language switch, meant to sit beside the Listen button of
 * a story card. It flips the story it belongs to — and only that story —
 * between the page language and the other one.
 */
export default function StoryLanguageToggle({
  alt,
  onToggle,
  className = '',
}: {
  /** True while this story is being read in the other language. */
  alt: boolean;
  onToggle: () => void;
  className?: string;
}) {
  const { currentLanguage, t } = useLanguage();
  const active = alt ? otherLocale(currentLanguage) : currentLanguage;
  const label = `${t('common.storyLanguage')}: ${localeNativeNames[active]}`;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={alt}
      aria-label={label}
      title={label}
      className={`inline-flex shrink-0 items-center gap-0.5 rounded-full border border-current/40 p-0.5 text-[10px] font-cinzel tracking-[0.12em] uppercase transition-opacity hover:opacity-100 ${className}`}
    >
      {locales.map((locale) => (
        <span
          key={locale}
          lang={locale}
          aria-hidden="true"
          className={`rounded-full px-2 py-0.5 ${locale === active ? 'bg-[#C9A24D] font-semibold text-black' : 'opacity-60'}`}
        >
          {localeShortNames[locale]}
        </span>
      ))}
    </button>
  );
}
