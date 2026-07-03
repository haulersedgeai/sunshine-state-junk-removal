import { getSite } from '@/data';
import { Button } from './Button';
import { PhoneIcon, MessageIcon } from './Icon';

export function CTASection({
  eyebrow = 'Ready when you are',
  title = 'Get a fast, straightforward quote today',
  intro,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  const site = getSite();
  return (
    <section className="section">
      <div className="container-p">
        <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-12 sm:px-12 sm:py-14 text-white shadow-card">
          <div className="pointer-events-none absolute inset-0 opacity-40 bg-hero-gradient" />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] items-center">
            <div>
              <p className="eyebrow text-sun-300">{eyebrow}</p>
              <h2 className="mt-2 text-white">{title}</h2>
              <p className="mt-4 text-white/80 text-lg max-w-xl">
                {intro ??
                  'Text a few clear photos to get pricing fast — no runaround, no pressure. Same-day and next-day availability across Broward County.'}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button href={`tel:${site.phone}`} size="lg" variant="primary" className="w-full">
                <PhoneIcon className="h-4 w-4" /> Call {site.phoneDisplay}
              </Button>
              <Button href={`sms:${site.sms}`} size="lg" variant="outline" className="w-full">
                <MessageIcon className="h-4 w-4" /> Text a photo
              </Button>
              <Button href="/contact-us/" size="lg" variant="ghost" className="w-full text-white hover:bg-white/10">
                Get a fast quote →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
