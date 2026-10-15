"use client";

import LazyImage from '@/app/components/LazyImage';
import { useLanguage } from '@/app/components/LanguageProvider';
import StoryModal from '@/app/components/story/StoryModal';
import { ListenButton, useNarration } from '@/app/components/story/useNarration';
import { useQueryState } from '@/app/components/hooks/useQueryState';
import { prefetchJson, storyUrl, useRemoteJson } from '@/app/components/hooks/useRemoteContent';
import type { Legend } from '@/content/types';

type LegendCard = Omit<Legend, 'story'>;

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A24D]/40 bg-black/40 px-4 py-2">
    <span className="h-1 w-1 rounded-full bg-[#C9A24D]" aria-hidden="true" />
    {children}
  </span>
);

export default function LegendsClient({ legends }: { legends: LegendCard[] }) {
  const { t, currentLanguage } = useLanguage();
  const [openId, setOpenId] = useQueryState('legend');
  const { toggle, isActive } = useNarration();
  const open = legends.find((l) => l.id === openId) ?? null;
  const story = useRemoteJson<{ story?: string }>(open ? storyUrl(currentLanguage, 'legends', open.id) : null);
  const warm = (id: string) => () => void prefetchJson(storyUrl(currentLanguage, 'legends', id)).catch(() => {});

  const listen = async (legend: LegendCard) => {
    if (isActive(legend.id)) return toggle(legend.id, '');
    const data = (await prefetchJson(storyUrl(currentLanguage, 'legends', legend.id)).catch(() => null)) as { story?: string } | null;
    toggle(legend.id, [legend.title, legend.hook, data?.story].filter(Boolean).join('\n\n'));
  };

  return (
    <main className="min-h-screen bg-[#050507] text-[#F5E9D0]">
      <section className="relative min-h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#120C0A] to-black" />
        <div className="absolute -left-32 top-0 h-80 w-80 bg-[#8B0000]/35 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[22rem] w-[22rem] bg-[#D4AF37]/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(0,0,0,0.85),_rgba(0,0,0,0.95))]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-24 lg:py-28 flex flex-col gap-12 md:flex-row md:items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#C9A24D]/40 bg-black/40 px-4 py-2 text-[11px] tracking-[0.28em] font-cinzel uppercase text-[#F5E9D0]/80">
              {t('legends.hero.chip')}
            </div>
            <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] md:tracking-[0.25em] text-[#F5E9D0]">{t('legends.title')}</h1>
            <p className="font-cormorant text-lg md:text-xl text-[#F5E9D0]/80 max-w-2xl leading-relaxed">{t('legends.hero.description')}</p>
            <div className="flex flex-wrap gap-3 text-xs font-cinzel tracking-[0.2em] uppercase text-[#F5E9D0]/70">
              <Chip>{t('legends.tags.steel')}</Chip>
              <Chip>{t('legends.tags.smoke')}</Chip>
              <Chip>{t('legends.tags.sacrifice')}</Chip>
              <Chip>{t('legends.tags.glory')}</Chip>
            </div>
          </div>

          <aside className="flex-1 max-w-md md:max-w-none">
            <div className="relative rounded-3xl border border-[#C9A24D]/40 bg-gradient-to-br from-[#0B0807] via-[#1A100D] to-[#2B1510] px-6 py-7 shadow-[0_40px_120px_rgba(0,0,0,0.85)] space-y-4">
              <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#C9A24D]/90">{t('legends.hero.sidebar.title')}</p>
              <p className="font-cormorant text-base md:text-lg text-[#F5E9D0]/90 leading-relaxed">{t('legends.hero.sidebar.body1')}</p>
              <p className="font-cormorant text-sm text-[#F5E9D0]/70">{t('legends.hero.sidebar.body2')}</p>
              <p className="mt-4 text-center text-[11px] font-cinzel tracking-[0.2em] uppercase text-[#F5E9D0]/70">{t('legends.hero.sidebar.meta')}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-[#C9A24D]/30 bg-gradient-to-b from-black via-[#0B0908] to-[#050507] py-14 md:py-18">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          <header>
            <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#C9A24D]/80">{t('legends.section.preheader')}</p>
            <h2 className="mt-2 font-cinzel text-2xl md:text-3xl tracking-[0.18em] text-[#F5E9D0]">{t('legends.section.title')}</h2>
            <p className="mt-3 max-w-xl font-cormorant text-sm md:text-base text-[#F5E9D0]/75 leading-relaxed">{t('legends.section.description')}</p>
          </header>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {legends.map((legend) => (
              <article
                key={legend.id}
                onMouseEnter={warm(legend.id)}
                className="group relative overflow-hidden rounded-2xl border border-[#C9A24D]/30 bg-gradient-to-br from-[#050404] via-[#120A0A] to-[#24110D] shadow-[0_25px_80px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:-translate-y-1 flex flex-col"
              >
                <div className="relative h-40 overflow-hidden">
                  <LazyImage fill src={legend.cover.src} alt={legend.cover.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="relative z-10 p-6 flex flex-1 flex-col">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-[#C9A24D]/90">{legend.category}</span>
                    <span className="rounded-full border border-[#C9A24D]/40 bg-black/40 px-3 py-1 text-[10px] font-cinzel tracking-[0.2em] uppercase text-[#F5E9D0]/80">{legend.era}</span>
                  </div>
                  <h3 className="font-cinzel text-xl text-[#F5E9D0] tracking-[0.12em] mb-2">{legend.title}</h3>
                  <p className="font-cormorant text-sm text-[#F5E9D0]/80 leading-relaxed mb-4 line-clamp-3">{legend.hook}</p>
                  <div className="mt-auto space-y-4">
                    <ListenButton
                      active={isActive(legend.id)}
                      onClick={() => void listen(legend)}
                      className={`rounded-full border px-3 py-1 text-[11px] font-cinzel tracking-[0.18em] uppercase ${
                        isActive(legend.id) ? 'bg-[#C9A24D] text-black border-[#C9A24D]' : 'border-[#C9A24D]/40 text-[#C9A24D] hover:bg-[#C9A24D]/10'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setOpenId(legend.id)}
                      onFocus={warm(legend.id)}
                      className="w-full inline-flex items-center justify-between gap-3 rounded-full border border-[#C9A24D]/60 bg-gradient-to-r from-[#2B1510] to-[#5C2A1A] px-5 py-2 text-[11px] font-cinzel tracking-[0.25em] uppercase text-[#F5E9D0] transition-colors duration-300 group-hover:from-[#5C2A1A] group-hover:to-[#9B3A24]"
                    >
                      <span>{t('legends.item.cta')}</span>
                      <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {open && (
        <StoryModal
          id={`legend:${open.id}`}
          title={open.title}
          subtitle={open.hook}
          facts={[
            { label: t('legends.categoryLabel'), value: open.category },
            { label: t('dynasties.period'), value: open.era },
            { label: t('stories.regionLabel'), value: open.location },
          ]}
          images={[open.cover, ...open.gallery]}
          videos={open.videos}
          story={story.data?.story}
          loading={story.loading}
          onClose={() => setOpenId(null)}
        />
      )}
    </main>
  );
}
