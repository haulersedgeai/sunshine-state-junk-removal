import type { Metadata } from 'next';
import { CityDumpsterPage } from '@/components/CityDumpsterPage';
import { dumpsterCityContent } from '@/data/city-content';
import { pageMetadata } from '@/lib/seo';

const content = dumpsterCityContent['/dumpster-rentals-in-weston-florida/'];

export const metadata: Metadata = pageMetadata({
  title: 'Dumpster Rental in Weston FL | Sunshine State Junk Removal',
  description:
    'Driveway-safe dump trailer rentals in Weston, FL. Right-sized trailers, clear pricing, and fast delivery from Sunshine State Junk Removal.',
  path: '/dumpster-rentals-in-weston-florida/',
});

export default function Page() {
  return <CityDumpsterPage content={content} />;
}
