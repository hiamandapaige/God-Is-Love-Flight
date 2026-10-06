// Shared color palette + label helper for the cross customizer.
// Used by every cross color control so the same options (incl. Purple)
// appear everywhere colors are picked.
export const CROSS_PRESETS = [
  { label: 'Red', value: '#E11D2A' },
  { label: 'Orange', value: '#F97316' },
  { label: 'Gold', value: '#FFCC00' },
  { label: 'Purple', value: '#7C3AED' },
  { label: 'Pink', value: '#EC4899' },
  { label: 'Blue', value: '#1E60D5' },
  { label: 'Green', value: '#16A34A' },
  { label: 'Silver', value: '#C0C0C0' },
  { label: 'Black', value: '#0A0A0A' },
  { label: 'White', value: '#FFFFFF' },
];

// Returns a friendly name for a hex color (e.g. "#7C3AED" -> "Purple"),
// or "Custom" for any shade not in the preset list.
export function colorLabel(hex) {
  const match = CROSS_PRESETS.find(
    (p) => p.value.toUpperCase() === (hex || '').toUpperCase()
  );
  return match ? match.label : 'Custom';
}