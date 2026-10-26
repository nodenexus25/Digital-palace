/**
 * Two to three drifting fog plates. Each layer is tinted `--steel-mist` at a low
 * opacity and slides horizontally on `translate3d` only, so the compositor keeps
 * it off the main thread. The whole field is neutralised under
 * `prefers-reduced-motion` (see the reduced-motion block in globals.css).
 *
 * Place this between the art and the text column of a hero.
 */
const PRESETS = [
  { y: '14%', h: '44%', o: '0.16', d: '110s' },
  { y: '44%', h: '38%', o: '0.12', d: '165s' },
  { y: '66%', h: '34%', o: '0.09', d: '215s' },
] as const;

export default function Mist({ layers = 3, className = '' }: { layers?: number; className?: string }) {
  const count = Math.min(Math.max(layers, 1), PRESETS.length);
  return (
    <div className={`mist${className ? ` ${className}` : ''}`} aria-hidden="true">
      {PRESETS.slice(0, count).map((preset, index) => (
        <div
          key={index}
          className="mist__layer"
          style={
            {
              '--y': preset.y,
              '--h': preset.h,
              '--o': preset.o,
              '--d': preset.d,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
