'use client';

import { useEffect, useMemo } from 'react';
import { useLanguage } from '@/app/components/LanguageProvider';
import LazyImage from '@/app/components/LazyImage';
import PageHead from '@/app/components/PageHead';
import TransText from '@/app/components/TransText';
import StoryModal from '@/app/components/story/StoryModal';
import StoryLanguageToggle from '@/app/components/story/StoryLanguageToggle';
import { useCardLanguage } from '@/app/components/story/useCardLanguage';
import { useQueryState } from '@/app/components/hooks/useQueryState';
import { prefetchJson, rulerUrl, useRemoteJson } from '@/app/components/hooks/useRemoteContent';
import type { Dynasty, HistoricalPeriod, RulerDetail } from '@/content/types';

const FALLBACK_IMAGE = '/images/dynasties/gallery/kumbhalgarh-fort.jpg';

function Seal({ dynasty }: { dynasty: Dynasty }) {
  if (dynasty.seal) return <LazyImage src={dynasty.seal} alt={dynasty.name} className="w-full h-full object-contain p-0.5" width={200} height={200} sizes="56px" />;
  const cls = 'w-full h-full text-[color:var(--primary)] drop-shadow-sm';
  if (/mewar|amber|kachwaha/.test(dynasty.id)) {
    return (
      <svg viewBox="0 0 100 100" className={cls} fill="currentColor" aria-hidden="true">
        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="4" fill="none" />
        <circle cx="50" cy="50" r="12" opacity="0.6" />
        <path d="M50 10 L50 25 M50 90 L50 75 M10 50 L25 50 M90 50 L75 50 M22 22 L32 32 M78 78 L68 68 M22 78 L32 68 M78 22 L68 32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }
  if (/marwar|bikaner|rathore/.test(dynasty.id)) {
    return (
      <svg viewBox="0 0 100 100" className={cls} fill="currentColor" aria-hidden="true">
        <path d="M15 45 C 30 25, 45 35, 50 50 C 55 35, 70 25, 85 45 C 75 60, 50 85, 50 85 C 50 85, 25 60, 15 45 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="50" cy="45" r="10" />
      </svg>
    );
  }
  if (/jaisalmer|bhati|tomar/.test(dynasty.id)) {
    return (
      <svg viewBox="0 0 100 100" className={cls} fill="currentColor" aria-hidden="true">
        <path d="M35 25 A 35 35 0 1 0 75 75 A 25 25 0 1 1 35 25" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className={cls} fill="currentColor" aria-hidden="true">
      <path d="M20 75 L80 75 L70 90 L30 90 Z" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M30 70 Q 30 40 50 15 Q 70 40 70 70" opacity="0.8" />
    </svg>
  );
}

export default function DynastiesClient({ dynasties, periods }: { dynasties: Dynasty[]; periods: HistoricalPeriod[] }) {
  const { t } = useLanguage();
  const { isAlt, langFor, localize, toggle: flip } = useCardLanguage<Dynasty>('dynasties', 'dynasties');
  const [dynastyId, setDynastyId] = useQueryState('dynasty');
  const [rulerId, setRulerId] = useQueryState('ruler');
  const rulerCount = useMemo(() => dynasties.reduce((n, d) => n + d.rulers.length, 0), [dynasties]);

  const dynasty = dynasties.find((d) => d.id === dynastyId) ?? null;
  const shownDynasty = dynasty ? localize(dynasty) : null;
  const rulerSummary = shownDynasty?.rulers.find((r) => r.id === rulerId) ?? null;
  const ruler = useRemoteJson<RulerDetail>(dynasty && rulerSummary ? rulerUrl(langFor(dynasty.id), dynasty.id, rulerSummary.id) : null);
  const warm = (dId: string, rId: string) => () => void prefetchJson(rulerUrl(langFor(dId), dId, rId)).catch(() => {});

  useEffect(() => {
    if (!dynasty || rulerSummary) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDynastyId(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [dynasty, rulerSummary, setDynastyId]);

  const detail = ruler.data;

  return (
    <div className="min-h-screen">
      <PageHead
        image="/images/legends/rajputana-clan-banners.jpg"
        breadcrumb={[
          { label: <TransText k="nav.home" />, href: '/' },
          { label: <TransText k="nav.dynasties" /> },
        ]}
        title={<TransText k="dynasties.title" />}
        lead={<TransText k="dynasties.subtitle" />}
      />

      <div className="section--maroon py-12">
        <dl className="container grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            [String(dynasties.length), 'dynasties.stats.dynasties'],
            [String(rulerCount), 'dynasties.stats.rulers'],
            ['1200+', 'dynasties.stats.yearsHistory'],
            [String(periods.length), 'dynasties.stats.periods'],
          ].map(([value, key]) => (
            <div key={key} className="bg-[var(--maroon-panel)] border border-[var(--maroon-line)] rounded-[var(--radius-lg)] p-5 text-center flex flex-col-reverse gap-1">
              <dt className="text-[color:var(--lead-on-maroon)]">{t(key)}</dt>
              <dd className="card__title text-[color:var(--gold-deep)]" style={{ margin: 0 }}>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="section section--tint">
        <div className="container">
          <div className="grid-3">
            {dynasties.map((d) => {
              const card = localize(d);
              return (
                <article key={d.id} className="card">
                  <div className="card__media">
                    <div className="arch">
                      <LazyImage
                        src={card.mainImage || FALLBACK_IMAGE}
                        alt={card.name}
                        className="object-cover"
                        fill
                        sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        placeholder={FALLBACK_IMAGE}
                      />
                    </div>
                  </div>
                  <div className="card__body">
                    <div className="flex items-center gap-3">
                      <span className="icon-tile shrink-0">
                        <Seal dynasty={card} />
                      </span>
                      <p className="eyebrow" style={{ margin: 0 }}>{card.region}</p>
                    </div>
                    <h3 className="card__title">{card.name}</h3>
                    <p className="card__text clamp-2">{card.significance}</p>
                    <dl className="battle-card__facts">
                      <div>
                        <dt>{t('dynasties.capital')}</dt>
                        <dd>{card.capital}</dd>
                      </div>
                      <div>
                        <dt>{t('dynasties.founder')}</dt>
                        <dd>{card.founder}</dd>
                      </div>
                    </dl>
                    <div className="card__foot">
                      <StoryLanguageToggle alt={isAlt(d.id)} onToggle={() => flip(d.id)} className="text-[color:var(--primary)]" />
                      <button type="button" onClick={() => setDynastyId(d.id)} className="btn btn--secondary">
                        {t('dynasties.cta.viewRulers')}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {shownDynasty && !rulerSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--deep)]/60 backdrop-blur-sm" onClick={() => setDynastyId(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={shownDynasty.name}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[80vh] overflow-hidden bg-[var(--raised)] shadow-2xl"
            style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius-xl)' }}
          >
            <header
              className="p-4 sm:p-6 flex flex-wrap items-center justify-between gap-3"
              style={{ borderBottom: '1px solid var(--line)' }}
            >
              <div className="flex flex-wrap items-center gap-3 min-w-0">
                <span className="icon-tile shrink-0">
                  <Seal dynasty={shownDynasty} />
                </span>
                <h2 className="truncate">{shownDynasty.name}</h2>
                <StoryLanguageToggle alt={isAlt(shownDynasty.id)} onToggle={() => flip(shownDynasty.id)} className="text-[color:var(--primary)]" />
              </div>
              <button type="button" onClick={() => setDynastyId(null)} aria-label={t('dynasties.modal.backAria')} className="btn btn--secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-current" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{t('dynasties.modal.back')}</span>
              </button>
            </header>
            <ul className="p-4 sm:p-6 overflow-y-auto max-h-[60vh] grid grid-cols-1 md:grid-cols-2 gap-4" style={{ listStyle: 'none', margin: 0 }}>
              {shownDynasty.rulers.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => setRulerId(r.id)}
                    onMouseEnter={warm(shownDynasty.id, r.id)}
                    onFocus={warm(shownDynasty.id, r.id)}
                    className="card w-full text-left cursor-pointer gap-4 p-4"
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <span className="min-w-0 flex-1 flex flex-col gap-1">
                      <span className="card__title block truncate">{r.name}</span>
                      <span className="block text-sm text-[color:var(--muted)]">{r.period}</span>
                      <span className="block text-sm text-[color:var(--muted)] truncate">{r.title}</span>
                    </span>
                    <span
                      className="inline-flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--surface)]"
                      style={{ border: '2px solid var(--gold-deep)' }}
                    >
                      {r.image ? (
                        <LazyImage src={r.image} alt={r.name} className="h-full w-full object-cover" />
                      ) : (
                        <svg viewBox="0 0 100 100" className="w-full h-full text-[color:var(--gold-deep)] p-3" fill="currentColor" aria-hidden="true">
                          <path d="M50 20 L58 40 L80 40 L62 55 L68 75 L50 62 L32 75 L38 55 L20 40 L42 40 Z" />
                        </svg>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {shownDynasty && rulerSummary && (
        <StoryModal
          id={`ruler:${rulerSummary.id}`}
          title={rulerSummary.name}
          subtitle={rulerSummary.title}
          facts={[
            { label: t('dynasties.period'), value: rulerSummary.period },
            { label: t('dynasties.kingdom'), value: shownDynasty.name },
            { label: t('common.significance'), value: detail?.significance },
          ]}
          lists={[
            { label: t('dynasties.modal.battles'), items: detail?.battles ?? [] },
            { label: t('dynasties.modal.heroicDeeds'), items: detail?.heroicDeeds ?? [] },
            { label: t('concepts.culturalImpact'), items: detail?.culturalContributions ?? [] },
          ]}
          notes={[
            { label: t('dynasties.modal.ancestry'), text: detail?.ancestry },
            { label: t('dynasties.modal.legacy'), text: detail?.legacy },
          ]}
          images={detail?.gallery}
          story={detail?.story}
          loading={ruler.loading}
          storyAlt={isAlt(shownDynasty.id)}
          onToggleLanguage={() => flip(shownDynasty.id)}
          onClose={() => setRulerId(null)}
        />
      )}
    </div>
  );
}
