import { getServices } from '@/data';
import { SectionHeading } from './SectionHeading';

type Dimensions = { lengthFt: number; widthFt: number; heightFt: number; volumeYd: number };

const VB_W = 360;
const VB_H = 240;
const MAX_LEN_UNITS = 16;
const BODY_MAX_W = 250;
const BODY_H = 88;

function TrailerDiagram({ dimensions, title }: { dimensions: Dimensions; title: string }) {
  const bodyW = (dimensions.lengthFt / MAX_LEN_UNITS) * BODY_MAX_W;
  const cx = VB_W / 2;
  const bodyY = 92;
  const bodyLeft = cx - bodyW / 2;
  const bodyRight = cx + bodyW / 2;
  const bodyBottom = bodyY + BODY_H;

  const wheelR = 14;
  const axleY = bodyBottom + wheelR - 4;
  const wheelInset = 24;
  const wheel1X = bodyLeft + wheelInset;
  const wheel2X = bodyLeft + wheelInset + 34;
  const wheel3X = bodyRight - wheelInset - 34;
  const wheel4X = bodyRight - wheelInset;

  const tongueTipX = bodyLeft - 34;
  const tongueTipY = bodyY + BODY_H / 2 + 6;

  const arrowTopY = bodyY - 30;
  const arrowLeftX = bodyLeft - 62;
  const depthOffset = 18;

  return (
    <svg
      role="img"
      aria-labelledby={`${title.replace(/\s+/g, '-').toLowerCase()}-title`}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="block w-full h-auto"
    >
      <title id={`${title.replace(/\s+/g, '-').toLowerCase()}-title`}>{title}</title>

      <defs>
        <marker id="arrow-end" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0F1F3A" />
        </marker>
        <marker id="arrow-start" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 10 0 L 0 5 L 10 10 z" fill="#0F1F3A" />
        </marker>
      </defs>

      {/* Depth (width) hint — a subtle offset rectangle behind the body for perspective */}
      <rect
        x={bodyLeft + depthOffset}
        y={bodyY - depthOffset}
        width={bodyW}
        height={BODY_H}
        rx="4"
        fill="#F58A0A"
        opacity="0.35"
      />
      <line
        x1={bodyLeft}
        y1={bodyY}
        x2={bodyLeft + depthOffset}
        y2={bodyY - depthOffset}
        stroke="#0F1F3A"
        strokeWidth="1.25"
        opacity="0.6"
      />
      <line
        x1={bodyRight}
        y1={bodyY}
        x2={bodyRight + depthOffset}
        y2={bodyY - depthOffset}
        stroke="#0F1F3A"
        strokeWidth="1.25"
        opacity="0.6"
      />

      {/* Trailer body */}
      <rect
        x={bodyLeft}
        y={bodyY}
        width={bodyW}
        height={BODY_H}
        rx="4"
        fill="#FFC24D"
        stroke="#0F1F3A"
        strokeWidth="1.75"
      />
      {/* Top rail */}
      <line x1={bodyLeft} y1={bodyY + 10} x2={bodyRight} y2={bodyY + 10} stroke="#0F1F3A" strokeWidth="1" opacity="0.5" />
      {/* Vertical panel ribs */}
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={bodyLeft + bodyW * f}
          y1={bodyY + 10}
          x2={bodyLeft + bodyW * f}
          y2={bodyBottom}
          stroke="#0F1F3A"
          strokeWidth="0.9"
          opacity="0.4"
        />
      ))}

      {/* Tongue / hitch */}
      <polyline
        points={`${bodyLeft},${bodyBottom - 8} ${tongueTipX},${tongueTipY} ${bodyLeft},${bodyY + BODY_H / 2 + 14}`}
        fill="none"
        stroke="#0F1F3A"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx={tongueTipX} cy={tongueTipY} r="3.5" fill="#0F1F3A" />

      {/* Wheels */}
      {[wheel1X, wheel2X, wheel3X, wheel4X].map((wx) => (
        <g key={wx}>
          <circle cx={wx} cy={axleY} r={wheelR} fill="#0F1F3A" />
          <circle cx={wx} cy={axleY} r={wheelR - 5} fill="#3B4658" />
        </g>
      ))}

      {/* Ground line */}
      <line
        x1={16}
        y1={axleY + wheelR + 4}
        x2={VB_W - 16}
        y2={axleY + wheelR + 4}
        stroke="#0F1F3A"
        strokeWidth="1"
        strokeDasharray="3 4"
        opacity="0.5"
      />

      {/* LENGTH arrow (top) */}
      <line
        x1={bodyLeft}
        y1={arrowTopY}
        x2={bodyRight}
        y2={arrowTopY}
        stroke="#0F1F3A"
        strokeWidth="1.5"
        markerStart="url(#arrow-start)"
        markerEnd="url(#arrow-end)"
      />
      <line x1={bodyLeft} y1={arrowTopY - 6} x2={bodyLeft} y2={bodyY - 4} stroke="#0F1F3A" strokeWidth="1" opacity="0.6" />
      <line x1={bodyRight} y1={arrowTopY - 6} x2={bodyRight} y2={bodyY - 4} stroke="#0F1F3A" strokeWidth="1" opacity="0.6" />
      <rect x={cx - 22} y={arrowTopY - 12} width="44" height="20" rx="4" fill="#ffffff" />
      <text
        x={cx}
        y={arrowTopY + 3}
        textAnchor="middle"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontSize="16"
        fontWeight="700"
        fill="#0F1F3A"
      >
        {dimensions.lengthFt}&#39;
      </text>

      {/* HEIGHT arrow (left) */}
      <line
        x1={arrowLeftX}
        y1={bodyY}
        x2={arrowLeftX}
        y2={bodyBottom}
        stroke="#0F1F3A"
        strokeWidth="1.5"
        markerStart="url(#arrow-start)"
        markerEnd="url(#arrow-end)"
      />
      <line x1={arrowLeftX + 6} y1={bodyY} x2={bodyLeft - 4} y2={bodyY} stroke="#0F1F3A" strokeWidth="1" opacity="0.6" />
      <line x1={arrowLeftX + 6} y1={bodyBottom} x2={bodyLeft - 4} y2={bodyBottom} stroke="#0F1F3A" strokeWidth="1" opacity="0.6" />
      <rect x={arrowLeftX - 18} y={bodyY + BODY_H / 2 - 10} width="36" height="20" rx="4" fill="#ffffff" />
      <text
        x={arrowLeftX}
        y={bodyY + BODY_H / 2 + 4}
        textAnchor="middle"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontSize="16"
        fontWeight="700"
        fill="#0F1F3A"
      >
        {dimensions.heightFt}&#39;
      </text>

      {/* WIDTH (depth) label */}
      <line
        x1={bodyRight + 4}
        y1={bodyY - 4}
        x2={bodyRight + depthOffset + 22}
        y2={bodyY - depthOffset - 18}
        stroke="#0F1F3A"
        strokeWidth="1.25"
        markerEnd="url(#arrow-end)"
        opacity="0.85"
      />
      <text
        x={bodyRight + depthOffset + 26}
        y={bodyY - depthOffset - 20}
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontSize="13"
        fontWeight="700"
        fill="#0F1F3A"
      >
        {dimensions.widthFt}&#39; wide
      </text>
    </svg>
  );
}

export function DumpsterSpecs() {
  const sizes = getServices().pricing.dumpsterRental.sizes;

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
          {sizes.map((s) => {
            const d = s.dimensions;
            const title = `${s.size} dump trailer, ${d.lengthFt} feet long by ${d.widthFt} feet wide by ${d.heightFt} feet tall`;
            return (
              <article
                key={s.size}
                className="rounded-3xl bg-sky-soft/60 ring-1 ring-navy-100 p-4 sm:p-6 shadow-card"
              >
                <div className="rounded-2xl bg-white ring-1 ring-navy-100 p-4 sm:p-6">
                  <TrailerDiagram dimensions={d} title={title} />
                </div>
                <div className="mt-5 px-1 sm:px-2">
                  <h3 className="text-navy-900 m-0 text-2xl font-bold">{s.size.replace(' Yard', '-Yard')} Dumpster</h3>
                  <p className="mt-2 text-navy-800 font-semibold text-sm">
                    {d.lengthFt}&#39; Long × {d.widthFt}&#39; Wide × {d.heightFt}&#39; Tall
                  </p>
                  <p className="mt-3 text-ink-soft">{s.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
