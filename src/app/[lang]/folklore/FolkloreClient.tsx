'use client';

import type { ReactNode } from 'react';
import { useLanguage } from '@/app/components/LanguageProvider';
import PageHead from '@/app/components/PageHead';
import TransText from '@/app/components/TransText';
import StoryModal from '@/app/components/story/StoryModal';
import StoryLanguageToggle from '@/app/components/story/StoryLanguageToggle';
import { useCardLanguage } from '@/app/components/story/useCardLanguage';
import { ListenButton, useNarration } from '@/app/components/story/useNarration';
import { useQueryState } from '@/app/components/hooks/useQueryState';
import { prefetchJson, storyUrl, useRemoteJson } from '@/app/components/hooks/useRemoteContent';
import type { DeityCard, RitualCard, TaleCard } from '@/content/types';

type Tale = TaleCard;
type Deity = DeityCard;
type Ritual = RitualCard;
type FolkItem = Tale | Deity | Ritual;
type Section = 'tales' | 'deities' | 'rituals';

const TABS: { id: Section; key: string }[] = [
  { id: 'tales', key: 'folklore.tabs.epics' },
  { id: 'deities', key: 'folklore.tabs.deities' },
  { id: 'rituals', key: 'folklore.tabs.rituals' },
];

export default function FolkloreClient({ tales, deities, rituals }: { tales: Tale[]; deities: Deity[]; rituals: Ritual[] }) {
  const { t } = useLanguage();
  const [sectionParam, setSection] = useQueryState('section');
  const [openId, setOpenId] = useQueryState('item');
  const { toggle, isActive } = useNarration();
  const section: Section = sectionParam === 'deities' || sectionParam === 'rituals' ? sectionParam : 'tales';
  const { isAlt, langFor, localize, toggle: flip } = useCardLanguage<FolkItem>(section, section);

  const items = { tales, deities, rituals }[section] as FolkItem[];
  const open = items.find((i) => i.id === openId) ?? null;
  const openItem = open ? localize(open) : null;
  const story = useRemoteJson<{ story?: string }>(open ? storyUrl(langFor(open.id), section, open.id) : null);
  const warm = (id: string) => () => void prefetchJson(storyUrl(langFor(id), section, id)).catch(() => {});

  // Narrating from a card reads the full story, fetched on demand.
  const listen = async (id: string, intro: string) => {
    const key = `${section}:${id}`;
    const locale = langFor(id);
    if (isActive(key)) return toggle(key, '');
    const data = (await prefetchJson(storyUrl(locale, section, id)).catch(() => null)) as { story?: string } | null;
    toggle(key, [intro, data?.story].filter(Boolean).join('\n\n'), locale);
  };

  const card = (id: string, intro: string, meta: ReactNode, children: ReactNode) => (
    <article key={id} className="card" onMouseEnter={warm(id)}>
      <div className="card__body">
        {children}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <ListenButton
            active={isActive(`${section}:${id}`)}
            onClick={() => void listen(id, intro)}
            className="listen-btn"
          />
          <StoryLanguageToggle alt={isAlt(id)} onToggle={() => flip(id)} className="text-[var(--primary)]" />
        </div>
      </div>
      <div className="card__foot">
        {meta}
        <button type="button" onClick={() => setOpenId(id)} onFocus={warm(id)} className="btn btn--text">
          {t('common.readMore')}
        </button>
      </div>
    </article>
  );

  return (
    <main>
      <PageHead
        image="/images/legends/padmini-lake-pavilion.jpg"
        breadcrumb={[
          { label: <TransText k="nav.home" />, href: '/' },
          { label: t('nav.folklore') },
        ]}
        eyebrow={t('folklore.subtitle')}
        title={t('folklore.title')}
        lead={t('folklore.description')}
      />

      <section className="section scroll-mt-24" id="rituals">
        <div className="container">
          <div
            className="sec-head__actions"
            role="tablist"
            aria-label={t('folklore.title')}
            style={{ marginBottom: 'var(--space-12)' }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={section === tab.id}
                onClick={() => setSection(tab.id === 'tales' ? null : tab.id)}
                className={section === tab.id ? 'btn btn--primary' : 'btn btn--secondary'}
              >
                {t(tab.key)}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {section === 'tales' &&
              tales.map((tale) => {
                const item = localize(tale);
                return card(
                  item.id,
                  `${item.name}. ${item.significance}`,
                  <span>{item.type}</span>,
                  <>
                    <h3 className="card__title">{item.name}</h3>
                    <dl className="text-sm text-[var(--muted)]" style={{ display: 'grid', gap: 4 }}>
                      <div><dt className="inline font-semibold">{t('folklore.authorLabel')}</dt> <dd className="inline">{item.author}</dd></div>
                      <div><dt className="inline font-semibold">{t('folklore.periodLabel')}</dt> <dd className="inline">{item.period}</dd></div>
                      <div><dt className="inline font-semibold">{t('folklore.typeLabel')}</dt> <dd className="inline">{item.type}</dd></div>
                    </dl>
                    <div className="legend-box">
                      <span className="chip chip--legend">{t('concepts.legend')}</span>
                      <ul className="flex flex-wrap gap-2">
                        {item.themes.map((theme, i) => (
                          <li key={i} className="chip">{theme}</li>
                        ))}
                      </ul>
                    </div>
                  </>,
                );
              })}

            {section === 'deities' &&
              deities.map((deity) => {
                const item = localize(deity);
                return card(
                  item.id,
                  `${item.name}. ${item.significance}`,
                  <span>{item.region}</span>,
                  <>
                    <h3 className="card__title">{item.name}</h3>
                    <dl className="text-sm text-[var(--muted)]" style={{ display: 'grid', gap: 4 }}>
                      <div><dt className="inline font-semibold">{t('folklore.periodLabel')}</dt> <dd className="inline">{item.period}</dd></div>
                      <div><dt className="inline font-semibold">{t('stories.regionLabel')}</dt> <dd className="inline">{item.region}</dd></div>
                      <div><dt className="inline font-semibold">{t('forts.significance')}</dt> <dd className="inline">{item.significance}</dd></div>
                    </dl>
                    <div className="legend-box">
                      <span className="chip chip--legend">{t('concepts.legend')}</span>
                      <ul className="flex flex-wrap gap-2">
                        {item.legends.slice(0, 2).map((legend, i) => (
                          <li key={i} className="chip">{legend}</li>
                        ))}
                      </ul>
                    </div>
                  </>,
                );
              })}

            {section === 'rituals' &&
              rituals.map((ritual) => {
                const item = localize(ritual);
                return card(
                  item.id,
                  `${item.name}. ${item.significance}`,
                  <span>{t('nav.folklore')}</span>,
                  <>
                    <h3 className="card__title">{item.name}</h3>
                    <p className="card__text">
                      <strong>{t('forts.significance')}</strong> {item.significance}
                    </p>
                    <div className="legend-box">
                      <span className="chip chip--legend">{t('folklore.practicesLabel')}</span>
                      <ul className="list-disc" style={{ paddingLeft: 20 }}>
                        {item.practices.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </>,
                );
              })}
          </div>
        </div>
      </section>

      {open && openItem && (
        <StoryModal
          id={`${section}:${open.id}`}
          title={openItem.name}
          facts={
            section === 'tales'
              ? [
                  { label: t('folklore.authorLabel'), value: (openItem as Tale).author },
                  { label: t('folklore.periodLabel'), value: (openItem as Tale).period },
                  { label: t('folklore.typeLabel'), value: (openItem as Tale).type },
                ]
              : section === 'deities'
                ? [
                    { label: t('folklore.periodLabel'), value: (openItem as Deity).period },
                    { label: t('stories.regionLabel'), value: (openItem as Deity).region },
                    { label: t('folklore.worshipLabel'), value: (openItem as Deity).worship },
                  ]
                : []
          }
          lists={
            section === 'tales'
              ? [{ label: t('concepts.themes'), items: (openItem as Tale).themes }]
              : section === 'deities'
                ? [{ label: t('battles.legendsList'), items: (openItem as Deity).legends }]
                : [
                    { label: t('folklore.practicesLabel'), items: (openItem as Ritual).practices },
                    { label: t('folklore.occasionsLabel'), items: (openItem as Ritual).occasions },
                  ]
          }
          notes={[{ label: t('common.significance'), text: openItem.significance }]}
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
