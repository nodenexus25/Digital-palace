'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLanguage, LanguageSelector } from './LanguageProvider';

interface NavLink {
 href: string;
 translationKey: string;
}

const navigationLinks: NavLink[] = [
 { href: '/dynasties', translationKey: 'nav.dynasties' },
 { href: '/forts', translationKey: 'nav.forts' },
 { href: '/battles', translationKey: 'nav.battles' },
 { href: '/weapons', translationKey: 'nav.weapons' },
 { href: '/folklore', translationKey: 'nav.folklore' },
 { href: '/stories', translationKey: 'nav.stories' },
 { href: '/festivals', translationKey: 'nav.festivals' },
 { href: '/blogs', translationKey: 'nav.blogs' }
];

export default function Navbar() {
 const pathname = usePathname();
 const { t } = useLanguage();
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 const getBasePath = () => {
 return '';
 };

 const normalizedPath = pathname || '/';

 const isActive = (href: string) => {
 return normalizedPath === href || normalizedPath.startsWith(`${href}/`);
 };

 const toggleMobileMenu = () => {
 setIsMobileMenuOpen(!isMobileMenuOpen);
 };

 return (
 <nav className="relative z-50 bg-gradient-to-b from-[#1A0F0B] to-[#0F0806] border-b border-[#C9A24D]/20 shadow-lg">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex justify-between items-center h-20 lg:grid lg:grid-cols-3 lg:items-center">
 {/* Logo Section */}
 <div className="flex items-center gap-4">
 <Link 
 href={getBasePath() || '/'} 
 className="group flex flex-col items-start"
 >
 <span className="text-[#D4AF37] font-cinzel font-bold text-3xl tracking-wider transition-colors duration-500">
 राजपूताना
 </span>
 <span className="hidden md:block text-[#D4AF37]/80 font-cinzel text-xs uppercase tracking-[0.2em] transition-colors duration-500">
 Digital Palace
 </span>
 </Link>
 </div>

 {/* Desktop Navigation (center aligned) */}
 <div className="hidden lg:flex justify-center items-center gap-1">
 {navigationLinks.map((link) => (
 <Link
 key={link.href}
 href={`${getBasePath()}${link.href}` || link.href}
 className={`
  px-4 py-2 text-sm font-cinzel font-medium uppercase tracking-[0.15em] transition-colors duration-200 ease-out
  ${isActive(link.href)
  ? 'text-[#D4AF37]'
  : 'text-[#E6E1DC] hover:text-[#C9A24D] hover:bg-black/10'
  }
 `}
 >
 <span className="relative">
  {t(link.translationKey)}
  <span className={`absolute -bottom-1 left-0 w-full h-[1.5px] bg-[#D4AF37] transition-opacity duration-200 ease-out ${isActive(link.href) ? 'opacity-100' : 'opacity-0'}`}></span>
 </span>
 </Link>
 ))}
 </div>

 {/* Language Selector (Right aligned) */}
 <div className="hidden lg:flex justify-end items-center">
 <LanguageSelector />
 </div>

 {/* Mobile Menu Button */}
 <div className="lg:hidden">
 <button
 onClick={toggleMobileMenu}
 className="text-[#D4AF37] hover:text-[#C9A24D] transition-colors duration-300 p-2"
 aria-label="Toggle mobile menu"
 >
 <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
 <span className={`bg-current block transition-all duration-500 ease-in-out h-[1px] w-6 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
 <span className={`bg-current block transition-all duration-500 ease-in-out h-[1px] w-6 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
 <span className={`bg-current block transition-all duration-500 ease-in-out h-[1px] w-6 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
 </div>
 </button>
 </div>
 </div>

 {/* Mobile Navigation Menu */}
 <div className={`lg:hidden transition-all duration-700 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
 <div className="px-4 py-4 space-y-2 bg-[#0F0806]/95 backdrop-blur-md border-t border-[#C9A24D]/10">
 {navigationLinks.map((link) => (
 <Link
 key={link.href}
 href={`${getBasePath()}${link.href}` || link.href}
 onClick={() => setIsMobileMenuOpen(false)}
 className={`
  block px-4 py-3 text-base font-cinzel font-medium uppercase tracking-widest transition-all duration-500
  ${isActive(link.href)
  ? 'text-[#D4AF37] border-l-2 border-[#C9A24D] bg-black/20 pl-6'
  : 'text-[#E6E1DC] hover:text-[#C9A24D] hover:bg-black/10 hover:pl-6 border-l-2 border-transparent'
  }
 `}
 >
 {t(link.translationKey)}
 </Link>
 ))}
 
 {/* Language Selector for Mobile */}
 <div className="px-4 py-4 mt-4 border-t border-[#C9A24D]/10">
 <div className="text-[#E6E1DC]/60 text-sm font-cinzel uppercase tracking-widest mb-3">
 {t('common.language')}
 </div>
 <LanguageSelector />
 </div>
 </div>
 </div>
 </div>
 </nav>
 );
}
