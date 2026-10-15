'use client';

import Link from 'next/link';
import type { MouseEvent } from 'react';
import { useLanguage } from './LanguageProvider';
import { locales, localeNativeNames, localeShortNames, type Locale } from '@/i18n/config';

/**
 * Segmented EN | हिं switch. Each option is a real link to the same page in
 * the other language (crawlable, works without JavaScript, middle-click
 * opens a tab); a normal click is upgraded to the smooth in-place switch.
 */
export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { currentLanguage, setLanguage, hrefFor, t } = useLanguage();

  const onClick = (event: MouseEvent<HTMLAnchorElement>, locale: Locale) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    setLanguage(locale);
  };

  return (
    <div
      role="group"
      aria-label={t('common.language')}
      className={`relative inline-flex items-center rounded-full border border-[#C9A24D]/40 bg-black/30 p-1 ${className}`}
    >
      {/* Sliding highlight */}
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.45)] transition-transform duration-300 ease-out"
        style={{ transform: currentLanguage === 'en' ? 'translateX(0)' : 'translateX(100%)' }}
      />
      {locales.map((locale) => {
        const active = locale === currentLanguage;
        return (
          <Link
            key={locale}
            href={hrefFor(locale)}
            hrefLang={locale}
            lang={locale}
            prefetch={false}
            scroll={false}
            aria-current={active ? 'true' : undefined}
            title={localeNativeNames[locale]}
            onClick={(e) => onClick(e, locale)}
            className={`relative z-10 min-w-[3.25rem] rounded-full px-3 py-1.5 text-center text-sm font-semibold transition-colors duration-300 ${
              active ? 'text-black' : 'text-[#E6E1DC] hover:text-[#D4AF37]'
            }`}
          >
            {localeShortNames[locale]}
          </Link>
        );
      })}
    </div>
  );
}
