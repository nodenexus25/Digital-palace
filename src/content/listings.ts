import 'server-only';
import type { Locale } from '@/i18n/config';
import { locales } from '@/i18n/config';
import { getBattles, getLegendaryFigures } from './battles';
import { getDynasties, getHistoricalPeriods } from './dynasties';
import { getFestivals } from './festivals';
import { getFolklore } from './folklore';
import { getForts } from './forts';
import { getLegends } from './legends';
import { withoutStory } from './stories';
import type {
  BattleCard,
  DeityCard,
  Dynasty,
  Festival,
  FigureCard,
  FortCard,
  HistoricalPeriod,
  LegendCard,
  RitualCard,
  TaleCard,
} from './types';

/**
 * A listing page ships only the short card text; the long story is fetched
 * when a card is opened. These helpers are the one definition of "a card",
 * shared by the pages and by /api/listings, so both always agree.
 */

export function legendCards(lang: Locale): LegendCard[] {
  return getLegends(lang).map(({ story: _story, ...card }) => {
    void _story;
    return card;
  });
}

export function fortCards(lang: Locale): FortCard[] {
  return getForts(lang).map(({ stories: _stories, history: _history, ...card }) => {
    void _stories;
    void _history;
    return card;
  });
}

export function battleCards(lang: Locale): BattleCard[] {
  return withoutStory(getBattles(lang));
}

export function figureCards(lang: Locale): FigureCard[] {
  return withoutStory(getLegendaryFigures(lang));
}

export function folkCards(lang: Locale): { tales: TaleCard[]; deities: DeityCard[]; rituals: RitualCard[] } {
  const { tales, deities, rituals } = getFolklore(lang);
  return { tales: withoutStory(tales), deities: withoutStory(deities), rituals: withoutStory(rituals) };
}

/** One key per listing page, matching the page's own props. */
export const listingKeys = ['legends', 'folklore', 'festivals', 'forts', 'battles', 'dynasties'] as const;
export type ListingKey = (typeof listingKeys)[number];

export function isListingKey(value: string): value is ListingKey {
  return (listingKeys as readonly string[]).includes(value);
}

export interface Listings {
  legends: { legends: LegendCard[] };
  folklore: { tales: TaleCard[]; deities: DeityCard[]; rituals: RitualCard[] };
  festivals: { festivals: Festival[] };
  forts: { forts: FortCard[] };
  battles: { battles: BattleCard[]; figures: FigureCard[] };
  dynasties: { dynasties: Dynasty[]; periods: HistoricalPeriod[] };
}

export function getListing<K extends ListingKey>(lang: Locale, key: K): Listings[K] {
  switch (key) {
    case 'legends':
      return { legends: legendCards(lang) } as Listings[K];
    case 'folklore':
      return folkCards(lang) as Listings[K];
    case 'festivals':
      return { festivals: getFestivals(lang) } as Listings[K];
    case 'forts':
      return { forts: fortCards(lang) } as Listings[K];
    case 'battles':
      return { battles: battleCards(lang), figures: figureCards(lang) } as Listings[K];
    case 'dynasties':
      return { dynasties: getDynasties(lang), periods: getHistoricalPeriods(lang) } as Listings[K];
  }
}

export function getListingParams(): { lang: Locale; key: ListingKey }[] {
  return locales.flatMap((lang) => listingKeys.map((key) => ({ lang, key })));
}
