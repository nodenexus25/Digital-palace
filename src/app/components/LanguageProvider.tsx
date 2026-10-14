'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { elevenLabsService } from '../services/elevenLabsService';
import { translations, type Language } from '../utils/languages';

interface LanguageContextType {
 currentLanguage: Language;
 setLanguage: (lang: Language) => void;
 t: (key: string) => string;
 translateStory: (content: string, contentType?: 'title' | 'description' | 'fullStory') => string;
 speak: (text: string) => void;
 stopSpeaking: () => void;
 isSpeaking: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);


// Use translations from utils


const languageNames: Record<Language, string> = {
 hi: 'हिंदी',
 en: 'English'
};

export function LanguageProvider({ children, initialLanguage }: { children: ReactNode; initialLanguage?: Language }) {
 const [currentLanguage, setCurrentLanguage] = useState<Language>(initialLanguage ?? 'en');
 const [isSpeaking, setIsSpeaking] = useState(false);
 const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
 // Track active browser utterance so we can reliably cancel and wire events
 const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
 // Chunk queue so very long text does not get cut off by browser TTS limits
 const chunkQueueRef = useRef<string[]>([]);
 const chunkIndexRef = useRef<number>(0);
 const isInternalStopRef = useRef<boolean>(false);
 // Monotonic counter that increments on every speak() call so an outdated
 // async chain (ElevenLabs response arriving after stop/new-speak) cannot
 // clobber current state.
 const speakSessionRef = useRef<number>(0);
 // Ref holder so the recursive chunk-speaker can reference itself during
 // its own useCallback construction (avoids access-before-declare)
 const speakChunkRef = useRef<
   ((synth: SpeechSynthesis, chunks: string[], idx: number, lang: Language) => void) | null
 >(null);

 useEffect(() => {
 if (typeof window !== 'undefined') {
 setSpeechSynthesis(window.speechSynthesis);
 }
 }, []);

 // Reliably stop any active TTS (both browser native and ElevenLabs)
 const hardStop = useCallback(() => {
   isInternalStopRef.current = true;
   speakSessionRef.current += 1; // invalidate any in-flight speak chain
   try {
     elevenLabsService.stopSpeech();
   } catch {
     /* swallow */
   }
   try {
     if (typeof window !== 'undefined' && window.speechSynthesis) {
       window.speechSynthesis.cancel();
     }
   } catch {
     /* swallow */
   }
   chunkQueueRef.current = [];
   chunkIndexRef.current = 0;
   activeUtteranceRef.current = null;
   setIsSpeaking(false);
 }, []);

 // Clean up TTS on unmount / page hide to avoid dangling audio
 useEffect(() => {
   if (typeof window === 'undefined') return;
   const stopOnUnload = () => hardStop();
   const onVisibilityChange = () => {
     if (document.visibilityState === 'hidden') {
       // Do not keep narrating when tab goes hidden; user expects it to stop
       hardStop();
     }
   };
   window.addEventListener('beforeunload', stopOnUnload);
   window.addEventListener('pagehide', stopOnUnload);
   document.addEventListener('visibilitychange', onVisibilityChange);
   return () => {
     stopOnUnload();
     window.removeEventListener('beforeunload', stopOnUnload);
     window.removeEventListener('pagehide', stopOnUnload);
     document.removeEventListener('visibilitychange', onVisibilityChange);
   };
 }, [hardStop]);

 const setLanguage = useCallback((lang: Language) => {
 setCurrentLanguage(lang);
 // Store in localStorage and cookie for persistence and SSR metadata
 if (typeof window !== 'undefined') {
  localStorage.setItem('rajputana-language', lang);
  localStorage.setItem('language', lang);
 document.cookie = `rajputana-language=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`;
 }
 }, []);

 const t = useCallback((key: string): string => {
 return (translations[currentLanguage] as Record<string, string>)?.[key] || (translations.en as Record<string, string>)[key] || key;
 }, [currentLanguage]);

  const translateStory = (content: string): string => {
  return content;
  };

 // Split text into sentence-friendly chunks that never exceed the
 // per-utterance size that causes browsers to truncate mid-sentence.
 const splitIntoChunks = (src: string, maxLen = 220): string[] => {
   if (!src) return [];
   const sentences = src
     .replace(/\s+/g, ' ')
     .split(/(?<=[।.!?])\s+|\n{2,}/)
     .map((s) => s.trim())
     .filter(Boolean);
   const chunks: string[] = [];
   let buffer = '';
   for (const sentence of sentences) {
     if (!sentence) continue;
     if ((buffer + ' ' + sentence).trim().length <= maxLen) {
       buffer = (buffer + ' ' + sentence).trim();
     } else {
       if (buffer) chunks.push(buffer);
       if (sentence.length <= maxLen) {
         buffer = sentence;
       } else {
         // Extra long sentence - split by commas / phrases
         const phrases = sentence.split(/(?<=[,;:])\s+/);
         let subBuf = '';
         for (const p of phrases) {
           if ((subBuf + ' ' + p).trim().length <= maxLen) {
             subBuf = (subBuf + ' ' + p).trim();
           } else {
             if (subBuf) chunks.push(subBuf);
             // If a single phrase is still too long, force-split by length
             let remaining = p;
             while (remaining.length > maxLen) {
               chunks.push(remaining.slice(0, maxLen));
               remaining = remaining.slice(maxLen);
             }
             subBuf = remaining;
           }
         }
         buffer = subBuf;
       }
     }
   }
   if (buffer) chunks.push(buffer);
   return chunks;
 };

 // Speak a single chunk; schedule the next one when it ends.
 const speakBrowserChunk = useCallback(
   (synth: SpeechSynthesis, chunks: string[], idx: number, lang: Language) => {
     if (idx >= chunks.length || isInternalStopRef.current) {
       activeUtteranceRef.current = null;
       setIsSpeaking(false);
       return;
     }
     const textChunk = chunks[idx];
     if (!textChunk) {
       speakChunkRef.current?.(synth, chunks, idx + 1, lang);
       return;
     }
     const utter = new SpeechSynthesisUtterance(textChunk);
     utter.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
     utter.rate = lang === 'hi' ? 0.85 : 0.9;
     utter.pitch = 1.0;
     utter.volume = 1.0;
     // Some browsers (esp. mobile) garbage-collect utterances mid-speech;
     // keep a ref so the utterance stays alive.
     activeUtteranceRef.current = utter;
     utter.onstart = () => {
       setIsSpeaking(true);
     };
     utter.onend = () => {
       if (isInternalStopRef.current) {
         activeUtteranceRef.current = null;
         setIsSpeaking(false);
         return;
       }
       chunkIndexRef.current = idx + 1;
       // Tiny pause between chunks gives a natural paragraph break
       window.setTimeout(() => {
         speakChunkRef.current?.(synth, chunks, idx + 1, lang);
       }, 120);
     };
     utter.onerror = (evt) => {
       // interrupted / canceled are expected during stop; do not log
       if (evt.error !== 'interrupted' && evt.error !== 'canceled') {
         console.warn('TTS utterance error:', evt.error, 'for chunk idx', idx);
       }
       if (isInternalStopRef.current) {
         activeUtteranceRef.current = null;
         setIsSpeaking(false);
         return;
       }
       // Try the next chunk to keep narration flowing
       chunkIndexRef.current = idx + 1;
       window.setTimeout(() => {
         speakChunkRef.current?.(synth, chunks, idx + 1, lang);
       }, 150);
     };
     utter.onpause = () => {
       // Some browsers pause when the utterance is long; resume gently.
       try { synth.resume(); } catch { /* noop */ }
     };
     try {
       synth.speak(utter);
       // Chrome bug: speak() sometimes stalls when tab is backgrounded;
       // force a resume if nothing is playing in ~250ms.
       window.setTimeout(() => {
         try {
           if (synth.paused && !isInternalStopRef.current) synth.resume();
         } catch { /* noop */ }
       }, 250);
     } catch (err) {
       console.warn('TTS speak() failed:', err);
       setIsSpeaking(false);
     }
   },
   []
 );
 // Expose function via mutable ref (outside render) so it can call itself recursively
 useEffect(() => {
   speakChunkRef.current = speakBrowserChunk;
 }, [speakBrowserChunk]);

 // Text-to-speech: try ElevenLabs via /api/tts; on any failure fall back to
 // the browser's native speechSynthesis (chunked for long text).
 const speak = useCallback(
   async (text: string) => {
     // Always stop existing playback first
     hardStop();
     // Reset stop flag before starting new playback
     isInternalStopRef.current = false;
     const session = ++speakSessionRef.current;

     if (!text || typeof text !== 'string') {
       setIsSpeaking(false);
       return;
     }

     // Set speaking state immediately for instant UI feedback
     setIsSpeaking(true);

     // Strip formatting only — no dramatic word replacements or intro
     // prepends, which corrupt the historical text.
     const storyText = text
       .replace(/\[IMAGE_PLACEHOLDER:.*?\]/g, '')
       .replace(/\*\*(.*?)\*\*/g, '$1')
       .replace(/\*(.*?)\*/g, '$1')
       .replace(/^\s*[-*•]\s+/gm, '')
       .replace(/\n{3,}/g, '\n\n')
       .replace(/\t+/g, ' ')
       .trim();

     const fallbackToBrowser = () => {
       if (session !== speakSessionRef.current) return; // superseded
       const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
       if (!synth) {
         setIsSpeaking(false);
         return;
       }
       const chunks = splitIntoChunks(storyText);
       if (!chunks.length) {
         setIsSpeaking(false);
         return;
       }
       chunkQueueRef.current = chunks;
       chunkIndexRef.current = 0;
       try {
         synth.getVoices();
       } catch {
         /* noop */
       }
       speakBrowserChunk(synth, chunks, 0, currentLanguage);
     };

     try {
       const configured = await elevenLabsService.isApiConfigured();
       if (session !== speakSessionRef.current) return; // superseded while awaiting

       if (configured) {
         const femaleKeywords = [
           'rani',
           'princess',
           'queen',
           'devi',
           'padmini',
           'karnavati',
           'meera',
           'bai',
           'राजकुमारी',
           'संयोगिता',
           'माता',
           'मीरा',
         ];
         const hasFemaleContext = femaleKeywords.some((keyword) =>
           storyText.toLowerCase().includes(keyword.toLowerCase()),
         );
         const voiceType = hasFemaleContext ? 'female' : 'male';

         try {
           await elevenLabsService.speakText(storyText, voiceType, currentLanguage);
           if (session === speakSessionRef.current && !isInternalStopRef.current) {
             setIsSpeaking(false);
           }
         } catch (error) {
           console.error(
             'ElevenLabs synthesis failed, falling back to browser TTS:',
             error,
           );
           fallbackToBrowser();
         }
       } else {
         fallbackToBrowser();
       }
     } catch (error) {
       console.error('Speech synthesis failed:', error);
       fallbackToBrowser();
     }
   },
   [currentLanguage, hardStop, speakBrowserChunk],
 );

 const stopSpeaking = useCallback(() => {
   hardStop();
 }, [hardStop]);

 useEffect(() => {
 if (typeof window !== 'undefined') {
 const savedLang = localStorage.getItem('rajputana-language') as Language | null;
 if (!savedLang || savedLang !== currentLanguage) {
  localStorage.setItem('rajputana-language', currentLanguage);
  localStorage.setItem('language', currentLanguage);
 document.cookie = `rajputana-language=${currentLanguage}; path=/; max-age=${60 * 60 * 24 * 365}`;
 }
      document.documentElement.lang = currentLanguage;
 }
 }, [currentLanguage]);

 const contextValue = useMemo(
   () => ({
     currentLanguage,
     setLanguage,
     t,
     translateStory,
     speak,
     stopSpeaking,
     isSpeaking,
   }),
   [currentLanguage, setLanguage, t, speak, stopSpeaking, isSpeaking],
 );

 return (
 <LanguageContext.Provider value={contextValue}>
 {children}
 </LanguageContext.Provider>
 );
}

export function useLanguage() {
 const context = useContext(LanguageContext);
 if (context === undefined) {
 const fallback = {
 currentLanguage: 'en' as Language,
 setLanguage: () => {},
 t: (key: string) => (translations.en as Record<string, string>)[key] || key,
 translateStory: (content: string) => content,
 speak: () => {},
 stopSpeaking: () => {},
 isSpeaking: false,
 };
 return fallback;
 }
 return context;
}

export function LanguageSelector() {
 const { currentLanguage, setLanguage } = useLanguage();

 const handleChange = (lang: Language) => {
 setLanguage(lang);
 };

 return (
 <select
 value={currentLanguage}
 onChange={(e) => handleChange(e.target.value as Language)}
 className="bg-[#120A08] text-[#E6E1DC] border border-[#C9A24D]/20 rounded px-2 py-1 text-base font-cinzel focus:outline-none focus:border-[#C9A24D]"
 >
 {Object.entries(languageNames).map(([code, name]) => (
 <option key={code} value={code} className="bg-[#120A08] text-[#E6E1DC]">
 {name}
 </option>
 ))}
 </select>
 );
}

export { languageNames };
export type { Language };
