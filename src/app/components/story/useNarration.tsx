'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLanguage } from '../LanguageProvider';

/**
 * Tracks which item on a page is being read aloud, on top of the global
 * narration in LanguageProvider (which always speaks in the page language).
 */
export function useNarration() {
  const { speak, stopSpeaking, isSpeaking } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!isSpeaking) setActiveId(null);
  }, [isSpeaking]);

  const toggle = useCallback(
    (id: string, text: string) => {
      if (isSpeaking && activeId === id) {
        stopSpeaking();
        setActiveId(null);
        return;
      }
      speak(text);
      setActiveId(id);
    },
    [isSpeaking, activeId, speak, stopSpeaking],
  );

  const isActive = useCallback((id: string) => isSpeaking && activeId === id, [isSpeaking, activeId]);

  return { toggle, isActive, stop: stopSpeaking };
}

const VolumeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
  </svg>
);

const StopIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
  </svg>
);

/**
 * Listen / Stop control. `iconOnly` renders a round icon button (label kept
 * for screen readers via aria-label and the tooltip).
 */
export function ListenButton({
  active,
  onClick,
  iconOnly = false,
  className = '',
}: {
  active: boolean;
  onClick: () => void;
  iconOnly?: boolean;
  className?: string;
}) {
  const { t } = useLanguage();
  const label = active ? t('audio.stop') : t('common.listen');
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center gap-2 transition-colors ${active ? 'animate-pulse' : ''} ${className}`}
    >
      {active ? <StopIcon /> : <VolumeIcon />}
      {!iconOnly && <span>{label}</span>}
    </button>
  );
}
