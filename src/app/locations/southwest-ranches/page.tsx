import type { Metadata } from 'next';
import { getLocationById } from '@/data/locations';
import { LocationPage } from '@/components/LocationPage';

// Canonical, og:url, and og:image are hard-coded to the production www host
// per the second-location brief — they must never resolve to the apex or a
// Vercel preview host, so NEXT_PUBLIC_SITE_URL is deliberately not trusted here.
const PAGE_URL = 'https://www.sunshineremoval.com/locations/southwest-ranches/';
const OG_IMAGE = 'https://www.sunshineremoval.com/images/Sunshine-About-Us.webp';
const TITLE = 'Junk Removal & Dumpster Rental in Southwest Ranches, FL'; // 55 chars
const DESCRIPTION =
  'Junk removal and dumpster rentals dispatched from our Southwest Ranches location at 5011 SW 210 Terrace, serving southwest and south Broward County.'; // 148 chars

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: 'Sunshine State Junk Removal',
    images: [{ url: OG_IMAGE, width: 1920, height: 1000, alt: 'Sunshine State Junk Removal' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const INTRO = [
  'Sunshine State Junk Removal & Dumpster Rental now operates a second location at 5011 SW 210 Terrace, Southwest Ranches, FL 33332. This branch was opened to serve southwest and south Broward County, and it puts our crews and equipment closer to the communities on this side of the county. Junk removal appointments and dumpster rental deliveries in this territory are dispatched from Southwest Ranches.',
  'From this branch we cover Southwest Ranches along with Weston, Davie, Cooper City, Pembroke Pines, and Miramar, and our coverage continues east through Hollywood. If your home or project is in one of these cities, the crew handling your junk removal — or delivering and picking up your dumpster — is dispatched from here.',
  "Like our original Coral Springs location, this branch is part of the same family- and veteran-owned company and offers the same two services: full-service junk removal, where our crew does the loading and hauling, and driveway-safe dumpster rentals you load on your own schedule. To get started, call or text a few photos of your project and we'll take care of the rest.",
];

export default function SouthwestRanchesLocationPage() {
  return (
    <LocationPage
      location={getLocationById('southwest-ranches')}
      intro={INTRO}
      photo={{
        src: '/images/yellow-dumpster-sunshines-state2.webp',
        alt: 'Sunshine State dump trailer dispatched from the Southwest Ranches location',
      }}
    />
  );
}
