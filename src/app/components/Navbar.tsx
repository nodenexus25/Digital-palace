'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import LanguageToggle from './LanguageToggle';
import LocalizedLink from './LocalizedLink';
import { stripLocale } from './ThemedContainer';

const navigationLinks = [
  { href: '/dynasties', translationKey: 'nav.dynasties' },
  { href: '/forts', translationKey: 'nav.forts' },
  { href: '/battles', translationKey: 'nav.battles' },
  { href: '/weapons', translationKey: 'nav.weapons' },
  { href: '/folklore', translationKey: 'nav.folklore' },
  { href: '/stories', translationKey: 'nav.stories' },
  { href: '/festivals', translationKey: 'nav.festivals' },
  { href: '/blogs', translationKey: 'nav.blogs' },
];

/**
 * Site navigation. The layout renders it at the top of every page except the
 * home page, which places its own instance (variant="home") below the hero.
 */
export default function Navbar({ variant = 'layout' }: { variant?: 'layout' | 'home' }) {
  const route = stripLocale(usePathname() || '/');
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (variant === 'layout' && route === '/') return null;

  const isActive = (href: string) =>
    route === href || route.startsWith(`${href}/`) || (href === '/stories' && route.startsWith('/legends'));

  return (
    <nav className="relative z-50 bg-gradient-to-b from-[#1A0F0B] to-[#0F0806] border-b border-[#C9A24D]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-6">
          <LocalizedLink href="/" className="group flex flex-col items-start">
            <span className="text-[#D4AF37] font-cinzel font-bold text-3xl tracking-wider transition-colors duration-500">
              {t('nav.brandTitle')}
            </span>
            <span className="hidden md:block text-[#D4AF37]/80 font-cinzel text-xs uppercase tracking-[0.2em] transition-colors duration-500">
              {t('nav.brandSubtitle')}
            </span>
          </LocalizedLink>

          <div className="hidden lg:flex justify-center items-center gap-1">
            {navigationLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <LocalizedLink
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`px-3 xl:px-4 py-2 text-sm font-cinzel font-medium uppercase tracking-[0.15em] transition-colors duration-200 ease-out ${
                    active ? 'text-[#D4AF37]' : 'text-[#E6E1DC] hover:text-[#C9A24D] hover:bg-black/10'
                  }`}
                >
                  <span className="relative">
                    {t(link.translationKey)}
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-[1.5px] bg-[#D4AF37] transition-opacity duration-200 ease-out ${active ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </span>
                </LocalizedLink>
              );
            })}
          </div>

          <div className="hidden lg:flex justify-end items-center">
            <LanguageToggle />
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <LanguageToggle />
            <button
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="text-[#D4AF37] hover:text-[#C9A24D] transition-colors duration-300 p-2"
              aria-label={t('nav.toggleMenu')}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                <span className={`bg-current block transition-all duration-500 ease-in-out h-[1px] w-6 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`bg-current block transition-all duration-500 ease-in-out h-[1px] w-6 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`bg-current block transition-all duration-500 ease-in-out h-[1px] w-6 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        <div className={`lg:hidden transition-all duration-700 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-4 py-4 space-y-2 bg-[#0F0806]/95 backdrop-blur-md border-t border-[#C9A24D]/10">
            {navigationLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <LocalizedLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`block px-4 py-3 text-base font-cinzel font-medium uppercase tracking-widest transition-all duration-500 ${
                    active
                      ? 'text-[#D4AF37] border-l-2 border-[#C9A24D] bg-black/20 pl-6'
                      : 'text-[#E6E1DC] hover:text-[#C9A24D] hover:bg-black/10 hover:pl-6 border-l-2 border-transparent'
                  }`}
                >
                  {t(link.translationKey)}
                </LocalizedLink>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
