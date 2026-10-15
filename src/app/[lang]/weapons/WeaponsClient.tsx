'use client';

import { useEffect, useState } from 'react';
import Hero from '@/app/components/Hero';
import OptimizedImage from '@/app/components/OptimizedImage';
import { useLanguage } from '@/app/components/LanguageProvider';
import { ListenButton, useNarration } from '@/app/components/story/useNarration';
import { useQueryState } from '@/app/components/hooks/useQueryState';
import type { Weapon, WeaponCategory } from '@/content/types';

export default function WeaponsClient({ categories, weapons }: { categories: WeaponCategory[]; weapons: Weapon[] }) {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState(categories[0]?.id ?? '');
  const [weaponId, setWeaponId] = useQueryState('weapon');
  const { toggle, isActive, stop } = useNarration();
  const selected = weapons.find((w) => w.id === weaponId) ?? null;
  const activeCategory = categories.find((c) => c.id === activeSection);

  // Scroll spy for the sidebar index.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: '-20% 0px -60% 0px' },
    );
    categories.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setWeaponId(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selected, setWeaponId]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  const close = () => {
    stop();
    setWeaponId(null);
  };

  return (
    <div className="min-h-screen bg-[#12100e] text-[#d4c5b0] font-sans selection:bg-[#8b0000] selection:text-white">
      <Hero title={t('weapons.title')} subtitle={t('weapons.subtitle')} description={t('weapons.description')} backgroundImage="/images/Hero/home.png" />

      <div className="flex relative max-w-[1920px] mx-auto">
        <aside className="hidden lg:block w-80 h-screen sticky top-0 border-r border-[#3a302c] bg-[#161412] p-8 overflow-y-auto z-40">
          <div className="mb-12 pt-8">
            <h2 className="text-[#8b0000] font-bold tracking-[0.3em] text-xs mb-2 uppercase">{t('weapons.sidebarTitle')}</h2>
            <p className="text-4xl font-serif text-[#d4c5b0] uppercase leading-none">{t('weapons.sidebarSubtitle')}</p>
            <div className="h-px w-full bg-[#3a302c] mt-6" />
          </div>
          <nav className="space-y-4" aria-label={t('weapons.sidebarTitle')}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToSection(cat.id)}
                aria-current={activeSection === cat.id ? 'true' : undefined}
                className={`w-full text-left group transition-all duration-300 ${activeSection === cat.id ? 'pl-4 border-l-2 border-[#8b0000]' : 'pl-0 border-l-2 border-transparent hover:pl-2'}`}
              >
                <span className={`text-[10px] block uppercase tracking-widest mb-1 ${activeSection === cat.id ? 'text-[#8b0000]' : 'text-[#5a504a] group-hover:text-[#8b0000]'}`}>
                  {cat.numeral}
                </span>
                <span className={`text-sm font-serif uppercase tracking-wider ${activeSection === cat.id ? 'text-[#d4c5b0]' : 'text-[#786c61] group-hover:text-[#d4c5b0]'}`}>
                  {cat.title}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 bg-[#12100e] relative">
          <div className="lg:hidden sticky top-20 z-40 bg-[#12100e]/95 backdrop-blur-md border-b border-[#3a302c] p-4 flex items-center justify-between">
            <span className="text-[#8b0000] text-xs font-bold tracking-widest uppercase">{t('weapons.currentSector')}</span>
            <span className="text-[#d4c5b0] font-serif uppercase">{activeCategory?.title ?? t('weapons.sidebarSubtitle')}</span>
          </div>

          {categories.map((category) => (
            <section id={category.id} key={category.id} className="min-h-screen py-24 px-4 md:px-12 lg:px-16 border-b border-[#2c241b] relative z-10">
              <div className="mb-20 max-w-4xl">
                <span className="text-[#8b0000] font-bold tracking-[0.3em] text-sm block mb-4">
                  {t('weapons.sectionLabel', { numeral: category.numeral })}
                </span>
                <h2 className="text-5xl md:text-7xl font-serif text-[#d4c5b0] uppercase leading-none mb-8 drop-shadow-lg">{category.title}</h2>
                <div className="flex items-center gap-4" aria-hidden="true">
                  <div className="h-px w-24 bg-[#8b0000]" />
                  <div className="h-2 w-2 bg-[#8b0000] rotate-45" />
                  <div className="h-px flex-1 bg-gradient-to-r from-[#3a302c] to-transparent" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
                {weapons
                  .filter((w) => w.category === category.id)
                  .map((weapon) => (
                    <button
                      type="button"
                      key={weapon.id}
                      onClick={() => setWeaponId(weapon.id)}
                      className="group text-left relative bg-gradient-to-b from-[#25201d] to-[#181512] border border-[#443832] hover:border-[#8b0000] transition-all duration-500 overflow-hidden shadow-2xl shadow-black"
                    >
                      <div className="relative h-72 md:h-80 w-full overflow-hidden border-b border-[#3a302c] bg-[#050403] flex items-center justify-center">
                        {weapon.image && (
                          <OptimizedImage
                            src={weapon.image}
                            alt={weapon.name}
                            className="object-contain object-center grayscale group-hover:grayscale-0"
                            strategy="CONTENT"
                            responsive
                            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                            width={800}
                            height={600}
                          />
                        )}
                        <span className="absolute top-4 right-4 z-20 text-[#d4c5b0] text-[10px] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-sm px-3 py-1 border border-[#3a302c]">
                          {weapon.type}
                        </span>
                      </div>
                      <div className="p-8 relative">
                        <h3 className="text-2xl font-serif font-bold text-[#d4c5b0] group-hover:text-[#8b0000] transition-colors duration-300 mb-2">{weapon.name}</h3>
                        <p className="text-[#8b0000] text-xs font-bold uppercase tracking-widest mb-4 opacity-80">{weapon.subtitle}</p>
                        <p className="text-[#887e76] text-sm leading-relaxed line-clamp-3 mb-6 group-hover:text-[#a89b8c] transition-colors">{weapon.description}</p>
                        <dl className="flex justify-between items-end border-t border-[#3a302c] pt-4">
                          <div>
                            <dt className="block text-[10px] text-[#5a504a] uppercase tracking-wider mb-1">{t('weapons.lethality')}</dt>
                            <dd className="text-[#d4c5b0] text-xs uppercase">{weapon.lethality}</dd>
                          </div>
                          <div className="text-right">
                            <dt className="block text-[10px] text-[#5a504a] uppercase tracking-wider mb-1">{t('weapons.era')}</dt>
                            <dd className="text-[#d4c5b0] text-xs uppercase">{weapon.era}</dd>
                          </div>
                        </dl>
                      </div>
                    </button>
                  ))}
              </div>
            </section>
          ))}
        </main>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-[#0a0505]/95 backdrop-blur-md" onClick={close} />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selected.name}
            className="relative w-full max-w-6xl max-h-[90vh] bg-[#161412] border border-[#3a302c] shadow-2xl overflow-y-auto flex flex-col md:flex-row"
          >
            <button onClick={close} aria-label={t('common.close')} className="absolute top-4 right-4 z-50 text-[#786c61] hover:text-[#8b0000] transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-full border-b md:border-b-0 md:border-r border-[#3a302c]">
              {selected.image && (
                <OptimizedImage src={selected.image} alt={selected.name} className="object-cover" strategy="HERO" responsive sizes="(min-width: 768px) 50vw, 100vw" width={1200} height={800} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#161412] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#d4c5b0] mb-2">{selected.name}</h2>
                <p className="text-[#8b0000] text-lg uppercase tracking-widest font-bold">{selected.subtitle}</p>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 text-[#d4c5b0]">
              <dl className="flex flex-wrap gap-4 mb-8">
                <div className="bg-[#12100e] px-4 py-2 border border-[#3a302c]">
                  <dt className="block text-[10px] text-[#5a504a] uppercase tracking-wider mb-1">{t('weapons.lethality')}</dt>
                  <dd className="text-[#8b0000] font-bold uppercase">{selected.lethality}</dd>
                </div>
                <div className="bg-[#12100e] px-4 py-2 border border-[#3a302c]">
                  <dt className="block text-[10px] text-[#5a504a] uppercase tracking-wider mb-1">{t('weapons.role')}</dt>
                  <dd className="text-[#d4c5b0] font-bold uppercase">{selected.role}</dd>
                </div>
              </dl>

              <p className="text-lg leading-relaxed mb-8 font-light text-[#a89b8c]">{selected.description}</p>

              <ListenButton
                active={isActive(selected.id)}
                onClick={() => toggle(selected.id, `${selected.name}. ${selected.subtitle}. ${selected.description}`)}
                className={`mb-8 px-6 py-3 border border-[#8b0000] text-sm font-bold uppercase tracking-widest ${
                  isActive(selected.id) ? 'bg-[#8b0000] text-white' : 'text-[#8b0000] hover:bg-[#8b0000] hover:text-white'
                }`}
              />

              <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#3a302c] to-transparent" />
              <h3 className="text-xl font-serif text-[#d4c5b0] mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-[#8b0000]" aria-hidden="true" />
                {t('weapons.battlefieldSignificance')}
              </h3>
              <blockquote className="text-[#786c61] mb-6 italic">{t('weapons.quote', { name: selected.name, era: selected.era })}</blockquote>

              <dl className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-[#3a302c]">
                <div>
                  <dt className="text-[#8b0000] text-[10px] font-bold uppercase tracking-widest mb-2">{t('weapons.era')}</dt>
                  <dd className="text-sm text-[#d4c5b0]">{selected.era}</dd>
                </div>
                <div>
                  <dt className="text-[#8b0000] text-[10px] font-bold uppercase tracking-widest mb-2">{t('weapons.origin')}</dt>
                  <dd className="text-sm text-[#d4c5b0]">{t('weapons.originValue')}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
