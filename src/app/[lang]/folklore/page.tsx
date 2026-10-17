import type { Metadata } from 'next';
import FolkloreClient from './FolkloreClient';
import { folkCards } from '@/content/listings';
import { toLocale } from '@/i18n/config';
import { translate } from '@/i18n/messages';
import { alternatesFor } from '@/i18n/metadata';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  return {
    title: translate(lang, 'meta.folkloreTitle'),
    description: translate(lang, 'meta.folkloreDesc'),
    alternates: alternatesFor(lang, '/folklore'),
  };
}

export default async function FolklorePage({ params }: Props) {
  const lang = toLocale((await params).lang);
  const { tales, deities, rituals } = folkCards(lang);
  return <FolkloreClient tales={tales} deities={deities} rituals={rituals} />;
}
