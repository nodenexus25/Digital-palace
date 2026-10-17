'use client';

import { useLanguage } from '@/app/components/LanguageProvider';
import Hero from '@/app/components/Hero';
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

  const card = (id: string, accent: string, children: React.ReactNode, intro: string) => (
    <article
      key={id}
      className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${accent} rajput-hover transition-all duration-300 hover:-translate-y-1 relative flex flex-col`}
      onMouseEnter={warm(id)}
    >
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <StoryLanguageToggle alt={isAlt(id)} onToggle={() => flip(id)} className="bg-white/70 text-maroon" />
        <ListenButton
          iconOnly
          active={isActive(`${section}:${id}`)}
          onClick={() => void listen(id, intro)}
          className="p-2 rounded-full bg-gold/10 text-saffron hover:bg-maroon hover:text-ivory"
        />
      </div>
      {children}
      <button type="button" onClick={() => setOpenId(id)} onFocus={warm(id)} className="mt-auto pt-2 text-left text-saffron hover:text-maroon font-cinzel text-sm">
        {t('common.readMore')} →
      </button>
    </article>
  );

  return (
    <div className="min-h-screen bg-ivory fresco-texture">
      <Hero title={t('folklore.title')} subtitle={t('folklore.subtitle')} description={t('folklore.description')} />

      <nav className="py-8 bg-sandstone-light" aria-label={t('folklore.title')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-4" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={section === tab.id}
              onClick={() => setSection(tab.id === 'tales' ? null : tab.id)}
              className={`px-6 py-3 font-cinzel font-semibold rounded-lg transition-colors ${
                section === tab.id ? 'bg-maroon text-ivory' : 'bg-ivory text-maroon hover:bg-saffron-light'
              }`}
            >
              {t(tab.key)}
            </button>
          ))}
        </div>
      </nav>

      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {section === 'tales' &&
            tales.map((tale) => {
              const item = localize(tale);
              return card(
                item.id,
                'border-saffron',
                <>
                  <h3 className="font-cinzel font-bold text-2xl text-maroon mb-3 pr-10">{item.name}</h3>
                  <dl className="text-sm text-charcoal space-y-1 mb-4">
                    <div><dt className="inline font-bold">{t('folklore.authorLabel')}</dt> <dd className="inline">{item.author}</dd></div>
                    <div><dt className="inline font-bold">{t('folklore.periodLabel')}</dt> <dd className="inline">{item.period}</dd></div>
                    <div><dt className="inline font-bold">{t('folklore.typeLabel')}</dt> <dd className="inline">{item.type}</dd></div>
                  </dl>
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {item.themes.map((theme, i) => (
                      <li key={i} className="bg-gold/20 text-maroon px-2 py-1 rounded-full text-xs font-cinzel">{theme}</li>
                    ))}
                  </ul>
                </>,
                `${item.name}. ${item.significance}`,
              );
            })}

          {section === 'deities' &&
            deities.map((deity) => {
              const item = localize(deity);
              return card(
                item.id,
                'border-gold',
                <>
                  <h3 className="font-cinzel font-bold text-xl text-maroon mb-3 pr-10">{item.name}</h3>
                  <dl className="text-sm text-charcoal space-y-1 mb-4">
                    <div><dt className="inline font-bold">{t('folklore.periodLabel')}</dt> <dd className="inline">{item.period}</dd></div>
                    <div><dt className="inline font-bold">{t('stories.regionLabel')}</dt> <dd className="inline">{item.region}</dd></div>
                    <div><dt className="inline font-bold">{t('forts.significance')}</dt> <dd className="inline">{item.significance}</dd></div>
                  </dl>
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {item.legends.slice(0, 2).map((legend, i) => (
                      <li key={i} className="bg-saffron/20 text-maroon px-2 py-1 rounded-full text-xs font-cinzel">{legend}</li>
                    ))}
                  </ul>
                </>,
                `${item.name}. ${item.significance}`,
              );
            })}

          {section === 'rituals' &&
            rituals.map((ritual) => {
              const item = localize(ritual);
              return card(
                item.id,
                'border-maroon',
                <>
                  <h3 className="font-cinzel font-bold text-2xl text-maroon mb-3 pr-10">{item.name}</h3>
                  <p className="text-sm text-charcoal mb-4">
                    <strong>{t('forts.significance')}</strong> {item.significance}
                  </p>
                  <h4 className="font-cinzel font-semibold text-maroon mb-2">{t('folklore.practicesLabel')}</h4>
                  <ul className="list-disc list-inside text-sm text-charcoal mb-4">
                    {item.practices.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </>,
                `${item.name}. ${item.significance}`,
              );
            })}
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
    </div>
  );
}
