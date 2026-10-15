import 'server-only';
import type { Locale } from '@/i18n/config';
import { reader, type TextTable } from './localize';
import type { Dynasty, HistoricalPeriod, ImageRef, RulerDetail, RulerSummary } from './types';
import base from './dynasties/base.json';
import enText from './dynasties/en.json';
import hiText from './dynasties/hi.json';

const text: Record<Locale, TextTable> = {
  en: enText as unknown as TextTable,
  hi: hiText as unknown as TextTable,
};

type BaseRuler = { id: string; image?: string; gallery?: { src: string; credit?: string }[] };

/** Earliest year mentioned in an English period ("c. 973–990 CE", "12th century CE"). */
function startYear(period: string | undefined): number {
  if (!period) return Number.POSITIVE_INFINITY;
  const p = period.toLowerCase();
  const bce = /\bbce?\b/.test(p);
  const century = p.match(/(\d{1,2})(st|nd|rd|th)?\s*centur/);
  if (century) return (bce ? -1 : 1) * (parseInt(century[1], 10) - 1) * 100;
  const year = p.match(/(\d{3,4})/);
  if (year) return (bce ? -1 : 1) * parseInt(year[1], 10);
  return Number.POSITIVE_INFINITY;
}

function englishPeriod(id: string): string | undefined {
  return (text.en.rulers?.[id]?.period as string | undefined) ?? undefined;
}

function summary(lang: Locale, dynastyId: string, r: BaseRuler): RulerSummary {
  const other = lang === 'en' ? 'hi' : 'en';
  const get = reader(lang, text[lang], text[other], 'rulers', r.id);
  return {
    id: r.id,
    dynastyId,
    ...(r.image ? { image: r.image } : {}),
    name: get('name'),
    title: get('title'),
    period: get('period'),
    startYear: startYear(englishPeriod(r.id)),
  };
}

export function getDynasties(lang: Locale): Dynasty[] {
  const other = lang === 'en' ? 'hi' : 'en';
  return base.dynasties.map((d) => {
    const get = reader(lang, text[lang], text[other], 'dynasties', d.id);
    return {
      id: d.id,
      period: d.period,
      mainImage: d.mainImage,
      seal: d.seal,
      name: get('name'),
      significance: get('significance'),
      region: get('region'),
      capital: get('capital'),
      founded: get('founded'),
      founder: get('founder'),
      rulers: (d.rulers as BaseRuler[])
        .map((r) => summary(lang, d.id, r))
        .sort((a, b) => a.startYear - b.startYear),
    };
  });
}

export function getHistoricalPeriods(lang: Locale): HistoricalPeriod[] {
  const other = lang === 'en' ? 'hi' : 'en';
  return base.periods.map(({ id, image }) => {
    const get = reader(lang, text[lang], text[other], 'periods', id);
    return { id, ...(image ? { image } : {}), title: get('title'), range: get('range'), description: get('description') };
  });
}

/** Every (dynasty, ruler) pair, for static generation of ruler detail files. */
export function getRulerParams(): { dynastyId: string; rulerId: string }[] {
  return base.dynasties.flatMap((d) => (d.rulers as BaseRuler[]).map((r) => ({ dynastyId: d.id, rulerId: r.id })));
}

export function getRulerDetail(lang: Locale, dynastyId: string, rulerId: string): RulerDetail | null {
  const dynasty = base.dynasties.find((d) => d.id === dynastyId);
  const r = (dynasty?.rulers as BaseRuler[] | undefined)?.find((x) => x.id === rulerId);
  if (!dynasty || !r) return null;
  const other = lang === 'en' ? 'hi' : 'en';
  const get = reader(lang, text[lang], text[other], 'rulers', r.id);
  const alts = get<string[]>('galleryAlts') ?? [];
  const name = get('name');
  const gallery: ImageRef[] = (r.gallery ?? []).map((g, i) => ({ src: g.src, alt: alts[i] || name, ...(g.credit ? { credit: g.credit } : {}) }));
  return {
    ...summary(lang, dynastyId, r),
    significance: get('significance'),
    ancestry: get('ancestry'),
    battles: get<string[]>('battles') ?? [],
    heroicDeeds: get<string[]>('heroicDeeds') ?? [],
    culturalContributions: get<string[]>('culturalContributions') ?? [],
    legacy: get('legacy'),
    story: get('story'),
    gallery,
  };
}
