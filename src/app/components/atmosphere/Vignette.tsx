/**
 * Radial darkening at the edges of a full-bleed art area. Purely decorative and
 * non-interactive; it must sit above the art but below the text column.
 */
export default function Vignette({ className = '' }: { className?: string }) {
  return <div className={`vignette${className ? ` ${className}` : ''}`} aria-hidden="true" />;
}
