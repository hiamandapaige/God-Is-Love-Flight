import React, { useState } from 'react';
import { ShoppingBag, Check, AlertTriangle, Leaf, Heart, Shield } from 'lucide-react';
import { PRODUCTS } from './products';
import { useCart } from './CartContext';
import { Image } from './image';
import CrossColorControl from './CrossColorControl';
import CustomizableCross from './CustomizableCross';
import { colorLabel } from './crossPalette';

const BENEFITS = ['Dry hair & scalp', 'Cracked heels', 'Knees & elbows', 'Eczema & psoriasis', 'Scars & stretch marks', 'Wrinkles'];
const SCENTS = ['Plain', 'Sauvage', 'Vanilla Berry', 'Powder'];

export default function Shop() {
  const { addItem } = useCart();

  // ---- Cross state ----
  const [crossType, setCrossType] = useState('god-is-love'); // 'god-is-love' | 'plain'
  const [colors, setColors] = useState({ body: '#0055FF', emblem: '#39FF14', accent: '#39FF14', is: '#39FF14', verse: '#39FF14' });
  const [plainColor, setPlainColor] = useState('#808080');
  const [plainIs, setPlainIs] = useState('#808080');
  const [crossQty, setCrossQty] = useState(1);
  const [crossAdded, setCrossAdded] = useState(false);

  // ---- Betta state ----
  const [bettaQty, setBettaQty] = useState(1);
  const [bettaAdded, setBettaAdded] = useState(false);
  const [bettaScent, setBettaScent] = useState('Plain');

  const cross = PRODUCTS.find((p) => p.id === 'cross-silver');
  const plain = PRODUCTS.find((p) => p.id === 'cross-plain');
  const betta = PRODUCTS.find((p) => p.id === 'betta-plain');
  const activeCross = crossType === 'plain' ? plain : cross;
  const setColor = (key, val) => setColors((c) => ({ ...c, [key]: val }));

  const addCross = () => {
    if (crossType === 'plain') {
      addItem({
        key: `cross|plain|${plainColor}${plainIs}`,
        productId: 'cross-plain',
        name: 'Plain Cross',
        price: plain.price,
        qty: crossQty,
        image: plain.images[0],
        type: 'cross',
        plain: true,
        bodyColor: plainColor,
        isColor: plainIs,
        options: `Body: ${colorLabel(plainColor)} · IS: ${colorLabel(plainIs)}`,
      });
    } else {
      const opts = `Body: ${colorLabel(colors.body)} · GOD Letters: ${colorLabel(colors.accent)} · Bible Verse & IS: ${colorLabel(colors.verse)}`;
      addItem({
        key: `cross|gil|${colors.body}${colors.emblem}${colors.accent}${colors.is}${colors.verse}`,
        productId: 'cross-silver',
        name: 'God Is Love Cross',
        price: cross.price,
        qty: crossQty,
        image: cross.images[0],
        type: 'cross',
        plain: false,
        bodyColor: colors.body,
        emblemColor: colors.emblem,
        accentColor: colors.accent,
        isColor: colors.is,
        verseColor: colors.verse,
        options: opts,
      });
    }
    setCrossAdded(true);
    setTimeout(() => setCrossAdded(false), 1800);
  };

  const addBetta = () => {
    addItem({ key: `betta-plain|${bettaScent}`, productId: betta.id, name: betta.name, price: betta.price, qty: bettaQty, options: `8 oz. jar · ${bettaScent}`, image: betta.images[0] });
    setBettaAdded(true);
    setTimeout(() => setBettaAdded(false), 1800);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 sm:py-14">
      {/*=== CROSSES — fully customizable ===*/}
      <section className="rounded-3xl bg-black text-white p-5 sm:p-8 lg:p-10 mb-20">
        {/* Product toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full border border-white/10 bg-[#0d0d0d] p-1">
            <button
              type="button"
              onClick={() => setCrossType('god-is-love')}
              className={`px-5 h-11 rounded-full text-sm font-semibold uppercase tracking-wide transition ${crossType === 'god-is-love' ? 'bg-white text-black' : 'text-[#A0A0A0] hover:text-white'}`}
            >
              God Is Love Cross
            </button>
            <button
              type="button"
              onClick={() => setCrossType('plain')}
              className={`px-5 h-11 rounded-full text-sm font-semibold uppercase tracking-wide transition ${crossType === 'plain' ? 'bg-white text-black' : 'text-[#A0A0A0] hover:text-white'}`}
            >
              Plain Cross
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* LEFT: live preview */}
          <div>
            <div className="relative aspect-[3/4] rounded-2xl bg-[radial-gradient(circle_at_50%_42%,#171717,#000)] border border-white/5 overflow-hidden flex items-center justify-center p-6">
              {crossType === 'plain' ? (
                <CustomizableCross plain plainColor={plainColor} isColor={plainIs} className="w-full h-full" />
              ) : (
                <CustomizableCross
                  bodyColor={colors.body}
                  emblemColor={colors.accent}
                  accentColor={colors.accent}
                  isColor={colors.is}
                  verseColor={colors.verse}
                  className="w-full h-full"
                />
              )}
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-[#A0A0A0]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Live preview — updates instantly as you pick colors
            </p>
          </div>

          {/* RIGHT: customize panel */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {crossType === 'plain' ? 'Plain Cross' : 'Customize Your Cross'}
            </h2>
            <p className="mt-2 text-sm text-[#A0A0A0]">
              {crossType === 'plain'
                ? 'A clean, molded key cross with no lettering. Pick your color and add it to your cart.'
                : 'Make it yours. Choose a color for each part of the cross — every selection updates the cross above immediately.'}
            </p>

            {/* Color controls */}
            {crossType === 'plain' ? (
              <div className="mt-5 rounded-2xl border border-white/5 bg-[#121212] p-5">
                <CrossColorControl label="Cross Body" description="The molded body of your plain cross." value={plainColor} onChange={setPlainColor} />
                <CrossColorControl label="IS" description={'The center "IS" lettering.'} value={plainIs} onChange={setPlainIs} />
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-white/5 bg-[#121212] p-5">
                <CrossColorControl label="Cross Body" description="The main key-cross structure." value={colors.body} onChange={(v) => setColor('body', v)} />
                <CrossColorControl label="God Letters" description={'The "G", "O", and "D" letters. The V-wedge under GOD follows the Cross Body color.'} value={colors.accent} onChange={(v) => { setColor('accent', v); setColor('emblem', v); }} />
                <CrossColorControl label="Bible Verse & IS" description={'The "1 JOHN 4:8" inscription and the "IS" letters. The IS ring keeps the Cross Body color.'} value={colors.verse} onChange={(v) => { setColor('verse', v); setColor('is', v); }} />
              </div>
            )}

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <p className="text-2xl font-bold">${activeCross.price.toFixed(2)}</p>
              <span className="text-xs text-[#A0A0A0] uppercase tracking-widest">Key Cross</span>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center rounded-2xl border border-white/10 bg-[#0d0d0d] h-14">
                <button type="button" onClick={() => setCrossQty(Math.max(1, crossQty - 1))} className="px-4 h-full text-[#A0A0A0] hover:text-white transition">−</button>
                <span className="w-10 text-center text-sm font-medium text-white">{crossQty}</span>
                <button type="button" onClick={() => setCrossQty(crossQty + 1)} className="px-4 h-full text-[#A0A0A0] hover:text-white transition">+</button>
              </div>
              <button type="button" onClick={addCross} className="flex-1 h-14 inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-6 text-sm font-bold uppercase tracking-wide text-black hover:bg-white/90 transition shadow-lg">
                {crossAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
                <span>{crossAdded ? 'Added to Cart' : 'Add to Cart'}</span>
                <span className="h-5 w-px bg-black/15" />
                <span>${(activeCross.price * crossQty).toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/*=== BETTA BODY BUTTA ===*/}
      <section className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-16">
        <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-gray-100 overflow-hidden flex items-center justify-center p-8 order-1 lg:order-1">
          <Image src={betta.images[0]} fittingType="fit" originWidth={1024} originHeight={1024} quality={100} className="w-full h-full" />
          <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-black shadow-sm backdrop-blur">Handcrafted</span>
        </div>
        <div className="order-2 lg:order-2">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">Handcrafted Body Care</p>
          <h2 className="font-display italic text-3xl sm:text-4xl text-black mb-1">Betta Body Butta</h2>
          <p className="text-sm text-gray-400 mb-3">8 oz. jar · {bettaScent}</p>
          <div className="flex items-center gap-3 mb-4">
            <p className="text-2xl font-bold text-gold">$20.00</p>
            <span className="w-px h-6 bg-gray-200" />
            <p className="text-sm text-gray-400">8 oz. jar</p>
          </div>
          <p className="text-gray-600 leading-relaxed mb-3">Great for dry hair, scalp, cracked heels, knees, elbows, eczema, psoriasis, scars, stretch marks, wrinkles, and more.</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-4">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-center gap-2 text-sm text-gray-700"><Check size={15} className="text-gold shrink-0" /> {b}</div>
            ))}
          </div>
          <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 mb-5">
            <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700">This product contains nut oils.</p>
          </div>
          <div className="mb-5">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-semibold">SCENT</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SCENTS.map((s) => (
                <button key={s} type="button" onClick={() => setBettaScent(s)} className={`h-11 rounded-xl border text-sm uppercase tracking-wider transition ${bettaScent === s ? 'border-gold bg-gold/15 text-gold font-semibold' : 'border-gray-300 text-gray-500 hover:border-gold'}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center border border-gray-200 rounded-xl h-12 bg-white">
              <button type="button" onClick={() => setBettaQty(Math.max(1, bettaQty - 1))} className="px-4 h-full text-gray-500 hover:text-black">−</button>
              <span className="w-10 text-center text-sm font-medium">{bettaQty}</span>
              <button type="button" onClick={() => setBettaQty(bettaQty + 1)} className="px-4 h-full text-gray-500 hover:text-black">+</button>
            </div>
            <button type="button" onClick={addBetta} className="flex-1 h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 text-sm font-bold uppercase tracking-wide text-gold-foreground hover:opacity-90 transition shadow-md">
              {bettaAdded ? <Check size={16} /> : <ShoppingBag size={16} />} {bettaAdded ? 'Added to Cart' : `Add to Cart · $${(betta.price * bettaQty).toFixed(2)}`}
            </button>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <div className="grid grid-cols-3 gap-3 pt-8 border-t border-gray-100 mb-8">
        {[{ icon: Leaf, label: 'All Natural Ingredients' }, { icon: Heart, label: 'Handcrafted with Care' }, { icon: Shield, label: 'Safe for Daily Use' }].map((t) => (
          <div key={t.label} className="text-center">
            <t.icon size={22} className="mx-auto text-gold mb-1.5" />
            <p className="text-[11px] text-gray-500 leading-tight">{t.label}</p>
          </div>
        ))}
      </div>

      {/* Footer tagline */}
      <div className="text-center py-6 border-t border-gray-100">
        <p className="font-display italic text-xl text-gray-400">Self Care Is God's Care</p>
      </div>
    </div>
  );
}