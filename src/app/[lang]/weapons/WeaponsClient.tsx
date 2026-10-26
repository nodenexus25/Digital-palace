'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import OptimizedImage from '@/app/components/OptimizedImage';
import PageHead from '@/app/components/PageHead';
import SectionHeading from '@/app/components/SectionHeading';
import TransText from '@/app/components/TransText';
import { useLanguage } from '@/app/components/LanguageProvider';
import { ListenButton, useNarration } from '@/app/components/story/useNarration';
import { useQueryState } from '@/app/components/hooks/useQueryState';
import type { Weapon, WeaponCategory } from '@/content/types';

function WeaponCard({ weapon, onOpen }: { weapon: Weapon; onOpen: (id: string) => void }) {
  const { t } = useLanguage();
  return (
    <button
      type="button"
      onClick={() => onOpen(weapon.id)}
      className="group card text-left cursor-pointer w-[35%] shrink-0 snap-start md:w-[calc((100%-2.5rem)/3)] lg:w-auto"
    >
      {/* Portrait plate: the arch follows the asset's 4:5 ratio. */}
      <div className="card__media">
        <div className="arch arch--tall">
          {weapon.image && (
            <OptimizedImage
              src={weapon.image}
              alt={weapon.name}
              className="object-cover [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0"
              strategy="CONTENT"
              responsive
              sizes="(min-width: 1536px) 24vw, (min-width: 1024px) 20vw, (min-width: 768px) 30vw, 35vw"
              width={800}
              height={1000}
            />
          )}
        </div>
      </div>
      <div className="card__body">
        <span className="chip chip--legend self-start">{weapon.type}</span>
        <h3 className="card__title">{weapon.name}</h3>
        <p className="text-sm text-[color:var(--muted)]">{weapon.subtitle}</p>
        <p className="card__text clamp-3">{weapon.description}</p>
        <dl className="card__foot">
          <div>
            <dt className="text-[color:var(--muted)]">{t('weapons.lethality')}</dt>
            <dd>{weapon.lethality}</dd>
          </div>
          <div className="text-right">
            <dt className="text-[color:var(--muted)]">{t('weapons.era')}</dt>
            <dd>{weapon.era}</dd>
          </div>
        </dl>
      </div>
    </button>
  );
}

/**
 * One horizontal carousel per category: swipeable on touch devices, with arrows
 * and dots for tablet/mouse users. On large screens it collapses back into the
 * three-column grid, so the controls are hidden there.
 */
