// pages/api/sell-your-car.js
//
// Receives the "Sell Your Car" form and emails it to Titan Global Auto Group.
// Uses Resend's REST API (no extra npm package needed).
//
// SETUP (one-off):
//   1. Sign up at https://resend.com using titanglobalautogroup@gmail.com
//      (the free sandbox only delivers to the address the account was made with).
//   2. Resend dashboard -> API Keys -> Create API Key.
//   3. Vercel -> your project -> Settings -> Environment Variables ->
//      add  RESEND_API_KEY = (the key)  -> Save -> Redeploy.
//      (For local testing put it in .env.local instead.)
//
// Optional: once you've verified titanglobalautogroup.com in Resend you can also
// add  SELL_FROM_EMAIL = Titan Global Auto Group <noreply@titanglobalautogroup.com>
// so the emails come from your own domain.

const TO_EMAIL = 'titanglobalautogroup@gmail.com';
const FROM_EMAIL =
  process.env.SELL_FROM_EMAIL || 'Titan Global Auto Group <onboarding@resend.dev>';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value, max) => String(value ?? '').trim().slice(0, max);

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};

  // Honeypot: real visitors never see/fill this hidden field, bots usually do.
  if (body.website) {
    return res.status(200).json({ ok: true });
  }

  const data = {
    title: clean(body.title, 20),
    firstName: clean(body.firstName, 80),
    lastName: clean(body.lastName, 80),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    make: clean(body.make, 80),
    model: clean(body.model, 80),
    year: clean(body.year, 10),
    description: clean(body.description, 5000),
  };

  const required = ['firstName', 'lastName', 'email', 'make', 'model', 'year', 'description'];
  if (required.some((key) => !data[key])) {
    return res.status(400).json({ error: 'Please fill in all the required fields.' });
  }
  if (!EMAIL_RE.test(data.email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('sell-your-car: RESEND_API_KEY is not set');
    return res.status(500).json({
      error: 'Sorry, our form is temporarily unavailable. Please call or email us instead.',
    });
  }

  const fullName = [data.title, data.firstName, data.lastName].filter(Boolean).join(' ');
  const vehicle = `${data.year} ${data.make} ${data.model}`;
  const subject = `New sell-your-car enquiry: ${vehicle}`.replace(/[\r\n]+/g, ' ');

  const rows = [
    ['Name', fullName],
    ['Email', data.email],
    ['Phone', data.phone || 'Not provided'],
    ['Vehicle', vehicle],
    ['Additional information', data.description],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n\n');
  const html =
    `<h2 style="font-family:Arial,sans-serif">New sell-your-car enquiry</h2>` +
    `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">` +
    rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:8px 16px 8px 0;vertical-align:top;color:#666"><strong>${escapeHtml(
            label
          )}</strong></td><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
      )
      .join('') +
    `</table>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: data.email, // hitting "Reply" in Gmail writes back to the seller
        subject,
        html,
        text,
      }),
    });

    if (!response.ok) {
      console.error('sell-your-car: Resend error', response.status, await response.text());
      return res.status(502).json({
        error: 'Sorry, we could not send your details. Please try again or call us.',
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('sell-your-car: send failed', err);
    return res.status(502).json({
      error: 'Sorry, we could not send your details. Please try again or call us.',
    });
  }
}
