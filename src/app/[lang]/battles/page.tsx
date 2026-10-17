import type { Metadata } from 'next';
import BattlesClient from './BattlesClient';
import { battleCards, figureCards } from '@/content/listings';
import { toLocale } from '@/i18n/config';
import { translate } from '@/i18n/messages';
import { alternatesFor } from '@/i18n/metadata';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  return {
    title: translate(lang, 'meta.battlesTitle'),
    description: translate(lang, 'meta.battlesDesc'),
    alternates: alternatesFor(lang, '/battles'),
  };
}

export default async function BattlesPage({ params }: Props) {
  const lang = toLocale((await params).lang);
  return <BattlesClient battles={battleCards(lang)} figures={figureCards(lang)} />;
}
