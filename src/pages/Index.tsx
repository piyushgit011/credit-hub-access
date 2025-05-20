
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PricingPlans from '@/components/PricingPlans';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <PricingPlans />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
