import Link from 'next/link';
import { getServiceAreas } from '@/data';
import { getLocations } from '@/data/locations';
import { ChevronRightIcon } from './Icon';

// Service-area presentation, split by dispatching location. The two city
// lists live in project-data/locations.json and are locked — do not add,
// remove, or reassign cities here.
export function AreasServed() {
  const cityPages = getServiceAreas().serviceAreaPages;
  const slugFor = (city: string) => cityPages.find((p) => p.city === city)?.slug;

  const CityChip = ({ city }: { city: string }) => {
    const slug = slugFor(city);

    // Distinct visual treatment:
    // - linked cities: white background, navy border, small right-arrow, hover state
    // - plain (no page): pill with muted foreground, no border, no arrow
    if (slug) {
      return (
        <Link
          href={slug}
          className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm no-underline transition-colors bg-white text-navy-900 font-semibold ring-1 ring-navy-300 hover:ring-navy-900 hover:bg-navy-50"
        >
          <span>{city}</span>
          <ChevronRightIcon className="h-3 w-3 text-sun-600" aria-hidden="true" />
        </Link>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full px-3 py-1.5 text-sm text-ink-soft bg-navy-50/60">
        {city}
      </span>
    );
  };

  return (
    <div>
      <p className="m-0 text-ink-soft text-sm">
        <span className="text-navy-900 font-semibold">Cities with an arrow → have their own page.</span>
      </p>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {getLocations().map((loc) => (
          <div key={loc.id}>
            <h3 className="m-0 text-navy-900">
              <Link href={loc.slug} className="inline-flex items-center gap-1 text-navy-900 no-underline hover:text-sun-600">
                {loc.label} location
                <ChevronRightIcon className="h-4 w-4 text-sun-600" aria-hidden="true" />
              </Link>
            </h3>
            <p className="mt-2 text-ink-soft text-sm">Serves:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {loc.citiesServed.map((c) => (
                <CityChip key={c} city={c} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
