import type { Metadata } from 'next';
import FestivalsClient from './FestivalsClient';
import { getFestivals } from '@/content/festivals';
import { toLocale } from '@/i18n/config';
import { translate } from '@/i18n/messages';
import { alternatesFor } from '@/i18n/metadata';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  return {
    title: translate(lang, 'meta.festivalsTitle'),
    description: translate(lang, 'meta.festivalsDesc'),
    alternates: alternatesFor(lang, '/festivals'),
  };
}

export default async function FestivalsPage({ params }: Props) {
  const lang = toLocale((await params).lang);
  return <FestivalsClient festivals={getFestivals(lang)} />;
}
