import type { Metadata } from 'next';
import { CityDumpsterPage } from '@/components/CityDumpsterPage';
import { dumpsterCityContent } from '@/data/city-content';
import { pageMetadata } from '@/lib/seo';

const content = dumpsterCityContent['/dumpster-rentals-in-hollywood-florida/'];

export const metadata: Metadata = pageMetadata({
  title: 'Dumpster Rental in Hollywood FL | Sunshine State Junk Removal',
  description:
    'Driveway-safe dump trailer rentals in Hollywood, FL. Right-sized trailers, clear pricing, and fast delivery from Sunshine State Junk Removal.',
  path: '/dumpster-rentals-in-hollywood-florida/',
});

export default function Page() {
  return <CityDumpsterPage content={content} />;
}
