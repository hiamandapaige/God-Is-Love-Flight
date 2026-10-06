import React from 'react';

export default function FlightReel() {
  return (
    <section className="py-24 sm:py-32 bg-space text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden="true" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
          {/* HUD corner brackets */}
          <span className="pointer-events-none absolute top-3 left-3 z-20 h-7 w-7 border-t-2 border-l-2 border-gold/70 rounded-tl-lg" aria-hidden="true" />
          <span className="pointer-events-none absolute top-3 right-3 z-20 h-7 w-7 border-t-2 border-r-2 border-gold/70 rounded-tr-lg" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-3 left-3 z-20 h-7 w-7 border-b-2 border-l-2 border-gold/70 rounded-bl-lg" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-3 right-3 z-20 h-7 w-7 border-b-2 border-r-2 border-gold/70 rounded-br-lg" aria-hidden="true" />

          {/* REC badge */}
          <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 glass-panel rounded-full px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-gold">REC · AERIAL</span>
          </div>

          <video
            src="/media/video-flight-reel.MOV"
            poster="/media/portfolio-4-and-flight-reel-poster.png"
            controls
            playsInline
            className="w-full aspect-video object-cover h-[420px] sm:h-[560px]"
          />
        </div>

        <div className="mt-8 text-center">
          <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-sky mb-3">// In Flight</p>
          <p className="max-w-xl mx-auto text-sm text-white/70">A short reel of real aerial work over Jackson and the surrounding reservoirs.</p>
        </div>
      </div>
    </section>
  );
}