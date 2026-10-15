import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// All public pages live under app/[lang]/* . This middleware redirects
// unprefixed requests (e.g. /forts) to /{lang}/forts based on the user's
// saved language cookie or Accept-Language header, defaulting to 'en'.
const SUPPORTED_LANGS = ['en', 'hi'] as const;

function pickLanguage(request: NextRequest): string {
  // 1. Saved cookie
  const cookieLang = request.cookies.get('rajputana-language')?.value;
  if (cookieLang && SUPPORTED_LANGS.includes(cookieLang as (typeof SUPPORTED_LANGS)[number])) {
    return cookieLang;
  }
  // 2. Accept-Language header
  const acceptLang = request.headers.get('accept-language') || '';
  const primary = acceptLang.split(',')[0]?.split('-')[0]?.toLowerCase();
  if (primary && SUPPORTED_LANGS.includes(primary as (typeof SUPPORTED_LANGS)[number])) {
    return primary;
  }
  // 3. Default
  return 'en';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/');
  const firstSegment = segments[1];

  // Already language-prefixed — sync the cookie to the URL language so the
  // saved preference stays consistent with what the user is actually viewing,
  // then let the request through.
  if (firstSegment === 'en' || firstSegment === 'hi') {
    const response = NextResponse.next();
    response.cookies.set('rajputana-language', firstSegment, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  // Everything in the public app needs a language prefix. API, _next, studio,
  // and static assets are excluded by the matcher, but we also guard here.
  const lang = pickLanguage(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Match all paths except: _next static assets, api routes, studio, and
  // common static file extensions.
  matcher: [
    '/((?!_next|api|studio|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|woff|woff2|ttf|eot|txt|xml|json)$).*)',
  ],
};
