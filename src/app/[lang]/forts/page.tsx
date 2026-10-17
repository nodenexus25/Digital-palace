import type { Metadata } from 'next';
import FortsClient from './FortsClient';
import { fortCards } from '@/content/listings';
import { toLocale } from '@/i18n/config';
import { translate } from '@/i18n/messages';
import { alternatesFor } from '@/i18n/metadata';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  return {
    title: translate(lang, 'forts.metaTitle'),
    description: translate(lang, 'forts.metaDescription'),
    alternates: alternatesFor(lang, '/forts'),
  };
}

export default async function FortsPage({ params }: Props) {
  const lang = toLocale((await params).lang);
  // Stories and long history are fetched when a fort is opened.
  return <FortsClient forts={fortCards(lang)} />;
}
