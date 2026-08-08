import site from '../../project-data/site.json';
import services from '../../project-data/services.json';
import serviceAreas from '../../project-data/service-areas.json';
import faqs from '../../project-data/faqs.json';
import reviews from '../../project-data/reviews.json';
import images from '../../project-data/images.json';
import redirects from '../../project-data/redirects.json';
import cities from '../../project-data/cities.json';

export type Site = typeof site;
export type Services = typeof services;
export type ServiceAreas = typeof serviceAreas;
export type Faqs = typeof faqs;
export type Reviews = typeof reviews;
export type Images = typeof images;

export const getSite = (): Site => site as Site;
export const getServices = (): Services => services as Services;
export const getServiceAreas = (): ServiceAreas => serviceAreas as ServiceAreas;
export const getFaqs = (): Faqs => faqs as Faqs;
export const getReviews = (): Reviews => reviews as Reviews;
export const getImages = (): Images => images as Images;
export const getRedirects = () => redirects;

// ---------------------------------------------------------------------------
// Pricing derivation
//
// services.json is the single source of truth for every price on the site.
// Prose that quotes a price must derive it from a structured field rather than
// restating the literal, so a price change is a one-line edit in one file.
//
// The prohibited-items surcharge lives in `prohibitedItems.surchargeUsd`; the
// sentence that quotes it is stored as `introTemplate` with a {surcharge}
// placeholder. Rendering the template raw would leak the placeholder to the
// page, which is why the key is named `introTemplate` and not `intro` — a raw
// render is then obviously wrong at the call site instead of silently shipping.
//
// scripts/validate-pricing.js enforces the two files that cannot derive
// (faqs.json, public/llms.txt) against this file at prebuild time.
// ---------------------------------------------------------------------------

export const formatUsd = (amount: number): string => `$${amount}`;

const dumpsterPricing = () => (services as Services).pricing.dumpsterRental;

/**
 * Price of a dump trailer size, looked up by its yardage rather than by array
 * index, so reordering `sizes` cannot silently swap the two rates in prose.
 * Throws rather than rendering "$undefined" — a missing size is a data error
 * that should stop the build, not ship a broken sentence.
 */
const sizePrice = (yards: number): string => {
  const match = dumpsterPricing().sizes.find((s) => parseInt(s.size, 10) === yards);
  if (!match) {
    throw new Error(
      `services.json: pricing.dumpsterRental.sizes has no ${yards}-yard entry, but prose references it.`
    );
  }
  return formatUsd(match.price);
};

/**
 * Every price token a prose template may reference. Adding a placeholder to
 * services.json without adding it here leaves the raw "{token}" visible on the
 * page — deliberate, so the omission is caught at a glance instead of shipping.
 */
const priceTokens = (): Record<string, string> => {
  const dr = dumpsterPricing();
  return {
    '{extendedRental}': formatUsd(dr.extendedRentalUsd),
    '{lateFeePerDay}': formatUsd(dr.lateFeePerDayUsd),
    '{overagePerTon}': formatUsd(dr.overagePerTon),
    '{surcharge}': formatUsd(dr.prohibitedItems.surchargeUsd),
    '{size18Price}': sizePrice(18),
    '{size21Price}': sizePrice(21),
  };
};

/** Resolve every {token} in a pricing prose template against services.json. */
export const resolvePriceTemplate = (template: string): string => {
  const tokens = priceTokens();
  return Object.entries(tokens).reduce(
    (out, [token, value]) => out.split(token).join(value),
    template
  );
};

/** The prohibited-items surcharge, as a formatted string (e.g. "$100"). */
export const prohibitedItemsSurcharge = (): string =>
  formatUsd(dumpsterPricing().prohibitedItems.surchargeUsd);

/** The prohibited-items intro sentence with the live surcharge interpolated. */
export const prohibitedItemsIntro = (): string =>
  resolvePriceTemplate(dumpsterPricing().prohibitedItems.introTemplate);

/** The 14-day rental upcharge, as a formatted string (e.g. "$125"). */
export const extendedRentalFee = (): string => formatUsd(dumpsterPricing().extendedRentalUsd);

/** The per-day fee past day 14, as a formatted string (e.g. "$25"). */
export const lateFeePerDay = (): string => formatUsd(dumpsterPricing().lateFeePerDayUsd);

/** Dumpster-rental footnotes with every price interpolated from services.json. */
export const dumpsterRentalNotes = (): string[] =>
  dumpsterPricing().noteTemplates.map(resolvePriceTemplate);

/** The dump-trailer rate summary sentence, prices interpolated. */
export const trailerPricingSummary = (): string =>
  resolvePriceTemplate((services as Services).pricing.trailerPricingTemplate);

export type JunkRemovalCity = {
  slug: string;
  city: string;
  county: string;
  isHQ: boolean;
  eyebrow: string;
  distinctIntro: string;
  commonScenarios: string[];
  serviceNote: string;
  neighborhoods: string[];
  landmarks: string[];
  nearby: { label: string; href: string }[];
  cityFaqs: { q: string; a: string }[];
  title: string;
  metaDescription: string;
  closer: string;
};

export const getCities = (): JunkRemovalCity[] =>
  (cities as { junkRemovalCities: JunkRemovalCity[] }).junkRemovalCities;

export const getCityBySlug = (slug: string): JunkRemovalCity | undefined =>
  getCities().find((c) => c.slug === slug);

// Single source of truth for the canonical host. Every canonical tag, og:url,
// sitemap entry, robots.txt reference, and JSON-LD url/@id derives from this.
//
// www.sunshineremoval.com is the production host; the apex 308-redirects to it.
// Emitting the apex anywhere means pointing search engines at a redirect, so the
// bare apex is normalized up to www even if it arrives that way from the
// environment. This is deliberately narrow — it matches only our own apex and
// leaves preview hosts (*.vercel.app) and localhost untouched.
const toCanonicalHost = (raw: string) =>
  raw.replace(/^https?:\/\/sunshineremoval\.com/i, 'https://www.sunshineremoval.com');

export const SITE_URL = toCanonicalHost(
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    (site as Site).domain.replace(/\/$/, '')
);

export const absoluteUrl = (path: string) => {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
};

export const imageUrl = (localFilename: string) => `/images/${localFilename}`;

// Single source of truth for the visible NAP address string.
// This is built from the same site.json fields the LocalBusiness schema uses,
// so the visible address and the schema's PostalAddress are always identical.
export const formattedAddress = (() => {
  const a = (site as Site).address;
  return `${a.street}, ${a.city}, ${a.state} ${a.zip}`;
})();

export const findImage = (localFilename: string) => {
  const all = [
    ...(images.brand || []),
    ...(images.sections || []),
    ...(images.gallery || []),
  ];
  return all.find((i) => i.localFilename === localFilename);
};

export type CityRoute = { city: string; state: string; slug: string };

export const getAllServiceAreaPages = (): CityRoute[] =>
  (serviceAreas as ServiceAreas).serviceAreaPages;

export const getAllDumpsterPages = (): CityRoute[] =>
  (serviceAreas as ServiceAreas).dumpsterRentalPages;

// Given a slug like "/weston/", return the segment for App Router: "weston"
export const slugToSegment = (slug: string) =>
  slug.replace(/^\//, '').replace(/\/$/, '');
