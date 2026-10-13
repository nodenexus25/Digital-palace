import { NextResponse } from 'next/server';
import { getRulerDetail } from '../../../../../dynasties/data';

export const revalidate = 3600;

type RouteParams = {
  params: Promise<{ dynastyId: string; rulerId: string }>;
};

export async function GET(_req: Request, { params }: RouteParams) {
  const { dynastyId, rulerId } = await params;
  const ruler = getRulerDetail(dynastyId, rulerId);
  if (!ruler) {
    return NextResponse.json({ error: 'Ruler not found' }, { status: 404 });
  }
  return NextResponse.json(ruler, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
