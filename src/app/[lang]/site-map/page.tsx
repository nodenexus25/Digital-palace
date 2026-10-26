'use client';

import { useLanguage } from '@/app/components/LanguageProvider';
import LocalizedLink from '@/app/components/LocalizedLink';
import PageHead from '@/app/components/PageHead';
import TransText from '@/app/components/TransText';

export default function SitemapPage() {
  const { t } = useLanguage();
  const groups = [
    {
      label: t('footer.explore'),
      links: [
        { href: '/', label: t('nav.home') },
        { href: '/dynasties', label: t('nav.dynasties') },
        { href: '/forts', label: t('nav.forts') },
        { href: '/battles', label: t('nav.battles') },
        { href: '/weapons', label: t('nav.weapons') },
      ],
    },
    {
      label: t('footer.articles'),
      links: [
        { href: '/folklore', label: t('nav.folklore') },
        { href: '/stories', label: t('nav.stories') },
        { href: '/festivals', label: t('nav.festivals') },
        { href: '/blogs', label: t('nav.blogs') },
      ],
    },
    {
      label: t('footer.legalNav'),
      links: [
        { href: '/privacy', label: t('common.privacy') },
        { href: '/terms', label: t('common.terms') },
      ],
    },
  ];

  return (
    <main>
      <PageHead
        breadcrumb={[
          { label: <TransText k="nav.home" />, href: '/' },
          { label: t('sitemap.title') },
        ]}
        title={t('sitemap.title')}
        lead={t('sitemap.lastUpdated')}
      />

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {groups.map((group) => (
              <div key={group.label} className="card" style={{ padding: 28 }}>
                <p className="eyebrow">{group.label}</p>
                <ul className="space-y-2">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <LocalizedLink href={l.href}>{l.label}</LocalizedLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: 'var(--space-8)',
              color: 'var(--muted)',
              fontSize: 'var(--fs-caption)',
            }}
          >
            {t('sitemap.copyright')}
          </p>
        </div>
      </section>
    </main>
  );
}
