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
        className="bg-[var(--surface)] text-[var(--ink)] rounded-[var(--radius-xl)] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl outline-none"
      >
        <header className="sticky top-0 z-10 bg-[var(--deep)] text-[var(--on-deep)] p-4 sm:p-6 rounded-t-[var(--radius-xl)]">
          <div className="flex justify-between items-start gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h2 id={titleId} className="font-display font-semibold text-xl sm:text-2xl md:text-3xl mb-1 text-[var(--on-deep)]">
                {title}
              </h2>
              {subtitle && <p className="text-[color:var(--lead-on-deep)] text-base sm:text-lg" style={{ margin: 0 }}>{subtitle}</p>}
              {parts && current && (
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <h3 className="font-display font-semibold text-lg text-[var(--on-deep)]">{current.title}</h3>
                  <span className="text-sm border border-[var(--line-on-deep)] text-[color:var(--lead-on-deep)] px-3 py-1 rounded-full">
                    {t('common.story')} {chapterIndex + 1} / {parts.length}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {onToggleLanguage && (
                <StoryLanguageToggle alt={storyAlt} onToggle={onToggleLanguage} className="text-[color:var(--on-deep)]" />
              )}
              {body && !loading && (
                <ListenButton
                  active={isActive(narrationId)}
                  onClick={() => toggle(narrationId, toSpeech(current?.title ?? title, body), narrationLocale)}
                  className="btn btn--ghost-light"
                />
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label={t('common.close')}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-on-deep)] text-[color:var(--on-deep)] transition-colors hover:border-[var(--gold-deep)] hover:text-[color:var(--gold-deep)]"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 md:p-8">
          {visibleFacts.length > 0 && (
            <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {visibleFacts.map((f) => (
                <div key={f.label} className="battle-card__facts" style={{ margin: 0 }}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {visibleLists.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {visibleLists.map((l) => (
                <section key={l.label} className="legend-box">
                  <span className="chip chip--legend">{l.label}</span>
                  <ul className="w-full space-y-2" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {l.items.map((item, i) => (
                      <li key={i} className="text-lg flex items-start gap-2 text-[color:var(--ink)]">
                        <span className="text-[color:var(--primary)]" aria-hidden="true">•</span>
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
              <h4 className="font-display font-semibold text-xl text-[color:var(--ink)] mb-4">{t('gallery.multimedia')}</h4>
              <MediaGallery images={images} videos={videos} fallbackAlt={title} />
            </section>
          )}

          {children}

          {(body || loading) && (
            <section className="mb-8">
              <h4 className="font-display font-semibold text-xl text-[color:var(--ink)] mb-4">{t('stories.fullStoryHeading')}</h4>
              <div className="legend-box">
                {loading ? (
                  <div className="w-full space-y-3 animate-pulse" aria-busy="true" aria-label={t('common.loading')}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-4 rounded bg-[var(--line)]" style={{ width: `${90 - (i % 3) * 12}%` }} />
                    ))}
                  </div>
                ) : (
                  <div className="w-full">
                    <StoryText text={body} />
                  </div>
                )}
              </div>
            </section>
          )}

          {visibleNotes.map((n) => (
            <section key={n.label} className="bg-[var(--sand)] p-6 rounded-[var(--radius-lg)] mb-6">
              <h4 className="font-display font-semibold text-xl text-[color:var(--ink)] mb-3">{n.label}</h4>
              <p className="text-lg leading-relaxed" style={{ margin: 0 }}>{n.text}</p>
            </section>
          ))}
        </div>

        {parts && parts.length > 1 && (
          <footer className="bg-[var(--sand)] p-4 sm:p-6 border-t border-[var(--line)] rounded-b-[var(--radius-xl)] flex justify-between items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setChapterIndex((i) => Math.max(0, i - 1))}
              disabled={chapterIndex === 0}
              className="btn btn--secondary"
            >
              ← {t('common.previous')}
            </button>
            <span className="font-display font-semibold text-[color:var(--ink)] text-sm sm:text-base shrink-0">
              {chapterIndex + 1} / {parts.length}
            </span>
            <button
              type="button"
              onClick={() => setChapterIndex((i) => Math.min(parts.length - 1, i + 1))}
              disabled={chapterIndex === parts.length - 1}
              className="btn btn--secondary"
            >
              {t('common.next')} →
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
