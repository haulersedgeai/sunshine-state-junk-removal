import type { MetadataRoute } from 'next';
import { getServiceAreas, SITE_URL } from '@/data';
import { getLocations } from '@/data/locations';

export default function sitemap(): MetadataRoute.Sitemap {
  const areas = getServiceAreas();
  const now = new Date();

  const staticPaths = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/about-us/', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/what-we-take/', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/pricing/', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/dumpster-rentals/', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/service-areas/', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact-us/', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/faqs/', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/terms-and-condition/', priority: 0.2, changeFrequency: 'yearly' as const },
    { path: '/privacy-policy/', priority: 0.2, changeFrequency: 'yearly' as const },
  ];

  const cityService = areas.serviceAreaPages.map((c) => ({
    path: c.slug,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  }));

  const cityDumpster = areas.dumpsterRentalPages.map((c) => ({
    path: c.slug,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  // Location pages are pinned to the production www host (matching their
  // hard-coded canonicals) rather than trusting NEXT_PUBLIC_SITE_URL.
  const locationPages = getLocations().map((l) => ({
    url: `https://www.sunshineremoval.com${l.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [
    ...[...staticPaths, ...cityService, ...cityDumpster].map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...locationPages,
  ];
}
