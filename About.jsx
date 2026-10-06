import React from 'react';

const PILLARS = [
  { title: 'Faith in the Heart', desc: 'Every flight is an act of stewardship.' },
  { title: 'Vision in the Sky', desc: 'A divine perspective on life below.' },
  { title: 'Opportunities for the Future', desc: 'Skills that lift young people higher.' },
];

export default function About() {
  return (
    <section id="origin" className="relative py-24 sm:py-32 grid-lines">
      <div className="max-w-3xl mx-auto px-6">
        <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-sky mb-4">// Where It All Began</p>
        <h2 className="font-mono-tech font-bold text-3xl sm:text-5xl tracking-tight text-foreground">
          GOD IS LOVE <span className="text-gold">FLIGHT</span>
        </h2>

        <div className="mt-8 space-y-5 text-base sm:text-lg text-foreground/80">
          <p>God Is Love Flight began with the favorite scripture of Jesse Huffman, the founder of this business. <span className="text-foreground font-medium">1 John 4:8</span> expresses God&apos;s self-giving love. It was the founder&apos;s vision to use drones for more than just flying &mdash; to teach young people and adults valuable skills and give them a future in technology and aviation.</p>
          <p>It is a business where aerial views make a difference. Whether in real estate viewings, roofing and construction sites, and even search-and-rescue efforts.</p>
          <p>God Is Love Flight is about capturing life&apos;s special moments &mdash; weddings, family reunions, housewarmings, picnics, and other family celebrations. Every flight is an opportunity to capture a memory, serve someone, or teach someone something.</p>
          <p>The name <span className="font-display italic text-gold">GOD IS LOVE</span> represents the foundations of this vision. The gifts and skills God gave us should be used to help others and make a difference in our communities.</p>
        </div>

        <div className="mt-14 grid sm:grid-cols-3 gap-4">
          {PILLARS.map((p) => (
            <div key={p.title} className="glass-panel rounded-2xl p-6">
              <p className="font-mono-tech text-sm font-semibold text-foreground">{p.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}