"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import LazyImage from "./LazyImage";

export interface GalleryImage {
 src: string;
 alt?: string;
 credit?: string;
}

export interface GalleryVideo {
 title: string;
 provider: "youtube" | "mp4";
 url: string;
 thumbnail?: string;
}

interface MediaGalleryProps {
 images?: GalleryImage[];
 videos?: GalleryVideo[];
 initialTab?: "photos" | "videos";
}

// Helper to extract YouTube ID from various URL formats
function extractYouTubeId(url: string): string | null {
 try {
 const u = new URL(url);
 if (u.hostname.includes("youtube.com")) {
 if (u.pathname.includes("/embed/")) {
 return u.pathname.split("/embed/")[1] || null;
 }
 const v = u.searchParams.get("v");
 return v;
 }
 if (u.hostname.includes("youtu.be")) {
 return u.pathname.replace("/", "");
 }
 } catch {
 return null;
 }
 return null;
}

export default function MediaGallery({ images = [], videos = [], initialTab = "photos" }: MediaGalleryProps) {
 const [activeTab, setActiveTab] = useState<"photos" | "videos">(initialTab);
 const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
 const [videoIndex, setVideoIndex] = useState<number | null>(null);

 const closeLightbox = useCallback(() => setLightboxIndex(null), []);
 const closeVideo = useCallback(() => setVideoIndex(null), []);

 useEffect(() => {
 const handler = (e: KeyboardEvent) => {
 if (e.key === "Escape") {
 closeLightbox();
 closeVideo();
 }
 if (lightboxIndex !== null) {
 if (e.key === "ArrowRight") setLightboxIndex(Math.min(images.length - 1, lightboxIndex + 1));
 if (e.key === "ArrowLeft") setLightboxIndex(Math.max(0, lightboxIndex - 1));
 }
 };
 window.addEventListener("keydown", handler);
 return () => window.removeEventListener("keydown", handler);
 }, [lightboxIndex, images.length, closeLightbox, closeVideo]);

 const youTubeThumbs = useMemo(() => {
 return videos.map((v) => {
 if (v.thumbnail) return v.thumbnail;
 if (v.provider === "youtube") {
 const id = extractYouTubeId(v.url);
 if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
 }
 return undefined;
 });
 }, [videos]);

 const filteredImages = useMemo(() => {
 return images.filter(img => img.src && img.src.trim() !== '');
 }, [images]);

 return (
 <div>
 {/* Tabs */}
 <div className="flex gap-2 mb-4">
 <button
 onClick={() => setActiveTab("photos")}
 className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
 activeTab === "photos"
 ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg"
 : "bg-white/90 text-amber-800 hover:bg-amber-100 border-2 border-amber-300"
 } font-cinzel`}
 >
 Photos ({filteredImages.length})
 </button>
 <button
 onClick={() => setActiveTab("videos")}
 className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
 activeTab === "videos"
 ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg"
 : "bg-white/90 text-amber-800 hover:bg-amber-100 border-2 border-amber-300"
 } font-cinzel`}
 >
 Videos ({videos.length})
 </button>
 </div>

 {activeTab === "photos" ? (
 filteredImages.length ? (
 <div>
 <div className="block md:hidden">
 <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
 {filteredImages.map((img, idx) => (
  <figure
  key={idx}
  className="relative min-w-[80%] snap-center rounded-xl overflow-hidden border-2 border-amber-300 bg-amber-50/40 hover:border-amber-500 hover:shadow-xl transition-all duration-300 cursor-pointer"
  onClick={() => setLightboxIndex(idx)}
  >
  <LazyImage
  src={img.src}
  alt={img.alt || "Fort image"}
  fill
  className="object-cover"
  />
  {(img.alt || img.credit) && (
  <figcaption className="p-2 text-xs text-amber-700 font-playfair bg-amber-100/50">
  {img.alt}
  {img.credit && <span className="ml-2 opacity-70">• {img.credit}</span>}
  </figcaption>
  )}
  </figure>
 ))}
 </div>
 </div>
 <div className="hidden md:block">
 <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
 {filteredImages.map((img, idx) => (
  <figure
  key={idx}
  className="mb-4 break-inside-avoid rounded-xl overflow-hidden border-2 border-amber-300 bg-amber-50/40 hover:border-amber-500 hover:shadow-xl transition-all duration-300 cursor-pointer"
  onClick={() => setLightboxIndex(idx)}
  >
  <LazyImage
  src={img.src}
  alt={img.alt || "Fort image"}
  className="w-full h-auto object-cover"
  />
  {(img.alt || img.credit) && (
  <figcaption className="p-2 text-xs text-amber-700 font-playfair bg-amber-100/50">
  {img.alt}
  {img.credit && <span className="ml-2 opacity-70">• {img.credit}</span>}
  </figcaption>
  )}
  </figure>
 ))}
 </div>
 </div>

 {/* Lightbox viewer */}
 {lightboxIndex !== null && (
 <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
 <div className="relative max-w-5xl w-full">
  <button
  onClick={closeLightbox}
  className="absolute -top-2 -right-2 bg-white/90 text-amber-900 rounded-full px-3 py-1 text-xl font-bold shadow"
  >
  
  </button>
  <div className="bg-white/90 rounded-2xl overflow-hidden border-4 border-amber-300 shadow-2xl">
  <LazyImage
  src={filteredImages[lightboxIndex].src}
  alt={filteredImages[lightboxIndex].alt || "Fort image"}
  className="w-full h-auto"
  />
  {(filteredImages[lightboxIndex].alt || filteredImages[lightboxIndex].credit) && (
  <div className="p-4 text-sm text-amber-800 font-playfair">
  {filteredImages[lightboxIndex].alt}
  {filteredImages[lightboxIndex].credit && (
  <span className="ml-2 opacity-70">• {filteredImages[lightboxIndex].credit}</span>
  )}
  </div>
  )}
  </div>
  {/* Prev/Next */}
  <div className="flex justify-between mt-4">
  <button
  onClick={() => setLightboxIndex(Math.max(0, lightboxIndex - 1))}
  className="px-4 py-2 rounded-xl bg-amber-100 text-amber-900 border-2 border-amber-300 font-cinzel disabled:opacity-40"
  disabled={lightboxIndex === 0}
  >
  ← Prev
  </button>
  <button
  onClick={() => setLightboxIndex(Math.min(filteredImages.length - 1, lightboxIndex + 1))}
  className="px-4 py-2 rounded-xl bg-amber-100 text-amber-900 border-2 border-amber-300 font-cinzel disabled:opacity-40"
  disabled={lightboxIndex === filteredImages.length - 1}
  >
  Next →
  </button>
  </div>
 </div>
 </div>
 )}
 </div>
 ) : (
 <div className="text-center text-amber-700 font-playfair p-6">No photos yet.</div>
 )
 ) : (
 videos.length ? (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 {videos.map((v, idx) => (
 <div
 key={idx}
 className="group rounded-xl overflow-hidden border-2 border-amber-300 bg-amber-50/40 hover:border-amber-500 hover:shadow-xl transition-all duration-300 cursor-pointer"
 onClick={() => setVideoIndex(idx)}
 >
 {v.provider === "youtube" ? (
  <div className="relative aspect-video">
  <LazyImage
  src={
  youTubeThumbs[idx] ||
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'%3E%3Crect width='160' height='90' fill='%23333333'/%3E%3Cpolygon points='60,30 60,60 95,45' fill='%23ffffff'/%3E%3C/svg%3E"
  }
  alt={v.title}
  fill
  className="object-cover"
  placeholder="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'%3E%3Crect width='160' height='90' fill='%23333333'/%3E%3Cpolygon points='60,30 60,60 95,45' fill='%23ffffff'/%3E%3C/svg%3E"
  />
  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
  <div className="absolute inset-0 flex items-center justify-center">
  <span className="text-white text-3xl bg-black/50 rounded-full px-4 py-2">▶</span>
  </div>
  </div>
 ) : (
  <div className="relative aspect-video bg-amber-100">
  <div className="absolute inset-0 flex items-center justify-center">
  <span className="text-amber-800 text-xl font-cinzel">MP4 Video</span>
  </div>
  </div>
 )}
 <div className="p-3">
  <h5 className="font-cinzel text-amber-900 text-sm">{v.title}</h5>
 </div>
 </div>
 ))}
 </div>
 ) : (
 <div className="text-center text-amber-700 font-playfair p-6">No videos yet.</div>
 )
 )}

 {/* Video modal */}
 {videoIndex !== null && (
 <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
 <div className="relative max-w-5xl w-full">
 <button
 onClick={closeVideo}
 className="absolute -top-2 -right-2 bg-white/90 text-amber-900 rounded-full px-3 py-1 text-xl font-bold shadow"
 >
 
 </button>
 <div className="bg-white/90 rounded-2xl overflow-hidden border-4 border-amber-300 shadow-2xl">
 {videos[videoIndex].provider === "youtube" ? (
 <div className="aspect-video w-full">
  <iframe
  className="w-full h-full"
  src={(() => {
  const id = extractYouTubeId(videos[videoIndex].url);
  return id ? `https://www.youtube.com/embed/${id}` : videos[videoIndex].url;
  })()}
  title={videos[videoIndex].title}
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  />
 </div>
 ) : (
 <video className="w-full" controls src={videos[videoIndex].url} />
 )}
 <div className="p-4 text-sm text-amber-800 font-playfair">
 {videos[videoIndex].title}
 </div>
 </div>
 </div>
 </div>
 )}
 </div>
 );
}
