import Image from 'next/image';
import Link from 'next/link';
import { getSite, getServices, getReviews, getFaqs, absoluteUrl, SITE_URL } from '@/data';
import { SectionHeading } from './SectionHeading';
import { Breadcrumbs } from './Breadcrumbs';
import { CTASection } from './CTASection';
import { FAQAccordion } from './FAQAccordion';
import { ProcessSteps } from './ProcessSteps';
import { ReviewsSlider } from './ReviewsSlider';
import { Button } from './Button';
import { JsonLd, graph, faqPageSchema, speakableSchema } from '@/lib/schema';
import { CheckIcon, PhoneIcon, MessageIcon, StarIcon, ShieldIcon, ClockIcon } from './Icon';
import { CityContent } from '@/data/city-content';

export function CityServicePage({ content }: { content: CityContent }) {
  const site = getSite();
  const services = getServices();
  const reviews = getReviews().reviews;
  const generalFaqs = getFaqs().general;

  // Rotate reviews mentioning the city or fallback
  const cityReviews = reviews.filter((r) => r.city?.toLowerCase() === content.city.toLowerCase());
  const useReviews = cityReviews.length >= 3 ? cityReviews : [...cityReviews, ...reviews.filter((r) => !r.city)].slice(0, 9);

  const localFaqs = [
    { q: `Do you serve all of ${content.city}, FL?`, a: `Yes — we cover every neighborhood in ${content.city}, including ${content.neighborhoods.slice(0, 3).join(', ')}, plus surrounding communities. If we can’t reach you, we’ll tell you honestly and recommend someone who can.` },
    { q: `How fast can you get to ${content.city}?`, a: `Same-day service is common in ${content.city}. Text a couple of clear photos and we’ll respond quickly with pricing and the soonest arrival window.` },
    { q: `What’s the fastest way to get a ${content.city} junk removal quote?`, a: `Text photos to ${site.phoneDisplay}. Photo quotes are typically the quickest and most accurate for household, garage, and cleanout jobs.` },
    { q: `Do you handle HOA and gated communities in ${content.city}?`, a: `Yes. Many of the neighborhoods we serve in ${content.city} are HOA or gated. Let us know when you book and we’ll follow all requirements — timing, placement, and cleanup.` },
    ...(content.faqExtra || []),
    { q: `What items do you take in ${content.city}?`, a: `Furniture, appliances, mattresses, yard debris, renovation and construction debris, hot tubs, sheds, and everything in between. We can’t take hazardous materials — everything else is fair game.` },
  ];

  const localBusinessNode = {
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_URL}${content.slug}#localbusiness`,
    name: `${site.shortName} — ${content.city}, FL`,
    url: absoluteUrl(content.slug),
    telephone: site.phone,
    email: site.email,
    image: absoluteUrl('/images/Sunshine-About-Us.webp'),
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
  };

  return (
    <>
      <JsonLd
        data={graph([
          localBusinessNode,
          {
            '@type': 'Service',
            name: `Junk Removal in ${content.city}, FL`,
            description: `Full-service junk removal in ${content.city}, ${content.county}, FL.`,
            provider: { '@id': `${SITE_URL}${content.slug}#localbusiness` },
            areaServed: { '@type': 'City', name: `${content.city}, FL` },
            url: absoluteUrl(content.slug),
          },
          faqPageSchema(localFaqs),
          { '@type': 'WebPage', url: absoluteUrl(content.slug), name: `Junk Removal in ${content.city} FL`, speakable: speakableSchema() },
        ])}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Service Areas', href: '/service-areas/' },
          { label: content.city, href: content.slug },
        ]}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-p grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
          <div>
            <p className="eyebrow">Junk removal · {content.city}, FL</p>
            <h1 className="mt-2">Junk removal in {content.city}, FL — fast, fair, and family-run.</h1>
            <p className="speakable-answer mt-5 text-lg text-ink-soft max-w-xl">
              {content.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`tel:${site.phone}`} size="lg" variant="primary"><PhoneIcon className="h-4 w-4" /> Call {site.phoneDisplay}</Button>
              <Button href={`sms:${site.sms}`} size="lg" variant="secondary"><MessageIcon className="h-4 w-4" /> Text a photo</Button>
              <Button href="/contact-us/" size="lg" variant="outline">Get a fast quote</Button>
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-navy-800">
              <li className="inline-flex items-center gap-2"><StarIcon className="h-4 w-4 text-sun-500" /> <strong>5.0</strong> · 159+ reviews</li>
              <li className="inline-flex items-center gap-2"><ShieldIcon className="h-4 w-4 text-navy-700" /> Licensed & insured</li>
              <li className="inline-flex items-center gap-2"><ClockIcon className="h-4 w-4 text-navy-700" /> Same-day availability</li>
            </ul>
          </div>
          <div className="relative aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-navy-100 shadow-card">
            <Image src="/images/sunshine-state-residential-junk-removal.webp" alt={`Junk removal in ${content.city}, FL`} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* WHEN SPACE WORKS AGAINST YOU */}
      <section className="section bg-sky-soft/60">
        <div className="container-p grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <SectionHeading eyebrow="Local reality" title={`When space works against you in ${content.city}.`} />
            <div className="mt-6 space-y-4 text-ink-soft">
              <p>Every city has its quirks. In {content.city}, it’s usually {content.vibe} — and that shapes the kind of removal we do.</p>
              <p>{content.serviceFocus}</p>
              <p>We’ve worked in {content.neighborhoods.slice(0, 3).map((n) => n).join(', ')} and everywhere in between. Whatever your setup, we’ve seen it before.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: 'Full-service removal', desc: 'We do the heavy lifting — from wherever your items are.' },
              { title: 'Dump-trailer rentals', desc: 'Driveway-safe, sized to your project.' },
              { title: 'Cleanouts', desc: 'Estate, garage, storage, hoarder — all handled discreetly.' },
              { title: 'Renovation debris', desc: 'Drywall, cabinets, flooring, and post-remodel loads.' },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl bg-white ring-1 ring-navy-100 p-5 shadow-card">
                <h3 className="text-navy-900 m-0 text-lg">{c.title}</h3>
                <p className="mt-2 text-ink-soft text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE HELP */}
      <section className="section">
        <div className="container-p grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-navy-100 shadow-card">
            <Image src="/images/sunshines-state-junk-removal-cleanouts.webp" alt={`Full property cleanout near ${content.city}`} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading eyebrow="Items we commonly remove" title={`What we haul in ${content.city}.`} />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ul className="space-y-2 text-ink-soft text-sm">
                {services.whatWeRemove.commonItems.slice(0, 6).map((i) => (
                  <li key={i} className="flex items-start gap-2"><CheckIcon className="h-4 w-4 text-sun-500 mt-1 shrink-0" /> {i}</li>
                ))}
              </ul>
              <ul className="space-y-2 text-ink-soft text-sm">
                {[...services.whatWeRemove.cleanouts.slice(0, 3), ...services.whatWeRemove.constructionDebris.slice(0, 3)].map((i) => (
                  <li key={i} className="flex items-start gap-2"><CheckIcon className="h-4 w-4 text-sun-500 mt-1 shrink-0" /> {i}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <Link href="/what-we-take/" className="text-sm font-semibold text-navy-800 hover:text-sun-600 no-underline">See everything we accept →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section bg-sky-soft/60">
        <div className="container-p">
          <SectionHeading eyebrow="How it works" title="Three steps in and out." align="center" />
          <div className="mt-10"><ProcessSteps /></div>
        </div>
      </section>

      {/* AREAS NEAR CITY */}
      <section className="section">
        <div className="container-p">
          <SectionHeading eyebrow="Nearby" title={`Areas served near ${content.city}.`} />
          <div className="mt-6 flex flex-wrap gap-2">
            {content.nearby.map((n) => (
              <span key={n} className="rounded-full bg-white ring-1 ring-navy-200 px-3 py-1.5 text-sm text-navy-900">{n}, FL</span>
            ))}
            {content.landmarks.map((l) => (
              <span key={l} className="rounded-full bg-navy-50 ring-1 ring-navy-100 px-3 py-1.5 text-sm text-navy-800">{l}</span>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-muted">Not sure if we cover your block? <Link href="/service-areas/" className="text-navy-800 font-semibold hover:text-sun-600">See the full areas served →</Link></p>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section bg-sky-soft/60">
        <div className="container-p">
          <SectionHeading eyebrow={`${content.city} customers`} title="What locals say." />
          <div className="mt-10"><ReviewsSlider reviews={useReviews} /></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-p grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow="Local FAQ" title={`${content.city} junk removal questions.`} />
            <p className="mt-4 text-ink-soft text-sm">Don’t see your question? <Link href="/faqs/" className="text-navy-800 font-semibold hover:text-sun-600">See all FAQs</Link> or just call us.</p>
          </div>
          <FAQAccordion items={localFaqs} idPrefix={`city-${content.city.toLowerCase().replace(/\s+/g, '-')}`} />
        </div>
      </section>

      <CTASection title={`Ready for junk removal in ${content.city}?`} intro={content.closer} />
    </>
  );
}
