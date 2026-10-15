import type { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';
import { toLocale } from '@/i18n/config';
import { translate } from '@/i18n/messages';
import { alternatesFor } from '@/i18n/metadata';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  return { title: translate(lang, 'privacy.title'), alternates: alternatesFor(lang, '/privacy') };
}

export default function Page() {
  return <PrivacyClient />;
}