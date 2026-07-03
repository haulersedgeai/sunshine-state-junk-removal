import { ChevronDownIcon } from './Icon';

export type FAQ = { q: string; a: string };

// Server-rendered accordion built on native <details>/<summary>. Every answer
// is present in the initial HTML (important for SEO/AEO — search engines and
// LLMs can extract every FAQ answer without executing JS). Native keyboard
// support and screen-reader semantics are built in.
export function FAQAccordion({ items, idPrefix = 'faq' }: { items: FAQ[]; idPrefix?: string }) {
  return (
    <div className="divide-y divide-navy-100 rounded-2xl bg-white ring-1 ring-navy-100 shadow-card">
      {items.map((item, i) => (
        <details
          key={i}
          id={`${idPrefix}-${i}`}
          open={i === 0}
          className="group [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left text-navy-900 font-semibold text-base sm:text-lg hover:bg-navy-50/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sun-500">
            <span className="pr-4">{item.q}</span>
            <ChevronDownIcon
              aria-hidden="true"
              className="mt-1 h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <p className="text-ink-soft leading-relaxed">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
