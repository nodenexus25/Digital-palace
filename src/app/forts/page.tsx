import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { serverTranslate, type Language } from '../utils/languages';
import FortsClient from './FortsClient';
import { monumentsData } from './data';

export async function generateMetadata({
 searchParams,
}: {
 searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
 const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rajputanadigitalpalace.com';
 const resolvedSearchParams = await searchParams;
 const isFiltered = Object.keys(resolvedSearchParams).some(
 (key) => key !== 'page' && key !== 'pageNumber',
 );
 const cookieStore = await cookies();
 const lang = (cookieStore.get('rajputana-language')?.value || 'en') as Language;
 const title = serverTranslate(lang, 'forts.metaTitle');
 const description = serverTranslate(lang, 'forts.metaDescription');

 return {
 title,
 description,
 alternates: {
 canonical: `${baseUrl}/forts`,
 },
 robots: {
 index: !isFiltered,
 follow: true,
 },
 };
}

// Revalidate every 30 minutes (1800 seconds) - consistent with backend cache
export const revalidate = 1800;

export default async function FortsPage() {
 return <FortsClient initialForts={monumentsData} />;
}
