'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../components/LanguageProvider';
import EnhancedStoryModal from '../components/EnhancedStoryModal';
import Hero from '../components/Hero';
import LazyImage from '../components/LazyImage';
import { Dynasty } from '../../types/frontend';
import { historicalPeriods, DYNASTY_SEAL_IMAGES, DYNASTY_MAIN_IMAGES } from './constants';

interface DynastiesClientProps {
 dynasties: Dynasty[];
}

const DynastySeal = ({ id }: { id: string }) => {
 const sealImage = DYNASTY_SEAL_IMAGES[id];

 if (sealImage) {
 return (
 <LazyImage
 src={sealImage}
 alt={`${id} Seal`}
 className="w-full h-full object-contain p-0.5"
 />
 );
 }

 // Fallback for dynasties without a mapped image
 const sealClass = "w-full h-full text-maroon drop-shadow-sm";
 
 const SunSeal = () => (
 <svg viewBox="0 0 100 100" className={sealClass} fill="currentColor">
 <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="4" fill="none" />
 <circle cx="50" cy="50" r="12" fill="currentColor" opacity="0.6" />
 <path d="M50 10 L50 25 M50 90 L50 75 M10 50 L25 50 M90 50 L75 50 M22 22 L32 32 M78 78 L68 68 M22 78 L32 68 M78 22 L68 32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
 </svg>
 );
 
 const RathoreSeal = () => (
 <svg viewBox="0 0 100 100" className={sealClass} fill="currentColor">
 <path d="M15 45 C 30 25, 45 35, 50 50 C 55 35, 70 25, 85 45 C 75 60, 50 85, 50 85 C 50 85, 25 60, 15 45 Z" fill="none" stroke="currentColor" strokeWidth="3" />
 <circle cx="50" cy="45" r="10" fill="currentColor" />
 <path d="M50 15 L50 30 M25 25 L35 35 M75 25 L65 35" stroke="currentColor" strokeWidth="2" />
 </svg>
 );

 const MoonSeal = () => (
 <svg viewBox="0 0 100 100" className={sealClass} fill="currentColor">
 <path d="M35 25 A 35 35 0 1 0 75 75 A 25 25 0 1 1 35 25" fill="currentColor" />
 <polygon points="65,35 67,42 74,42 69,46 71,53 65,49 59,53 61,46 56,42 63,42" fill="currentColor" opacity="0.7" />
 </svg>
 );

 const AgniSeal = () => (
 <svg viewBox="0 0 100 100" className={sealClass} fill="currentColor">
 <path d="M20 75 L80 75 L70 90 L30 90 Z" fill="none" stroke="currentColor" strokeWidth="3" />
 <path d="M30 70 Q 30 40 50 15 Q 70 40 70 70" fill="currentColor" opacity="0.8" />
 <path d="M50 25 Q 40 50 50 70 Q 60 50 50 25" fill="#fff" opacity="0.3" />
 </svg>
 );

 if (id.includes('mewar') || id.includes('amber')) return <SunSeal />;
 if (id.includes('rathore')) return <RathoreSeal />;
 if (id.includes('bhati') || id.includes('tomar')) return <MoonSeal />;
 return <AgniSeal />;
};

