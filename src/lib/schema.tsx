import { getSite, getServices, getServiceAreas, absoluteUrl, SITE_URL } from '@/data';

const site = getSite();
const services = getServices();
const areas = getServiceAreas();

const allAreasServed = [
  ...areas.fullAreasServed.browardCounty,
  ...areas.fullAreasServed.miamiDade,
  ...areas.fullAreasServed.palmBeach,
].map((c) => ({ '@type': 'City', name: `${c}, FL` }));

export const orgSchema = () => ({
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE_URL}/#localbusiness`,
  name: site.businessName,
  alternateName: site.shortName,
  url: SITE_URL,
  telephone: site.phone,
  email: site.email,
  image: absoluteUrl('/images/Sunshine-About-Us.webp'),
  logo: absoluteUrl('/images/Sunshine-Logo.svg'),
  priceRange: '$$',
  description:
    'Family- and veteran-owned junk removal and dump-trailer rentals serving Broward County, FL. Fast photo-based quotes, same-day availability, transparent volume-based pricing.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: site.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  areaServed: allAreasServed,
  sameAs: Object.values(site.socials),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
    bestRating: '5',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: services.coreServices.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.name,
        description: s.shortDesc,
      },
    })),
  },
});

export const serviceSchema = (opts: {
  name: string;
  description: string;
  slug: string;
  areaCity?: string;
}) => ({
  '@type': 'Service',
  name: opts.name,
  description: opts.description,
  provider: { '@id': `${SITE_URL}/#localbusiness` },
  areaServed: opts.areaCity
    ? { '@type': 'City', name: `${opts.areaCity}, FL` }
    : allAreasServed,
  url: absoluteUrl(opts.slug),
});

export const faqPageSchema = (faqs: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const speakableSchema = () => ({
  '@type': 'SpeakableSpecification',
  cssSelector: ['h1', '.speakable-answer'],
});

export const graph = (nodes: object[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes.map((n) => ({ ...n })),
});

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
