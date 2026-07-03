'use client';

import { useState } from 'react';
import { ChevronDownIcon } from './Icon';

export type FAQ = { q: string; a: string };

export function FAQAccordion({ items, idPrefix = 'faq' }: { items: FAQ[]; idPrefix?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-navy-100 rounded-2xl bg-white ring-1 ring-navy-100 shadow-card">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${idPrefix}-btn-${i}`;
        const panelId = `${idPrefix}-panel-${i}`;
        return (
          <div key={i}>
            <h3 className="m-0">
              <button
                id={btnId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left text-navy-900 font-semibold text-base sm:text-lg hover:bg-navy-50/60"
              >
                <span className="pr-4">{item.q}</span>
                <ChevronDownIcon
                  className={`mt-1 h-5 w-5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="px-5 pb-5 sm:px-6 sm:pb-6"
            >
              <p className="text-ink-soft leading-relaxed">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
