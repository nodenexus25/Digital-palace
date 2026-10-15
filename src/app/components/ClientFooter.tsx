'use client';

import { useLanguage } from './LanguageProvider';
import LocalizedLink from './LocalizedLink';

const QUICK_LINKS = [
  { href: '/dynasties', key: 'nav.dynasties' },
  { href: '/forts', key: 'nav.forts' },
  { href: '/stories', key: 'nav.stories' },
  { href: '/festivals', key: 'nav.festivals' },
  { href: '/blogs', key: 'nav.blogs' },
];

const LEGAL_LINKS = [
  { href: '/privacy', key: 'common.privacy' },
  { href: '/terms', key: 'common.terms' },
  { href: '/site-map', key: 'sitemap.title' },
];

export default function ClientFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-maroon/20 bg-maroon-dark text-ivory mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-cinzel text-xl mb-3">{t('footer.title')}</h3>
          <p className="font-cormorant text-sm text-ivory/80">{t('footer.subtitle')}</p>
        </div>
        <div>
          <h4 className="font-cinzel text-sm tracking-[0.2em] uppercase mb-3">{t('footer.quickLinks')}</h4>
          <ul className="space-y-2 text-sm font-cormorant text-ivory/80">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <LocalizedLink href={link.href} className="hover:text-gold">
                  {t(link.key)}
                </LocalizedLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-cinzel text-sm tracking-[0.2em] uppercase mb-3">{t('footer.newsletter')}</h4>
          <p className="font-cormorant text-sm text-ivory/80 mb-3">{t('footer.newsletterDesc')}</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              aria-label={t('footer.emailPlaceholder')}
              placeholder={t('footer.emailPlaceholder')}
              className="flex-1 px-3 py-2 rounded-md border border-ivory/20 bg-maroon text-ivory text-sm placeholder:text-ivory/60 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-gold text-maroon text-sm font-cinzel tracking-[0.16em] uppercase hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              {t('footer.subscribe')}
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-maroon/40 py-4 text-center text-xs font-cormorant text-ivory/70 space-y-2">
        <nav className="flex justify-center gap-4" aria-label={t('footer.legalNav')}>
          {LEGAL_LINKS.map((link) => (
            <LocalizedLink key={link.href} href={link.href} className="hover:text-gold">
              {t(link.key)}
            </LocalizedLink>
          ))}
        </nav>
        <div>{t('footer.madeInIndia')}</div>
      </div>
    </footer>
  );
}
