'use client';

import { useState } from 'react';
import { Button } from './Button';
import { CheckIcon } from './Icon';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function QuoteForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    try {
      const form = e.currentTarget;
      const fd = new FormData(form);
      const res = await fetch('/api/quote', { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please call or text us.');
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-white ring-1 ring-navy-100 p-8 sm:p-10 shadow-card">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sun-100 text-sun-600">
          <CheckIcon className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-navy-900">Thanks — we got your request.</h3>
        <p className="mt-2 text-ink-soft">
          We'll reply shortly with a straightforward quote. If it's urgent, call or text us at{' '}
          <a href="tel:+19542471399" className="font-semibold text-navy-900">(954) 247-1399</a>.
        </p>
      </div>
    );
  }

  const inputCls =
    'w-full rounded-xl bg-white ring-1 ring-navy-200 px-4 py-3 text-navy-900 placeholder-ink-muted focus:ring-2 focus:ring-sun-500 focus:outline-none';

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white ring-1 ring-navy-100 p-6 sm:p-8 shadow-card space-y-4" noValidate>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-navy-900">Name</span>
          <input required name="name" type="text" autoComplete="name" placeholder="Your name" className={`mt-1.5 ${inputCls}`} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-navy-900">Phone</span>
          <input required name="phone" type="tel" autoComplete="tel" placeholder="(954) 555-0123" className={`mt-1.5 ${inputCls}`} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-navy-900">Email</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={`mt-1.5 ${inputCls}`} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-navy-900">Preferred service</span>
          <select name="service" defaultValue="Junk Removal" className={`mt-1.5 ${inputCls}`}>
            <option>Junk Removal</option>
            <option>Dump Trailer Rentals</option>
            <option>Not sure — help me decide</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-navy-900">Service address or city</span>
        <input name="location" type="text" placeholder="City, ZIP or full address" className={`mt-1.5 ${inputCls}`} />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-navy-900">Tell us what you need removed</span>
        <textarea name="message" rows={4} placeholder="A quick description helps us prep an accurate quote." className={`mt-1.5 ${inputCls}`} />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-navy-900">Photos (optional but fastest)</span>
        <input name="photos" type="file" accept="image/*" multiple className="mt-1.5 block w-full text-sm text-ink-soft file:mr-3 file:rounded-full file:border-0 file:bg-navy-900 file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-navy-800" />
        <span className="mt-1 block text-xs text-ink-muted">Or text photos directly to (954) 247-1399 for the fastest reply.</span>
      </label>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Get my fast quote'}
        </Button>
        <p className="text-xs text-ink-muted">No spam. Reply from a real human, usually quickly.</p>
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600" role="alert">{error}</p>
      )}
    </form>
  );
}
