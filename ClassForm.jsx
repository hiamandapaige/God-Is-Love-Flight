import React, { useState } from 'react';
import { submitNetlifyForm } from './netlifyForm';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

const SERVICE_OPTIONS = [
  { value: 'flight_class', label: 'Flight Class · $35 / 1 hr 15 min' },
  { value: 'wedding', label: 'Wedding Coverage' },
  { value: 'family_reunion', label: 'Family Reunion' },
  { value: 'class_reunion', label: 'Class Reunion' },
  { value: 'other', label: 'Other Celebration / Project' },
];

export default function ClassForm() {
  const [form, setForm] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return { inquiry_type: params.get('service') || 'flight_class', full_name: '', email: '', phone: '', preferred_date: '', experience_level: 'first_time', message: '' };
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const label = SERVICE_OPTIONS.find((o) => o.value === form.inquiry_type)?.label || form.inquiry_type;
      await submitNetlifyForm('inquiry', {
        ...form,
        inquiry_type: label,
        experience_level: form.inquiry_type === 'flight_class' ? form.experience_level : '',
      });
      setStatus('done');
    } catch (err) {
      setStatus('idle');
      setError(err?.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'done') {
    return (
      <section id="apply" className="py-24 sm:py-32 bg-secondary/40">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="glass-panel rounded-3xl p-10">
            <CheckCircle2 className="mx-auto text-gold mb-5" size={48} />
            <h3 className="font-mono-tech font-bold text-2xl">Application Received</h3>
            <p className="mt-3 text-foreground/70">Thank you, {form.full_name.split(' ')[0]}. We’ll confirm your session and payment details by email shortly.</p>
            <button onClick={() => { setStatus('idle'); setForm({ ...form, full_name: '', email: '', phone: '', preferred_date: '', message: '' }); }} className="mt-8 h-11 inline-flex items-center rounded-full border border-border px-6 font-mono-tech text-xs uppercase tracking-widest hover:bg-secondary transition">
              Submit Another
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="py-24 sm:py-32 bg-secondary/40">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-sky mb-3">// Flight Manifest</p>
          <h2 className="font-mono-tech font-bold text-3xl sm:text-5xl tracking-tight">Apply to Fly</h2>
          <p className="mt-4 text-foreground/70">Tell us what you need. Class enrollment, event coverage, or a custom project — we’ll be in touch.</p>
        </div>

        <form onSubmit={submit} className="glass-panel rounded-3xl p-6 sm:p-8 space-y-5">
          <div>
            <label className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">Mission Type</label>
            <select value={form.inquiry_type} onChange={update('inquiry_type')} className="mt-2 w-full h-12 rounded-xl border border-input bg-background px-4 text-sm focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/30">
              {SERVICE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">Full Name *</label>
              <input required value={form.full_name} onChange={update('full_name')} className="mt-2 w-full h-12 rounded-xl border border-input bg-background px-4 text-sm focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/30" placeholder="Jordan Pilot" />
            </div>
            <div>
              <label className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">Email *</label>
              <input required type="email" value={form.email} onChange={update('email')} className="mt-2 w-full h-12 rounded-xl border border-input bg-background px-4 text-sm focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/30" placeholder="you@email.com" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">Phone</label>
              <input value={form.phone} onChange={update('phone')} className="mt-2 w-full h-12 rounded-xl border border-input bg-background px-4 text-sm focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/30" placeholder="(555) 123-4567" />
            </div>
            <div>
              <label className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">Preferred Date</label>
              <input type="date" value={form.preferred_date} onChange={update('preferred_date')} className="mt-2 w-full h-12 rounded-xl border border-input bg-background px-4 text-sm focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/30" />
            </div>
          </div>

          {form.inquiry_type === 'flight_class' && (
            <div>
              <label className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">Experience Level</label>
              <div className="mt-2 grid grid-cols-3 gap-3">
                {[['first_time', 'First Time'], ['beginner', 'Beginner'], ['intermediate', 'Intermediate']].map(([v, l]) => (
                  <button type="button" key={v} onClick={() => setForm({ ...form, experience_level: v })} className={`h-11 rounded-xl border font-mono-tech text-xs uppercase tracking-wider transition ${form.experience_level === v ? 'border-gold bg-gold/15 text-gold' : 'border-input text-muted-foreground hover:border-sky'}`}>{l}</button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">Message</label>
            <textarea value={form.message} onChange={update('message')} rows={4} className="mt-2 w-full rounded-xl border border-input bg-background p-4 text-sm focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/30" placeholder="Tell us about your event, location, or what you’d like to learn…" />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button type="submit" disabled={status === 'loading'} className="h-12 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 font-mono-tech text-sm uppercase tracking-widest text-gold-foreground hover:animate-hover-stabilize gold-glow transition disabled:opacity-60">
            {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <Send size={16} />}
            {status === 'loading' ? 'Transmitting…' : 'Submit Application'}
          </button>
          <p className="text-center text-xs text-muted-foreground">Class fee of $35 is collected upon confirmation. We accept cash, card, or app payment at the fly zone.</p>
        </form>
      </div>
    </section>
  );
}