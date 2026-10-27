import React from 'react';
import { CalendarCheck, MapPin, Plane, Clock, ExternalLink } from 'lucide-react';

// The Calendly booking page. Opens in a new tab.
const BOOKING_LINK = 'https://calendly.com/jhuffman38/30min';

const STEPS = [
  {
    icon: CalendarCheck,
    title: 'Pick your time',
    text: 'Choose an open class time on our booking calendar. Someone from our team will follow up with everything you need to know.',
  },
  {
    icon: MapPin,
    title: 'Meet at the fly zone',
    text: 'Classes are held at our Jackson, MS fly zone. All equipment is provided — just show up ready to learn.',
  },
  {
    icon: Plane,
    title: 'Take your first flight',
    text: 'Safety briefing, controller basics, then a guided launch, hover, and landing — all in one session.',
  },
];

export default function ClassForm() {
  return (
    <section id="apply" className="py-24 sm:py-32 bg-secondary/40">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center">
          <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-sky mb-3">// Flight Manifest</p>
          <h2 className="font-mono-tech font-bold text-3xl sm:text-5xl tracking-tight">Apply to Fly</h2>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/70">
            Ready to take the controls? Our Drone Pilot Class is a hands-on, beginner-friendly session.
            No experience required — you’ll leave having flown a drone yourself.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="glass-panel rounded-3xl p-7">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky/15">
                  <Icon size={20} className="text-sky" />
                </span>
                <span className="font-mono-tech text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-mono-tech font-bold text-lg">{title}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 glass-panel rounded-3xl p-8 sm:p-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono-tech text-sm uppercase tracking-widest">
            <span className="text-gold text-2xl font-bold normal-case tracking-normal">$35</span>
            <span className="flex items-center gap-2 text-sky"><Clock size={15} /> 1 hr 15 min</span>
            <span className="flex items-center gap-2 text-foreground/70"><MapPin size={15} className="text-gold" /> Jackson, MS</span>
          </div>

          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 h-14 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-10 font-mono-tech text-sm sm:text-base uppercase tracking-widest text-gold-foreground hover:animate-hover-stabilize gold-glow transition"
          >
            Book Your Class <ExternalLink size={16} />
          </a>

          <p className="mt-5 max-w-xl mx-auto text-sm text-foreground/80">
            <span className="font-semibold text-foreground">What happens next:</span> once you sign up, someone from our team
            will reach out to confirm your class and share the details you’ll need before your flight.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Opens our booking calendar in a new tab. The $35 class fee is collected at the fly zone — cash, card, or app payment.
          </p>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Booking a wedding, reunion, or custom project? Call or text{' '}
          <a href="tel:+16015737624" className="text-gold hover:underline">(601) 573-7624</a>.
        </p>
      </div>
    </section>
  );
}
