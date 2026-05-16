'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  alt: string;
  badge?: string;
  badgeType?: 'new' | 'sale';
  category: string;
  inStock: boolean;
}

const products: Product[] = [
{
  id: 1,
  name: 'Samsung Galaxy S25 Ultra',
  brand: 'Samsung',
  price: 285000,
  rating: 4.8,
  reviewCount: 312,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_17d2c6668-1771898032722.png",
  alt: 'Samsung smartphone with large display showing vibrant screen content',
  badge: 'New',
  badgeType: 'new',
  category: 'smartphones',
  inStock: true
},
{
  id: 2,
  name: 'MacBook Pro 14" M4',
  brand: 'Apple',
  price: 720000,
  originalPrice: 850000,
  rating: 4.9,
  reviewCount: 198,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_17d746289-1767469901251.png",
  alt: 'Silver MacBook Pro laptop open on wooden desk with clean workspace',
  badge: 'Sale',
  badgeType: 'sale',
  category: 'laptops',
  inStock: true
},
{
  id: 3,
  name: 'Sony WH-1000XM6',
  brand: 'Sony',
  price: 95000,
  rating: 4.7,
  reviewCount: 541,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18093efb3-1773063758472.png",
  alt: 'Black Sony over-ear noise-cancelling headphones against white background',
  badge: 'Best Seller',
  badgeType: 'new',
  category: 'audio',
  inStock: true
},
{
  id: 4,
  name: 'LG OLED C4 55"',
  brand: 'LG',
  price: 425000,
  originalPrice: 490000,
  rating: 4.6,
  reviewCount: 87,
  image: "https://images.unsplash.com/photo-1548780364-65517933892b",
  alt: 'Ultra-thin OLED TV displaying vivid colors in dark modern living room',
  badge: 'Sale',
  badgeType: 'sale',
  category: 'tvs',
  inStock: true
},
{
  id: 5,
  name: 'PlayStation 5 Slim',
  brand: 'Sony',
  price: 215000,
  rating: 4.9,
  reviewCount: 423,
  image: "https://images.unsplash.com/photo-1680785436737-40edb9bccd1a",
  alt: 'White PlayStation 5 console and controller on dark reflective surface',
  badge: 'Hot',
  badgeType: 'new',
  category: 'gaming',
  inStock: true
},
{
  id: 6,
  name: 'iPad Pro 13" M4',
  brand: 'Apple',
  price: 380000,
  rating: 4.8,
  reviewCount: 156,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1686850a6-1772465669582.png",
  alt: 'iPad Pro with Apple Pencil on white surface showing creative app',
  badge: 'New',
  badgeType: 'new',
  category: 'tablets',
  inStock: true
},
{
  id: 7,
  name: 'Logitech MX Master 3S',
  brand: 'Logitech',
  price: 28500,
  originalPrice: 34000,
  rating: 4.7,
  reviewCount: 890,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_139e05f52-1772209477176.png",
  alt: 'Ergonomic wireless mouse on dark desk beside keyboard',
  badge: 'Sale',
  badgeType: 'sale',
  category: 'accessories',
  inStock: true
},
{
  id: 8,
  name: 'DJI Mini 4 Pro',
  brand: 'DJI',
  price: 320000,
  rating: 4.6,
  reviewCount: 74,
  image: "https://images.unsplash.com/photo-1722590407818-561ac04a3145",
  alt: 'Small compact drone hovering in blue sky with camera facing down',
  badge: 'New',
  badgeType: 'new',
  category: 'drones',
  inStock: false
}];


const tabs = ['All', 'Smartphones', 'Laptops', 'Audio', 'Gaming'];

function StarRating({ rating }: {rating: number;}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
      <Icon
        key={star}
        name="StarIcon"
        variant={star <= Math.floor(rating) ? 'solid' : 'outline'}
        size={12}
        className={star <= Math.floor(rating) ? 'star-filled' : 'star-empty'} />

      )}
    </div>);

}

function ProductCard({ product }: {product: Product;}) {
  const [wishlisted, setWishlisted] = useState(false);
  const discount = product.originalPrice ?
  Math.round((product.originalPrice - product.price) / product.originalPrice * 100) :
  null;

  return (
    <div className="product-card group">
      {/* Image */}
      <Link href="/product-detail" className="block relative overflow-hidden rounded-t-lg">
        <div className="zoom-container aspect-square bg-muted">
          <AppImage
            src={product.image}
            alt={product.alt}
            width={400}
            height={400}
            className="w-full h-full object-cover" />
          
        </div>
        {/* Badge */}
        {product.badge &&
        <div className="absolute top-3 left-3">
            {product.badgeType === 'sale' ?
          <span className="badge-sale">{discount ? `-${discount}%` : product.badge}</span> :

          <span className="badge-new">{product.badge}</span>
          }
          </div>
        }
        {/* Out of stock overlay */}
        {!product.inStock &&
        <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <span className="text-xs font-700 text-muted-foreground uppercase tracking-wider border border-border rounded-full px-3 py-1.5">
              Out of Stock
            </span>
          </div>
        }
      </Link>

      {/* Wishlist Button */}
      <button
        onClick={() => setWishlisted(!wishlisted)}
        className="absolute top-3 right-3 w-8 h-8 bg-card/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center transition-all hover:border-danger"
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
        
        <Icon
          name="HeartIcon"
          variant={wishlisted ? 'solid' : 'outline'}
          size={14}
          className={wishlisted ? 'text-danger' : 'text-muted-foreground'} />
        
      </button>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2.5">
        <div>
          <p className="text-[11px] font-600 uppercase tracking-widest text-muted-foreground">
            {product.brand}
          </p>
          <Link href="/product-detail">
            <h3 className="text-sm font-600 text-foreground mt-0.5 leading-snug hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground font-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-mono-price text-base text-foreground">
            XAF {product.price.toLocaleString()}
          </span>
          {product.originalPrice &&
          <span className="font-mono-price text-sm text-muted-foreground line-through">
              {product.originalPrice.toLocaleString()}
            </span>
          }
        </div>

        {/* Add to Cart */}
        <button
          disabled={!product.inStock}
          className={`w-full py-2.5 text-sm font-600 rounded-lg transition-all flex items-center justify-center gap-2 ${
          product.inStock ?
          'btn-primary' : 'bg-muted text-muted-foreground cursor-not-allowed'}`
          }>
          
          <Icon name="ShoppingCartIcon" size={15} />
          {product.inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>);

}

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered =
  activeTab === 'All' ?
  products :
  products.filter(
    (p) => p.category.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <section className="py-16 px-4 sm:px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-600 uppercase tracking-widest text-primary mb-2">
              Featured
            </p>
            <h2 className="text-section-xl text-foreground">Top Products</h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-600 text-muted-foreground hover:text-primary transition-colors">
            
            View all products <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-1">
          {tabs.map((tab) =>
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-600 transition-all ${
            activeTab === tab ?
            'bg-primary text-primary-foreground' :
            'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'}`
            }>
            
              {tab}
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
          {filtered.length > 0 ?
          filtered.map((product) =>
          <div key={product.id} className="relative">
                <ProductCard product={product} />
              </div>
          ) :

          <div className="col-span-full py-16 text-center text-muted-foreground">
              <Icon name="FunnelIcon" size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-500">No products in this category yet.</p>
            </div>
          }
        </div>

        {/* Mobile View All */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 btn-primary px-6 py-3 text-sm font-600 rounded-lg">
            
            View All Products <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>
      </div>
    </section>);

}