import { getSite } from '@/data';
import { MessageIcon } from './Icon';

export function PhotoQuoteBadge() {
  const site = getSite();
  return (
    <a
      href={`sms:${site.sms}`}
      className="inline-flex items-center gap-3 rounded-full bg-white pl-1.5 pr-4 py-1.5 ring-1 ring-navy-200 no-underline hover:ring-navy-900 shadow-sm"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sun-500 text-navy-900">
        <MessageIcon className="h-4 w-4" />
      </span>
      <span className="text-sm font-semibold text-navy-900">
        Text a photo → fast quote
      </span>
    </a>
  );
}
