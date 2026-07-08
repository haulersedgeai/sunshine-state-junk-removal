import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { fontDisplay, fontSans } from '@/lib/fonts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
import { JsonLd, graph, orgSchema } from '@/lib/schema';
import { SITE_URL } from '@/data';

const GSC = process.env.NEXT_PUBLIC_GSC_VERIFICATION || 'ajUPZbG0UaUl2IT7sfGSqb_zJfxw8zlGPnOBEulK8JY';
const GTM = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MD7RMZGV';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sunshine State Junk Removal | Fast Junk Removal',
    template: '%s | Sunshine State Junk Removal',
  },
  description:
    'Need fast junk removal in Florida? Sunshine State Junk Removal offers affordable, reliable service across Broward County. Call now for a free quote!',
  verification: { google: GSC },
  icons: {
    icon: [
      { url: '/images/Sunshine-Favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/images/Sunshine-Favicon.svg',
    apple: '/images/Sunshine-Favicon.svg',
  },
  manifest: undefined,
  applicationName: 'Sunshine State Junk Removal',
  authors: [{ name: 'Sunshine State Junk Removal' }],
};

export const viewport: Viewport = {
  themeColor: '#F58A0A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontSans.variable}`}>
      <head>
        <JsonLd data={graph([orgSchema()])} />
        {GTM && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');`}
          </Script>
        )}
      </head>
      <body className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        {GTM && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="gtm"
            />
          </noscript>
        )}
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-2 focus:left-2 focus:bg-navy-900 focus:text-white focus:px-4 focus:py-2 focus:rounded">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
