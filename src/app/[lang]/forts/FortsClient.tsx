"use client";

import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import MediaGallery from '@/app/components/MediaGallery';
import { DynastySeal } from '@/app/components/DynastySeals';
import OptimizedImage from '@/app/components/OptimizedImage';
import PageHead from '@/app/components/PageHead';
import TransText from '@/app/components/TransText';
import { useLanguage } from '@/app/components/LanguageProvider';
import StoryText, { toSpeech } from '@/app/components/story/StoryText';
import StoryLanguageToggle from '@/app/components/story/StoryLanguageToggle';
import { useCardLanguage } from '@/app/components/story/useCardLanguage';
import { ListenButton, useNarration } from '@/app/components/story/useNarration';
import { useQueryState } from '@/app/components/hooks/useQueryState';
import { prefetchJson, storyUrl, useRemoteJson } from '@/app/components/hooks/useRemoteContent';
import type { FortCard, FortStory, FortStoryTag } from '@/content/types';

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
  const { t } = useLanguage();
  const { toggle, isActive, stop } = useNarration();
  const { isAlt, langFor, localize, toggle: flip } = useCardLanguage<FortCard>('forts', 'forts');
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
  const shown = open ? localize(open) : null;
  const detail = useRemoteJson<{ stories?: FortStory[]; story?: string }>(open ? storyUrl(langFor(open.id), 'forts', open.id) : null);
  const warm = (id: string) => () => void prefetchJson(storyUrl(langFor(id), 'forts', id)).catch(() => {});

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
    : shown && detail.data
      ? [{ tag: 'history', title: t('forts.modal.foundingChronicle', { name: shown.name }), story: [shown.description, detail.data.story].filter(Boolean).join('\n\n') }]
      : [];

  return (
    <div className="min-h-screen">
      <PageHead
        breadcrumb={[
          { label: <TransText k="nav.home" />, href: '/' },
          { label: <TransText k="nav.forts" /> },
        ]}
        title={<TransText k="forts.title" />}
        lead={<TransText k="forts.subtitle" />}
      />

      <div className="sticky top-20 z-40 bg-[var(--sand)]" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="container py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <label className="relative flex-1 max-w-md w-full">
            <span className="sr-only">{t('forts.search.placeholder')}</span>
            <input
              type="search"
              placeholder={t('forts.search.placeholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-12"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[color:var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </label>
          <div className="sec-head__actions" role="tablist" aria-label={t('forts.title')}>
            {(['all', 'fort', 'palace'] as const).map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(c === 'all' ? null : c)}
                className={`btn ${category === c ? 'btn--primary' : 'btn--secondary'}`}
              >
                {t(c === 'all' ? 'forts.filters.all' : c === 'fort' ? 'forts.filters.forts' : 'forts.filters.palaces')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section section--tint">
        <div className="container">
          {visible.length === 0 ? (
            <div className="text-center">
              <h3 className="card__title">{t('forts.noResults.title')}</h3>
              <p className="lead" style={{ margin: '10px auto 0' }}>{t('forts.noResults.body')}</p>
            </div>
          ) : (
            <div className="grid-3">
              {visible.map((fort) => {
                const card = localize(fort);
                return (
                  <article key={fort.id} onMouseEnter={warm(fort.id)} className="card">
                    <div className="card__media">
                      <div className="arch">
                        {card.images[0] ? (
                          <OptimizedImage
                            src={card.images[0].src}
                            alt={card.images[0].alt}
                            className="object-cover"
                            strategy="CONTENT"
                            responsive
                            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                            width={800}
                            height={600}
                          />
                        ) : null}
                      </div>
                    </div>

                    <div className="card__body">
                      <div className="flex items-center gap-3">
                        <span className="icon-tile" title={clanLabel(card.clan)}>
                          <DynastySeal dynasty={card.clan} color={CLAN_COLORS[card.clan] ?? CLAN_COLORS.Royal} />
                        </span>
                        <span className="chip">
                          {t(card.category === 'fort' ? 'forts.filters.forts' : 'forts.filters.palaces')}
                        </span>
                      </div>
                      <h3 className="card__title">{card.name}</h3>
                      <p className="card__text clamp-3">{card.description}</p>
                      <dl className="battle-card__facts">
                        <div>
                          <dt>{t('forts.location')}</dt>
                          <dd>{card.location.split(/[,،]/)[0]}</dd>
                        </div>
                        <div>
                          <dt>{t('forts.modal.period')}</dt>
                          <dd>{card.period}</dd>
                        </div>
                      </dl>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <ListenButton
                          active={isActive(fort.id)}
                          onClick={() => toggle(fort.id, overview(card), langFor(fort.id))}
                          className="listen-btn"
                        />
                        <div className="flex items-center gap-2">
                          <StoryLanguageToggle alt={isAlt(fort.id)} onToggle={() => flip(fort.id)} className="text-[color:var(--primary)]" />
                          <button
                            type="button"
                            onClick={() => setOpenId(fort.id)}
                            onFocus={warm(fort.id)}
                            className="btn btn--secondary"
                          >
                            {t('common.seeDetails')}
                          </button>
                        </div>
                      </div>
                      <div className="card__foot">
                        <span className="truncate">{card.builtBy}</span>
                        <span className={`chip ${card.standing ? 'chip--win' : 'chip--loss'}`}>{card.status}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {open && shown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--deep)]/70 backdrop-blur-sm" onClick={close}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={shown.name}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-[var(--raised)] shadow-2xl"
            style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius-xl)' }}
          >
            <header
              className="sticky top-0 z-30 bg-[var(--raised)] p-4 sm:p-6 flex items-center justify-between gap-4"
              style={{ borderBottom: '1px solid var(--line)' }}
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <span className="icon-tile icon-tile--lg shrink-0">
                  <DynastySeal dynasty={shown.clan} color={CLAN_COLORS[shown.clan] ?? CLAN_COLORS.Royal} />
                </span>
                <div className="min-w-0">
                  <h2 className="truncate">{shown.name}</h2>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="chip chip--legend">{clanLabel(shown.clan)}</span>
                    <StoryLanguageToggle alt={isAlt(open.id)} onToggle={() => flip(open.id)} className="text-[color:var(--primary)]" />
                    <ListenButton
                      iconOnly
                      active={isActive(`${open.id}:overview`)}
                      onClick={() => toggle(`${open.id}:overview`, overview(shown), langFor(open.id))}
                      className="listen-btn"
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={t('common.close')}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--raised)] text-[var(--ink)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>

            <div className="p-4 sm:p-6 md:p-8">
              <div className="article-layout">
                <div className="article-col">
                  <h3 style={{ margin: '0 0 20px' }}>{t('forts.modal.visualGallery')}</h3>
                  <MediaGallery images={shown.images} videos={shown.videos} fallbackAlt={shown.name} />

                  <h3 style={{ margin: '48px 0 8px' }}>{t('forts.modal.fortStories')}</h3>
                  <p className="lead" style={{ marginBottom: 24 }}>{t('forts.modal.fortStoriesOf', { name: shown.name })}</p>

                  {detail.loading ? (
                    <div className="space-y-3 animate-pulse" aria-busy="true" aria-label={t('common.loading')}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-4 rounded bg-[var(--tint)]" />
                      ))}
                    </div>
                  ) : (
                    <ol className="flex flex-col gap-4" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {stories.map((story, index) => {
                        const id = `${open.id}:story:${index}`;
                        return (
                          <li
                            key={id}
                            className="bg-[var(--surface)] p-5"
                            style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)' }}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="icon-tile" aria-hidden="true">{index + 1}</span>
                                <h4>{story.title}</h4>
                                <ListenButton
                                  iconOnly
                                  active={isActive(id)}
                                  onClick={() => toggle(id, toSpeech(story.title, story.story), langFor(open.id))}
                                  className="listen-btn"
                                />
                              </div>
                              <span className="chip chip--legend">{t(TAG_KEYS[story.tag])}</span>
                            </div>
                            <StoryText text={story.story} />
                          </li>
                        );
                      })}
                    </ol>
                  )}
                </div>

                <aside className="flex flex-col gap-6">
                  <div className="factbox">
                    <p className="eyebrow"><TransText k="common.atAGlance" /></p>
                    <dl>
                      <dt>{t('forts.modal.builtBy')}</dt>
                      <dd>{shown.builtBy}</dd>
                      <dt>{t('forts.modal.period')}</dt>
                      <dd>{shown.period}</dd>
                      <dt>{t('forts.modal.location')}</dt>
                      <dd>{shown.location}</dd>
                    </dl>
                  </div>

                  <div className="factbox">
                    <p className="eyebrow">{t('forts.modal.travelInfo')}</p>
                    <dl>
                      <dt>{t('forts.modal.timings')}</dt>
                      <dd>{shown.visitingHours || t('forts.modal.defaultTimings')}</dd>
                      <dt>{t('forts.modal.entryFee')}</dt>
                      <dd>{shown.entryFee || t('forts.modal.seeDetails')}</dd>
                      <dt>{t('forts.modal.nearestCity')}</dt>
                      <dd>{shown.location.split(/[,،]/)[0]}</dd>
                    </dl>
                  </div>

                  <div className="legend-box">
                    <p style={{ margin: 0 }}>{t('forts.modal.quote', { name: shown.name })}</p>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
