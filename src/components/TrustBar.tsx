import { StarIcon, ShieldIcon, SunIcon, CheckIcon } from './Icon';

export function TrustBar() {
  return (
    <div className="border-y border-navy-100 bg-sky-soft/70">
      <div className="container-p py-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-sm">
        <div className="flex items-center gap-2 text-navy-900">
          <StarIcon className="h-4 w-4 text-sun-500" />
          <span className="font-semibold">5.0 · 159+ Google reviews</span>
        </div>
        <div className="flex items-center gap-2 text-navy-900">
          <ShieldIcon className="h-4 w-4 text-navy-700" />
          <span className="font-semibold">Licensed & insured</span>
        </div>
        <div className="flex items-center gap-2 text-navy-900">
          <SunIcon className="h-4 w-4 text-sun-500" />
          <span className="font-semibold">Family & veteran-owned</span>
        </div>
        <div className="flex items-center gap-2 text-navy-900">
          <CheckIcon className="h-4 w-4 text-sun-500" />
          <span className="font-semibold">Same-day & 24/7</span>
        </div>
      </div>
    </div>
  );
}
