import Link from 'next/link';
import { Button } from '@/components/Button';
import { PhoneIcon, MessageIcon } from '@/components/Icon';
import { getSite } from '@/data';

export default function NotFound() {
  const site = getSite();
  return (
    <section className="section">
      <div className="container-p max-w-2xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-2">This page took a little vacation.</h1>
        <p className="mt-5 text-lg text-ink-soft">
          We couldn&apos;t find what you were looking for — but we can still help. Head back home, or reach out and we&apos;ll take care of you.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg" variant="primary">Back to home</Button>
          <Button href={`tel:${site.phone}`} size="lg" variant="secondary"><PhoneIcon className="h-4 w-4" /> Call {site.phoneDisplay}</Button>
          <Button href={`sms:${site.sms}`} size="lg" variant="outline"><MessageIcon className="h-4 w-4" /> Text a photo</Button>
        </div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
          {[
            { l: 'About', h: '/about-us/' },
            { l: 'What We Take', h: '/what-we-take/' },
            { l: 'Pricing', h: '/pricing/' },
            { l: 'Contact', h: '/contact-us/' },
          ].map((l) => (
            <Link key={l.h} href={l.h} className="rounded-full bg-white ring-1 ring-navy-200 px-3 py-2 text-navy-900 no-underline hover:bg-navy-50">{l.l}</Link>
          ))}
        </div>
      </div>
    </section>
  );
}
