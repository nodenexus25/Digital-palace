import type { Metadata } from 'next';
import DynastiesClient from './DynastiesClient';
import { getDynasties, getHistoricalPeriods } from '@/content/dynasties';
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
  return <DynastiesClient dynasties={getDynasties(lang)} periods={getHistoricalPeriods(lang)} />;
}
