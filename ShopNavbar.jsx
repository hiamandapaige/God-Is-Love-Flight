import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, ArrowLeft } from 'lucide-react';
import { useCart } from './CartContext';

export default function ShopNavbar() {
  const { count } = useCart();
  return (
    <header>
      {/* Announcement bar */}
      <div className="bg-black text-white text-center text-[11px] sm:text-xs py-2 tracking-[0.2em] font-medium">
        FAITH † FASHION † SELF CARE † GOD IS LOVE
      </div>
      {/* Main nav */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/shop" className="flex items-center gap-2.5">
            <img src="/media/shop-navbar.png" alt="God Is Love emblem" className="h-9 w-9 rounded-full object-cover ring-1 ring-gray-200" />
            <div className="leading-none">
              <span className="block font-bold text-black text-sm tracking-tight">GOD IS LOVE</span>
              <span className="block text-gold text-[10px] tracking-[0.25em] font-semibold">SHOP</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/shop" className="text-sm font-medium text-black hover:text-gold transition">SHOP</Link>
            <Link to="/shop?category=crosses" className="text-sm font-medium text-black hover:text-gold transition">CROSSES</Link>
            <Link to="/shop?category=body-care" className="text-sm font-medium text-black hover:text-gold transition">BODY CARE</Link>
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-black hover:text-gold transition"><ArrowLeft size={15} /> BACK TO HOME</Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-gray-50 transition"><Search size={19} className="text-black" /></button>
            <Link to="/admin" className="h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-gray-50 transition"><User size={19} className="text-black" /></Link>
            <Link to="/shop/cart" className="relative h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-gray-50 transition">
              <ShoppingBag size={19} className="text-black" />
              {count > 0 && <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-gold-foreground">{count}</span>}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}