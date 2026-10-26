"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import LazyImage from "./LazyImage";
import { useLanguage } from "./LanguageProvider";

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
  /** Fallback alt text when an image has none (already localized). */
  fallbackAlt?: string;
}

const VIDEO_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'%3E%3Crect width='160' height='90' fill='%23333333'/%3E%3Cpolygon points='60,30 60,60 95,45' fill='%23ffffff'/%3E%3C/svg%3E";

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.includes("/embed/")) return u.pathname.split("/embed/")[1] || null;
      return u.searchParams.get("v");
    }
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
  } catch {
    return null;
  }
  return null;
}

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function MediaGallery({ images = [], videos = [], initialTab = "photos", fallbackAlt }: MediaGalleryProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"photos" | "videos">(initialTab);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoIndex, setVideoIndex] = useState<number | null>(null);
  const altFor = (img: GalleryImage) => img.alt || fallbackAlt || t("gallery.imageAlt");
  const creditFor = (credit: string) => (credit === "Wikimedia Commons" ? t("gallery.creditWikimedia") : credit);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const closeVideo = useCallback(() => setVideoIndex(null), []);

  const filteredImages = useMemo(() => images.filter((img) => img.src && img.src.trim() !== ""), [images]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (lightboxIndex !== null || videoIndex !== null)) {
        e.stopPropagation();
        closeLightbox();
        closeVideo();
      }
      if (lightboxIndex !== null) {
        if (e.key === "ArrowRight") setLightboxIndex(Math.min(filteredImages.length - 1, lightboxIndex + 1));
        if (e.key === "ArrowLeft") setLightboxIndex(Math.max(0, lightboxIndex - 1));
      }
    };
    window.addEventListener("keydown", handler, true);
    return () => window.removeEventListener("keydown", handler, true);
  }, [lightboxIndex, videoIndex, filteredImages.length, closeLightbox, closeVideo]);

  const youTubeThumbs = useMemo(
    () =>
      videos.map((v) => {
        if (v.thumbnail) return v.thumbnail;
        if (v.provider === "youtube") {
          const id = extractYouTubeId(v.url);
          if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
        }
        return undefined;
      }),
    [videos],
  );

  const tabClass = (active: boolean) => `btn ${active ? "btn--primary" : "btn--secondary"}`;

  return (
    <div>
      <div className="flex gap-2 mb-4" role="tablist">
        <button role="tab" aria-selected={activeTab === "photos"} onClick={() => setActiveTab("photos")} className={tabClass(activeTab === "photos")}>
          {t("gallery.photosCount", { count: filteredImages.length })}
        </button>
        <button role="tab" aria-selected={activeTab === "videos"} onClick={() => setActiveTab("videos")} className={tabClass(activeTab === "videos")}>
          {t("gallery.videosCount", { count: videos.length })}
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
                    className="relative min-w-[80%] aspect-[4/3] snap-center rounded-[var(--radius-lg)] overflow-hidden border border-[var(--line)] bg-[var(--raised)] cursor-pointer"
                    onClick={() => setLightboxIndex(idx)}
                  >
                    <LazyImage src={img.src} alt={altFor(img)} fill sizes="80vw" className="object-cover" />
                  </figure>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
                {filteredImages.map((img, idx) => (
                  <figure
                    key={idx}
                    className="mb-4 break-inside-avoid rounded-[var(--radius-lg)] overflow-hidden border border-[var(--line)] bg-[var(--raised)] hover:border-[var(--line-strong)] transition-colors duration-200 cursor-pointer"
                  >
                    <button type="button" className="block w-full" onClick={() => setLightboxIndex(idx)} aria-label={altFor(img)}>
                      <LazyImage src={img.src} alt={altFor(img)} className="w-full h-auto object-cover" />
                    </button>
                    {(img.alt || img.credit) && (
                      <figcaption className="p-2 text-xs text-[color:var(--muted)] bg-[var(--sand)]">
                        {img.alt}
                        {img.credit && <span className="ml-2 opacity-70">• {creditFor(img.credit)}</span>}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>

            {lightboxIndex !== null && (
              <div role="dialog" aria-modal="true" aria-label={altFor(filteredImages[lightboxIndex])} className="fixed inset-0 z-[60] bg-[var(--deep)]/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeLightbox}>
                <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={closeLightbox}
                    aria-label={t("common.close")}
                    className="absolute -top-3 -right-3 z-10 inline-flex h-11 w-11 items-center justify-center bg-[var(--raised)] text-[color:var(--ink)] border border-[var(--line)] rounded-full shadow"
                  >
                    <CloseIcon />
                  </button>
                  <div className="bg-[var(--raised)] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--line)] shadow-2xl">
                    <LazyImage src={filteredImages[lightboxIndex].src} alt={altFor(filteredImages[lightboxIndex])} className="w-full h-auto max-h-[70vh] object-contain" />
                    {(filteredImages[lightboxIndex].alt || filteredImages[lightboxIndex].credit) && (
                      <div className="p-4 text-sm text-[color:var(--muted)]">
                        {filteredImages[lightboxIndex].alt}
                        {filteredImages[lightboxIndex].credit && <span className="ml-2 opacity-70">• {creditFor(filteredImages[lightboxIndex].credit)}</span>}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center gap-2 mt-3 sm:mt-4">
                    <button
                      onClick={() => setLightboxIndex(Math.max(0, lightboxIndex - 1))}
                      className="btn btn--secondary disabled:opacity-40 disabled:pointer-events-none"
                      disabled={lightboxIndex === 0}
                    >
                      ← {t("common.previous")}
                    </button>
                    <span className="text-[color:var(--on-deep)] text-xs sm:text-sm shrink-0">
                      {lightboxIndex + 1} / {filteredImages.length}
                    </span>
                    <button
                      onClick={() => setLightboxIndex(Math.min(filteredImages.length - 1, lightboxIndex + 1))}
                      className="btn btn--secondary disabled:opacity-40 disabled:pointer-events-none"
                      disabled={lightboxIndex === filteredImages.length - 1}
                    >
                      {t("common.next")} →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-[color:var(--muted)] p-6">{t("gallery.noPhotos")}</div>
        )
      ) : videos.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((v, idx) => (
            <button
              type="button"
              key={idx}
              className="card group text-left overflow-hidden"
              onClick={() => setVideoIndex(idx)}
            >
              {v.provider === "youtube" ? (
                <div className="relative aspect-video">
                  <LazyImage src={youTubeThumbs[idx] || VIDEO_PLACEHOLDER} alt={v.title} fill className="object-cover" placeholder={VIDEO_PLACEHOLDER} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--deep)]/70 text-[color:var(--on-deep)]" aria-hidden="true">▶</span>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-video bg-[var(--sand)] flex items-center justify-center">
                  <span className="text-[color:var(--ink)] text-xl font-display">{t("gallery.video")}</span>
                </div>
              )}
              <div className="p-3">
                <span className="font-display text-[color:var(--ink)] text-sm">{v.title}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center text-[color:var(--muted)] p-6">{t("gallery.noVideos")}</div>
      )}

      {videoIndex !== null && (
        <div role="dialog" aria-modal="true" aria-label={videos[videoIndex].title} className="fixed inset-0 z-[60] bg-[var(--deep)]/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeVideo}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeVideo} aria-label={t("common.close")} className="absolute -top-3 -right-3 z-10 inline-flex h-11 w-11 items-center justify-center bg-[var(--raised)] text-[color:var(--ink)] border border-[var(--line)] rounded-full shadow">
              <CloseIcon />
            </button>
            <div className="bg-[var(--raised)] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--line)] shadow-2xl">
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
              <div className="p-4 text-sm text-[color:var(--muted)]">{videos[videoIndex].title}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
