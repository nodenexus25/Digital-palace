import { NextResponse } from 'next/server';
import { getStory, getStoryParams, isStoryCollection } from '@/content/stories';
import { isLocale } from '@/i18n/config';

// Static JSON per story per language, generated at build time.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getStoryParams();
}

type RouteParams = { params: Promise<{ lang: string; collection: string; id: string }> };

export async function GET(_req: Request, { params }: RouteParams) {
  const { lang, collection, id } = await params;
  const story = isLocale(lang) && isStoryCollection(collection) ? getStory(lang, collection, id) : null;
  if (!story) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(story);
}
