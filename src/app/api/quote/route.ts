import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type QuotePayload = {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  location?: string;
  message?: string;
  photoNames?: string[];
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

async function sendViaResend(payload: QuotePayload) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL || 'info@sunshineremoval.com';
  if (!key) return { ok: false, reason: 'no-key' as const };

  const html = `
    <h2>New quote request</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
    ${payload.email ? `<p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>` : ''}
    ${payload.service ? `<p><strong>Service:</strong> ${escapeHtml(payload.service)}</p>` : ''}
    ${payload.location ? `<p><strong>Location:</strong> ${escapeHtml(payload.location)}</p>` : ''}
    ${payload.message ? `<p><strong>Message:</strong><br/>${escapeHtml(payload.message).replace(/\n/g, '<br/>')}</p>` : ''}
    ${payload.photoNames?.length ? `<p><strong>Attached photos (received):</strong> ${payload.photoNames.map(escapeHtml).join(', ')}</p><p><em>Note: photos are attached to the request; if you didn’t receive them, ask the customer to text them to (954) 247-1399.</em></p>` : ''}
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Sunshine State Quote Form <quotes@sunshineremoval.com>',
      to: [to],
      reply_to: payload.email || undefined,
      subject: `New quote — ${payload.name} (${payload.service || 'Junk Removal'})`,
      html,
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    return { ok: false, reason: 'send-failed' as const, detail: text };
  }
  return { ok: true as const };
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let name = '', phone = '', email = '', service = '', location = '', message = '', company = '';
    const photoNames: string[] = [];

    if (contentType.includes('multipart/form-data')) {
      const form = await req.formData();
      name = String(form.get('name') || '').trim();
      phone = String(form.get('phone') || '').trim();
      email = String(form.get('email') || '').trim();
      service = String(form.get('service') || '').trim();
      location = String(form.get('location') || '').trim();
      message = String(form.get('message') || '').trim();
      company = String(form.get('company') || '').trim();
      const photos = form.getAll('photos');
      for (const p of photos) {
        if (typeof p === 'object' && 'name' in p) {
          photoNames.push((p as File).name);
        }
      }
    } else {
      const body = await req.json();
      ({ name = '', phone = '', email = '', service = '', location = '', message = '', company = '' } = body);
    }

    // Honeypot
    if (company) return NextResponse.json({ ok: true }); // silently accept spam

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 });
    }

    const payload: QuotePayload = { name, phone, email, service, location, message, photoNames };

    const result = await sendViaResend(payload);

    if (result.ok) {
      return NextResponse.json({ ok: true });
    }

    if (result.reason === 'no-key') {
      // Log and no-op — configure RESEND_API_KEY in Vercel to enable email delivery.
      console.log('[quote] RESEND_API_KEY not set — new lead received:', payload);
      return NextResponse.json({ ok: true, note: 'received (email delivery not configured)' });
    }

    console.error('[quote] Send failed:', result);
    return NextResponse.json({ error: 'Message received but email delivery failed. We’ll follow up shortly — or call (954) 247-1399.' }, { status: 200 });
  } catch (err) {
    console.error('[quote] Unhandled error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please call or text (954) 247-1399.' }, { status: 500 });
  }
}
