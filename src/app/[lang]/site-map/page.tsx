'use client';
import { useLanguage } from '@/app/components/LanguageProvider';
import LocalizedLink from '@/app/components/LocalizedLink';

export default function SitemapPage() {
 const { t } = useLanguage();
 const links = [
   { href: '/', label: t('nav.home') },
   { href: '/dynasties', label: t('nav.dynasties') },
   { href: '/forts', label: t('nav.forts') },
   { href: '/battles', label: t('nav.battles') },
   { href: '/weapons', label: t('nav.weapons') },
   { href: '/folklore', label: t('nav.folklore') },
   { href: '/stories', label: t('nav.stories') },
   { href: '/festivals', label: t('nav.festivals') },
   { href: '/blogs', label: t('nav.blogs') },
   { href: '/privacy', label: t('common.privacy') },
   { href: '/terms', label: t('common.terms') },
 ];

 return (
 <main className="max-w-4xl mx-auto px-4 py-12 text-ivory">
 <h1 className="text-3xl font-cinzel text-gold mb-4">{t('sitemap.title')}</h1>
 <p className="font-cormorant text-sm opacity-80 mb-6">
 {t('sitemap.lastUpdated')}
 </p>
 <ul className="space-y-2">
 {links.map((l) => (
 <li key={l.href}>
 <LocalizedLink href={l.href} className="text-gold hover:text-saffron font-cormorant">
 {l.label}
 </LocalizedLink>
 </li>
 ))}
 </ul>
 <p className="font-cormorant text-xs opacity-60 mt-6">
 {t('sitemap.copyright')}
 </p>
 </main>
 );
}
