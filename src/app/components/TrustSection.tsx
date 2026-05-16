import React from 'react';
import Icon from '@/components/ui/AppIcon';

const pillars = [
  {
    icon: 'ShieldCheckIcon',
    title: '100% Genuine Products',
    description: 'Every item is sourced directly from authorized distributors and brand partners. No counterfeits, ever.',
    stat: '10K+ SKUs',
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    icon: 'TruckIcon',
    title: 'Fast Cameroon Delivery',
    description: 'Same-day dispatch from Douala warehouse. Delivery to Yaoundé, Bafoussam, and 50+ cities within 48h.',
    stat: '48h Delivery',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: 'WrenchScrewdriverIcon',
    title: '1-Year Warranty',
    description: 'All electronics come with official manufacturer warranty plus our ElectroMart service guarantee.',
    stat: '12 Months',
    color: 'text-warning',
    bg: 'bg-warning/10',
  },
  {
    icon: 'BuildingOffice2Icon',
    title: 'B2B Wholesale Accounts',
    description: 'Bulk pricing, dedicated account managers, and net-30 invoicing for businesses and institutions.',
    stat: 'From 5 units',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
];

export default function TrustSection() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-600 uppercase tracking-widest text-primary mb-2">
            Why Choose Us
          </p>
          <h2 className="text-section-xl text-foreground">
            The ElectroMart Standard
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base leading-relaxed">
            Serving Cameroonian consumers and businesses with genuine technology since 2019.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="card-border rounded-xl p-6 hover-lift group flex flex-col gap-4"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${pillar.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                <Icon name={pillar.icon as any} size={24} className={pillar.color} />
              </div>

              {/* Stat */}
              <div className={`font-mono-price text-2xl ${pillar.color}`}>
                {pillar.stat}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-base font-700 text-foreground mb-2">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* B2B CTA Banner */}
        <div className="mt-10 relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-card to-card p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 blob-cyan opacity-20 -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="BuildingOffice2Icon" size={18} className="text-primary" />
              <span className="text-xs font-700 uppercase tracking-widest text-primary">B2B Wholesale</span>
            </div>
            <h3 className="text-xl font-700 text-foreground mb-1">
              Buying for your business?
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Get exclusive bulk pricing, dedicated support, and net-30 payment terms for orders of 5+ units.
            </p>
          </div>
          <button className="relative z-10 btn-primary px-7 py-3.5 text-sm font-600 rounded-lg whitespace-nowrap inline-flex items-center gap-2 shrink-0">
            Open B2B Account
            <Icon name="ArrowRightIcon" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}