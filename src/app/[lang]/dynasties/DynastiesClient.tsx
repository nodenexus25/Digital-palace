'use client';

import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/app/components/LanguageProvider';
import Hero from '@/app/components/Hero';
import LazyImage from '@/app/components/LazyImage';
import StoryModal from '@/app/components/story/StoryModal';
import { useQueryState } from '@/app/components/hooks/useQueryState';
import { prefetchJson, rulerUrl, useRemoteJson } from '@/app/components/hooks/useRemoteContent';
import type { Dynasty, HistoricalPeriod, RulerDetail } from '@/content/types';

const FALLBACK_IMAGE = '/images/dynasties/gallery/kumbhalgarh-fort.jpg';

function Seal({ dynasty }: { dynasty: Dynasty }) {
  if (dynasty.seal) return <LazyImage src={dynasty.seal} alt={dynasty.name} className="w-full h-full object-contain p-0.5" />;
  const cls = 'w-full h-full text-maroon drop-shadow-sm';
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
  const { t, currentLanguage } = useLanguage();
  const [periodParam, setPeriod] = useQueryState('period');
  const [dynastyId, setDynastyId] = useQueryState('dynasty');
  const [rulerId, setRulerId] = useQueryState('ruler');
  const [search, setSearch] = useState('');
  const query = useDeferredValue(search.trim().toLocaleLowerCase());
  const period = periodParam ?? 'all';

  const visible = useMemo(
    () =>
      dynasties.filter(
        (d) =>
          (period === 'all' || d.period === period) &&
          (!query || [d.name, d.region, d.capital, d.founder].some((v) => v.toLocaleLowerCase().includes(query))),
      ),
    [dynasties, period, query],
  );
  const rulerCount = useMemo(() => dynasties.reduce((n, d) => n + d.rulers.length, 0), [dynasties]);

  const dynasty = dynasties.find((d) => d.id === dynastyId) ?? null;
  const rulerSummary = dynasty?.rulers.find((r) => r.id === rulerId) ?? null;
  const ruler = useRemoteJson<RulerDetail>(dynasty && rulerSummary ? rulerUrl(currentLanguage, dynasty.id, rulerSummary.id) : null);
  const warm = (dId: string, rId: string) => () => void prefetchJson(rulerUrl(currentLanguage, dId, rId)).catch(() => {});

  useEffect(() => {
    if (!dynasty || rulerSummary) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDynastyId(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [dynasty, rulerSummary, setDynastyId]);

  const detail = ruler.data;

  return (
    <div className="min-h-screen bg-ivory">
      <Hero title={t('dynasties.title')} subtitle={t('dynasties.subtitle')} description={t('dynasties.description')} />

      <div className="relative bg-[#2C1810] border-b-4 border-[#D4B483] -mt-1 pb-12">
        <div className="absolute inset-0 texture-mandala opacity-10 pointer-events-none" />
        <dl className="container mx-auto px-4 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
          {[
            [String(dynasties.length), 'dynasties.stats.dynasties'],
            [String(rulerCount), 'dynasties.stats.rulers'],
            ['1200+', 'dynasties.stats.yearsHistory'],
            [String(periods.length), 'dynasties.stats.periods'],
          ].map(([value, key]) => (
            <div key={key} className="bg-ivory/10 backdrop-blur-sm rounded-xl p-6 border border-gold/20 text-center flex flex-col-reverse">
              <dt className="text-sm font-cormorant text-ivory/80">{t(key)}</dt>
              <dd className="text-3xl font-bold text-gold mb-2 font-cinzel">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="py-12 bg-sandstone-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gold/20">
            <div className="text-center mb-8">
              <h2 className="font-cinzel font-bold text-2xl text-maroon mb-2">{t('dynasties.search.title')}</h2>
              <p className="font-cormorant text-charcoal/70">{t('dynasties.search.subtitle')}</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <label className="relative flex-1 max-w-md w-full">
                <span className="sr-only">{t('dynasties.search.placeholder')}</span>
                <input
                  type="search"
                  placeholder={t('dynasties.search.placeholder')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-saffron/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron bg-ivory font-cormorant text-charcoal placeholder-charcoal/50"
                />
              </label>
              <div className="flex-1">
                <p className="mb-3 font-cinzel font-semibold text-maroon text-sm">{t('dynasties.filters.periodLabel')}</p>
                <div className="flex gap-2 flex-wrap" role="tablist">
                  {[{ id: 'all', title: t('dynasties.filters.allPeriods'), range: '', description: '' }, ...periods].map((p) => (
                    <button
                      key={p.id}
                      role="tab"
                      aria-selected={period === p.id}
                      onClick={() => setPeriod(p.id === 'all' ? null : p.id)}
                      title={p.range ? `${p.range} — ${p.description}` : undefined}
                      className={`px-4 py-2 rounded-xl font-cinzel text-sm transition-all duration-300 ${
                        period === p.id
                          ? 'bg-saffron-gradient text-maroon shadow-lg scale-105'
                          : 'bg-ivory border-2 border-saffron/30 text-saffron hover:bg-saffron/10 hover:border-saffron'
                      }`}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-6 text-center font-cormorant text-charcoal/70" aria-live="polite">
              {t('dynasties.search.count', { count: visible.length })}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {visible.map((d) => (
            <article key={d.id} className="group relative bg-ivory border border-gold/30 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full">
              <div className="relative w-full aspect-[16/9] border-b border-gold/30 overflow-hidden">
                <LazyImage src={d.mainImage || FALLBACK_IMAGE} alt={d.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" fill placeholder={FALLBACK_IMAGE} />
              </div>
              <div className="p-4 pt-9 flex flex-col flex-grow text-center relative">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-ivory rounded-full p-2 border border-gold/40 shadow-lg flex items-center justify-center z-10">
                  <Seal dynasty={d} />
                </div>
                <h3 className="font-serif text-xl font-bold text-shehrawat-blood-red mb-1 leading-tight">{d.name}</h3>
                <blockquote className="mb-3 font-body text-base italic text-charcoal leading-snug min-h-[2.5rem] line-clamp-2 px-1">{d.significance}</blockquote>
                <dl className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-charcoal/90 mb-4 font-body font-medium">
                  <div><dt className="sr-only">{t('dynasties.region')}</dt><dd>{d.region}</dd></div>
                  <div><dt className="sr-only">{t('dynasties.capital')}</dt><dd>{d.capital}</dd></div>
                  <div><dt className="sr-only">{t('dynasties.founder')}</dt><dd>{d.founder}</dd></div>
                </dl>
                <button
                  type="button"
                  onClick={() => setDynastyId(d.id)}
                  className="mt-auto w-full border border-maroon text-maroon group-hover:bg-maroon group-hover:text-ivory font-serif font-bold py-1.5 px-3 transition-all duration-300 uppercase tracking-widest text-[10px]"
                >
                  {t('dynasties.cta.viewRulers')}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {dynasty && !rulerSummary && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDynastyId(null)}>
          <div role="dialog" aria-modal="true" aria-label={dynasty.name} onClick={(e) => e.stopPropagation()} className="bg-ivory rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <header className="saffron-gradient p-6 border-b border-saffron/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12"><Seal dynasty={dynasty} /></div>
                <h2 className="font-cinzel font-bold text-2xl text-maroon">{dynasty.name}</h2>
              </div>
              <button
                onClick={() => setDynastyId(null)}
                aria-label={t('dynasties.modal.backAria')}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-cinzel uppercase tracking-widest text-maroon hover:text-ivory border border-maroon/30 rounded-md hover:bg-maroon transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-current" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{t('dynasties.modal.back')}</span>
              </button>
            </header>
            <ul className="p-6 md:pr-14 overflow-y-auto max-h-[60vh] grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 pt-6">
              {dynasty.rulers.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => setRulerId(r.id)}
                    onMouseEnter={warm(dynasty.id, r.id)}
                    onFocus={warm(dynasty.id, r.id)}
                    className="group flex items-center justify-between w-full p-4 bg-white hover:bg-saffron/5 rounded-lg transition-all duration-300 border border-saffron/30 hover:border-saffron shadow-sm hover:shadow-md overflow-hidden h-32 text-left"
                  >
                    <span className="w-[70%] pr-4 h-full flex flex-col justify-center border-r border-saffron/10">
                      <span className="font-cinzel font-bold text-maroon text-lg truncate">{r.name}</span>
                      <span className="text-xs text-charcoal font-medium mt-1">{r.period}</span>
                      <span className="text-xs text-charcoal/70 mt-1 line-clamp-1">{r.title}</span>
                    </span>
                    <span className="w-[30%] flex justify-center items-center pl-2 h-full">
                      <span className="relative w-20 h-20 shrink-0 rounded-full border-[3px] border-double border-[#D4AF37] bg-[#F5E6D3] flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
                        {r.image ? (
                          <LazyImage src={r.image} alt={r.name} className="w-full h-full object-cover sepia-[0.2] contrast-110" fill />
                        ) : (
                          <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37] bg-[#2C1810] p-3" fill="currentColor" aria-hidden="true">
                            <path d="M50 20 L58 40 L80 40 L62 55 L68 75 L50 62 L32 75 L38 55 L20 40 L42 40 Z" />
                          </svg>
                        )}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {dynasty && rulerSummary && (
        <StoryModal
          id={`ruler:${rulerSummary.id}`}
          title={rulerSummary.name}
          subtitle={rulerSummary.title}
          facts={[
            { label: t('dynasties.period'), value: rulerSummary.period },
            { label: t('dynasties.kingdom'), value: dynasty.name },
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
          onClose={() => setRulerId(null)}
        />
      )}
    </div>
  );
}
