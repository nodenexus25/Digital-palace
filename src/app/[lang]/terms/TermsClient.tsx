'use client';

import PageHead from '@/app/components/PageHead';
import TransText from '@/app/components/TransText';
import { useLanguage } from '@/app/components/LanguageProvider';

export default function TermsOfServicePage() {
  const { t } = useLanguage();
  return (
    <main>
      <PageHead
        breadcrumb={[
          { label: <TransText k="nav.home" />, href: '/' },
          { label: t('terms.title') },
        ]}
        title={t('terms.title')}
        lead={t('terms.lastUpdated')}
      />

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <p>{t('terms.body1')}</p>
            <p>{t('terms.body2')}</p>
            <p style={{ color: 'var(--muted)' }}>{t('terms.warning')}</p>
            <p
              style={{
                color: 'var(--muted)',
                fontSize: 'var(--fs-caption)',
                marginTop: 'var(--space-8)',
              }}
            >
              {t('terms.copyright')}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
