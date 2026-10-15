'use client';

import { useLanguage } from '@/app/components/LanguageProvider';
import Hero from '@/app/components/Hero';
import StoryModal from '@/app/components/story/StoryModal';
import { ListenButton, useNarration } from '@/app/components/story/useNarration';
import { useQueryState } from '@/app/components/hooks/useQueryState';
import { prefetchJson, storyUrl, useRemoteJson } from '@/app/components/hooks/useRemoteContent';
import type { FolkDeity, FolkRitual, FolkTale } from '@/content/types';

type Tale = Omit<FolkTale, 'story'>;
type Deity = Omit<FolkDeity, 'story'>;
type Ritual = Omit<FolkRitual, 'story'>;
type Section = 'tales' | 'deities' | 'rituals';

const TABS: { id: Section; key: string }[] = [
  { id: 'tales', key: 'folklore.tabs.epics' },
  { id: 'deities', key: 'folklore.tabs.deities' },
  { id: 'rituals', key: 'folklore.tabs.rituals' },
];

export default function FolkloreClient({ tales, deities, rituals }: { tales: Tale[]; deities: Deity[]; rituals: Ritual[] }) {
  const { t, currentLanguage } = useLanguage();
  const [sectionParam, setSection] = useQueryState('section');
  const [openId, setOpenId] = useQueryState('item');
  const { toggle, isActive } = useNarration();
  const section: Section = sectionParam === 'deities' || sectionParam === 'rituals' ? sectionParam : 'tales';

  const items = { tales, deities, rituals }[section] as (Tale | Deity | Ritual)[];
  const open = items.find((i) => i.id === openId) ?? null;
  const story = useRemoteJson<{ story?: string }>(open ? storyUrl(currentLanguage, section, open.id) : null);
  const warm = (id: string) => () => void prefetchJson(storyUrl(currentLanguage, section, id)).catch(() => {});

  // Narrating from a card reads the full story, fetched on demand.
  const listen = async (id: string, intro: string) => {
    const key = `${section}:${id}`;
    if (isActive(key)) return toggle(key, '');
    const data = (await prefetchJson(storyUrl(currentLanguage, section, id)).catch(() => null)) as { story?: string } | null;
    toggle(key, [intro, data?.story].filter(Boolean).join('\n\n'));
  };

  const card = (id: string, accent: string, children: React.ReactNode, intro: string) => (
    <article
      key={id}
      className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${accent} rajput-hover transition-all duration-300 hover:-translate-y-1 relative flex flex-col`}
      onMouseEnter={warm(id)}
    >
      <div className="absolute top-4 right-4 z-10">
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
            tales.map((tale) =>
              card(
                tale.id,
                'border-saffron',
                <>
                  <h3 className="font-cinzel font-bold text-2xl text-maroon mb-3 pr-10">{tale.name}</h3>
                  <dl className="text-sm text-charcoal space-y-1 mb-4">
                    <div><dt className="inline font-bold">{t('folklore.authorLabel')}</dt> <dd className="inline">{tale.author}</dd></div>
                    <div><dt className="inline font-bold">{t('folklore.periodLabel')}</dt> <dd className="inline">{tale.period}</dd></div>
                    <div><dt className="inline font-bold">{t('folklore.typeLabel')}</dt> <dd className="inline">{tale.type}</dd></div>
                  </dl>
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {tale.themes.map((theme, i) => (
                      <li key={i} className="bg-gold/20 text-maroon px-2 py-1 rounded-full text-xs font-cinzel">{theme}</li>
                    ))}
                  </ul>
                </>,
                `${tale.name}. ${tale.significance}`,
              ),
            )}

          {section === 'deities' &&
            deities.map((deity) =>
              card(
                deity.id,
                'border-gold',
                <>
                  <h3 className="font-cinzel font-bold text-xl text-maroon mb-3 pr-10">{deity.name}</h3>
                  <dl className="text-sm text-charcoal space-y-1 mb-4">
                    <div><dt className="inline font-bold">{t('folklore.periodLabel')}</dt> <dd className="inline">{deity.period}</dd></div>
                    <div><dt className="inline font-bold">{t('stories.regionLabel')}</dt> <dd className="inline">{deity.region}</dd></div>
                    <div><dt className="inline font-bold">{t('forts.significance')}</dt> <dd className="inline">{deity.significance}</dd></div>
                  </dl>
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {deity.legends.slice(0, 2).map((legend, i) => (
                      <li key={i} className="bg-saffron/20 text-maroon px-2 py-1 rounded-full text-xs font-cinzel">{legend}</li>
                    ))}
                  </ul>
                </>,
                `${deity.name}. ${deity.significance}`,
              ),
            )}

          {section === 'rituals' &&
            rituals.map((ritual) =>
              card(
                ritual.id,
                'border-maroon',
                <>
                  <h3 className="font-cinzel font-bold text-2xl text-maroon mb-3 pr-10">{ritual.name}</h3>
                  <p className="text-sm text-charcoal mb-4">
                    <strong>{t('forts.significance')}</strong> {ritual.significance}
                  </p>
                  <h4 className="font-cinzel font-semibold text-maroon mb-2">{t('folklore.practicesLabel')}</h4>
                  <ul className="list-disc list-inside text-sm text-charcoal mb-4">
                    {ritual.practices.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </>,
                `${ritual.name}. ${ritual.significance}`,
              ),
            )}
        </div>
      </section>

      {open && (
        <StoryModal
          id={`${section}:${open.id}`}
          title={open.name}
          facts={
            section === 'tales'
              ? [
                  { label: t('folklore.authorLabel'), value: (open as Tale).author },
                  { label: t('folklore.periodLabel'), value: (open as Tale).period },
                  { label: t('folklore.typeLabel'), value: (open as Tale).type },
                ]
              : section === 'deities'
                ? [
                    { label: t('folklore.periodLabel'), value: (open as Deity).period },
                    { label: t('stories.regionLabel'), value: (open as Deity).region },
                    { label: t('folklore.worshipLabel'), value: (open as Deity).worship },
                  ]
                : []
          }
          lists={
            section === 'tales'
              ? [{ label: t('concepts.themes'), items: (open as Tale).themes }]
              : section === 'deities'
                ? [{ label: t('battles.legendsList'), items: (open as Deity).legends }]
                : [
                    { label: t('folklore.practicesLabel'), items: (open as Ritual).practices },
                    { label: t('folklore.occasionsLabel'), items: (open as Ritual).occasions },
                  ]
          }
          notes={[{ label: t('common.significance'), text: open.significance }]}
          story={story.data?.story}
          loading={story.loading}
          onClose={() => setOpenId(null)}
        />
      )}
    </div>
  );
}
