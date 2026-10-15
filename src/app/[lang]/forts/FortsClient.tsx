"use client";

import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import MediaGallery from '@/app/components/MediaGallery';
import { DynastySeal } from '@/app/components/DynastySeals';
import Hero from '@/app/components/Hero';
import OptimizedImage from '@/app/components/OptimizedImage';
import { useLanguage } from '@/app/components/LanguageProvider';
import StoryText, { toSpeech } from '@/app/components/story/StoryText';
import { ListenButton, useNarration } from '@/app/components/story/useNarration';
import { useQueryState } from '@/app/components/hooks/useQueryState';
import { prefetchJson, storyUrl, useRemoteJson } from '@/app/components/hooks/useRemoteContent';
import type { Fort, FortStory, FortStoryTag } from '@/content/types';

type FortCard = Omit<Fort, 'stories' | 'history'>;
type Category = 'all' | 'fort' | 'palace';

const CLAN_COLORS: Record<string, string> = {
  Sisodia: '#D4B483', Kachwaha: '#FF9933', Rathore: '#E53935', Bhati: '#FDD835', Chauhan: '#D84315',
  Doda: '#8D6E63', Jadaun: '#FBC02D', Jat: '#795548', Hada: '#5D4037', Shekhawat: '#8B4513', Royal: '#8B4513',
};

const TAG_KEYS: Record<FortStoryTag, string> = {
  legend: 'forts.storyCategory.legend',
  history: 'forts.storyCategory.historicalEvent',
  siege: 'forts.storyCategory.siege',
  royal: 'forts.storyCategory.royalDynasty',
  architecture: 'forts.storyCategory.architecturalMarvel',
};

