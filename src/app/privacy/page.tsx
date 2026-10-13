import { useLanguage } from '../components/LanguageProvider';

export default function PrivacyPolicyPage() {
 const { t } = useLanguage();
 return (
 <main className="max-w-4xl mx-auto px-4 py-12 text-ivory">
 <h1 className="text-3xl font-cinzel text-gold mb-4">{t('privacy.title')}</h1>
 <p className="font-cormorant text-sm opacity-80 mb-6">
 {t('privacy.lastUpdated')}
 </p>
 <section className="space-y-4">
 <p className="font-cormorant">
 {t('privacy.body1')}
 </p>
 <p className="font-cormorant">
 {t('privacy.body2')}
 </p>
 <p className="font-cormorant text-sm opacity-80">
 {t('privacy.warning')}
 </p>
 <p className="font-cormorant text-xs opacity-60 mt-6">
 {t('privacy.copyright')}
 </p>
 </section>
 </main>
 );
}
