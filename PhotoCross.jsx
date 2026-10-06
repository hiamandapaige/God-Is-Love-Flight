import React, { useEffect, useRef, useState } from 'react';

const PHOTO = '/media/cross-photo.png';

// Cache the decoded image, its raw pixels, and the IS-stroke brightness cutoff.
let cachedImage = null;
let cachedPixels = null; // Uint8ClampedArray, original RGBA at natural size
let cachedCutL = 0;      // IS-stroke brightness threshold (pixels below => verse)
let cachedDisc = { cx: 0, cy: 0, r: 0 }; // O-ring center + inner radius (px)

// Medallion (IS) disc — the silver ring inside the "O" of GOD. Coordinates are
// fractions of the image, measured directly from the actual 1089x1445 photo.
const IS_BOX = { x0: 0.468, y0: 0.250, x1: 0.552, y1: 0.345 };
// Tighter box around just the "IS" letter strokes (center of the medallion), so
// the silver disc and its dark rim stay Cross Body and only the letters recolor.
const IS_LETTER_BOX = { x0: 0.488, y0: 0.288, x1: 0.542, y1: 0.326 };

// Vertical bands (fraction of image height) measured from the real photo:
//   B_TOP   0.235  end of top vertical beam / start of crossbar
//   B_CROSS 0.365  end of crossbar (GOD letters) / start of V-wedge
//   B_WEDGE 0.595  end of V-wedge + shaft / start of verse gap
//   B_VERSE 0.705  end of "1 JOHN 4:8" verse text
const B_TOP = 0.235, B_CROSS = 0.365, B_OEND = 0.372, B_WEDGE = 0.595, B_VERSE = 0.705;

function loadImage() {
  if (cachedImage) return Promise.resolve(cachedImage);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const off = document.createElement('canvas');
      off.width = img.naturalWidth;
      off.height = img.naturalHeight;
      const ctx = off.getContext('2d');
      ctx.drawImage(img, 0, 0);
      cachedPixels = ctx.getImageData(0, 0, off.width, off.height).data;
      cachedImage = img;
      computeSegmentation();
      resolve(img);
    };
    img.onerror = reject;
    img.src = PHOTO;
  });
}

// A pixel is a "letter" (GOD green or verse green) when it has real color
// saturation and is NOT blue-dominant — the blue cross body stays body.
// A pixel is a "letter" (GOD / verse green) when it is saturated AND green is the
// dominant channel. The blue cross body (blue-dominant) stays body.
const isColored = (r, g, b) => Math.max(r, g, b) - Math.min(r, g, b) > 0.10 && g >= b && g >= r;

// Solve a 3x3 linear system (Gaussian elimination). Returns null if singular.
function solve3(A, b) {
  const M = [A[0].concat(b[0]), A[1].concat(b[1]), A[2].concat(b[2])];
  for (let c = 0; c < 3; c++) {
    let piv = c;
    for (let r = c + 1; r < 3; r++) if (Math.abs(M[r][c]) > Math.abs(M[piv][c])) piv = r;
    if (Math.abs(M[piv][c]) < 1e-9) return null;
    [M[c], M[piv]] = [M[piv], M[c]];
    for (let r = 0; r < 3; r++) {
      if (r === c) continue;
      const f = M[r][c] / M[c][c];
      for (let k = c; k < 4; k++) M[r][k] -= f * M[c][k];
    }
  }
  return [M[0][3] / M[0][0], M[1][3] / M[1][1], M[2][3] / M[2][2]];
}

