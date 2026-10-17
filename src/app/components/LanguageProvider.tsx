'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { elevenLabsService } from '../services/elevenLabsService';
import {
  LOCALE_COOKIE,
  localeTags,
  otherLocale,
  switchLocalePath,
  type Locale,
} from '@/i18n/config';

export type Language = Locale;
type Messages = Record<string, string>;

interface LanguageContextType {
  currentLanguage: Language;
  /** Switch the whole site to `lang`, keeping the current page, query and scroll. */
  setLanguage: (lang: Language) => void;
  /** URL of the current page in `lang` (for links, prefetching, hreflang). */
  hrefFor: (lang: Language) => string;
  /** Let a page point the language switch at a different URL (null to reset). */
  registerAlternates: (map: Partial<Record<Language, string>> | null) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  /** Narrate `text`; `locale` overrides the page language (a flipped story card). */
  speak: (text: string, locale?: Language) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// A language switch is a client-side navigation to the same page under the
// other locale. When the browser supports View Transitions we cross-fade the
// old and new page; the transition is held open until the newly rendered
// provider mounts and resolves it.
let resolvePendingSwitch: (() => void) | null = null;

function interpolate(text: string, vars?: Record<string, string | number>) {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (m, name) => (name in vars ? String(vars[name]) : m));
}

// Split text into sentence-friendly chunks that never exceed the
// per-utterance size that causes browsers to truncate mid-sentence.
function splitIntoChunks(src: string, maxLen = 220): string[] {
  if (!src) return [];
  const sentences = src
    .replace(/\s+/g, ' ')
    .split(/(?<=[।.!?])\s+|\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean);
  const chunks: string[] = [];
  let buffer = '';
  for (const sentence of sentences) {
    if ((buffer + ' ' + sentence).trim().length <= maxLen) {
      buffer = (buffer + ' ' + sentence).trim();
      continue;
    }
    if (buffer) chunks.push(buffer);
    if (sentence.length <= maxLen) {
      buffer = sentence;
      continue;
    }
    // Extra long sentence - split by commas / phrases, then by length.
    let subBuf = '';
    for (const p of sentence.split(/(?<=[,;:])\s+/)) {
      if ((subBuf + ' ' + p).trim().length <= maxLen) {
        subBuf = (subBuf + ' ' + p).trim();
        continue;
      }
      if (subBuf) chunks.push(subBuf);
      let remaining = p;
      while (remaining.length > maxLen) {
        chunks.push(remaining.slice(0, maxLen));
        remaining = remaining.slice(maxLen);
      }
      subBuf = remaining;
    }
    buffer = subBuf;
  }
  if (buffer) chunks.push(buffer);
  return chunks;
}

const FEMALE_KEYWORDS = [
  'rani', 'princess', 'queen', 'devi', 'padmini', 'karnavati', 'meera', 'bai',
  'रानी', 'राजकुमारी', 'संयोगिता', 'माता', 'मीरा', 'पद्मिनी', 'देवी', 'बाई',
];

