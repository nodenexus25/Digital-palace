'use client';

import React, { useState } from 'react';
import LazyImage from '../components/LazyImage';

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

interface StoryCardProps {
 story: {
 id: string;
 title: string;
 hindiTitle: string;
 summary: string;
 category: string;
 difficulty: 'beginner' | 'intermediate' | 'advanced';
 icon: string;
 audioAvailable: boolean;
 duration: string;
 hero: string;
 period: string;
 images?: string[];
 featured?: boolean;
 };
 isLoading: boolean;
 isSpeaking?: boolean;
 onSelect: (storyId: string) => void;
 onPlayAudio: (storyId: string) => void;
 onClose?: (storyId: string) => void;
}

export default function StoryCard({ story, isLoading, isSpeaking = false, onSelect, onPlayAudio, onClose }: StoryCardProps) {
 const [isVisible, setIsVisible] = useState(true);
 const [hasImageError, setHasImageError] = useState(false);

 if (!isVisible) return null;

 const difficultyClass =
 story.difficulty === 'beginner'
 ? 'bg-green-100 text-green-800'
 : story.difficulty === 'intermediate'
 ? 'bg-yellow-100 text-yellow-800'
 : 'bg-red-100 text-red-800';

 return (
 <div
 className={`group relative bg-white rounded-2xl shadow-xl border-[3px] border-gold/60 hover:border-gold/90 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-2xl cursor-pointer overflow-hidden ${story.featured ? 'lg:col-span-2' : ''}`}
 onClick={() => onSelect(story.id)}
 >
 {/* Close Button */}
 <button
 onClick={(e) => {
 e.stopPropagation();
 if (onClose) {
 onClose(story.id);
 } else {
 setIsVisible(false);
 }
 }}
 className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
 title="Dismiss story"
 >
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
 </svg>
 </button>

 <div className="relative h-48 overflow-hidden">
 {/* Media */}
 {story.images && story.images.length > 0 && !hasImageError ? (
 story.images.length === 1 ? (
 <LazyImage
 src={story.images[0]}
 alt={story.title}
 fill
 className="object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
 onError={() => setHasImageError(true)}
 />
 ) : (
 <div className="grid grid-cols-2 h-full">
 <div className="relative h-full">
 <LazyImage
  src={story.images[0]}
  alt={story.title}
  fill
  className="object-cover"
  onError={() => setHasImageError(true)}
 />
 </div>
 <div className="relative h-full">
 <LazyImage
  src={story.images[1]}
  alt={story.title}
  fill
  className="object-cover"
  onError={() => setHasImageError(true)}
 />
 </div>
 </div>
 )
 ) : (
 <div className="h-full bg-gradient-to-br from-maroon to-royal-blue flex items-center justify-center">
 <div className="text-5xl">{story.icon}</div>
 </div>
 )}

 {/* Overlay gradient */}
 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

 {/* Badges & audio */}
 <div className="absolute top-2 left-2 flex gap-2">
 <span className="text-xs bg-saffron text-ivory px-2 py-1 rounded font-cinzel shadow">
 {story.category}
 </span>
 <span className={`text-xs px-2 py-1 rounded font-cinzel shadow ${difficultyClass}`}>
 {story.difficulty === 'beginner' ? 'आसान' : story.difficulty === 'intermediate' ? 'मध्यम' : 'कठिन'}
 </span>
 </div>

 {story.audioAvailable && (
 <button
 onClick={(e) => { e.stopPropagation(); onPlayAudio(story.id); }}
 disabled={isLoading && !isSpeaking}
 className={`absolute bottom-2 right-2 flex items-center gap-1 px-3 py-1 rounded text-sm shadow font-cinzel font-semibold disabled:opacity-50 ${
 isSpeaking 
 ? 'bg-maroon text-ivory animate-pulse' 
 : 'bg-gold text-maroon hover:bg-gold/90'
 }`}
 >
 {isSpeaking ? <><StopIcon /> रोकें</> : <><VolumeIcon /> सुनें</>}
 </button>
 )}
 </div>

 {/* Content */}
 <div className="p-6">
 <div className="flex justify-between items-start mb-3">
 <div className="flex-1">
 <h3 className="font-cinzel font-bold text-lg text-maroon mb-1">
 {story.hindiTitle}
 </h3>
 <h4 className="font-playfair text-md text-saffron">
 {story.title}
 </h4>
 </div>
 </div>

 <div className="grid grid-cols-3 gap-3 text-sm mb-4">
 <div className="flex items-center text-charcoal">
 <span className="text-saffron mr-2"></span>
 <span className="font-cormorant truncate">{story.hero}</span>
 </div>
 <div className="flex items-center text-charcoal">
 <span className="text-saffron mr-2"></span>
 <span className="font-cormorant truncate">{story.period}</span>
 </div>
 <div className="flex items-center text-charcoal">
 <span className="text-saffron mr-2">⏱</span>
 <span className="font-cormorant truncate">{story.duration}</span>
 </div>
 </div>

 <p className="font-cormorant text-charcoal/80 text-sm leading-relaxed mb-4">
 {story.summary.length > 180 ? story.summary.slice(0, 177) + '…' : story.summary}
 </p>

 <div className="flex gap-2">
 <button
 className="flex-1 bg-saffron-gradient text-maroon font-cinzel font-semibold py-2 rounded text-sm"
 onClick={(e) => { e.stopPropagation(); onSelect(story.id); }}
 >
 पढ़ें
 </button>
 {story.audioAvailable && (
 <button
 onClick={(e) => { e.stopPropagation(); onPlayAudio(story.id); }}
 disabled={isLoading && !isSpeaking}
 className={`flex-1 flex items-center justify-center gap-2 font-cinzel font-semibold py-2 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
 isSpeaking 
  ? 'bg-maroon text-ivory animate-pulse' 
  : 'bg-gold text-maroon hover:bg-gold/90'
 }`}
 >
 {isSpeaking ? <><StopIcon /> रोकें</> : <><VolumeIcon /> सुनें</>}
 </button>
 )}
 </div>
 </div>
 </div>
 );
}