export default function FortsClient({ forts }: { forts: FortCard[] }) {
  const { t, currentLanguage } = useLanguage();
  const { toggle, isActive, stop } = useNarration();
  const [categoryParam, setCategory] = useQueryState('type');
  const [openId, setOpenId] = useQueryState('fort');
  const [search, setSearch] = useState('');
  const query = useDeferredValue(search.trim().toLocaleLowerCase());
  const category: Category = categoryParam === 'fort' || categoryParam === 'palace' ? categoryParam : 'all';

  const visible = useMemo(
    () =>
      forts.filter(
        (f) =>
          (category === 'all' || f.category === category) &&
          (!query || [f.name, f.location, f.builtBy].some((v) => v.toLocaleLowerCase().includes(query))),
      ),
    [forts, category, query],
  );

  const open = forts.find((f) => f.id === openId) ?? null;
  const detail = useRemoteJson<{ stories?: FortStory[]; story?: string }>(open ? storyUrl(currentLanguage, 'forts', open.id) : null);
  const warm = (id: string) => () => void prefetchJson(storyUrl(currentLanguage, 'forts', id)).catch(() => {});

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenId(null);
    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, setOpenId]);

  const overview = (f: FortCard) => toSpeech(f.name, f.location, f.description, f.builtBy, f.period);
  const clanLabel = (clan: string) => t(`forts.clans.${clan}`);

  const close = () => {
    stop();
    setOpenId(null);
  };

  const stories: FortStory[] = detail.data?.stories?.length
    ? detail.data.stories
    : open && detail.data
      ? [{ tag: 'history', title: t('forts.modal.foundingChronicle', { name: open.name }), story: [open.description, detail.data.story].filter(Boolean).join('\n\n') }]
      : [];

  return (
    <div className="min-h-screen bg-[#FDF6E3] relative">
      <div className="relative z-10">
        <Hero title={t('forts.title')} subtitle={t('forts.subtitle')} description={t('forts.hero.description')} />

        <div className="bg-[#FDF6E3]/95 backdrop-blur-md shadow-md sticky top-0 z-40 border-b border-[#D4B483]">
          <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <label className="relative flex-1 max-w-md w-full">
              <span className="sr-only">{t('forts.search.placeholder')}</span>
              <input
                type="search"
                placeholder={t('forts.search.placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 pl-12 border-2 border-[#D4B483] rounded-lg focus:outline-none focus:border-[#8B4513] bg-[#FDF6E3] font-playfair text-[#2C1810] placeholder-[#8B4513]/60 shadow-inner"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513] opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </label>
            <div className="flex gap-3" role="tablist">
              {(['all', 'fort', 'palace'] as const).map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={category === c}
                  onClick={() => setCategory(c === 'all' ? null : c)}
                  className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 uppercase tracking-wider text-sm font-cinzel border-2 ${
                    category === c ? 'bg-[#8B4513] text-[#FDF6E3] border-[#8B4513] shadow-lg scale-105' : 'bg-[#FDF6E3] text-[#8B4513] hover:bg-[#E6D2B5] border-[#D4B483]'
                  }`}
                >
                  {t(c === 'all' ? 'forts.filters.all' : c === 'fort' ? 'forts.filters.forts' : 'forts.filters.palaces')}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {visible.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-cinzel text-[#2C1810] mb-2">{t('forts.noResults.title')}</h3>
              <p className="text-[#8B4513] font-playfair italic">{t('forts.noResults.body')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visible.map((fort) => (
                <article
                  key={fort.id}
                  onMouseEnter={warm(fort.id)}
                  className="group relative bg-[#FDF6E3] rounded-lg shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-[#D4B483] hover:border-[#8B4513] flex flex-col h-full"
                >
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/60 to-transparent z-10" />
                    {fort.images[0] ? (
                      <OptimizedImage
                        src={fort.images[0].src}
                        alt={fort.images[0].alt}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        strategy="CONTENT"
                        responsive
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        width={800}
                        height={350}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#E6D2B5]" />
                    )}
                    <div className="absolute top-3 right-3 z-20" title={clanLabel(fort.clan)}>
                      <div className="w-12 h-12 rounded-full border-2 border-[#D4B483] flex items-center justify-center shadow-lg bg-[#FDF6E3]">
                        <div className="w-8 h-8">
                          <DynastySeal dynasty={fort.clan} color={CLAN_COLORS[fort.clan] ?? CLAN_COLORS.Royal} />
                        </div>
                      </div>
                    </div>
                    <span
                      className={`absolute top-3 left-3 z-20 px-3 py-1 rounded-sm text-xs tracking-widest font-cinzel uppercase border border-[#D4B483] shadow-md text-[#FDF6E3] ${
                        fort.category === 'fort' ? 'bg-[#8B0000]' : 'bg-[#4B0082]'
                      }`}
                    >
                      {t(fort.category === 'fort' ? 'forts.filters.forts' : 'forts.filters.palaces')}
                    </span>
                  </div>

                  <div className="p-5 relative flex flex-col flex-grow">
                    <h3 className="text-center text-2xl font-bold font-cinzel text-[#2C1810] leading-tight mb-3">{fort.name}</h3>
                    <p className="flex justify-center items-center gap-2 mb-4 text-xs font-cinzel tracking-wider text-[#5D4037]">
                      <span>{fort.location.split(/[,،]/)[0]}</span>
                      <span className="text-[#D4B483]" aria-hidden="true">•</span>
                      <span>{fort.period}</span>
                    </p>
                    <p className="text-[#4A3B2A] font-playfair text-sm leading-relaxed line-clamp-3 mb-4 px-2">{fort.description}</p>
                    <div className="flex items-center justify-between gap-2 mb-3 px-2">
                      <ListenButton
                        active={isActive(fort.id)}
                        onClick={() => toggle(fort.id, overview(fort))}
                        className={`px-3 py-1 rounded-full text-xs font-cinzel ${isActive(fort.id) ? 'bg-[#5D4037] text-[#FDF6E3]' : 'bg-[#8B4513] text-[#FDF6E3] hover:bg-[#5D4037]'}`}
                      />
                      <button
                        type="button"
                        onClick={() => setOpenId(fort.id)}
                        onFocus={warm(fort.id)}
                        className="px-3 py-1 rounded-full text-xs font-cinzel border border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-[#FDF6E3]"
                      >
                        {t('common.seeDetails')}
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-3 pt-3 mt-auto border-t border-[#D4B483]/30 text-xs font-playfair text-[#8B4513]">
                      <span className="truncate">{fort.builtBy}</span>
                      <span className={`shrink-0 px-2 py-0.5 rounded-sm border ${fort.standing ? 'border-green-800/30 text-green-900' : 'border-amber-800/30 text-amber-900'}`}>
                        {fort.status}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {open && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={close}>
            <div
              role="dialog"
              aria-modal="true"
              aria-label={open.name}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FDF6E3] rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-[#D4B483] shadow-2xl relative"
            >
              <header className="sticky top-0 bg-[#FDF6E3] border-b border-[#D4B483] p-6 z-30 flex justify-between items-center gap-4 shadow-sm">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-14 h-14 shrink-0 rounded-full border-2 border-[#D4B483] bg-[#E6D2B5] flex items-center justify-center">
                    <div className="w-9 h-9">
                      <DynastySeal dynasty={open.clan} color={CLAN_COLORS[open.clan] ?? CLAN_COLORS.Royal} />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-3xl font-bold font-cinzel text-[#2C1810]">{open.name}</h2>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <span className="text-xs font-cinzel font-semibold text-[#5D4037] px-3 py-1 rounded-full border border-[#D4B483]">{clanLabel(open.clan)}</span>
                      <ListenButton
                        iconOnly
                        active={isActive(`${open.id}:overview`)}
                        onClick={() => toggle(`${open.id}:overview`, overview(open))}
                        className="p-2 rounded-full border border-[#D4B483] text-[#8B4513] hover:bg-[#8B4513] hover:text-[#FDF6E3]"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={close}
                  aria-label={t('common.close')}
                  className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full border border-[#D4B483] text-[#8B4513] hover:bg-[#8B4513] hover:text-[#FDF6E3] transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </header>

              <div className="p-6 md:p-8 space-y-10">
                <section className="bg-white/50 rounded-lg p-6 border border-[#D4B483]/50">
                  <h3 className="font-cinzel font-bold text-2xl text-[#2C1810] mb-6 border-b border-[#D4B483]/30 pb-2">{t('forts.modal.visualGallery')}</h3>
                  <MediaGallery images={open.images} videos={open.videos} fallbackAlt={open.name} />
                </section>

                <section className="rounded-lg p-6 border border-[#D4B483]/50">
                  <h3 className="font-cinzel font-bold text-2xl text-[#2C1810] mb-6 border-b border-[#D4B483]/30 pb-2">{t('forts.modal.keyHighlights')}</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      ['forts.modal.builtBy', open.builtBy],
                      ['forts.modal.period', open.period],
                      ['forts.modal.location', open.location],
                    ].map(([key, value]) => (
                      <div key={key} className="rounded-lg p-5 border border-[#D4B483]">
                        <dt className="font-cinzel font-bold text-[#5D4037] mb-2 text-sm uppercase tracking-wider">{t(key)}</dt>
                        <dd className="font-playfair text-[#2C1810] text-lg leading-relaxed">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <section className="rounded-2xl p-6 md:p-8 border border-[#D4B483] shadow-lg">
                  <h3 className="font-cinzel font-bold text-2xl text-[#2C1810] mb-2">{t('forts.modal.fortStories')}</h3>
                  <p className="font-playfair text-sm text-[#8B4513] mb-6">{t('forts.modal.fortStoriesOf', { name: open.name })}</p>
                  {detail.loading ? (
                    <div className="space-y-3 animate-pulse" aria-busy="true" aria-label={t('common.loading')}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-4 rounded bg-[#8B4513]/10" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {stories.map((story, index) => {
                        const id = `${open.id}:story:${index}`;
                        return (
                          <article key={id} className="bg-[#FDF6E3]/80 border border-[#D4B483]/70 rounded-xl p-5 shadow-sm">
                            <header className="flex flex-wrap items-center justify-between gap-3 mb-3">
                              <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-[#8B4513] text-[#FDF6E3] flex items-center justify-center font-cinzel text-sm">{index + 1}</span>
                                <h4 className="font-cinzel font-semibold text-lg text-[#2C1810]">{story.title}</h4>
                                <ListenButton
                                  iconOnly
                                  active={isActive(id)}
                                  onClick={() => toggle(id, toSpeech(story.title, story.story))}
                                  className="p-2 rounded-full border border-[#D4B483] text-[#8B4513] hover:bg-[#8B4513] hover:text-[#FDF6E3]"
                                />
                              </div>
                              <span className="px-3 py-1 rounded-full text-xs font-cinzel uppercase tracking-wider border border-[#D4B483] text-[#8B4513]">{t(TAG_KEYS[story.tag])}</span>
                            </header>
                            <StoryText text={story.story} className="font-playfair text-[#4A3B2A] [&_p]:text-base" />
                          </article>
                        );
                      })}
                    </div>
                  )}
                </section>

                <section className="rounded-2xl p-6 border border-[#D4B483] shadow-lg">
                  <h3 className="font-cinzel font-bold text-2xl text-[#2C1810] mb-4">{t('forts.modal.travelInfo')}</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-[#E6D2B5]/30 rounded-xl p-4 border border-[#D4B483] text-center">
                      <dt className="font-cinzel font-semibold text-[#2C1810] mb-2 text-sm uppercase tracking-wider">{t('forts.modal.timings')}</dt>
                      <dd className="font-playfair text-sm text-[#4A3B2A] font-bold">{open.visitingHours || t('forts.modal.defaultTimings')}</dd>
                    </div>
                    <div className="bg-[#E6D2B5]/30 rounded-xl p-4 border border-[#D4B483] text-center">
                      <dt className="font-cinzel font-semibold text-[#2C1810] mb-2 text-sm uppercase tracking-wider">{t('forts.modal.entryFee')}</dt>
                      <dd className="font-playfair text-sm text-[#4A3B2A] font-bold">{open.entryFee || t('forts.modal.seeDetails')}</dd>
                    </div>
                    <div className="bg-[#E6D2B5]/30 rounded-xl p-4 border border-[#D4B483] text-center">
                      <dt className="font-cinzel font-semibold text-[#2C1810] mb-2 text-sm uppercase tracking-wider">{t('forts.modal.nearestCity')}</dt>
                      <dd className="font-playfair text-sm text-[#4A3B2A] font-bold">{open.location.split(/[,،]/)[0]}</dd>
                    </div>
                  </dl>
                  <p className="text-center font-playfair text-sm text-[#8B4513] italic border-t border-[#D4B483] pt-4">{t('forts.modal.quote', { name: open.name })}</p>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