export default function DynastiesPage({ dynasties }: DynastiesClientProps) {
 const { speak, stopSpeaking, isSpeaking } = useLanguage();
 // Chronology helpers
 const getStartYearFromPeriod = (period: string): number => {
 if (!period) return Number.POSITIVE_INFINITY;
 const p = period
 .toLowerCase()
 .replace(/\[.*?\]/g, '')
 .replace(/\b(c\.|ca\.|circa)\b/g, '')
 .replace(/—|–|−/g, '-')
 .trim();

 const isBCE = /\b(bce|bc)\b/.test(p);

 // Handle century expressions like "12th century CE"
 const centuryMatch = p.match(/(\d{1,2})\s*(st|nd|rd|th)?\s*century/);
 if (centuryMatch) {
 const centuryNum = parseInt(centuryMatch[1], 10);
 const startYear = (centuryNum - 1) * 100; // earliest year of that century
 return isBCE ? -startYear : startYear;
 }

 // Handle range or single year; take the first occurrence as start
 const yearMatch = p.match(/(\d{3,4})/);
 if (yearMatch) {
 const year = parseInt(yearMatch[1], 10);
 return isBCE ? -year : year;
 }

 // Fallback: place unknowns at the end
 return Number.POSITIVE_INFINITY;
 };

 const comparePeriodStart = (a: string, b: string) => {
 return getStartYearFromPeriod(a) - getStartYearFromPeriod(b);
 };
 const [selectedPeriod, setSelectedPeriod] = useState('all');
 const [selectedKing, setSelectedKing] = useState<Dynasty['notableRulers'][0] | null>(null);
 const [searchTerm, setSearchTerm] = useState('');
 const [isListening, setIsListening] = useState(false);
 const [showRulersModal, setShowRulersModal] = useState<Dynasty | null>(null);
 // Prevent hydration mismatches by rendering dynamic counts only on client
 const [isClient, setIsClient] = useState(false);
 useEffect(() => {
 setIsClient(true);
 }, []);

 const handleListen = (text: string) => {
 if (isSpeaking) {
 stopSpeaking();
 setIsListening(false);
 return;
 }

 stopSpeaking();
 speak(text);
 setIsListening(true);
 };

 const showAllRulers = (dynasty: Dynasty) => {
 setShowRulersModal(dynasty);
 };

 useEffect(() => {
 if (!isSpeaking && isListening) {
 setIsListening(false);
 }
 }, [isSpeaking, isListening]);

 const filteredDynasties = dynasties.filter(dynasty => {
 const matchesSearch = dynasty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
 dynasty.hindiName.includes(searchTerm) ||
 dynasty.region.toLowerCase().includes(searchTerm.toLowerCase());
 
 const matchesPeriod = selectedPeriod === 'all' || dynasty.historicalPeriod === selectedPeriod;
 
 return matchesSearch && matchesPeriod;
 });

 const { t, currentLanguage } = useLanguage();

  type RulerWithEnglish = Dynasty['notableRulers'][0] & {
    englishBattles?: string[];
    englishHeroicDeeds?: string[];
    englishLegacy?: string;
    englishAncestry?: string;
    englishCulturalContributions?: string[];
    englishFullStory?: string;
  };
  const hasEnglish = (r: Dynasty['notableRulers'][0]): r is RulerWithEnglish => {
    const rec = (r as unknown) as Record<string, unknown>;
    return (
      'englishBattles' in rec ||
      'englishHeroicDeeds' in rec ||
      'englishLegacy' in rec ||
      'englishAncestry' in rec ||
      'englishCulturalContributions' in rec ||
      'englishFullStory' in rec
    );
  };

 return (
 <div className="min-h-screen bg-ivory">
 {/* Navigation */}

 {/* Hero Section */}
 <Hero
 title={t('dynasties.title')}
 subtitle={t('dynasties.subtitle')}
 description={
 currentLanguage === 'hi'
 ? 'वीरता, सम्मान और गौरव की परंपरा को आगे बढ़ाने वाले महान राजवंशों का इतिहास। प्रत्येक राजवंश ने अपनी अनूठी विरासत और अमर कीर्ति से राजस्थान की संस्कृति को समृद्ध बनाया है।'
 : 'The great dynasties that carried forward a tradition of valor, honor, and enduring legacy across Rajputana.'
 }
 />

 {/* Dynasty Stats - Moved outside Hero to maintain consistent dimensions */}
 <div className="relative bg-[#2C1810] border-b-4 border-[#D4B483] -mt-1 pb-12">
 {/* Texture Overlay to match Hero */}
 <div className="absolute inset-0 texture-mandala opacity-10 pointer-events-none z-0"></div>
 <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#2C1810]/60 to-transparent z-0"></div>
 
 <div className="container mx-auto px-4 relative z-10">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
 <div className="bg-ivory/10 backdrop-blur-sm rounded-xl p-6 border border-gold/20 text-center">
 <div className="text-3xl font-bold text-gold mb-2" style={{ fontFamily: "var(--heading-font)" }} suppressHydrationWarning>
  {isClient ? dynasties.length : null}
 </div>
 <div className="text-sm font-cormorant text-ivory/80">महान राजवंश</div>
 <div className="text-xs font-cormorant text-ivory/60">Great Dynasties</div>
 </div>
 <div className="bg-ivory/10 backdrop-blur-sm rounded-xl p-6 border border-gold/20 text-center">
 <div className="text-3xl font-bold text-gold mb-2" style={{ fontFamily: "var(--heading-font)" }} suppressHydrationWarning>
  {isClient ? dynasties.reduce((total, dynasty) => total + dynasty.notableRulers.length, 0) : null}
 </div>
 <div className="text-sm font-cormorant text-ivory/80">वीर शासक</div>
 <div className="text-xs font-cormorant text-ivory/60">Noble Rulers</div>
 </div>
 <div className="bg-ivory/10 backdrop-blur-sm rounded-xl p-6 border border-gold/20 text-center">
 <div className="text-3xl font-bold text-gold mb-2" style={{ fontFamily: "var(--heading-font)" }}>1200+</div>
 <div className="text-sm font-cormorant text-ivory/80">वर्षों का इतिहास</div>
 <div className="text-xs font-cormorant text-ivory/60">Years of History</div>
 </div>
 <div className="bg-ivory/10 backdrop-blur-sm rounded-xl p-6 border border-gold/20 text-center">
 <div className="text-3xl font-bold text-gold mb-2" style={{ fontFamily: "var(--heading-font)" }}>6</div>
 <div className="text-sm font-cormorant text-ivory/80">ऐतिहासिक काल</div>
 <div className="text-xs font-cormorant text-ivory/60">Historical Periods</div>
 </div>
 </div>
 </div>
 </div>

 {/* Enhanced Search and Filter */}
 <section className="py-12 bg-sandstone-light/30">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gold/20">
 <div className="text-center mb-8">
 <h3 className="font-cinzel font-bold text-2xl text-maroon mb-2">राजवंश खोजें</h3>
 <p className="font-cormorant text-charcoal/70">अपने पसंदीदा राजवंश और काल का चयन करें</p>
 </div>
 
 <div className="flex flex-col lg:flex-row gap-6 items-center">
 {/* Search Bar */}
 <div className="relative flex-1 max-w-md">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
  <span className="text-saffron text-lg"></span>
 </div>
 <input
  type="text"
  placeholder="राजवंश का नाम खोजें... Search dynasties"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full pl-10 pr-4 py-3 border-2 border-saffron/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron focus:border-saffron bg-ivory font-cormorant text-charcoal placeholder-charcoal/50"
 />
 </div>
 
 {/* Period Filters */}
 <div className="flex-1">
 <div className="mb-3">
  <span className="font-cinzel font-semibold text-maroon text-sm">ऐतिहासिक काल:</span>
 </div>
 <div className="flex gap-2 flex-wrap">
  <button
  onClick={() => setSelectedPeriod('all')}
  className={`px-4 py-2 rounded-xl font-cinzel text-sm transition-all duration-300 ${
  selectedPeriod === 'all'
  ? 'bg-saffron-gradient text-maroon shadow-lg transform scale-105'
  : 'bg-ivory border-2 border-saffron/30 text-saffron hover:bg-saffron/10 hover:border-saffron hover:shadow-md'
  }`}
  >
  सभी काल
  </button>
  {Object.entries(historicalPeriods).map(([key, period]) => (
  <button
  key={key}
  onClick={() => setSelectedPeriod(key)}
  className={`px-4 py-2 rounded-xl font-cinzel text-sm transition-all duration-300 ${
  selectedPeriod === key
  ? 'bg-saffron-gradient text-maroon shadow-lg transform scale-105'
  : 'bg-ivory border-2 border-saffron/30 text-saffron hover:bg-saffron/10 hover:border-saffron hover:shadow-md'
  }`}
  title={`${period.period} - ${period.description}`}
  >
  {period.hindiTitle}
  </button>
  ))}
 </div>
 </div>
 </div>
 
 {/* Results Count */}
 <div className="mt-6 text-center">
 <span className="font-cormorant text-charcoal/70" suppressHydrationWarning>
 {isClient ? (
  <>
  {filteredDynasties.length} राजवंश मिले • {filteredDynasties.length} dynasties found
  </>
 ) : null}
 </span>
 </div>
 </div>
 </div>
 </section>

 {/* Dynasties Grid */}
 <section className="py-16 bg-ivory">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {filteredDynasties.map((dynasty) => (
 <div
 key={dynasty.id}
 onClick={() => showAllRulers(dynasty)}
 className="group relative bg-ivory border border-gold/30 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer flex flex-col h-full"
 >
 <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-sandstone-light/20 to-ivory border-b border-gold/30 flex items-center justify-center overflow-hidden rajasthani-pattern">
  <LazyImage
  src={DYNASTY_MAIN_IMAGES[dynasty.id] || '/images/dynasties/gallery/kumbhalgarh-fort.jpg'}
  alt={`${dynasty.name} Main`}
  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  fill
  placeholder="/images/dynasties/gallery/kumbhalgarh-fort.jpg"
  />
 </div>

 <div className="p-4 pt-9 flex flex-col flex-grow text-center relative">
  {/* Royal Seal - Scaled Down (w-14 h-14) */}
  <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-ivory rounded-full p-2 border border-gold/40 shadow-lg flex items-center justify-center z-10">
  <DynastySeal id={dynasty.id} />
  </div>

  {/* 2. Dynasty Title - Scaled Down */}
  <h3 className="font-serif text-xl font-bold text-shehrawat-blood-red mb-1 leading-tight">
  {dynasty.hindiName}
  </h3>
  <h4 className="font-display text-sm text-charcoal/70 mb-3 tracking-wide uppercase">
  {dynasty.name}
  </h4>

  {/* 3. Core Identity Line - Compact */}
  <div className="mb-3 relative">
  <span className="block w-10 h-px bg-gold/60 mx-auto mb-2"></span>
  <p className="font-body text-base italic text-charcoal leading-snug min-h-[2.5rem] line-clamp-2 px-1">
  &quot;{dynasty.significance}&quot;
  </p>
  <span className="block w-10 h-px bg-gold/60 mx-auto mt-2"></span>
  </div>

  {/* 4. Key Facts (Inline) - Tighter Spacing */}
  <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-charcoal/90 mb-4 font-body font-medium">
  <div className="flex items-center gap-1">
  <span className="text-gold-dark text-base"></span>
  <span>{dynasty.region}</span>
  </div>
  <div className="flex items-center gap-1">
  <span className="text-gold-dark text-base"></span>
  <span>{dynasty.capital}</span>
  </div>
  <div className="flex items-center gap-1">
  <span className="text-gold-dark text-base"></span>
  <span>{dynasty.founder}</span>
  </div>
  </div>

  {/* 5. Action CTA - Compact Button */}
  <div className="mt-auto">
  <button
  onClick={(e) => {
  e.stopPropagation();
  showAllRulers(dynasty);
  }}
  className="w-full bg-transparent border border-maroon text-maroon group-hover:bg-maroon group-hover:text-ivory font-serif font-bold py-1.5 px-3 transition-all duration-300 uppercase tracking-widest text-[10px] shadow-sm hover:shadow-md"
  >
  सभी शासक देखें / View All Rulers
  </button>
  </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Enhanced King Detail Modal */}
 {selectedKing && (
 <EnhancedStoryModal
 story={{
 ...selectedKing,
              characters:
                currentLanguage === 'en' && hasEnglish(selectedKing) && selectedKing.englishBattles
                  ? selectedKing.englishBattles
                  : selectedKing.majorBattles || [],
              themes:
                currentLanguage === 'en' && hasEnglish(selectedKing) && selectedKing.englishHeroicDeeds
                  ? selectedKing.englishHeroicDeeds
                  : selectedKing.heroicDeeds || [],
              moralLesson:
                currentLanguage === 'en' && hasEnglish(selectedKing) && selectedKing.englishLegacy
                  ? selectedKing.englishLegacy
                  : selectedKing.legacy,
              historicalContext:
                currentLanguage === 'en' && hasEnglish(selectedKing) && selectedKing.englishAncestry
                  ? selectedKing.englishAncestry
                  : selectedKing.ancestry,
              culturalImpact:
                currentLanguage === 'en' && hasEnglish(selectedKing) && selectedKing.englishCulturalContributions
                  ? selectedKing.englishCulturalContributions?.join('. ')
                  : selectedKing.culturalContributions?.join('. ') || '',
 englishName: selectedKing.name,
              fullStory:
                currentLanguage === 'en' && hasEnglish(selectedKing) && selectedKing.englishFullStory
                  ? selectedKing.englishFullStory
 : [
 selectedKing.legacy,
 Array.isArray(selectedKing.significance)
 ? selectedKing.significance.join('. ')
 : selectedKing.significance,
 Array.isArray(selectedKing.heroicDeeds)
 ? selectedKing.heroicDeeds.join('. ')
 : undefined,
 Array.isArray(selectedKing.majorBattles)
 ? selectedKing.majorBattles.join('. ')
 : undefined
 ]
 .filter((part) => typeof part === 'string' && part.length > 0)
 .join('\n\n') || ''
 }}
            onClose={() => {
              stopSpeaking();
              setSelectedKing(null);
            }}
 onListen={handleListen}
 isSpeaking={isSpeaking}
 isListening={isListening}
 />
 )}

 {/* All Rulers Modal */}
 {showRulersModal && (
 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
 <div className="bg-ivory rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
 <div className="saffron-gradient p-6 border-b border-saffron/20">
 <div className="flex items-center justify-between">
 <div className="flex items-center space-x-3">
  <span className="text-3xl">{showRulersModal.emblem}</span>
  <div>
  <h2 className="font-cinzel font-bold text-2xl text-maroon">{showRulersModal.hindiName}</h2>
  <p className="font-playfair text-saffron">{showRulersModal.name}</p>
  </div>
 </div>
        <button
          onClick={() => setShowRulersModal(null)}
          aria-label="Back to dynasties"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-cinzel uppercase tracking-widest text-maroon hover:text-ivory border border-maroon/30 rounded-md hover:bg-maroon transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-current">
            <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back</span>
        </button>
 </div>
 </div>
 <div className="p-6 md:pr-14 overflow-y-auto max-h-[60vh]">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 md:gap-y-6 pt-6">
 {[...showRulersModal.notableRulers]
  .sort((a, b) => comparePeriodStart(a.period || '', b.period || ''))
  .map((ruler) => (
  <button
  key={ruler.id}
  onClick={() => {
  setSelectedKing(ruler);
  setShowRulersModal(null);
  }}
  className="group flex items-center justify-between w-full p-4 bg-white hover:bg-saffron/5 rounded-lg transition-all duration-300 border border-saffron/30 hover:border-saffron shadow-sm hover:shadow-md rajput-hover overflow-hidden h-32"
  >
  {/* Text Column (Left 70%) */}
  <div className="w-[70%] text-left pr-4 h-full flex flex-col justify-center border-r border-saffron/10">
  <p className="font-cinzel font-bold text-maroon text-lg truncate">{ruler.hindiName}</p>
  <p className="font-playfair text-saffron font-semibold text-base truncate">{ruler.name}</p>
  <p className="text-xs text-charcoal font-medium mt-1">{ruler.period}</p>
  <p className="text-xs text-charcoal/70 mt-1 line-clamp-1">{ruler.title}</p>
  </div>

  {/* Portrait Column (Right 30%) */}
  <div className="w-[30%] flex justify-center items-center pl-2 h-full">
  {/* Portrait Frame */}
  <div className="relative w-20 h-20 shrink-0 rounded-full border-[3px] border-double border-[#D4AF37] bg-[#F5E6D3] shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
  {ruler.image ? (
  <LazyImage
   src={ruler.image}
   alt={ruler.name}
   className="w-full h-full object-cover sepia-[0.2] contrast-110"
   fill
  />
  ) : (
  /* Royal Medallion Placeholder */
  <div className="w-full h-full flex items-center justify-center bg-[#2C1810] p-3">
   <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37] opacity-90 drop-shadow-sm" fill="currentColor">
   <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
   <path d="M50 20 L58 40 L80 40 L62 55 L68 75 L50 62 L32 75 L38 55 L20 40 L42 40 Z" />
   </svg>
  </div>
  )}
  {/* Inner Shadow / Emboss Overlay */}
  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_8px_rgba(44,24,16,0.3)] pointer-events-none border border-white/10 mix-blend-overlay"></div>
  </div>
  </div>
  </button>
 ))}
 </div>
 </div>
 </div>
 </div>
 )}

 {/* Footer is globally rendered via layout.tsx */}
 </div>
 );
}