// Brightness cutoff that separates the dark "IS" engraving strokes from the
// bright silver medallion disc inside the IS box.
function computeSegmentation() {
  const W = cachedImage.naturalWidth;
  const H = cachedImage.naturalHeight;
  const bx0 = Math.floor(IS_BOX.x0 * W), bx1 = Math.ceil(IS_BOX.x1 * W);
  const by0 = Math.floor(IS_BOX.y0 * H), by1 = Math.ceil(IS_BOX.y1 * H);
  const ls = [];
  for (let y = by0; y <= by1; y++) {
    for (let x = bx0; x <= bx1; x++) {
      if (x < 0 || y < 0 || x >= W || y >= H) continue;
      const i = (y * W + x) * 4;
      const r = cachedPixels[i] / 255, g = cachedPixels[i + 1] / 255, b = cachedPixels[i + 2] / 255;
      if (isColored(r, g, b)) continue; // skip green, only silver vs dark matter
      ls.push(0.299 * r + 0.587 * g + 0.114 * b);
    }
  }
  ls.sort((a, b) => a - b);
  cachedCutL = 0.55;

  // Detect the green O-ring around the "IS" medallion: its centroid is the disc
  // center, and the closest green pixel to that center marks the ring's inner
  // edge — everything inside that radius is the disc, painted a clean body dome.
  // Collect the green O-ring pixels, then fit a circle to them (least-squares,
  // Kåsa method). A plain centroid would drift toward the brighter side when the
  // shadowed left of the "O" is under-detected; the circle fit gives the true
  // geometric center so the disc dome and the "IS" letters sit dead-center.
  const xs = [], ys = [];
  for (let y = Math.floor(0.23 * H); y < 0.37 * H; y++) {
    for (let x = Math.floor(0.44 * W); x < 0.58 * W; x++) {
      const k = (y * W + x) * 4;
      const rr = cachedPixels[k] / 255, gg = cachedPixels[k + 1] / 255, bb = cachedPixels[k + 2] / 255;
      if (isColored(rr, gg, bb)) { xs.push(x); ys.push(y); }
    }
  }
  let cx = 0.510 * W, cy = 0.300 * H;
  if (xs.length >= 6) {
    let Sx=0, Sy=0, Sxx=0, Syy=0, Sxy=0, Sxxx=0, Syyy=0, Sxyy=0, Sxxy=0; const n = xs.length;
    for (let i = 0; i < n; i++) {
      const x = xs[i], y = ys[i];
      Sx+=x; Sy+=y; Sxx+=x*x; Syy+=y*y; Sxy+=x*y; Sxxx+=x*x*x; Syyy+=y*y*y; Sxyy+=x*y*y; Sxxy+=x*x*y;
    }
    const sol = solve3([[Sxx,Sxy,Sx],[Sxy,Syy,Sy],[Sx,Sy,n]], [(Sxxx+Sxyy)/2,(Sxxy+Syyy)/2,(Sxx+Syy)/2]);
    if (sol) { cx = sol[0]; cy = sol[1]; }
  }
  // Distances from the FITTED center; min = disc inner edge, 55th pct = ring's
  // trimmed outer edge (the extreme max would catch oval extremes / halo and make
  // the "O" look too big).
  const dists = xs.map((x, i) => Math.hypot(x - cx, ys[i] - cy));
  dists.sort((a, b) => a - b);
  const pct = (p) => dists.length ? dists[Math.min(dists.length - 1, Math.floor(p * dists.length))] : 0;
  cachedDisc = { cx, cy, r: dists.length ? dists[0] : 0, outerR: pct(0.55) };
}

