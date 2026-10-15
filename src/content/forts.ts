import 'server-only';
import type { Locale } from '@/i18n/config';
import { reader, type TextTable } from './localize';
import type { Fort, FortStoryTag, VideoRef } from './types';
import base from './forts/base.json';
import enText from './forts/en.json';
import hiText from './forts/hi.json';

const text: Record<Locale, TextTable> = {
  en: enText as unknown as TextTable,
  hi: hiText as unknown as TextTable,
};

type StoryText = { title: string | null; story: string | null };

const CLANS = ['Sisodia', 'Kachwaha', 'Rathore', 'Bhati', 'Chauhan', 'Doda', 'Jadaun', 'Jat', 'Hada', 'Shekhawat'];

/** Ruling clan behind a fort, inferred from its English record. Language-neutral key. */
function clanOf(id: string, dynasty?: string): string {
  if (dynasty && CLANS.includes(dynasty)) return dynasty;
  const rec = text.en.forts?.[id] ?? {};
  const builtBy = String(rec.builtBy ?? '');
  const location = String(rec.location ?? '');
  const has = (s: string, ...words: string[]) => words.some((w) => s.includes(w));
  if (has(builtBy, 'Maurya', 'Kumbha') || has(location, 'Udaipur', 'Chittorgarh', 'Dungarpur', 'Rajsamand', 'Banswara', 'Pratapgarh')) return 'Sisodia';
  if (has(builtBy, 'Man Singh', 'Jai Singh') || has(location, 'Jaipur', 'Amer', 'Alwar', 'Neemrana')) return 'Kachwaha';
  if (has(builtBy, 'Jodha', 'Bika') || has(location, 'Jodhpur', 'Bikaner', 'Nagaur')) return 'Rathore';
  if (has(builtBy, 'Jaisal') || has(location, 'Jaisalmer')) return 'Bhati';
  if (has(builtBy, 'Chauhan') || has(location, 'Ranthambore', 'Ajmer')) return 'Chauhan';
  if (has(location, 'Bharatpur')) return 'Jat';
  if (has(location, 'Bundi', 'Kota', 'Jhalawar')) return 'Hada';
  if (has(location, 'Karauli')) return 'Jadaun';
  if (has(location, 'Mandawa', 'Alsisar', 'Samode', 'Nawalgarh', 'Jhunjhunu', 'Sikar')) return 'Shekhawat';
  if (has(location, 'Gagron')) return 'Doda';
  return 'Royal';
}

export function getForts(lang: Locale): Fort[] {
  const other = lang === 'en' ? 'hi' : 'en';
  return base.forts.map((b) => {
    const get = reader(lang, text[lang], text[other], 'forts', b.id);
    const primaryStories = (text[lang].forts?.[b.id]?.stories ?? []) as StoryText[];
    const fallbackStories = (text[other].forts?.[b.id]?.stories ?? []) as StoryText[];
    const alts = get<string[]>('imageAlts') ?? [];
    const videoTitles = get<string[]>('videoTitles') ?? [];
    const name = get('name');
    return {
      id: b.id,
      category: b.category as Fort['category'],
      standing: b.standing,
      clan: clanOf(b.id, 'dynasty' in b ? (b.dynasty as string) : undefined),
      ...('icon' in b && b.icon ? { icon: b.icon as string } : {}),
      ...('dynasty' in b && b.dynasty ? { dynasty: b.dynasty as string } : {}),
      ...('coordinates' in b && b.coordinates ? { coordinates: b.coordinates as Fort['coordinates'] } : {}),
      name,
      location: get('location'),
      builtBy: get('builtBy'),
      period: get('period'),
      status: get('status'),
      description: get('description'),
      history: get<string | undefined>('history') || undefined,
      visitingHours: get<string | undefined>('visitingHours') || undefined,
      entryFee: get<string | undefined>('entryFee') || undefined,
      stories: b.storyTags.map((tag, i) => ({
        tag: tag as FortStoryTag,
        title: primaryStories[i]?.title ?? fallbackStories[i]?.title ?? '',
        story: primaryStories[i]?.story ?? fallbackStories[i]?.story ?? '',
      })),
      images: b.images.map((src, i) => ({ src, alt: alts[i] || name })),
      videos: (b.videos as Omit<VideoRef, 'title'>[]).map((v, i) => ({ ...v, title: videoTitles[i] || name })),
    };
  });
}
