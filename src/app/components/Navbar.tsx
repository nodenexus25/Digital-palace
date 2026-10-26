'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import LanguageToggle from './LanguageToggle';
import LocalizedLink from './LocalizedLink';
import Mist from './atmosphere/Mist';
import { stripLocale } from './ThemedContainer';

// Six top-level destinations; Weapons and Folklore live under "More" so the
// bar stays legible at every width.
const PRIMARY_LINKS = [
  { href: '/dynasties', translationKey: 'nav.dynasties' },
  { href: '/forts', translationKey: 'nav.forts' },
  { href: '/battles', translationKey: 'nav.battles' },
  { href: '/legends', translationKey: 'nav.stories' },
  { href: '/festivals', translationKey: 'nav.festivals' },
  { href: '/blogs', translationKey: 'nav.blogs' },
];

const MORE_LINKS = [
  { href: '/weapons', translationKey: 'nav.weapons' },
  { href: '/folklore', translationKey: 'nav.folklore' },
];

/**
 * The brand lockup: reversed logo mark + the wordmark. The logo files are
 * supplied by the site owner — until they are dropped into /public/brand/
 * the mark is simply omitted rather than shown broken.
 */
function BrandLockup({ onMarkError }: { onMarkError?: () => void }) {
  const { t } = useLanguage();
  return (
    <>
      {/* TODO(brand): /public/brand/rdp-mark-reversed.svg is supplied by the owner. */}
      <Image
        src="/brand/rdp-mark-reversed.svg"
        alt=""
        width={40}
        height={40}
        unoptimized
        className="brand__mark"
        onError={onMarkError}
      />
      <span className="brand__text">
        <span className="brand__title">{t('nav.brandTitle')}</span>
        <span className="brand__sub">{t('nav.brandSubtitle')}</span>
      </span>
    </>
  );
}

/**
 * The one and only site header. It is rendered once, by the locale layout, and
 * sits fixed over the top of every page: fully transparent while the hero art
 * is still under it, then settling onto an ash plate with a hairline once the
 * reader has scrolled past 80px.
 */
export default function Navbar() {
  const route = stripLocale(usePathname() || '/');
  const { t } = useLanguage();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [markFailed, setMarkFailed] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Transparent over the hero, solid plate after 80px.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keep keyboard focus inside the sheet and freeze the page behind it.
  useEffect(() => {
    if (!isSheetOpen) return;
    const node = sheetRef.current;
    const focusables = () =>
      Array.from(node?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSheetOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isSheetOpen]);

  // A navigation (including the language switch) always closes the sheet.
  useEffect(() => {
    setIsSheetOpen(false);
  }, [route]);

  const isActive = (href: string) => route === href || route.startsWith(`${href}/`);
  const moreActive = MORE_LINKS.some((link) => isActive(link.href));
  const mark = markFailed ? null : <BrandLockup onMarkError={() => setMarkFailed(true)} />;

  return (
    <>
      <header className={`site-header site-header--over${isScrolled ? ' is-scrolled' : ''}`}>
        <div className="site-header__inner">
          <LocalizedLink href="/" className="brand">
            {mark}
          </LocalizedLink>

          <nav className="nav-pills" aria-label={t('nav.brandTitle')}>
            {PRIMARY_LINKS.map((link) => (
              <LocalizedLink
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="nav-pill"
              >
                {t(link.translationKey)}
              </LocalizedLink>
            ))}

            <details className="nav-more">
              <summary
                className="nav-pill"
                aria-current={moreActive ? 'page' : undefined}
                aria-label={t('nav.more')}
              >
                {t('nav.more')}
                <ChevronDown className="nav-more__caret" aria-hidden="true" />
              </summary>
              <div className="nav-more__menu">
                {MORE_LINKS.map((link) => (
                  <LocalizedLink key={link.href} href={link.href} className="nav-more__item">
                    {t(link.translationKey)}
                  </LocalizedLink>
                ))}
              </div>
            </details>
          </nav>

          <div className="header-actions">
            <LocalizedLink
              href="/site-map"
              className="icon-btn"
              aria-label={t('common.search')}
              title={t('common.search')}
            >
              <Search aria-hidden="true" />
            </LocalizedLink>

            <LanguageToggle className="header-switch" />

            <button
              type="button"
              className="icon-btn menu-btn"
              onClick={() => setIsSheetOpen(true)}
              aria-label={t('nav.toggleMenu')}
              aria-expanded={isSheetOpen}
              aria-controls="site-menu-sheet"
            >
              <Menu aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {isSheetOpen ? (
        <div
          id="site-menu-sheet"
          ref={sheetRef}
          className="menu-sheet"
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.brandTitle')}
        >
          <Mist layers={2} />
          <div className="menu-sheet__bar">
            <LocalizedLink href="/" className="brand">
              {mark}
            </LocalizedLink>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setIsSheetOpen(false)}
              aria-label={t('common.close')}
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <nav aria-label={t('nav.brandTitle')}>
            {PRIMARY_LINKS.map((link) => (
              <LocalizedLink
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="menu-sheet__link"
              >
                {t(link.translationKey)}
              </LocalizedLink>
            ))}

            <p className="menu-sheet__label">{t('nav.more')}</p>
            {MORE_LINKS.map((link) => (
              <LocalizedLink
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="menu-sheet__link"
              >
                {t(link.translationKey)}
              </LocalizedLink>
            ))}
          </nav>

          <div className="menu-sheet__foot">
            <LanguageToggle />
          </div>
        </div>
      ) : null}
    </>
  );
}