export function LanguageProvider({
  children,
  lang,
  messages,
}: {
  children: ReactNode;
  lang: Language;
  messages: Messages;
}) {
  const router = useRouter();
  const pathname = usePathname() || `/${lang}`;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isInternalStopRef = useRef(false);
  // Incremented on every speak()/stop so stale async chains cannot clobber state.
  const speakSessionRef = useRef(0);
  const speakChunkRef = useRef<((chunks: string[], idx: number, locale: Locale) => void) | null>(null);

  // The new page is on screen: finish the cross-fade and sync <html lang>.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.locale = lang;
    document.cookie = `${LOCALE_COOKIE}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    resolvePendingSwitch?.();
    resolvePendingSwitch = null;
  }, [lang]);

  // Pages whose counterpart lives at a different URL (e.g. a blog post with a
  // different slug per language) register it here via <LanguageAlternates>.
  const [overrides, setOverrides] = useState<{ path: string; map: Partial<Record<Language, string>> } | null>(null);
  const registerAlternates = useCallback(
    (map: Partial<Record<Language, string>> | null) => setOverrides(map ? { path: pathname, map } : null),
    [pathname],
  );

  // Returns a hydration-safe path (no query/hash). The hash is unavailable on
  // the server, so appending it here would make the SSR href differ from the
  // client and break hydration. Search/hash are preserved at navigation time
  // in setLanguage instead.
  const hrefFor = useCallback(
    (target: Language) => {
      const override = overrides?.path === pathname ? overrides.map[target] : undefined;
      if (override) return override;
      return switchLocalePath(pathname, target);
    },
    [pathname, overrides],
  );

  // Warm the other language so switching is instant.
  useEffect(() => {
    const target = hrefFor(otherLocale(lang)).split(/[?#]/)[0];
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    const handle = idle(() => router.prefetch(target));
    return () => {
      if (window.cancelIdleCallback && typeof handle === 'number') window.cancelIdleCallback(handle);
    };
  }, [hrefFor, lang, router]);

  const hardStop = useCallback(() => {
    isInternalStopRef.current = true;
    speakSessionRef.current += 1;
    try { elevenLabsService.stopSpeech(); } catch { /* ignore */ }
    try { window.speechSynthesis?.cancel(); } catch { /* ignore */ }
    activeUtteranceRef.current = null;
    setIsSpeaking(false);
  }, []);

  const setLanguage = useCallback(
    (target: Language) => {
      if (target === lang) return;
      hardStop();
      const href = hrefFor(target) + window.location.search + window.location.hash;
      const navigate = () => router.push(href, { scroll: false });

      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (!document.startViewTransition || reduceMotion) {
        navigate();
        return;
      }
      document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            resolvePendingSwitch = resolve;
            navigate();
            // Never leave the page frozen if the navigation is slow.
            window.setTimeout(resolve, 2500);
          }),
      );
    },
    [lang, hardStop, hrefFor, router],
  );

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const value = messages[key];
      if (value === undefined) {
        if (process.env.NODE_ENV !== 'production') console.warn(`[i18n] missing ${lang} key: ${key}`);
        return key;
      }
      return interpolate(value, vars);
    },
    [messages, lang],
  );

  // Stop narration when the tab is hidden or the page unloads.
  useEffect(() => {
    const onHide = () => hardStop();
    const onVisibility = () => document.visibilityState === 'hidden' && hardStop();
    window.addEventListener('pagehide', onHide);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      hardStop();
      window.removeEventListener('pagehide', onHide);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [hardStop]);

  const speakBrowserChunk = useCallback(
    (chunks: string[], idx: number, locale: Locale) => {
      const synth = window.speechSynthesis;
      if (!synth || idx >= chunks.length || isInternalStopRef.current) {
        activeUtteranceRef.current = null;
        setIsSpeaking(false);
        return;
      }
      const utter = new SpeechSynthesisUtterance(chunks[idx]);
      utter.lang = localeTags[locale];
      utter.rate = locale === 'hi' ? 0.85 : 0.9;
      const voice = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith(locale));
      if (voice) utter.voice = voice;
      // Keep a reference so mobile browsers don't garbage-collect mid-speech.
      activeUtteranceRef.current = utter;
      utter.onstart = () => setIsSpeaking(true);
      const next = () => {
        if (isInternalStopRef.current) {
          activeUtteranceRef.current = null;
          setIsSpeaking(false);
          return;
        }
        window.setTimeout(() => speakChunkRef.current?.(chunks, idx + 1, locale), 120);
      };
      utter.onend = next;
      utter.onerror = (evt) => {
        if (evt.error !== 'interrupted' && evt.error !== 'canceled') {
          console.warn('TTS utterance error:', evt.error);
        }
        next();
      };
      try {
        synth.speak(utter);
      } catch (err) {
        console.warn('TTS speak() failed:', err);
        setIsSpeaking(false);
      }
    },
    [],
  );

  useEffect(() => {
    speakChunkRef.current = speakBrowserChunk;
  }, [speakBrowserChunk]);

  // Text-to-speech: ElevenLabs via /api/tts, falling back to the browser's
  // own voices. Narrates in `locale`, which defaults to the page's language.
  const speak = useCallback(
    async (text: string, locale: Locale = lang) => {
      hardStop();
      isInternalStopRef.current = false;
      const session = ++speakSessionRef.current;
      if (!text) return;
      setIsSpeaking(true);

      const storyText = text
        .replace(/\[IMAGE_PLACEHOLDER:.*?\]/g, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/^#+\s*/gm, '')
        .replace(/^\s*[-*•]\s+/gm, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      const fallbackToBrowser = () => {
        if (session !== speakSessionRef.current) return;
        const chunks = splitIntoChunks(storyText);
        if (!window.speechSynthesis || !chunks.length) {
          setIsSpeaking(false);
          return;
        }
        speakBrowserChunk(chunks, 0, locale);
      };

      try {
        const configured = await elevenLabsService.isApiConfigured();
        if (session !== speakSessionRef.current) return;
        if (!configured) return fallbackToBrowser();
        const lower = storyText.toLowerCase();
        const voiceType = FEMALE_KEYWORDS.some((k) => lower.includes(k)) ? 'female' : 'male';
        try {
          await elevenLabsService.speakText(storyText, voiceType, locale);
          if (session === speakSessionRef.current && !isInternalStopRef.current) setIsSpeaking(false);
        } catch (error) {
          console.error('ElevenLabs synthesis failed, falling back to browser TTS:', error);
          fallbackToBrowser();
        }
      } catch {
        fallbackToBrowser();
      }
    },
    [lang, hardStop, speakBrowserChunk],
  );

  const contextValue = useMemo<LanguageContextType>(
    () => ({
      currentLanguage: lang,
      setLanguage,
      hrefFor,
      registerAlternates,
      t,
      speak: (text: string, locale?: Language) => void speak(text, locale),
      stopSpeaking: hardStop,
      isSpeaking,
    }),
    [lang, setLanguage, hrefFor, registerAlternates, t, speak, hardStop, isSpeaking],
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage() must be used inside <LanguageProvider>');
  }
  return context;
}
