import 'server-only';
import type { Locale } from '@/i18n/config';
import { reader, type TextTable } from './localize';
import type { Weapon, WeaponCategory } from './types';
import base from './weapons/base.json';
import enText from './weapons/en.json';
import hiText from './weapons/hi.json';

const text: Record<Locale, TextTable> = {
  en: enText as unknown as TextTable,
  hi: hiText as unknown as TextTable,
};

export function getArmory(lang: Locale): { categories: WeaponCategory[]; weapons: Weapon[] } {
  const other = lang === 'en' ? 'hi' : 'en';
  const r = (coll: string, id: string) => reader(lang, text[lang], text[other], coll, id);
  return {
    // Roman numerals are Latin letters; Hindi pages number sections 1, 2, 3…
    categories: base.categories.map(({ id, numeral }, i) => ({ id, numeral: lang === 'hi' ? String(i + 1) : numeral, title: r('categories', id)('title') })),
    weapons: base.weapons.map(({ id, category, image }) => {
      const get = r('weapons', id);
      return {
        id,
        category,
        image,
        name: get('name'),
        subtitle: get('subtitle'),
        description: get('description'),
        type: get('type'),
        lethality: get('lethality'),
        role: get('role'),
        era: get('era'),
      };
    }),
  };
}
