'use client';

import dynamic from 'next/dynamic';

// Leaflet only runs in the browser; dynamic import with ssr:false keeps SSG
// working. Renders a lightweight skeleton at build time.
const ServiceMap = dynamic(() => import('./ServiceMap'), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      aria-label="Loading service area map"
      className="w-full rounded-3xl bg-sky-soft/70 ring-1 ring-navy-100 animate-pulse"
      style={{ height: 460 }}
    />
  ),
});

export function ServiceMapLoader({ height }: { height?: number }) {
  return <ServiceMap height={height} />;
}
