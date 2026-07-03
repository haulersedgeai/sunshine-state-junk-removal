import Link from 'next/link';
import { absoluteUrl } from '@/data';

export type Crumb = { label: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.href),
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="container-p pt-6">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-ink-muted">
          {items.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1">
              {i > 0 && <span className="text-ink-muted/60">/</span>}
              {i < items.length - 1 ? (
                <Link href={c.href} className="text-ink-muted hover:text-navy-800 no-underline">
                  {c.label}
                </Link>
              ) : (
                <span className="text-navy-900 font-medium">{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
