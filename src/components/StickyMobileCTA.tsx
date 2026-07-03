import { getSite } from '@/data';
import { PhoneIcon, MessageIcon } from './Icon';

export function StickyMobileCTA() {
  const site = getSite();
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_-8px_rgba(20,28,42,0.15)]">
      <div className="grid grid-cols-2 gap-2 p-2">
        <a
          href={`tel:${site.phone}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-sun-500 py-3 text-sm font-semibold text-navy-900 no-underline"
          aria-label="Call now"
        >
          <PhoneIcon className="h-4 w-4" /> Call now
        </a>
        <a
          href={`sms:${site.sms}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 py-3 text-sm font-semibold text-white no-underline"
          aria-label="Text a photo"
        >
          <MessageIcon className="h-4 w-4" /> Text a photo
        </a>
      </div>
    </div>
  );
}
