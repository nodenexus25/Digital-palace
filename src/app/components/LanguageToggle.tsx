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
    <div role="group" aria-label={t('common.language')} className={`lang-switch ${className}`}>
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
            className="lang-switch__option"
          >
            {localeShortNames[locale]}
          </Link>
        );
      })}
    </div>
  );
}
