import Link from 'next/link';
import { getServiceAreas } from '@/data';
import { ChevronRightIcon } from './Icon';

export function AreasServed({ highlight }: { highlight?: string }) {
  const areas = getServiceAreas().fullAreasServed;
  const cityPages = getServiceAreas().serviceAreaPages;
  const slugFor = (city: string) => cityPages.find((p) => p.city === city)?.slug;

  const CityChip = ({ city }: { city: string }) => {
    const slug = slugFor(city);
    const isActive = highlight?.toLowerCase() === city.toLowerCase();

    // Distinct visual treatment:
    // - linked cities: white background, navy border, small right-arrow, hover state
    // - plain (no page): pill with muted foreground, no border, no arrow
    if (slug) {
      return (
        <Link
          href={slug}
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm no-underline transition-colors ${
            isActive
              ? 'bg-sun-500 text-navy-900 ring-1 ring-sun-500 font-semibold'
              : 'bg-white text-navy-900 font-semibold ring-1 ring-navy-300 hover:ring-navy-900 hover:bg-navy-50'
          }`}
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
    <div className="grid gap-8 lg:grid-cols-3">
      <div>
        <h3 className="text-navy-900 m-0">Broward County</h3>
        <p className="mt-2 text-ink-soft text-sm">
          Our primary service area — same-day availability across the county. <span className="text-navy-900 font-semibold">Cities with an arrow → have their own page.</span>
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {areas.browardCounty.map((c) => <CityChip key={c} city={c} />)}
        </div>
      </div>
      <div>
        <h3 className="text-navy-900 m-0">Miami-Dade</h3>
        <p className="mt-2 text-ink-soft text-sm">Select service across northern Miami-Dade communities.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {areas.miamiDade.map((c) => <CityChip key={c} city={c} />)}
        </div>
      </div>
      <div>
        <h3 className="text-navy-900 m-0">Palm Beach</h3>
        <p className="mt-2 text-ink-soft text-sm">Select service into southern Palm Beach County.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {areas.palmBeach.map((c) => <CityChip key={c} city={c} />)}
        </div>
      </div>
    </div>
  );
}
