/**
 * Full-viewport film grain. Mounted exactly once, in the root layout, so every
 * page carries the same static noise plate (see `.film-grain` in globals.css).
 * Static by design: no animation, no per-frame cost.
 */
export default function FilmGrain() {
  return <div className="film-grain" aria-hidden="true" />;
}
