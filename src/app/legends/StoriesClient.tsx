"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import StoryCard from '../components/StoryCard';
import Hero from '../components/Hero';
import { useLanguage } from '../components/LanguageProvider';
import { Story } from '@/types/frontend';

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

interface StoriesClientProps {
 initialStories: Story[];
}

export default function StoriesClient({ initialStories }: StoriesClientProps) {
 const [selectedStory, setSelectedStory] = useState<Story | null>(null);
 const [filterCategory, setFilterCategory] = useState('all');
 const [filterDifficulty, setFilterDifficulty] = useState('all');
 const [searchTerm, setSearchTerm] = useState('');
 const [isPlaying, setIsPlaying] = useState(false);
 const [speakingId, setSpeakingId] = useState<string | null>(null);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const [stories, setStories] = useState<Story[]>(initialStories);
 const { t, speak, stopSpeaking, isSpeaking } = useLanguage();

 // Update stories when initialStories changes (e.g. revalidation)
 useEffect(() => {
 setStories(initialStories);
 }, [initialStories]);


 const filteredStories = useMemo(() => {
 return stories.filter(story => {
 const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  story.hindiTitle.includes(searchTerm) ||
  story.hero.toLowerCase().includes(searchTerm.toLowerCase());
 const matchesCategory = filterCategory === 'all' || story.category === filterCategory;
 const matchesDifficulty = filterDifficulty === 'all' || story.difficulty === filterDifficulty;
 return matchesSearch && matchesCategory && matchesDifficulty;
 });
 }, [stories, searchTerm, filterCategory, filterDifficulty]);

 const categories = useMemo(() => ['all', ...Array.from(new Set(stories.map(story => story.category)))], [stories]);
 const difficulties = useMemo(() => ['all', 'beginner', 'intermediate', 'advanced'], []);

 // Prioritize featured stories at the top of the grid
 const prioritizedStories = useMemo(() => {
 const arr = [...filteredStories];
 arr.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
 return arr;
 }, [filteredStories]);

 const handlePlayAudio = useCallback(async (storyId: string) => {
 try {
 const story = stories.find(s => s.id === storyId);
 if (!story) return;

 if (isSpeaking) {
 stopSpeaking();
 setIsPlaying(false);
 return;
 }

 setIsLoading(true);
 setError(null);
 
 // Construct the text to speak
 // Use hindi content if available and current language is hindi, otherwise english
 // For now, let's use the full story or summary
 const textToSpeak = story.fullStory || story.summary || story.title;

 speak(textToSpeak);
 setIsPlaying(true);
 setSpeakingId(storyId);
 
 } catch (err) {
 setError(t('stories.audioError'));
 console.error('Audio playback error:', err);
 } finally {
 setIsLoading(false);
 }
 }, [stories, isSpeaking, speak, stopSpeaking, t]);

 // Reset isPlaying when speaking stops
 useEffect(() => {
 if (!isSpeaking && isPlaying) {
 setIsPlaying(false);
 }
 }, [isSpeaking, isPlaying]);


 return (
 <div className="min-h-screen bg-ivory">
 {/* Navigation */}

 {/* Hero Section */}
 <Hero
 title={t('stories.title')}
 subtitle={t('stories.subtitle')}
 description={t('stories.heroDescription')}
 />

 {/* Error Display */}
 {error && (
 <section className="py-4">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded font-cormorant">
 {error}
 </div>
 </div>
 </section>
 )}

 {/* Search and Filter */}
 <section className="py-8 bg-sandstone-light/30">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-10 bg-white rounded-lg shadow-lg p-6 border-2 border-gold bg-gradient-to-br from-white to-saffron-light">
 <div className="relative flex-1 max-w-xl">
 <label className="block text-xs font-cinzel text-maroon mb-1">
 {t('stories.searchLabel')}
 </label>
 <input
 type="text"
 placeholder={t('stories.searchPlaceholder')}
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full px-4 py-3 border-2 border-gold rounded-lg font-cormorant text-maroon placeholder-maroon/60 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-saffron"
 />
 <span className="absolute right-3 top-3 text-maroon"></span>
 </div>
 
 <div className="flex items-center gap-6 w-full lg:w-auto">
 <div className="w-full lg:w-48">
 <label className="block text-xs font-cinzel text-maroon mb-1">
  {t('stories.categoryFilter')}
 </label>
 <select
  value={filterCategory}
  onChange={(e) => setFilterCategory(e.target.value)}
  className="w-full px-3 py-2 border-2 border-gold rounded-lg font-cinzel text-maroon bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-saffron"
 >
  {categories.map(category => (
  <option key={category} value={category}>
  {category === 'all' ? t('stories.allCategories') : category}
  </option>
  ))}
 </select>
 </div>
 
 <div className="w-full lg:w-48">
 <label className="block text-xs font-cinzel text-maroon mb-1">
  {t('stories.difficultyFilter')}
 </label>
 <select
  value={filterDifficulty}
  onChange={(e) => setFilterDifficulty(e.target.value)}
  className="w-full px-3 py-2 border-2 border-gold rounded-lg font-cinzel text-maroon bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-saffron"
 >
  {difficulties.map(difficulty => (
  <option key={difficulty} value={difficulty}>
  {difficulty === 'all'
  ? t('stories.allDifficulties')
  : difficulty === 'beginner'
  ? t('stories.difficultyBeginner')
  : difficulty === 'intermediate'
  ? t('stories.difficultyIntermediate')
  : t('stories.difficultyAdvanced')}
  </option>
  ))}
 </select>
 </div>
 
 <div className="flex-1 text-right">
 <span className="inline-flex items-center bg-maroon text-ivory px-3 py-1 rounded-full font-cinzel text-sm">
  {filteredStories.length} {t('stories.countLabel')}
 </span>
 </div>
 </div>
 </div>
 
 {filteredStories.length === 0 && !isLoading && (
 <div className="text-center py-12">
 <div className="text-6xl mb-4"></div>
 <h3 className="font-cinzel text-xl text-maroon mb-2">
 {t('stories.noneFoundTitle')}
 </h3>
 <p className="font-cormorant text-charcoal/70">
 {t('stories.noneFoundBody')}
 </p>
 </div>
 )}
 </div>
 </section>

 {/* Stories Grid */}
 <section className="py-12">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 {isLoading && (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
 {[1, 2, 3, 4, 5, 6].map((skeleton) => (
 <div key={skeleton} className="bg-white rounded-lg shadow-xl border-2 border-sandstone overflow-hidden animate-pulse">
  <div className="h-32 bg-gray-200"></div>
  <div className="p-6">
  <div className="h-4 bg-gray-200 rounded mb-2"></div>
  <div className="h-3 bg-gray-200 rounded mb-4"></div>
  <div className="h-3 bg-gray-200 rounded mb-2"></div>
  <div className="h-3 bg-gray-200 rounded mb-2"></div>
  <div className="h-3 bg-gray-200 rounded mb-4"></div>
  <div className="h-8 bg-gray-200 rounded"></div>
  </div>
 </div>
 ))}
 </div>
 )}
 
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {prioritizedStories.map((story) => (
 <StoryCard
 key={story.id}
 story={story}
 isLoading={isLoading}
 onSelect={(id) => {
  const s = prioritizedStories.find((st) => st.id === id);
  if (s) setSelectedStory(s);
 }}
 onPlayAudio={(id) => handlePlayAudio(id)}
 />
 ))}
 </div>
 </div>
 </section>

 {/* Story Detail Modal */}
 {selectedStory && (
 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
 <div className="bg-ivory rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
 <div className="sticky top-0 bg-maroon text-ivory p-6 rounded-t-lg">
 <div className="flex justify-between items-center">
 <div className="flex items-center space-x-4">
  <div className="text-3xl">{selectedStory.icon}</div>
  <div>
  <h2 className="font-cinzel font-bold text-2xl mb-1">
  {selectedStory.hindiTitle}
  </h2>
  <p className="font-playfair text-gold">{selectedStory.title}</p>
  </div>
 </div>
 <button
  onClick={() => setSelectedStory(null)}
  className="text-gold hover:text-saffron text-2xl"
 >
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
 </button>
 </div>
 </div>
 
 <div className="p-6">
 {/* Surrounding detailed info layout */}
 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
 {/* Left sidebar: Quick Facts */}
 <aside className="md:col-span-1 space-y-4">
  <div className="bg-white rounded-lg border-2 border-sandstone p-4">
  <h3 className="font-cinzel font-bold text-lg text-maroon mb-3">
  {t('stories.quickFacts')}
  </h3>
  <div className="space-y-2 text-sm">
  <div>
  <span className="font-semibold">{t('stories.heroLabel')}</span>{' '}
  {selectedStory.hero}
  </div>
  <div>
  <span className="font-semibold">{t('stories.periodLabel')}</span>{' '}
  {selectedStory.period}
  </div>
  <div>
  <span className="font-semibold">{t('stories.durationLabel')}</span>{' '}
  {selectedStory.duration}
  </div>
  <div>
  <span className="font-semibold">{t('stories.categoryLabel')}</span>{' '}
  {selectedStory.category}
  </div>
  <div>
  <span className="font-semibold">{t('stories.difficultyLabel')}</span>{' '}
  {selectedStory.difficulty === 'beginner'
  ? t('stories.difficultyBeginner')
  : selectedStory.difficulty === 'intermediate'
  ? t('stories.difficultyIntermediate')
  : t('stories.difficultyAdvanced')}
  </div>
  {selectedStory.region && (
  <div>
  <span className="font-semibold">{t('stories.regionLabel')}</span>{' '}
  {selectedStory.region}
  </div>
  )}
  </div>
  {Array.isArray(selectedStory.tags) && selectedStory.tags.length > 0 && (
  <div className="mt-3 flex flex-wrap gap-2">
  {selectedStory.tags.map((t) => (
  <span key={t} className="text-xs bg-saffron text-ivory px-2 py-1 rounded font-cinzel">{t}</span>
  ))}
  </div>
  )}
  </div>

  {/* Related & Locations */}
  {(selectedStory.relatedFigures?.length || selectedStory.locations?.length) && (
  <div className="bg-white rounded-lg border-2 border-sandstone p-4">
  <h3 className="font-cinzel font-bold text-lg text-maroon mb-3">
  {t('stories.relatedHeading')}
  </h3>
  {selectedStory.relatedFigures?.length ? (
  <div className="mb-2">
  <div className="font-semibold text-sm mb-1">
  {t('stories.charactersLabel')}
  </div>
  <ul className="list-disc list-inside text-sm text-charcoal">
  {selectedStory.relatedFigures.map((rf) => <li key={rf}>{rf}</li>)}
  </ul>
  </div>
  ) : null}
  {selectedStory.locations?.length ? (
  <div>
  <div className="font-semibold text-sm mb-1">
  {t('stories.locationsLabel')}
  </div>
  <ul className="list-disc list-inside text-sm text-charcoal">
  {selectedStory.locations.map((loc) => <li key={loc}>{loc}</li>)}
  </ul>
  </div>
  ) : null}
  </div>
  )}
 </aside>

 {/* Center: Full Story */}
 <main className="md:col-span-2">
  <h3 className="font-cinzel font-bold text-lg text-maroon mb-3">
  {t('stories.fullStoryHeading')}
  </h3>
  {/* Render long-form sections if available */}
  {selectedStory.sections?.length ? (
  <div className="space-y-6">
  {selectedStory.sections.map((sec, idx) => (
  <section key={idx} className="bg-sandstone-light/20 p-4 rounded-lg">
  {sec.heading && (
  <h4 className="font-cinzel font-semibold text-maroon mb-2">
  {sec.heading}
  </h4>
  )}
  <p className="font-cormorant text-charcoal leading-relaxed whitespace-pre-line">
  {sec.content}
  </p>
  </section>
  ))}
  </div>
  ) : (
  <div className="bg-sandstone-light/20 p-4 rounded-lg">
  <p className="font-cormorant text-charcoal leading-relaxed whitespace-pre-line">
  {selectedStory.fullStory}
  </p>
  </div>
  )}

  {/* Quotes */}
  {selectedStory.quotes?.length ? (
  <div className="mt-4 space-y-3">
  {selectedStory.quotes.map((q, idx) => (
  <blockquote key={idx} className="border-l-4 border-gold pl-4 text-maroon font-playfair">
  “{q.text}”
  {q.attribution && <div className="text-sm text-charcoal/70 mt-1">— {q.attribution}</div>}
  </blockquote>
  ))}
  </div>
  ) : null}
 </main>

 {/* Right sidebar: Context & Moral */}
 <aside className="md:col-span-1 space-y-4">
  <div className="bg-white rounded-lg border-2 border-sandstone p-4">
  <h3 className="font-cinzel font-bold text-lg text-maroon mb-3">
  {t('stories.historicalContextHeading')}
  </h3>
  <p className="text-sm text-charcoal">{selectedStory.historicalContext}</p>
  </div>
  <div className="bg-white rounded-lg border-2 border-sandstone p-4">
  <h3 className="font-cinzel font-bold text-lg text-maroon mb-3">
  {t('stories.moralLessonHeading')}
  </h3>
  <p className="text-sm text-charcoal">{selectedStory.moralLesson}</p>
  </div>
 </aside>
 </div>

 {/* Lower grid: Timeline / Sources */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
 {selectedStory.keyEvents?.length ? (
  <div className="bg-white rounded-lg border-2 border-sandstone p-4">
  <h3 className="font-cinzel font-bold text-lg text-maroon mb-3">
  {t('stories.timelineHeading')}
  </h3>
  <ul className="space-y-2">
  {selectedStory.keyEvents.map((ev, idx) => (
  <li key={idx} className="text-sm">
  <div className="font-semibold">{ev.title}</div>
  {ev.date && <div className="text-charcoal/70">{ev.date}</div>}
  {ev.detail && <div className="text-charcoal">{ev.detail}</div>}
  </li>
  ))}
  </ul>
  </div>
 ) : null}

 {selectedStory.sources?.length ? (
  <div className="bg-white rounded-lg border-2 border-sandstone p-4">
  <h3 className="font-cinzel font-bold text-lg text-maroon mb-3">
  {t('stories.sourcesHeading')}
  </h3>
  <ul className="list-disc list-inside text-sm text-charcoal">
  {selectedStory.sources.map((s) => <li key={s}>{s}</li>)}
  </ul>
  </div>
 ) : null}

 {/* Actions */}
 <div className="bg-white rounded-lg border-2 border-sandstone p-4 flex flex-col gap-3 justify-between">
  {selectedStory.audioAvailable && (
  <button 
  onClick={() => handlePlayAudio(selectedStory.id)}
  disabled={isLoading && !(isSpeaking && speakingId === selectedStory.id)}
  className={`w-full flex items-center justify-center gap-2 font-cinzel font-semibold py-3 rounded rajput-hover disabled:opacity-50 disabled:cursor-not-allowed ${
  isSpeaking && speakingId === selectedStory.id
  ? 'bg-maroon text-ivory animate-pulse'
  : 'bg-saffron-gradient text-maroon'
  }`}
  >
  {isSpeaking && speakingId === selectedStory.id ? (
  <><StopIcon /> {t('stories.stopAudio') || 'Stop Narration'}</>
  ) : (
  <><VolumeIcon /> {t('stories.audioCta')}</>
  )}
  </button>
  )}
  <div className="flex gap-3">
  <button className="flex-1 bg-sandstone-gradient text-maroon font-cinzel font-semibold py-3 rounded rajput-hover">
  {t('stories.shareCta')}
  </button>
  <button className="flex-1 bg-gold/20 border-2 border-gold text-maroon font-cinzel font-semibold py-3 rounded rajput-hover">
  {t('stories.favoriteCta')}
  </button>
  </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 )}
 {/* Footer removed: now provided by global layout */}
 </div>
 );
}
