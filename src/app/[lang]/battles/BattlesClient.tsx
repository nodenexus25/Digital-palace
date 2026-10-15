'use client';

import Image from 'next/image';
import { useLanguage } from '@/app/components/LanguageProvider';
import Hero from '@/app/components/Hero';
import StoryModal from '@/app/components/story/StoryModal';
import { useQueryState } from '@/app/components/hooks/useQueryState';
import { prefetchJson, storyUrl, useRemoteJson } from '@/app/components/hooks/useRemoteContent';
import type { Battle, Chapter, LegendaryFigure } from '@/content/types';

type BattleCard = Omit<Battle, 'story'>;
type FigureCard = Omit<LegendaryFigure, 'story' | 'chapters'>;
type StoryPayload = { story?: string; chapters?: Chapter[] };

export default function BattlesClient({ battles, figures }: { battles: BattleCard[]; figures: FigureCard[] }) {
  const { t, currentLanguage } = useLanguage();
  const [battleId, setBattleId] = useQueryState('battle');
  const [figureId, setFigureId] = useQueryState('figure');

  const battle = battles.find((b) => b.id === battleId) ?? null;
  const figure = figures.find((f) => f.id === figureId) ?? null;

  const battleStory = useRemoteJson<StoryPayload>(battle ? storyUrl(currentLanguage, 'battles', battle.id) : null);
  const figureStory = useRemoteJson<StoryPayload>(figure ? storyUrl(currentLanguage, 'figures', figure.id) : null);
  const warm = (collection: string, id: string) => () => void prefetchJson(storyUrl(currentLanguage, collection, id)).catch(() => {});

  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <Hero title={t('battles.meta.title')} subtitle={t('battles.meta.description')} />

      <section className="max-w-7xl mx-auto px-4 py-16" aria-labelledby="battles-heading">
        <h2 id="battles-heading" className="font-cinzel text-4xl text-maroon mb-8">
          {t('battles.title')}
        </h2>
        <p className="text-lg opacity-80 mb-12 max-w-3xl">{t('battles.intro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {battles.map((b) => (
            <article
              key={b.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-imperial-gold/20 flex flex-col"
            >
              <div className="p-6 flex flex-col flex-1">
                <div className="text-sm text-imperial-gold font-bold uppercase tracking-wider mb-2">{b.year}</div>
                <h3 className="font-cinzel text-2xl text-maroon mb-4">{b.name}</h3>
                <dl className="space-y-2 text-xs uppercase tracking-wider mb-2">
                  <div className="flex justify-between gap-4 opacity-70">
                    <dt>{t('battles.location')}</dt>
                    <dd className="font-bold text-right">{b.location}</dd>
                  </div>
                  <div className="flex justify-between gap-4 opacity-70">
                    <dt>{t('battles.result')}</dt>
                    <dd className="font-bold text-imperial-gold text-right">{b.result}</dd>
                  </div>
                </dl>
                <p className="text-sm text-charcoal/70 mt-4 line-clamp-3">{b.significance[0]}</p>
                <button
                  type="button"
                  onClick={() => setBattleId(b.id)}
                  onMouseEnter={warm('battles', b.id)}
                  onFocus={warm('battles', b.id)}
                  className="mt-auto pt-6"
                >
                  <span className="block w-full py-3 border border-maroon text-maroon hover:bg-maroon hover:text-ivory transition-all rounded-lg text-sm font-bold uppercase tracking-widest">
                    {t('common.seeDetails')}
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="warriors" className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-maroon/5" aria-labelledby="warriors-heading">
        <h2 id="warriors-heading" className="font-cinzel text-4xl text-maroon mb-8">
          {t('legends.title')}
        </h2>
        <p className="text-lg opacity-80 mb-12 max-w-3xl">{t('legends.intro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {figures.map((f) => (
            <article
              key={f.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-imperial-gold/20 flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-charcoal/10 overflow-hidden">
                <Image
                  src={f.image}
                  alt={f.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-cinzel text-2xl text-maroon mb-4">{f.name}</h3>
                <dl className="space-y-2 text-xs uppercase tracking-wider mb-2">
                  <div className="flex justify-between gap-4 opacity-70">
                    <dt>{t('battles.period')}</dt>
                    <dd className="font-bold text-right">{f.period}</dd>
                  </div>
                  <div className="flex justify-between gap-4 opacity-70">
                    <dt>{t('dynasties.kingdom')}</dt>
                    <dd className="font-bold text-imperial-gold text-right">{f.kingdom}</dd>
                  </div>
                </dl>
                <p className="text-sm text-charcoal/70 mt-4 line-clamp-2">{f.significance}</p>
                <button
                  type="button"
                  onClick={() => setFigureId(f.id)}
                  onMouseEnter={warm('figures', f.id)}
                  onFocus={warm('figures', f.id)}
                  className="mt-auto pt-6"
                >
                  <span className="block w-full py-3 border border-maroon text-maroon hover:bg-maroon hover:text-ivory transition-all rounded-lg text-sm font-bold uppercase tracking-widest">
                    {t('common.seeDetails')}
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {battle && (
        <StoryModal
          id={`battle:${battle.id}`}
          title={battle.name}
          subtitle={battle.year}
          facts={[
            { label: t('battles.location'), value: battle.location },
            { label: t('battles.rajputSide'), value: battle.rajputSide },
            { label: t('battles.enemySide'), value: battle.enemySide },
          ]}
          lists={[
            { label: t('common.significance'), items: battle.significance },
            { label: t('battles.tactics'), items: battle.tactics },
            { label: t('battles.casualties'), items: battle.casualties },
          ]}
          notes={[{ label: t('battles.result'), text: battle.result }]}
          story={battleStory.data?.story}
          loading={battleStory.loading}
          onClose={() => setBattleId(null)}
        />
      )}

      {figure && (
        <StoryModal
          id={`figure:${figure.id}`}
          title={figure.name}
          subtitle={figure.period}
          facts={[
            { label: t('dynasties.kingdom'), value: figure.kingdom },
            { label: t('common.significance'), value: figure.significance },
          ]}
          lists={[{ label: t('battles.legendsList'), items: figure.legends }]}
          story={figureStory.data?.story}
          chapters={figureStory.data?.chapters}
          loading={figureStory.loading}
          onClose={() => setFigureId(null)}
        />
      )}
    </div>
  );
}
