'use client';

import React, { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import MediaGallery, { GalleryImage, GalleryVideo } from './MediaGallery';

type Language = 'hi' | 'en';

interface Story {
 id?: string;
 name: string;
 hindiName?: string;
 englishName?: string;
 period?: string;
 region?: string;
 significance: string | string[];
 characters?: string[];
 themes?: string[];
 moralLesson?: string;
 historicalContext?: string;
 culturalImpact?: string;
 fullStory: string;
 stories?: Array<{
 title: string;
 fullStory: string;
 }>;
 galleryImages?: GalleryImage[];
 galleryVideos?: GalleryVideo[];
}

interface StoryModalProps {
 story: Story;
 onClose: () => void;
 onListen: (text: string) => void;
 isSpeaking: boolean;
 isListening: boolean;
}

const EnhancedStoryModal: React.FC<StoryModalProps> = ({
 story,
 onClose,
 onListen,
 isSpeaking,
 isListening
}) => {
 const { currentLanguage, t } = useLanguage();
 const [modalLanguage, setModalLanguage] = useState<Language>(currentLanguage);
 const [showLanguageMenu, setShowLanguageMenu] = useState(false);
 const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

 // Check if story has multiple stories
 const hasMultipleStories = story.stories && story.stories.length > 0;
 const stories = hasMultipleStories ? story.stories : [{ title: story.name, fullStory: story.fullStory || '' }];
 const currentStory = stories?.[currentStoryIndex] || { title: story.name, fullStory: story.fullStory || '' };
 const totalStories = stories?.length || 1;

 const languageOptions: { code: Language; name: string; flag: string }[] = [
 { code: 'hi', name: 'हिंदी', flag: '' },
 { code: 'en', name: 'English', flag: '' }
 ];

 const handleLanguageChange = (lang: Language) => {
 setModalLanguage(lang);
 setShowLanguageMenu(false);
 };

 const displayText = (text?: string) => {
 if (!text) return '';
 
 // If we have a translation, use it. Otherwise, show the original text.
 // We don't want to show "Translation coming soon" anymore.
 return text;
 };

 const getCurrentLanguageName = () => {
 const lang = languageOptions.find(l => l.code === modalLanguage);
 return lang ? `${lang.flag} ${lang.name}` : ' हिंदी';
 };

 // Story navigation functions
 const goToNextStory = () => {
 if (currentStoryIndex < totalStories - 1) {
 setCurrentStoryIndex(currentStoryIndex + 1);
 }
 };

 const goToPreviousStory = () => {
 if (currentStoryIndex > 0) {
 setCurrentStoryIndex(currentStoryIndex - 1);
 }
 };

 return (
 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
 <div className="bg-ivory rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
 <div className="sticky top-0 bg-saffron text-maroon p-6 rounded-t-2xl">
 <div className="flex justify-between items-center">
 <div className="flex-1">
 <h2 className="font-cinzel font-bold text-3xl mb-2">
 {modalLanguage === 'hi' ? displayText(story.hindiName || story.name) : displayText(story.englishName || story.name)}
 </h2>
 <p className="font-playfair text-maroon-dark text-xl">
 {modalLanguage === 'hi' ? displayText(story.hindiName || story.name) : displayText(story.englishName || story.name)}
 </p>
 {hasMultipleStories && (
 <div className="mt-3 flex items-center gap-3">
  <h3 className="font-cinzel font-semibold text-lg text-maroon-dark">
  {currentStory.title}
  </h3>
  <span className="text-sm bg-maroon text-saffron px-3 py-1 rounded-full">
  {modalLanguage === 'hi' ? 'कहानी' : 'Story'} {currentStoryIndex + 1} / {totalStories}
  </span>
 </div>
 )}
 </div>
 
 {/* Language Selector */}
 <div className="relative mx-4">
 <button
 onClick={() => setShowLanguageMenu(!showLanguageMenu)}
 className="flex items-center gap-2 px-3 py-2 bg-maroon text-saffron rounded-lg hover:bg-maroon-dark transition-colors font-cinzel text-sm"
 >
 {getCurrentLanguageName()}
 <span className="text-xs">▼</span>
 </button>
 
 {showLanguageMenu && (
 <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gold/30 z-10 min-w-[150px]">
  {languageOptions.map((lang) => (
  <button
  key={lang.code}
  onClick={() => handleLanguageChange(lang.code)}
  className={`w-full text-left px-4 py-2 hover:bg-saffron/20 transition-colors font-cinzel text-sm flex items-center gap-2 ${
  modalLanguage === lang.code ? 'bg-saffron/30 text-maroon font-semibold' : 'text-charcoal'
  } ${lang === languageOptions[0] ? 'rounded-t-lg' : ''} ${lang === languageOptions[languageOptions.length - 1] ? 'rounded-b-lg' : ''}`}
  >
  <span>{lang.flag}</span>
  <span>{lang.name}</span>
  </button>
  ))}
 </div>
 )}
 </div>
 
 {/* Audio and Close Controls */}
 <div className="flex items-center gap-3">
 <button
 onClick={() => onListen(story.fullStory)}
 className={`flex items-center gap-2 px-4 py-2 rounded-lg font-cinzel text-sm transition-colors ${
  isSpeaking && isListening 
  ? 'bg-maroon text-saffron' 
  : 'bg-maroon-dark hover:bg-maroon text-saffron'
 }`}
 >
 {isSpeaking && isListening ? (t('stories.stopAudio') || 'Stop') : t('stories.audioCta')}
 </button>
 <button
 onClick={onClose}
 className="text-maroon hover:text-maroon-dark text-2xl transition-colors"
 >
 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
 </svg>
 </button>
 </div>
 </div>
 </div>
 
 <div className="p-8">
 {/* Story Metadata */}
 {(story.period || story.region || story.significance) && (
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
 {story.period && (
 <div className="bg-saffron/10 p-4 rounded-lg">
  <h4 className="font-cinzel font-semibold text-maroon mb-2">{modalLanguage === 'hi' ? t('concepts.time') : t('stories.periodLabel')}</h4>
  <p className="font-cormorant text-charcoal">{displayText(story.period)}</p>
 </div>
 )}
 {story.region && (
 <div className="bg-gold/10 p-4 rounded-lg">
  <h4 className="font-cinzel font-semibold text-maroon mb-2">{modalLanguage === 'hi' ? 'क्षेत्र' : 'Region'}</h4>
  <p className="font-cormorant text-charcoal">{displayText(story.region)}</p>
 </div>
 )}
 {story.significance && (
 <div className="bg-maroon/10 p-4 rounded-lg">
  <h4 className="font-cinzel font-semibold text-maroon mb-2">{modalLanguage === 'hi' ? 'महत्व' : 'Significance'}</h4>
  <p className="font-cormorant text-charcoal">{Array.isArray(story.significance) ? story.significance.map(s => displayText(s)).join(' ') : displayText(story.significance)}</p>
 </div>
 )}
 </div>
 )}
 
 {/* Additional Story Details */}
 {(story.characters || story.themes || story.moralLesson) && (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
 {story.characters && (
 <div className="bg-ivory border-l-4 border-saffron p-4 rounded-lg">
  <h4 className="font-cinzel font-semibold text-lg text-maroon mb-3">{modalLanguage === 'hi' ? t('stories.charactersLabel') : t('stories.charactersLabel')}</h4>
  <ul className="space-y-2">
  {story.characters.map((character: string, index: number) => (
  <li key={index} className="font-cormorant text-charcoal flex items-start gap-2">
  <span className="text-saffron">•</span>
  <span>{displayText(character)}</span>
  </li>
  ))}
  </ul>
 </div>
 )}
 
 {story.themes && (
 <div className="bg-ivory border-l-4 border-gold p-4 rounded-lg">
  <h4 className="font-cinzel font-semibold text-lg text-maroon mb-3">{modalLanguage === 'hi' ? t('concepts.themes') : t('concepts.themes')}</h4>
  <ul className="space-y-2">
  {story.themes.map((theme: string, index: number) => (
  <li key={index} className="font-cormorant text-charcoal flex items-start gap-2">
  <span className="text-gold">•</span>
  <span>{displayText(theme)}</span>
  </li>
  ))}
  </ul>
 </div>
 )}
 </div>
 )}
 
 {/* Moral Lesson */}
 {story.moralLesson && (
 <div className="bg-gradient-to-r from-saffron/20 to-gold/20 p-6 rounded-lg mb-8">
 <h4 className="font-cinzel font-semibold text-xl text-maroon mb-3">{t('stories.moralLessonHeading')}</h4>
 <p className="font-cormorant text-charcoal text-lg italic">
{displayText(story.moralLesson)}
 </p>
 </div>
 )}
 
 {/* Multimedia Gallery Section - Moved Above Story */}
 {(story.galleryImages?.length || story.galleryVideos?.length) ? (
 <div className="mb-8">
 <h4 className="font-cinzel font-semibold text-xl text-maroon mb-4">
  {t('gallery.multimedia')}
 </h4>
 <MediaGallery 
 images={story.galleryImages} 
 videos={story.galleryVideos} 
 />
 </div>
 ) : null}

 {/* Main Story Content - Continuous Flow */}
 <div className="mb-8">
 <h4 className="font-cinzel font-semibold text-xl text-maroon mb-4">
 {t('stories.fullStoryHeading')}
 </h4>
 <div className="bg-ivory border-l-4 border-saffron p-8 rounded-lg">
 <div className="font-cormorant text-charcoal leading-relaxed text-justify">
 <div className="prose prose-lg max-w-none">
  {displayText(currentStory?.fullStory || story.fullStory || '')
  .split('\n\n')
  .map((paragraph: string, index: number) => {
  const cleanText = paragraph
  .replace(/\*\*(.*?)\*\*/g, '$1')
  .replace(/\*(.*?)\*/g, '$1')
  .replace(/\[IMAGE_PLACEHOLDER:.*?\]/g, '')
  .replace(/[]/g, '')
  .replace(/"([^"]+)"/g, '$1')
  .trim();
  
  if (!cleanText) return null;
  
  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
  return (
  <h3 key={index} className="text-2xl font-cinzel font-bold text-maroon mb-4 mt-6 border-l-4 border-saffron pl-4 bg-saffron bg-opacity-10 py-2 rounded-r-lg">
  {cleanText}
  </h3>
  );
  }
  
  return (
  <p key={index} className="mb-4 text-lg leading-relaxed text-justify">
  {cleanText}
  </p>
  );
  })
  .filter(Boolean)
  }
 </div>
 </div>
 </div>
 </div>
 
 {/* Historical Context */}
 {story.historicalContext && (
 <div className="bg-maroon/5 p-6 rounded-lg mb-8">
 <h4 className="font-cinzel font-semibold text-xl text-maroon mb-4">
  {t('stories.historicalContextHeading')}
 </h4>
 <p className="font-cormorant text-charcoal text-lg leading-relaxed">
{displayText(story.historicalContext || '')}
 </p>
 </div>
 )}
 
 {/* Cultural Impact */}
 {story.culturalImpact && (
 <div className="bg-gold/5 p-6 rounded-lg">
 <h4 className="font-cinzel font-semibold text-xl text-maroon mb-4">
  {t('concepts.culturalImpact')}
 </h4>
 <p className="font-cormorant text-charcoal text-lg leading-relaxed">
{displayText(story.culturalImpact || '')}
 </p>
 </div>
 )}
 </div>
 
 {/* Story Navigation Footer */}
 {hasMultipleStories && (
 <div className="bg-saffron/10 p-6 border-t border-saffron/20 rounded-b-2xl">
 <div className="flex justify-between items-center">
 <button
 onClick={goToPreviousStory}
 disabled={currentStoryIndex === 0}
 className={`flex items-center gap-2 px-6 py-3 rounded-lg font-cinzel font-semibold transition-colors ${
  currentStoryIndex === 0
  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
  : 'bg-maroon text-saffron hover:bg-maroon-dark'
 }`}
 >
 ⬅ {modalLanguage === 'en' ? 'Previous Story' : 'पिछली कहानी'}
 </button>
 
 <div className="text-center">
 <div className="font-cinzel text-maroon font-bold text-lg">
  {currentStoryIndex + 1} / {totalStories}
 </div>
 <div className="font-playfair text-maroon-dark text-sm">
  {modalLanguage === 'en' ? 'Stories' : 'कहानियाँ'}
 </div>
 </div>
 
 <button
 onClick={goToNextStory}
 disabled={currentStoryIndex === totalStories - 1}
 className={`flex items-center gap-2 px-6 py-3 rounded-lg font-cinzel font-semibold transition-colors ${
  currentStoryIndex === totalStories - 1
  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
  : 'bg-maroon text-saffron hover:bg-maroon-dark'
 }`}
 >
 {modalLanguage === 'en' ? 'Next Story' : 'अगली कहानी'} 
 </button>
 </div>
 </div>
 )}
 </div>
 </div>
 );

};

export default EnhancedStoryModal;
