import { getSite, getServices, getServiceAreas, absoluteUrl, SITE_URL } from '@/data';
import { getLocations, type BusinessLocation } from '@/data/locations';

const site = getSite();
const services = getServices();
const areas = getServiceAreas();

const allAreasServed = [
  ...areas.fullAreasServed.browardCounty,
  ...areas.fullAreasServed.miamiDade,
  ...areas.fullAreasServed.palmBeach,
].map((c) => ({ '@type': 'City', name: `${c}, FL` }));

// Hard-coded canonical host for the entity graph (@ids). The Organization and
// location LocalBusiness nodes are cross-referenced from multiple pages and
// support a second Google Business Profile, so their identity must never
// follow NEXT_PUBLIC_SITE_URL onto a preview host.
const CANONICAL_HOST = 'https://www.sunshineremoval.com';
export const ORG_ID = `${CANONICAL_HOST}/#organization`;
export const locationId = (loc: BusinessLocation) => `${CANONICAL_HOST}${loc.slug}#location`;

// Sitewide Organization node (rendered from the root layout, so it appears on
// the homepage and every other page). This replaced the former sitewide
// HomeAndConstructionBusiness node with the Coral Springs NAP — that entity now
// lives on /locations/coral-springs/ as a LocalBusiness (see locationSchema).
export const organizationSchema = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: site.businessName,
  url: `${CANONICAL_HOST}/`,
  logo: `${CANONICAL_HOST}/images/Sunshine-Logo.svg`,
  sameAs: Object.values(site.socials),
  subOrganization: getLocations().map((loc) => ({ '@id': locationId(loc) })),
});

// One authoritative LocalBusiness node per physical location, emitted only on
// that location's page. Phone / geo / hours are conditionally omitted while the
// data file holds null — no placeholder values may ship.
export const locationSchema = (loc: BusinessLocation) => ({
  '@type': 'LocalBusiness',
  '@id': locationId(loc),
  name: site.businessName,
  url: `${CANONICAL_HOST}${loc.slug}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: loc.address.street,
    addressLocality: loc.address.city,
    addressRegion: loc.address.state,
    postalCode: loc.address.zip,
    ...(loc.address.country ? { addressCountry: loc.address.country } : {}),
  },
  ...(loc.phone ? { telephone: loc.phone } : {}),
  ...(loc.geo
    ? {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: loc.geo.lat,
          longitude: loc.geo.lng,
        },
      }
    : {}),
  ...(loc.hours
    ? {
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: loc.hours.days,
            opens: loc.hours.opens,
            closes: loc.hours.closes,
          },
        ],
      }
    : {}),
  areaServed: loc.citiesServed.map((c) => ({ '@type': 'City', name: `${c}, FL` })),
  parentOrganization: { '@id': ORG_ID },
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
  provider: { '@id': ORG_ID },
  areaServed: opts.areaCity
    ? { '@type': 'City', name: `${opts.areaCity}, FL` }
    : allAreasServed,
  url: absoluteUrl(opts.slug),
});

export const junkRemovalOfferSchema = () => {
  const jr = services.pricing.junkRemoval;
  return {
    '@type': 'Service',
    name: 'Junk Removal',
    description:
      'Full-service junk removal in Broward County, FL. Volume-based pricing in an 18-yard dump trailer — labor and disposal included.',
    provider: { '@id': ORG_ID },
    areaServed: allAreasServed,
    url: absoluteUrl('/pricing/'),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: jr.priceFrom,
      highPrice: jr.priceTo,
      offerCount: jr.tiers.length,
      offers: jr.tiers.map((t) => ({
        '@type': 'Offer',
        name: `Junk Removal — ${t.label}`,
        priceCurrency: 'USD',
        price: t.price,
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: t.price,
          priceCurrency: 'USD',
          valueAddedTaxIncluded: false,
        },
      })),
    },
  };
};

export const dumpsterRentalOfferSchema = () => {
  const dr = services.pricing.dumpsterRental;
  const flat = dr.sizes.map((s) => ({
    '@type': 'Offer',
    name: `${s.size} Dump Trailer — flat rate`,
    priceCurrency: 'USD',
    price: s.price,
    priceSpecification: {
      '@type': 'PriceSpecification',
      price: s.price,
      priceCurrency: 'USD',
      valueAddedTaxIncluded: false,
      description: `${dr.included}. Weight over the included tonnage is charged by weight at a rate of $${dr.overagePerTon} per ton.`,
    },
  }));
  return {
    '@type': 'Service',
    name: 'Dump Trailer Rental',
    description:
      'Driveway-safe 18-yard and 21-yard dump trailer rentals. Serving all of Broward and Palm Beach Counties. Miami-Dade available by appointment only — restrictions apply.',
    provider: { '@id': ORG_ID },
    areaServed: allAreasServed,
    url: absoluteUrl('/dumpster-rentals/'),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: dr.priceFrom,
      highPrice: dr.priceTo,
      offerCount: flat.length,
      offers: flat,
    },
  };
};

export const dumpsterSizeItemListSchema = () => {
  const dr = services.pricing.dumpsterRental;
  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/dumpster-rentals/#sizes`,
    name: 'Dump Trailer Sizes and Specifications',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: dr.sizes.length,
    itemListElement: dr.sizes.map((s, i) => {
      const d = s.dimensions;
      return {
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          '@id': `${SITE_URL}/dumpster-rentals/#size-${d.volumeYd}yd`,
          name: `${d.volumeYd}-Yard Dump Trailer`,
          description: s.description,
          brand: { '@id': ORG_ID },
          category: 'Dump Trailer Rental',
          width: {
            '@type': 'QuantitativeValue',
            value: d.widthFt,
            unitCode: 'FOT',
            unitText: 'feet',
          },
          height: {
            '@type': 'QuantitativeValue',
            value: d.heightFt,
            unitCode: 'FOT',
            unitText: 'feet',
          },
          depth: {
            '@type': 'QuantitativeValue',
            value: d.lengthFt,
            unitCode: 'FOT',
            unitText: 'feet',
          },
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'Capacity',
              value: d.volumeYd,
              unitCode: 'YDQ',
              unitText: 'cubic yards',
            },
            {
              '@type': 'PropertyValue',
              name: 'Length',
              value: d.lengthFt,
              unitCode: 'FOT',
              unitText: 'feet',
            },
          ],
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: s.price,
            availability: 'https://schema.org/InStock',
            areaServed: allAreasServed,
            seller: { '@id': ORG_ID },
            url: absoluteUrl('/dumpster-rentals/'),
          },
        },
      };
    }),
  };
};

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
