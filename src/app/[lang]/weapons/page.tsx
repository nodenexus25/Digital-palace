import type { Metadata } from 'next';
import WeaponsClient from './WeaponsClient';
import { getArmory } from '@/content/weapons';
import { toLocale } from '@/i18n/config';
import { translate } from '@/i18n/messages';
import { alternatesFor } from '@/i18n/metadata';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  return {
    title: translate(lang, 'meta.weaponsTitle'),
    description: translate(lang, 'meta.weaponsDesc'),
    alternates: alternatesFor(lang, '/weapons'),
  };
}

export default async function WeaponsPage({ params }: Props) {
  const lang = toLocale((await params).lang);
  const { categories, weapons } = getArmory(lang);
  return <WeaponsClient categories={categories} weapons={weapons} />;
}
