import type { Metadata } from 'next';
import { absoluteUrl, SITE_URL } from '@/data';

export type PageMetaOpts = {
  title: string;
  description: string;
  path: string; // e.g., '/', '/about-us/'
  ogImage?: string; // relative path in /public
  noindex?: boolean;
};

const DEFAULT_OG = '/images/Sunshine-About-Us.webp';

export function pageMetadata(opts: PageMetaOpts): Metadata {
  const url = absoluteUrl(opts.path);
  const ogImage = absoluteUrl(opts.ogImage || DEFAULT_OG);
  return {
    metadataBase: new URL(SITE_URL),
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: 'Sunshine State Junk Removal',
      images: [{ url: ogImage, width: 1920, height: 1000, alt: 'Sunshine State Junk Removal' }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [ogImage],
    },
  };
}