function CategoryCarousel({ category, items, onOpen }: { category: WeaponCategory; items: Weapon[]; onOpen: (id: string) => void }) {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Derive the active slide and edge states straight from the scroll position,
  // so native touch swiping stays the source of truth.
  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    if (!cards.length) return;
    const left = el.getBoundingClientRect().left;
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    cards.forEach((card, i) => {
      const distance = Math.abs(card.getBoundingClientRect().left - left);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = i;
      }
    });
    setIndex(nearest);
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [sync]);

  const goTo = (i: number) => {
    const el = trackRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: el.scrollLeft + card.getBoundingClientRect().left - el.getBoundingClientRect().left, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={sync}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            goTo(Math.min(index + 1, items.length - 1));
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goTo(Math.max(index - 1, 0));
          }
        }}
        role="group"
        aria-roledescription={t('home.carousel')}
        aria-label={category.title}
        className="flex gap-5 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth pb-2 -mb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:snap-none lg:pb-0 lg:mb-0"
      >
        {items.map((weapon) => (
          <WeaponCard key={weapon.id} weapon={weapon} onOpen={onOpen} />
        ))}
      </div>

      <div className="lg:hidden mt-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goTo(Math.max(index - 1, 0))}
            disabled={atStart}
            aria-label={t('common.previous')}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--raised)] text-[var(--ink)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:opacity-30 disabled:pointer-events-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="square" strokeWidth="2" d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(Math.min(index + 1, items.length - 1))}
            disabled={atEnd}
            aria-label={t('common.next')}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--raised)] text-[var(--ink)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:opacity-30 disabled:pointer-events-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="square" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {items.map((weapon, i) => (
            <button
              type="button"
              key={weapon.id}
              onClick={() => goTo(i)}
              aria-label={t('weapons.carouselSlide', { name: weapon.name })}
              aria-current={i === index ? 'true' : undefined}
              className={`h-2.5 w-2.5 rotate-45 border transition-colors ${i === index ? 'bg-[var(--primary)] border-[var(--primary)]' : 'border-[var(--line-strong)] hover:border-[var(--primary)]'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

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
    <div className="min-h-screen">
      <PageHead
        breadcrumb={[
          { label: <TransText k="nav.home" />, href: '/' },
          { label: <TransText k="nav.weapons" /> },
        ]}
        title={<TransText k="weapons.title" />}
        lead={<TransText k="weapons.subtitle" />}
      />

      <div className="flex max-w-[1920px] mx-auto">
        <aside className="hidden lg:block w-80 shrink-0 self-start sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto border-r border-[var(--line)] bg-[var(--sand)] p-8">
          <div className="mb-10">
            <p className="eyebrow">{t('weapons.sidebarTitle')}</p>
            <p className="card__title" style={{ fontSize: 32 }}>{t('weapons.sidebarSubtitle')}</p>
          </div>
          <nav className="flex flex-col gap-2" aria-label={t('weapons.sidebarTitle')}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollToSection(cat.id)}
                aria-current={activeSection === cat.id ? 'true' : undefined}
                className={`w-full text-left rounded-[var(--radius-md)] px-4 py-3 transition-colors ${activeSection === cat.id ? 'bg-[var(--primary)] text-[var(--on-primary)]' : 'text-[var(--ink)] hover:bg-[var(--tint)]'}`}
              >
                <span className="block text-[0.7rem] uppercase tracking-widest opacity-80">{cat.numeral}</span>
                <span className="block">{cat.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="lg:hidden sticky top-20 z-40 bg-[var(--sand)] backdrop-blur-md border-b border-[var(--line)] p-4 flex items-center justify-between">
            <span className="eyebrow" style={{ margin: 0 }}>{t('weapons.currentSector')}</span>
            <span>{activeCategory?.title ?? t('weapons.sidebarSubtitle')}</span>
          </div>

          {categories.map((category) => (
            <section id={category.id} key={category.id} className="section section--tint scroll-mt-32">
              <div className="container">
                <SectionHeading
                  eyebrow={t('weapons.sectionLabel', { numeral: category.numeral })}
                  title={category.title}
                />
                <CategoryCarousel
                  category={category}
                  items={weapons.filter((w) => w.category === category.id)}
                  onOpen={setWeaponId}
                />
              </div>
            </section>
          ))}
        </main>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-[var(--deep)]/80 backdrop-blur-md" onClick={close} />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selected.name}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-[var(--raised)] shadow-2xl flex flex-col md:flex-row"
            style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius-xl)' }}
          >
            <button
              type="button"
              onClick={close}
              aria-label={t('common.close')}
              className="absolute top-4 right-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--raised)] text-[var(--ink)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-full md:w-1/2 bg-[var(--surface)] p-6 md:p-8 flex items-start justify-center">
              {selected.image && (
                <div className="arch arch--tall w-full max-w-sm">
                  <OptimizedImage
                    src={selected.image}
                    alt={selected.name}
                    className="object-cover"
                    strategy="CONTENT"
                    responsive
                    sizes="(min-width: 768px) 33vw, 100vw"
                    width={800}
                    height={1000}
                  />
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-12">
              <h2>{selected.name}</h2>
              <p className="lead" style={{ marginTop: 8 }}>{selected.subtitle}</p>

              <dl className="factbox" style={{ margin: '24px 0' }}>
                <dt>{t('weapons.lethality')}</dt>
                <dd>{selected.lethality}</dd>
                <dt>{t('weapons.role')}</dt>
                <dd>{selected.role}</dd>
              </dl>

              <p className="card__text">{selected.description}</p>

              <div style={{ marginTop: 24 }}>
                <ListenButton
                  active={isActive(selected.id)}
                  onClick={() => toggle(selected.id, `${selected.name}. ${selected.subtitle}. ${selected.description}`)}
                  className="listen-btn"
                />
              </div>

              <h3 style={{ marginTop: 32 }}>{t('weapons.battlefieldSignificance')}</h3>
              <blockquote className="legend-box" style={{ margin: '16px 0 0' }}>
                {t('weapons.quote', { name: selected.name, era: selected.era })}
              </blockquote>

              <dl className="grid grid-cols-2 gap-6" style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
                <div>
                  <dt className="eyebrow" style={{ margin: 0 }}>{t('weapons.era')}</dt>
                  <dd>{selected.era}</dd>
                </div>
                <div>
                  <dt className="eyebrow" style={{ margin: 0 }}>{t('weapons.origin')}</dt>
                  <dd>{t('weapons.originValue')}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
