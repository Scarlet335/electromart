'use client';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Icon name="ChevronRightIcon" size={12} />
            <span className="text-foreground">About Us</span>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-section-xl text-foreground mb-4">About ElectroMart</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cameroon's trusted destination for premium electronics since 2020
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Icon name="HeartIcon" size={24} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To provide Cameroonians with access to genuine, high-quality electronics at competitive prices, 
                backed by exceptional customer service and fast delivery across the country.
              </p>
            </div>
            <div>
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Icon name="EyeIcon" size={24} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the most trusted electronics retailer in Central Africa, 
                bridging the gap between global technology and local accessibility.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 card-border rounded-2xl">
              <p className="text-3xl font-bold text-primary">2020</p>
              <p className="text-sm text-muted-foreground">Founded</p>
            </div>
            <div className="text-center p-6 card-border rounded-2xl">
              <p className="text-3xl font-bold text-primary">10,000+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center p-6 card-border rounded-2xl">
              <p className="text-3xl font-bold text-primary">48h</p>
              <p className="text-sm text-muted-foreground">Average Delivery</p>
            </div>
            <div className="text-center p-6 card-border rounded-2xl">
              <p className="text-3xl font-bold text-primary">100%</p>
              <p className="text-sm text-muted-foreground">Genuine Products</p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Why Choose ElectroMart?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: 'ShieldCheckIcon', title: 'Genuine Products', desc: '100% authentic electronics with official warranty' },
                { icon: 'TruckIcon', title: 'Fast Delivery', desc: 'Delivery to Douala (24h) and other cities (48-72h)' },
                { icon: 'CurrencyDollarIcon', title: 'Best Prices', desc: 'Competitive XAF pricing with no hidden fees' },
                { icon: 'HeadphonesIcon', title: 'Customer Support', desc: 'Dedicated support via WhatsApp and phone' },
                { icon: 'ArrowPathIcon', title: 'Easy Returns', desc: '14-day return policy on eligible items' },
                { icon: 'CreditCardIcon', title: 'Secure Payments', desc: 'Cash on delivery and mobile money options' }
              ].map((item) => (
                <div key={item.title} className="card-border rounded-2xl p-6 text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon as any} size={24} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Our Team</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card-border rounded-2xl p-6 flex gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name="UserCircleIcon" size={40} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Jean-Pierre Mbarga</h3>
                  <p className="text-sm text-primary mb-2">Founder & CEO</p>
                  <p className="text-sm text-muted-foreground">10+ years in electronics retail</p>
                </div>
              </div>
              <div className="card-border rounded-2xl p-6 flex gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name="UserCircleIcon" size={40} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Fatima Nkeng</h3>
                  <p className="text-sm text-primary mb-2">Operations Manager</p>
                  <p className="text-sm text-muted-foreground">Customer satisfaction expert</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center p-12 card-border rounded-2xl bg-gradient-to-r from-primary/5 to-transparent">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Shop?</h2>
            <p className="text-muted-foreground mb-6">Browse our collection of premium electronics</p>
            <Link href="/products" className="btn-primary px-8 py-3 rounded-lg inline-block">
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}