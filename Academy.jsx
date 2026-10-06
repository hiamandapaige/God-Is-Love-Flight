import React from 'react';
import { Check, Clock, MapPin, Radio } from 'lucide-react';
import { Image } from './image';

const CHECKLIST = [
  'Preflight safety briefing and airspace check',
  'Hands-on controller orientation',
  'Guided first launch, hover & landing',
  'Flying in all directions, turning, changing directions smoothly',
  'Basic aerial photography capture',
  'Good habit instructions for responsible drone operation',
];

export default function Academy() {
  return (
    <section id="academy" className="py-24 sm:py-32 grid-lines">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-sky mb-3">// Academy Portal</p>
          <h2 className="font-mono-tech font-bold text-3xl sm:text-5xl tracking-tight">Drone Academy</h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">Licensed, hands-on drone instruction. A complete first flight in 1 hr 15 min — no experience required.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image src="/media/academy.png" alt="Students in hands-on drone flight training" fittingType="fill" focalPointY={0.45} quality={100} className="rounded-3xl aspect-[3/2] w-full" />
            <div className="absolute top-4 left-4 glass-panel rounded-xl px-4 py-2 flex items-center gap-2">
              <Radio size={14} className="text-sky animate-pulse" />
              <span className="font-mono-tech text-[11px] uppercase tracking-wider text-foreground">LIVE TRAINING</span>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8">
            <div className="flex items-baseline justify-between border-b border-border pb-5">
              <div>
                <p className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">Flight Readiness Session</p>
                <p className="font-display italic text-2xl text-foreground mt-1">Drone Pilot Class</p>
              </div>
              <div className="text-right">
                <p className="font-mono-tech text-4xl font-bold text-gold">$35</p>
                <p className="font-mono-tech text-[11px] uppercase tracking-wider text-sky flex items-center gap-1 justify-end">
                  <Clock size={12} /> 1 HR 15 MIN
                </p>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {CHECKLIST.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky/15"><Check size={13} className="text-sky" /></span>
                  <span className="text-sm text-foreground">{c}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin size={14} className="text-gold" /> Jackson, MS fly zone · equipment provided
            </div>

            <a href="#apply" className="mt-8 h-12 w-full inline-flex items-center justify-center rounded-full bg-gold px-8 font-mono-tech text-sm uppercase tracking-widest text-gold-foreground hover:animate-hover-stabilize gold-glow transition">
              Apply for Class
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}