"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Monument } from '@/types/frontend';
import { getDynastyInfo } from './constants';
import MediaGallery from '../components/MediaGallery';
import { DynastySeal } from '../components/DynastySeals';
import Hero from '../components/Hero';
import OptimizedImage from '../components/OptimizedImage';
import { useLanguage } from '../components/LanguageProvider';

const StopIcon = ({ className }: { className?: string }) => (
 <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
 </svg>
);

const VolumeIcon = ({ className }: { className?: string }) => (
 <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
 </svg>
);

type StoryCategoryTag =
 | 'LEGEND'
 | 'HISTORICAL EVENT'
 | 'SIEGE'
 | 'ROYAL DYNASTY'
 | 'ARCHITECTURAL MARVEL';

interface FormattedStory {
 title: string;
 category: StoryCategoryTag;
 content: string;
}

const normalizeCategory = (raw?: string): StoryCategoryTag => {
 const value = (raw || '').toLowerCase();
 if (value.includes('siege') || value.includes('battle') || value.includes('war')) return 'SIEGE';
 if (
 value.includes('dynasty') ||
 value.includes('ruler') ||
 value.includes('royal') ||
 value.includes('maharana') ||
 value.includes('maharaja') ||
 value.includes('queen') ||
 value.includes('king')
 ) {
 return 'ROYAL DYNASTY';
 }
 if (
 value.includes('architecture') ||
 value.includes('architectural') ||
 value.includes('palace') ||
 value.includes('temple') ||
 value.includes('wall') ||
 value.includes('tower') ||
 value.includes('hall') ||
 value.includes('mahal')
 ) {
 return 'ARCHITECTURAL MARVEL';
 }
 if (value.includes('historical') || value.includes('event') || value.includes('jauhar')) {
 return 'HISTORICAL EVENT';
 }
 return 'LEGEND';
};

// Build stories for monument
const buildStoriesForMonument = (monument: Monument, currentLanguage?: string, getLocalized?: any): FormattedStory[] => {
 if (monument.fortStories && monument.fortStories.length > 0) {
 return monument.fortStories.map((story) => ({
 title: getLocalized ? getLocalized(story, 'title') : story.title,
 category: normalizeCategory(getLocalized ? getLocalized(story, 'category') : story.category),
 content: getLocalized ? getLocalized(story, 'content') : story.content,
 }));
 }

 // Fallback stories if not explicitly provided
 const description = getLocalized ? getLocalized(monument, 'description') : (monument.description || '');
 const history = monument.detailedHistory || '';

 const stories: FormattedStory[] = [];

 stories.push({
 title: currentLanguage === 'hi' ? `${monument.hindiName || monument.name} का इतिहास` : `Founding Chronicle of ${monument.name}`,
 category: 'HISTORICAL EVENT',
 content: currentLanguage === 'hi' ? `${description}\n\n${history}` : `${description}\n\n${history}`
 });

 return stories;
};

interface FortsClientProps {
 initialForts: Monument[];
}

