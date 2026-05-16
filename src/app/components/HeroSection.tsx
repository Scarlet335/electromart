'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const floatingSpecs = [
{ label: 'Battery', value: '5000mAh', icon: 'BoltIcon' },
{ label: 'Display', value: '6.7" AMOLED', icon: 'DevicePhoneMobileIcon' },
{ label: 'Camera', value: '200MP', icon: 'CameraIcon' }];


export default function HeroSection() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const lines = [line1Ref, line2Ref, line3Ref];
    lines.forEach((ref, i) => {
      const parent = ref.current?.parentElement;
      if (parent) {
        setTimeout(() => {
          parent.classList.add('revealed');
        }, 300 + i * 200);
      }
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 blob-cyan opacity-60 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 blob-blue opacity-40 animate-float-delayed" />
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none">
          <div
            className="w-full h-0.5 bg-primary animate-scan-line"
            style={{ animationDuration: '4s' }} />
          
        </div>
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text Content */}
          <div className="flex flex-col gap-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-600 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              New Arrivals 2026 · Cameroon
            </div>

            {/* Headline */}
            <h1 className="text-hero-xl text-foreground">
              <span className="line-reveal">
                <span ref={line1Ref}>Next-Gen</span>
              </span>
              <span className="line-reveal">
                <span ref={line2Ref} className="text-primary cyan-glow-text">
                  Electronics
                </span>
              </span>
              <span className="line-reveal">
                <span ref={line3Ref}>Delivered.</span>
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Genuine smartphones, laptops, audio gear, and more — shipped fast to Douala, Yaoundé, and across Cameroon. B2B wholesale accounts available.
            </p>

            {/* Search Bar */}
            <div className="flex gap-3 max-w-md">
              <div className="relative flex-1">
                <Icon
                  name="MagnifyingGlassIcon"
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                
                <input
                  type="text"
                  placeholder="Search products..."
                  className="input-cyber w-full pl-10 pr-4 py-3.5 text-sm" />
                
              </div>
              <Link
                href="/products"
                className="btn-primary px-5 py-3.5 text-sm font-600 rounded-lg whitespace-nowrap">
                
                Search
              </Link>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="btn-primary px-7 py-3.5 text-sm font-600 rounded-lg inline-flex items-center gap-2">
                
                Shop Now
                <Icon name="ArrowRightIcon" size={16} />
              </Link>
              <Link
                href="/products"
                className="btn-ghost px-7 py-3.5 text-sm font-600 rounded-lg inline-flex items-center gap-2">
                
                View Deals
                <Icon name="TagIcon" size={16} />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-2 border-t border-border">
              {[
              { value: '10K+', label: 'Products' },
              { value: '500+', label: 'Brands' },
              { value: '48h', label: 'Delivery' }].
              map((stat) =>
              <div key={stat.label}>
                  <div className="font-mono-price text-xl text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-500 uppercase tracking-wide mt-0.5">
                    {stat.label}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Showcase */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Main Product Image */}
            <div className="relative animate-float">
              <div className="relative w-[280px] sm:w-[320px] lg:w-[360px] aspect-[9/16] max-h-[520px] rounded-2xl overflow-hidden border border-primary/20 cyan-glow">
                <AppImage
                  src="https://images.unsplash.com/photo-1620049185922-cf4a51f106a3"
                  alt="Modern smartphone with sleek black design displayed upright against dark background"
                  fill
                  className="object-cover"
                  priority />
                
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Price Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl px-5 py-3 flex items-center gap-3 shadow-2xl whitespace-nowrap">
                <div>
                  <div className="text-xs text-muted-foreground font-500">Samsung Galaxy S25</div>
                  <div className="font-mono-price text-lg text-primary">XAF 285,000</div>
                </div>
                <button className="btn-primary p-2 rounded-lg">
                  <Icon name="ShoppingCartIcon" size={16} />
                </button>
              </div>
            </div>

            {/* Floating Spec Cards */}
            {floatingSpecs.map((spec, i) =>
            <div
              key={spec.label}
              className="absolute hidden sm:flex items-center gap-2.5 bg-card/90 backdrop-blur-sm border border-border rounded-xl px-3.5 py-2.5 shadow-xl"
              style={{
                top: i === 0 ? '10%' : i === 1 ? '40%' : undefined,
                bottom: i === 2 ? '20%' : undefined,
                right: i === 0 ? '-5%' : undefined,
                left: i === 1 ? '-12%' : i === 2 ? '-8%' : undefined,
                animationDelay: `${i * 0.8}s`
              }}>
              
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name={spec.icon as any} size={16} className="text-primary" />
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground font-500 uppercase tracking-wide">
                    {spec.label}
                  </div>
                  <div className="text-sm font-600 text-foreground">{spec.value}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}