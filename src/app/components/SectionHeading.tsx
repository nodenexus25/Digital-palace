import type { ReactNode } from 'react';

interface SectionHeadingProps {
  /** Small uppercase kicker above the title. */
  label?: ReactNode;
  /** @deprecated alias of `label`, kept for the pages that still pass it. */
  eyebrow?: ReactNode;
  /** Section title, rendered as an <h2>. */
  title: ReactNode;
  /** Supporting paragraph below the sword divider. */
  lead?: ReactNode;
  /** Optional control (button / link) aligned to the right of the title. */
  action?: ReactNode;
  /** Optional Hindi sub-line, rendered in the Devanagari face. */
  deva?: ReactNode;
  /** Heading level for the title. */
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

/** A straight talwar silhouette: bronze blade, blood-red tip. 220 × 14. */
function SwordDivider() {
  return (
    <svg className="sword-divider" viewBox="0 0 220 14" fill="none" aria-hidden="true" focusable="false">
      <g fill="currentColor">
        <circle cx="3.5" cy="7" r="3" />
        <rect x="6.5" y="6" width="11" height="2" />
        <rect x="17.5" y="2" width="2.6" height="10" />
        <path d="M21 5.4C70 4.8 140 5 194 5.6L210 7l-16 1.4C140 9 70 9.2 21 8.6Z" />
      </g>
      <path d="M176 5.72C182 5.79 188 5.9 194 6.06L210 7l-16 .94c-6 .16-12 .27-18 .34Z" fill="var(--blood)" />
    </svg>
  );
}

/**
 * Canonical section header: label → title → sword divider → lead, with an
 * optional action control on the right. Use it for every section on every page
 * so the carved rhythm stays identical site-wide.
 */
export default function SectionHeading({
  label,
  eyebrow,
  title,
  lead,
  action,
  deva,
  as: Heading = 'h2',
  className = '',
}: SectionHeadingProps) {
  const kicker = label ?? eyebrow;
  return (
    <div className={`sec-head ${className}`.trim()}>
      <div className="sec-head__main">
        {kicker ? <p className="label">{kicker}</p> : null}
        <Heading>{title}</Heading>
        {deva ? <p className="page-head__deva">{deva}</p> : null}
        <SwordDivider />
        {lead ? <p className="lead">{lead}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
