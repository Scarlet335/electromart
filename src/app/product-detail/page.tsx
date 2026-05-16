import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductDetailClient from '@/app/product-detail/components/ProductDetailClient';

export default function ProductDetailPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ProductDetailClient />
      <Footer />
    </main>
  );
}