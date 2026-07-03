import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getSite, getServices, getReviews, getFaqs } from '@/data';
import { pageMetadata } from '@/lib/seo';
import { Button } from '@/components/Button';
import { PhoneIcon, MessageIcon, StarIcon, CheckIcon, ShieldIcon, ClockIcon, SunIcon, MapPinIcon } from '@/components/Icon';
import { TrustBar } from '@/components/TrustBar';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/ServiceCard';
import { ProcessSteps } from '@/components/ProcessSteps';
import { ReviewsSlider } from '@/components/ReviewsSlider';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AreasServed } from '@/components/AreasServed';
import { CTASection } from '@/components/CTASection';
import { PhotoQuoteBadge } from '@/components/PhotoQuoteBadge';
import { JsonLd, graph, faqPageSchema, speakableSchema, serviceSchema } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  title: 'Sunshine State Junk Removal | Fast Junk Removal',
  description:
    'Need fast junk removal in Florida? Sunshine State Junk Removal offers affordable, reliable junk removal & dump-trailer rentals across Broward County. Call now for a free quote!',
  path: '/',
});

export default function HomePage() {
  const site = getSite();
  const services = getServices();
  const reviews = getReviews().reviews;
  const faqs = getFaqs().general;

  return (
    <>
      <JsonLd
        data={graph([
          faqPageSchema(faqs),
          serviceSchema({
            name: 'Junk Removal',
            description: 'Full-service junk removal across Broward County, FL. Photo-based quotes, same-day availability.',
            slug: '/what-we-take/',
          }),
          serviceSchema({
            name: 'Dump Trailer Rental',
            description: 'Driveway-safe dump trailer rentals with delivery, pickup, and clear pricing.',
            slug: '/dumpster-rentals/',
          }),
          { '@type': 'WebPage', '@id': `${site.domain}#webpage`, url: site.domain, name: 'Home', speakable: speakableSchema() },
        ])}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-hero-gradient" />
        <div className="absolute inset-0 -z-10 bg-cream/50" />
        <div className="container-p pt-12 sm:pt-16 lg:pt-24 pb-14 lg:pb-24 grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
          <div className="animate-fade-up">
            <PhotoQuoteBadge />
            <h1 className="mt-5">
              Junk removal & dump-trailer rentals in <span className="text-sun-500">Broward County</span>.
            </h1>
            <p className="speakable-answer mt-5 text-lg sm:text-xl text-ink-soft max-w-xl leading-relaxed">
              Family- and veteran-owned. Text a few photos and we'll send a fast, honest quote — often same-day, with driveway-safe equipment and no runaround.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`tel:${site.phone}`} size="lg" variant="primary">
                <PhoneIcon className="h-4 w-4" /> Call {site.phoneDisplay}
              </Button>
              <Button href={`sms:${site.sms}`} size="lg" variant="secondary">
                <MessageIcon className="h-4 w-4" /> Text a photo
              </Button>
              <Button href="/contact-us/" size="lg" variant="outline">
                Get a fast quote
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-navy-800">
              <li className="inline-flex items-center gap-2"><StarIcon className="h-4 w-4 text-sun-500" /> <strong>5.0</strong> from 159+ reviews</li>
              <li className="inline-flex items-center gap-2"><ShieldIcon className="h-4 w-4 text-navy-700" /> Licensed & insured</li>
              <li className="inline-flex items-center gap-2"><SunIcon className="h-4 w-4 text-sun-500" /> Veteran & family-owned</li>
              <li className="inline-flex items-center gap-2"><ClockIcon className="h-4 w-4 text-navy-700" /> Same-day availability</li>
            </ul>
          </div>

          <div className="relative">
            <div className="relative aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-navy-100 shadow-card">
              <Image
                src="/images/Sunshine-About-Us.webp"
                alt="Sunshine State Junk Removal team on the job in Broward County"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 sm:-left-8 rounded-2xl bg-white shadow-card ring-1 ring-navy-100 p-4 flex items-center gap-3">
              <div className="flex -space-x-1 text-sun-500">
                {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} className="h-5 w-5" />)}
              </div>
              <div>
                <p className="m-0 text-navy-900 font-bold leading-none">5.0 · 159+ reviews</p>
                <p className="m-0 text-xs text-ink-muted">on Google, Facebook & Yelp</p>
              </div>
            </div>
          </div>
        </div>
        <TrustBar />
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container-p">
          <SectionHeading
            eyebrow="Services"
            title="Two ways we help — pick the one that fits."
            intro="Full-service junk removal when you want it done for you, or dump-trailer rentals when you want to load at your own pace."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ServiceCard
              title="Junk Removal"
              desc={services.coreServices[0].shortDesc}
              image={`/images/${services.coreServices[0].image}`}
              alt="Junk removal service in Broward County"
              href="/what-we-take/"
              bullets={services.coreServices[0].commonRequests}
            />
            <ServiceCard
              title="Dump Trailer Rentals"
              desc={services.coreServices[1].shortDesc}
              image={`/images/${services.coreServices[1].image}`}
              alt="Driveway-safe dump trailer rental"
              href="/dumpster-rentals/"
              bullets={services.coreServices[1].sellingPoints}
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="section bg-sky-soft/60">
        <div className="container-p">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <SectionHeading
                eyebrow="Why choose us"
                title="Straightforward service from a local, family-run team."
                intro="Cesar and Lynzee run every job personally. No rotating crews, no surprise fees, and a first-message-to-final-pickup experience built around clarity."
              />
              <ul className="mt-8 grid gap-4">
                {[
                  { icon: <CheckIcon className="h-4 w-4" />, title: 'Photo-based quotes', desc: 'Text a few photos, get pricing fast — no in-person visit required for most jobs.' },
                  { icon: <ShieldIcon className="h-4 w-4" />, title: 'Licensed & insured', desc: 'Fully credentialed and careful with your property, driveway, and everything in between.' },
                  { icon: <SunIcon className="h-4 w-4" />, title: 'Veteran & family-owned', desc: 'Accountability, communication, and follow-through on every job.' },
                  { icon: <ClockIcon className="h-4 w-4" />, title: 'Same-day & 24/7 availability', desc: 'We regularly move fast for last-minute cleanouts, hurricane prep, and after-hours pickups.' },
                ].map((v) => (
                  <li key={v.title} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sun-500 text-navy-900">{v.icon}</span>
                    <div>
                      <p className="m-0 font-semibold text-navy-900">{v.title}</p>
                      <p className="m-0 text-ink-soft">{v.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/about-us/" variant="secondary">Meet the owners</Button>
                <Button href="/pricing/" variant="outline">See pricing</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { src: '/images/sunshines-state-junk-removal.webp', alt: 'Sunshine State junk removal in action' },
                { src: '/images/yellow-dumpster-sunshines-state2.webp', alt: 'Yellow dump trailer on driveway' },
                { src: '/images/sunshines-state-junk-removal-cleanouts.webp', alt: 'Full property cleanout' },
                { src: '/images/construction-debris-sunshines-state.webp', alt: 'Construction debris hauled away' },
              ].map((g, i) => (
                <div key={i} className={`relative aspect-square overflow-hidden rounded-2xl ring-1 ring-navy-100 ${i === 0 ? 'sm:translate-y-8' : ''} ${i === 3 ? 'sm:-translate-y-8' : ''}`}>
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container-p">
          <SectionHeading
            eyebrow="How it works"
            title="Three steps, no runaround."
            intro="From first message to final pickup, we keep things moving and easy to follow."
            align="center"
          />
          <div className="mt-10">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section bg-sky-soft/60">
        <div className="container-p">
          <SectionHeading
            eyebrow="Reviews"
            title="Loved by Broward County homeowners, realtors, and businesses."
            intro="A 5.0-star track record across 159+ Google reviews — plus glowing feedback from Facebook and Yelp."
          />
          <div className="mt-10">
            <ReviewsSlider reviews={reviews.slice(0, 9)} />
          </div>
        </div>
      </section>

      {/* AREAS SERVED */}
      <section className="section">
        <div className="container-p">
          <SectionHeading
            eyebrow="Areas we serve"
            title="Full coverage across Broward County — plus select Miami-Dade & Palm Beach."
            intro="Not sure if we serve your area? Just ask when you get in touch."
          />
          <div className="mt-10">
            <AreasServed />
          </div>
          <div className="mt-10 overflow-hidden rounded-3xl ring-1 ring-navy-100 shadow-card">
            <iframe
              title="Sunshine State Junk Removal service area map"
              src="https://www.google.com/maps/d/embed?mid=1w206hNLnoiuCFsSI2okpRZHAOnx_Vhw"
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-sky-soft/60">
        <div className="container-p grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Common questions, answered."
              intro="Everything you need to know before booking — photo quotes, timing, pricing, and what we can (and can't) take."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/faqs/" variant="outline">All FAQs</Button>
              <Button href={`tel:${site.phone}`} variant="ghost"><PhoneIcon className="h-4 w-4" /> Call us</Button>
            </div>
          </div>
          <FAQAccordion items={faqs} idPrefix="home-faq" />
        </div>
      </section>

      <CTASection />
    </>
  );
}
