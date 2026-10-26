'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/app/components/LanguageProvider';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="section">
      <div className="container flex flex-col items-center text-center">
        {/* TODO: confirm /brand/rdp-mark.svg exists; swap for the final asset when available. */}
        <Image src="/brand/rdp-mark.svg" alt="" width={96} height={96} aria-hidden="true" />
        <h1 style={{ marginTop: 'var(--space-6)' }}>{t('error.title')}</h1>
        <p className="lead" style={{ marginTop: 'var(--space-4)' }}>{t('error.description')}</p>
        <button type="button" onClick={() => reset()} className="btn btn--primary" style={{ marginTop: 'var(--space-8)' }}>
          {t('error.cta')}
        </button>
      </div>
    </main>
  );
}
