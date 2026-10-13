import DynastiesClient from './DynastiesClient';
import { dynastiesData } from './data';

export const metadata = {
  title: 'Rajput Dynasties of India | Royal Lineages & Legacy',
  description:
    'Explore the major Rajput dynasties of India — Mewar, Marwar, Amber, Bikaner, Jaisalmer, and Bundi — their founders, capitals, notable rulers, and enduring legacy.',
};

export const revalidate = 3600;

export default function DynastiesPage() {
  return <DynastiesClient dynasties={dynastiesData} />;
}
