 'use client';
 
 import { useLanguage, Language } from './LanguageProvider';
 
 export default function LanguageToggle() {
   const { currentLanguage, setLanguage, t } = useLanguage();
 
   const handleToggle = (lang: Language) => {
     if (lang !== currentLanguage) {
       setLanguage(lang);
     }
   };
 
   return (
     <div role="group" aria-label={t('common.language')} className="flex items-center gap-2">
       <button
         type="button"
         onClick={() => handleToggle('en')}
         className={`px-3 py-1 rounded-md text-sm font-cinzel uppercase tracking-widest transition-colors ${
           currentLanguage === 'en'
             ? 'bg-[#D4AF37] text-black'
             : 'bg-transparent border border-[#C9A24D]/30 text-[#E6E1DC] hover:bg-black/10'
         }`}
       >
         EN
       </button>
       <button
         type="button"
         onClick={() => handleToggle('hi')}
         className={`px-3 py-1 rounded-md text-sm font-cinzel uppercase tracking-widest transition-colors ${
           currentLanguage === 'hi'
             ? 'bg-[#D4AF37] text-black'
             : 'bg-transparent border border-[#C9A24D]/30 text-[#E6E1DC] hover:bg-black/10'
         }`}
       >
         हिंदी
       </button>
     </div>
   );
 }