function hexToRgb(hex) {
  let h = (hex || '').replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

// Each target color becomes a (hue, slightly-reduced saturation) pair. We keep
// the original photo's per-pixel luminance so the cross keeps its real 3D form —
// only the paint color changes, giving a natural, professional product look.
const SAT = 1; // render the exact chosen colors so the preview matches the swatches
function hexToHS(hex) {
  let h = (hex || '').replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let hue = 0;
  if (d !== 0) {
    switch (max) {
      case r: hue = (g - b) / d + (g < b ? 6 : 0); break;
      case g: hue = (b - r) / d + 2; break;
      default: hue = (r - g) / d + 4; break;
    }
    hue /= 6;
  }
  let s = 0;
  if (d !== 0) s = (max + min) > 1 ? d / (2 - max - min) : d / (max + min);
  return { h: hue, s: Math.min(1, s * SAT) };
}

function hslToRgb(h, s, l) {
  if (s === 0) { const v = l * 255; return [v, v, v]; }
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [hue2rgb(p, q, h + 1 / 3) * 255, hue2rgb(p, q, h) * 255, hue2rgb(p, q, h - 1 / 3) * 255];
}

// Solid, slightly-desaturated color for the lettering (GOD / IS / verse text) —
// opaque and full strength, like painted text, no photo shading inside the glyphs.
function solidColor(hex) {
  const [r, g, b] = hexToRgb(hex);
  const L = 0.299 * r + 0.587 * g + 0.114 * b;
  return [L + (r - L) * SAT, L + (g - L) * SAT, L + (b - L) * SAT]; // 0..1
}

export default function PhotoCross({ bodyColor, accentColor, verseColor, className = '' }) {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadImage()
      .then(() => { if (mounted) setReady(true); })
      .catch(() => { if (mounted) setFailed(true); });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!ready || !cachedPixels || !cachedImage) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = cachedImage.naturalWidth;
    const H = cachedImage.naturalHeight;
    const N = W * H;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    const out = new Uint8ClampedArray(cachedPixels);

    // zone 1 = GOD letters (accent), 2 = body, 3 = verse + IS.
    // Letters (1 & 3) render SOLID in their target color; the cross body (2)
    // keeps the photo's real 3D shading — like painted text on a molded cross.
    const bodyHS = hexToHS(bodyColor);
    const accentSolid = solidColor(accentColor);
    const verseSolid = solidColor(verseColor || accentColor);

    // The O-ring's detected center + inner radius — the disc inside the ring is
    // painted a clean cross-body dome so it reads as the background, and the
    // yellow "IS" text is drawn centered on top (no double layer, no rectangle).
    const dCx = cachedDisc.cx, dCy = cachedDisc.cy, dR = cachedDisc.r, dOR = cachedDisc.outerR || cachedDisc.r;

    // Pass 1: assign zones. The green O-ring stays accent; the silver disc keeps
    // its real texture as cross-body. The "IS" letters are drawn on top (Pass 3)
    // in the verse color, with no box or fill behind them.
    const zones = new Int8Array(N);
    for (let p = 0; p < N; p++) {
      const i = p * 4;
      const r = out[i] / 255, g = out[i + 1] / 255, b = out[i + 2] / 255;
      const y = (p / W) | 0;
      const x = p - y * W;
      const yN = y / H;
      const L = 0.299 * r + 0.587 * g + 0.114 * b;
      const colored = isColored(r, g, b);
      let zone;
      if (colored) {
        if (yN < B_OEND) zone = 1;       // G / O / D + O-ring => accent
        else if (yN < B_WEDGE) zone = 2; // V-wedge => body
        else if (yN < B_VERSE) zone = 3; // 1 JOHN 4:8 => verse
        else zone = 2;
      } else if (L < 0.02) {
        zone = -1; // pure-black background
      } else {
        zone = 2; // Cross Body (disc, beams, V-wedge, lower key)
      }
      // Force the ENTIRE O-ring (the annulus between the disc and the cross body)
      // to the accent color by geometry, so a shadowed/poorly-lit side of the "O"
      // isn't misread as blue body — every side of the ring stays green.
      if (dR > 0 && dOR > dR) {
        const ddx = x - dCx, ddy = y - dCy;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);
        if (dist >= dR && dist <= dOR) zone = 1;
      }
      zones[p] = zone;
    }
    // Pass 2: paint each pixel with its zone's color.
    for (let p = 0; p < N; p++) {
      const i = p * 4;
      const zone = zones[p];
      if (zone === -1) { out[i] = 0; out[i + 1] = 0; out[i + 2] = 0; out[i + 3] = 255; continue; }
      if (zone === 2) {
        const r = out[i] / 255, g = out[i + 1] / 255, b = out[i + 2] / 255;
        const L = 0.299 * r + 0.587 * g + 0.114 * b;
        const y = (p / W) | 0;
        const x = p - y * W;
        // Inside the O-ring the disc is painted as a clean cross-body dome (slight
        // darkening toward the rim) — this erases the engraved "IS" with no patch
        // or rectangle. Outside the ring, the body keeps its real per-pixel 3D
        // shading. The single yellow "IS" overlay is drawn on top, centered.
        const ddx = x - dCx, ddy = y - dCy;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);
        const inDisc = dR > 0 && dist <= dR;
        // Smooth quadratic dome: bright center (0.55) fading to a slightly darker
        // rim (0.40) — reads as a polished medallion rather than a flat disc.
        const Lc = inDisc ? (0.55 - 0.15 * Math.pow(dist / dR, 2)) : (L < 0.18 ? 0.18 : L > 0.5 ? 0.5 : L);
        const [orc, ogc, obc] = hslToRgb(bodyHS.h, bodyHS.s, Lc);
        out[i] = orc; out[i + 1] = ogc; out[i + 2] = obc; out[i + 3] = 255;
      } else if (zone === 1 || zone === 3) {
        const c = zone === 1 ? accentSolid : verseSolid;
        out[i] = c[0] * 255; out[i + 1] = c[1] * 255; out[i + 2] = c[2] * 255; out[i + 3] = 255;
      }
    }

    ctx.putImageData(new ImageData(out, W, H), 0, 0);

    // Draw the "IS" letters centered exactly on the detected O-ring center,
    // solid in the verse color — a single clean layer over the body dome.
    const [vr, vg, vb] = verseSolid;
    ctx.save();
    ctx.fillStyle = `rgb(${Math.round(vr * 255)},${Math.round(vg * 255)},${Math.round(vb * 255)})`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const fontSize = Math.round(H * 0.042);
    ctx.font = `800 ${fontSize}px 'JetBrains Mono', ui-monospace, monospace`;
    ctx.fillText('IS', dCx, dCy);
    ctx.restore();
  }, [ready, bodyColor, accentColor, verseColor]);

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {failed ? (
        <img src={PHOTO} alt="Cross" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      ) : (
        <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      )}
    </div>
  );
}