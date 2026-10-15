import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { SITE_URL } from '@/i18n/metadata';

export const revalidate = 3600;

const ROUTES = ['', '/dynasties', '/forts', '/stories', '/battles', '/weapons', '/festivals', '/folklore', '/blogs', '/privacy', '/terms'];

// Every page is listed once per language, each entry pointing at all of its
// language versions (hreflang), so search engines serve the right one.
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((route) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${route}`])),
      },
    })),
  );
}
