import Image from 'next/image';
import { Metadata } from 'next';
import { getServices, getFaqs, getSite } from '@/data';
import { pageMetadata } from '@/lib/seo';
import { SectionHeading } from '@/components/SectionHeading';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { FAQAccordion } from '@/components/FAQAccordion';
import { ProcessSteps } from '@/components/ProcessSteps';
import { Button } from '@/components/Button';
import { CheckIcon, PhoneIcon, MessageIcon } from '@/components/Icon';
import { JsonLd, graph, faqPageSchema } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  title: 'What We Take | Sunshine State Junk Removal',
  description:
    'From furniture to construction debris, we handle it all. See what items we accept for junk removal—call Sunshine State Junk Removal today!',
  path: '/what-we-take/',
});

function BulletCard({ title, items, image, alt }: { title: string; items: string[]; image?: string; alt?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-navy-100 shadow-card flex flex-col">
      {image && (
        <div className="relative aspect-[16/9] bg-navy-50">
          <Image src={image} alt={alt || title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        </div>
      )}
      <div className="p-6 flex-1">
        <h3 className="text-navy-900 m-0">{title}</h3>
        <ul className="mt-4 space-y-2 text-ink-soft text-sm">
          {items.map((it) => (
            <li key={it} className="flex items-start gap-2">
              <CheckIcon className="h-4 w-4 text-sun-500 mt-1 shrink-0" /> {it}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function WhatWeTakePage() {
  const services = getServices();
  const site = getSite();
  const faqs = getFaqs().whatWeTake;

  return (
    <>
      <JsonLd data={graph([faqPageSchema(faqs)])} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'What We Take', href: '/what-we-take/' }]} />

      <section className="section">
        <div className="container-p grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
          <div>
            <p className="eyebrow">What we take</p>
            <h1 className="mt-2">From single items to full property cleanouts — we take it all.</h1>
            <p className="speakable-answer mt-5 text-lg text-ink-soft max-w-xl">
              We handle a wide range of residential, commercial, renovation, and cleanout items across Broward County. If it&apos;s taking up space, there&apos;s a good chance we can help. When in doubt, text a photo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`sms:${site.sms}`} size="lg" variant="primary"><MessageIcon className="h-4 w-4" /> Text a photo</Button>
              <Button href={`tel:${site.phone}`} size="lg" variant="secondary"><PhoneIcon className="h-4 w-4" /> Call {site.phoneDisplay}</Button>
            </div>
          </div>
          <div className="relative aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-navy-100 shadow-card">
            <Image src="/images/sunshine-state-residential-junk-removal.webp" alt="Residential junk removal in Broward County" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section bg-sky-soft/60">
        <div className="container-p">
          <SectionHeading eyebrow="Items we remove" title="A quick tour of what we haul." intro="Household, commercial, renovation, and specialty — all handled by the same crew, in the same trailer." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <BulletCard title="Household & everyday items" items={services.whatWeRemove.commonItems} image="/images/residential-sunshines-state.webp" alt="Residential junk removal" />
            <BulletCard title="Construction & renovation debris" items={services.whatWeRemove.constructionDebris} image="/images/construction-debris-sunshines-state.webp" alt="Construction debris hauled away" />
            <BulletCard title="Commercial & office" items={services.whatWeRemove.commercial} image="/images/commercial-hauling-and-removal.webp" alt="Commercial hauling" />
            <BulletCard title="Cleanouts" items={services.whatWeRemove.cleanouts} image="/images/estate-cleanout-sunshine-state-removal.webp" alt="Estate cleanout" />
            <BulletCard title="Bulky & specialty" items={services.whatWeRemove.bulkySpecialty} image="/images/hot-tub-removal-sunshines-state.webp" alt="Hot tub removal" />
            <BulletCard title="Appliances & mattresses" items={['Refrigerators & freezers', 'Washers & dryers', 'Ovens & ranges', 'Mattresses & box springs', 'Water heaters & AC units']} image="/images/sunshines-state-mattress.jpg" alt="Mattress removal" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-p grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl bg-sun-50 ring-1 ring-sun-200 p-8">
            <div className="flex items-center gap-3">
              <Image src="/images/bed-bug.png" alt="" width={44} height={44} />
              <h3 className="m-0 text-navy-900">A few things to be aware of</h3>
            </div>
            <p className="mt-3 text-ink-soft">Some items need extra planning. We&apos;ll always walk through this before starting work, so nothing is a surprise:</p>
            <ul className="mt-4 space-y-2">
              {site.specialHandling.map((s) => (
                <li key={s} className="flex items-start gap-2 text-ink-soft"><CheckIcon className="h-4 w-4 text-sun-600 mt-1 shrink-0" /> {s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-navy-900 text-white p-8">
            <h3 className="m-0 text-white">Items we don&apos;t accept</h3>
            <p className="mt-3 text-white/80">For safety and disposal reasons, we can&apos;t take hazardous or restricted materials:</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {site.doNotAccept.map((s) => (
                <li key={s} className="text-white/90 text-sm flex items-start gap-2">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-sun-500" /> {s}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-white/70 text-sm">Not sure about an item? Text us a photo and we&apos;ll let you know before booking.</p>
          </div>
        </div>
      </section>

      <section className="section bg-sky-soft/60">
        <div className="container-p">
          <SectionHeading eyebrow="How it works" title="Three steps, done." align="center" />
          <div className="mt-10"><ProcessSteps /></div>
        </div>
      </section>

      <section className="section">
        <div className="container-p grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow="Items FAQ" title="What we take, in plain language." />
          </div>
          <FAQAccordion items={faqs} idPrefix="wwt-faq" />
        </div>
      </section>

      <CTASection />
    </>
  );
}
