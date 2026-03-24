import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/');
  const first = segments[1];

  if (first === 'en' || first === 'hi') {
    const locale = first;
    const restPath = segments.slice(2).join('/');
    const destinationPath = `/${restPath}`;
    const url = new URL(destinationPath === '/' ? '/' : destinationPath, request.url);
    const response = NextResponse.rewrite(url);
    response.cookies.set('rajputana-language', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365
    });
    return response;
  }

  return NextResponse.next();
}

