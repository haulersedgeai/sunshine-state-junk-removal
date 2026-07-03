import Link from 'next/link';
import { Metadata } from 'next';
import { getServiceAreas, getSite } from '@/data';
import { pageMetadata } from '@/lib/seo';
import { SectionHeading } from '@/components/SectionHeading';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { AreasServed } from '@/components/AreasServed';
import { ServiceMapLoader } from '@/components/ServiceMapLoader';
import { ChevronRightIcon } from '@/components/Icon';

export const metadata: Metadata = pageMetadata({
  title: 'Service Areas | Sunshine State Junk Removal',
  description:
    'Junk removal & dump-trailer rentals across Broward County, FL — plus select service in Miami-Dade and Palm Beach. Find your city.',
  path: '/service-areas/',
});

export default function ServiceAreasPage() {
  const areas = getServiceAreas();
  const site = getSite();

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Service Areas', href: '/service-areas/' }]} />

      <section className="section">
        <div className="container-p">
          <SectionHeading
            as="h1"
            eyebrow="Service areas"
            title="Junk removal & dumpster rentals across Broward County."
            intro={site.serviceAreaSummary + ' Not sure if we cover your area? Ask when you get in touch — we’re flexible on nearby jobs.'}
          />
        </div>
      </section>

      <section className="pb-6">
        <div className="container-p">
          <SectionHeading eyebrow="City pages" title="Explore our top service cities." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.serviceAreaPages.map((c) => (
              <Link key={c.slug} href={c.slug} className="group flex items-center justify-between rounded-2xl bg-white ring-1 ring-navy-100 p-5 no-underline shadow-card hover:-translate-y-0.5 hover:shadow-lg transition-all">
                <div>
                  <p className="m-0 text-xs uppercase tracking-widest text-sun-600 font-semibold">Junk removal</p>
                  <p className="m-0 text-navy-900 font-semibold text-lg">{c.city}, {c.state}</p>
                </div>
                <ChevronRightIcon className="h-4 w-4 text-navy-700 group-hover:text-sun-600" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-p">
          <SectionHeading eyebrow="Dumpster rentals" title="Dump trailer rentals by city." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.dumpsterRentalPages.map((c) => (
              <Link key={c.slug} href={c.slug} className="group flex items-center justify-between rounded-2xl bg-white ring-1 ring-navy-100 p-5 no-underline shadow-card hover:-translate-y-0.5 hover:shadow-lg transition-all">
                <div>
                  <p className="m-0 text-xs uppercase tracking-widest text-sun-600 font-semibold">Dump trailer rentals</p>
                  <p className="m-0 text-navy-900 font-semibold text-lg">{c.city}, {c.state}</p>
                </div>
                <ChevronRightIcon className="h-4 w-4 text-navy-700 group-hover:text-sun-600" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-sky-soft/60">
        <div className="container-p">
          <SectionHeading eyebrow="Full coverage" title="Every city we serve." intro="Full towns list — reach out if yours isn’t here." />
          <div className="mt-10">
            <AreasServed />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-p overflow-hidden rounded-3xl ring-1 ring-navy-100 shadow-card">
          <ServiceMapLoader height={520} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
