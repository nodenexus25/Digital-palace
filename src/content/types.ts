// Shapes of localized content handed to components. Every string in these
// types is already in the page's language — components never branch on
// language for content.

export interface ImageRef {
  src: string;
  alt: string;
  credit?: string;
}

export interface VideoRef {
  provider: 'youtube' | 'mp4';
  url: string;
  title: string;
  thumbnail?: string;
}

export interface Chapter {
  title: string;
  story: string;
}

// ---- battles
export interface Battle {
  id: string;
  name: string;
  year: string;
  location: string;
  rajputSide: string;
  enemySide: string;
  result: string;
  significance: string[];
  casualties: string[];
  tactics: string[];
  story: string;
}

export interface LegendaryFigure {
  id: string;
  image: string;
  name: string;
  period: string;
  kingdom: string;
  significance: string;
  legends: string[];
  story: string;
  chapters?: Chapter[];
}

// ---- folklore
export interface FolkTale {
  id: string;
  name: string;
  author: string;
  period: string;
  type: string;
  significance: string;
  themes: string[];
  story: string;
}

export interface FolkDeity {
  id: string;
  name: string;
  period: string;
  region: string;
  significance: string;
  worship: string;
  legends: string[];
  story: string;
}

export interface FolkRitual {
  id: string;
  name: string;
  significance: string;
  practices: string[];
  occasions: string[];
  story: string;
}

// ---- weapons
export interface WeaponCategory {
  id: string;
  numeral: string;
  title: string;
}

export interface Weapon {
  id: string;
  category: string;
  image: string | null;
  name: string;
  subtitle: string;
  description: string;
  type: string;
  lethality: string;
  role: string;
  era: string;
}

// ---- legends
export interface Legend {
  id: string;
  title: string;
  hook: string;
  category: string;
  era: string;
  location: string;
  story: string;
  cover: ImageRef;
  gallery: ImageRef[];
  videos: VideoRef[];
}

// ---- forts
export type FortStoryTag = 'legend' | 'history' | 'siege' | 'royal' | 'architecture';

export interface FortStory {
  title: string;
  story: string;
  tag: FortStoryTag;
}

export interface Fort {
  id: string;
  category: 'fort' | 'palace';
  standing: boolean;
  /** Ruling clan key (Sisodia, Rathore, …, or Royal); label comes from the UI dictionary. */
  clan: string;
  icon?: string;
  dynasty?: string;
  coordinates?: { lat: number; lng: number };
  name: string;
  location: string;
  builtBy: string;
  period: string;
  status: string;
  description: string;
  history?: string;
  visitingHours?: string;
  entryFee?: string;
  stories: FortStory[];
  images: ImageRef[];
  videos: VideoRef[];
}

// ---- festivals
export type FestivalGroup = 'religious' | 'cultural' | 'commemoration';

export interface Festival {
  id: string;
  group: FestivalGroup;
  image: string;
  name: string;
  date: string;
  significance: string;
  rituals: string[];
  description: string;
  story: string;
}

// ---- dynasties
export interface HistoricalPeriod {
  id: string;
  image?: string;
  title: string;
  range: string;
  description: string;
}

/** Ruler as listed on the dynasties page (no long text). */
export interface RulerSummary {
  id: string;
  dynastyId: string;
  image?: string;
  name: string;
  title: string;
  period: string;
  /** Sortable start year parsed from the English period. */
  startYear: number;
}

/** Full ruler record, loaded on demand when a ruler is opened. */
export interface RulerDetail extends RulerSummary {
  significance: string;
  ancestry: string;
  battles: string[];
  heroicDeeds: string[];
  culturalContributions: string[];
  legacy: string;
  story: string;
  gallery: ImageRef[];
}

export interface Dynasty {
  id: string;
  period: string;
  mainImage: string | null;
  seal: string | null;
  name: string;
  significance: string;
  region: string;
  capital: string;
  founded: string;
  founder: string;
  rulers: RulerSummary[];
}

// ---- card shapes
// What a listing page actually ships: the entry without its long-form text.
export type LegendCard = Omit<Legend, 'story'>;
export type FortCard = Omit<Fort, 'stories' | 'history'>;
export type BattleCard = Omit<Battle, 'story'>;
export type FigureCard = Omit<LegendaryFigure, 'story' | 'chapters'>;
export type TaleCard = Omit<FolkTale, 'story'>;
export type DeityCard = Omit<FolkDeity, 'story'>;
export type RitualCard = Omit<FolkRitual, 'story'>;
