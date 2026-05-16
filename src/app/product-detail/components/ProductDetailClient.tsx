'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/context/CartContext';

const productImages = [
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_1294d2923-1771486444013.png", alt: 'Samsung Galaxy S25 Ultra front view showing vibrant AMOLED display' },
{ src: "https://images.unsplash.com/photo-1609388450046-f25f934547b6", alt: 'Smartphone back panel showing quad-camera system and metallic finish' },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_13767ad7f-1771884148719.png", alt: 'Smartphone side profile showing titanium frame and slim design' },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_18a117ee1-1765291781956.png", alt: 'Smartphone in hand showing scale and ergonomic grip' }];

const colorVariants = [
{ name: 'Titanium Black', hex: '#1a1a1a' },
{ name: 'Titanium Gray', hex: '#6b7280' },
{ name: 'Titanium Violet', hex: '#7c3aed' },
{ name: 'Titanium Yellow', hex: '#ca8a04' }];

const storageVariants = ['256GB', '512GB', '1TB'];

const specs = [
{ label: 'Display', value: '6.9" Dynamic AMOLED 2X, 120Hz, 2600 nits' },
{ label: 'Processor', value: 'Snapdragon 8 Elite, 3nm' },
{ label: 'RAM', value: '12GB LPDDR5X' },
{ label: 'Battery', value: '5000mAh, 45W fast charge, 15W wireless' },
{ label: 'Camera', value: '200MP main + 50MP ultra-wide + 10MP telephoto' },
{ label: 'OS', value: 'Android 15, One UI 7' },
{ label: 'Build', value: 'Titanium frame, Gorilla Glass Armor 2' },
{ label: 'Connectivity', value: '5G, Wi-Fi 7, Bluetooth 5.4, NFC' }];

const reviews = [
{
  name: 'Blaise Ngounou',
  location: 'Douala',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16fc87977-1773056140996.png",
  avatarAlt: 'Professional man in business casual smiling in outdoor setting',
  rating: 5,
  date: 'March 15, 2026',
  verified: true,
  title: "Best phone I've ever owned",
  body: 'The camera is absolutely incredible. Shot a whole wedding with this phone and the clients were blown away. Battery easily lasts the full day even with heavy use. 100% genuine from ElectroMart.',
  helpful: 24
},
{
  name: 'Cécile Abanda',
  location: 'Yaoundé',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a5b689fb-1763296744210.png",
  avatarAlt: 'Young African woman with natural hair smiling in bright environment',
  rating: 5,
  date: 'April 2, 2026',
  verified: true,
  title: 'Fast delivery, genuine product',
  body: 'Ordered on Monday, received in Yaoundé on Wednesday. The phone came sealed in original Samsung packaging. The S Pen is a game-changer for note-taking at university.',
  helpful: 17
},
{
  name: 'Rodrigue Fopa',
  location: 'Bafoussam',
  avatar: "https://images.unsplash.com/photo-1643859707447-d98a2d0de80e",
  avatarAlt: 'Young man with glasses looking at camera in casual setting',
  rating: 4,
  date: 'April 18, 2026',
  verified: true,
  title: 'Excellent but pricey',
  body: 'Undeniably the best Android phone available. The AI features are actually useful, not gimmicky. Docking one star only because of the price — but you get what you pay for.',
  helpful: 11
}];

const relatedProducts = [
{ id: 1, name: 'iPhone 16 Pro Max', brand: 'Apple', price: 395000, rating: 4.8, image: "https://img.rocket.new/generatedImages/rocket_gen_img_16c2eff3f-1770037000714.png", alt: 'iPhone 16 Pro in titanium showing camera module on white background' },
{ id: 2, name: 'Google Pixel 9 Pro', brand: 'Google', price: 265000, rating: 4.6, image: "https://img.rocket.new/generatedImages/rocket_gen_img_17eff5f37-1767829047545.png", alt: 'Google Pixel smartphone showing clean Android interface on screen' },
{ id: 3, name: 'OnePlus 13', brand: 'OnePlus', price: 195000, rating: 4.5, image: "https://img.rocket.new/generatedImages/rocket_gen_img_19e4e9271-1767283843128.png", alt: 'Dark colored smartphone with glossy back panel showing camera area' },
{ id: 4, name: 'Samsung Galaxy Buds3 Pro', brand: 'Samsung', price: 48000, rating: 4.7, image: "https://images.unsplash.com/photo-1632414968069-4a7768c2cc8e", alt: 'White wireless earbuds in open charging case on dark surface' }];

