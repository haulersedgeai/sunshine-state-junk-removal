import { getServices } from '@/data';

export function ProcessSteps() {
  const process = getServices().process;
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {process.map((step) => (
        <div key={step.step} className="rounded-2xl bg-white ring-1 ring-navy-100 p-6 shadow-card">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sun-500 font-bold text-navy-900">
              {step.step}
            </span>
            <h3 className="text-lg font-semibold text-navy-900 m-0">{step.title}</h3>
          </div>
          <p className="mt-3 text-ink-soft">{step.desc}</p>
        </div>
      ))}
    </div>
  );
}
