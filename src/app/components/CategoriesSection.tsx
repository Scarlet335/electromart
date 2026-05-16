'use client';
import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

// BENTO GRID AUDIT:
// Array has 6 cards: [Smartphones, Laptops, Audio, TVs, Gaming, Accessories]
// Row 1: [col-1+2: Smartphones cs-2 rs-2] [col-3: Laptops cs-1] [col-4: Audio cs-1]
// Row 2: [col-1+2: Smartphones continues] [col-3: TVs cs-1] [col-4: Gaming cs-1]
// Row 3: [col-1: Accessories cs-4 (full width)]
// Placed 6/6 cards ✓

const categories = [
{
  id: 'smartphones',
  name: 'Smartphones',
  count: '1,200+ models',
  image: "https://images.unsplash.com/photo-1713470599405-3ca0ae1363f8",
  alt: 'Array of colorful smartphones laid flat on dark surface showing screens',
  colSpan: 'md:col-span-2',
  rowSpan: 'md:row-span-2',
  height: 'h-[300px] md:h-full md:min-h-[400px]',
  badge: 'Best Sellers'
},
{
  id: 'laptops',
  name: 'Laptops',
  count: '380+ models',
  image: "https://images.unsplash.com/photo-1572365850531-613a2faa8c39",
  alt: 'Open laptop on clean desk showing bright screen in dim room',
  colSpan: 'md:col-span-1',
  rowSpan: '',
  height: 'h-[180px]',
  badge: null
},
{
  id: 'audio',
  name: 'Audio',
  count: '540+ products',
  image: "https://images.unsplash.com/photo-1585155784229-aff921ccfa10",
  alt: 'Premium wireless headphones floating against gradient background',
  colSpan: 'md:col-span-1',
  rowSpan: '',
  height: 'h-[180px]',
  badge: 'New'
},
{
  id: 'tvs',
  name: 'Smart TVs',
  count: '220+ models',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16145bfaf-1772394110392.png",
  alt: 'Large flat screen smart TV mounted on wall in modern living room',
  colSpan: 'md:col-span-1',
  rowSpan: '',
  height: 'h-[180px]',
  badge: null
},
{
  id: 'gaming',
  name: 'Gaming',
  count: '890+ items',
  image: "https://images.unsplash.com/photo-1630421030782-0270a9909722",
  alt: 'Gaming controller with colorful RGB lighting on dark surface',
  colSpan: 'md:col-span-1',
  rowSpan: '',
  height: 'h-[180px]',
  badge: 'Hot'
},
{
  id: 'accessories',
  name: 'Accessories & Peripherals',
  count: '3,400+ products',
  image: "https://images.unsplash.com/photo-1642418714495-87fcca453f70",
  alt: 'Assorted tech accessories including cables, keyboards, and mice spread on flat surface',
  colSpan: 'md:col-span-4',
  rowSpan: '',
  height: 'h-[160px]',
  badge: null
}];


export default function CategoriesSection() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-600 uppercase tracking-widest text-primary mb-2">
              Browse
            </p>
            <h2 className="text-section-xl text-foreground">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-600 text-muted-foreground hover:text-primary transition-colors">
            
            All categories
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-auto">
          {categories?.map((cat) => (
          /* BENTO GRID: each card tagged with its position */
          <Link
            key={cat?.id}
            href={`/products?category=${cat?.id}`}
            className={`group relative overflow-hidden rounded-xl border border-border bg-card ${cat?.colSpan} ${cat?.rowSpan} ${cat?.height} hover-lift`}>
            
              {/* Image */}
              <AppImage
              src={cat?.image}
              alt={cat?.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
            
              {/* Gradient overlay — dark at bottom for white text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              {/* Badge */}
              {cat?.badge &&
            <div className="absolute top-3 left-3">
                  <span className="badge-new">{cat?.badge}</span>
                </div>
            }
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-700 text-lg leading-tight">{cat?.name}</h3>
                <p className="text-white/70 text-xs font-500 mt-0.5">{cat?.count}</p>
              </div>
              {/* Hover arrow */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-primary/0 group-hover:bg-primary/90 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                <Icon name="ArrowRightIcon" size={14} className="text-primary-foreground" />
              </div>
            </Link>)
          )}
        </div>

        {/* Mobile: View All */}
        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-600 text-primary">
            
            All categories <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>
      </div>
    </section>);

}