import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Image } from './image';
import HeroGraphics from './HeroGraphics';

// Scripture shown in the hero (KJV). Change the text or reference here.
const VERSE = {
  text: 'Heal me, O LORD, and I shall be healed; save me, and I shall be saved: for thou art my praise.',
  ref: 'Jeremiah 17:14',
};
const VERSE_RED = '#FF4D4D'; // bright enough to read on the dark photo

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <Image
        src="/media/hero-and-portfolio-1.png"
        alt="Aerial view of the Jackson Convention Complex"
        fittingType="fill"
        focalPointY={0.4}
        quality={100}
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-space/55 via-space/60 to-space/90" aria-hidden="true" />
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden="true" />
      <HeroGraphics />

      {/* HUD corner brackets */}
      <div className="pointer-events-none absolute inset-6 sm:inset-10 border border-white/20" aria-hidden="true">
        <span className="absolute -top-px -left-px h-6 w-6 border-t-2 border-l-2 border-gold" />
        <span className="absolute -top-px -right-px h-6 w-6 border-t-2 border-r-2 border-gold" />
        <span className="absolute -bottom-px -left-px h-6 w-6 border-b-2 border-l-2 border-gold" />
        <span className="absolute -bottom-px -right-px h-6 w-6 border-b-2 border-r-2 border-gold" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <img
          src="/media/logo.png"
          alt="God Is Love Flight logo"
          className="mx-auto h-28 w-28 sm:h-36 sm:w-36 rounded-full object-cover ring-2 ring-gold/60 shadow-2xl animate-float-soft mb-8"
        />
        <p className="font-mono-tech text-[11px] sm:text-xs uppercase tracking-[0.4em] text-sky mb-6" aria-hidden="true">
          ALT 400FT · LAT 32.3°N · LON 90.2°W · JACKSON, MS
        </p>
        <h1 className="font-mono-tech font-bold text-4xl sm:text-6xl md:text-7xl text-white leading-[0.95] tracking-tight">
          FLIGHT IS<br /><span className="text-gold">A GIFT</span>
        </h1>
        <p className="mt-6 font-display italic text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
          Capturing sacred moments, stewarding the world below, and teaching the next generation to soar.
        </p>
        <figure className="mt-8 mx-auto max-w-2xl">
          <div className="flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-12 sm:w-20" style={{ background: `linear-gradient(to right, transparent, ${VERSE_RED})` }} />
            <span className="h-1.5 w-1.5 rotate-45" style={{ background: VERSE_RED }} />
            <span className="h-px w-12 sm:w-20" style={{ background: `linear-gradient(to left, transparent, ${VERSE_RED})` }} />
          </div>
          <blockquote
            className="mt-4 font-display italic text-lg sm:text-xl"
            style={{ color: VERSE_RED, textShadow: '0 1px 12px rgba(0,0,0,0.65)' }}
          >
            &ldquo;{VERSE.text}&rdquo;
          </blockquote>
          <figcaption
            className="mt-3 font-mono-tech text-[11px] uppercase tracking-[0.35em]"
            style={{ color: VERSE_RED, textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
          >
            &mdash; {VERSE.ref}
          </figcaption>
        </figure>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#academy" className="h-12 inline-flex items-center rounded-full bg-gold px-8 font-mono-tech text-sm uppercase tracking-widest text-gold-foreground hover:animate-hover-stabilize gold-glow transition">
            Enroll in Flight Class
          </a>
          <a href="#services" className="h-12 inline-flex items-center rounded-full border border-white/30 px-8 font-mono-tech text-sm uppercase tracking-widest text-white hover:bg-white/10 transition">
            Explore Services
          </a>
        </div>
      </div>

      <a href="#origin" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-gold transition" aria-label="Scroll down">
        <ChevronDown className="animate-float-soft" size={28} />
      </a>
    </section>
  );
}