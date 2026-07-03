'use client';

import Script from 'next/script';

// Housecall Pro "Book online" widget. Renders the button div they expect,
// then loads their online-booking loader with next/script (afterInteractive)
// so it doesn't block first paint or SSR.
export function HousecallProButton() {
  return (
    <>
      <div
        className="housecallpro-book-online"
        data-token="543a8a86346844af9294c896132acf98"
        data-orgname="Sunshine-State-Junk-Removal-And-Dumpster-Rental"
      />
      <Script
        id="housecallpro-loader"
        src="https://online-booking.housecallpro.com/script.js?token=543a8a86346844af9294c896132acf98&orgName=Sunshine-State-Junk-Removal-And-Dumpster-Rental"
        strategy="afterInteractive"
      />
    </>
  );
}
