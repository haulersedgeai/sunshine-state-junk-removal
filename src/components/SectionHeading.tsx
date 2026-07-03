import { ReactNode } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  as: As = 'h2',
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <As>{title}</As>
      {intro && <p className="mt-4 text-lg text-ink-soft">{intro}</p>}
    </div>
  );
}
