import React from 'react';
import { Image } from './image';
import { Camera, MapPin } from 'lucide-react';

const SHOTS = [
  {
    src: '/media/hero-and-portfolio-1.png',
    alt: 'Aerial view of the Jackson Convention Complex',
    title: 'Jackson Convention Complex',
    meta: 'Architectural · Urban Survey',
    span: 'sm:col-span-2 sm:row-span-2',
  },
  {
    src: '/media/portfolio-2.png',
    alt: 'Aerial view of a modern glass-and-steel convention center',
    title: 'Glass Facade Inspection',
    meta: 'Insurance · Facade Detail',
    span: '',
  },
  {
    src: '/media/portfolio-3.png',
    alt: 'Aerial view of the Kosciusko water tower',
    title: 'Kosciusko Water Tower',
    meta: 'Landmark · Aerial Survey',
    span: '',
  },
  {
    src: '/media/portfolio-4-and-flight-reel-poster.png',
    alt: 'Aerial view of a reservoir marina and peninsula',
    title: 'Reservoir Marina Survey',
    meta: 'Aerial · Site Survey',
    span: '',
  },
  {
    src: '/media/portfolio-5-drone-photo.jpeg',
    alt: 'Aerial view of the Jackson Convention Complex facade',
    title: 'Convention Complex · Facade',
    meta: 'Architectural · Detail',
    span: '',
  },
];

export default function Portfolio() {
  return (
    <section className="py-24 sm:py-32 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-sky mb-3">// Flight Log</p>
            <h2 className="font-mono-tech font-bold text-3xl sm:text-5xl tracking-tight">Recent Flights</h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">Real aerial work from the field — architecture, inspections, and historic landmarks captured from above.</p>
        </div>

        <div className="grid sm:grid-cols-3 auto-rows-[220px] sm:auto-rows-[260px] gap-4">
          {SHOTS.map((s) => (
            <figure key={s.title} className={`group relative overflow-hidden rounded-2xl border border-border ${s.span}`}>
              <Image src={s.src} alt={s.alt} fittingType="fill" quality={100} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-space/80 via-space/10 to-transparent" aria-hidden="true" />
              <figcaption className="absolute bottom-0 inset-x-0 p-5">
                <p className="font-mono-tech text-[10px] uppercase tracking-widest text-sky flex items-center gap-1.5"><MapPin size={11} /> {s.meta}</p>
                <p className="mt-1 font-mono-tech font-semibold text-white">{s.title}</p>
              </figcaption>
              <span className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full glass-panel text-gold opacity-0 group-hover:opacity-100 transition"><Camera size={14} /></span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}