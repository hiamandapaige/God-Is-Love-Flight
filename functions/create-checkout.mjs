// Creates a Stripe Checkout session for the items in the shopping cart.
// Prices always come from products.js on the server, never from the browser,
// so nobody can change what they pay.
//
// Needs one environment variable in Netlify: STRIPE_SECRET_KEY
// (a test key while testing, then the live key when you go live).
import { PRODUCTS } from '../products.js';

const TAX_RATE = 0.07; // Sales tax added at checkout. Set to 0 to turn off.
const MAX_ITEMS = 20;
const MAX_QTY = 25;

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const cents = (dollars) => Math.round(dollars * 100);
const clean = (value, max) => String(value ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed' });

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return json(500, { error: 'Online payments are not set up yet. Please call (601) 573-7624 to place your order.' });

  let body;
  try { body = await req.json(); } catch { return json(400, { error: 'Invalid request.' }); }

  const cart = Array.isArray(body?.items) ? body.items.slice(0, MAX_ITEMS) : [];
  if (!cart.length) return json(400, { error: 'Your cart is empty.' });

  const params = new URLSearchParams();
  let subtotal = 0;
  let i = 0;
  const summary = [];
  for (const entry of cart) {
    const product = PRODUCTS.find((p) => p.id === entry?.productId);
    const qty = Math.floor(Number(entry?.qty));
    if (!product || !Number.isFinite(qty) || qty < 1 || qty > MAX_QTY) {
      return json(400, { error: 'Something in your cart is no longer available. Please refresh the page and try again.' });
    }
    const options = clean(entry.options, 250);
    // The chosen colors / scent go right in the item name, so they show on the
    // Stripe checkout page, the customer's receipt, and the payment in the dashboard.
    const itemName = options ? `${product.name} (${options})` : product.name;
    params.append(`line_items[${i}][quantity]`, String(qty));
    params.append(`line_items[${i}][price_data][currency]`, 'usd');
    params.append(`line_items[${i}][price_data][unit_amount]`, String(cents(product.price)));
    params.append(`line_items[${i}][price_data][product_data][name]`, itemName);
    // Also saved as "Item 1", "Item 2"... in the payment's details in the dashboard.
    params.append(`payment_intent_data[metadata][item_${i + 1}]`, `${qty}x ${itemName}`.slice(0, 500));
    summary.push(`${qty}x ${itemName}`);
    subtotal += cents(product.price) * qty;
    i++;
  }

  if (TAX_RATE > 0) {
    params.append(`line_items[${i}][quantity]`, '1');
    params.append(`line_items[${i}][price_data][currency]`, 'usd');
    params.append(`line_items[${i}][price_data][unit_amount]`, String(Math.round(subtotal * TAX_RATE)));
    params.append(`line_items[${i}][price_data][product_data][name]`, `Sales tax (${(TAX_RATE * 100).toFixed(0)}%)`);
  }

  const site = process.env.URL || new URL(req.url).origin;
  const notes = clean(body?.notes, 450);
  params.append('mode', 'payment');
  params.append('success_url', `${site}/shop/order-confirmed?session_id={CHECKOUT_SESSION_ID}`);
  params.append('cancel_url', `${site}/shop/cart`);
  params.append('phone_number_collection[enabled]', 'true');
  params.append('billing_address_collection', 'auto');
  // Ask for a US shipping address. It shows under "Shipping" on the payment.
  params.append('shipping_address_collection[allowed_countries][0]', 'US');
  // The description is the first line you see on a payment in the dashboard.
  const description = [summary.join(' | '), notes && `Notes: ${notes}`].filter(Boolean).join(' || ');
  params.append('payment_intent_data[description]', description.slice(0, 1000));
  if (notes) {
    params.append('metadata[order_notes]', notes);
    params.append('payment_intent_data[metadata][order_notes]', notes);
  }

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) {
    console.error('Stripe error:', data?.error?.message || res.status);
    return json(502, { error: 'We could not start checkout. Please try again in a moment.' });
  }
  return json(200, { url: data.url });
};
