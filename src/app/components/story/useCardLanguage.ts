'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../LanguageProvider';
import { listingUrl, useRemoteJson } from '../hooks/useRemoteContent';
import { otherLocale, type Locale } from '@/i18n/config';

type Listing = Record<string, { id: string }[]>;

/**
 * Per-story language for the cards on a listing page.
 *
 * Cards start in the page's language. Flipping one swaps just that card — and
 * the story it opens — into the other language. The other language's card
 * text is a static file fetched once per session and shared by every card.
 */
export function useCardLanguage<T extends { id: string }>(key: string, field: string) {
  const { currentLanguage } = useLanguage();
  const altLang = otherLocale(currentLanguage);
  const [flipped, setFlipped] = useState<ReadonlySet<string>>(() => new Set());

  // A site-wide language switch re-renders every card in the new language, and
  // a different listing (folklore's tabs) replaces the cards entirely, so the
  // per-card flips are stale in both cases.
  const shown = useRef({ lang: currentLanguage, key });
  useEffect(() => {
    if (shown.current.lang === currentLanguage && shown.current.key === key) return;
    shown.current = { lang: currentLanguage, key };
    setFlipped(new Set());
  }, [currentLanguage, key]);

  const { data } = useRemoteJson<Listing>(flipped.size ? listingUrl(altLang, key) : null);

  const altById = useMemo(() => {
    const map = new Map<string, T>();
    for (const item of (data?.[field] ?? []) as T[]) map.set(item.id, item);
    return map;
  }, [data, field]);

  const toggle = useCallback(
    (id: string) => {
      setFlipped((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    },
    [setFlipped],
  );

  const isAlt = useCallback((id: string) => flipped.has(id), [flipped]);
  const langFor = useCallback(
    (id: string): Locale => (flipped.has(id) ? altLang : currentLanguage),
    [flipped, altLang, currentLanguage],
  );

  /** The card as it should read right now. */
  function localize<I extends T>(item: I): I {
    if (!flipped.has(item.id)) return item;
    return (altById.get(item.id) as I | undefined) ?? item;
  }

  return { isAlt, langFor, localize, toggle };
}
