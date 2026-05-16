'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/context/CartContext';

interface CartItem {
  id: number;
  quantity: number;
}

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistCount] = useState(5);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  
  // Get real cart count from CartContext
  const { getCartCount } = useCart();
  const cartCount = mounted ? getCartCount() : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && mobileSearchRef.current) {
      mobileSearchRef.current.focus();
    }
  }, [searchOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },           // ← ADDED
    { label: 'Contact', href: '/contact' },       // ← ADDED
    { label: 'Orders', href: '/orders' },
    { label: 'Deals', href: '/products?filter=deals' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mounted && scrolled ? 'nav-blur py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <AppLogo size={36} />
            <span className="font-sans font-800 text-lg tracking-tight text-foreground hidden sm:block">
              Electro<span className="text-primary">Mart</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-500 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-sm">
            <div className="relative w-full">
              <Icon
                name="MagnifyingGlassIcon"
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search electronics..."
                className="input-cyber w-full pl-9 pr-4 py-2.5 text-sm"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Mobile Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
              aria-label="Search"
            >
              <Icon name="MagnifyingGlassIcon" size={20} />
            </button>

            {/* Wishlist */}
            <Link
              href="/products"
              className="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all hidden sm:flex"
              aria-label="Wishlist"
            >
              <Icon name="HeartIcon" size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white text-[10px] font-700 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
              aria-label="Cart"
            >
              <Icon name="ShoppingCartIcon" size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-700 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account / Admin */}
            <Link
              href="/admin"
              className="hidden sm:flex p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
              aria-label="Admin"
            >
              <Icon name="UserCircleIcon" size={20} />
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
              aria-label="Menu"
            >
              <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mounted && searchOpen && (
          <div className="lg:hidden px-4 pb-3 pt-1">
            <div className="relative">
              <Icon
                name="MagnifyingGlassIcon"
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                ref={mobileSearchRef}
                type="text"
                placeholder="Search electronics..."
                className="input-cyber w-full pl-9 pr-4 py-2.5 text-sm"
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {mounted && menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden flex flex-col pt-20 px-6"
          onClick={() => setMenuOpen(false)}
        >
          <nav className="flex flex-col gap-2 mt-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-4 px-4 text-lg font-600 text-foreground border-b border-border hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex gap-4">
            <Link href="/admin" className="flex-1 btn-primary py-3 text-center font-600 text-sm rounded-lg">
              Admin Panel
            </Link>
            <Link href="/orders" className="flex-1 btn-ghost py-3 text-center font-600 text-sm">
              My Orders
            </Link>
          </div>
        </div>
      )}
    </>
  );
}