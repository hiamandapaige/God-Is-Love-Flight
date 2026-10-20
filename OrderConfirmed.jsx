import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from './CartContext';

export default function OrderConfirmed() {
  const { clearCart } = useCart();
  useEffect(() => { clearCart(); }, []); // the order is paid, so empty the cart

  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <CheckCircle2 className="mx-auto text-gold mb-5" size={52} />
      <h1 className="font-mono-tech font-bold text-3xl">Thank you for your order!</h1>
      <p className="mt-4 text-muted-foreground">Your payment went through, and a receipt is on its way to your email. We'll reach out when your order is ready for pickup.</p>
      <p className="mt-2 text-muted-foreground">Questions? Call <a href="tel:+16015737624" className="text-gold hover:underline">(601) 573-7624</a>.</p>
      <Link to="/shop" className="mt-10 h-12 inline-flex items-center rounded-full bg-gold px-8 font-mono-tech text-sm uppercase tracking-widest text-gold-foreground gold-glow transition">Continue Shopping</Link>
    </div>
  );
}
