import Image from 'next/image';
import Link from 'next/link';
import { getSite, getServices } from '@/data';
import { formattedLocationAddress, type BusinessLocation } from '@/data/locations';
import { SectionHeading } from './SectionHeading';
import { Breadcrumbs } from './Breadcrumbs';
import { CTASection } from './CTASection';
import { ServiceCard } from './ServiceCard';
import { Button } from './Button';
import { JsonLd, graph, locationSchema } from '@/lib/schema';
import { PhoneIcon, ClockIcon, MapPinIcon } from './Icon';

// The six Wave 1 city pages under /junk-removal/. Per the second-location
// brief, these are the ONLY cities that link out from a location page's
// city list — every other city renders as plain text (no new city pages).
const WAVE1_CITY_PAGES: Record<string, string> = {
  'Coral Springs': '/junk-removal/coral-springs/',
  'Coconut Creek': '/junk-removal/coconut-creek/',
  Margate: '/junk-removal/margate/',
  Parkland: '/junk-removal/parkland/',
  Tamarac: '/junk-removal/tamarac/',
  Sunrise: '/junk-removal/sunrise/',
};

export function LocationPage({
  location,
  intro,
  photo,
}: {
  location: BusinessLocation;
  intro: string[];
  photo: { src: string; alt: string };
}) {
  const site = getSite();
  const services = getServices();

  // Coral Springs (primary) pins the map to the street address; the branch
  // map centers on its coordinates.
  const mapSrc =
    location.role === 'primary'
      ? `https://www.google.com/maps?q=${encodeURIComponent(formattedLocationAddress(location))}&output=embed`
      : `https://www.google.com/maps?q=${location.geo.lat},${location.geo.lng}&z=14&output=embed`;

  return (
    <>
      <JsonLd data={graph([locationSchema(location)])} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: `${location.label} Location`, href: location.slug },
        ]}
      />

      {/* HERO / INTRO */}
      <section className="section">
        <div className="container-p grid gap-10 lg:grid-cols-[1.15fr_1fr] items-start">
          <div>
            <p className="eyebrow">Our Locations · {location.label}, FL</p>
            <h1 className="mt-2">
              Junk Removal &amp; Dumpster Rental in {location.label}, FL
            </h1>
            {intro.map((p, i) => (
              <p key={i} className={`${i === 0 ? 'speakable-answer mt-5' : 'mt-4'} text-lg text-ink-soft max-w-2xl leading-relaxed`}>
                {p}
              </p>
            ))}
            <div className="mt-8">
              <Button href="/contact-us/#quote" size="lg" variant="primary">
                Get a fast quote
              </Button>
            </div>
          </div>

          <div>
            {location.role === 'primary' ? (
              /* TODO: replace with Coral Springs branch photo — awaiting client */
              <div className="relative aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-navy-100 shadow-card">
                <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            ) : (
              /* TODO: replace with SW Ranches branch photo — awaiting client */
              <div className="relative aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-navy-100 shadow-card">
                <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            )}

            {/* NAP */}
            <div className="mt-6 rounded-2xl bg-white ring-1 ring-navy-100 shadow-card p-6">
              <p className="m-0 font-semibold text-navy-900">{site.businessName}</p>
              <address className="not-italic mt-3 flex flex-col gap-2.5 text-sm text-ink-soft">
                <span className="inline-flex items-start gap-2">
                  <MapPinIcon className="h-4 w-4 mt-0.5 shrink-0 text-sun-600" />
                  <span>
                    {location.address.street}
                    <br />
                    {location.address.city}, {location.address.state} {location.address.zip}
                  </span>
                </span>
                {location.phone && location.phoneDisplay && (
                  <a href={`tel:${location.phone}`} className="inline-flex items-center gap-2 text-navy-900 font-semibold no-underline hover:text-sun-600">
                    <PhoneIcon className="h-4 w-4 text-sun-600" /> {location.phoneDisplay}
                  </a>
                )}
                {location.hours && (
                  <span className="inline-flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-sun-600" /> {location.hours.display}
                  </span>
                )}
              </address>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="pb-6">
        <div className="container-p">
          <div className="overflow-hidden rounded-3xl ring-1 ring-navy-100 shadow-card">
            <iframe
              title={`Map — ${site.businessName}, ${location.label}, FL`}
              src={mapSrc}
              width="100%"
              height="420"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container-p">
          <SectionHeading eyebrow="Services" title={`Services from the ${location.label} location`} />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ServiceCard
              title={services.coreServices[0].name}
              desc={services.coreServices[0].shortDesc}
              image={`/images/${services.coreServices[0].image}`}
              alt={`Junk removal dispatched from ${location.label}, FL`}
              href="/what-we-take/"
              bullets={services.coreServices[0].commonRequests}
            />
            <ServiceCard
              title={services.coreServices[1].name}
              desc={services.coreServices[1].shortDesc}
              image={`/images/${services.coreServices[1].image}`}
              alt={`Driveway-safe dump trailer rental dispatched from ${location.label}, FL`}
              href="/dumpster-rentals/"
              bullets={services.coreServices[1].sellingPoints}
            />
          </div>
        </div>
      </section>

      {/* CITIES SERVED */}
      <section className="section bg-sky-soft/60">
        <div className="container-p">
          <SectionHeading
            eyebrow="Service area"
            title={`Cities served from the ${location.label} location`}
          />
          <p className="mt-6 max-w-3xl text-ink-soft leading-relaxed">
            {location.citiesServed.map((city, i) => {
              const href = WAVE1_CITY_PAGES[city];
              return (
                <span key={city}>
                  {href ? (
                    <Link href={href} className="text-navy-900 font-semibold hover:text-sun-600">
                      {city}
                    </Link>
                  ) : (
                    city
                  )}
                  {i < location.citiesServed.length - 1 ? ', ' : ''}
                </span>
              );
            })}
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
