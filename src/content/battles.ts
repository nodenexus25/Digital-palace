import 'server-only';
import type { Locale } from '@/i18n/config';
import { reader, type TextTable } from './localize';
import type { Battle, Chapter, LegendaryFigure } from './types';
import base from './battles/base.json';
import enText from './battles/en.json';
import hiText from './battles/hi.json';

const text: Record<Locale, TextTable> = {
  en: enText as unknown as TextTable,
  hi: hiText as unknown as TextTable,
};

export function getBattles(lang: Locale): Battle[] {
  const other = lang === 'en' ? 'hi' : 'en';
  return base.battles.map(({ id }) => {
    const get = reader(lang, text[lang], text[other], 'battles', id);
    return {
      id,
      name: get('name'),
      year: get('year'),
      location: get('location'),
      rajputSide: get('rajputSide'),
      enemySide: get('enemySide'),
      result: get('result'),
      significance: get<string[]>('significance') ?? [],
      casualties: get<string[]>('casualties') ?? [],
      tactics: get<string[]>('tactics') ?? [],
      story: get('story'),
    };
  });
}

export function getLegendaryFigures(lang: Locale): LegendaryFigure[] {
  const other = lang === 'en' ? 'hi' : 'en';
  return base.figures.map(({ id, image }) => {
    const get = reader(lang, text[lang], text[other], 'figures', id);
    const chapters = get<Chapter[] | ''>('chapters');
    return {
      id,
      image,
      name: get('name'),
      period: get('period'),
      kingdom: get('kingdom'),
      significance: get('significance'),
      legends: get<string[]>('legends') ?? [],
      story: get('story'),
      ...(Array.isArray(chapters) && chapters.length ? { chapters } : {}),
    };
  });
}
