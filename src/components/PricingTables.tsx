import Link from 'next/link';
import { getServices } from '@/data';
import { CheckIcon, ChevronRightIcon } from './Icon';

export function PricingHookStrip({ variant = 'junk' }: { variant?: 'junk' | 'dumpster' }) {
  const p = getServices().pricing;
  const price = variant === 'junk' ? `$${p.junkRemoval.priceFrom}` : `$${p.dumpsterRental.priceFrom}`;
  const label = variant === 'junk' ? 'junk removal' : 'dump trailer rentals';
  return (
    <div className="rounded-2xl bg-sun-50 ring-1 ring-sun-200 p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-sun-500 text-navy-900 font-bold text-sm shrink-0">$</span>
        <div>
          <p className="m-0 text-navy-900 font-semibold">Transparent pricing — {label} from {price}.</p>
          <p className="m-0 text-ink-soft text-sm mt-0.5">Public load tiers and rental rates, labor and disposal explained upfront.</p>
        </div>
      </div>
      <Link href="/pricing/" className="inline-flex items-center gap-1 rounded-full bg-navy-900 text-white text-sm font-semibold px-4 py-2 no-underline hover:bg-navy-800 transition-colors">
        See all pricing <ChevronRightIcon className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

const usd = (n: number) => `$${n.toLocaleString('en-US')}`;

export function JunkRemovalPricingTable() {
  const jr = getServices().pricing.junkRemoval;
  return (
    <div className="rounded-3xl bg-white ring-1 ring-navy-100 shadow-card overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-navy-100 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Junk removal pricing</p>
          <h3 className="mt-2 text-navy-900">18-yard dump trailer — full-service haul-away.</h3>
          <p className="mt-2 text-ink-soft max-w-xl text-sm">
            Priced by how much space your items fill in our 18-yard trailer. Photo quotes confirm the tier before we ever roll up.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sun-500 text-navy-900 font-semibold text-xs px-3 py-1.5 whitespace-nowrap">
          <CheckIcon className="h-3.5 w-3.5" /> Includes labor & disposal
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-sky-soft/60 text-navy-900 text-xs uppercase tracking-widest">
            <tr>
              <th scope="col" className="px-6 py-3 font-semibold">Load size</th>
              <th scope="col" className="px-6 py-3 font-semibold">What that looks like</th>
              <th scope="col" className="px-6 py-3 font-semibold text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {jr.tiers.map((t) => (
              <tr key={t.label}>
                <th scope="row" className="px-6 py-4 font-semibold text-navy-900 whitespace-nowrap">{t.label}</th>
                <td className="px-6 py-4 text-ink-soft text-sm">{t.visual}</td>
                <td className="px-6 py-4 text-right font-semibold text-navy-900 tabular-nums">{usd(t.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="border-t border-navy-100 bg-sky-soft/40 px-6 sm:px-8 py-4 space-y-2 text-xs text-ink-soft">
        {jr.notes.map((n) => (
          <li key={n} className="flex items-start gap-2">
            <span aria-hidden="true" className="mt-1.5 inline-block h-1 w-1 rounded-full bg-navy-400 shrink-0" />
            <span>{n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DumpsterRentalPricingTable() {
  const dr = getServices().pricing.dumpsterRental;
  return (
    <div className="rounded-3xl bg-white ring-1 ring-navy-100 shadow-card overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-navy-100 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Dumpster rental pricing</p>
          <h3 className="mt-2 text-navy-900">Load at your own pace — you pay the dump fees.</h3>
          <p className="mt-2 text-ink-soft max-w-xl text-sm">
            Driveway-safe dump trailers, delivered and picked up. Base rental plus disposal at <strong>${dr.dumpFeePerTon}/ton</strong> at scale-out.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 text-white font-semibold text-xs px-3 py-1.5 whitespace-nowrap">
          + ${dr.dumpFeePerTon}/ton dump fees
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-sky-soft/60 text-navy-900 text-xs uppercase tracking-widest">
            <tr>
              <th scope="col" className="px-6 py-3 font-semibold">Trailer size</th>
              <th scope="col" className="px-6 py-3 font-semibold text-right">24 hours</th>
              <th scope="col" className="px-6 py-3 font-semibold text-right">24–72 hours</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {dr.sizes.map((s) => {
              const map = Object.fromEntries(s.durations.map((d) => [d.duration, d.price]));
              return (
                <tr key={s.size}>
                  <th scope="row" className="px-6 py-4 font-semibold text-navy-900 whitespace-nowrap">{s.size}</th>
                  <td className="px-6 py-4 text-right font-semibold text-navy-900 tabular-nums">{usd(map['24 hr'])}</td>
                  <td className="px-6 py-4 text-right font-semibold text-navy-900 tabular-nums">{usd(map['24–72 hr'])}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ul className="border-t border-navy-100 bg-sky-soft/40 px-6 sm:px-8 py-4 space-y-2 text-xs text-ink-soft">
        {dr.notes.map((n) => (
          <li key={n} className="flex items-start gap-2">
            <span aria-hidden="true" className="mt-1.5 inline-block h-1 w-1 rounded-full bg-navy-400 shrink-0" />
            <span>{n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
