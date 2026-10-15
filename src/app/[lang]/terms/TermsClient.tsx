'use client';

import { useLanguage } from '@/app/components/LanguageProvider';

export default function TermsOfServicePage() {
 const { t } = useLanguage();
 return (
 <main className="max-w-4xl mx-auto px-4 py-12 text-ivory">
 <h1 className="text-3xl font-cinzel text-gold mb-4">{t('terms.title')}</h1>
 <p className="font-cormorant text-sm opacity-80 mb-6">
 {t('terms.lastUpdated')}
 </p>
 <section className="space-y-4">
 <p className="font-cormorant">
 {t('terms.body1')}
 </p>
 <p className="font-cormorant">
 {t('terms.body2')}
 </p>
 <p className="font-cormorant text-sm opacity-80">
 {t('terms.warning')}
 </p>
 <p className="font-cormorant text-xs opacity-60 mt-6">
 {t('terms.copyright')}
 </p>
 </section>
 </main>
 );
}