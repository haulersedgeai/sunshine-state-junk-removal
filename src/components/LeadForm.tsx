'use client';

import Script from 'next/script';

const HCP_TOKEN = '1d77837b96bc42c8b7db91804481c275';
const HCP_ORG = 'Sunshine-State-Junk-Removal-And-Dumpster-Rental';

export function LeadForm() {
  return (
    <div
      className="rounded-2xl bg-white ring-1 ring-navy-100 shadow-card overflow-hidden"
      style={{ minHeight: 680 }}
    >
      <iframe
        id="hcp-lead-iframe"
        title="Request a quote — Sunshine State Junk Removal"
        src={`https://book.housecallpro.com/lead-form/${HCP_ORG}/${HCP_TOKEN}`}
        loading="lazy"
        style={{
          border: 'none',
          width: '100%',
          minHeight: 640,
          display: 'block',
        }}
      />
      <Script
        id="hcp-lead-form-loader"
        src={`https://online-booking.housecallpro.com/script.js?token=${HCP_TOKEN}&orgName=${HCP_ORG}`}
        strategy="lazyOnload"
      />
    </div>
  );
}
