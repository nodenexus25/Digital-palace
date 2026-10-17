'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/app/components/LanguageProvider';
import Hero from '@/app/components/Hero';
import StoryModal from '@/app/components/story/StoryModal';
import StoryLanguageToggle from '@/app/components/story/StoryLanguageToggle';
import { useCardLanguage } from '@/app/components/story/useCardLanguage';
import { useQueryState } from '@/app/components/hooks/useQueryState';
import { prefetchJson, storyUrl, useRemoteJson } from '@/app/components/hooks/useRemoteContent';
import type { BattleCard, Chapter, FigureCard } from '@/content/types';

type StoryPayload = { story?: string; chapters?: Chapter[] };

export default function BattlesClient({ battles, figures }: { battles: BattleCard[]; figures: FigureCard[] }) {
  const { t } = useLanguage();
  const [battleId, setBattleId] = useQueryState('battle');
  const [figureId, setFigureId] = useQueryState('figure');
  const [tab, setTab] = useState<'battles' | 'warriors'>('battles');
  // Both tabs are served by one listing, so one toggle state covers them.
  const { isAlt, langFor, localize, toggle: flip } = useCardLanguage<BattleCard | FigureCard>('battles', tab === 'battles' ? 'battles' : 'figures');

  // Honour the #warriors deep link (e.g. from the home page) by opening the
  // matching tab once mounted.
  useEffect(() => {
    if (window.location.hash === '#warriors') setTab('warriors');
  }, []);

  const battle = battles.find((b) => b.id === battleId) ?? null;
  const figure = figures.find((f) => f.id === figureId) ?? null;
  const shownBattle = battle ? localize(battle) : null;
  const shownFigure = figure ? localize(figure) : null;

  const battleStory = useRemoteJson<StoryPayload>(battle ? storyUrl(langFor(battle.id), 'battles', battle.id) : null);
  const figureStory = useRemoteJson<StoryPayload>(figure ? storyUrl(langFor(figure.id), 'figures', figure.id) : null);
  const warm = (collection: string, id: string) => () => void prefetchJson(storyUrl(langFor(id), collection, id)).catch(() => {});

  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <Hero title={t('battles.meta.title')} subtitle={t('battles.meta.description')} />

      <div className="max-w-7xl mx-auto px-4 pt-12">
        <div
          role="tablist"
          aria-label={t('battles.meta.title')}
          className="inline-flex rounded-lg border border-maroon/25 bg-white p-1 shadow-sm"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'battles'}
            onClick={() => setTab('battles')}
            className={`px-6 py-2.5 rounded-md text-sm font-bold uppercase tracking-widest transition-colors ${
              tab === 'battles' ? 'bg-maroon text-ivory' : 'text-maroon hover:bg-maroon/5'
            }`}
          >
            {t('nav.battles')}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'warriors'}
            onClick={() => setTab('warriors')}
            className={`px-6 py-2.5 rounded-md text-sm font-bold uppercase tracking-widest transition-colors ${
              tab === 'warriors' ? 'bg-maroon text-ivory' : 'text-maroon hover:bg-maroon/5'
            }`}
          >
            {t('battles.warriors')}
          </button>
        </div>
      </div>

      {tab === 'battles' && (
      <section className="max-w-7xl mx-auto px-4 pt-8 pb-16" aria-labelledby="battles-heading">
        <h2 id="battles-heading" className="font-cinzel text-4xl text-maroon mb-8">
          {t('battles.title')}
        </h2>
        <p className="text-lg opacity-80 mb-12 max-w-3xl">{t('battles.intro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {battles.map((b) => {
            const card = localize(b);
            return (
            <article
              key={b.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-imperial-gold/20 flex flex-col"
            >
              <div className="p-6 flex flex-col flex-1">
                <div className="text-sm text-imperial-gold font-bold uppercase tracking-wider mb-2">{card.year}</div>
                <h3 className="font-cinzel text-2xl text-maroon mb-4">{card.name}</h3>
                <dl className="space-y-2 text-xs uppercase tracking-wider mb-2">
                  <div className="flex justify-between gap-4 opacity-70">
                    <dt>{t('battles.location')}</dt>
                    <dd className="font-bold text-right">{card.location}</dd>
                  </div>
                  <div className="flex justify-between gap-4 opacity-70">
                    <dt>{t('battles.result')}</dt>
                    <dd className="font-bold text-imperial-gold text-right">{card.result}</dd>
                  </div>
                </dl>
                <p className="text-sm text-charcoal/70 mt-4 line-clamp-3">{card.significance[0]}</p>
                <div className="mt-auto pt-6 flex items-center gap-3">
                  <StoryLanguageToggle alt={isAlt(b.id)} onToggle={() => flip(b.id)} className="text-maroon shrink-0" />
                  <button
                    type="button"
                    onClick={() => setBattleId(b.id)}
                    onMouseEnter={warm('battles', b.id)}
                    onFocus={warm('battles', b.id)}
                    className="flex-1"
                  >
                    <span className="block w-full py-3 border border-maroon text-maroon hover:bg-maroon hover:text-ivory transition-all rounded-lg text-sm font-bold uppercase tracking-widest">
                      {t('common.seeDetails')}
                    </span>
                  </button>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </section>
      )}

      {tab === 'warriors' && (
      <section id="warriors" className="max-w-7xl mx-auto px-4 pt-8 pb-16 bg-gradient-to-b from-transparent to-maroon/5" aria-labelledby="warriors-heading">
        <h2 id="warriors-heading" className="font-cinzel text-4xl text-maroon mb-8">
          {t('legends.title')}
        </h2>
        <p className="text-lg opacity-80 mb-12 max-w-3xl">{t('legends.intro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {figures.map((f) => {
            const card = localize(f);
            return (
            <article
              key={f.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-imperial-gold/20 flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-charcoal/10 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-cinzel text-2xl text-maroon mb-4">{card.name}</h3>
                <dl className="space-y-2 text-xs uppercase tracking-wider mb-2">
                  <div className="flex justify-between gap-4 opacity-70">
                    <dt>{t('battles.period')}</dt>
                    <dd className="font-bold text-right">{card.period}</dd>
                  </div>
                  <div className="flex justify-between gap-4 opacity-70">
                    <dt>{t('dynasties.kingdom')}</dt>
                    <dd className="font-bold text-imperial-gold text-right">{card.kingdom}</dd>
                  </div>
                </dl>
                <p className="text-sm text-charcoal/70 mt-4 line-clamp-2">{card.significance}</p>
                <div className="mt-auto pt-6 flex items-center gap-3">
                  <StoryLanguageToggle alt={isAlt(f.id)} onToggle={() => flip(f.id)} className="text-maroon shrink-0" />
                  <button
                    type="button"
                    onClick={() => setFigureId(f.id)}
                    onMouseEnter={warm('figures', f.id)}
                    onFocus={warm('figures', f.id)}
                    className="flex-1"
                  >
                    <span className="block w-full py-3 border border-maroon text-maroon hover:bg-maroon hover:text-ivory transition-all rounded-lg text-sm font-bold uppercase tracking-widest">
                      {t('common.seeDetails')}
                    </span>
                  </button>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </section>
      )}

      {battle && shownBattle && (
        <StoryModal
          id={`battle:${battle.id}`}
          title={shownBattle.name}
          subtitle={shownBattle.year}
          facts={[
            { label: t('battles.location'), value: shownBattle.location },
            { label: t('battles.rajputSide'), value: shownBattle.rajputSide },
            { label: t('battles.enemySide'), value: shownBattle.enemySide },
          ]}
          lists={[
            { label: t('common.significance'), items: shownBattle.significance },
            { label: t('battles.tactics'), items: shownBattle.tactics },
            { label: t('battles.casualties'), items: shownBattle.casualties },
          ]}
          notes={[{ label: t('battles.result'), text: shownBattle.result }]}
          story={battleStory.data?.story}
          loading={battleStory.loading}
          storyAlt={isAlt(battle.id)}
          onToggleLanguage={() => flip(battle.id)}
          onClose={() => setBattleId(null)}
        />
      )}

      {figure && shownFigure && (
        <StoryModal
          id={`figure:${figure.id}`}
          title={shownFigure.name}
          subtitle={shownFigure.period}
          facts={[
            { label: t('dynasties.kingdom'), value: shownFigure.kingdom },
            { label: t('common.significance'), value: shownFigure.significance },
          ]}
          lists={[{ label: t('battles.legendsList'), items: shownFigure.legends }]}
          story={figureStory.data?.story}
          chapters={figureStory.data?.chapters}
          loading={figureStory.loading}
          storyAlt={isAlt(figure.id)}
          onToggleLanguage={() => flip(figure.id)}
          onClose={() => setFigureId(null)}
        />
      )}
    </div>
  );
}
