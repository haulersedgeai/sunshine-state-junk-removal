import Image from 'next/image';
import { Metadata } from 'next';
import { getSite, getReviews, getFaqs } from '@/data';
import { pageMetadata } from '@/lib/seo';
import { SectionHeading } from '@/components/SectionHeading';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/Button';
import { CTASection } from '@/components/CTASection';
import { FAQAccordion } from '@/components/FAQAccordion';
import { ReviewsSlider } from '@/components/ReviewsSlider';
import { PhoneIcon, MessageIcon, ShieldIcon, SunIcon, StarIcon, ClockIcon } from '@/components/Icon';
import { JsonLd, graph, faqPageSchema } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  title: 'About Sunshine State Junk Removal | Trusted Junk Removal',
  description:
    'Learn why homeowners trust Sunshine State Junk Removal for professional, family- and veteran-owned junk removal in Broward County, FL. Call today to get started!',
  path: '/about-us/',
});

export default function AboutPage() {
  const site = getSite();
  const reviews = getReviews().reviews;
  const faqs = getFaqs().about;

  return (
    <>
      <JsonLd data={graph([faqPageSchema(faqs)])} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about-us/' }]} />

      <section className="section">
        <div className="container-p grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
          <div>
            <p className="eyebrow">About us</p>
            <h1 className="mt-2">Family-owned, veteran-run, built on straight answers.</h1>
            <p className="speakable-answer mt-5 text-lg text-ink-soft max-w-xl">
              {site.businessName} is a family-owned and veteran-owned junk removal & dump-trailer rental company serving {site.primaryCounty}, FL. Cesar and Lynzee Hurtado run the business personally — same crew, same standards, every job.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`tel:${site.phone}`} size="lg" variant="primary">
                <PhoneIcon className="h-4 w-4" /> Call {site.phoneDisplay}
              </Button>
              <Button href={`sms:${site.sms}`} size="lg" variant="secondary">
                <MessageIcon className="h-4 w-4" /> Text a photo
              </Button>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-navy-800 max-w-md">
              <li className="inline-flex items-center gap-2"><StarIcon className="h-4 w-4 text-sun-500" /> 5.0 · 159+ reviews</li>
              <li className="inline-flex items-center gap-2"><ShieldIcon className="h-4 w-4 text-navy-700" /> Licensed & insured</li>
              <li className="inline-flex items-center gap-2"><SunIcon className="h-4 w-4 text-sun-500" /> Veteran-owned</li>
              <li className="inline-flex items-center gap-2"><ClockIcon className="h-4 w-4 text-navy-700" /> 24/7 availability</li>
            </ul>
          </div>
          <div className="relative aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-navy-100 shadow-card">
            <Image src="/images/sunshine-state-owner.webp" alt="Cesar, owner of Sunshine State Junk Removal" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section bg-sky-soft/60">
        <div className="container-p grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <SectionHeading eyebrow="Our story" title="Why we started Sunshine State Junk Removal." />
            <div className="prose-basic mt-6">
              <p>We built {site.shortName} because too many Florida homeowners were tired of the runaround — vague pricing, no-shows, and rotating crews who didn't care about the details. As a veteran-led, family-run team, we wanted to do the opposite: pick up the phone, communicate clearly, show up when we say, and leave a space cleaner than we found it.</p>
              <p>Cesar served in the U.S. military and brought that same discipline and follow-through into the business. His wife Lynzee runs operations and keeps every job on track. What started as a small hauling operation has grown into a highly-rated, full-service junk removal & dump-trailer rental company across {site.primaryCounty}.</p>
              <p>Today we're proud to hold a <strong>5.0 rating across 159+ Google reviews</strong>, plus a steady stream of repeat business from realtors, property managers, contractors, and homeowners who've made us their go-to.</p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Mission & values" title="What we stand for." />
            <ul className="mt-6 grid gap-4">
              {[
                { title: 'Clear communication', desc: 'From first message to final pickup, no ghosting and no guessing.' },
                { title: 'Straight-line pricing', desc: 'Volume-based quotes with everything included, explained before we start.' },
                { title: 'Respect for your space', desc: 'Careful with driveways, floors, and everything in between — we clean up after ourselves.' },
                { title: 'Show up, follow through', desc: 'When we book a time, we honor it. When something changes, we tell you.' },
                { title: 'Reuse and recycle', desc: 'We sort where we can. Scrap, appliances, and electronics are recycled; usable items may be donated.' },
              ].map((v) => (
                <li key={v.title} className="rounded-xl bg-white ring-1 ring-navy-100 p-4">
                  <p className="m-0 font-semibold text-navy-900">{v.title}</p>
                  <p className="m-0 text-ink-soft text-sm">{v.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-p">
          <SectionHeading eyebrow="On the job" title="A few recent jobs across Broward County." intro="Real photos from real work — no stock photos." align="center" />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              'yellow-dumpster-sunshines-state2.webp',
              'junk-removal-dumpster-black-truck.webp',
              'residential-image-junk-removal-sunshines-state.webp',
              'construction-debris-sunshines-state.webp',
              'sunshines-state-junk-removal.webp',
              'construction-removal-sunshines-state.webp',
              'top-view-sunshines-state.webp',
              'contruction-debris-sunshines-state.webp',
              'yellow-dumpster-sunshines-state.webp',
              'trash-bin-sunshines-state.webp',
              'hot-tub-removal-sunshines-state.webp',
              'sunshines-state-junk-removal-cleanouts.webp',
            ].map((f, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-navy-100">
                <Image src={`/images/${f}`} alt={`Sunshine State job photo ${i + 1}`} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-sky-soft/60">
        <div className="container-p">
          <SectionHeading eyebrow="What customers say" title="A 5-star experience, again and again." />
          <div className="mt-10">
            <ReviewsSlider reviews={reviews.slice(0, 9)} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-p grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow="About FAQ" title="Working with Sunshine State." />
            <div className="mt-6">
              <Button href="/faqs/" variant="outline">See all FAQs</Button>
            </div>
          </div>
          <FAQAccordion items={faqs} idPrefix="about-faq" />
        </div>
      </section>

      <CTASection />
    </>
  );
}
