"use client";

import { useState, useEffect } from 'react';
import type { Legend } from './page';
import MediaGallery from '../components/MediaGallery';
import LazyImage from '../components/LazyImage';
import { useLanguage } from '../components/LanguageProvider';

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

interface LegendsClientProps {
 legends: Legend[];
}

export default function LegendsClient({ legends }: LegendsClientProps) {
 const [selectedLegend, setSelectedLegend] = useState<Legend | null>(null);
 const { speak, stopSpeaking, isSpeaking } = useLanguage();
 const [isListening, setIsListening] = useState(false);
 const [speakingId, setSpeakingId] = useState<string | null>(null);

 // Reset isListening when speaking stops
 useEffect(() => {
 if (!isSpeaking) {
 setIsListening(false);
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
 setIsListening(true);
 setSpeakingId(id);
 };

 return (
 <main className="min-h-screen bg-[#050507] text-[#F5E9D0]">
 <section className="relative min-h-[70vh] overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-black via-[#120C0A] to-black" />
 <div className="absolute -left-32 top-0 h-80 w-80 bg-[#8B0000]/35 blur-3xl" />
 <div className="absolute right-0 bottom-0 h-[22rem] w-[22rem] bg-[#D4AF37]/15 blur-3xl" />
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)] opacity-50" />
 <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(0,0,0,0.85),_rgba(0,0,0,0.95))]" />

 <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-24 lg:py-28 flex flex-col gap-12 md:flex-row md:items-center">
 <div className="flex-1 space-y-6">
 <div className="inline-flex items-center gap-3 rounded-full border border-[#C9A24D]/40 bg-black/40 px-4 py-2 text-[11px] tracking-[0.28em] font-cinzel uppercase text-[#F5E9D0]/80">
 <span className="h-px w-6 bg-gradient-to-r from-transparent via-[#C9A24D] to-transparent" />
 War Chronicles
 <span className="h-px w-6 bg-gradient-to-r from-transparent via-[#C9A24D] to-transparent" />
 </div>
 <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] md:tracking-[0.25em] text-[#F5E9D0]">
 LEGENDS OF RAJPUTANA
 </h1>
 <p className="font-cormorant text-lg md:text-xl text-[#F5E9D0]/80 max-w-2xl leading-relaxed">
 Smoke on the horizon, steel in the dark, and names etched into time. These are not tales of spectacle, but of weighty choices made beneath a blood-red sky.
 </p>
 <div className="flex flex-wrap gap-3 text-xs font-cinzel tracking-[0.2em] uppercase text-[#F5E9D0]/70">
 <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A24D]/40 bg-black/40 px-4 py-2">
 <span className="h-1 w-1 rounded-full bg-[#C9A24D]" />
 Steel
 </span>
 <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A24D]/40 bg-black/40 px-4 py-2">
 <span className="h-1 w-1 rounded-full bg-[#C9A24D]" />
 Smoke
 </span>
 <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A24D]/40 bg-black/40 px-4 py-2">
 <span className="h-1 w-1 rounded-full bg-[#C9A24D]" />
 Sacrifice
 </span>
 <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A24D]/40 bg-black/40 px-4 py-2">
 <span className="h-1 w-1 rounded-full bg-[#C9A24D]" />
 Enduring Glory
 </span>
 </div>
 </div>

 <div className="flex-1 max-w-md md:max-w-none">
 <div className="relative rounded-3xl border border-[#C9A24D]/40 bg-gradient-to-br from-[#0B0807] via-[#1A100D] to-[#2B1510] px-6 py-7 shadow-[0_40px_120px_rgba(0,0,0,0.85)]">
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,250,250,0.08),_transparent_60%)] opacity-70" />
 <div className="relative space-y-4">
 <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#C9A24D]/90">
  Battlefield Oath
 </p>
 <p className="font-cormorant text-base md:text-lg text-[#F5E9D0]/90 leading-relaxed">
  On the ramparts of Rajputana, glory was never painted in excess. It was the quiet resolve in a warrior&apos;s breath, the muted ring of steel meeting steel, and the decision to stand when retreat would have been easier.
 </p>
 <p className="font-cormorant text-sm text-[#F5E9D0]/70">
  This chronicle gathers such moments—cinematic in scale, but grounded in the dust, smoke, and solemn honor of real histories.
 </p>
 <div className="mt-4 flex items-center gap-3 text-[11px] font-cinzel tracking-[0.2em] uppercase text-[#F5E9D0]/70">
  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A24D]/60 to-transparent" />
  Curated War Legends
  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A24D]/60 to-transparent" />
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 <section className="border-t border-[#C9A24D]/30 bg-gradient-to-b from-black via-[#0B0908] to-[#050507] py-14 md:py-18">
 <div className="max-w-6xl mx-auto px-6 space-y-10">
 <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
 <div>
 <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#C9A24D]/80">
 War Sagas
 </p>
 <h2 className="mt-2 font-cinzel text-2xl md:text-3xl tracking-[0.18em] text-[#F5E9D0]">
 CINEMATIC LEGENDS
 </h2>
 <p className="mt-3 max-w-xl font-cormorant text-sm md:text-base text-[#F5E9D0]/75 leading-relaxed">
 Each legend appears as a cinematic frame: muted colors, cold steel, and the weight of a single irreversible decision.
 </p>
 </div>
 </div>

 <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
 {legends.map((legend) => (
 <article
 key={legend.id}
 id={legend.id}
 className="group relative overflow-hidden rounded-2xl border border-[#C9A24D]/30 bg-gradient-to-br from-[#050404] via-[#120A0A] to-[#24110D] shadow-[0_25px_80px_rgba(0,0,0,0.8)] cursor-pointer transform transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_35px_100px_rgba(0,0,0,0.9)]"
 onClick={() => setSelectedLegend(legend)}
 >
  {/* Close Button */}
  <button
  onClick={(e) => {
  e.stopPropagation();
  const el = document.getElementById(legend.id);
  if (el) el.style.display = 'none';
  }}
  className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-[#F5E9D0] border border-[#C9A24D]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60"
  title="Dismiss legend"
  >
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
  </button>
 <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]" />
 <div className="relative flex h-full flex-col">
  <div className="relative h-40 overflow-hidden">
  <LazyImage fill
  src={legend.coverImage.src}
  alt={legend.coverImage.alt || legend.title}
  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
  </div>

  <div className="relative z-10 p-6 flex flex-1 flex-col">
  <div className="mb-4 flex items-center justify-between gap-3">
  <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-[#C9A24D]/90">
  {legend.category}
  </span>
  <span className="rounded-full border border-[#C9A24D]/40 bg-black/40 px-3 py-1 text-[10px] font-cinzel tracking-[0.2em] uppercase text-[#F5E9D0]/80">
  {legend.era}
  </span>
  </div>

  <h3 className="font-cinzel text-xl text-[#F5E9D0] tracking-[0.12em] mb-2">
  {legend.title}
  </h3>
  <p className="font-cormorant text-sm text-[#F5E9D0]/80 leading-relaxed mb-4 line-clamp-3">
  {legend.hook}
  </p>

  <div className="mt-auto space-y-4">
  <div className="flex items-center justify-between text-[11px] font-cinzel tracking-[0.18em] uppercase text-[#F5E9D0]/70">
  <button
  onClick={(e) => {
  e.stopPropagation();
  handleListen(legend.id, legend.hook + " " + legend.story.join(" "));
  }}
  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 transition-all duration-300 ${
  isSpeaking && speakingId === legend.id
  ? 'bg-[#C9A24D] text-black border-[#C9A24D] animate-pulse'
  : 'border-[#C9A24D]/40 text-[#C9A24D] hover:bg-[#C9A24D]/10'
  }`}
  >
  {isSpeaking && speakingId === legend.id ? <><StopIcon /> Stop</> : <><VolumeIcon /> Listen</>}
  </button>
  <span className="inline-flex items-center gap-2">
  <span className="h-1 w-1 rounded-full bg-[#C9A24D]" />
  War Chronicle
  </span>
  </div>

  <div className="inline-flex items-center justify-between gap-3 rounded-full border border-[#C9A24D]/60 bg-gradient-to-r from-[#2B1510] to-[#5C2A1A] px-5 py-2 text-[11px] font-cinzel tracking-[0.25em] uppercase text-[#F5E9D0] transition-colors duration-300 group-hover:from-[#5C2A1A] group-hover:to-[#9B3A24]">
  <span>Explore the Saga</span>
  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/40 border border-[#C9A24D]/60 text-[10px]">
  ↗
  </span>
  </div>
  </div>
  </div>
 </div>
 </article>
 ))}
 </div>
 </div>
 </section>

 {selectedLegend && (
 <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
 <div className="bg-[#050507] text-[#F5E9D0] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#C9A24D]/50 shadow-[0_40px_120px_rgba(0,0,0,0.95)] relative">
 <div className="sticky top-0 z-20 bg-gradient-to-r from-black via-[#120A0A] to-black border-b border-[#C9A24D]/40 px-6 py-5 flex items-center justify-between">
 <div className="flex flex-col gap-2">
 <p className="font-cinzel text-[11px] tracking-[0.25em] uppercase text-[#C9A24D]/85">
  {selectedLegend.category}
 </p>
 <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.16em]">
  {selectedLegend.title}
 </h2>
 <div className="flex flex-wrap gap-2 text-[11px] font-cinzel tracking-[0.2em] uppercase text-[#F5E9D0]/75">
  <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A24D]/40 bg-black/40 px-3 py-1">
  {selectedLegend.era}
  </span>
  <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A24D]/40 bg-black/40 px-3 py-1">
  {selectedLegend.location}
  </span>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <button
  onClick={() => handleListen(selectedLegend.id, selectedLegend.story.join(' '))}
  className={`flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A24D]/60 text-xs font-cinzel tracking-[0.2em] uppercase transition-colors duration-200 ${
  isSpeaking && isListening && speakingId === selectedLegend.id
  ? 'bg-[#C9A24D] text-black animate-pulse'
  : 'text-[#F5E9D0] hover:bg-[#C9A24D]/20'
  }`}
 >
  {isSpeaking && isListening && speakingId === selectedLegend.id ? (
  <><StopIcon /> Stop Narration</>
  ) : (
  <><VolumeIcon /> Listen to Legend</>
  )}
 </button>
 <button
  onClick={() => setSelectedLegend(null)}
  className="w-9 h-9 flex items-center justify-center rounded-full border border-[#C9A24D]/60 text-[#F5E9D0] hover:bg-[#C9A24D] hover:text-black transition-colors duration-200"
 >
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
 </button>
 </div>
 </div>

 <div className="relative h-56 md:h-72 overflow-hidden">
 <LazyImage fill
 src={selectedLegend.coverImage.src}
 alt={selectedLegend.coverImage.alt || selectedLegend.title}
 className="w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
 </div>

 <div className="p-6 md:p-8 space-y-8">
 <div>
 <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#C9A24D]/80 mb-2">
  Legend Overview
 </p>
 <p className="font-cormorant text-sm md:text-base text-[#F5E9D0]/80 leading-relaxed">
  {selectedLegend.hook}
 </p>
 </div>

 {(selectedLegend.galleryImages && selectedLegend.galleryImages.length > 0) ||
 (selectedLegend.galleryVideos && selectedLegend.galleryVideos.length > 0) ? (
 <div className="border border-[#C9A24D]/40 rounded-2xl bg-black/40 p-4 md:p-6">
  <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#C9A24D]/80 mb-4">
  Visual Chronicle
  </p>
  <MediaGallery
  images={selectedLegend.galleryImages}
  videos={selectedLegend.galleryVideos}
  initialTab="photos"
  />
 </div>
 ) : null}

 <div className="space-y-4 font-cormorant text-sm md:text-base leading-relaxed">
 {selectedLegend.story.map((paragraph, index) => (
  <p key={index}>{paragraph}</p>
 ))}
 </div>
 </div>
 </div>
 </div>
 )}
 </main>
 );
}
