import { createHash } from 'crypto';

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { bookingId, bookingHash } = await request.json();
  if (!bookingId || !bookingHash) {
    return new Response(JSON.stringify({ error: 'Missing params' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const companyLogin = process.env.SIMPLYBOOKING_COMPANY_LOGIN;
  const apiKey = process.env.SIMPLYBOOKING_API_KEY;
  const secretKey = process.env.SIMPLYBOOKING_SECRET_KEY;

  if (!companyLogin || !apiKey || !secretKey) {
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const sign = createHash('md5')
    .update(String(bookingId) + String(bookingHash) + secretKey)
    .digest('hex');

  const tokenRes = await fetch('https://user-api.simplybook.me/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'getToken',
      params: [companyLogin, apiKey],
      id: 1
    })
  });
  const tokenData = await tokenRes.json();
  if (tokenData.error) {
    return new Response(JSON.stringify({ error: 'Auth failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const confirmRes = await fetch('https://user-api.simplybook.me/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Company-Login': companyLogin,
      'X-Token': tokenData.result
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'confirmBooking',
      params: [bookingId, sign],
      id: 2
    })
  });

  const result = await confirmRes.json();
  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' }
  });
}
