import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import CategoriesSection from '@/app/components/CategoriesSection';
import FeaturedProducts from '@/app/components/FeaturedProducts';
import TrustSection from '@/app/components/TrustSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import WhatsAppButton from '@/app/components/WhatsAppButton';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <TrustSection />
      <TestimonialsSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}