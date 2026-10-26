'use client';

import PageHead from '@/app/components/PageHead';
import TransText from '@/app/components/TransText';
import { useLanguage } from '@/app/components/LanguageProvider';

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();
  return (
    <main>
      <PageHead
        breadcrumb={[
          { label: <TransText k="nav.home" />, href: '/' },
          { label: t('privacy.title') },
        ]}
        title={t('privacy.title')}
        lead={t('privacy.lastUpdated')}
      />

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <p>{t('privacy.body1')}</p>
            <p>{t('privacy.body2')}</p>
            <p style={{ color: 'var(--muted)' }}>{t('privacy.warning')}</p>
            <p
              style={{
                color: 'var(--muted)',
                fontSize: 'var(--fs-caption)',
                marginTop: 'var(--space-8)',
              }}
            >
              {t('privacy.copyright')}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
