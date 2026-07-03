import Image from 'next/image';
import { Metadata } from 'next';
import { getServices, getSite, getFaqs } from '@/data';
import { pageMetadata } from '@/lib/seo';
import { SectionHeading } from '@/components/SectionHeading';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Button } from '@/components/Button';
import { CheckIcon, PhoneIcon, MessageIcon } from '@/components/Icon';
import { JsonLd, graph, faqPageSchema } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  title: 'Junk Removal Pricing | Sunshine State Junk Removal',
  description:
    'Transparent, volume-based junk removal pricing in Broward County. No hidden fees. Get a fast photo quote from Sunshine State Junk Removal today.',
  path: '/pricing/',
});

export default function PricingPage() {
  const services = getServices();
  const site = getSite();
  const faqs = getFaqs().pricing;
  const p = services.pricing;

  return (
    <>
      <JsonLd data={graph([faqPageSchema(faqs)])} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Pricing', href: '/pricing/' }]} />

      <section className="section">
        <div className="container-p grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
          <div>
            <p className="eyebrow">Pricing</p>
            <h1 className="mt-2">Fair, volume-based pricing — no hidden fees.</h1>
            <p className="speakable-answer mt-5 text-lg text-ink-soft max-w-xl">
              {p.model} You&apos;ll know the price and what&apos;s included before we remove anything.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`sms:${site.sms}`} size="lg" variant="primary"><MessageIcon className="h-4 w-4" /> Text a photo for a quote</Button>
              <Button href={`tel:${site.phone}`} size="lg" variant="secondary"><PhoneIcon className="h-4 w-4" /> Call {site.phoneDisplay}</Button>
            </div>
          </div>
          <div className="relative aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-navy-100 shadow-card">
            <Image src="/images/sunshines-state-junk-removal-grills.webp" alt="Assorted items ready for removal" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section bg-sky-soft/60">
        <div className="container-p grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white ring-1 ring-navy-100 p-6 shadow-card">
            <h3 className="text-navy-900 m-0">What&apos;s included</h3>
            <ul className="mt-4 space-y-2 text-ink-soft text-sm">
              {p.quoteIncludes.map((it) => (
                <li key={it} className="flex items-start gap-2"><CheckIcon className="h-4 w-4 text-sun-500 mt-1 shrink-0" /> {it}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white ring-1 ring-navy-100 p-6 shadow-card">
            <h3 className="text-navy-900 m-0">What can affect price</h3>
            <ul className="mt-4 space-y-2 text-ink-soft text-sm">
              {p.affectFactors.map((it) => (
                <li key={it} className="flex items-start gap-2"><CheckIcon className="h-4 w-4 text-sun-500 mt-1 shrink-0" /> {it}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-navy-900 text-white p-6 shadow-card">
            <h3 className="text-white m-0">Fastest way to price a job</h3>
            <p className="mt-3 text-white/80">{p.fastestQuote}</p>
            <div className="mt-5 flex flex-col gap-2">
              <Button href={`sms:${site.sms}`} variant="primary" size="md" className="w-full">
                <MessageIcon className="h-4 w-4" /> Text photos to {site.phoneDisplay}
              </Button>
              <Button href="/contact-us/" variant="outline" size="md" className="w-full">
                Use the quote form →
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-p grid gap-10 lg:grid-cols-2 items-center">
          <div className="relative aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-navy-100 shadow-card">
            <Image src="/images/sunshine-state-dumpsters.webp" alt="Sunshine State dump trailer rental" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading eyebrow="Dump trailer rentals" title="Trailer pricing tailored to your project." />
            <p className="mt-4 text-ink-soft">{p.trailerPricing}</p>
            <p className="mt-3 text-ink-soft">Not sure what size you need? We ask a few quick questions about your project and help you choose — so you&apos;re not overpaying for space you won&apos;t use, or running out of room mid-project.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/dumpster-rentals/" variant="secondary">See dump trailer info</Button>
              <Button href={`tel:${site.phone}`} variant="outline"><PhoneIcon className="h-4 w-4" /> Ask us your questions</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-sun-50">
        <div className="container-p">
          <div className="rounded-3xl bg-white ring-1 ring-sun-200 p-8 sm:p-10 shadow-card grid gap-6 lg:grid-cols-[1fr_auto] items-center">
            <div>
              <p className="eyebrow">Discounts</p>
              <h2 className="mt-2">Discounts for the community we serve.</h2>
              <p className="mt-3 text-ink-soft max-w-2xl">
                We offer discounts for <strong>military members, veterans, seniors, and first responders</strong>. Mention it when you request your quote and we&apos;ll apply it upfront — no coupon codes, no hoops.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {site.discounts.map((d) => (
                <span key={d} className="rounded-full bg-sun-500 text-navy-900 font-semibold text-sm px-3 py-1.5">{d}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-p grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow="Pricing FAQ" title="How pricing works." />
          </div>
          <FAQAccordion items={faqs} idPrefix="pricing-faq" />
        </div>
      </section>

      <CTASection />
    </>
  );
}
