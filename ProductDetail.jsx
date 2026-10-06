import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Check, AlertTriangle, Leaf, Heart, Shield } from 'lucide-react';
import { getProduct, PRODUCTS } from './products';
import { useCart } from './CartContext';
import { Image } from './image';
import CustomizableCross from './CustomizableCross';
import ColorConfigurator from './ColorConfigurator';

const BENEFITS = [
  'Dry hair & scalp',
  'Cracked heels',
  'Knees & elbows',
  'Eczema & psoriasis',
  'Scars & stretch marks',
  'Wrinkles',
];

const TRUST = [
  { icon: Leaf, label: 'All Natural Ingredients' },
  { icon: Heart, label: 'Handcrafted with Care' },
  { icon: Shield, label: 'Safe for Daily Use' },
];

export default function ProductDetail() {
  const { productId } = useParams();
  const product = getProduct(productId);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [bodyColor, setBodyColor] = useState('#1E5BFF');
  const [godColor, setGodColor] = useState('#FFD700');
  const [isColor, setIsColor] = useState('#C0C0C0');
  const [verseColor, setVerseColor] = useState('#FFD700');
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-500 mb-4">Product not found.</p>
        <Link to="/shop" className="text-gold underline">Back to shop</Link>
      </div>
    );
  }

  const add = () => {
    const options = product.customizable
      ? `Cross: ${bodyColor}, GOD: ${godColor}, IS: ${isColor}, 1 John 4:8: ${verseColor}`
      : (product.scent ? `Scent: ${product.scent}` : '8 oz. jar');
    addItem({
      key: `${product.id}|${product.customizable ? `${bodyColor}${godColor}${isColor}${verseColor}` : (product.scent || 'default')}`,
      productId: product.id, name: product.name, price: product.price, qty, options,
      image: product.images[0],
      bodyColor: product.customizable ? bodyColor : null,
      godColor: product.customizable ? godColor : null,
      isColor: product.customizable ? isColor : null,
      verseColor: product.customizable ? verseColor : null,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const isCross = product.customizable;
  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category);
  const relatedFinal = (related.length ? related : PRODUCTS.filter((p) => p.id !== product.id)).slice(0, 4);

  return (
    <div>
      <div className="max-w-6xl mx-auto px-6 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link to="/shop" className="hover:text-foreground transition">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-foreground transition">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image / Digital display */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 shrink-0">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`w-16 h-16 rounded-lg overflow-hidden bg-gray-50 border-2 ${activeImg === i ? 'border-foreground' : 'border-gray-100'}`}>
                  <Image src={img} fittingType="fit" originWidth={1024} originHeight={1024} quality={70} className="w-full h-full" />
                </button>
              ))}
            </div>
            {/* Main display */}
            <div className={`flex-1 relative aspect-square rounded-2xl overflow-hidden flex items-center justify-center p-8 ${isCross ? 'bg-gradient-to-br from-gray-50 to-white border border-gray-100' : 'bg-gradient-to-br from-amber-50 to-orange-50 border border-gray-100'}`}>
              {isCross ? (
                <CustomizableCross bodyColor={bodyColor} godColor={godColor} isColor={isColor} verseColor={verseColor} className="relative w-full h-full" />
              ) : (
                <Image src={product.images[activeImg]} fittingType="fit" originWidth={1024} originHeight={1024} quality={100} className="w-full h-full" />
              )}
              {product.badge && (
                <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-black shadow-sm backdrop-blur">{product.badge}</span>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">{isCross ? 'Customizable Cross' : 'Handcrafted Body Care'}</p>
            <h1 className="font-display italic text-3xl sm:text-4xl text-black mb-1">{product.name}</h1>
            <p className="text-sm text-gray-400 mb-4">{product.subtitle}</p>
            <div className="flex items-center gap-3 mb-5">
              <p className="text-2xl font-bold text-gold">${product.price}.00</p>
              <span className="w-px h-6 bg-gray-200" />
              <p className="text-sm text-gray-400">{isCross ? 'Key Cross' : '8 oz. jar'}</p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-5">{product.description}</p>

            {/* Benefits (betta) */}
            {!isCross && (
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-5">
                {BENEFITS.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={15} className="text-gold shrink-0" /> {b}
                  </div>
                ))}
              </div>
            )}

            {!isCross && (
              <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 mb-5">
                <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-700">This product contains nut oils.</p>
              </div>
            )}

            {/* Color customization (crosses) */}
            {isCross && (
              <div className="rounded-2xl border border-gray-100 bg-white p-6 mb-5 shadow-sm">
                <div className="mb-3">
                  <p className="text-lg font-bold text-black">Customize Your Cross</p>
                  <p className="text-sm text-gray-400 mt-1">Make it yours. Choose your colors for each part of the cross.</p>
                </div>
                <ColorConfigurator label="Cross Color" description="Changes the main cross body color." value={bodyColor} onChange={setBodyColor} />
                <ColorConfigurator label="GOD Color" description={'Changes the "GOD" lettering only.'} value={godColor} onChange={setGodColor} />
                <ColorConfigurator label="IS Color" description={'Changes the "IS" lettering only.'} value={isColor} onChange={setIsColor} />
                <ColorConfigurator label="Verse Color" description={'Changes "1 JOHN 4:8" only.'} value={verseColor} onChange={setVerseColor} />
              </div>
            )}

            {/* Qty + Add to Cart */}
            <div className="flex gap-3 mb-6">
              <div className="flex items-center border border-gray-200 rounded-xl h-12 bg-white">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 h-full text-gray-500 hover:text-black transition"><Minus size={16} /></button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 h-full text-gray-500 hover:text-black transition"><Plus size={16} /></button>
              </div>
              <button onClick={add} className="flex-1 h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 text-sm font-bold uppercase tracking-wide text-gold-foreground hover:opacity-90 transition shadow-md">
                {added ? <Check size={16} /> : <ShoppingBag size={16} />} {added ? 'Added to Cart' : `Add to Cart · $${(product.price * qty).toFixed(2)}`}
              </button>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-gray-100">
              {TRUST.map((t) => (
                <div key={t.label} className="text-center">
                  <t.icon size={22} className="mx-auto text-gold mb-1.5" />
                  <p className="text-[11px] text-gray-500 leading-tight">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-16 sm:mt-20 pt-12 border-t border-gray-100">
          <h2 className="font-display italic text-2xl text-black mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedFinal.map((p) => (
              <Link key={p.id} to={`/shop/product/${p.id}`} className="group block">
                <div className="aspect-square rounded-xl bg-gray-50 border border-gray-100 overflow-hidden mb-2 flex items-center justify-center p-4">
                  {p.customizable ? <CustomizableCross bodyColor="#1E5BFF" godColor="#FFD700" isColor="#C0C0C0" verseColor="#FFD700" className="relative w-full h-full" /> : <Image src={p.images[0]} fittingType="fit" originWidth={1024} originHeight={1024} quality={80} className="w-full h-full" />}
                </div>
                <p className="text-sm font-medium text-black truncate">{p.name}</p>
                <p className="text-sm text-gray-400">${p.price}.00</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer tagline */}
      <div className="text-center py-10 border-t border-gray-100 bg-cream">
        <p className="font-display italic text-xl text-gray-400">Self Care Is God's Care</p>
      </div>
    </div>
  );
}