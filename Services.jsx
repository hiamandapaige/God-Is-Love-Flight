import React from 'react';
import { Heart, Camera, Users, GraduationCap, ShieldCheck, MapPin } from 'lucide-react';
import { Image } from './image';
import TrainingBanner from './TrainingBanner';

const CELEBRATION = [
  { icon: Heart, type: 'wedding', title: 'Weddings', spec: 'Outdoor & Indoor · 4K Cinema', desc: 'Cinematic aerial coverage of your ceremony, from the first look to the final dance.' },
  { icon: Users, type: 'family_reunion', title: 'Family & Class Reunions', spec: 'Group Aerials · Photo + Video', desc: 'Capture the whole crew from a perspective no ground camera can reach.' },
  { icon: Camera, type: 'other', title: 'Celebrations', spec: 'Housewarmings · Picnics', desc: 'Every gathering becomes a memory worth keeping from above.' },
];

const TRAINING = [
  { icon: GraduationCap, type: 'flight_class', title: 'Flight Instruction', spec: 'Licensed · $35 / 1 hr 15 min', desc: 'Hands-on training that turns first-time flyers into confident pilots.' },
];

function Wing({ items, image, accent, reverse }) {
  return (
    <div className={`grid lg:grid-cols-2 gap-10 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
      <div className="space-y-5">
        {items.map((s) => (
          <div key={s.title} className="group glass-panel rounded-2xl p-6 hover:border-gold/40 transition">
            <div className="flex items-start gap-4">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent}`}>
                <s.icon size={20} />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-mono-tech font-semibold text-foreground">{s.title}</h4>
                  <span className="font-mono-tech text-[11px] uppercase tracking-wider text-sky">{s.spec}</span>
                </div>
                <p className="mt-1.5 text-sm text-foreground/75">{s.desc}</p>
              </div>
            </div>
            <a href={`/?service=${s.type}#apply`} className="mt-4 inline-flex h-9 items-center rounded-full border border-gold/40 px-4 font-mono-tech text-[11px] uppercase tracking-widest text-gold hover:bg-gold hover:text-gold-foreground transition">
              Book {s.title}
            </a>
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="absolute -inset-3 border border-gold/20 rounded-3xl" aria-hidden="true" />
        <Image
          src={image.src}
          alt={image.alt}
          fittingType="fill"
          focalPointX={image.focalX}
          focalPointY={image.focalY}
          quality={100}
          className={`rounded-3xl w-full ${image.aspect || 'aspect-[4/3]'}`}
          style={image.filter ? { filter: image.filter } : undefined}
        />
        {image.badge && (
          <div className="absolute bottom-4 left-4 glass-panel rounded-xl px-4 py-2 flex items-center gap-2">
            <MapPin size={14} className="text-gold" />
            <span className="font-mono-tech text-[11px] uppercase tracking-wider text-foreground">{image.badge}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-sky mb-3">// Dual-Wing Operations</p>
          <h2 className="font-mono-tech font-bold text-3xl sm:text-5xl tracking-tight">Services</h2>
        </div>

        <div className="space-y-24">
          <div>
            <h3 className="font-display italic text-2xl text-gold mb-8">Celebration Wing</h3>
            <Wing items={CELEBRATION} image={{ src: '/media/services-1.png', alt: 'Family reunion aerial group photo' }} accent="bg-gold/15 text-gold" />
          </div>
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