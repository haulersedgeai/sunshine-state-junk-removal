import Link from 'next/link';
import { getServiceAreas } from '@/data';

export function AreasServed({ highlight }: { highlight?: string }) {
  const areas = getServiceAreas().fullAreasServed;
  const cityPages = getServiceAreas().serviceAreaPages;
  const slugFor = (city: string) => cityPages.find((p) => p.city === city)?.slug;

  const CityChip = ({ city }: { city: string }) => {
    const slug = slugFor(city);
    const isActive = highlight?.toLowerCase() === city.toLowerCase();
    const cls = `text-sm no-underline rounded-full px-3 py-1.5 ring-1 ${
      isActive
        ? 'bg-sun-500 text-navy-900 ring-sun-500 font-semibold'
        : slug
        ? 'bg-white text-navy-900 ring-navy-200 hover:ring-navy-900 hover:bg-navy-50'
        : 'bg-white text-ink-soft ring-navy-100'
    }`;
    return slug ? (
      <Link href={slug} className={cls}>{city}</Link>
    ) : (
      <span className={cls}>{city}</span>
    );
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div>
        <h3 className="text-navy-900 m-0">Broward County</h3>
        <p className="mt-2 text-ink-soft text-sm">Our primary service area — same-day availability across the county.</p>
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
