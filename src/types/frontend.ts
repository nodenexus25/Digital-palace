export interface Ruler {
  id: string;
  name: string;
  hindiName: string;
  title: string;
  period?: string;
  significance: string | string[];
  ancestry?: string;
  father?: string;
  sons?: string[];
  successors?: string;
  majorBattles?: string[];
  fortsBuilt?: string[];
  legends?: string[];
  culturalContributions?: string[];
  heroicDeeds?: string[];
  legacy?: string;
  fullStory: string;
  image?: string;
  galleryImages?: { src: string; alt?: string; credit?: string }[];
  galleryVideos?: { title: string; provider: 'youtube' | 'mp4'; url: string; thumbnail?: string }[];
}

export interface Dynasty {
  id: string;
  name: string;
  hindiName: string;
  region: string;
  capital: string;
  founded: string;
  founder: string;
  historicalPeriod: string;
  significance: string;
  emblem: string;
  description?: string;
  notableRulers: Ruler[];
}

export interface Monument {
  id: string;
  name: string;
  hindiName: string;
  location: string;
  builtBy: string;
  dynasty?: string;
  period: string;
  type?: string;
  category: string;
  status: string;
  significance?: string[] | string;
  architecture?: string[] | string;
  architecturalFeatures?: string[] | string;
  description: string;
  detailedHistory?: string;
  culturalSignificance?: string;
  interestingFacts?: string[];
  icon?: string;
  coordinates?: { lat: number; lng: number } | string;
  visitingHours?: string;
  entryFee?: string;
  fortStories?: {
    title: string;
    category: string;
    content: string;
  }[];
  historicalSignificance?: string;
  images?: { src: string; alt?: string; credit?: string }[];
  videos?: { title: string; provider: 'youtube' | 'mp4'; url: string; thumbnail?: string }[];
}

export interface Story {
  id: string;
  title: string;
  hindiTitle: string;
  summary: string;
  fullStory: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  audioAvailable: boolean;
  duration: string;
  historicalContext: string;
  moralLesson: string;
  hero: string;
  period: string;
  // Optional rich metadata for detailed panels
  region?: string;
  tags?: string[];
  relatedFigures?: string[];
  locations?: string[];
  sources?: string[];
  keyEvents?: { date?: string; title: string; detail?: string }[];
  quotes?: { text: string; attribution?: string }[];
  sections?: { heading?: string; content: string }[];
  images?: string[];
  featured?: boolean;
}
