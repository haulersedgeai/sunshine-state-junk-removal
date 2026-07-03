#!/usr/bin/env node
/* eslint-disable */
const fs = require('fs');
const path = require('path');

const serviceCities = [
  { dir: 'cooper-city-florida', slug: '/cooper-city-florida/', city: 'Cooper City' },
  { dir: 'coral-springs-florida', slug: '/coral-springs-florida/', city: 'Coral Springs' },
  { dir: 'davie', slug: '/davie/', city: 'Davie' },
  { dir: 'hollywood', slug: '/hollywood/', city: 'Hollywood' },
  { dir: 'miramar', slug: '/miramar/', city: 'Miramar' },
  { dir: 'pembroke-pines', slug: '/pembroke-pines/', city: 'Pembroke Pines' },
  { dir: 'plantation', slug: '/plantation/', city: 'Plantation' },
  { dir: 'sunrise', slug: '/sunrise/', city: 'Sunrise' },
  { dir: 'tamarac-florida', slug: '/tamarac-florida/', city: 'Tamarac' },
  { dir: 'weston', slug: '/weston/', city: 'Weston' },
];

const dumpsterCities = [
  { dir: 'dumpster-rentals-in-cooper-city-florida', slug: '/dumpster-rentals-in-cooper-city-florida/', city: 'Cooper City' },
  { dir: 'dumpster-rentals-in-coral-spring-florida', slug: '/dumpster-rentals-in-coral-spring-florida/', city: 'Coral Springs' },
  { dir: 'dumpster-rentals-in-davie-florida', slug: '/dumpster-rentals-in-davie-florida/', city: 'Davie' },
  { dir: 'dumpster-rentals-in-ft-lauderdale-florida', slug: '/dumpster-rentals-in-ft-lauderdale-florida/', city: 'Ft. Lauderdale' },
  { dir: 'dumpster-rentals-in-hollywood-florida', slug: '/dumpster-rentals-in-hollywood-florida/', city: 'Hollywood' },
  { dir: 'dumpster-rentals-in-miramar-florida', slug: '/dumpster-rentals-in-miramar-florida/', city: 'Miramar' },
  { dir: 'dumpster-rentals-in-pembroke-pines-florida', slug: '/dumpster-rentals-in-pembroke-pines-florida/', city: 'Pembroke Pines' },
  { dir: 'dumpster-rentals-in-plantation-florida', slug: '/dumpster-rentals-in-plantation-florida/', city: 'Plantation' },
  { dir: 'dumpster-rentals-in-southwest-ranches-florida', slug: '/dumpster-rentals-in-southwest-ranches-florida/', city: 'Southwest Ranches' },
  { dir: 'dumpster-rentals-in-sunrise-florida', slug: '/dumpster-rentals-in-sunrise-florida/', city: 'Sunrise' },
  { dir: 'dumpster-rentals-in-tamarac-florida', slug: '/dumpster-rentals-in-tamarac-florida/', city: 'Tamarac' },
  { dir: 'dumpster-rentals-in-weston-florida', slug: '/dumpster-rentals-in-weston-florida/', city: 'Weston' },
];

const appDir = path.join(__dirname, '..', 'src', 'app');

for (const c of serviceCities) {
  const file = path.join(appDir, c.dir, 'page.tsx');
  const content = `import type { Metadata } from 'next';
import { CityServicePage } from '@/components/CityServicePage';
import { serviceCityContent } from '@/data/city-content';
import { pageMetadata } from '@/lib/seo';

const content = serviceCityContent['${c.slug}'];

export const metadata: Metadata = pageMetadata({
  title: 'Junk Removal in ${c.city} FL | Sunshine State Junk Removal',
  description:
    'Get dependable junk removal in ${c.city}, FL. Fast photo quotes, same-day availability, and 5-star service from Sunshine State Junk Removal. Call today for a free quote!',
  path: '${c.slug}',
});

export default function Page() {
  return <CityServicePage content={content} />;
}
`;
  fs.writeFileSync(file, content);
}

for (const c of dumpsterCities) {
  const file = path.join(appDir, c.dir, 'page.tsx');
  const content = `import type { Metadata } from 'next';
import { CityDumpsterPage } from '@/components/CityDumpsterPage';
import { dumpsterCityContent } from '@/data/city-content';
import { pageMetadata } from '@/lib/seo';

const content = dumpsterCityContent['${c.slug}'];

export const metadata: Metadata = pageMetadata({
  title: 'Dumpster Rental in ${c.city} FL | Sunshine State Junk Removal',
  description:
    'Driveway-safe dump trailer rentals in ${c.city}, FL. Right-sized trailers, clear pricing, and fast delivery from Sunshine State Junk Removal.',
  path: '${c.slug}',
});

export default function Page() {
  return <CityDumpsterPage content={content} />;
}
`;
  fs.writeFileSync(file, content);
}

console.log('Generated', serviceCities.length + dumpsterCities.length, 'city pages.');
