'use client';

import { useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import type { Locale } from '@/i18n/config';

/**
 * Tells the language switch where this page lives in each language, for
 * pages whose counterpart is not simply the same path under another locale.
 */
export default function LanguageAlternates(props: Partial<Record<Locale, string>>) {
  const { registerAlternates } = useLanguage();
  const key = JSON.stringify(props);
  useEffect(() => {
    registerAlternates(JSON.parse(key));
    return () => registerAlternates(null);
  }, [key, registerAlternates]);
  return null;
}
