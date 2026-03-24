'use client';
import Link from 'next/link';
import { useLanguage } from './components/LanguageProvider';

export default function NotFound() {
 const { t } = useLanguage();
 return (
 <div className="min-h-screen flex items-center justify-center bg-[#FDF6E3] p-4">
 <div className="text-center max-w-md">
 <div className="text-6xl mb-4"></div>
 <h2 className="text-3xl font-cinzel text-[#2C1810] mb-4">{t('notFound.title')}</h2>
 <p className="text-[#8B4513] font-playfair mb-8">
 {t('notFound.description')}
 </p>
 <Link 
 href="/"
 className="px-6 py-3 bg-[#8B4513] text-[#FDF6E3] rounded-lg font-cinzel hover:bg-[#5D4037] transition-colors"
 >
 {t('notFound.cta')}
 </Link>
 </div>
 </div>
 );
}
