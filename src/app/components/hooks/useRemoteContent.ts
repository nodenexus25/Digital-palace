'use client';

import { useEffect, useState } from 'react';

// Shared across the session: a story fetched once (or prefetched on hover)
// opens instantly afterwards.
const cache = new Map<string, unknown>();
const inflight = new Map<string, Promise<unknown>>();

export function prefetchJson(url: string): Promise<unknown> {
  if (cache.has(url)) return Promise.resolve(cache.get(url));
  let p = inflight.get(url);
  if (!p) {
    p = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${url}`);
        return res.json();
      })
      .then((data) => {
        cache.set(url, data);
        return data;
      })
      .finally(() => inflight.delete(url));
    inflight.set(url, p);
  }
  return p;
}

/** Fetch JSON for `url` (null = idle). Returns cached data synchronously when available. */
export function useRemoteJson<T>(url: string | null): { data: T | null; loading: boolean; error: boolean } {
  const [state, setState] = useState<{ url: string | null; data: T | null; error: boolean }>(() => ({
    url,
    data: url && cache.has(url) ? (cache.get(url) as T) : null,
    error: false,
  }));

  useEffect(() => {
    if (!url) return;
    if (cache.has(url)) {
      setState({ url, data: cache.get(url) as T, error: false });
      return;
    }
    let alive = true;
    setState({ url, data: null, error: false });
    prefetchJson(url)
      .then((data) => alive && setState({ url, data: data as T, error: false }))
      .catch(() => alive && setState({ url, data: null, error: true }));
    return () => {
      alive = false;
    };
  }, [url]);

  const current = state.url === url;
  return {
    data: current ? state.data : null,
    loading: Boolean(url) && (!current || (!state.data && !state.error)),
    error: current && state.error,
  };
}

export const storyUrl = (lang: string, collection: string, id: string) => `/api/story/${lang}/${collection}/${id}`;
export const rulerUrl = (lang: string, dynastyId: string, rulerId: string) => `/api/rulers/${lang}/${dynastyId}/${rulerId}`;
