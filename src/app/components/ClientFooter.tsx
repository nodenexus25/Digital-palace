'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageProvider';

export default function ClientFooter() {
 const [mounted, setMounted] = useState(false);
 const { t } = useLanguage();

 useEffect(() => {
 setMounted(true);
 }, []);

 if (!mounted) return null;

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
 <li>{t('nav.dynasties')}</li>
 <li>{t('nav.forts')}</li>
 <li>{t('nav.stories')}</li>
 <li>{t('nav.festivals')}</li>
 <li>
 <Link href="/blogs" className="hover:text-gold">
 {t('nav.blogs')}
 </Link>
 </li>
 </ul>
 </div>
 <div>
 <h4 className="font-cinzel text-sm tracking-[0.2em] uppercase mb-3">{t('footer.newsletter')}</h4>
 <p className="font-cormorant text-sm text-ivory/80 mb-3">
 {t('footer.newsletterDesc')}
 </p>
 <div className="flex gap-2">
 <input
 type="email"
 aria-label={t('footer.emailPlaceholder')}
 placeholder={t('footer.emailPlaceholder')}
 className="flex-1 px-3 py-2 rounded-md border border-ivory/20 bg-maroon text-ivory text-sm placeholder:text-ivory/60 focus:outline-none focus:ring-2 focus:ring-gold"
 />
 <button className="px-4 py-2 rounded-md bg-gold text-maroon text-sm font-cinzel tracking-[0.16em] uppercase hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-gold">
 {t('footer.subscribe')}
 </button>
 </div>
 </div>
 </div>
 <div className="border-t border-maroon/40 py-4 text-center text-xs font-cormorant text-ivory/70">
 <div>{t('footer.madeInIndia')}</div>
 </div>
 </footer>
 );
}
