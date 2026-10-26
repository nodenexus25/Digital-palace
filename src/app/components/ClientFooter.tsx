'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from './LanguageProvider';
import LocalizedLink from './LocalizedLink';
import { SandCloud } from './atmosphere';

const DEVELOPER: { name: string; initials: string; photo: string | null } = {
  name: 'Rawlot Bhati Thakur Yuvraj Singh Rawal',
  initials: 'YSR',
  // TODO(asset): drop the portrait at /public/images/developer/profile.jpg and set
  // this to '/images/developer/profile.jpg'. Until then the medallion shows the
  // initials rather than requesting a file that does not exist.
  photo: null,
};

const EXPLORE_LINKS = [
  { href: '/dynasties', key: 'nav.dynasties' },
  { href: '/forts', key: 'nav.forts' },
  { href: '/battles', key: 'nav.battles' },
  { href: '/weapons', key: 'nav.weapons' },
];

const STORY_LINKS = [
  { href: '/legends', key: 'nav.stories' },
  { href: '/folklore', key: 'nav.folklore' },
  { href: '/festivals', key: 'nav.festivals' },
  { href: '/blogs', key: 'nav.blogs' },
];

const LEGAL_LINKS = [
  { href: '/privacy', key: 'common.privacy' },
  { href: '/terms', key: 'common.terms' },
  { href: '/site-map', key: 'sitemap.title' },
];

function LinkGroup({ title, links }: { title: string; links: { href: string; key: string }[] }) {
  const { t } = useLanguage();

  return (
    <div>
      <h2 className="site-footer__col-title">{title}</h2>
      <ul className="site-footer__links">
        {links.map((link) => (
          <li key={`${link.href}-${link.key}`}>
            <LocalizedLink href={link.href} className="site-footer__link">
              {t(link.key)}
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ClientFooter() {
  const { t } = useLanguage();
  const [photoFailed, setPhotoFailed] = useState(false);
  const [markFailed, setMarkFailed] = useState(false);

  return (
    <>
      <div className="footer-band">
        <SandCloud motes={70} />
      </div>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__grid">
            <div>
              {/* TODO(brand): /public/brand/rdp-mark-reversed.svg is supplied by the owner. */}
              {markFailed ? null : (
                <Image
                  src="/brand/rdp-mark-reversed.svg"
                  alt=""
                  width={64}
                  height={64}
                  unoptimized
                  className="site-footer__mark"
                  onError={() => setMarkFailed(true)}
                />
              )}
              <p className="site-footer__name">{t('nav.brandTitle')}</p>
              <p className="site-footer__epigraph">
                रण कर कर रज रज रंगे, रज रज ढंके रवि।
              </p>

              <div className="site-footer__dev">
                <div className="site-footer__dev-media">
                  {photoFailed || !DEVELOPER.photo ? (
                    DEVELOPER.initials
                  ) : (
                    <Image
                      src={DEVELOPER.photo}
                      alt={t('footer.developerPhotoAlt')}
                      width={56}
                      height={56}
                      onError={() => setPhotoFailed(true)}
                    />
                  )}
                </div>
                <div>
                  <p className="site-footer__dev-name">{DEVELOPER.name}</p>
                  <p className="site-footer__dev-role">{t('footer.developerRole')}</p>
                </div>
              </div>
            </div>

            <LinkGroup title={t('footer.explore')} links={EXPLORE_LINKS} />

            <LinkGroup title={t('common.stories')} links={STORY_LINKS} />

            <div className="site-footer__panel">
              <form onSubmit={(event) => event.preventDefault()}>
                <label htmlFor="footer-newsletter-email">{t('footer.newsletterLabel')}</label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  required
                  className="site-footer__input"
                  placeholder={t('footer.emailPlaceholder')}
                />
                <button type="submit" className="btn btn-war" aria-label={t('footer.subscribeAria')}>
                  {t('footer.enlist')}
                </button>
                <p className="site-footer__small">
                  {t('footer.newsletterFine')}{' '}
                  <LocalizedLink href="/privacy">{t('common.privacy')}</LocalizedLink>
                </p>
              </form>
            </div>
          </div>

          <div className="site-footer__bottom">
            <p className="site-footer__copy">
              © 2026 Rajputana Digital Palace · {t('footer.madeInIndia')}
            </p>
            <nav className="site-footer__legal" aria-label={t('footer.legalNav')}>
              {LEGAL_LINKS.map((link) => (
                <LocalizedLink key={link.href} href={link.href}>
                  {t(link.key)}
                </LocalizedLink>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
