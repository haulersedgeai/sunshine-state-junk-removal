import type { Metadata } from 'next';
import { getLocationById } from '@/data/locations';
import { LocationPage } from '@/components/LocationPage';

// Canonical, og:url, and og:image are hard-coded to the production www host
// per the second-location brief — they must never resolve to the apex or a
// Vercel preview host, so NEXT_PUBLIC_SITE_URL is deliberately not trusted here.
const PAGE_URL = 'https://www.sunshineremoval.com/locations/coral-springs/';
const OG_IMAGE = 'https://www.sunshineremoval.com/images/Sunshine-About-Us.webp';
const TITLE = 'Junk Removal & Dumpster Rental in Coral Springs, FL'; // 51 chars
const DESCRIPTION =
  'Family- and veteran-owned junk removal and dumpster rentals dispatched from Coral Springs, serving north Broward and south Palm Beach County.'; // 141 chars

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
  'Sunshine State Junk Removal & Dumpster Rental is a family- and veteran-owned company, and Coral Springs is where it started. This is our original and primary location, and it remains home base for the crews serving north Broward and south Palm Beach County. Junk removal appointments and dumpster rental deliveries on this side of our service area are dispatched from Coral Springs.',
  "From here we cover Coral Springs itself along with neighboring communities like Parkland, Coconut Creek, Margate, and Tamarac, and our coverage runs up the coast through Pompano Beach into Boca Raton. If you're in one of these cities, the crew that arrives at your door — or the trailer that lands in your driveway — comes from this location.",
  "Both of our services run out of this location: full-service junk removal, where our crew handles the lifting, loading, and hauling, and driveway-safe dumpster rentals you load at your own pace. To get started, call us or send a few photos of what you need gone and we'll schedule from there.",
];

export default function CoralSpringsLocationPage() {
  return (
    <LocationPage
      location={getLocationById('coral-springs')}
      intro={INTRO}
      photo={{
        src: '/images/Sunshine-About-Us.webp',
        alt: 'Sunshine State Junk Removal crew at the Coral Springs location',
      }}
    />
  );
}
