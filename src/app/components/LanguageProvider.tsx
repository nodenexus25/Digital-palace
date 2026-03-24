'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { elevenLabsService } from '../services/elevenLabsService';
import { translations, Language } from '../utils/languages';

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

 useEffect(() => {
 if (typeof window !== 'undefined') {
 setSpeechSynthesis(window.speechSynthesis);
 }
 }, []);

 const setLanguage = (lang: Language) => {
 setCurrentLanguage(lang);
 // Store in localStorage and cookie for persistence and SSR metadata
 if (typeof window !== 'undefined') {
  localStorage.setItem('rajputana-language', lang);
  localStorage.setItem('language', lang);
 document.cookie = `rajputana-language=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`;
 }
 };

 const t = (key: string): string => {
 return (translations[currentLanguage] as Record<string, string>)?.[key] || (translations.en as Record<string, string>)[key] || key;
 };

  const translateStory = (content: string): string => {
  return content;
  };

 // Enhanced storytelling text-to-speech functionality with ElevenLabs
 const speak = async (text: string) => {
 // Stop any ongoing speech
 elevenLabsService.stopSpeech();
 if (speechSynthesis) {
 speechSynthesis.cancel();
 }
 
 // Set speaking state immediately for instant UI feedback
 setIsSpeaking(true);
 
 // Enhanced text preprocessing for dramatic storytelling
 let storyText = text
 // Remove image placeholders and formatting
 .replace(/\[IMAGE_PLACEHOLDER:.*?\]/g, '')
 .replace(/\*\*(.*?)\*\*/g, '... $1 ...')
 .replace(/\*(.*?)\*/g, '$1')
 .replace(/\n\n/g, '... ')
 .replace(/\n/g, ' ')
 .replace(/\s+/g, ' ')
 .trim();
 
 // Language-specific enhancements
 if (currentLanguage === 'hi') {
 storyText = storyText
 .replace(/^/, 'आइए सुनते हैं एक अद्भुत कहानी... ')
 .replace(/युद्ध/g, 'महान युद्ध')
 .replace(/वीर/g, 'वीर योद्धा')
 .replace(/राजा/g, 'महान राजा')
 .replace(/रानी/g, 'सुंदर रानी')
 .replace(/महाराणा/g, 'महान महाराणा')
 .replace(/किला/g, 'अजेय किला')
 .replace(/प्रेम/g, 'दिव्य प्रेम')
 .replace(/बलिदान/g, 'महान बलिदान')
 .replace(/\।/g, '... ')
 .replace(/!/g, '! ...')
 .replace(/\?/g, '? ...');
 } else {
 // English enhancements
 storyText = storyText
 .replace(/^/, 'Let us listen to a wonderful story... ')
 .replace(/\./g, '... ')
 .replace(/!/g, '! ...')
 .replace(/\?/g, '? ...');
 }

 try {
 // Use ElevenLabs AI voices if API is configured
 if (elevenLabsService.isApiConfigured()) {
 // Determine voice type based on content
 const femaleKeywords = ['rani', 'princess', 'queen', 'devi', 'padmini', 'karnavati', 'meera', 'bai', 'राजकुमारी', 'संयोगिता', 'माता'];
 const hasFemaleContext = femaleKeywords.some(keyword => storyText.toLowerCase().includes(keyword.toLowerCase()));
 const voiceType = hasFemaleContext ? 'female' : 'male';
 
 // Start synthesis immediately without waiting
 elevenLabsService.speakText(storyText, voiceType)
 .then(() => setIsSpeaking(false))
 .catch((error) => {
 console.error('ElevenLabs synthesis failed:', error);
 setIsSpeaking(false);
 });
 } else {
 const utterance = new SpeechSynthesisUtterance(storyText);
 utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
 utterance.rate = 0.8; // Slightly slower for storytelling
 utterance.pitch = 1.0;
 utterance.volume = 1.0;
 
 utterance.onend = () => setIsSpeaking(false);
 utterance.onerror = () => setIsSpeaking(false);
 
 if (speechSynthesis) {
 speechSynthesis.speak(utterance);
 }
 }
 } catch (error) {
 console.error('Speech synthesis failed:', error);
 setIsSpeaking(false);
 }
 };

 const stopSpeaking = () => {
 // Stop ElevenLabs audio
 elevenLabsService.stopSpeech();
 
 // Stop browser speech synthesis
 if (speechSynthesis) {
 speechSynthesis.cancel();
 }
 
 setIsSpeaking(false);
 };

 useEffect(() => {
 if (typeof window !== 'undefined') {
 const savedLang = localStorage.getItem('rajputana-language') as Language | null;
 if (!savedLang || savedLang !== currentLanguage) {
  localStorage.setItem('rajputana-language', currentLanguage);
  localStorage.setItem('language', currentLanguage);
 document.cookie = `rajputana-language=${currentLanguage}; path=/; max-age=${60 * 60 * 24 * 365}`;
 }
 }
 }, [currentLanguage]);

 return (
 <LanguageContext.Provider value={{ 
 currentLanguage, 
 setLanguage, 
 t, 
 translateStory, 
 speak, 
 stopSpeaking, 
 isSpeaking 
 }}>
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