const ratingDistribution = [
{ stars: 5, percentage: 68 },
{ stars: 4, percentage: 18 },
{ stars: 3, percentage: 9 },
{ stars: 2, percentage: 3 },
{ stars: 1, percentage: 2 }];

function StarRating({ rating, size = 14 }: {rating: number;size?: number;}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
      <Icon
        key={star}
        name="StarIcon"
        variant={star <= Math.floor(rating) ? 'solid' : 'outline'}
        size={size}
        className={star <= Math.floor(rating) ? 'star-filled' : 'star-empty'} />
      )}
    </div>);
}

export default function ProductDetailClient() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState('256GB');
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'photos' | 'video' | 'specs'>('photos');
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [reviewHelpful, setReviewHelpful] = useState<Set<number>>(new Set());
  
  // Add to cart hook
  const { addToCart } = useCart();

  const basePrice = 285000;
  const storageExtra: Record<string, number> = { '256GB': 0, '512GB': 25000, '1TB': 60000 };
  const finalPrice = basePrice + (storageExtra[selectedStorage] || 0);

  // Handle add to cart
  const handleAddToCart = () => {
    const productToAdd = {
      id: Date.now(),
      name: `Samsung Galaxy S25 Ultra (${selectedStorage}, ${colorVariants[selectedColor].name})`,
      price: finalPrice,
      image: productImages[selectedImage].src,
      inStock: true,
      storage: selectedStorage,
      color: colorVariants[selectedColor].name,
      quantity: quantity
    };
    
    addToCart(productToAdd);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 100;
    const y = (e.clientY - rect.top) / rect.height * 100;
    setZoomPos({ x, y });
  };

  const toggleHelpful = (idx: number) => {
    setReviewHelpful((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  return (
    <>
      <div className="pt-24 pb-32 lg:pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8 flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Icon name="ChevronRightIcon" size={12} />
            <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
            <Icon name="ChevronRightIcon" size={12} />
            <Link href="/products" className="hover:text-foreground transition-colors">Smartphones</Link>
            <Icon name="ChevronRightIcon" size={12} />
            <span className="text-foreground font-500 truncate max-w-[160px]">Samsung Galaxy S25 Ultra</span>
          </nav>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">

            {/* ── LEFT: Image Gallery ── */}
            <div className="flex flex-col gap-4">
              {/* Tab Bar */}
              <div className="flex items-center gap-1 border border-border rounded-xl p-1 self-start">
                {(['photos', 'video', 'specs'] as const).map((tab) =>
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-600 capitalize transition-all ${
                  activeTab === tab ?
                  'bg-primary text-primary-foreground' :
                  'text-muted-foreground hover:text-foreground'}`
                  }>
                    {tab === 'specs' ? 'Specs' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                )}
              </div>

              {/* Photos Tab */}
              {activeTab === 'photos' &&
              <>
                  <div
                  className="relative aspect-square rounded-xl overflow-hidden border border-border bg-muted cursor-crosshair select-none"
                  onMouseEnter={() => setZoomActive(true)}
                  onMouseLeave={() => setZoomActive(false)}
                  onMouseMove={handleMouseMove}>
                  
                    <AppImage
                    src={productImages[selectedImage].src}
                    alt={productImages[selectedImage].alt}
                    fill
                    priority
                    className="object-cover"
                    style={
                    zoomActive ?
                    { transform: 'scale(1.8)', transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, transition: 'transform 0.1s ease' } :
                    { transform: 'scale(1)', transition: 'transform 0.3s ease' }
                    } />
                  
                    {zoomActive &&
                  <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm border border-border rounded-lg px-2.5 py-1.5 text-xs font-600 text-muted-foreground flex items-center gap-1.5">
                        <Icon name="MagnifyingGlassPlusIcon" size={13} />
                        Zoom active
                      </div>
                  }
                    <button
                    onClick={() => setWishlisted(!wishlisted)}
                    className="absolute top-3 left-3 w-9 h-9 bg-card/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center transition-all hover:border-danger"
                    aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
                    
                      <Icon
                      name="HeartIcon"
                      variant={wishlisted ? 'solid' : 'outline'}
                      size={16}
                      className={wishlisted ? 'text-danger' : 'text-muted-foreground'} />
                    
                    </button>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                    {productImages.map((img, i) =>
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i ?
                    'border-primary' : 'border-border hover:border-muted-foreground'}`
                    }>
                    
                        <AppImage src={img.src} alt={`Thumbnail view ${i + 1}`} fill className="object-cover" />
                      </button>
                  )}
                  </div>
                </>
              }

              {/* Video Tab */}
              {activeTab === 'video' &&
              <div className="aspect-video rounded-xl overflow-hidden border border-border bg-muted flex items-center justify-center relative">
                  <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_175e093df-1771887531027.png"
                  alt="Samsung Galaxy S25 Ultra product demo video thumbnail showing phone features in dark studio"
                  fill
                  className="object-cover opacity-50" />
                
                  <div className="absolute inset-0 bg-background/50" />
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <button className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse-cyan">
                      <Icon name="PlayIcon" size={24} className="text-primary-foreground ml-1" variant="solid" />
                    </button>
                    <span className="text-sm font-600 text-foreground">Watch Full Demo — 3:42</span>
                    <span className="text-xs text-muted-foreground">Official Samsung Galaxy S25 Ultra product review</span>
                  </div>
                </div>
              }

              {/* Specs Tab */}
              {activeTab === 'specs' &&
              <div className="rounded-xl border border-border overflow-hidden">
                  {specs.map((spec, i) =>
                <div
                  key={spec.label}
                  className={`flex gap-4 p-4 ${i % 2 === 0 ? 'bg-muted/30' : 'bg-card'} ${
                  i !== specs.length - 1 ? 'border-b border-border' : ''}`
                  }>
                  
                      <span className="text-xs font-700 uppercase tracking-wider text-muted-foreground w-28 shrink-0 pt-0.5">
                        {spec.label}
                      </span>
                      <span className="text-sm text-foreground font-500 leading-relaxed">{spec.value}</span>
                    </div>
                )}
                </div>
              }
            </div>

            {/* ── RIGHT: Product Info ── */}
            <div className="flex flex-col gap-6">
              {/* Brand + Badges */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-700 uppercase tracking-widest text-primary">Samsung</span>
                <span className="badge-new">New 2026</span>
                <span className="text-xs font-600 text-success bg-success/10 px-2.5 py-1 rounded-full">
                  In Stock
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-800 text-foreground leading-tight tracking-tight">
                  Samsung Galaxy S25 Ultra
                </h1>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                  The ultimate Android flagship with built-in S Pen, 200MP camera system, and Snapdragon 8 Elite processor. Available in Cameroon with official Samsung warranty.
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 flex-wrap">
                <StarRating rating={4.8} size={16} />
                <span className="text-sm font-600 text-foreground">4.8</span>
                <span className="text-sm text-muted-foreground">(312 reviews)</span>
                <button className="text-sm text-primary font-600 hover:underline ml-1">
                  Read reviews
                </button>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 py-4 border-y border-border flex-wrap">
                <span className="font-mono-price text-3xl text-foreground">
                  XAF {finalPrice.toLocaleString()}
                </span>
                <span className="font-mono-price text-sm text-muted-foreground line-through">
                  XAF 320,000
                </span>
                <span className="badge-sale">-11%</span>
              </div>

              {/* Color Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-600 text-foreground">Color</span>
                  <span className="text-sm text-muted-foreground">{colorVariants[selectedColor].name}</span>
                </div>
                <div className="flex gap-3">
                  {colorVariants.map((color, i) =>
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(i)}
                    className={`variant-swatch ${selectedColor === i ? 'active' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                    title={color.name} />
                  )}
                </div>
              </div>

              {/* Storage Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-600 text-foreground">Storage</span>
                  <button className="text-xs text-primary hover:underline font-500">
                    Compare options
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {storageVariants.map((s) =>
                  <button
                    key={s}
                    onClick={() => setSelectedStorage(s)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-600 border transition-all min-w-[80px] text-center ${
                    selectedStorage === s ?
                    'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground'}`
                    }>
                    
                      {s}
                      {s !== '256GB' &&
                    <span className="block text-[10px] font-500 opacity-70">
                          +XAF {storageExtra[s].toLocaleString()}
                        </span>
                    }
                    </button>
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm font-600 text-foreground">Quantity</span>
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                    aria-label="Decrease quantity">
                    <Icon name="MinusIcon" size={16} />
                  </button>
                  <span className="w-12 text-center font-mono-price text-sm font-600 text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                    aria-label="Increase quantity">
                    <Icon name="PlusIcon" size={16} />
                  </button>
                </div>
                <span className="text-xs text-muted-foreground">Only 8 left in stock</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary py-4 text-sm font-700 rounded-xl flex items-center justify-center gap-2"
                >
                  <Icon name="ShoppingCartIcon" size={18} />
                  Add to Cart — XAF {(finalPrice * quantity).toLocaleString()}
                </button>
                <button className="flex-1 sm:flex-none sm:px-6 btn-ghost py-4 text-sm font-700 rounded-xl flex items-center justify-center gap-2 border-primary/30 text-primary hover:bg-primary/10">
                  <Icon name="BoltIcon" size={18} />
                  Buy Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                { icon: 'ShieldCheckIcon', label: 'Official Warranty', sub: '12 months' },
                { icon: 'TruckIcon', label: 'Fast Delivery', sub: 'Douala 24h' },
                { icon: 'ArrowPathIcon', label: 'Easy Returns', sub: '14-day policy' }].
                map((badge) =>
                <div
                  key={badge.label}
                  className="flex flex-col items-center text-center gap-1.5 p-3 bg-muted/30 rounded-xl border border-border">
                  
                    <Icon name={badge.icon as any} size={18} className="text-primary" />
                    <span className="text-xs font-600 text-foreground leading-tight">{badge.label}</span>
                    <span className="text-[10px] text-muted-foreground">{badge.sub}</span>
                  </div>
                )}
              </div>

              {/* Share + Compare */}
              <div className="flex items-center gap-4 pt-1 border-t border-border">
                <button className="flex items-center gap-2 text-xs font-600 text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="ShareIcon" size={14} />
                  Share
                </button>
                <button className="flex items-center gap-2 text-xs font-600 text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="ArrowsRightLeftIcon" size={14} />
                  Compare
                </button>
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`flex items-center gap-2 text-xs font-600 transition-colors ml-auto ${
                  wishlisted ? 'text-danger' : 'text-muted-foreground hover:text-danger'}`
                  }>
                  
                  <Icon name="HeartIcon" size={14} variant={wishlisted ? 'solid' : 'outline'} />
                  {wishlisted ? 'Saved' : 'Save to Wishlist'}
                </button>
              </div>
            </div>
          </div>

          {/* ── REVIEWS SECTION ── */}
          <div className="mt-16 pt-12 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs font-600 uppercase tracking-widest text-primary mb-2">
                  Customer Reviews
                </p>
                <h2 className="text-2xl sm:text-3xl font-700 text-foreground">
                  What Cameroonians Say
                </h2>
              </div>
              <button className="btn-ghost px-5 py-2.5 text-sm font-600 rounded-lg self-start sm:self-auto inline-flex items-center gap-2">
                <Icon name="PencilSquareIcon" size={15} />
                Write a Review
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Rating Summary */}
              <div className="lg:col-span-1">
                <div className="card-border rounded-xl p-6 flex flex-col gap-5 sticky top-24">
                  <div className="flex items-center gap-4">
                    <div className="font-mono-price text-5xl font-700 text-foreground">4.8</div>
                    <div className="flex flex-col gap-1">
                      <StarRating rating={4.8} size={18} />
                      <span className="text-xs text-muted-foreground">312 reviews</span>
                    </div>
                  </div>
                  {/* Distribution Bars */}
                  <div className="flex flex-col gap-2.5">
                    {ratingDistribution.map((row) =>
                    <div key={row.stars} className="flex items-center gap-3">
                        <span className="text-xs font-600 text-muted-foreground w-3 shrink-0">
                          {row.stars}
                        </span>
                        <Icon name="StarIcon" size={11} className="star-filled shrink-0" variant="solid" />
                        <div className="rating-bar flex-1 h-2">
                          <div className="rating-bar-fill h-full" style={{ width: `${row.percentage}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground w-8 text-right shrink-0">
                          {row.percentage}%
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      96% of buyers recommend this product to friends and family.
                    </p>
                  </div>
                </div>
              </div>

              {/* Review Cards */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                {reviews.map((review, i) =>
                <div key={i} className="card-border rounded-xl p-6 flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-border shrink-0">
                          <AppImage
                          src={review.avatar}
                          alt={review.avatarAlt}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-600 text-foreground">{review.name}</span>
                            {review.verified &&
                          <Icon
                            name="CheckBadgeIcon"
                            size={14}
                            className="text-primary shrink-0"
                            variant="solid" />
                          }
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {review.location} · {review.date}
                          </div>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size={13} />
                    </div>

                    {/* Body */}
                    <div>
                      <h4 className="text-sm font-700 text-foreground mb-1.5">{review.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{review.body}</p>
                    </div>

                    {/* Helpful */}
                    <div className="flex items-center gap-3 pt-1 border-t border-border">
                      <span className="text-xs text-muted-foreground">Helpful?</span>
                      <button
                      onClick={() => toggleHelpful(i)}
                      className={`flex items-center gap-1.5 text-xs font-600 transition-colors ${
                      reviewHelpful.has(i) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`
                      }>
                        <Icon name="HandThumbUpIcon" size={13} variant={reviewHelpful.has(i) ? 'solid' : 'outline'} />
                        Yes ({review.helpful + (reviewHelpful.has(i) ? 1 : 0)})
                      </button>
                    </div>
                  </div>
                )}

                {/* Load More */}
                <button className="btn-ghost py-3 text-sm font-600 rounded-xl w-full flex items-center justify-center gap-2">
                  <Icon name="ChevronDownIcon" size={16} />
                  Load 309 more reviews
                </button>
              </div>
            </div>
          </div>

          {/* ── RELATED PRODUCTS ── */}
          <div className="mt-16 pt-12 border-t border-border">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-600 uppercase tracking-widest text-primary mb-2">
                  You May Also Like
                </p>
                <h2 className="text-2xl sm:text-3xl font-700 text-foreground">Related Products</h2>
              </div>
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-600 text-muted-foreground hover:text-primary transition-colors">
                View all <Icon name="ArrowRightIcon" size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((product) =>
              <Link
                key={product.id}
                href="/product-detail"
                className="product-card group block">
                
                  <div className="zoom-container aspect-square bg-muted rounded-t-lg overflow-hidden">
                    <AppImage
                    src={product.image}
                    alt={product.alt}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <p className="text-[10px] font-600 uppercase tracking-widest text-muted-foreground">
                      {product.brand}
                    </p>
                    <h3 className="text-sm font-600 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <StarRating rating={product.rating} size={11} />
                      <span className="text-[11px] text-muted-foreground">{product.rating}</span>
                    </div>
                    <span className="font-mono-price text-sm text-foreground">
                      XAF {product.price.toLocaleString()}
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── STICKY MOBILE CART BAR ── */}
      <div className="sticky-cart-bar lg:hidden flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted-foreground truncate">Samsung Galaxy S25 Ultra · {selectedStorage}</div>
          <div className="font-mono-price text-base font-700 text-foreground">
            XAF {(finalPrice * quantity).toLocaleString()}
          </div>
        </div>
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="p-3 border border-border rounded-xl text-muted-foreground hover:text-danger hover:border-danger transition-all shrink-0"
          aria-label="Wishlist">
          <Icon name="HeartIcon" size={18} variant={wishlisted ? 'solid' : 'outline'} className={wishlisted ? 'text-danger' : ''} />
        </button>
        <button 
          onClick={handleAddToCart}
          className="btn-primary px-6 py-3 text-sm font-700 rounded-xl flex items-center gap-2 shrink-0"
        >
          <Icon name="ShoppingCartIcon" size={16} />
          Add to Cart
        </button>
      </div>
    </>
  );
}