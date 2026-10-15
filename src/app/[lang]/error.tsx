'use client';

import { useEffect } from 'react';
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
    <div className="min-h-screen flex items-center justify-center bg-[#FDF6E3] p-4">
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-cinzel text-[#2C1810] mb-4">{t('error.title')}</h2>
        <p className="text-[#8B4513] font-playfair mb-8">{t('error.description')}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-[#8B4513] text-[#FDF6E3] rounded-lg font-cinzel hover:bg-[#5D4037] transition-colors"
        >
          {t('error.cta')}
        </button>
      </div>
    </div>
  );
}
