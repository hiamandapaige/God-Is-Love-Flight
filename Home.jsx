import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import FlightReel from './FlightReel';
import Academy from './Academy';
import ClassForm from './ClassForm';
import Footer from './Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <FlightReel />
        <Academy />
        <ClassForm />
      </main>
      <Footer />
    </div>
  );
}