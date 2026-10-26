import type { ReactNode } from 'react';
import Image from 'next/image';
import LocalizedLink from '@/app/components/LocalizedLink';
import { Vignette } from '@/app/components/atmosphere';

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
  /** Supporting paragraph, set in Cormorant italic. */
  lead?: ReactNode;
  /** Optional control aligned under the lead. */
  action?: ReactNode;
  /** Accessible label for the breadcrumb navigation. */
  breadcrumbLabel?: string;
  /**
   * Full-bleed photographic hero. When supplied the band becomes a 60vh image
   * plate (art + scrim + vignette); when omitted it stays a compact plain band
   * for reading pages such as privacy, terms and the site map.
   */
  image?: string;
  /** Alt text for `image`; empty by default because the H1 carries the meaning. */
  imageAlt?: string;
}

/**
 * Canonical inner-page header band: ash-black ground, breadcrumb, eyebrow, H1,
 * optional Devanagari sub-title and lead, over an optional 60vh image hero.
 * Use it once at the top of every inner page so the rhythm matches the
 * homepage sections.
 */
export default function PageHead({
  breadcrumb,
  eyebrow,
  title,
  deva,
  lead,
  action,
  breadcrumbLabel = 'Breadcrumb',
  image,
  imageAlt = '',
}: PageHeadProps) {
  return (
    <section className={`page-head${image ? '' : ' page-head--plain'}`}>
      {image ? (
        <>
          <div className="page-head__art">
            <Image src={image} alt={imageAlt} fill priority quality={85} sizes="100vw" />
          </div>
          <div className="page-head__scrim" aria-hidden="true" />
          <Vignette />
        </>
      ) : null}
      <div className="container page-head__inner">
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
        {eyebrow ? <p className="label">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {deva ? <p className="page-head__deva">{deva}</p> : null}
        {lead ? <p className="lead">{lead}</p> : null}
        {action ? <div className="sec-head__actions" style={{ marginTop: 28 }}>{action}</div> : null}
      </div>
    </section>
  );
}
