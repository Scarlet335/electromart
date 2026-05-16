'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { CartProvider } from '@/context/CartContext';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

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
  tags: string[];
}

// Default products (fallback if nothing in localStorage)
const defaultProducts: Product[] = [
  { id: 1, name: 'Samsung Galaxy S25 Ultra', brand: 'Samsung', price: 285000, rating: 4.8, reviewCount: 312, image: "https://img.rocket.new/generatedImages/rocket_gen_img_17d2c6668-1771898032722.png", alt: 'Samsung smartphone upright showing vivid display screen', badge: 'New', badgeType: 'new', category: 'Smartphones', inStock: true, tags: ['android', 'flagship'] },
  { id: 2, name: 'MacBook Pro 14" M4', brand: 'Apple', price: 720000, originalPrice: 850000, rating: 4.9, reviewCount: 198, image: "https://img.rocket.new/generatedImages/rocket_gen_img_17d746289-1767469901251.png", alt: 'Silver MacBook Pro open on wooden desk in clean workspace', badge: 'Sale', badgeType: 'sale', category: 'Laptops', inStock: true, tags: ['apple', 'professional'] },
  { id: 3, name: 'Sony WH-1000XM6', brand: 'Sony', price: 95000, rating: 4.7, reviewCount: 541, image: "https://img.rocket.new/generatedImages/rocket_gen_img_13f3e1a12-1773759900358.png", alt: 'Black Sony noise-cancelling headphones against white background', badge: 'Best Seller', badgeType: 'new', category: 'Audio', inStock: true, tags: ['wireless', 'noise-cancelling'] },
  { id: 4, name: 'LG OLED C4 55"', brand: 'LG', price: 425000, originalPrice: 490000, rating: 4.6, reviewCount: 87, image: "https://img.rocket.new/generatedImages/rocket_gen_img_13202d21a-1764680491490.png", alt: 'Ultra-thin OLED TV on wall showing vivid colors in dark room', badge: 'Sale', badgeType: 'sale', category: 'TVs', inStock: true, tags: ['oled', '4k'] },
  { id: 5, name: 'PlayStation 5 Slim', brand: 'Sony', price: 215000, rating: 4.9, reviewCount: 423, image: "https://images.unsplash.com/photo-1680785436737-40edb9bccd1a", alt: 'White PlayStation 5 console and controller on dark reflective surface', badge: 'Hot', badgeType: 'new', category: 'Gaming', inStock: true, tags: ['console', 'gaming'] },
  { id: 6, name: 'iPad Pro 13" M4', brand: 'Apple', price: 380000, rating: 4.8, reviewCount: 156, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1686850a6-1772465669582.png", alt: 'iPad Pro with Apple Pencil on white surface showing creative app', badge: 'New', badgeType: 'new', category: 'Tablets', inStock: true, tags: ['apple', 'tablet'] },
  { id: 7, name: 'Logitech MX Master 3S', brand: 'Logitech', price: 28500, originalPrice: 34000, rating: 4.7, reviewCount: 890, image: "https://img.rocket.new/generatedImages/rocket_gen_img_139e05f52-1772209477176.png", alt: 'Ergonomic wireless mouse on dark desk beside keyboard', badge: 'Sale', badgeType: 'sale', category: 'Accessories', inStock: true, tags: ['mouse', 'wireless'] },
  { id: 8, name: 'DJI Mini 4 Pro', brand: 'DJI', price: 320000, rating: 4.6, reviewCount: 74, image: "https://images.unsplash.com/photo-1722590407818-561ac04a3145", alt: 'Small compact drone hovering in blue sky with camera facing down', badge: 'New', badgeType: 'new', category: 'Drones', inStock: false, tags: ['drone', 'camera'] },
  { id: 9, name: 'iPhone 16 Pro Max', brand: 'Apple', price: 395000, rating: 4.8, reviewCount: 267, image: "https://img.rocket.new/generatedImages/rocket_gen_img_16c2eff3f-1770037000714.png", alt: 'iPhone 16 Pro in titanium finish showing camera system', badge: 'New', badgeType: 'new', category: 'Smartphones', inStock: true, tags: ['apple', 'flagship'] },
  { id: 10, name: 'Dell XPS 15 OLED', brand: 'Dell', price: 580000, originalPrice: 650000, rating: 4.5, reviewCount: 142, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d1d89fdd-1772406688268.png", alt: 'Dell laptop open showing colorful OLED display', badge: 'Sale', badgeType: 'sale', category: 'Laptops', inStock: true, tags: ['windows', 'oled'] },
  { id: 11, name: 'JBL Charge 6', brand: 'JBL', price: 42000, rating: 4.4, reviewCount: 318, image: "https://images.unsplash.com/photo-1613251185031-ff162cecfd18", alt: 'Colorful JBL portable bluetooth speaker on sandy beach surface', category: 'Audio', inStock: true, tags: ['bluetooth', 'portable'] },
  { id: 12, name: 'Xbox Series X', brand: 'Microsoft', price: 205000, rating: 4.7, reviewCount: 189, image: "https://images.unsplash.com/photo-1621259182228-4d6861278090", alt: 'Black Xbox Series X console standing upright on white surface', category: 'Gaming', inStock: true, tags: ['console', 'microsoft'] }
];

const categories = ['All', 'Smartphones', 'Laptops', 'Audio', 'TVs', 'Gaming', 'Tablets', 'Accessories', 'Drones'];
const brands = ['All Brands', 'Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'Logitech', 'DJI', 'JBL', 'Microsoft'];
const sortOptions = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Newest'];

function StarRating({ rating }: { rating: number; }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
        <Icon key={star} name="StarIcon" variant={star <= Math.floor(rating) ? 'solid' : 'outline'} size={11} className={star <= Math.floor(rating) ? 'star-filled' : 'star-empty'} />
      )}
    </div>
  );
}

