/**
 * A torn, lightly burnt paper edge, roughly 24px tall, drawn across the full
 * width of a section so parchment blocks read as separate sheets. The silhouette
 * is fixed (deterministic, so SSR and hydration agree) and the fill is
 * `currentColor`, which defaults to the surrounding ground.
 */
const TEETH = 'M0 0H1440V8L1404 6 1368 14 1332 7 1296 16 1260 9 1224 18 1188 8 1152 15 1116 6 1080 17 1044 10 1008 19 972 7 936 13 900 5 864 16 828 9 792 18 756 8 720 14 684 6 648 17 612 10 576 19 540 7 504 15 468 9 432 18 396 6 360 13 324 8 288 17 252 10 216 19 180 7 144 15 108 9 72 18 36 8 0 12Z';

export default function TornEdge({
  position = 'top',
  className = '',
  style,
}: {
  position?: 'top' | 'bottom';
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`torn-edge torn-edge--${position}${className ? ` ${className}` : ''}`}
      style={style}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 24" preserveAspectRatio="none" focusable="false">
        <path d={TEETH} fill="currentColor" />
      </svg>
    </span>
  );
}
