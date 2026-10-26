import BloodStain from './BloodStain';

/**
 * The fibre noise and burnt edges live on `.parchment` in globals.css; this
 * component adds the one or two faint dried stains that break up the field.
 * Drop it inside any `.parchment` container — it is absolutely positioned and
 * never sits over the reading measure.
 */
export default function ParchmentTexture({
  stains = 2,
  className = '',
}: {
  stains?: 0 | 1 | 2;
  className?: string;
}) {
  return (
    <div className={className} aria-hidden="true">
      {stains >= 1 ? (
        <BloodStain
          variant="pool"
          opacity={0.4}
          className="stain--on-parchment"
          style={{ top: '-6%', right: '-4%', width: '38%', height: '46%' }}
        />
      ) : null}
      {stains >= 2 ? (
        <BloodStain
          variant="splatter"
          opacity={0.3}
          rotate={-14}
          className="stain--on-parchment"
          style={{ bottom: '-8%', left: '-6%', width: '30%', height: '40%' }}
        />
      ) : null}
    </div>
  );
}
