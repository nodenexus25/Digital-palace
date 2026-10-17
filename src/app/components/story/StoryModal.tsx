'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { useLanguage } from '../LanguageProvider';
import { otherLocale } from '@/i18n/config';
import MediaGallery, { type GalleryImage, type GalleryVideo } from '../MediaGallery';
import StoryText, { toSpeech } from './StoryText';
import StoryLanguageToggle from './StoryLanguageToggle';
import { ListenButton, useNarration } from './useNarration';

export interface StoryModalProps {
  /** Stable id used for narration state. */
  id: string;
  title: string;
  subtitle?: string;
  /** Short labelled facts shown as tiles (period, region, …). Empty values are skipped. */
  facts?: { label: string; value?: string }[];
  /** Bulleted lists (battles, themes, rituals, …). Empty lists are skipped. */
  lists?: { label: string; items: string[] }[];
  /** Labelled paragraphs shown after the story (legacy, context, …). */
  notes?: { label: string; text?: string }[];
  story?: string;
  /** Multi-part narratives; when present they replace `story`. */
  chapters?: { title: string; story: string }[];
  images?: GalleryImage[];
  videos?: GalleryVideo[];
  /** Rendered while long content is loading. */
  loading?: boolean;
  /** Flips this story, and only this story, to the other language. */
  onToggleLanguage?: () => void;
  /** True while the story is shown in the other language. */
  storyAlt?: boolean;
  onClose: () => void;
  children?: ReactNode;
}

/**
 * Accessible reading dialog used across the archive: focus moves into the
 * dialog, Escape and the backdrop close it, background scrolling is locked.
 */
export default function StoryModal({
  id,
  title,
  subtitle,
  facts = [],
  lists = [],
  notes = [],
  story,
  chapters,
  images = [],
  videos = [],
  loading = false,
  onToggleLanguage,
  storyAlt = false,
  onClose,
  children,
}: StoryModalProps) {
  const { t, currentLanguage } = useLanguage();
  const { toggle, isActive, stop } = useNarration();
  const [chapterIndex, setChapterIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const parts = chapters?.length ? chapters : null;
  const current = parts ? parts[Math.min(chapterIndex, parts.length - 1)] : null;
  const body = current ? current.story : story || '';
  const narrationId = `${id}:${current ? chapterIndex : 'story'}`;
  // The story is being shown (and narrated) in the other language.
  const narrationLocale = storyAlt ? otherLocale(currentLanguage) : currentLanguage;

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      stop();
      previous?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleFacts = facts.filter((f) => f.value);
  const visibleLists = lists.filter((l) => l.items.length);
  const visibleNotes = notes.filter((n) => n.text);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="bg-ivory text-charcoal rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl outline-none"
      >
        <header className="sticky top-0 z-10 bg-saffron text-maroon p-6 rounded-t-2xl">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h2 id={titleId} className="font-cinzel font-bold text-3xl mb-1">
                {title}
              </h2>
              {subtitle && <p className="font-playfair text-maroon-dark text-lg">{subtitle}</p>}
              {parts && current && (
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <h3 className="font-cinzel font-semibold text-lg text-maroon-dark">{current.title}</h3>
                  <span className="text-sm bg-maroon text-saffron px-3 py-1 rounded-full">
                    {t('common.story')} {chapterIndex + 1} / {parts.length}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {onToggleLanguage && (
                <StoryLanguageToggle alt={storyAlt} onToggle={onToggleLanguage} className="text-maroon" />
              )}
              {body && !loading && (
                <ListenButton
                  active={isActive(narrationId)}
                  onClick={() => toggle(narrationId, toSpeech(current?.title ?? title, body), narrationLocale)}
                  className="px-4 py-2 rounded-lg font-cinzel text-sm bg-maroon-dark hover:bg-maroon text-saffron"
                />
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label={t('common.close')}
                className="text-maroon hover:text-maroon-dark transition-colors"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8">
          {visibleFacts.length > 0 && (
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {visibleFacts.map((f) => (
                <div key={f.label} className="bg-saffron/10 p-4 rounded-lg">
                  <dt className="font-cinzel font-semibold text-maroon mb-2">{f.label}</dt>
                  <dd className="font-cormorant text-charcoal text-lg">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {visibleLists.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {visibleLists.map((l) => (
                <section key={l.label} className="border-l-4 border-saffron p-4 rounded-lg bg-white/40">
                  <h4 className="font-cinzel font-semibold text-lg text-maroon mb-3">{l.label}</h4>
                  <ul className="space-y-2">
                    {l.items.map((item, i) => (
                      <li key={i} className="font-cormorant text-lg flex items-start gap-2">
                        <span className="text-saffron" aria-hidden="true">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}

          {(images.length > 0 || videos.length > 0) && (
            <section className="mb-8">
              <h4 className="font-cinzel font-semibold text-xl text-maroon mb-4">{t('gallery.multimedia')}</h4>
              <MediaGallery images={images} videos={videos} fallbackAlt={title} />
            </section>
          )}

          {children}

          {(body || loading) && (
            <section className="mb-8">
              <h4 className="font-cinzel font-semibold text-xl text-maroon mb-4">{t('stories.fullStoryHeading')}</h4>
              <div className="border-l-4 border-saffron p-6 md:p-8 rounded-lg bg-white/40 font-cormorant">
                {loading ? (
                  <div className="space-y-3 animate-pulse" aria-busy="true" aria-label={t('common.loading')}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-4 rounded bg-maroon/10" style={{ width: `${90 - (i % 3) * 12}%` }} />
                    ))}
                  </div>
                ) : (
                  <StoryText text={body} />
                )}
              </div>
            </section>
          )}

          {visibleNotes.map((n) => (
            <section key={n.label} className="bg-maroon/5 p-6 rounded-lg mb-6">
              <h4 className="font-cinzel font-semibold text-xl text-maroon mb-3">{n.label}</h4>
              <p className="font-cormorant text-lg leading-relaxed">{n.text}</p>
            </section>
          ))}
        </div>

        {parts && parts.length > 1 && (
          <footer className="bg-saffron/10 p-6 border-t border-saffron/20 rounded-b-2xl flex justify-between items-center gap-4">
            <button
              type="button"
              onClick={() => setChapterIndex((i) => Math.max(0, i - 1))}
              disabled={chapterIndex === 0}
              className="px-5 py-3 rounded-lg font-cinzel font-semibold bg-maroon text-saffron hover:bg-maroon-dark disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              ← {t('common.previous')}
            </button>
            <span className="font-cinzel text-maroon font-bold">
              {chapterIndex + 1} / {parts.length}
            </span>
            <button
              type="button"
              onClick={() => setChapterIndex((i) => Math.min(parts.length - 1, i + 1))}
              disabled={chapterIndex === parts.length - 1}
              className="px-5 py-3 rounded-lg font-cinzel font-semibold bg-maroon text-saffron hover:bg-maroon-dark disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              {t('common.next')} →
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
