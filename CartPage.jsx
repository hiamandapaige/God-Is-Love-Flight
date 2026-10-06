import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from './CartContext';
import { getProduct } from './products';
import { Image } from './image';
import CustomizableCross from './CustomizableCross';
import Checkout from './Checkout';

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
        <h1 className="font-display italic text-3xl text-black mb-2">Your cart is empty</h1>
        <p className="text-gray-400 mb-6">Browse our shop and find something you love.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white hover:opacity-90 transition">
          Start Shopping <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 sm:py-12">
      <h1 className="font-display italic text-3xl sm:text-4xl text-black mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => {
            const product = getProduct(item.productId);
            return (
              <div key={item.key} className="flex gap-4 rounded-xl bg-white border border-gray-100 p-4">
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center shrink-0 overflow-hidden p-1">
                  {item.type === 'cross' ? (
                    <CustomizableCross plain={item.plain} bodyColor={item.bodyColor} emblemColor={item.emblemColor} accentColor={item.accentColor} isColor={item.isColor} verseColor={item.verseColor} plainColor={item.plain ? item.bodyColor : undefined} className="w-full h-full" />
                  ) : product?.images?.[0] ? <Image src={product.images[0]} fittingType="fit" originWidth={1024} originHeight={1024} quality={80} className="w-full h-full" /> : <ShoppingBag size={24} className="text-gray-200" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-black truncate">{item.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{item.options}</p>
                  {item.type === 'cross' && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {(item.plain
                        ? ['bodyColor']
                        : ['bodyColor', 'emblemColor', 'accentColor', 'isColor', 'verseColor'])
                        .map((k) => (item[k] ? (
                          <span key={k} className="h-3.5 w-3.5 rounded-full ring-1 ring-gray-200" style={{ backgroundColor: item[k] }} title={k} />
                        ) : null))}
                    </div>
                  )}
                  <p className="font-semibold text-gold mt-1">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeItem(item.key)} className="text-gray-300 hover:text-red-500 transition"><Trash2 size={16} /></button>
                  <div className="flex items-center border border-gray-200 rounded-lg h-9 bg-white">
                    <button onClick={() => updateQty(item.key, item.qty - 1)} className="px-3 h-full text-gray-500 hover:text-black"><Minus size={13} /></button>
                    <span className="w-7 text-center text-sm font-medium">{item.qty}</span>
                    <button onClick={() => updateQty(item.key, item.qty + 1)} className="px-3 h-full text-gray-500 hover:text-black"><Plus size={13} /></button>
                  </div>
                </div>
              </div>
            );
          })}
          <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition mt-3">
            <ArrowLeft size={15} /> Continue shopping
          </Link>
        </div>
        <div className="rounded-xl bg-white border border-gray-100 p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-medium text-black mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-600"><span>Sales Tax (7%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between font-bold text-black text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
          <button onClick={() => setCheckoutOpen(true)} className="w-full mt-5 h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 text-sm font-bold uppercase tracking-wide text-gold-foreground hover:opacity-90 transition shadow-md">
            Checkout <ArrowRight size={16} />
          </button>
        </div>
      </div>
      {checkoutOpen && <Checkout onClose={() => setCheckoutOpen(false)} />}
    </div>
  );
}