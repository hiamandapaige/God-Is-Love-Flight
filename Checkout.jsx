import React, { useState } from 'react';
import { submitNetlifyForm } from './netlifyForm';
import { useCart } from './CartContext';
import { X, Loader2, CheckCircle2 } from 'lucide-react';

export default function Checkout({ onClose }) {
  const { items, subtotal, clearCart } = useCart();
  const tax = subtotal * 0.07;
  const total = subtotal + tax;
  const [form, setForm] = useState({ customer_name: '', email: '', phone: '', notes: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      await submitNetlifyForm('order', {
        customer_name: form.customer_name,
        email: form.email,
        phone: form.phone,
        notes: form.notes,
        items: items
          .map((i) => `${i.qty} x ${i.name}${i.options ? ` (${i.options})` : ''} @ $${Number(i.price).toFixed(2)}`)
          .join('\n'),
        total: `$${total.toFixed(2)} (incl. 7% tax)`,
      });
      clearCart();
      setStatus('done');
    } catch (err) {
      setStatus('idle');
      setError(err?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-space/50" onClick={onClose}>
      <div className="w-full max-w-lg bg-background rounded-3xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <p className="font-mono-tech font-semibold text-sm uppercase tracking-widest">Checkout</p>
          <button onClick={onClose} className="p-2 hover:text-gold transition"><X size={20} /></button>
        </div>

        {status === 'done' ? (
          <div className="p-10 text-center">
            <CheckCircle2 className="mx-auto text-gold mb-4" size={48} />
            <h3 className="font-mono-tech font-bold text-2xl">Order Received</h3>
            <p className="mt-3 text-muted-foreground">Thank you, {form.customer_name.split(' ')[0]}. We’ll confirm your order and payment details by email shortly.</p>
            <button onClick={onClose} className="mt-8 h-11 inline-flex items-center rounded-full bg-gold px-8 font-mono-tech text-xs uppercase tracking-widest text-gold-foreground hover:animate-hover-stabilize transition">Continue Shopping</button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="glass-panel rounded-2xl p-4 space-y-2">
              {items.map((i) => (
                <div key={i.key} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{i.qty}× {i.name} <span className="text-xs">({i.options})</span></span>
                  <span className="font-mono-tech">${(i.price * i.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm text-muted-foreground"><span>Sales Tax (7%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-mono-tech font-bold pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-gold">${total.toFixed(2)}</span>
              </div>
            </div>

            <div>
              <label className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">Full Name *</label>
              <input required value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} className="mt-2 w-full h-12 rounded-xl border border-input bg-background px-4 text-sm focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/30" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">Email *</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full h-12 rounded-xl border border-input bg-background px-4 text-sm focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/30" />
              </div>
              <div>
                <label className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">Phone</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full h-12 rounded-xl border border-input bg-background px-4 text-sm focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/30" />
              </div>
            </div>
            <div>
              <label className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">Notes</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className="mt-2 w-full rounded-xl border border-input bg-background p-3 text-sm focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/30" placeholder="Pickup preference, custom cross details, class scheduling…" />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
            <button type="submit" disabled={status === 'loading'} className="h-12 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 font-mono-tech text-sm uppercase tracking-widest text-gold-foreground hover:animate-hover-stabilize gold-glow transition disabled:opacity-60">
              {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : null}
              {status === 'loading' ? 'Placing Order…' : `Place Order · $${total.toFixed(2)}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}