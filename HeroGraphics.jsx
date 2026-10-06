import React from 'react';

// Pure SVG / CSS decorative graphics — no image credits used.
export default function HeroGraphics() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Diagonal flight-path lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pathFade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="20%" x2="100%" y2="60%" stroke="url(#pathFade)" strokeWidth="1" strokeDasharray="6 8" />
        <line x1="0" y1="75%" x2="100%" y2="35%" stroke="url(#pathFade)" strokeWidth="1" strokeDasharray="6 8" />
        <line x1="20%" y1="0" x2="70%" y2="100%" stroke="url(#pathFade)" strokeWidth="1" strokeDasharray="4 10" />
      </svg>

      {/* Radar sweep — bottom right */}
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full border border-sky/20">
        <div className="absolute inset-4 rounded-full border border-sky/15" />
        <div className="absolute inset-10 rounded-full border border-sky/10" />
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute top-1/2 left-1/2 h-1/2 w-1/2 origin-top-left animate-sweep bg-[conic-gradient(from_0deg,rgba(56,189,248,0.25),transparent_60deg)]" />
        </div>
        <span className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky" />
      </div>

      {/* Floating drone silhouette — top left */}
      <svg viewBox="0 0 120 120" className="absolute top-28 left-6 sm:left-16 w-24 sm:w-32 opacity-80 animate-float-soft">
        <g fill="none" stroke="#D4AF37" strokeWidth="1.5">
          <circle cx="30" cy="30" r="14" opacity="0.6" />
          <circle cx="90" cy="30" r="14" opacity="0.6" />
          <circle cx="30" cy="90" r="14" opacity="0.6" />
          <circle cx="90" cy="90" r="14" opacity="0.6" />
          <line x1="30" y1="30" x2="60" y2="60" />
          <line x1="90" y1="30" x2="60" y2="60" />
          <line x1="30" y1="90" x2="60" y2="60" />
          <line x1="90" y1="90" x2="60" y2="60" />
        </g>
        <rect x="50" y="50" width="20" height="20" rx="4" fill="#0F172A" stroke="#D4AF37" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="4" fill="#38BDF8" />
      </svg>

      {/* HUD altitude gauge — bottom left */}
      <div className="absolute bottom-10 left-6 sm:left-16 glass-panel rounded-xl px-4 py-3 hidden sm:block">
        <p className="font-mono-tech text-[10px] uppercase tracking-widest text-sky">ALT</p>
        <p className="font-mono-tech text-2xl font-bold text-white">400<span className="text-sm text-white/50">ft</span></p>
        <div className="mt-1 h-1 w-24 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-2/3 bg-gradient-to-r from-sky to-gold" />
        </div>
      </div>

      {/* Scattered particles */}
      {[...Array(6)].map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gold/40 animate-float-soft"
          style={{
            top: `${15 + i * 13}%`,
            left: `${8 + ((i * 17) % 80)}%`,
            width: i % 2 ? '3px' : '5px',
            height: i % 2 ? '3px' : '5px',
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
}