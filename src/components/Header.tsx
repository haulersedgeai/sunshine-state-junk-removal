'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getSite } from '@/data';
import { PhoneIcon, MessageIcon, MenuIcon, XIcon, StarIcon } from './Icon';

const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-us/' },
  { label: 'What We Take', href: '/what-we-take/' },
  { label: 'Dumpster Rentals', href: '/dumpster-rentals/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Service Areas', href: '/service-areas/' },
  { label: 'FAQs', href: '/faqs/' },
  { label: 'Contact', href: '/contact-us/' },
];

export function Header() {
  const site = getSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur transition-all ${
        scrolled ? 'bg-white/90 shadow-sm' : 'bg-white/70'
      }`}
    >
      <div className="border-b border-navy-100/60 bg-navy-900 text-white">
        <div className="container-p flex items-center justify-between py-1.5 text-[11.5px] sm:text-xs">
          <div className="flex items-center gap-2 text-sun-300">
            <StarIcon className="h-3.5 w-3.5" />
            <span className="font-semibold">5.0 · 159+ Google reviews</span>
            <span className="hidden sm:inline text-white/70">· Veteran & family-owned</span>
          </div>
          <a href={`tel:${site.phone}`} className="hidden sm:inline text-white no-underline hover:text-sun-300">
            {site.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="container-p flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-2 no-underline shrink-0" aria-label="Sunshine State Junk Removal home">
          <Image
            src="/images/Sunshine-Logo.svg"
            alt="Sunshine State Junk Removal"
            width={180}
            height={44}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="link-nav">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`sms:${site.sms}`}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-navy-50 px-4 py-2 text-sm font-semibold text-navy-900 no-underline hover:bg-navy-100"
          >
            <MessageIcon className="h-4 w-4" /> Text a photo
          </a>
          <a
            href={`tel:${site.phone}`}
            className="inline-flex items-center gap-2 rounded-full bg-sun-500 px-4 py-2 text-sm font-semibold text-navy-900 no-underline shadow-cta hover:bg-sun-400"
          >
            <PhoneIcon className="h-4 w-4" /> <span className="hidden xs:inline">Call</span> {site.phoneDisplay}
          </a>
          <button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-navy-900 hover:bg-navy-50"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-navy-900/60" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <Image src="/images/Sunshine-Logo.svg" alt="" width={140} height={36} className="h-9 w-auto" />
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-navy-50"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <XIcon />
              </button>
            </div>
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-navy-900 no-underline font-medium hover:bg-navy-50"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2 pt-6">
              <a href={`tel:${site.phone}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-sun-500 px-4 py-3 text-sm font-semibold text-navy-900 no-underline">
                <PhoneIcon className="h-4 w-4" /> Call {site.phoneDisplay}
              </a>
              <a href={`sms:${site.sms}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-4 py-3 text-sm font-semibold text-white no-underline">
                <MessageIcon className="h-4 w-4" /> Text a photo
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
