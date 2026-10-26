/**
 * Ember sparks rising through the hero and the battle ledger.
 *
 * The particles are generated from a seeded PRNG at module scope, so the server
 * render and the client hydration produce byte-identical markup. All motion is
 * CSS (`--dur`, `--delay`, `--dx`) on `transform`/`opacity` only, and the whole
 * field is switched off by `prefers-reduced-motion`.
 */
function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
}

const rand = seeded(20261026);

const EMBERS = Array.from({ length: 22 }, () => ({
  left: `${(rand() * 100).toFixed(2)}%`,
  size: `${(1.5 + rand() * 1.5).toFixed(2)}px`,
  duration: `${(11 + rand() * 12).toFixed(2)}s`,
  delay: `${(rand() * 14).toFixed(2)}s`,
  drift: `${(rand() * 60 - 30).toFixed(1)}px`,
  opacity: (0.45 + rand() * 0.45).toFixed(2),
}));

export default function Embers({ className = '' }: { className?: string }) {
  return (
    <div className={`embers${className ? ` ${className}` : ''}`} aria-hidden="true">
      {EMBERS.map((ember, index) => (
        <span
          key={index}
          className="ember"
          style={
            {
              left: ember.left,
              '--sz': ember.size,
              '--dur': ember.duration,
              '--delay': ember.delay,
              '--dx': ember.drift,
              '--o': ember.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
