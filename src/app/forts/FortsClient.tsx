"use client";

import { useState, useEffect } from 'react';
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

const joinTextList = (value?: string[] | string) => {
 if (!value) return '';
 if (Array.isArray(value)) {
 return value.filter(Boolean).join('; ');
 }
 return value;
};

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

const buildStoriesForMonument = (monument: Monument): FormattedStory[] => {
 if (monument.fortStories && monument.fortStories.length > 0) {
 return monument.fortStories.map((story) => ({
 title: story.title,
 category: normalizeCategory(story.category),
 content: story.content,
 }));
 }

 const description = monument.description || '';
 const history = monument.detailedHistory || '';
 const culture = monument.culturalSignificance || '';
 const significance = joinTextList(monument.significance);
 const architecture = joinTextList(
 monument.architecture || monument.architecturalFeatures,
 );
 const facts = joinTextList(monument.interestingFacts || []);

 const introParts: string[] = [];
 if (monument.period && monument.location) {
 introParts.push(
 `In ${monument.period}, ${monument.name} rose at ${monument.location}, anchoring the landscape of Rajputana.`,
 );
 } else if (monument.location) {
 introParts.push(
 `${monument.name} stands at ${monument.location}, a familiar landmark in the story of Rajputana.`,
 );
 } else {
 introParts.push(`${monument.name} became a focal point in the heritage of Rajputana.`);
 }
 if (monument.builtBy) {
 introParts.push(`It was commissioned under the patronage of ${monument.builtBy}.`);
 }
 if (monument.dynasty) {
 introParts.push(
 `The site is closely bound to the fortunes of the ${monument.dynasty} house.`,
 );
 }
 const intro = introParts.join(' ');

 const stories: FormattedStory[] = [];

 stories.push({
 title: `Founding Chronicle of ${monument.name}`,
 category: 'HISTORICAL EVENT',
 content:
 `${intro}\n\n` +
 (history
 ? `${history}\n\n`
 : '') +
 (significance
 ? `Over the centuries it came to be remembered for key roles in the region's history – ${significance}. `
 : '') +
 (facts
 ? `Court chroniclers and later travellers repeatedly noted details such as ${facts}, each layer adding to the fort's historical weight.`
 : ''),
 });

 stories.push({
 title: `Rulers, Courts and Dynastic Life`,
 category: 'ROYAL DYNASTY',
 content:
 `${monument.name} functioned not merely as stone and mortar, but as a living court where alliances were forged, oaths were sworn and royal ceremonies unfolded in measured grandeur.\n\n` +
 (monument.builtBy
 ? `The vision of ${monument.builtBy} shaped its earliest halls, while successive rulers refined and expanded the complex in response to shifting politics and courtly etiquette. `
 : '') +
 (monument.dynasty
 ? `Within these walls, the ${monument.dynasty} lineage received envoys, planned campaigns and observed the elaborate rhythms of Rajput protocol. `
 : '') +
 (culture
 ? `${culture} `
 : '') +
 (facts
 ? `Family traditions still recall episodes in which the palace became the stage for marriages, successions and crises remembered in phrases like ${facts}.`
 : ''),
 });

 stories.push({
 title: `Sieges, Sacrifice and Survival`,
 category: 'SIEGE',
 content:
 `${monument.name} stood through an era when the map of North India was redrawn repeatedly by Mughal, Maratha and later British power.\n\n` +
 `Even in years when no cannon smoke touched its ramparts, the palace-fort watched the movement of armies across the plains, served as a refuge for dependants during campaigns, and stored grain, water and arms in anticipation of hard times. ` +
 (history
 ? `Accounts of conflict preserved in regional chronicles echo through its story: ${history} `
 : '') +
 `Every bastion, courtyard and service alley was ultimately part of a defensive system that balanced dignity with preparedness, allowing the structure to adapt to new military realities without surrendering its Rajput character.`,
 });

 stories.push({
 title: `Architecture and Living Fabric of ${monument.name}`,
 category: 'ARCHITECTURAL MARVEL',
 content:
 `${monument.name} is equally a work of engineering and of imagination.\n\n` +
 (architecture
 ? `Visitors first notice its architectural grammar: ${architecture}. `
 : '') +
 (description
 ? `${description} `
 : '') +
 `Layouts were planned to temper the desert sun, capture passing breezes and frame long views across lakes, plains or dunes. Careful layering of private and public spaces allowed rulers to appear in splendour while preserving the seclusion of the zenana. ` +
 `Today, restored chambers, patina on stone, and traces of fresco and mirror work together narrate how Rajput craftsmen fused defence, ceremony and everyday life into a single architectural statement.`,
 });

 stories.push({
 title: `Legends and Memory around ${monument.name}`,
 category: 'LEGEND',
 content:
 `${monument.name} lives on not only in archival documents, but in the memory of the people who grew up in its shadow.\n\n` +
 `Oral traditions speak of torch-lit processions on festival nights, of horsemen returning from campaign, of queens and princesses watching the world from latticed balconies. Guides still recount episodes of narrow escapes, secret passages and vows taken before family deities, blending verifiable history with the suggestive glow of legend. ` +
 (significance
 ? `Because of these stories, phrases like ${significance} are used locally as shorthand for courage, hospitality and royal obligation. `
 : '') +
 `In this way the fort or palace is not a relic, but a living symbol: a place where Rajputana's ideals of honour, duty and graciousness continue to be imagined and reimagined by each generation.`,
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
 const [galleryInitialTab, setGalleryInitialTab] = useState<'photos' | 'videos'>('photos');
 const [mounted, setMounted] = useState(false);
 const { currentLanguage, setLanguage, speak, stopSpeaking, isSpeaking, t } = useLanguage();
 const [speakingId, setSpeakingId] = useState<string | null>(null);

 useEffect(() => {
 setMounted(true);
 }, []);

 const handleListen = (monument: Monument) => {
 const parts = [
 monument.name,
 monument.hindiName,
 monument.location,
 monument.description,
 monument.builtBy,
 monument.period,
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

 const filteredMonuments = initialForts.filter(monument => {
 const matchesSearch = monument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  monument.hindiName.includes(searchTerm) ||
  monument.location.toLowerCase().includes(searchTerm.toLowerCase());
 
 const matchesCategory = selectedCategory === 'all' || monument.category === selectedCategory;
 
 return matchesSearch && matchesCategory;
 });

 return (
 <div className="min-h-screen bg-[#FDF6E3] relative">
 <div className="fixed inset-0 texture-paper opacity-20 pointer-events-none z-0"></div>
 <div className="relative z-10">
 
 {/* Hero Section */}
 <Hero
 title={t('forts.title')}
 subtitle={t('forts.subtitle')}
 description={currentLanguage === 'hi'
 ? 'जहाँ पत्थर वीरता की भाषा बोलते हैं और सन्नाटा हजार कहानियाँ कह जाता है'
 : '"Where stone speaks of valor, and silence tells a thousand tales"'}
 />

 {/* Search and Filter Section */}
 <div className="bg-[#FDF6E3]/95 backdrop-blur-md shadow-md sticky top-0 z-40 border-b border-[#D4B483]">
 <div className="absolute inset-0 texture-paper opacity-10 pointer-events-none"></div>
 <div className="container mx-auto px-4 py-6 relative z-10">
 <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
 <div className="relative flex-1 max-w-md">
 <input
 type="text"
 placeholder="Search royal monuments..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full px-4 py-3 pl-12 border-2 border-[#D4B483] rounded-lg focus:outline-none focus:border-[#8B4513] bg-[#FDF6E3] font-playfair text-[#2C1810] placeholder-[#8B4513]/60 shadow-inner"
 />
 <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8B4513] opacity-70">
 
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
  {category === 'all' ? 'All' : category === 'fort' ? 'Forts' : 'Palaces'}
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
 <div className="text-6xl mb-4 opacity-50 sepia"></div>
 <h3 className="text-2xl font-cinzel text-[#2C1810] mb-2">No Results Found</h3>
 <p className="text-[#8B4513] font-playfair italic">Please modify your search query</p>
 </div>
 ) : (
 mounted ? (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {filteredMonuments.map((monument) => (
 <div
  key={monument.id}
  className="group relative bg-[#FDF6E3] rounded-lg shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-[#D4B483] hover:border-[#8B4513] cursor-pointer"
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
  alt={validImage.alt || monument.name}
  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter contrast-[1.1] saturate-[0.9]"
  strategy="CONTENT"
  responsive
  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
  width={800}
  height={350}
  />
  ) : (
  <div className="w-full h-full bg-[#E6D2B5] flex items-center justify-center">
  <span className="text-4xl opacity-20"></span>
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
  {seal.label}
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
  {monument.category}
  </span>
  </div>
  </div>
  
  {/* Content Section - Manuscript Style */}
  <div className="p-5 relative">
  {/* Decorative Top Border */}
  <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#D4B483] to-transparent opacity-50"></div>

  <div className="text-center mb-4">
  <h3 className="text-2xl font-bold font-cinzel text-[#2C1810] leading-tight">
  {currentLanguage === 'hi' ? monument.hindiName || monument.name : monument.name}
  </h3>
  <p className="text-sm font-playfair italic text-[#8B4513] mt-1">
  {currentLanguage === 'hi' ? monument.name : monument.hindiName}
  </p>
  </div>

  <div className="flex justify-center items-center gap-2 mb-4 text-xs font-cinzel tracking-wider text-[#5D4037]">
  <span className="flex items-center gap-1">
  {monument.location.split(',')[0]}
  </span>
  <span className="text-[#D4B483]">•</span>
  <span>{monument.period}</span>
  </div>
  
  <p className="text-[#4A3B2A] font-playfair text-sm leading-relaxed text-justify line-clamp-3 mb-4 px-2">
  {monument.description}
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
  <StopIcon className="w-4 h-4" /> रोकें
  </>
  ) : (
  <>
  <VolumeIcon className="w-4 h-4" /> सुनें
  </>
  )}
  </button>
  <div className="flex items-center gap-2 text-xs font-cinzel">
  <button
  onClick={(e) => {
  e.stopPropagation();
  setLanguage('hi');
  }}
  className={`px-2 py-1 rounded ${
  currentLanguage === 'hi'
  ? 'bg-[#8B4513] text-[#FDF6E3]'
  : 'bg-transparent text-[#8B4513] border border-[#D4B483]'
  }`}
  >
  हिंदी
  </button>
  <button
  onClick={(e) => {
  e.stopPropagation();
  setLanguage('en');
  }}
  className={`px-2 py-1 rounded ${
  currentLanguage === 'en'
  ? 'bg-[#8B4513] text-[#FDF6E3]'
  : 'bg-transparent text-[#8B4513] border border-[#D4B483]'
  }`}
  >
  EN
  </button>
  </div>
  </div>
  
  {/* Footer Info */}
  <div className="flex items-center justify-between pt-3 border-t border-[#D4B483]/30 text-xs font-playfair text-[#8B4513]">
  <div className="flex items-center gap-1">
  <span></span>
  <span className="truncate max-w-[100px]">{monument.builtBy}</span>
  </div>
  <div className="flex items-center gap-3">
  {monument.visitingHours && (
  <span title="Visiting Hours">⏰ {monument.visitingHours.split(' ')[0]}</span>
  )}
  <span className={`px-2 py-0.5 rounded-sm border ${
  monument.status === 'Standing' ? 'border-green-800/30 text-green-900' : 'border-amber-800/30 text-amber-900'
  }`}>
  {monument.status}
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
  <span className="text-3xl filter sepia contrast-125">{selectedMonument.icon ?? ''}</span>
 </div>
 <div>
  <h2 className="text-3xl font-bold font-cinzel text-[#2C1810] tracking-wide">{selectedMonument.name}</h2>
  <div className="flex items-center gap-3 mt-1">
  <p className="text-[#8B4513] font-playfair italic text-lg">{selectedMonument.hindiName}</p>
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
  title={isSpeaking && speakingId === selectedMonument.id ? "Stop Narration" : "Listen to Overview"}
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
  <span className="text-xs font-cinzel font-semibold text-[#5D4037]">{seal.label.split('(')[0].trim()}</span>
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
  <span className="text-2xl mr-3 opacity-80"></span>
  Visual Gallery
  </h3>
  <MediaGallery images={selectedMonument.images || []} videos={selectedMonument.videos || []} initialTab={galleryInitialTab} />
 </div>
 </div>

 {/* Key Highlights */}
 <div className="mb-10 relative z-10">
 <div className="bg-[#FDF6E3]/50 rounded-lg p-6 border border-[#D4B483]/50 shadow-sm">
  <h3 className="font-cinzel font-bold text-2xl text-[#2C1810] mb-6 flex items-center border-b border-[#D4B483]/30 pb-2">
  <span className="text-2xl mr-3 opacity-80"></span>
  Key Highlights
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="bg-[#FDF6E3] rounded-lg p-5 border border-[#D4B483] hover:shadow-md transition-shadow">
  <h4 className="font-cinzel font-bold text-[#5D4037] mb-2 text-sm uppercase tracking-wider flex items-center">
  <span className="mr-2 text-lg"></span>Built By
  </h4>
  <p className="font-playfair text-[#2C1810] text-lg leading-relaxed">{selectedMonument.builtBy}</p>
  </div>
  <div className="bg-[#FDF6E3] rounded-lg p-5 border border-[#D4B483] hover:shadow-md transition-shadow">
  <h4 className="font-cinzel font-bold text-[#5D4037] mb-2 text-sm uppercase tracking-wider flex items-center">
  <span className="mr-2 text-lg"></span>Period
  </h4>
  <p className="font-playfair text-[#2C1810] text-lg leading-relaxed">{selectedMonument.period}</p>
  </div>
  <div className="bg-[#FDF6E3] rounded-lg p-5 border border-[#D4B483] hover:shadow-md transition-shadow">
  <h4 className="font-cinzel font-bold text-[#5D4037] mb-2 text-sm uppercase tracking-wider flex items-center">
  <span className="mr-2 text-lg"></span>Location
  </h4>
  <p className="font-playfair text-[#2C1810] text-lg leading-relaxed">{selectedMonument.location}</p>
  </div>
  </div>
 </div>
 </div>

 {(() => {
 const stories = buildStoriesForMonument(selectedMonument);
 if (!stories || stories.length === 0) {
  return null;
 }
 return (
 <div className="mb-8">
  <div className="bg-[#FDF6E3] rounded-2xl p-8 border border-[#D4B483] shadow-lg relative overflow-hidden">
  <div className="absolute inset-0 bg-[url('/textures/mandala-pattern.png')] opacity-5 pointer-events-none"></div>
  <div className="relative z-10">
  <h3 className="font-cinzel font-bold text-2xl text-[#2C1810] mb-2 flex items-center">
  <span className="text-2xl mr-3"></span>
  Fort Stories
  </h3>
  <p className="font-playfair text-sm text-[#8B4513] mb-6">
  {selectedMonument.name} से जुड़ी प्रमुख कथाएँ
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
  title="Dismiss story"
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
   {story.title}
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
   title={isSpeaking && speakingId === storyId ? "Stop Narration" : "Listen to Story"}
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
   {story.category}
   </span>
  )}
  </div>
  <p className="font-playfair text-sm leading-relaxed text-[#4A3B2A] whitespace-pre-line text-justify">
  {story.content}
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
  <span className="bg-[#8B4513] text-[#FDF6E3] px-3 py-2 rounded-lg mr-3 text-xl shadow-md border border-[#D4B483]"></span>
  Travel Information
  </h3>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 relative z-10">
  <div className="bg-[#E6D2B5]/30 rounded-xl p-4 border border-[#D4B483] text-center">
  <h4 className="font-cinzel font-semibold text-[#2C1810] mb-2 text-sm uppercase tracking-wider"> Timings</h4>
  <p className="font-playfair text-xs text-[#4A3B2A] font-bold">{selectedMonument.visitingHours || "9:00 AM - 5:00 PM"}</p>
  </div>
  <div className="bg-[#E6D2B5]/30 rounded-xl p-4 border border-[#D4B483] text-center">
  <h4 className="font-cinzel font-semibold text-[#2C1810] mb-2 text-sm uppercase tracking-wider"> Entry Fee</h4>
  <p className="font-playfair text-xs text-[#4A3B2A] font-bold">{selectedMonument.entryFee || "See details"}</p>
  </div>
  <div className="bg-[#E6D2B5]/30 rounded-xl p-4 border border-[#D4B483] text-center">
  <h4 className="font-cinzel font-semibold text-[#2C1810] mb-2 text-sm uppercase tracking-wider"> Airport</h4>
  <p className="font-playfair text-xs text-[#4A3B2A] font-bold">{selectedMonument.location.split(', ')[1] || "Jaipur"}</p>
  </div>
  <div className="bg-[#E6D2B5]/30 rounded-xl p-4 border border-[#D4B483] text-center">
  <h4 className="font-cinzel font-semibold text-[#2C1810] mb-2 text-sm uppercase tracking-wider"> Railway</h4>
  <p className="font-playfair text-xs text-[#4A3B2A] font-bold">{selectedMonument.location.split(', ')[0] || "Local"}</p>
  </div>
  </div>

  <div className="text-center relative z-10">
  <p className="font-playfair text-sm text-[#8B4513] italic border-t border-[#D4B483] pt-4 inline-block px-8">
  &quot;{selectedMonument.name} की यात्रा एक अविस्मरणीय अनुभव है जो आपको राजस्थान की समृद्ध विरासत से जोड़ता है।&quot;
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
