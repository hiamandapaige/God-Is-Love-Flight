import React from 'react';
import { Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-space text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display italic text-4xl sm:text-6xl leading-tight">
              God Is <span className="text-gold">Love</span> Flights
            </h2>
            <p className="mt-5 max-w-md text-white/60">Faith, family, service, education, and opportunity — one flight at a time.</p>
            <div className="mt-8 space-y-3 text-sm">
              <a href="tel:+16015737624" className="flex items-center gap-3 text-white/80 hover:text-gold transition"><Phone size={16} className="text-sky" /> (601) 573-7624</a>
              <p className="flex items-center gap-3 text-white/80"><MapPin size={16} className="text-sky" /> Jackson, Mississippi · serving Central MS</p>
            </div>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-4">
            <img src="/media/logo.png" alt="God Is Love Flight emblem" className="h-28 w-28 rounded-full ring-2 ring-gold/40 animate-float-soft" />
            <a href="#apply" className="h-12 inline-flex items-center rounded-full bg-gold px-8 font-mono-tech text-sm uppercase tracking-widest text-gold-foreground hover:animate-hover-stabilize gold-glow transition">Book a Flight</a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono-tech text-xs uppercase tracking-widest text-white/40">© {new Date().getFullYear()} God Is Love Flight · Where It All Began</p>
          <p className="font-mono-tech text-xs uppercase tracking-widest text-white/40">Faith in the Heart · Vision in the Sky · Opportunities for the Future</p>
        </div>
      </div>
    </footer>
  );
}