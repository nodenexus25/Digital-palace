'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/LanguageProvider';
import EnhancedStoryModal from '../components/EnhancedStoryModal';
import Hero from '../components/Hero';
import LazyImage from '../components/LazyImage';
import type { Festival } from './festivalsData';
import { religiousFestivals as religiousFestivalsData, culturalFestivals as culturalFestivalsData, commemorationFestivals } from './festivalsData';

const StopIcon = () => (
 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
 </svg>
);

const VolumeIcon = () => (
 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
 </svg>
);

const FestivalsPage = () => {
 const { speak, stopSpeaking, isSpeaking, currentLanguage, t } = useLanguage();
 const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
 const [activeCategory, setActiveCategory] = useState<'religious' | 'cultural' | 'commemorations'>('religious');
 const [speakingId, setSpeakingId] = useState<string | null>(null);

 // Reset speakingId when global isSpeaking becomes false (e.g. finished)
 useEffect(() => {
 if (!isSpeaking) {
 setSpeakingId(null);
 }
 }, [isSpeaking]);

 const handleListen = (id: string, text: string) => {
 if (isSpeaking && speakingId === id) {
 stopSpeaking();
 return;
 }

 stopSpeaking();
 speak(text);
 setSpeakingId(id);
 };

 const categories = [
 { 
 id: 'religious', 
 label: 'Sacred Festivals', 
 hindi: 'धार्मिक त्योहार', 
 icon: '',
 themeColor: 'text-saffron-600', // Tailwind class doesn't exist, using hex
 color: '#D97706', // Saffron/Amber
 accentClass: 'border-[#D97706]'
 },
 { 
 id: 'cultural', 
 label: 'Cultural Celebrations', 
 hindi: 'सांस्कृतिक पर्व', 
 icon: '',
 themeColor: 'text-[#800000]',
 color: '#800000', // Blood Maroon
 accentClass: 'border-[#800000]'
 },
 { 
 id: 'commemorations', 
 label: 'Warrior Memorials', 
 hindi: 'स्मरण उत्सव', 
 icon: '',
 themeColor: 'text-[#57534E]',
 color: '#57534E', // Stone Gray
 accentClass: 'border-[#57534E]'
 }
 ] as const;

 const activeCategoryData = categories.find(c => c.id === activeCategory)!;

 const currentFestivals = activeCategory === 'religious' 
 ? religiousFestivalsData 
 : activeCategory === 'cultural' 
 ? culturalFestivalsData 
 : commemorationFestivals;

 return (
 <div className="min-h-screen bg-[#F5E6D3] text-[#2C1810] font-cormorant">
 {/* Hero Section */}
 <Hero
 title={t('festivals.title')}
 subtitle={t('festivals.subtitle')}
 description={t('festivals.description')}
 />

 {/* Navigation Tabs - Ceremonial Style */}
 <div className="flex justify-center border-b border-[#D4C5A9] mb-12 bg-[#EFE0CD]">
 {categories.map((cat) => (
 <button
 key={cat.id}
 onClick={() => setActiveCategory(cat.id)}
 className={`px-8 py-6 font-cinzel text-lg tracking-wider transition-all duration-500 relative group ${
 activeCategory === cat.id 
 ? 'text-[#2C1810]' 
 : 'text-[#5D4037] hover:text-[#2C1810]'
 }`}
 >
 <span className="block text-2xl mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
 {currentLanguage === 'hi' ? cat.hindi : cat.label}
 </span>
 
 {/* Active Indicator with Section Color */}
 {activeCategory === cat.id && (
 <span 
 className="absolute bottom-0 left-0 w-full h-1 transform scale-x-100 transition-transform duration-500"
 style={{ backgroundColor: cat.color }}
 ></span>
 )}
        </button>
        ))}
      </div>

 {/* Festival Banner Tiles */}
 <div className="max-w-7xl mx-auto px-6 pb-24 space-y-12">
 {currentFestivals.map((festival) => (
 <div
 key={festival.id}
 onClick={() => setSelectedFestival(festival)}
 className="group flex flex-col md:flex-row-reverse h-auto md:h-80 bg-[#F9F3E3] rounded-sm overflow-hidden shadow-md hover:shadow-2xl transition-all duration-700 cursor-pointer border border-[#E6DCC3]"
 >
 {/* Right 35%: Image (Visually Right, DOM First) */}
 <div className="w-full h-64 md:h-full md:w-[35%] relative overflow-hidden">
 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
 {/* Overlay for "Smaran" section to desaturate if needed, but keeping it subtle */}
 {activeCategory === 'commemorations' && (
 <div className="absolute inset-0 bg-[#57534E]/20 mix-blend-saturation pointer-events-none"></div>
 )}
 
 {festival.image ? (
 <LazyImage
  src={festival.image}
  alt={festival.name}
  fill
  className="object-cover transform transition-transform duration-1000 group-hover:scale-105"
 />
 ) : (
 <div className="w-full h-full bg-[#2C1810] flex items-center justify-center opacity-20">
  <span className="text-6xl filter grayscale"></span>
 </div>
 )}
 </div>

 {/* Left 65%: Text on Parchment (Visually Left, DOM Second) */}
 <div className="w-full md:w-[65%] p-8 flex flex-col justify-center relative bg-[url('/textures/paper-texture.png')] bg-cover bg-no-repeat bg-[#F9F3E3]">
 <div className="absolute inset-0 border-r border-[#D4C5A9] hidden md:block"></div>
 
 {/* Content */}
 <div className="relative z-10 space-y-4">
 <div className="absolute top-0 right-0 z-20">
  <button
  onClick={(e) => {
  e.stopPropagation();
  handleListen(festival.id, festival.fullStory || festival.significance);
  }}
  className={`p-2 rounded-full transition-colors ${
  isSpeaking && speakingId === festival.id
  ? 'bg-[#800000] text-[#F5E6D3] animate-pulse'
  : 'bg-[#D97706]/10 text-[#D97706] hover:bg-[#800000] hover:text-[#F5E6D3]'
  }`}
  title={isSpeaking && speakingId === festival.id ? "Stop Narration" : "Listen to Story"}
  >
  {isSpeaking && speakingId === festival.id ? <StopIcon /> : <VolumeIcon />}
  </button>
 </div>

 <div className={`border-b pb-4 ${activeCategoryData.accentClass} border-opacity-30 pr-12`}>
  <h3 className="font-cinzel font-bold text-3xl text-[#800000] leading-tight">
  {festival.hindiName}
  </h3>
  <p className="font-playfair text-[#5D4037] text-lg mt-1 italic">
  {festival.name}
  </p>
 </div>

 <div className="space-y-2">
  <div className="flex items-center space-x-2 text-[#5D4037]/80 font-cinzel text-sm tracking-widest uppercase">
  <span>{festival.date}</span>
  <span>•</span>
  <span>Rajasthan</span>
  </div>
  
  <p className="font-cormorant text-xl text-[#2C1810] leading-relaxed">
  {festival.significance}
  </p>
 </div>

 <div className="pt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
  <span 
  className="font-cinzel text-sm border-b pb-1"
  style={{ color: activeCategoryData.color, borderColor: activeCategoryData.color }}
  >
  Read Rituals & Story
  </span>
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>

 {/* Enhanced Festival Detail Modal */}
 {selectedFestival && (
 <EnhancedStoryModal
 story={{
 ...selectedFestival,
 period: selectedFestival.date,
 region: 'राजस्थान',
 significance: selectedFestival.significance,
 characters: selectedFestival.rituals ? selectedFestival.rituals.split(', ') : [],
 themes: ['धार्मिक परंपरा', 'सांस्कृतिक उत्सव', 'राजपूत रीति-रिवाज'],
 moralLesson: selectedFestival.significance,
 historicalContext: `त्योहार तिथि: ${selectedFestival.date}, महत्व: ${selectedFestival.significance}`,
 culturalImpact: selectedFestival.description,
 englishName: selectedFestival.name,
 fullStory: selectedFestival.fullStory
 }}
 onClose={() => setSelectedFestival(null)}
 onListen={(text) => handleListen(selectedFestival.id, text)}
 isSpeaking={isSpeaking && speakingId === selectedFestival.id}
 isListening={isSpeaking && speakingId === selectedFestival.id}
 />
 )}
 </div>
 );
};

export default FestivalsPage;
