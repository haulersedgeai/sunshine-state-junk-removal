import Image from 'next/image';
import Link from 'next/link';
import { getSite, getReviews, absoluteUrl, SITE_URL } from '@/data';
import { SectionHeading } from './SectionHeading';
import { Breadcrumbs } from './Breadcrumbs';
import { CTASection } from './CTASection';
import { FAQAccordion } from './FAQAccordion';
import { ReviewsSlider } from './ReviewsSlider';
import { Button } from './Button';
import { JsonLd, graph, faqPageSchema, speakableSchema } from '@/lib/schema';
import { CheckIcon, PhoneIcon, MessageIcon, StarIcon, ShieldIcon, ClockIcon } from './Icon';
import { CityContent } from '@/data/city-content';

export function CityDumpsterPage({ content }: { content: CityContent }) {
  const site = getSite();
  const reviews = getReviews().reviews;
  const cityReviews = reviews.filter((r) => r.city?.toLowerCase() === content.city.toLowerCase());
  const useReviews = cityReviews.length >= 3 ? cityReviews : [...cityReviews, ...reviews.filter((r) => !r.city)].slice(0, 9);

  const localFaqs = [
    { q: `How do dump trailer rentals work in ${content.city}?`, a: `We drop the trailer at your driveway, you load it at your pace over the rental window, and we haul it away when you&rsquo;re done. Pricing is transparent and includes disposal.` },
    { q: `What size dump trailer do I need for a ${content.city} project?`, a: `Most homeowners aren&rsquo;t sure — that&rsquo;s okay. Tell us the project (kitchen remodel, garage cleanout, roofing, yard debris, etc.) and we&rsquo;ll recommend the right size so you&rsquo;re not overpaying or running out of space.` },
    { q: `Are your dump trailers safe for driveways in ${content.city}?`, a: `Yes. Our trailers are designed to be driveway-safe, and we place them carefully — especially on pavers, tile driveways, and coated surfaces common in ${content.city}.` },
    { q: `How fast can you deliver a dump trailer in ${content.city}?`, a: `Same-day and next-day deliveries are common in ${content.city}. Confirm your address and the drop location and we&rsquo;ll book the earliest window available.` },
    { q: `What can I put in the dump trailer?`, a: `Household clutter, renovation debris, furniture, yard waste, and most bulky items. We can&rsquo;t take hazardous materials (chemicals, paints, propane tanks, oil, batteries, pesticides, asbestos, biohazards). Ask if you&rsquo;re unsure.` },
    { q: `How is dump trailer rental priced?`, a: `Pricing depends on trailer size, rental duration, and project type. Everything is clearly quoted up front — no confusion, no hidden fees.` },
  ];

  return (
    <>
      <JsonLd
        data={graph([
          {
            '@type': 'HomeAndConstructionBusiness',
            '@id': `${SITE_URL}${content.slug}#localbusiness`,
            name: `${site.shortName} — Dump Trailer Rentals ${content.city}, FL`,
            url: absoluteUrl(content.slug),
            telephone: site.phone,
            image: absoluteUrl('/images/Dump-Trailer-Rentals.webp'),
            priceRange: '$$',
            address: {
              '@type': 'PostalAddress',
              streetAddress: site.address.street,
              addressLocality: site.address.city,
              addressRegion: site.address.state,
              postalCode: site.address.zip,
              addressCountry: site.address.country,
            },
            areaServed: [{ '@type': 'City', name: `${content.city}, FL` }, ...content.nearby.map((n) => ({ '@type': 'City', name: `${n}, FL` }))],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: site.rating.value,
              reviewCount: site.rating.count,
              bestRating: '5',
            },
          },
          {
            '@type': 'Service',
            name: `Dump Trailer Rental in ${content.city}, FL`,
            description: `Driveway-safe dump trailer rentals in ${content.city}, ${content.county}, FL.`,
            provider: { '@id': `${SITE_URL}${content.slug}#localbusiness` },
            areaServed: { '@type': 'City', name: `${content.city}, FL` },
            url: absoluteUrl(content.slug),
          },
          faqPageSchema(localFaqs),
          { '@type': 'WebPage', url: absoluteUrl(content.slug), name: `Dumpster Rental in ${content.city} FL`, speakable: speakableSchema() },
        ])}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Dumpster Rentals', href: '/dumpster-rentals/' },
          { label: content.city, href: content.slug },
        ]}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-p grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
          <div>
            <p className="eyebrow">Dump trailer rentals · {content.city}, FL</p>
            <h1 className="mt-2">Dumpster rentals in {content.city}, FL — driveway-safe, delivered fast.</h1>
            <p className="speakable-answer mt-5 text-lg text-ink-soft max-w-xl">
              {content.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`tel:${site.phone}`} size="lg" variant="primary"><PhoneIcon className="h-4 w-4" /> Call {site.phoneDisplay}</Button>
              <Button href={`sms:${site.sms}`} size="lg" variant="secondary"><MessageIcon className="h-4 w-4" /> Text a photo</Button>
              <Button href="/contact-us/" size="lg" variant="outline">Reserve a trailer</Button>
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-navy-800">
              <li className="inline-flex items-center gap-2"><StarIcon className="h-4 w-4 text-sun-500" /> <strong>5.0</strong> · 159+ reviews</li>
              <li className="inline-flex items-center gap-2"><ShieldIcon className="h-4 w-4 text-navy-700" /> Licensed & insured</li>
              <li className="inline-flex items-center gap-2"><ClockIcon className="h-4 w-4 text-navy-700" /> Same-day delivery</li>
            </ul>
          </div>
          <div className="relative aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-navy-100 shadow-card">
            <Image src="/images/Dump-Trailer-Rentals.webp" alt={`Dump trailer rental in ${content.city}, FL`} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* LOCAL FIT */}
      <section className="section bg-sky-soft/60">
        <div className="container-p grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <SectionHeading eyebrow="Why locals rent from us" title={`Made for ${content.city} projects.`} />
            <div className="mt-6 space-y-4 text-ink-soft">
              <p>{content.serviceFocus}</p>
              <p>We&rsquo;ve delivered trailers to {content.neighborhoods.slice(0, 3).join(', ')} and beyond. That local familiarity means fewer surprises on delivery day.</p>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  'Driveway-safe equipment — protects pavers, tile, and coated surfaces',
                  'Right-sized recommendations for the project',
                  'Flexible drop-off and pickup windows',
                  'Clear pricing with no hidden fees',
                ].map((s) => (
                  <li key={s} className="flex items-start gap-2"><CheckIcon className="h-4 w-4 text-sun-500 mt-1 shrink-0" /> {s}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: 'Kitchen & bath remodels', desc: 'Cabinets, drywall, flooring, tile — one trailer holds it all.' },
              { title: 'Roofing debris', desc: 'Sized right for tear-offs and cleanup.' },
              { title: 'Garage & attic cleanouts', desc: 'Multi-day trailer window lets you sort and load at your pace.' },
              { title: 'Yard & storm cleanup', desc: 'Palm fronds, brush, and general yard debris.' },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl bg-white ring-1 ring-navy-100 p-5 shadow-card">
                <h3 className="text-navy-900 m-0 text-lg">{c.title}</h3>
                <p className="mt-2 text-ink-soft text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIZING HELP */}
      <section className="section">
        <div className="container-p grid gap-10 lg:grid-cols-[1fr_1.2fr] items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-navy-100 shadow-card">
            <Image src="/images/rent-me-sunshines-state.webp" alt={`Dump trailer sizing in ${content.city}`} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading eyebrow="Sizing help" title="Not sure what you need? Just ask." />
            <div className="mt-6 space-y-4 text-ink-soft">
              <p>Guessing dump trailer size is the fastest way to overspend or come up short. We ask a few questions about your project — what you&rsquo;re removing, how many rooms or square feet, whether it&rsquo;s dense (dirt, tile) or bulky (furniture, drywall) — and recommend the right size the first time.</p>
              <p>All rentals include labor-free drop-off, disposal at approved facilities, and clear pricing so you&rsquo;re not blindsided.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="/pricing/" variant="secondary">See pricing details</Button>
                <Button href={`tel:${site.phone}`} variant="outline"><PhoneIcon className="h-4 w-4" /> Talk to us</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AREAS NEAR CITY */}
      <section className="section bg-sky-soft/60">
        <div className="container-p">
          <SectionHeading eyebrow="Delivery zone" title={`Areas we serve near ${content.city}.`} />
          <div className="mt-6 flex flex-wrap gap-2">
            {content.nearby.map((n) => (
              <span key={n} className="rounded-full bg-white ring-1 ring-navy-200 px-3 py-1.5 text-sm text-navy-900">{n}, FL</span>
            ))}
            {content.landmarks.map((l) => (
              <span key={l} className="rounded-full bg-navy-50 ring-1 ring-navy-100 px-3 py-1.5 text-sm text-navy-800">{l}</span>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-muted">
            <Link href="/service-areas/" className="text-navy-800 font-semibold hover:text-sun-600">See all cities we serve →</Link>
          </p>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section">
        <div className="container-p">
          <SectionHeading eyebrow="Reviews" title={`5-star service in ${content.city} and beyond.`} />
          <div className="mt-10"><ReviewsSlider reviews={useReviews} /></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-sky-soft/60">
        <div className="container-p grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow="Local FAQ" title={`${content.city} dump trailer questions.`} />
          </div>
          <FAQAccordion items={localFaqs} idPrefix={`dcity-${content.city.toLowerCase().replace(/\s+/g, '-')}`} />
        </div>
      </section>

      <CTASection title={`Book a dump trailer in ${content.city}`} intro={content.closer} />
    </>
  );
}
