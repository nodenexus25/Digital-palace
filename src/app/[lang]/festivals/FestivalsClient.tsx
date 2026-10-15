'use client';

import { useLanguage } from '@/app/components/LanguageProvider';
import Hero from '@/app/components/Hero';
import LazyImage from '@/app/components/LazyImage';
import StoryModal from '@/app/components/story/StoryModal';
import { ListenButton, useNarration } from '@/app/components/story/useNarration';
import { useQueryState } from '@/app/components/hooks/useQueryState';
import type { Festival, FestivalGroup } from '@/content/types';

const GROUPS: { id: FestivalGroup; color: string; accent: string }[] = [
  { id: 'religious', color: '#D97706', accent: 'border-[#D97706]' },
  { id: 'cultural', color: '#800000', accent: 'border-[#800000]' },
  { id: 'commemoration', color: '#57534E', accent: 'border-[#57534E]' },
];

export default function FestivalsClient({ festivals }: { festivals: Festival[] }) {
  const { t } = useLanguage();
  const { toggle, isActive } = useNarration();
  const [groupParam, setGroup] = useQueryState('group');
  const [openId, setOpenId] = useQueryState('festival');
  const group = GROUPS.find((g) => g.id === groupParam) ?? GROUPS[0];
  const visible = festivals.filter((f) => f.group === group.id);
  const open = festivals.find((f) => f.id === openId) ?? null;

  return (
    <div className="min-h-screen bg-[#F5E6D3] text-[#2C1810] font-cormorant">
      <Hero title={t('festivals.title')} subtitle={t('festivals.subtitle')} description={t('festivals.description')} />

      <div className="flex flex-wrap justify-center border-b border-[#D4C5A9] mb-12 bg-[#EFE0CD]" role="tablist">
        {GROUPS.map((g) => (
          <button
            key={g.id}
            role="tab"
            aria-selected={group.id === g.id}
            onClick={() => setGroup(g.id === 'religious' ? null : g.id)}
            className={`px-8 py-6 font-cinzel text-lg tracking-wider transition-all duration-500 relative ${
              group.id === g.id ? 'text-[#2C1810]' : 'text-[#5D4037] hover:text-[#2C1810]'
            }`}
          >
            <span className="block text-2xl mb-1">{t(`festivals.groups.${g.id}`)}</span>
            {group.id === g.id && <span className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: g.color }} />}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-12">
        {visible.map((festival) => (
          <article
            key={festival.id}
            className="group flex flex-col md:flex-row-reverse h-auto md:h-80 bg-[#F9F3E3] rounded-sm overflow-hidden shadow-md hover:shadow-2xl transition-all duration-700 border border-[#E6DCC3]"
          >
            <div className="w-full h-64 md:h-full md:w-[35%] relative overflow-hidden">
              <LazyImage src={festival.image} alt={festival.name} fill className="object-cover transform transition-transform duration-1000 group-hover:scale-105" />
              {group.id === 'commemoration' && <div className="absolute inset-0 bg-[#57534E]/20 mix-blend-saturation pointer-events-none" />}
            </div>

            <div className="w-full md:w-[65%] p-8 flex flex-col justify-center relative bg-[#F9F3E3]">
              <div className="absolute top-6 right-6 z-20">
                <ListenButton
                  iconOnly
                  active={isActive(festival.id)}
                  onClick={() => toggle(festival.id, [festival.name, festival.significance, festival.story].join('। '))}
                  className={`p-2 rounded-full ${isActive(festival.id) ? 'bg-[#800000] text-[#F5E6D3]' : 'bg-[#D97706]/10 text-[#D97706] hover:bg-[#800000] hover:text-[#F5E6D3]'}`}
                />
              </div>
              <div className={`border-b pb-4 ${group.accent} border-opacity-30 pr-12`}>
                <h3 className="font-cinzel font-bold text-3xl text-[#800000] leading-tight">{festival.name}</h3>
              </div>
              <div className="space-y-2 mt-4">
                <p className="flex items-center gap-2 text-[#5D4037]/80 font-cinzel text-sm tracking-widest uppercase">
                  <span>{festival.date}</span>
                  <span aria-hidden="true">•</span>
                  <span>{t('common.rajasthan')}</span>
                </p>
                <p className="font-cormorant text-xl text-[#2C1810] leading-relaxed">{festival.significance}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpenId(festival.id)}
                className="mt-4 self-start font-cinzel text-sm border-b pb-1"
                style={{ color: group.color, borderColor: group.color }}
              >
                {t('festivals.readMore')}
              </button>
            </div>
          </article>
        ))}
      </div>

      {open && (
        <StoryModal
          id={`festival:${open.id}`}
          title={open.name}
          facts={[
            { label: t('festivals.dateLabel'), value: open.date },
            { label: t('stories.regionLabel'), value: t('common.rajasthan') },
            { label: t('common.significance'), value: open.significance },
          ]}
          lists={[{ label: t('festivals.ritualsLabel'), items: open.rituals }]}
          notes={[{ label: t('concepts.culturalImpact'), text: open.description }]}
          story={open.story}
          onClose={() => setOpenId(null)}
        />
      )}
    </div>
  );
}
