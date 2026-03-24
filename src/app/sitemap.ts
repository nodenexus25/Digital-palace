import { MetadataRoute } from 'next';

export const revalidate = 3600;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rajputanadigitalpalace.com';
const locales = ['en', 'hi'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
 const coreRoutes = [
 '',
 '/dynasties',
 '/forts',
 '/stories',
 '/battles',
 '/weapons',
 '/festivals',
 '/folklore',
 '/blogs',
 '/privacy',
 '/terms',
 ];

 const localizedRoutes: MetadataRoute.Sitemap = coreRoutes.flatMap((route) =>
 locales.map((locale) => ({
 url: `${baseUrl}/${locale}${route}`,
 lastModified: new Date(),
 changeFrequency: 'weekly' as const,
 priority: route === '' ? 1 : 0.8,
 }))
 );

 return localizedRoutes;
}
