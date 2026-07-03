import { Metadata } from 'next';
import { getFaqs } from '@/data';
import { pageMetadata } from '@/lib/seo';
import { SectionHeading } from '@/components/SectionHeading';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { FAQAccordion } from '@/components/FAQAccordion';
import { JsonLd, graph, faqPageSchema } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  title: 'FAQs | Sunshine State Junk Removal',
  description:
    'Answers to common questions about junk removal, dump trailer rentals, pricing, and what we accept — from Sunshine State Junk Removal in Broward County.',
  path: '/faqs/',
});

export default function FAQPage() {
  const all = getFaqs();
  const groups = [
    { key: 'general', title: 'General & how it works', items: all.general },
    { key: 'whatWeTake', title: 'What we take', items: all.whatWeTake },
    { key: 'pricing', title: 'Pricing', items: all.pricing },
    { key: 'about', title: 'About us', items: all.about },
  ];
  const combined = groups.flatMap((g) => g.items);

  return (
    <>
      <JsonLd data={graph([faqPageSchema(combined)])} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQs', href: '/faqs/' }]} />

      <section className="section">
        <div className="container-p">
          <SectionHeading
            eyebrow="FAQs"
            title="Answers to the questions we hear most."
            intro="If you don't see your question, call or text — we're happy to help."
            align="center"
          />
        </div>
      </section>

      {groups.map((g) => (
        <section key={g.key} className="pb-14">
          <div className="container-p grid gap-6 lg:grid-cols-[1fr_2fr]">
            <div>
              <h2 className="text-navy-900 m-0">{g.title}</h2>
            </div>
            <FAQAccordion items={g.items} idPrefix={`faqs-${g.key}`} />
          </div>
        </section>
      ))}

      <CTASection />
    </>
  );
}
