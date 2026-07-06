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

// Pre-launch: the canonical domain (sunshineremoval.com) still points at the
// old WordPress host, so OG/Twitter images resolved through that host will 404
// in social preview cards. Route social-preview image URLs through the current
// deployment host instead, while keeping canonicals on the production domain.
// After DNS cutover to Vercel, unset NEXT_PUBLIC_OG_HOST so this falls back to
// SITE_URL and the workaround becomes a no-op.
const OG_HOST = (process.env.NEXT_PUBLIC_OG_HOST || '').replace(/\/$/, '') || SITE_URL;
const ogAbsolute = (path: string) => {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${OG_HOST}${clean}`;
};

export function pageMetadata(opts: PageMetaOpts): Metadata {
  const url = absoluteUrl(opts.path);
  const ogImage = ogAbsolute(opts.ogImage || DEFAULT_OG);
  return {
    metadataBase: new URL(SITE_URL),
    // Use `absolute` so the layout template ("%s | Sunshine State Junk Removal")
    // doesn't append the brand a second time — each page title already includes it.
    title: { absolute: opts.title },
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
