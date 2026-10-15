'use client';

import { useCallback, useEffect, useState } from 'react';

// Keys whose current value was opened by us with pushState, so closing can
// step back in history (making the browser Back button close dialogs).
const pushedKeys = new Set<string>();

/**
 * A piece of UI state mirrored into the URL query string (e.g. ?battle=haldighati).
 *
 * Because the language switch carries the query string over, an open story
 * stays open — in the other language — when the reader switches languages.
 * Links to a specific story are shareable too.
 */
export function useQueryState(key: string): [string | null, (value: string | null) => void] {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const read = () => setValue(new URLSearchParams(window.location.search).get(key));
    read();
    pushedKeys.delete(key);
    window.addEventListener('popstate', read);
    return () => window.removeEventListener('popstate', read);
  }, [key]);

  const update = useCallback(
    (next: string | null) => {
      const url = new URL(window.location.href);
      if (next) {
        url.searchParams.set(key, next);
        if (url.searchParams.get(key) !== new URLSearchParams(window.location.search).get(key)) {
          window.history.pushState(null, '', url);
          pushedKeys.add(key);
        }
      } else if (pushedKeys.has(key)) {
        pushedKeys.delete(key);
        window.history.back();
      } else {
        url.searchParams.delete(key);
        window.history.replaceState(null, '', url);
      }
      setValue(next);
    },
    [key],
  );

  return [value, update];
}
