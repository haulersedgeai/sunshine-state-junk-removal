import site from '../../project-data/site.json';
import locationsJson from '../../project-data/locations.json';

export type LocationHours = {
  display: string;
  days: string[];
  opens: string;
  closes: string;
};

export type BusinessLocation = {
  id: string;
  label: string;
  slug: string;
  role: 'primary' | 'branch';
  address: { street: string; city: string; state: string; zip: string; country?: string };
  geo: { lat: number; lng: number };
  phone: string | null;
  phoneDisplay: string | null;
  hours: LocationHours | null;
  citiesServed: string[];
};

type RawLocation = {
  id: string;
  label: string;
  slug: string;
  role: string;
  address?: { street: string; city: string; state: string; zip: string };
  geo?: { lat: number; lng: number };
  phone?: string | null;
  phoneDisplay?: string | null;
  hours?: LocationHours | null;
  citiesServed: string[];
};

const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// The Coral Springs (primary) entry merges its NAP from site.json — the
// established single source for the original location — so the visible NAP,
// footer, and schema stay byte-identical with the rest of the site. The
// Southwest Ranches entry is fully self-contained in locations.json.
const resolve = (raw: RawLocation): BusinessLocation => {
  if (raw.role === 'primary') {
    return {
      id: raw.id,
      label: raw.label,
      slug: raw.slug,
      role: 'primary',
      address: site.address,
      geo: site.geo,
      phone: site.phone,
      phoneDisplay: site.phoneDisplay,
      hours:
        site.hours.structured === '24/7'
          ? { display: site.hours.display, days: ALL_DAYS, opens: '00:00', closes: '23:59' }
          : null,
      citiesServed: raw.citiesServed,
    };
  }
  return {
    id: raw.id,
    label: raw.label,
    slug: raw.slug,
    role: 'branch',
    address: raw.address!,
    geo: raw.geo!,
    phone: raw.phone ?? null,
    phoneDisplay: raw.phoneDisplay ?? null,
    hours: raw.hours ?? null,
    citiesServed: raw.citiesServed,
  };
};

export const getLocations = (): BusinessLocation[] =>
  (locationsJson.locations as RawLocation[]).map(resolve);

export const getLocationById = (id: string): BusinessLocation => {
  const loc = getLocations().find((l) => l.id === id);
  if (!loc) throw new Error(`Unknown location id: ${id}`);
  return loc;
};

// Same shape as formattedAddress in src/data/index.ts — one comma-separated
// line so NAP is character-identical wherever it renders.
export const formattedLocationAddress = (loc: BusinessLocation) =>
  `${loc.address.street}, ${loc.address.city}, ${loc.address.state} ${loc.address.zip}`;
