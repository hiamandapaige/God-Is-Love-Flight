import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('gil_cart') || '[]'); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem('gil_cart', JSON.stringify(items)); }, [items]);

  const addItem = (item) => setItems((prev) => {
    const existing = prev.find((i) => i.key === item.key);
    if (existing) return prev.map((i) => i.key === item.key ? { ...i, qty: i.qty + item.qty } : i);
    return [...prev, item];
  });
  const updateQty = (key, qty) => setItems((prev) => prev.map((i) => i.key === key ? { ...i, qty: Math.max(1, qty) } : i));
  const removeItem = (key) => setItems((prev) => prev.filter((i) => i.key !== key));
  const clearCart = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);