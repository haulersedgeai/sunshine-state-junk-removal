import Image from 'next/image';
import Link from 'next/link';
import { getSite, getServices, getReviews, absoluteUrl, SITE_URL } from '@/data';
import type { JunkRemovalCity } from '@/data';
import { SectionHeading } from './SectionHeading';
import { Breadcrumbs } from './Breadcrumbs';
import { CTASection } from './CTASection';
import { FAQAccordion } from './FAQAccordion';
import { ProcessSteps } from './ProcessSteps';
import { ReviewsSlider } from './ReviewsSlider';
import { Button } from './Button';
import { JsonLd, graph, serviceSchema, faqPageSchema, speakableSchema } from '@/lib/schema';
import { CheckIcon, PhoneIcon, MessageIcon, StarIcon, ShieldIcon, ClockIcon, ChevronRightIcon } from './Icon';
import { PricingHookStrip } from './PricingTables';

export function JunkRemovalCityPage({ content }: { content: JunkRemovalCity }) {
  const site = getSite();
  const services = getServices();
  const reviews = getReviews().reviews;
  const slug = `/junk-removal/${content.slug}/`;

  const cityReviews = reviews.filter((r) => r.city?.toLowerCase() === content.city.toLowerCase());
  const useReviews = cityReviews.length >= 3 ? cityReviews : [...cityReviews, ...reviews.filter((r) => !r.city)].slice(0, 9);

  const localFaqs = [
    ...content.cityFaqs,
    { q: `Do you serve all of ${content.city}, FL?`, a: `Yes — we cover ${content.city} and the surrounding area. If a specific address falls outside our range, we'll tell you honestly and try to point you to someone who can help.` },
    { q: `What's the fastest way to get a ${content.city} junk removal quote?`, a: `Text a couple of clear photos to ${site.phoneDisplay}. Photo quotes are typically the quickest and most accurate way to get pricing.` },
    { q: `Do you also rent dump trailers in ${content.city}?`, a: `Yes — if you'd rather load at your own pace, we offer driveway-safe dump-trailer rentals in ${content.city} too. See our dump trailer rental page for sizing and pricing.` },
  ];

  const localBusinessNode = {
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_URL}${slug}#localbusiness`,
    name: `${site.shortName} — ${content.city}, FL`,
    url: absoluteUrl(slug),
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
    areaServed: [{ '@type': 'City', name: `${content.city}, FL` }, ...content.nearby.map((n) => ({ '@type': 'City', name: `${n.label}, FL` }))],
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
          serviceSchema({
            name: `Junk Removal in ${content.city}, FL`,
            description: `Full-service junk removal in ${content.city}, ${content.county}, FL.`,
            slug,
            areaCity: content.city,
          }),
          faqPageSchema(localFaqs),
          { '@type': 'WebPage', url: absoluteUrl(slug), name: `Junk Removal in ${content.city} FL`, speakable: speakableSchema() },
        ])}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Service Areas', href: '/service-areas/' },
          { label: content.city, href: slug },
        ]}
      />

      {/* HERO */}
      <section className="section">
        <div className="container-p grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
          <div>
            <p className="eyebrow">{content.eyebrow} · {content.city}, FL</p>
            <h1 className="mt-2">Junk Removal in {content.city}, FL</h1>
            <p className="speakable-answer mt-5 text-lg text-ink-soft max-w-xl">{content.distinctIntro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`tel:${site.phone}`} size="lg" variant="primary"><PhoneIcon className="h-4 w-4" /> Call {site.phoneDisplay}</Button>
              <Button href={`sms:${site.sms}`} size="lg" variant="secondary"><MessageIcon className="h-4 w-4" /> Text a photo</Button>
              <Button href="/contact-us/#quote" size="lg" variant="outline">Get a fast quote</Button>
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-navy-800">
              <li className="inline-flex items-center gap-2"><StarIcon className="h-4 w-4 text-sun-500" /> <strong>5.0</strong> · 159+ reviews</li>
              <li className="inline-flex items-center gap-2"><ShieldIcon className="h-4 w-4 text-navy-700" /> Licensed & insured</li>
              <li className="inline-flex items-center gap-2"><ClockIcon className="h-4 w-4 text-navy-700" /> Same-day & 24/7</li>
            </ul>
          </div>
          <div className="relative aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-navy-100 shadow-card">
            <Image src="/images/sunshine-state-residential-junk-removal.webp" alt={`Junk removal in ${content.city}, FL`} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* PRICING HOOK */}
      <section className="pt-2 pb-0">
        <div className="container-p">
          <PricingHookStrip variant="junk" />
        </div>
      </section>

      {/* LOCAL REALITY / COMMON SCENARIOS */}
      <section className="section bg-sky-soft/60">
        <div className="container-p grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <SectionHeading eyebrow="Local reality" title={`What removal usually looks like in ${content.city}.`} />
            <p className="mt-6 text-ink-soft">{content.serviceNote}</p>
            <div className="mt-6">
              <Link href="/dumpster-rentals/" className="text-sm font-semibold text-navy-800 hover:text-sun-600 no-underline">
                Prefer to load it yourself? See dump-trailer rentals →
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            {content.commonScenarios.map((s) => (
              <div key={s} className="flex items-start gap-3 rounded-2xl bg-white ring-1 ring-navy-100 p-4 shadow-card">
                <CheckIcon className="h-4 w-4 text-sun-500 mt-1 shrink-0" />
                <p className="m-0 text-navy-900 text-sm">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE HAUL */}
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

      {/* NEARBY */}
      <section className="section">
        <div className="container-p">
          <SectionHeading eyebrow="Nearby" title={`We also serve near ${content.city}.`} />
          <div className="mt-6 flex flex-wrap gap-3">
            {content.nearby.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="inline-flex items-center gap-1 rounded-full bg-white ring-1 ring-navy-300 px-4 py-2 text-sm font-semibold text-navy-900 no-underline hover:ring-navy-900 hover:bg-navy-50 transition-colors"
              >
                {n.label} <ChevronRightIcon className="h-3.5 w-3.5 text-sun-600" />
              </Link>
            ))}
          </div>
          {(content.neighborhoods.length > 0 || content.landmarks.length > 0) && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.neighborhoods.map((n) => (
                <span key={n} className="rounded-full bg-navy-50 ring-1 ring-navy-100 px-3 py-1.5 text-sm text-navy-800">{n}</span>
              ))}
              {content.landmarks.map((l) => (
                <span key={l} className="rounded-full bg-navy-50 ring-1 ring-navy-100 px-3 py-1.5 text-sm text-navy-800">{l}</span>
              ))}
            </div>
          )}
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
            <p className="mt-4 text-ink-soft text-sm">Don&rsquo;t see your question? <Link href="/faqs/" className="text-navy-800 font-semibold hover:text-sun-600">See all FAQs</Link> or just call us.</p>
          </div>
          <FAQAccordion items={localFaqs} idPrefix={`junk-removal-${content.slug}`} />
        </div>
      </section>

      <CTASection title={`Ready for junk removal in ${content.city}?`} intro={content.closer} />
    </>
  );
}
