import React from 'react';
import { MapPin } from 'lucide-react';
import { Image } from './image';
import TrainingBanner from './TrainingBanner';

// Service photos, each labeled with the type of service it shows.
const PHOTOS = [
  {
    src: '/media/services-1.png',
    alt: 'Aerial group photo of a family reunion',
    label: 'Family & Class Reunions',
  },
  {
    src: '/media/services-2-and-training-banner.png',
    alt: 'Aerial view of a residential neighborhood for roof and property work',
    label: 'Roof & Property',
    filter: 'contrast(1.08) saturate(1.14) brightness(1.04)',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-sky mb-3">// Flight Operations</p>
          <h2 className="font-mono-tech font-bold text-3xl sm:text-5xl tracking-tight">Services</h2>
        </div>

        <div className="space-y-24">
          <div>
          <h3 className="font-display italic text-2xl text-gold mb-8">Aerial Photography</h3>
          <div className="grid gap-8 md:grid-cols-2">
            {PHOTOS.map((p) => (
              <figure key={p.label} className="relative">
                <div className="absolute -inset-3 border border-gold/20 rounded-3xl" aria-hidden="true" />
                <Image
                  src={p.src}
                  alt={p.alt}
                  fittingType="fill"
                  focalPointX={0.5}
                  focalPointY={0.5}
                  quality={100}
                  className="rounded-3xl w-full aspect-[4/3]"
                  style={p.filter ? { filter: p.filter } : undefined}
                />
                <figcaption className="absolute bottom-5 left-5 glass-panel rounded-xl px-4 py-2 flex items-center gap-2">
                  <MapPin size={14} className="text-gold" />
                  <span className="font-mono-tech text-[11px] uppercase tracking-wider text-foreground">{p.label}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          </div>
          <div>
            <div className="max-w-7xl mx-auto px-6 mb-8">
              <h3 className="font-display italic text-2xl text-sky">Training</h3>
            </div>
            <TrainingBanner />
          </div>
        </div>
      </div>
    </section>
  );
}