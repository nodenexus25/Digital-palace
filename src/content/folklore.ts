import 'server-only';
import type { Locale } from '@/i18n/config';
import { reader, type TextTable } from './localize';
import type { FolkDeity, FolkRitual, FolkTale } from './types';
import base from './folklore/base.json';
import enText from './folklore/en.json';
import hiText from './folklore/hi.json';

const text: Record<Locale, TextTable> = {
  en: enText as unknown as TextTable,
  hi: hiText as unknown as TextTable,
};

export function getFolklore(lang: Locale): { tales: FolkTale[]; deities: FolkDeity[]; rituals: FolkRitual[] } {
  const other = lang === 'en' ? 'hi' : 'en';
  const r = (coll: string, id: string) => reader(lang, text[lang], text[other], coll, id);
  return {
    tales: base.tales.map(({ id }) => {
      const get = r('tales', id);
      return {
        id,
        name: get('name'),
        author: get('author'),
        period: get('period'),
        type: get('type'),
        significance: get('significance'),
        themes: get<string[]>('themes') ?? [],
        story: get('story'),
      };
    }),
    deities: base.deities.map(({ id }) => {
      const get = r('deities', id);
      return {
        id,
        name: get('name'),
        period: get('period'),
        region: get('region'),
        significance: get('significance'),
        worship: get('worship'),
        legends: get<string[]>('legends') ?? [],
        story: get('story'),
      };
    }),
    rituals: base.rituals.map(({ id }) => {
      const get = r('rituals', id);
      return {
        id,
        name: get('name'),
        significance: get('significance'),
        practices: get<string[]>('practices') ?? [],
        occasions: get<string[]>('occasions') ?? [],
        story: get('story'),
      };
    }),
  };
}
