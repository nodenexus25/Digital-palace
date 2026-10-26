'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/app/components/LanguageProvider';
import PageHead from '@/app/components/PageHead';
import SectionHeading from '@/app/components/SectionHeading';
import TransText from '@/app/components/TransText';
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
    <div className="min-h-screen">
      <PageHead
        breadcrumb={[
          { label: <TransText k="nav.home" />, href: '/' },
          { label: <TransText k="nav.battles" /> },
        ]}
        title={<TransText k="battles.meta.title" />}
        lead={<TransText k="battles.meta.description" />}
      />

      <section className="section section--tint">
        <div className="container">
          <SectionHeading
            title={tab === 'battles' ? <TransText k="battles.title" /> : <TransText k="legends.title" />}
            lead={tab === 'battles' ? <TransText k="battles.intro" /> : <TransText k="legends.intro" />}
            action={
              <div role="tablist" aria-label={t('battles.meta.title')} className="sec-head__actions">
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === 'battles'}
                  onClick={() => setTab('battles')}
                  className={`btn ${tab === 'battles' ? 'btn--primary' : 'btn--secondary'}`}
                >
                  {t('nav.battles')}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === 'warriors'}
                  onClick={() => setTab('warriors')}
                  className={`btn ${tab === 'warriors' ? 'btn--primary' : 'btn--secondary'}`}
                >
                  {t('battles.warriors')}
                </button>
              </div>
            }
          />

          {tab === 'battles' ? (
            <div className="grid-2">
              {battles.map((b) => {
                const card = localize(b);
                return (
                  <article key={b.id} className="card battle-card">
                    <div>
                      <div className="battle-card__year">{card.year}</div>
                      <span className="battle-card__place">{card.location}</span>
                    </div>
                    <div>
                      <h3 className="battle-card__title">{card.name}</h3>
                      <dl className="battle-card__facts">
                        <div>
                          <dt>{t('battles.location')}</dt>
                          <dd>{card.location}</dd>
                        </div>
                        <div>
                          <dt>{t('battles.result')}</dt>
                          <dd>{card.result}</dd>
                        </div>
                      </dl>
                      <p className="card__text clamp-3" style={{ margin: '14px 0 0' }}>{card.significance[0]}</p>
                      <div className="battle-card__foot">
                        <StoryLanguageToggle alt={isAlt(b.id)} onToggle={() => flip(b.id)} />
                        <button
                          type="button"
                          onClick={() => setBattleId(b.id)}
                          onMouseEnter={warm('battles', b.id)}
                          onFocus={warm('battles', b.id)}
                          className="btn btn--secondary"
                        >
                          {t('common.seeDetails')}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div id="warriors" className="grid-3 scroll-mt-32">
              {figures.map((f) => {
                const card = localize(f);
                return (
                  <article key={f.id} className="card">
                    <div className="card__media">
                      <div className="arch arch--tall">
                        <Image
                          src={card.image}
                          alt={card.name}
                          fill
                          sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="card__body">
                      <h3 className="card__title">{card.name}</h3>
                      <dl className="battle-card__facts" style={{ margin: 0 }}>
                        <div>
                          <dt>{t('battles.period')}</dt>
                          <dd>{card.period}</dd>
                        </div>
                        <div>
                          <dt>{t('dynasties.kingdom')}</dt>
                          <dd>{card.kingdom}</dd>
                        </div>
                      </dl>
                      <p className="card__text clamp-2">{card.significance}</p>
                      <div className="card__foot">
                        <StoryLanguageToggle alt={isAlt(f.id)} onToggle={() => flip(f.id)} />
                        <button
                          type="button"
                          onClick={() => setFigureId(f.id)}
                          onMouseEnter={warm('figures', f.id)}
                          onFocus={warm('figures', f.id)}
                          className="btn btn--secondary"
                        >
                          {t('common.seeDetails')}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

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
