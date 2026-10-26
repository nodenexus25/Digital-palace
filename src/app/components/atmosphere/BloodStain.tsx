'use client';

import { useId } from 'react';

export type BloodStainVariant = 'splatter' | 'smear' | 'drip' | 'ring' | 'spray' | 'pool';

const SEEDS: Record<BloodStainVariant, number> = {
  splatter: 3,
  smear: 7,
  drip: 13,
  ring: 19,
  spray: 29,
  pool: 41,
};

/**
 * Dried blood on old parchment — art direction, not gore. Six seeded variants,
 * each an inline SVG roughened through feTurbulence + feDisplacementMap so the
 * silhouette stays irregular at any size. Fill is `currentColor`, so the host
 * element decides between `--blood-dried` and a lighter wash, and the parchment
 * host adds `mix-blend-mode: multiply`.
 *
 * Never place a stain over body text.
 */
export default function BloodStain({
  variant = 'splatter',
  opacity = 0.55,
  rotate = 0,
  className = '',
  style,
}: {
  variant?: BloodStainVariant;
  /** 0–1. Keep within .35–.7 for a dried wash. */
  opacity?: number;
  /** Degrees, applied to the whole stain. */
  rotate?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const rawId = useId();
  const filterId = `stain-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const seed = SEEDS[variant];

  return (
    <span className={`stain${className ? ` ${className}` : ''}`} style={style} aria-hidden="true">
      <svg viewBox="0 0 200 200" preserveAspectRatio="none" focusable="false">
        <defs>
          <filter id={filterId} x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="3" seed={seed} result="noise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="16"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <g
          filter={`url(#${filterId})`}
          fill="currentColor"
          opacity={opacity}
          transform={rotate ? `rotate(${rotate} 100 100)` : undefined}
        >
          {variant === 'splatter' ? (
            <>
              <path d="M96 44c22 0 42 16 44 40 2 26-16 50-44 52-30 2-50-20-50-48 0-26 22-44 50-44Z" />
              <circle cx="36" cy="52" r="7" />
              <circle cx="166" cy="70" r="5" />
              <circle cx="150" cy="158" r="9" />
              <circle cx="54" cy="164" r="4" />
              <circle cx="176" cy="120" r="3" />
            </>
          ) : null}

          {variant === 'smear' ? (
            <>
              <path d="M22 96c14-22 44-34 82-32 36 2 62 12 74 26-10 16-38 26-76 26-36 0-66-8-80-20Z" />
              <path d="M28 116c22 10 54 14 88 10 20-2 36-6 46-12-14 12-42 20-78 20-24 0-44-6-56-18Z" />
            </>
          ) : null}

          {variant === 'drip' ? (
            <>
              <path d="M88 8c10 0 18 8 18 18l-4 96c-1 26-4 40-12 40s-12-14-13-40L74 26c0-10 6-18 14-18Z" />
              <path d="M112 52c6 0 10 5 10 11l-2 44c-1 16-3 24-8 24s-8-8-8-24l-2-44c0-6 4-11 10-11Z" />
              <circle cx="94" cy="176" r="12" />
              <circle cx="114" cy="150" r="6" />
            </>
          ) : null}

          {variant === 'ring' ? (
            <>
              <path d="M100 34c38 0 66 30 66 66 0 38-28 66-66 66s-66-28-66-66c0-36 28-66 66-66Zm0 22c-24 0-44 20-44 44s20 44 44 44 44-20 44-44-20-44-44-44Z" />
              <circle cx="164" cy="52" r="5" />
              <circle cx="40" cy="156" r="4" />
            </>
          ) : null}

          {variant === 'spray' ? (
            <>
              <circle cx="100" cy="100" r="26" />
              <circle cx="62" cy="78" r="9" />
              <circle cx="140" cy="76" r="7" />
              <circle cx="146" cy="132" r="11" />
              <circle cx="56" cy="136" r="6" />
              <circle cx="102" cy="46" r="5" />
              <circle cx="100" cy="160" r="8" />
              <circle cx="30" cy="106" r="4" />
              <circle cx="172" cy="104" r="5" />
              <circle cx="124" cy="176" r="3" />
              <circle cx="74" cy="30" r="3" />
            </>
          ) : null}

          {variant === 'pool' ? (
            <>
              <path d="M64 62c22-16 60-18 84-2 22 15 30 42 18 62-13 22-48 32-80 26-30-6-48-26-44-48 3-16 10-28 22-38Z" />
              <circle cx="32" cy="42" r="6" />
              <circle cx="176" cy="150" r="7" />
            </>
          ) : null}
        </g>
      </svg>
    </span>
  );
}
