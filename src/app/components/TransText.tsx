 'use client';
 
 import { useLanguage } from './LanguageProvider';
 
 export default function TransText({ k }: { k: string }) {
   const { t } = useLanguage();
   return <>{t(k)}</>;
 }
