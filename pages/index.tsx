import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Products from '../components/Products';
import Advantages from '../components/Advantages';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Products />
        <Advantages />
        <CTA />
      </main>
      <Footer />
    </div>
  );
} 