import type { Metadata } from 'next';
import LegendsClient from './LegendsClient';
import { legendCards } from '@/content/listings';
import { toLocale } from '@/i18n/config';
import { translate } from '@/i18n/messages';
import { alternatesFor } from '@/i18n/metadata';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  return {
    title: translate(lang, 'meta.legendsTitle'),
    description: translate(lang, 'meta.legendsDesc'),
    alternates: alternatesFor(lang, '/stories'),
  };
}

export default async function LegendsPage({ params }: Props) {
  const lang = toLocale((await params).lang);
  return <LegendsClient legends={legendCards(lang)} />;
}
