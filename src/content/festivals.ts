import 'server-only';
import type { Locale } from '@/i18n/config';
import { reader, type TextTable } from './localize';
import type { Festival, FestivalGroup } from './types';
import base from './festivals/base.json';
import enText from './festivals/en.json';
import hiText from './festivals/hi.json';

const text: Record<Locale, TextTable> = {
  en: enText as unknown as TextTable,
  hi: hiText as unknown as TextTable,
};

export function getFestivals(lang: Locale): Festival[] {
  const other = lang === 'en' ? 'hi' : 'en';
  return base.festivals.map(({ id, group, image }) => {
    const get = reader(lang, text[lang], text[other], 'festivals', id);
    return {
      id,
      group: group as FestivalGroup,
      image,
      name: get('name'),
      date: get('date'),
      significance: get('significance'),
      rituals: get<string[]>('rituals') ?? [],
      description: get('description'),
      story: get('story'),
    };
  });
}
