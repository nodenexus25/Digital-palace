import type { ReactNode } from 'react';

interface SectionHeadingProps {
  /** Small uppercase kicker above the title. */
  eyebrow?: ReactNode;
  /** Section title, rendered as an <h2>. */
  title: ReactNode;
  /** Supporting paragraph below the kangura rule. */
  lead?: ReactNode;
  /** Optional control (button / link) aligned to the right of the title. */
  action?: ReactNode;
  /** Optional Hindi sub-line, rendered in the Devanagari face. */
  deva?: ReactNode;
  /** Heading level for the title. */
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

/**
 * Canonical section header: eyebrow → title → kangura rule → lead, with an
 * optional action control on the right. Use it for every section on every page
 * so the divider motif and rhythm stay identical site-wide.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
  deva,
  as: Heading = 'h2',
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`sec-head ${className}`}>
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <Heading>{title}</Heading>
        {deva ? <p className="page-head__deva">{deva}</p> : null}
        <span className="kangura-rule" aria-hidden="true" />
        {lead ? <p className="lead">{lead}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
