import 'server-only';
import type { Locale } from '@/i18n/config';
import { reader, type TextTable } from './localize';
import type { Legend, VideoRef } from './types';
import base from './legends/base.json';
import enText from './legends/en.json';
import hiText from './legends/hi.json';

const text: Record<Locale, TextTable> = {
  en: enText as unknown as TextTable,
  hi: hiText as unknown as TextTable,
};

const FALLBACK_COVER = '/images/dynasties/rulers/default.jpg';
// Legacy paths under /images/legends/ were never shipped.
const resolveImage = (src?: string | null) => (!src || src.startsWith('/images/legends/') ? FALLBACK_COVER : src);

export function getLegends(lang: Locale): Legend[] {
  const other = lang === 'en' ? 'hi' : 'en';
  return base.legends.map((b) => {
    const get = reader(lang, text[lang], text[other], 'legends', b.id);
    const galleryAlts = get<string[]>('galleryAlts') ?? [];
    const videoTitles = get<string[]>('videoTitles') ?? [];
    const title = get('title');
    return {
      id: b.id,
      title,
      hook: get('hook'),
      category: get('category'),
      era: get('era'),
      location: get('location'),
      story: get('story'),
      cover: { src: resolveImage(b.cover), alt: get('coverAlt') || title },
      gallery: b.gallery.map((src, i) => ({ src: resolveImage(src), alt: galleryAlts[i] || title })),
      videos: (b.videos as Omit<VideoRef, 'title'>[]).map((v, i) => ({ ...v, title: videoTitles[i] || title })),
    };
  });
}
