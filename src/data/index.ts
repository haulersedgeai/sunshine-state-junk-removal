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

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  (site as Site).domain.replace(/\/$/, '');

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
