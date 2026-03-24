import { Metadata } from 'next';
import LegendsClient from './LegendsClient';
import type { GalleryImage, GalleryVideo } from '../components/MediaGallery';
import { allLegends } from './legendsData';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rajputanadigitalpalace.com';

export type Legend = {
 id: string;
 title: string;
 hook: string;
 category: string;
 era: string;
 location: string;
 story: string[];
 coverImage: GalleryImage;
 galleryImages?: GalleryImage[];
 galleryVideos?: GalleryVideo[];
};

export const metadata: Metadata = {
 title: 'Legends of Rajputana | Rajputana Digital Palace',
 description: 'A cinematic tapestry of war, sacrifice, and immortal Rajputana legends.',
 alternates: {
 canonical: `${baseUrl}/stories`,
 },
 robots: {
 index: true,
 follow: true,
 },
};

export default function LegendsPage() {
 return <LegendsClient legends={allLegends} />;
}
