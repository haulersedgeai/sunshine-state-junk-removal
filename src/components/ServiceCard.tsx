import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from './Icon';

export function ServiceCard({
  title,
  desc,
  image,
  alt,
  href,
  bullets,
}: {
  title: string;
  desc: string;
  image: string;
  alt: string;
  href: string;
  bullets?: string[];
}) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl bg-white ring-1 ring-navy-100 shadow-card no-underline hover:-translate-y-1 hover:shadow-lg transition-all"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-50">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 sm:p-7">
        <h3 className="text-navy-900 m-0">{title}</h3>
        <p className="mt-2 text-ink-soft">{desc}</p>
        {bullets && (
          <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sun-500" />
                {b}
              </li>
            ))}
          </ul>
        )}
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-navy-900 group-hover:text-sun-600">
          Learn more <ChevronRightIcon className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
