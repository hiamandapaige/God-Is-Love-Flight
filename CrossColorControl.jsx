/**
 * Dark-themed color control for the customizable cross.
 * Preset swatches for quick picks + a rainbow-gradient picker for any color.
 */
import { CROSS_PRESETS as PRESETS } from './crossPalette';

export default function CrossColorControl({ label, description, value, onChange }) {
  const isPreset = PRESETS.some((p) => p.value.toUpperCase() === (value || '').toUpperCase());
  return (
    <div className="py-4 border-b border-white/5 last:border-b-0">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">{label}</p>
          {description && <p className="text-xs mt-0.5 leading-snug text-[#A0A0A0]">{description}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="h-9 w-9 rounded-full ring-2 ring-white/10 shadow-md shrink-0" style={{ backgroundColor: value }} />
          <label
            className="relative h-9 w-9 rounded-full cursor-pointer shrink-0 ring-2 ring-white/10 overflow-hidden"
            style={{ background: 'conic-gradient(from 0deg, #ff0000, #ff9a00, #d0de21, #4fdc4a, #3fdad8, #2fc9e2, #1c7fee, #5f15f2, #ba0cf8, #fb07d9, #ff0000)' }}
            title="Custom color"
          >
            <input type="color" value={value} onChange={(e) => onChange(e.target.value.toUpperCase())} className="absolute inset-0 opacity-0 cursor-pointer" />
          </label>
        </div>
      </div>

      {/* Preset swatches */}
      <div className="mt-3 flex flex-wrap gap-2">
        {PRESETS.map((p) => {
          const active = p.value.toUpperCase() === (value || '').toUpperCase();
          return (
            <button
              type="button"
              key={p.label}
              onClick={() => onChange(p.value)}
              title={p.label}
              className={`group flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition ${active ? 'border-white bg-white/10' : 'border-white/10 hover:border-white/30'}`}
            >
              <span className="h-4 w-4 rounded-full ring-1 ring-white/20 shrink-0" style={{ backgroundColor: p.value }} />
              <span className={`text-[10px] uppercase tracking-wider ${active ? 'text-white' : 'text-[#A0A0A0]'}`}>{p.label}</span>
            </button>
          );
        })}
        {!isPreset && (
          <span className="flex items-center rounded-full border border-white/20 px-2.5 py-1">
            <span className="h-4 w-4 rounded-full ring-1 ring-white/20" style={{ backgroundColor: value }} />
            <span className="ml-1.5 text-[10px] uppercase tracking-wider text-white">Custom</span>
          </span>
        )}
      </div>
    </div>
  );
}