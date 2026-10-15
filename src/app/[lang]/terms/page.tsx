import type { Metadata } from 'next';
import TermsClient from './TermsClient';
import { toLocale } from '@/i18n/config';
import { translate } from '@/i18n/messages';
import { alternatesFor } from '@/i18n/metadata';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  return { title: translate(lang, 'terms.title'), alternates: alternatesFor(lang, '/terms') };
}

export default function Page() {
  return <TermsClient />;
}