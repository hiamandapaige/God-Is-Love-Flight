import React, { useState, useEffect } from 'react';

export default function ColorConfigurator({ label, description, value, onChange, variant = 'light' }) {
  const [text, setText] = useState(value.toUpperCase());
  useEffect(() => { setText(value.toUpperCase()); }, [value]);

  const commit = (raw) => {
    let v = raw.trim();
    if (!v.startsWith('#')) v = '#' + v;
    if (/^#[0-9A-Fa-f]{6}$/.test(v)) onChange(v.toUpperCase());
    else setText(value.toUpperCase());
  };

  const dark = variant === 'dark';

  return (
    <div className={`flex items-center justify-between gap-4 py-3.5 border-b last:border-b-0 ${dark ? 'border-white/5' : 'border-gray-100'}`}>
      <div className="min-w-0">
        <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-black'}`}>{label}</p>
        {description && <p className={`text-xs mt-0.5 leading-snug ${dark ? 'text-[#A0A0A0]' : 'text-gray-400'}`}>{description}</p>}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={text}
          maxLength={7}
          onChange={(e) => setText(e.target.value.toUpperCase())}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') commit(e.target.value); }}
          className={`w-[78px] text-center text-xs font-mono uppercase rounded-lg border h-9 focus:outline-none transition ${dark ? 'border-white/10 bg-[#0B0D11] text-white focus:border-sky focus:ring-1 focus:ring-sky/30' : 'border-gray-200 bg-white text-black focus:border-gold focus:ring-1 focus:ring-gold/30'}`}
        />
        <label
          className={`relative h-9 w-9 rounded-full cursor-pointer ring-2 shadow-md shrink-0 overflow-hidden ${dark ? 'ring-white/10' : 'ring-white'}`}
          style={{ background: value }}
          title="Open color wheel"
        >
          <input type="color" value={value} onChange={(e) => onChange(e.target.value.toUpperCase())} className="absolute inset-0 opacity-0 cursor-pointer" />
        </label>
      </div>
    </div>
  );
}