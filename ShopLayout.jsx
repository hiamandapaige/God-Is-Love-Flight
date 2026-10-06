import React from 'react';
import { Outlet } from 'react-router-dom';
import { CartProvider } from './CartContext';
import ShopNavbar from './ShopNavbar';
import Footer from './Footer';

export default function ShopLayout() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-cream flex flex-col">
        <ShopNavbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}