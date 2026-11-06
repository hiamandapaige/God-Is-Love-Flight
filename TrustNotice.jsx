import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

// Free FAA recreational safety test students must finish before class.
export const TRUST_LINK = 'https://trust.pilotinstitute.com/';

// Callout used in the Academy card and the Apply to Fly section.
export default function TrustNotice({ className = '' }) {
  return (
    <div className={`rounded-2xl border border-sky/40 bg-sky/10 p-5 text-left ${className}`}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky/20">
          <ShieldCheck size={18} className="text-sky" />
        </span>
        <div className="flex-1">
          <p className="font-mono-tech text-[11px] uppercase tracking-widest text-sky">Required before class</p>
          <p className="mt-1 text-sm text-foreground/90 leading-relaxed">
            Complete the free FAA <span className="font-semibold text-foreground">TRUST</span> drone safety test.
            It takes about 10–15 minutes and it’s no-fail. Save or print your certificate and bring it to class.
          </p>
          <a
            href={TRUST_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 font-mono-tech text-xs uppercase tracking-widest text-sky hover:text-gold transition"
          >
            Take the free safety test <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
