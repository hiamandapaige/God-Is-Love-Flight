import React, { useState } from 'react';
import { useCart } from './CartContext';
import { X, Loader2, Lock } from 'lucide-react';

const TAX_RATE = 0.07; // keep in sync with functions/create-checkout.mjs

export default function Checkout({ onClose }) {
  const { items, subtotal } = useCart();
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = subtotal + tax;
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes,
          items: items.map((i) => ({ productId: i.productId, qty: i.qty, options: i.options })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) throw new Error(data.error || 'We could not start checkout. Please try again.');
      window.location.assign(data.url);
    } catch (err) {
      setStatus('idle');
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-space/50" onClick={onClose}>
      <div className="w-full max-w-lg bg-background rounded-3xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <p className="font-mono-tech font-semibold text-sm uppercase tracking-widest">Checkout</p>
          <button onClick={onClose} className="p-2 hover:text-gold transition" aria-label="Close"><X size={20} /></button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="glass-panel rounded-2xl p-4 space-y-2">
            {items.map((i) => (
              <div key={i.key} className="flex justify-between gap-4 text-sm">
                <span className="text-muted-foreground">{i.qty}× {i.name} {i.options && <span className="text-xs">({i.options})</span>}</span>
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
            <label className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">Notes (optional)</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={450} rows={3} className="mt-2 w-full rounded-xl border border-input bg-background p-3 text-sm focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/30" placeholder="Pickup preference or anything we should know about your order" />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
          <button type="submit" disabled={status === 'loading' || !items.length} className="h-12 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 font-mono-tech text-sm uppercase tracking-widest text-gold-foreground hover:animate-hover-stabilize gold-glow transition disabled:opacity-60">
            {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <Lock size={16} />}
            {status === 'loading' ? 'Opening secure checkout…' : 'Continue to secure payment'}
          </button>
          <p className="text-center text-xs text-muted-foreground">You'll enter your name, email, and card on Stripe's secure checkout page.</p>
        </form>
      </div>
    </div>
  );
}
