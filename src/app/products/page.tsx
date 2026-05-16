import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductsClient from '@/app/products/components/ProductsClient';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ProductsClient />
      <Footer />
    </main>
  );
}