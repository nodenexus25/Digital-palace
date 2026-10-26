'use client';

import Image from 'next/image';
import LocalizedLink from '@/app/components/LocalizedLink';
import TransText from '@/app/components/TransText';

export default function NotFound() {
  return (
    <main className="section">
      <div className="container flex flex-col items-center text-center">
        {/* TODO: confirm /brand/rdp-mark.svg exists; swap for the final asset when available. */}
        <Image src="/brand/rdp-mark.svg" alt="" width={96} height={96} aria-hidden="true" />
        <h1 style={{ marginTop: 'var(--space-6)' }}>
          <TransText k="notFound.doorTitle" />
        </h1>
        <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
          <TransText k="notFound.description" />
        </p>
        <LocalizedLink href="/" className="btn btn--primary" style={{ marginTop: 'var(--space-8)' }}>
          <TransText k="notFound.cta" />
        </LocalizedLink>
      </div>
    </main>
  );
}
