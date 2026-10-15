import { NextResponse } from 'next/server';
import { getRulerDetail, getRulerParams } from '@/content/dynasties';
import { isLocale, locales } from '@/i18n/config';

// One static JSON file per ruler per language, generated at build time and
// served from the CDN. The dynasties page fetches a ruler only when opened.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => getRulerParams().map((p) => ({ lang, ...p })));
}

type RouteParams = { params: Promise<{ lang: string; dynastyId: string; rulerId: string }> };

export async function GET(_req: Request, { params }: RouteParams) {
  const { lang, dynastyId, rulerId } = await params;
  const ruler = isLocale(lang) ? getRulerDetail(lang, dynastyId, rulerId) : null;
  if (!ruler) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(ruler);
}
