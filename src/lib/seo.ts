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

// OG/Twitter images resolve through the canonical host, same as every other
// absolute URL on the site. (A pre-cutover NEXT_PUBLIC_OG_HOST override used to
// point these at the *.vercel.app deployment host so share cards wouldn't 404
// while the domain still resolved to the old WordPress host. DNS has since cut
// over, so that override is gone — it was pinning share images to a
// non-canonical host.)
const ogAbsolute = (path: string) => absoluteUrl(path);

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
