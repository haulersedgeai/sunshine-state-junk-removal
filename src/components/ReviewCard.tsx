import { StarIcon } from './Icon';

export type Review = {
  name: string;
  source?: string;
  rating: number;
  text: string;
  when?: string;
  city?: string;
};

export function ReviewCard({ review, compact = false }: { review: Review; compact?: boolean }) {
  return (
    <figure className={`rounded-2xl bg-white ring-1 ring-navy-100 p-5 sm:p-6 shadow-card h-full flex flex-col ${compact ? '' : ''}`}>
      <div className="flex items-center gap-1 text-sun-500" aria-label={`${review.rating} out of 5`}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <StarIcon key={i} className="h-4 w-4" />
        ))}
      </div>
      <blockquote className="mt-3 text-ink-soft leading-relaxed text-[15px]">“{review.text}”</blockquote>
      <figcaption className="mt-4 flex items-center justify-between text-sm">
        <span className="font-semibold text-navy-900">{review.name}</span>
        <span className="text-ink-muted">
          {review.source ?? 'Google'}
          {review.when ? ` · ${review.when}` : ''}
        </span>
      </figcaption>
    </figure>
  );
}
