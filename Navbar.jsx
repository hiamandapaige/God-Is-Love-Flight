import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';

const LINKS = [
  { label: 'Origin', href: '#origin' },
  { label: 'Services', href: '#services' },
  { label: 'Academy', href: '#academy' },
  { label: 'Apply', href: '#apply' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-panel border-x-0 border-t-0">
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img src="/media/logo.png" alt="God Is Love Flight emblem" className="h-10 w-10 rounded-full object-cover ring-2 ring-gold/40" />
          <span className="font-mono-tech font-semibold text-sm tracking-tight text-foreground">GOD IS LOVE<span className="text-gold"> FLIGHT</span></span>
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors">{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-3">
          <Link to="/shop" className="h-10 inline-flex items-center gap-1.5 rounded-full border border-border px-5 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground hover:border-gold hover:text-gold transition"><ShoppingBag size={13} /> Shop</Link>
          <a href="#academy" className="h-10 inline-flex items-center rounded-full bg-gold px-5 font-mono-tech text-xs uppercase tracking-widest text-gold-foreground hover:animate-hover-stabilize gold-glow transition">Enroll · $35</a>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden glass-panel border-x-0 border-b-0 px-5 pb-5">
          <ul className="flex flex-col gap-3 pt-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block font-mono-tech text-sm uppercase tracking-widest text-muted-foreground hover:text-gold">{l.label}</a>
              </li>
            ))}
            <li>
              <Link to="/shop" onClick={() => setOpen(false)} className="block font-mono-tech text-sm uppercase tracking-widest text-gold">Shop</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}