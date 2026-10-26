"use client";

import LazyImage from '@/app/components/LazyImage';
import { useLanguage } from '@/app/components/LanguageProvider';
import PageHead from '@/app/components/PageHead';
import SectionHeading from '@/app/components/SectionHeading';
import TransText from '@/app/components/TransText';
import StoryModal from '@/app/components/story/StoryModal';
import StoryLanguageToggle from '@/app/components/story/StoryLanguageToggle';
import { useCardLanguage } from '@/app/components/story/useCardLanguage';
import { ListenButton, useNarration } from '@/app/components/story/useNarration';
import { useQueryState } from '@/app/components/hooks/useQueryState';
import { prefetchJson, storyUrl, useRemoteJson } from '@/app/components/hooks/useRemoteContent';
import type { LegendCard } from '@/content/types';

export default function LegendsClient({ legends }: { legends: LegendCard[] }) {
  const { t } = useLanguage();
  const [openId, setOpenId] = useQueryState('legend');
  const { toggle, isActive } = useNarration();
  const { isAlt, langFor, localize, toggle: flip } = useCardLanguage<LegendCard>('legends', 'legends');
  const open = legends.find((l) => l.id === openId) ?? null;
  const openCard = open ? localize(open) : null;
  const story = useRemoteJson<{ story?: string }>(open ? storyUrl(langFor(open.id), 'legends', open.id) : null);
  const warm = (id: string) => () => void prefetchJson(storyUrl(langFor(id), 'legends', id)).catch(() => {});

  const listen = async (legend: LegendCard) => {
    const locale = langFor(legend.id);
    if (isActive(legend.id)) return toggle(legend.id, '');
    const data = (await prefetchJson(storyUrl(locale, 'legends', legend.id)).catch(() => null)) as { story?: string } | null;
    toggle(legend.id, [legend.title, legend.hook, data?.story].filter(Boolean).join('\n\n'), locale);
  };

  return (
    <main>
      <PageHead
        image="/images/legends/kesari-oath-courtyard.jpg"
        breadcrumb={[
          { label: <TransText k="nav.home" />, href: '/' },
          { label: t('nav.stories') },
        ]}
        eyebrow={t('legends.hero.chip')}
        title={t('legends.title')}
        lead={t('legends.hero.description')}
        action={
          <>
            <span className="chip">{t('legends.tags.steel')}</span>
            <span className="chip">{t('legends.tags.smoke')}</span>
            <span className="chip">{t('legends.tags.sacrifice')}</span>
            <span className="chip">{t('legends.tags.glory')}</span>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="feature feature--indigo" style={{ marginBottom: 'var(--space-12)' }}>
            <p className="eyebrow" style={{ color: 'var(--gold-deep)' }}>{t('legends.hero.sidebar.title')}</p>
            <p className="feature__lead">{t('legends.hero.sidebar.body1')}</p>
            <p>{t('legends.hero.sidebar.body2')}</p>
            <p className="eyebrow" style={{ color: 'var(--gold-deep)', margin: 0 }}>{t('legends.hero.sidebar.meta')}</p>
          </div>

          <SectionHeading
            eyebrow={t('legends.section.preheader')}
            title={t('legends.section.title')}
            lead={t('legends.section.description')}
          />

          <div className="grid-3">
            {legends.map((legend) => {
              const card = localize(legend);
              return (
                <article key={legend.id} onMouseEnter={warm(legend.id)} className="card">
                  <div className="card__media">
                    <div className="arch arch--tall">
                      <LazyImage
                        fill
                        sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        src={card.cover.src}
                        alt={card.cover.alt}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="card__body">
                    <p className="eyebrow">{card.category}</p>
                    <h3 className="card__title">{card.title}</h3>
                    <p className="card__text clamp-3">{card.hook}</p>
                    <div className="flex items-center gap-3 pt-1">
                      <ListenButton
                        active={isActive(legend.id)}
                        onClick={() => void listen(card)}
                        className="listen-btn"
                      />
                      <StoryLanguageToggle
                        alt={isAlt(legend.id)}
                        onToggle={() => flip(legend.id)}
                        className="text-[var(--primary)]"
                      />
                    </div>
                  </div>
                  <div className="card__foot">
                    <span>{card.era}</span>
                    <button
                      type="button"
                      onClick={() => setOpenId(legend.id)}
                      onFocus={warm(legend.id)}
                      className="btn btn--text"
                    >
                      {t('legends.item.cta')}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {open && openCard && (
        <StoryModal
          id={`legend:${open.id}`}
          title={openCard.title}
          subtitle={openCard.hook}
          facts={[
            { label: t('legends.categoryLabel'), value: openCard.category },
            { label: t('dynasties.period'), value: openCard.era },
            { label: t('stories.regionLabel'), value: openCard.location },
          ]}
          images={[openCard.cover, ...openCard.gallery]}
          videos={openCard.videos}
          story={story.data?.story}
          loading={story.loading}
          storyAlt={isAlt(open.id)}
          onToggleLanguage={() => flip(open.id)}
          onClose={() => setOpenId(null)}
        />
      )}
    </main>
  );
}
