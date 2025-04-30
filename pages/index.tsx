import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Products from '../components/Products';
import Advantages from '../components/Advantages';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Products />
      <Advantages />
      <CTA />
    </div>
  );
} 