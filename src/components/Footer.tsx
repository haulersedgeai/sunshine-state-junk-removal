import Link from 'next/link';
import Image from 'next/image';
import { getSite, formattedAddress } from '@/data';
import { PhoneIcon, MessageIcon, MailIcon, ClockIcon, MapPinIcon } from './Icon';
import { Wordmark } from './Wordmark';

const footerNav = [
  {
    title: 'Services',
    links: [
      { label: 'Junk Removal', href: '/what-we-take/' },
      { label: 'Dump Trailer Rentals', href: '/dumpster-rentals/' },
      { label: 'Estate Cleanouts', href: '/what-we-take/' },
      { label: 'Construction Debris', href: '/what-we-take/' },
      { label: 'Pricing', href: '/pricing/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about-us/' },
      { label: 'Service Areas', href: '/service-areas/' },
      { label: 'FAQs', href: '/faqs/' },
      { label: 'Contact', href: '/contact-us/' },
    ],
  },
  {
    title: 'Popular Cities',
    links: [
      { label: 'Weston', href: '/weston/' },
      { label: 'Coral Springs', href: '/coral-springs-florida/' },
      { label: 'Pembroke Pines', href: '/pembroke-pines/' },
      { label: 'Sunrise', href: '/sunrise/' },
      { label: 'Davie', href: '/davie/' },
      { label: 'Hollywood', href: '/hollywood/' },
    ],
  },
];

export function Footer() {
  const site = getSite();
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-p py-12 sm:py-14 grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-lg bg-white/95 p-1.5 shadow-sm">
              <Image
                src="/images/Sunshine-Logo.svg"
                alt="Sunshine State Junk Removal"
                width={180}
                height={168}
                className="h-12 w-auto"
                priority={false}
              />
            </span>
            <Wordmark variant="footer" />
          </div>
          <p className="mt-4 text-white/90 max-w-sm">
            Family- and veteran-owned junk removal and dump-trailer rentals across Broward County, with select service in Miami-Dade and Palm Beach.
          </p>
          <div className="mt-5 flex flex-col gap-2 text-sm">
            <a href={`tel:${site.phone}`} className="inline-flex items-center gap-2 text-white no-underline hover:text-sun-300">
              <PhoneIcon className="h-4 w-4" /> {site.phoneDisplay}
            </a>
            <a href={`sms:${site.sms}`} className="inline-flex items-center gap-2 text-white no-underline hover:text-sun-300">
              <MessageIcon className="h-4 w-4" /> Text a photo for a quote
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-white no-underline hover:text-sun-300">
              <MailIcon className="h-4 w-4" /> {site.email}
            </a>
            <p className="inline-flex items-center gap-2 text-white/90">
              <ClockIcon className="h-4 w-4" /> {site.hours.display}
            </p>
            <address className="not-italic inline-flex items-start gap-2 text-white/90">
              <MapPinIcon className="h-4 w-4 mt-0.5 shrink-0" />
              <span>
                {formattedAddress}
                <span className="block text-white/80 text-xs mt-0.5">Serving {site.primaryCounty}, FL &amp; nearby</span>
              </span>
            </address>
          </div>
          <div className="mt-5 flex gap-4 text-xs">
            <a href={site.socials.google} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-sun-300 no-underline">Google</a>
            <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-sun-300 no-underline">Facebook</a>
            <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-sun-300 no-underline">Instagram</a>
            <a href={site.socials.yelp} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-sun-300 no-underline">Yelp</a>
            <a href={site.socials.nextdoor} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-sun-300 no-underline">Nextdoor</a>
          </div>
        </div>

        {footerNav.map((col) => (
          <div key={col.title}>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest">{col.title}</h3>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/90 no-underline hover:text-sun-300 text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/15">
        <div className="container-p py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-200">
          <p className="m-0 leading-relaxed">
            © {new Date().getFullYear()} {site.businessName}. Licensed &amp; insured. Veteran &amp; family-owned.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-200">
            <Link href="/terms-and-condition/" className="text-slate-200 no-underline hover:text-sun-300">Terms</Link>
            <Link href="/privacy-policy/" className="text-slate-200 no-underline hover:text-sun-300">Privacy</Link>
            <Link href="/faqs/" className="text-slate-200 no-underline hover:text-sun-300">FAQs</Link>
            <a
              href="https://adimize.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 no-underline hover:text-sun-300"
            >
              Powered by Adimize — Local Service Digital Marketing
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
