import Image from 'next/image';
import { SectionHeading } from './SectionHeading';

const CARDS = [
  {
    src: '/images/dumpster-18yd-card.webp',
    alt: "18-Yard Dumpster — 14' Long × 7' Wide × 5' Tall. A strong fit for garage cleanouts, furniture removal, and renovation debris.",
    width: 1122,
    height: 1402,
  },
  {
    src: '/images/dumpster-21yd-card.webp',
    alt: "21-Yard Dumpster — 16' Long × 7' Wide × 5' Tall. Designed for larger projects such as estate cleanouts, full-property cleanups, and heavier debris loads.",
    width: 1122,
    height: 1402,
  },
];

export function DumpsterSpecs() {
  return (
    <section className="section">
      <div className="container-p">
        <SectionHeading
          eyebrow="Sizes & specs"
          title="Dumpster Sizes and Specifications"
          intro="Two driveway-safe dump-trailer sizes. Same 7-foot width and 5-foot height — pick the length that fits your project."
          align="center"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {CARDS.map((card) => (
            <Image
              key={card.src}
              src={card.src}
              alt={card.alt}
              width={card.width}
              height={card.height}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="block w-full h-auto"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
