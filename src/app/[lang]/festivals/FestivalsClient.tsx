'use client';

import { useLanguage } from '@/app/components/LanguageProvider';
import LazyImage from '@/app/components/LazyImage';
import PageHead from '@/app/components/PageHead';
import TransText from '@/app/components/TransText';
import StoryModal from '@/app/components/story/StoryModal';
import StoryLanguageToggle from '@/app/components/story/StoryLanguageToggle';
import { useCardLanguage } from '@/app/components/story/useCardLanguage';
import { ListenButton, useNarration } from '@/app/components/story/useNarration';
import { useQueryState } from '@/app/components/hooks/useQueryState';
import type { Festival, FestivalGroup } from '@/content/types';

const GROUPS: { id: FestivalGroup }[] = [
  { id: 'religious' },
  { id: 'cultural' },
  { id: 'commemoration' },
];

export default function FestivalsClient({ festivals }: { festivals: Festival[] }) {
  const { t } = useLanguage();
  const { toggle, isActive } = useNarration();
  const { isAlt, langFor, localize, toggle: flip } = useCardLanguage<Festival>('festivals', 'festivals');
  const [groupParam, setGroup] = useQueryState('group');
  const [openId, setOpenId] = useQueryState('festival');
  const group = GROUPS.find((g) => g.id === groupParam) ?? GROUPS[0];
  const visible = festivals.filter((f) => f.group === group.id);
  const open = festivals.find((f) => f.id === openId) ?? null;
  const openItem = open ? localize(open) : null;

  return (
    <main>
      <PageHead
        image="/images/festivals/gangaur-mela.jpg"
        breadcrumb={[
          { label: <TransText k="nav.home" />, href: '/' },
          { label: t('nav.festivals') },
        ]}
        eyebrow={t('festivals.subtitle')}
        title={t('festivals.title')}
        lead={t('festivals.description')}
      />

      <section className="section">
        <div className="container">
          <div
            className="sec-head__actions"
            role="tablist"
            aria-label={t('festivals.title')}
            style={{ marginBottom: 'var(--space-12)' }}
          >
            {GROUPS.map((g) => (
              <button
                key={g.id}
                type="button"
                role="tab"
                aria-selected={group.id === g.id}
                onClick={() => setGroup(g.id === 'religious' ? null : g.id)}
                className={group.id === g.id ? 'btn btn--primary' : 'btn btn--secondary'}
              >
                {t(`festivals.groups.${g.id}`)}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {visible.map((festival) => {
              const item = localize(festival);
              return (
                <article key={festival.id} className="card">
                  <div className="card__media">
                    <div className="arch">
                      <LazyImage
                        fill
                        sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        src={item.image}
                        alt={item.name}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="card__body">
                    <p className="eyebrow">{item.date}</p>
                    <h3 className="card__title">{item.name}</h3>
                    <p className="card__text clamp-3">{item.significance}</p>
                    <div className="flex items-center gap-3 pt-1">
                      <ListenButton
                        active={isActive(festival.id)}
                        onClick={() => toggle(festival.id, [item.name, item.significance, item.story].join('। '), langFor(festival.id))}
                        className="listen-btn"
                      />
                      <StoryLanguageToggle alt={isAlt(festival.id)} onToggle={() => flip(festival.id)} className="text-[var(--primary)]" />
                    </div>
                  </div>
                  <div className="card__foot">
                    <span className="chip chip--legend">{t('common.rajasthan')}</span>
                    <button type="button" onClick={() => setOpenId(festival.id)} className="btn btn--text">
                      {t('festivals.readMore')}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {open && openItem && (
        <StoryModal
          id={`festival:${open.id}`}
          title={openItem.name}
          facts={[
            { label: t('festivals.dateLabel'), value: openItem.date },
            { label: t('stories.regionLabel'), value: t('common.rajasthan') },
            { label: t('common.significance'), value: openItem.significance },
          ]}
          lists={[{ label: t('festivals.ritualsLabel'), items: openItem.rituals }]}
          notes={[{ label: t('concepts.culturalImpact'), text: openItem.description }]}
          story={openItem.story}
          storyAlt={isAlt(open.id)}
          onToggleLanguage={() => flip(open.id)}
          onClose={() => setOpenId(null)}
        />
      )}
    </main>
  );
}
