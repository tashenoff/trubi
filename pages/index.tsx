import React from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';
import Advantages from '../components/Advantages';
import CTA from '../components/CTA';
import Contacts from '../components/Contacts';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Products />
      <Advantages />
      <CTA />
      <Contacts />
    </Layout>
  );
} 