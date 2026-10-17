import type { Metadata } from 'next';
import DynastiesClient from './DynastiesClient';
import { getListing } from '@/content/listings';
import { toLocale } from '@/i18n/config';
import { translate } from '@/i18n/messages';
import { alternatesFor } from '@/i18n/metadata';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  return {
    title: translate(lang, 'meta.dynastiesTitle'),
    description: translate(lang, 'meta.dynastiesDesc'),
    alternates: alternatesFor(lang, '/dynasties'),
  };
}

export default async function DynastiesPage({ params }: Props) {
  const lang = toLocale((await params).lang);
  const { dynasties, periods } = getListing(lang, 'dynasties');
  return <DynastiesClient dynasties={dynasties} periods={periods} />;
}