export default function FortsClient({ initialForts }: FortsClientProps) {
 const [selectedCategory, setSelectedCategory] = useState<'all' | 'fort' | 'palace'>('all');
 const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);
 const [searchTerm, setSearchTerm] = useState('');
 const [debouncedSearch, setDebouncedSearch] = useState('');
 const [galleryInitialTab, setGalleryInitialTab] = useState<'photos' | 'videos'>('photos');
 const [mounted, setMounted] = useState(false);
 const { currentLanguage, speak, stopSpeaking, isSpeaking, t } = useLanguage();
 const [speakingId, setSpeakingId] = useState<string | null>(null);
 const [dynamicTranslations, setDynamicTranslations] = useState<Record<string, string>>({});
 // Tracks texts already sent to /api/translate so we don't re-request them
 // across renders or after they've been cached by the server.
 const requestedTextsRef = useRef<Set<string>>(new Set());

 // Debounce search input (300ms) so the filter + translation prefetch don't
 // fire on every keystroke.
 useEffect(() => {
 const id = window.setTimeout(() => setDebouncedSearch(searchTerm), 300);
 return () => window.clearTimeout(id);
 }, [searchTerm]);

 const isHindiText = useCallback((value: string) => /[\u0900-\u097F]/.test(value), []);

 const getLocalizedValue = useCallback(
  (obj: any, key: string) => {
   if (!obj) return '';
   const hindiKey = `hindi${key.charAt(0).toUpperCase()}${key.slice(1)}`;
   if (currentLanguage === 'hi' && obj[hindiKey]) {
    return obj[hindiKey];
   }
   return obj[key];
  },
  [currentLanguage],
 );

 const displayText = useCallback(
  (value: string) => {
   if (!value) return '';
   if (currentLanguage !== 'hi') return value;
   if (isHindiText(value)) return value;
   return dynamicTranslations[value] ?? value;
  },
  [currentLanguage, dynamicTranslations, isHindiText],
 );

 const getStoryCategoryLabel = (category: StoryCategoryTag) => {
  if (category === 'HISTORICAL EVENT') return t('forts.storyCategory.historicalEvent');
  if (category === 'ROYAL DYNASTY') return t('forts.storyCategory.royalDynasty');
  if (category === 'ARCHITECTURAL MARVEL') return t('forts.storyCategory.architecturalMarvel');
  if (category === 'SIEGE') return t('forts.storyCategory.siege');
  return t('forts.storyCategory.legend');
 };

  useEffect(() => {
 setMounted(true);
 }, []);

 const prefetchTranslations = useCallback(
  async (texts: string[]) => {
   if (currentLanguage !== 'hi') return;
   const uniqueTexts = Array.from(new Set(texts.filter(Boolean))).filter((text) => {
    if (dynamicTranslations[text]) return false;
    if (isHindiText(text)) return false;
    // Don't re-request texts we've already sent to the API.
    if (requestedTextsRef.current.has(text)) return false;
    return true;
   });
   if (uniqueTexts.length === 0) return;

   // Mark these as requested before sending so concurrent calls don't double up.
   for (const text of uniqueTexts) requestedTextsRef.current.add(text);

   // The /api/translate route enforces a max of 60 texts per request; split
   // into batches and run them sequentially to stay under the limit.
   const BATCH_SIZE = 60;
   for (let i = 0; i < uniqueTexts.length; i += BATCH_SIZE) {
    const batch = uniqueTexts.slice(i, i + BATCH_SIZE);
    try {
     const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ texts: batch, source: 'en', target: 'hi' }),
     });
     if (!res.ok) {
      // On failure, forget these so they can be retried later.
      for (const text of batch) requestedTextsRef.current.delete(text);
      continue;
     }
     const json = (await res.json()) as { translations?: Record<string, string> };
     const translations = json.translations ?? {};
     setDynamicTranslations((prev) => ({ ...prev, ...translations }));
    } catch {
     for (const text of batch) requestedTextsRef.current.delete(text);
    }
   }
  },
  [currentLanguage, dynamicTranslations, isHindiText],
 );

 const handleListen = (monument: Monument) => {
 const parts = [
  displayText(getLocalizedValue(monument, 'name') || monument.name),
  displayText(getLocalizedValue(monument, 'location') || monument.location),
  displayText(getLocalizedValue(monument, 'description') || monument.description),
  displayText(getLocalizedValue(monument, 'builtBy') || monument.builtBy),
  displayText(getLocalizedValue(monument, 'period') || monument.period),
 ].filter(Boolean);

 const text = parts.join('. ');
 handleListenText(text, monument.id);
 };

 const handleListenText = (text: string, id: string) => {
 if (isSpeaking && speakingId === id) {
 stopSpeaking();
 setSpeakingId(null);
 return;
 }

 stopSpeaking();
 speak(text);
 setSpeakingId(id);
 };

 const filteredMonuments = useMemo(() => {
 const lower = debouncedSearch.toLowerCase();
 return initialForts.filter((monument) => {
  const matchesSearch =
   monument.name.toLowerCase().includes(lower) ||
   monument.hindiName.includes(debouncedSearch) ||
   monument.location.toLowerCase().includes(lower);
  const matchesCategory =
   selectedCategory === 'all' || monument.category === selectedCategory;
  return matchesSearch && matchesCategory;
 });
 }, [initialForts, debouncedSearch, selectedCategory]);

 useEffect(() => {
  if (currentLanguage !== 'hi') return;

  const cardTexts: string[] = [];
  for (const monument of filteredMonuments) {
   const seal = getDynastyInfo(monument);
   cardTexts.push(
    String(getLocalizedValue(monument, 'name') || monument.name || ''),
    String(getLocalizedValue(monument, 'location') || monument.location || ''),
    String(getLocalizedValue(monument, 'period') || monument.period || ''),
    String(getLocalizedValue(monument, 'builtBy') || monument.builtBy || ''),
    String(getLocalizedValue(monument, 'status') || monument.status || ''),
    String(getLocalizedValue(monument, 'description') || monument.description || ''),
    String(seal.label || ''),
   );
  }

  const modalTexts: string[] = [];
  if (selectedMonument) {
   modalTexts.push(
    String(getLocalizedValue(selectedMonument, 'name') || selectedMonument.name || ''),
    String(getLocalizedValue(selectedMonument, 'location') || selectedMonument.location || ''),
    String(getLocalizedValue(selectedMonument, 'period') || selectedMonument.period || ''),
    String(getLocalizedValue(selectedMonument, 'builtBy') || selectedMonument.builtBy || ''),
    String(getLocalizedValue(selectedMonument, 'description') || selectedMonument.description || ''),
    String(getLocalizedValue(selectedMonument, 'visitingHours') || selectedMonument.visitingHours || ''),
    String(getLocalizedValue(selectedMonument, 'entryFee') || selectedMonument.entryFee || ''),
   );
   const stories = buildStoriesForMonument(selectedMonument, currentLanguage, getLocalizedValue);
   for (const story of stories) {
    modalTexts.push(String(story.title || ''), String(story.content || ''));
   }
  }

  void prefetchTranslations([...cardTexts, ...modalTexts]);
 }, [currentLanguage, filteredMonuments, getLocalizedValue, prefetchTranslations, selectedMonument]);

 return (
 <div className="min-h-screen bg-[#FDF6E3] relative">
 <div className="fixed inset-0 texture-paper opacity-20 pointer-events-none z-0"></div>
 <div className="relative z-10">
 
 {/* Hero Section */}
 <Hero
 title={t('forts.title')}
 subtitle={t('forts.subtitle')}
  description={t('forts.hero.description')}
 />

 {/* Search and Filter Section */}
 <div className="bg-[#FDF6E3]/95 backdrop-blur-md shadow-md sticky top-0 z-40 border-b border-[#D4B483]">
 <div className="absolute inset-0 texture-paper opacity-10 pointer-events-none"></div>
 <div className="container mx-auto px-4 py-6 relative z-10">
 <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
 <div className="relative flex-1 max-w-md">
  <input
 type="text"
  placeholder={t('forts.search.placeholder')}
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full px-4 py-3 pl-12 border-2 border-[#D4B483] rounded-lg focus:outline-none focus:border-[#8B4513] bg-[#FDF6E3] font-playfair text-[#2C1810] placeholder-[#8B4513]/60 shadow-inner"
 />
 <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8B4513] opacity-70">
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
 </svg>
 </div>
 </div>
 
 <div className="flex gap-3">
 {(['all', 'fort', 'palace'] as const).map((category) => (
 <button
  key={category}
  onClick={() => setSelectedCategory(category)}
  className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 uppercase tracking-wider text-sm ${
  selectedCategory === category
  ? 'bg-[#8B4513] text-[#FDF6E3] border-2 border-[#8B4513] shadow-lg transform scale-105'
  : 'bg-[#FDF6E3] text-[#8B4513] hover:bg-[#E6D2B5] border-2 border-[#D4B483]'
  } font-cinzel`}
 >
  {category === 'all' ? t('forts.filters.all') : category === 'fort' ? t('forts.filters.forts') : t('forts.filters.palaces')}
 </button>
 ))}
 </div>
 </div>
 </div>
 </div>

 {/* Monuments Grid */}
 <div className="container mx-auto px-4 py-12">
 {filteredMonuments.length === 0 ? (
 <div className="text-center py-20">
 <div className="text-6xl mb-4 opacity-50 sepia">🏰</div>
  <h3 className="text-2xl font-cinzel text-[#2C1810] mb-2">{t('forts.noResults.title')}</h3>
  <p className="text-[#8B4513] font-playfair italic">{t('forts.noResults.body')}</p>
 </div>
 ) : (
 mounted ? (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {filteredMonuments.map((monument) => (
 <div
  key={monument.id}
  className="group relative bg-[#FDF6E3] rounded-lg shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-[#D4B483] hover:border-[#8B4513] cursor-pointer flex flex-col h-full"
  onClick={() => { setSelectedMonument(monument); setGalleryInitialTab('photos'); }}
 >
  {/* Image Section with Warm Grading & Grain */}
  <div className="relative h-56 overflow-hidden">
  <div className="absolute inset-0 bg-sepia-25 mix-blend-overlay z-10 pointer-events-none"></div>
  <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/60 to-transparent z-10"></div>
  {(() => {
  const validImage = monument.images?.find(img => img.src && img.src.trim() !== '');
  return validImage ? (
  <OptimizedImage
  src={validImage.src}
  alt={displayText(validImage.alt || monument.name)}
  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter contrast-[1.1] saturate-[0.9]"
  strategy="CONTENT"
  responsive
  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
  width={800}
  height={350}
  />
  ) : (
  <div className="w-full h-full bg-[#E6D2B5] flex items-center justify-center">
  <span className="text-4xl opacity-20">🏰</span>
  </div>
  );
  })()}

  {/* Princely Seal Badge */}
  <div className="absolute top-3 right-3 z-20 group/seal">
  {(() => {
  const seal = getDynastyInfo(monument);
  return (
  <div className="relative">
  <div className="w-12 h-12 rounded-full border-2 border-[#D4B483] flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500 bg-[#FDF6E3] overflow-hidden">
  <div className="absolute inset-0 bg-[#8B4513]/5"></div>
  <div className="relative z-10 w-8 h-8">
  <DynastySeal dynasty={seal.key} color={seal.color} />
  </div>
  </div>
  {/* Tooltip for Dynasty Name */}
  <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-[#2C1810] text-[#FDF6E3] text-xs font-cinzel rounded border border-[#D4B483] opacity-0 group-hover/seal:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl pointer-events-none z-30">
  {displayText(seal.label)}
  <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#2C1810] border-r border-t border-[#D4B483] transform rotate-45"></div>
  </div>
  </div>
  );
  })()}
  </div>

  {/* Category Tag */}
  <div className="absolute top-3 left-3 z-20">
  <span className={`px-3 py-1 rounded-sm text-xs tracking-widest font-cinzel uppercase border ${
  monument.category === 'fort' 
  ? 'bg-[#8B0000] text-[#FDF6E3] border-[#D4B483]' 
  : 'bg-[#4B0082] text-[#FDF6E3] border-[#D4B483]'
  } shadow-md`}>
  {monument.category === 'fort' ? t('forts.filters.forts') : t('forts.filters.palaces')}
  </span>
  </div>
  </div>
  
  {/* Content Section - Manuscript Style */}
  <div className="p-5 relative flex flex-col flex-grow">
  {/* Decorative Top Border */}
  <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#D4B483] to-transparent opacity-50"></div>

  <div className="text-center mb-4">
  <h3 className="text-2xl font-bold font-cinzel text-[#2C1810] leading-tight">
  {displayText(getLocalizedValue(monument, 'name') || monument.name)}
  </h3>
  <p className="text-sm font-playfair italic text-[#8B4513] mt-1">
  {currentLanguage === 'hi'
   ? displayText(monument.name)
   : monument.hindiName}
  </p>
  </div>

  <div className="flex justify-center items-center gap-2 mb-4 text-xs font-cinzel tracking-wider text-[#5D4037]">
  <span className="flex items-center gap-1">
  {displayText(getLocalizedValue(monument, 'location')?.split(',')[0] || monument.location.split(',')[0])}
  </span>
  <span className="text-[#D4B483]">•</span>
  <span>{displayText(getLocalizedValue(monument, 'period') || monument.period)}</span>
  </div>
  
  <p className="text-[#4A3B2A] font-playfair text-sm leading-relaxed text-justify line-clamp-3 mb-4 px-2">
  {displayText(getLocalizedValue(monument, 'description') || monument.description)}
  </p>
  
  <div className="flex items-center justify-between mb-3 px-2">
  <button
  onClick={(e) => {
  e.stopPropagation();
  handleListen(monument);
  }}
  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-cinzel transition-colors ${
  isSpeaking && speakingId === monument.id
  ? 'bg-[#5D4037] text-[#FDF6E3] animate-pulse'
  : 'bg-[#8B4513] text-[#FDF6E3] hover:bg-[#5D4037]'
  }`}
  >
  {isSpeaking && speakingId === monument.id ? (
  <>
  <StopIcon className="w-4 h-4" /> {t('audio.stop')}
  </>
  ) : (
  <>
  <VolumeIcon className="w-4 h-4" /> {t('common.listen')}
  </>
  )}
  </button>
  </div>
  
  {/* Footer Info */}
  <div className="flex items-center justify-between pt-3 mt-auto border-t border-[#D4B483]/30 text-xs font-playfair text-[#8B4513]">
  <div className="flex items-center gap-1">
  <span></span>
  <span className="truncate max-w-[100px]">{displayText(getLocalizedValue(monument, 'builtBy') || monument.builtBy)}</span>
  </div>
  <div className="flex items-center gap-3">
  {monument.visitingHours && (
  <span title={t('forts.modal.timings')}>⏰ {displayText(getLocalizedValue(monument, 'visitingHours') || monument.visitingHours).split(' ')[0]}</span>
  )}
  <span className={`px-2 py-0.5 rounded-sm border ${
  monument.status === 'Standing' ? 'border-green-800/30 text-green-900' : 'border-amber-800/30 text-amber-900'
  }`}>
  {displayText(getLocalizedValue(monument, 'status') || monument.status)}
  </span>
  </div>
  </div>

  {/* Decorative Corners */}
  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#D4B483] opacity-50"></div>
  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#D4B483] opacity-50"></div>
  <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#D4B483] opacity-50"></div>
  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#D4B483] opacity-50"></div>
  </div>
 </div>
 ))}
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {Array.from({ length: 6 }).map((_, idx) => (
 <div
  key={idx}
  className="bg-[#FDF6E3] rounded-lg border border-[#D4B483] h-96 animate-pulse shadow-md"
 />
 ))}
 </div>
 )
 )}
 </div>

 {/* Enhanced Monument Detail Modal */}
 {selectedMonument && (
 <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
 <div className="bg-[#FDF6E3] rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-[#D4B483] shadow-2xl relative">
 {/* Sticky Header with Fresco Texture */}
 <div className="sticky top-0 bg-[#FDF6E3] border-b border-[#D4B483] p-6 z-30 flex justify-between items-center shadow-sm">
 <div className="absolute inset-0 texture-paper opacity-10 pointer-events-none"></div>
 <div className="relative z-10 flex items-center space-x-6">
 <div className="w-16 h-16 rounded-full border-2 border-[#D4B483] bg-[#E6D2B5] flex items-center justify-center shadow-inner">
  <span className="text-3xl filter sepia contrast-125">{selectedMonument.icon || '🏛️'}</span>
 </div>
 <div>
  <h2 className="text-3xl font-bold font-cinzel text-[#2C1810] tracking-wide">{displayText(getLocalizedValue(selectedMonument, 'name') || selectedMonument.name)}</h2>
  <div className="flex items-center gap-3 mt-1">
  <p className="text-[#8B4513] font-playfair italic text-lg">{currentLanguage === 'hi' ? displayText(selectedMonument.name) : selectedMonument.hindiName}</p>
  <button
  onClick={(e) => {
  e.stopPropagation();
  handleListen(selectedMonument);
  }}
  className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center border border-[#D4B483] ${
  isSpeaking && speakingId === selectedMonument.id
  ? "bg-[#8B4513] text-[#FDF6E3]"
  : "bg-[#FDF6E3] text-[#8B4513] hover:bg-[#8B4513] hover:text-[#FDF6E3]"
  }`}
  title={isSpeaking && speakingId === selectedMonument.id ? t('forts.tooltip.stopNarration') : t('forts.tooltip.listenOverview')}
  >
  {isSpeaking && speakingId === selectedMonument.id ? (
  <StopIcon className="w-3.5 h-3.5" />
  ) : (
  <VolumeIcon className="w-3.5 h-3.5" />
  )}
  </button>
  {(() => {
  const seal = getDynastyInfo(selectedMonument);
  return (
  <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4B483] bg-[#FDF6E3] shadow-sm">
  <div className="w-5 h-5">
  <DynastySeal dynasty={seal.key} color={seal.color} />
  </div>
  <span className="text-xs font-cinzel font-semibold text-[#5D4037]">{displayText(seal.label.split('(')[0].trim())}</span>
  </div>
  );
  })()}
  </div>
 </div>
 </div>
 <button
 onClick={() => setSelectedMonument(null)}
 className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full border border-[#D4B483] text-[#8B4513] hover:bg-[#8B4513] hover:text-[#FDF6E3] transition-all duration-300"
 >
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
 </svg>
 </button>
 </div>

 {/* Single Section Content */}
 <div className="p-8 relative">
 <div className="absolute inset-0 bg-[url('/textures/paper-texture.png')] opacity-5 pointer-events-none"></div>
 
 {/* Media Gallery */}
 <div className="mb-10 relative z-10">
 <div className="bg-white/50 rounded-lg p-6 border border-[#D4B483]/50 shadow-sm">
  <h3 className="font-cinzel font-bold text-2xl text-[#2C1810] mb-6 flex items-center border-b border-[#D4B483]/30 pb-2">
  <span className="text-2xl mr-3 opacity-80">🖼️</span>
  {t('forts.modal.visualGallery')}
  </h3>
  <MediaGallery images={selectedMonument.images || []} videos={selectedMonument.videos || []} initialTab={galleryInitialTab} />
 </div>
 </div>

 {/* Key Highlights */}
 <div className="mb-10 relative z-10">
 <div className="bg-[#FDF6E3]/50 rounded-lg p-6 border border-[#D4B483]/50 shadow-sm">
  <h3 className="font-cinzel font-bold text-2xl text-[#2C1810] mb-6 flex items-center border-b border-[#D4B483]/30 pb-2">
  <span className="text-2xl mr-3 opacity-80">⭐</span>
  {t('forts.modal.keyHighlights')}
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="bg-[#FDF6E3] rounded-lg p-5 border border-[#D4B483] hover:shadow-md transition-shadow">
  <h4 className="font-cinzel font-bold text-[#5D4037] mb-2 text-sm uppercase tracking-wider flex items-center">
  <span className="mr-2 text-lg">👑</span>{t('forts.modal.builtBy')}
  </h4>
  <p className="font-playfair text-[#2C1810] text-lg leading-relaxed">{displayText(getLocalizedValue(selectedMonument, 'builtBy') || selectedMonument.builtBy)}</p>
  </div>
  <div className="bg-[#FDF6E3] rounded-lg p-5 border border-[#D4B483] hover:shadow-md transition-shadow">
  <h4 className="font-cinzel font-bold text-[#5D4037] mb-2 text-sm uppercase tracking-wider flex items-center">
  <span className="mr-2 text-lg">📅</span>{t('forts.modal.period')}
  </h4>
  <p className="font-playfair text-[#2C1810] text-lg leading-relaxed">{displayText(getLocalizedValue(selectedMonument, 'period') || selectedMonument.period)}</p>
  </div>
  <div className="bg-[#FDF6E3] rounded-lg p-5 border border-[#D4B483] hover:shadow-md transition-shadow">
  <h4 className="font-cinzel font-bold text-[#5D4037] mb-2 text-sm uppercase tracking-wider flex items-center">
  <span className="mr-2 text-lg">📍</span>{t('forts.modal.location')}
  </h4>
  <p className="font-playfair text-[#2C1810] text-lg leading-relaxed">{displayText(getLocalizedValue(selectedMonument, 'location') || selectedMonument.location)}</p>
  </div>
  </div>
 </div>
 </div>

 {(() => {
 const stories = buildStoriesForMonument(selectedMonument, currentLanguage, getLocalizedValue);
 if (!stories || stories.length === 0) {
  return null;
 }
 return (
 <div className="mb-8">
  <div className="bg-[#FDF6E3] rounded-2xl p-8 border border-[#D4B483] shadow-lg relative overflow-hidden">
  <div className="absolute inset-0 bg-[url('/textures/mandala-pattern.png')] opacity-5 pointer-events-none"></div>
  <div className="relative z-10">
  <h3 className="font-cinzel font-bold text-2xl text-[#2C1810] mb-2 flex items-center">
  <span className="text-2xl mr-3">📜</span>
  {t('forts.modal.fortStories')}
  </h3>
  <p className="font-playfair text-sm text-[#8B4513] mb-6">
  {currentLanguage === 'hi'
   ? `${displayText(getLocalizedValue(selectedMonument, 'name') || selectedMonument.name)} ${t('forts.modal.fortStoriesSubtitle')}`
   : `${t('forts.modal.fortStoriesSubtitle')} ${selectedMonument.name}`}
  </p>
  <div className="space-y-6">
  {stories.map((story, index) => {
  const storyId = `${selectedMonument.id}-story-${index}`;
  return (
  <article
  key={storyId}
  id={storyId}
  className="bg-[#FDF6E3]/80 border border-[#D4B483]/70 rounded-xl p-5 shadow-sm relative group"
  >
  {/* Close Button */}
  <button
  onClick={(e) => {
  e.stopPropagation();
  const el = document.getElementById(storyId);
  if (el) el.style.display = 'none';
  }}
  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-[#8B4513]/10 text-[#8B4513] hover:bg-[#8B4513]/20 transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
  title={t('forts.tooltip.dismissStory')}
  >
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
  </button>
  <div className="flex items-start justify-between gap-3 mb-3 pr-8">
  <div className="flex items-center gap-3">
   <span className="w-8 h-8 rounded-full bg-[#8B4513] text-[#FDF6E3] flex items-center justify-center font-cinzel text-sm">
   {index + 1}
   </span>
   <h4 className="font-cinzel font-semibold text-lg text-[#2C1810]">
   {displayText(story.title)}
   </h4>
   <button
   onClick={(e) => {
   e.stopPropagation();
   handleListenText(story.content, storyId);
   }}
   className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center border border-[#D4B483] ${
   isSpeaking && speakingId === storyId
   ? "bg-[#8B4513] text-[#FDF6E3]"
   : "bg-[#FDF6E3] text-[#8B4513] hover:bg-[#8B4513] hover:text-[#FDF6E3]"
   }`}
   title={isSpeaking && speakingId === storyId ? t('forts.tooltip.stopNarration') : t('forts.tooltip.listenStory')}
   >
   {isSpeaking && speakingId === storyId ? (
   <StopIcon className="w-3 h-3" />
   ) : (
   <VolumeIcon className="w-3 h-3" />
   )}
   </button>
  </div>
  {story.category && (
   <span className="px-3 py-1 rounded-full text-xs font-cinzel uppercase tracking-wider bg-[#FDF6E3] border border-[#D4B483] text-[#8B4513] whitespace-nowrap">
   {getStoryCategoryLabel(story.category)}
   </span>
  )}
  </div>
  <p className="font-playfair text-sm leading-relaxed text-[#4A3B2A] whitespace-pre-line text-justify">
  {displayText(story.content)}
  </p>
  </article>
  );
  })}
  </div>
  </div>
  </div>
 </div>
 );
 })()}

 {/* Practical Information */}
 <div>
 <div className="bg-[#FDF6E3] rounded-2xl p-6 border border-[#D4B483] shadow-lg relative overflow-hidden">
  <div className="absolute inset-0 texture-paper opacity-10 pointer-events-none"></div>
  <h3 className="font-cinzel font-bold text-2xl text-[#2C1810] mb-4 flex items-center relative z-10">
  <span className="bg-[#8B4513] text-[#FDF6E3] px-3 py-2 rounded-lg mr-3 text-xl shadow-md border border-[#D4B483]">✈️</span>
  {t('forts.modal.travelInfo')}
  </h3>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 relative z-10">
  <div className="bg-[#E6D2B5]/30 rounded-xl p-4 border border-[#D4B483] text-center">
  <h4 className="font-cinzel font-semibold text-[#2C1810] mb-2 text-sm uppercase tracking-wider"> {t('forts.modal.timings')}</h4>
  <p className="font-playfair text-xs text-[#4A3B2A] font-bold">{displayText(getLocalizedValue(selectedMonument, 'visitingHours') || selectedMonument.visitingHours || '') || t('forts.modal.defaultTimings')}</p>
  </div>
  <div className="bg-[#E6D2B5]/30 rounded-xl p-4 border border-[#D4B483] text-center">
  <h4 className="font-cinzel font-semibold text-[#2C1810] mb-2 text-sm uppercase tracking-wider"> {t('forts.modal.entryFee')}</h4>
  <p className="font-playfair text-xs text-[#4A3B2A] font-bold">{displayText(getLocalizedValue(selectedMonument, 'entryFee') || selectedMonument.entryFee || '') || t('forts.modal.seeDetails')}</p>
  </div>
  <div className="bg-[#E6D2B5]/30 rounded-xl p-4 border border-[#D4B483] text-center">
  <h4 className="font-cinzel font-semibold text-[#2C1810] mb-2 text-sm uppercase tracking-wider"> {t('forts.modal.airport')}</h4>
  <p className="font-playfair text-xs text-[#4A3B2A] font-bold">{displayText(getLocalizedValue(selectedMonument, 'location') || selectedMonument.location).split(', ')[1] || t('forts.modal.defaultAirport')}</p>
  </div>
  <div className="bg-[#E6D2B5]/30 rounded-xl p-4 border border-[#D4B483] text-center">
  <h4 className="font-cinzel font-semibold text-[#2C1810] mb-2 text-sm uppercase tracking-wider"> {t('forts.modal.railway')}</h4>
  <p className="font-playfair text-xs text-[#4A3B2A] font-bold">{displayText(getLocalizedValue(selectedMonument, 'location') || selectedMonument.location).split(', ')[0] || t('forts.modal.defaultRailway')}</p>
  </div>
  </div>

  <div className="text-center relative z-10">
  <p className="font-playfair text-sm text-[#8B4513] italic border-t border-[#D4B483] pt-4 inline-block px-8">
  &quot;{t('forts.modal.quoteStart')} {displayText(getLocalizedValue(selectedMonument, 'name') || selectedMonument.name)} {t('forts.modal.quoteEnd')}&quot;
  </p>
  </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 )}
 </div>
 </div>
 );
}
