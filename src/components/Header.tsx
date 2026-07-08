'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getSite } from '@/data';
import { PhoneIcon, MenuIcon, XIcon, MessageIcon } from './Icon';
import { Wordmark } from './Wordmark';

const nav = [
  { label: 'About', href: '/about-us/' },
  { label: 'Junk Removal', href: '/what-we-take/' },
  { label: 'Dumpster Rentals', href: '/dumpster-rentals/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Service Areas', href: '/service-areas/' },
];

export function Header() {
  const site = getSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const menu = open ? (
    <div className="fixed inset-0 z-[100] lg:hidden" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-navy-900/70" onClick={() => setOpen(false)} />
      <div
        className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-xl flex flex-col overflow-y-auto"
        style={{
          paddingTop: 'max(1.5rem, env(safe-area-inset-top))',
          paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
          paddingLeft: 'max(1.5rem, env(safe-area-inset-right))',
          paddingRight: 'max(1.5rem, env(safe-area-inset-right))',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <Wordmark />
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy-900 hover:bg-navy-50"
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
          <Link
            href="/faqs/"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-3 text-navy-900 no-underline font-medium hover:bg-navy-50"
          >
            FAQs
          </Link>
          <Link
            href="/contact-us/"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-3 text-navy-900 no-underline font-medium hover:bg-navy-50"
          >
            Contact
          </Link>
        </nav>
        <div className="mt-auto flex flex-col gap-2 pt-6">
          <a href={`tel:${site.phone}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-sun-500 px-4 py-3 text-sm font-semibold text-navy-900 no-underline min-h-[44px]">
            <PhoneIcon className="h-4 w-4" /> Call {site.phoneDisplay}
          </a>
          <a href={`sms:${site.sms}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-4 py-3 text-sm font-semibold text-white no-underline min-h-[44px]">
            <MessageIcon className="h-4 w-4" /> Text a photo
          </a>
          <Link href="/contact-us/#quote" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full bg-white ring-1 ring-navy-200 px-4 py-3 text-sm font-semibold text-navy-900 no-underline min-h-[44px]">
            Get a Quote
          </Link>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <header
        className={`sticky top-0 z-40 backdrop-blur transition-all border-b ${
          scrolled ? 'bg-white/95 shadow-sm border-navy-100/60' : 'bg-white/80 border-transparent'
        }`}
      >
        <div className="container-p flex items-center justify-between gap-3 py-3">
          <Wordmark />

          <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="link-nav">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${site.phone}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 no-underline hover:text-sun-600"
              aria-label={`Call ${site.phoneDisplay}`}
            >
              <PhoneIcon className="h-4 w-4" />
              {site.phoneDisplay}
            </a>
            <Link
              href="/contact-us/#quote"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-sun-500 px-4 py-2 text-sm font-semibold text-navy-900 no-underline shadow-cta hover:bg-sun-400 min-h-[44px]"
            >
              Get a Quote
            </Link>
            <button
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full text-navy-900 hover:bg-navy-50"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>
      {mounted && menu && createPortal(menu, document.body)}
    </>
  );
}
