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

export const junkRemovalOfferSchema = () => {
  const jr = services.pricing.junkRemoval;
  return {
    '@type': 'Service',
    name: 'Junk Removal',
    description:
      'Full-service junk removal in Broward County, FL. Volume-based pricing in an 18-yard dump trailer — labor and disposal included.',
    provider: { '@id': `${SITE_URL}/#localbusiness` },
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
  const flat = dr.sizes.flatMap((s) =>
    s.durations.map((d) => ({
      '@type': 'Offer',
      name: `${s.size} Dump Trailer Rental — ${d.duration}`,
      priceCurrency: 'USD',
      price: d.price,
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: d.price,
        priceCurrency: 'USD',
        valueAddedTaxIncluded: false,
        description: `Base rental price. Dump fees billed separately at $${dr.dumpFeePerTon} per ton.`,
      },
    })),
  );
  return {
    '@type': 'Service',
    name: 'Dump Trailer Rental',
    description:
      'Driveway-safe 18-yard and 21-yard dump trailer rentals in Broward County, FL. Flat rental rates plus dump fees at $140/ton.',
    provider: { '@id': `${SITE_URL}/#localbusiness` },
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
      const cheapest = Math.min(...s.durations.map((x) => x.price));
      return {
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          '@id': `${SITE_URL}/dumpster-rentals/#size-${d.volumeYd}yd`,
          name: `${d.volumeYd}-Yard Dump Trailer`,
          description: s.description,
          brand: { '@id': `${SITE_URL}/#localbusiness` },
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
            price: cheapest,
            availability: 'https://schema.org/InStock',
            areaServed: allAreasServed,
            seller: { '@id': `${SITE_URL}/#localbusiness` },
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
