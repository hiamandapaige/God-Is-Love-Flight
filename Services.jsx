import React from 'react';
import { MapPin } from 'lucide-react';
import { Image } from './image';
import TrainingBanner from './TrainingBanner';

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
            <div className="relative">
              <div className="absolute -inset-3 border border-gold/20 rounded-3xl" aria-hidden="true" />
              <Image
                src="/media/services-2-and-training-banner.png"
                alt="Aerial view of residential tree removal and property inspection"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.5}
                quality={100}
                className="rounded-3xl w-full aspect-[16/9]"
                style={{ filter: 'contrast(1.08) saturate(1.14) brightness(1.04)' }}
              />
              <div className="absolute bottom-5 left-5 glass-panel rounded-xl px-4 py-2 flex items-center gap-2">
                <MapPin size={14} className="text-gold" />
                <span className="font-mono-tech text-[11px] uppercase tracking-wider text-foreground">Roof & Property · Jackson, MS</span>
              </div>
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