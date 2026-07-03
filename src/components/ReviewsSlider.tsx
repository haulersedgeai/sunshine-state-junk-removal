'use client';

import { useRef } from 'react';
import { ReviewCard, Review } from './ReviewCard';
import { ChevronRightIcon } from './Icon';

export function ReviewsSlider({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.9;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };
  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 sm:gap-6 overflow-x-auto pb-2 pr-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r, i) => (
          <div key={i} className="snap-start shrink-0 w-[85%] sm:w-[46%] lg:w-[32%]">
            <ReviewCard review={r} />
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <a
          href="https://maps.app.goo.gl/rgW6sZRqi1o2MFQPA"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-navy-800 hover:text-sun-600 no-underline"
        >
          Read all 159 reviews on Google →
        </a>
        <div className="flex gap-2">
          <button
            aria-label="Previous review"
            onClick={() => scroll(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-navy-200 text-navy-900 hover:bg-navy-50"
          >
            <ChevronRightIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            aria-label="Next review"
            onClick={() => scroll(1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-navy-200 text-navy-900 hover:bg-navy-50"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
