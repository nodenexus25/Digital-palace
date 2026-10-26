import type { ReactNode } from 'react';
import LocalizedLink from '@/app/components/LocalizedLink';

type Crumb = { label: ReactNode; href?: string };

interface PageHeadProps {
  /** Breadcrumb trail, e.g. Home / Battles. The last item is the current page. */
  breadcrumb?: Crumb[];
  /** Small uppercase kicker above the title. */
  eyebrow?: ReactNode;
  /** Page title, rendered as the <h1>. */
  title: ReactNode;
  /** Hindi title shown under the heading in the Devanagari face. */
  deva?: ReactNode;
  /** Supporting paragraph. */
  lead?: ReactNode;
  /** Optional control aligned under the lead. */
  action?: ReactNode;
  /** Accessible label for the breadcrumb navigation. */
  breadcrumbLabel?: string;
}

/**
 * Canonical inner-page header band: sandstone ground, breadcrumb, eyebrow,
 * H1, optional Devanagari sub-title and lead. Use it once at the top of every
 * inner page so the rhythm matches the homepage sections.
 */
export default function PageHead({
  breadcrumb,
  eyebrow,
  title,
  deva,
  lead,
  action,
  breadcrumbLabel = 'Breadcrumb',
}: PageHeadProps) {
  return (
    <section className="section--sand page-head">
      <div className="container">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav className="breadcrumb" aria-label={breadcrumbLabel}>
            {breadcrumb.map((crumb, index) => (
              <span key={index}>
                {index > 0 ? <span aria-hidden="true"> / </span> : null}
                {crumb.href ? (
                  <LocalizedLink href={crumb.href}>{crumb.label}</LocalizedLink>
                ) : (
                  crumb.label
                )}
              </span>
            ))}
          </nav>
        ) : null}
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {deva ? <p className="page-head__deva">{deva}</p> : null}
        {lead ? <p className="lead">{lead}</p> : null}
        {action ? <div className="sec-head__actions" style={{ marginTop: 28 }}>{action}</div> : null}
      </div>
    </section>
  );
}
