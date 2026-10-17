import { NextResponse } from 'next/server';
import { getListing, getListingParams, isListingKey } from '@/content/listings';
import { isLocale } from '@/i18n/config';

// Static JSON per listing per language, generated at build time. A story card
// fetches this to show the same card text in the other language.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getListingParams();
}

type RouteParams = { params: Promise<{ lang: string; key: string }> };

export async function GET(_req: Request, { params }: RouteParams) {
  const { lang, key } = await params;
  if (!isLocale(lang) || !isListingKey(key)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(getListing(lang, key));
}
