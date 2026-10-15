import 'server-only';
import type { Locale } from '@/i18n/config';
import { locales } from '@/i18n/config';
import { getBattles, getLegendaryFigures } from './battles';
import { getFolklore } from './folklore';
import { getForts } from './forts';
import { getLegends } from './legends';
import type { Chapter, FortStory } from './types';

/**
 * Long-form text is not embedded in listing pages. Each story is emitted as
 * its own static JSON file per language (/api/story/[lang]/[collection]/[id])
 * and fetched when the reader opens it.
 */
export interface StoryPayload {
  story?: string;
  chapters?: Chapter[];
  stories?: FortStory[];
}

type Collection = 'battles' | 'figures' | 'tales' | 'deities' | 'rituals' | 'legends' | 'forts';

const sources: Record<Collection, (lang: Locale) => { id: string; payload: StoryPayload }[]> = {
  battles: (lang) => getBattles(lang).map((b) => ({ id: b.id, payload: { story: b.story } })),
  figures: (lang) =>
    getLegendaryFigures(lang).map((f) => ({ id: f.id, payload: { story: f.story, ...(f.chapters ? { chapters: f.chapters } : {}) } })),
  tales: (lang) => getFolklore(lang).tales.map((x) => ({ id: x.id, payload: { story: x.story } })),
  deities: (lang) => getFolklore(lang).deities.map((x) => ({ id: x.id, payload: { story: x.story } })),
  rituals: (lang) => getFolklore(lang).rituals.map((x) => ({ id: x.id, payload: { story: x.story } })),
  legends: (lang) => getLegends(lang).map((x) => ({ id: x.id, payload: { story: x.story } })),
  forts: (lang) => getForts(lang).map((x) => ({ id: x.id, payload: { stories: x.stories, ...(x.history ? { story: x.history } : {}) } })),
};

export const storyCollections = Object.keys(sources) as Collection[];

export function isStoryCollection(value: string): value is Collection {
  return value in sources;
}

const cache = new Map<string, Map<string, StoryPayload>>();
function table(lang: Locale, collection: Collection) {
  const key = `${lang}:${collection}`;
  let t = cache.get(key);
  if (!t) {
    t = new Map(sources[collection](lang).map((e) => [e.id, e.payload]));
    cache.set(key, t);
  }
  return t;
}

export function getStory(lang: Locale, collection: Collection, id: string): StoryPayload | null {
  return table(lang, collection).get(id) ?? null;
}

export function getStoryParams(): { lang: Locale; collection: Collection; id: string }[] {
  return locales.flatMap((lang) =>
    storyCollections.flatMap((collection) => [...table(lang, collection).keys()].map((id) => ({ lang, collection, id }))),
  );
}

/** Drop long-form fields before sending a list to the browser. */
export function withoutStory<T extends { story?: unknown; chapters?: unknown }>(items: T[]): Omit<T, 'story' | 'chapters'>[] {
  return items.map((item) => {
    const { story: _story, chapters: _chapters, ...rest } = item;
    void _story;
    void _chapters;
    return rest;
  });
}
