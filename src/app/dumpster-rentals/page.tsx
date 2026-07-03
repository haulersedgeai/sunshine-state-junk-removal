import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getSite, getServices, getServiceAreas, getFaqs } from '@/data';
import { pageMetadata } from '@/lib/seo';
import { SectionHeading } from '@/components/SectionHeading';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Button } from '@/components/Button';
import { CheckIcon, PhoneIcon, MessageIcon, ChevronRightIcon } from '@/components/Icon';
import { JsonLd, graph, faqPageSchema, serviceSchema } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  title: 'Dump Trailer Rentals in Broward County | Sunshine State',
  description:
    'Driveway-safe dump trailer rentals across Broward County, FL. Help choosing the right size, fast delivery and pickup, clear pricing. Get a quote today.',
  path: '/dumpster-rentals/',
});

export default function DumpsterHubPage() {
  const site = getSite();
  const services = getServices();
  const dumpster = services.coreServices.find((s) => s.slug === 'dump-trailer-rentals')!;
  const cities = getServiceAreas().dumpsterRentalPages;
  const generalFaqs = getFaqs().general.filter((f) => f.q.toLowerCase().includes('trailer') || f.q.toLowerCase().includes('driveway') || f.q.toLowerCase().includes('deliver'));

  return (
    <>
      <JsonLd
        data={graph([
          serviceSchema({
            name: 'Dump Trailer Rental',
            description: 'Driveway-safe dump trailer rentals with delivery, pickup, and transparent pricing across Broward County, FL.',
            slug: '/dumpster-rentals/',
          }),
          faqPageSchema(generalFaqs),
        ])}
      />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Dumpster Rentals', href: '/dumpster-rentals/' }]} />

      <section className="section">
        <div className="container-p grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
          <div>
            <p className="eyebrow">Dump trailer rentals</p>
            <h1 className="mt-2">Driveway-safe dump trailers, delivered fast.</h1>
            <p className="speakable-answer mt-5 text-lg text-ink-soft max-w-xl">
              Load at your own pace. Our dump trailers are <strong>designed to sit on your driveway safely</strong>, get delivered and picked up on your schedule, and come with clear, up-front pricing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`tel:${site.phone}`} size="lg" variant="primary"><PhoneIcon className="h-4 w-4" /> Call {site.phoneDisplay}</Button>
              <Button href={`sms:${site.sms}`} size="lg" variant="secondary"><MessageIcon className="h-4 w-4" /> Text a photo</Button>
              <Button href="/contact-us/" size="lg" variant="outline">Reserve a trailer</Button>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {dumpster.sellingPoints!.map((s) => (
                <li key={s} className="flex items-start gap-2 text-navy-800 text-sm"><CheckIcon className="h-4 w-4 text-sun-500 mt-1 shrink-0" /> {s}</li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-navy-100 shadow-card">
            <Image src="/images/Dump-Trailer-Rentals.webp" alt="Sunshine State dump trailer rental" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section bg-sky-soft/60">
        <div className="container-p grid gap-8 lg:grid-cols-2 items-start">
          <div>
            <SectionHeading eyebrow="Rental vs. removal" title="Not sure which service you need?" />
            <div className="mt-6 space-y-4 text-ink-soft">
              <p><strong>Choose a dump trailer rental</strong> when you want to load at your own pace, when a project runs over multiple days, or when you have a lot of debris and don't need us on-site.</p>
              <p><strong>Choose full-service junk removal</strong> when you want us to do the heavy lifting, when the job is one-and-done, or when access is tight and you just want it handled.</p>
              <p>Not sure? Send us a photo or a few sentences about the project — we'll recommend the option that saves you the most time and money.</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href="/what-we-take/" variant="secondary">See junk removal →</Button>
                <Button href="/pricing/" variant="outline">See pricing</Button>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: 'Home renovation', desc: 'Kitchen and bath remodels, flooring tear-outs, cabinet swaps.' },
              { title: 'Roofing & construction', desc: 'Shingle tear-offs, framing scraps, drywall, and jobsite debris.' },
              { title: 'Estate & move-out', desc: 'Cleanouts that take a few days — load as you sort.' },
              { title: 'Yard & landscaping', desc: 'Palm fronds, storm cleanup, brush, and general yard debris.' },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl bg-white ring-1 ring-navy-100 p-5 shadow-card">
                <h3 className="text-navy-900 m-0 text-lg">{c.title}</h3>
                <p className="mt-2 text-ink-soft text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-p">
          <SectionHeading
            eyebrow="Dumpster rentals by city"
            title="City-specific dumpster rental pages."
            intro="Local coverage across Broward — click your city for details and delivery info."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c) => (
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
        <div className="container-p grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow="Trailer rental FAQ" title="Common questions." />
          </div>
          <FAQAccordion items={generalFaqs} idPrefix="dumpster-faq" />
        </div>
      </section>

      <CTASection />
    </>
  );
}
