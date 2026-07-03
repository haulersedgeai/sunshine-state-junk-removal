import Link from 'next/link';
import { SunIcon } from './Icon';

// Brand wordmark used in the header (and echoed as text in the footer).
// "Sunshine State" in navy + "Junk Removal" in sunshine orange, one tasteful
// lockup, bold display font.
export function Wordmark({
  variant = 'header',
  ariaLabel = 'Sunshine State Junk Removal — home',
}: {
  variant?: 'header' | 'footer';
  ariaLabel?: string;
}) {
  const isFooter = variant === 'footer';
  return (
    <Link
      href="/"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-2 no-underline group"
    >
      <span
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
          isFooter ? 'bg-sun-500 text-navy-900' : 'bg-sun-500 text-navy-900'
        }`}
        aria-hidden="true"
      >
        <SunIcon className="h-4 w-4" />
      </span>
      <span className="font-display font-bold leading-none tracking-tight text-lg sm:text-xl">
        <span className={isFooter ? 'text-white' : 'text-navy-900'}>Sunshine State</span>{' '}
        <span className="text-sun-500">Junk Removal</span>
      </span>
    </Link>
  );
}
