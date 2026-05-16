import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  const linkGroups = [
    {
      title: 'Shop',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Deals', href: '/products?filter=deals' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },        // ← FIXED: /about
        { label: 'Contact Us', href: '/contact' },    // ← FIXED: /contact
        { label: 'B2B Wholesale', href: '/products' },
        { label: 'Careers', href: '/' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Track Order', href: '/orders' },
        { label: 'Returns', href: '/' },
        { label: 'Support', href: '/contact' },       // ← FIXED: goes to contact
      ],
    },
  ];

  const socials = [
    { icon: 'GlobeAltIcon', label: 'Facebook', href: '#' },
    { icon: 'ChatBubbleLeftEllipsisIcon', label: 'WhatsApp', href: 'https://wa.me/237677123456' },
    { icon: 'PhotoIcon', label: 'Instagram', href: '#' },
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-10 sm:gap-16 mb-10">
          {/* Brand */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <AppLogo size={32} />
              <span className="font-sans font-700 text-base tracking-tight text-foreground">
                Electro<span className="text-primary">Mart</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-[200px] leading-relaxed">
              Cameroon's trusted electronics retailer since 2020.
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              📍 Douala, Cameroon
            </p>
            <p className="text-xs text-muted-foreground">
              📞 +237 677 123 456
            </p>
          </div>

          {/* Link Groups */}
          <div className="flex flex-wrap gap-10 sm:gap-16 flex-1">
            {linkGroups.map((group, gi) => (
              <div key={gi} className="flex flex-col gap-3">
                <h4 className="text-xs font-700 uppercase tracking-wider text-muted-foreground">
                  {group.title}
                </h4>
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-500 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3 shrink-0">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-all"
              >
                <Icon name={s.icon as any} size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-muted-foreground">
            © 2026 ElectroMart Cameroon. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-500 text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="text-sm font-500 text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm font-500 text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}