export default function ProductsClient() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('Relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState<Set<number>>(new Set());
  const [products, setProducts] = useState<Product[]>([]);

  // Load products from localStorage (saved by admin panel)
  useEffect(() => {
    const stored = localStorage.getItem('electromart_products');
    if (stored) {
      const parsedProducts = JSON.parse(stored);
      // Convert stored products to match your Product interface
      const mappedProducts = parsedProducts.map((p: any) => ({
        id: p.id,
        name: p.name,
        brand: p.brand || p.category || 'General',
        price: p.price,
        originalPrice: p.originalPrice,
        rating: p.rating || 4.5,
        reviewCount: p.reviewCount || 0,
        image: p.image,
        alt: p.alt || p.name,
        badge: p.badge,
        badgeType: p.badgeType,
        category: p.category,
        inStock: p.status === 'active' && p.stock > 0,
        tags: p.tags || []
      }));
      setProducts(mappedProducts);
    } else {
      // Use default products if nothing in localStorage
      setProducts(defaultProducts);
    }
  }, []);

  const activeFilters: string[] = [];
  if (selectedCategory !== 'All') activeFilters.push(selectedCategory);
  if (selectedBrand !== 'All Brands') activeFilters.push(selectedBrand);
  if (minRating > 0) activeFilters.push(`${minRating}+ Stars`);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedBrand !== 'All Brands' && p.brand !== selectedBrand) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (p.rating < minRating) return false;
      return true;
    });

    switch (sortBy) {
      case 'Price: Low to High': result = [...result].sort((a, b) => a.price - b.price); break;
      case 'Price: High to Low': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'Top Rated': result = [...result].sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return result;
  }, [selectedCategory, selectedBrand, priceRange, minRating, sortBy, products]);

  const toggleWishlist = (id: number) => {
    setWishlisted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const FilterSidebar = () =>
    <div className="flex flex-col gap-7">
      {/* Category */}
      <div>
        <h3 className="text-xs font-700 uppercase tracking-widest text-muted-foreground mb-3">Category</h3>
        <div className="flex flex-col gap-1">
          {categories.map((cat) =>
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-left px-3 py-2 rounded-lg text-sm font-500 transition-all ${selectedCategory === cat ?
                'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`
              }>
              {cat}
            </button>
          )}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h3 className="text-xs font-700 uppercase tracking-widest text-muted-foreground mb-3">Brand</h3>
        <div className="flex flex-col gap-1">
          {brands.map((brand) =>
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`text-left px-3 py-2 rounded-lg text-sm font-500 transition-all ${selectedBrand === brand ?
                'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`
              }>
              {brand}
            </button>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-700 uppercase tracking-widest text-muted-foreground mb-3">Price (XAF)</h3>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Under 50,000', range: [0, 50000] as [number, number] },
            { label: '50K – 150K', range: [50000, 150000] as [number, number] },
            { label: '150K – 400K', range: [150000, 400000] as [number, number] },
            { label: '400K+', range: [400000, 1000000] as [number, number] }].
            map((opt) =>
              <button
                key={opt.label}
                onClick={() => setPriceRange(opt.range)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-500 transition-all ${priceRange[0] === opt.range[0] && priceRange[1] === opt.range[1] ?
                  'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`
                }>
                {opt.label}
              </button>
            )}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-xs font-700 uppercase tracking-widest text-muted-foreground mb-3">Min. Rating</h3>
        <div className="flex flex-col gap-1">
          {[4, 3, 2, 0].map((r) =>
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-500 transition-all ${minRating === r ?
                'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`
              }>
              {r > 0 ?
                <>
                  <StarRating rating={r} />
                  <span>& up</span>
                </> :
                <span>Any rating</span>
              }
            </button>
          )}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          setSelectedCategory('All');
          setSelectedBrand('All Brands');
          setPriceRange([0, 1000000]);
          setMinRating(0);
        }}
        className="btn-ghost py-2.5 text-sm font-600 w-full">
        Reset Filters
      </button>
    </div>;

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Icon name="ChevronRightIcon" size={12} />
            <span className="text-foreground font-500">Products</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-section-xl text-foreground">All Products</h1>
              <p className="text-muted-foreground text-sm mt-1">{filtered.length} products found</p>
            </div>
            {/* Sort + View */}
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-cyber text-sm px-3 py-2.5 pr-8 appearance-none bg-no-repeat"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238B9AB5' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}>
                {sortOptions.map((opt) =>
                  <option key={opt} value={opt}>{opt}</option>
                )}
              </select>
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  aria-label="Grid view">
                  <Icon name="Squares2X2Icon" size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  aria-label="List view">
                  <Icon name="ListBulletIcon" size={16} />
                </button>
              </div>
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden btn-ghost px-4 py-2.5 text-sm font-600 flex items-center gap-2">
                <Icon name="AdjustmentsHorizontalIcon" size={16} />
                Filters
                {activeFilters.length > 0 &&
                  <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] font-700 rounded-full flex items-center justify-center">
                    {activeFilters.length}
                  </span>
                }
              </button>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilters.length > 0 &&
            <div className="flex flex-wrap gap-2 mt-4">
              {activeFilters.map((f) =>
                <span key={f} className="filter-chip">
                  {f}
                  <button
                    onClick={() => {
                      if (categories.includes(f)) setSelectedCategory('All'); else
                        if (brands.includes(f)) setSelectedBrand('All Brands'); else
                          setMinRating(0);
                    }}
                    aria-label={`Remove ${f} filter`}>
                    <Icon name="XMarkIcon" size={12} />
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedBrand('All Brands');
                  setMinRating(0);
                  setPriceRange([0, 1000000]);
                }}
                className="text-xs font-600 text-muted-foreground hover:text-foreground transition-colors px-2">
                Clear all
              </button>
            </div>
          }
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ?
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Icon name="MagnifyingGlassIcon" size={48} className="text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-600 text-foreground mb-2">No products found</h3>
                <p className="text-sm text-muted-foreground mb-6">Try adjusting your filters.</p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSelectedBrand('All Brands'); setMinRating(0); setPriceRange([0, 1000000]); }}
                  className="btn-primary px-6 py-3 text-sm font-600 rounded-lg">
                  Reset Filters
                </button>
              </div> :
              viewMode === 'grid' ?
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filtered.map((product) => {
                    const discount = product.originalPrice ?
                      Math.round((product.originalPrice - product.price) / product.originalPrice * 100) :
                      null;
                    return (
                      <div key={product.id} className="product-card group relative">
                        <Link href="/product-detail" className="block relative overflow-hidden rounded-t-lg">
                          <div className="zoom-container aspect-square bg-muted">
                            <AppImage src={product.image} alt={product.alt} width={400} height={400} className="w-full h-full object-cover" />
                          </div>
                          {product.badge &&
                            <div className="absolute top-2 left-2">
                              {product.badgeType === 'sale' ?
                                <span className="badge-sale">{discount ? `-${discount}%` : product.badge}</span> :
                                <span className="badge-new">{product.badge}</span>
                              }
                            </div>
                          }
                          {!product.inStock &&
                            <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                              <span className="text-xs font-700 text-muted-foreground uppercase tracking-wider border border-border rounded-full px-3 py-1.5">Out of Stock</span>
                            </div>
                          }
                        </Link>
                        <button onClick={() => toggleWishlist(product.id)} className="absolute top-2 right-2 w-8 h-8 bg-card/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center transition-all hover:border-danger" aria-label="Wishlist">
                          <Icon name="HeartIcon" variant={wishlisted.has(product.id) ? 'solid' : 'outline'} size={13} className={wishlisted.has(product.id) ? 'text-danger' : 'text-muted-foreground'} />
                        </button>
                        <div className="p-3.5 flex flex-col gap-2">
                          <p className="text-[10px] font-600 uppercase tracking-widest text-muted-foreground">{product.brand}</p>
                          <Link href="/product-detail">
                            <h3 className="text-sm font-600 text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug">{product.name}</h3>
                          </Link>
                          <div className="flex items-center gap-1.5">
                            <StarRating rating={product.rating} />
                            <span className="text-[11px] text-muted-foreground">({product.reviewCount})</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono-price text-sm text-foreground">XAF {product.price.toLocaleString()}</span>
                            {product.originalPrice && <span className="font-mono-price text-xs text-muted-foreground line-through">{product.originalPrice.toLocaleString()}</span>}
                          </div>
                          <div className="flex gap-2">
                            <button disabled={!product.inStock} className={`flex-1 py-2 text-xs font-600 rounded-lg transition-all flex items-center justify-center gap-1.5 ${product.inStock ? 'btn-primary' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}>
                              <Icon name="ShoppingCartIcon" size={13} />
                              {product.inStock ? 'Add to Cart' : 'Unavailable'}
                            </button>
                            {product.inStock && (
                              <WhatsAppButton
                                productName={product.name}
                                productPrice={product.price}
                                buttonText="WhatsApp"
                                className="flex-1"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div> :
                /* List View */
                <div className="flex flex-col gap-3">
                  {filtered.map((product) => {
                    const discount = product.originalPrice ?
                      Math.round((product.originalPrice - product.price) / product.originalPrice * 100) :
                      null;
                    return (
                      <div key={product.id} className="card-border rounded-xl flex gap-4 p-4 hover-lift group">
                        <Link href="/product-detail" className="relative shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-muted">
                          <AppImage src={product.image} alt={product.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        </Link>
                        <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
                          <div>
                            <p className="text-[10px] font-600 uppercase tracking-widest text-muted-foreground">{product.brand}</p>
                            <Link href="/product-detail">
                              <h3 className="text-sm sm:text-base font-600 text-foreground hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <StarRating rating={product.rating} />
                              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-baseline gap-2">
                              <span className="font-mono-price text-base text-foreground">XAF {product.price.toLocaleString()}</span>
                              {product.originalPrice && <span className="font-mono-price text-sm text-muted-foreground line-through">{product.originalPrice.toLocaleString()}</span>}
                              {discount && <span className="badge-sale">-{discount}%</span>}
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => toggleWishlist(product.id)} className="p-2 border border-border rounded-lg text-muted-foreground hover:text-danger hover:border-danger transition-all" aria-label="Wishlist">
                                <Icon name="HeartIcon" variant={wishlisted.has(product.id) ? 'solid' : 'outline'} size={15} className={wishlisted.has(product.id) ? 'text-danger' : ''} />
                              </button>
                              <button disabled={!product.inStock} className={`px-4 py-2 text-xs font-600 rounded-lg transition-all flex items-center gap-1.5 ${product.inStock ? 'btn-primary' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}>
                                <Icon name="ShoppingCartIcon" size={13} />
                                {product.inStock ? 'Add to Cart' : 'Unavailable'}
                              </button>
                              {product.inStock && (
                                <WhatsAppButton
                                  productName={product.name}
                                  productPrice={product.price}
                                  buttonText="WhatsApp"
                                  className="px-4 py-2"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
            }

            {/* Pagination */}
            {filtered.length > 0 &&
              <div className="flex items-center justify-center gap-2 mt-10">
                <button className="p-2.5 btn-ghost rounded-lg" aria-label="Previous page">
                  <Icon name="ChevronLeftIcon" size={16} />
                </button>
                {[1, 2, 3, 4].map((page) =>
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-lg text-sm font-600 transition-all ${page === 1 ? 'bg-primary text-primary-foreground' : 'btn-ghost'}`}>
                    {page}
                  </button>
                )}
                <button className="p-2.5 btn-ghost rounded-lg" aria-label="Next page">
                  <Icon name="ChevronRightIcon" size={16} />
                </button>
              </div>
            }
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filterOpen &&
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setFilterOpen(false)} />
          <div className="relative ml-auto w-80 max-w-full h-full bg-card border-l border-border overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-700 text-foreground">Filters</h2>
              <button onClick={() => setFilterOpen(false)} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Close filters">
                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      }
    </div>
  );
}