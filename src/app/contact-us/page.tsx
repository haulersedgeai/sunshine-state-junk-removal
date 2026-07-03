import { Metadata } from 'next';
import Link from 'next/link';
import { getSite } from '@/data';
import { pageMetadata } from '@/lib/seo';
import { SectionHeading } from '@/components/SectionHeading';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { QuoteForm } from '@/components/QuoteForm';
import { Button } from '@/components/Button';
import { PhoneIcon, MessageIcon, MailIcon, ClockIcon, MapPinIcon, StarIcon } from '@/components/Icon';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Sunshine State Junk Removal',
  description:
    'Get a fast, straightforward junk removal quote in Broward County. Call, text a photo, or fill out our quick contact form.',
  path: '/contact-us/',
});

export default function ContactPage() {
  const site = getSite();
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact-us/' }]} />

      <section className="section">
        <div className="container-p">
          <SectionHeading
            eyebrow="Get in touch"
            title="Get a fast, honest quote — usually within the hour."
            intro="Text a few clear photos for the fastest reply. Prefer to talk? Call us any time — we&rsquo;re available around the clock for urgent jobs."
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <QuoteForm />

            <aside className="space-y-4">
              <div className="rounded-2xl bg-navy-900 text-white p-6">
                <h3 className="m-0 text-white">Fastest ways to reach us</h3>
                <p className="mt-2 text-white/80 text-sm">Real humans, quick replies — no phone trees.</p>
                <div className="mt-5 space-y-3">
                  <Button href={`tel:${site.phone}`} variant="primary" size="md" className="w-full">
                    <PhoneIcon className="h-4 w-4" /> Call {site.phoneDisplay}
                  </Button>
                  <Button href={`sms:${site.sms}`} variant="outline" size="md" className="w-full bg-transparent text-white ring-white/30 hover:bg-white/10">
                    <MessageIcon className="h-4 w-4" /> Text a photo
                  </Button>
                  <a href={`mailto:${site.email}`} className="flex items-center justify-center gap-2 text-white/90 hover:text-sun-300 no-underline text-sm">
                    <MailIcon className="h-4 w-4" /> {site.email}
                  </a>
                </div>
              </div>

              <div className="rounded-2xl bg-white ring-1 ring-navy-100 p-6 shadow-card space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <ClockIcon className="h-4 w-4 mt-0.5 text-navy-700" />
                  <div>
                    <p className="m-0 font-semibold text-navy-900">Hours</p>
                    <p className="m-0 text-ink-soft">{site.hours.display}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-4 w-4 mt-0.5 text-navy-700" />
                  <div>
                    <p className="m-0 font-semibold text-navy-900">Service area</p>
                    <p className="m-0 text-ink-soft">Broward County, FL — plus select Miami-Dade & Palm Beach service.</p>
                    <Link href="/service-areas/" className="text-sm font-semibold text-navy-800 hover:text-sun-600 no-underline">See all cities →</Link>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <StarIcon className="h-4 w-4 mt-0.5 text-sun-500" />
                  <div>
                    <p className="m-0 font-semibold text-navy-900">5.0 · 159+ Google reviews</p>
                    <a href={site.socials.google} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-navy-800 hover:text-sun-600 no-underline">Read them on Google →</a>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl ring-1 ring-navy-100 shadow-card">
                <iframe
                  title="Service area map"
                  src="https://www.google.com/maps/d/embed?mid=1w206hNLnoiuCFsSI2okpRZHAOnx_Vhw"
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
