'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

interface OrderItem {
  id: number;
  name: string;
  image: string;
  alt: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  city: string;
  paymentMethod: string;
}

const mockOrders: Order[] = [
{
  id: 'EM-2026-001',
  date: '2026-05-10',
  status: 'delivered',
  city: 'Yaoundé',
  paymentMethod: 'MTN Mobile Money',
  items: [
  { id: 1, name: 'Samsung Galaxy S25 Ultra', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f98b28e8-1772328373491.png", alt: 'Samsung Galaxy S25 Ultra smartphone', price: 285000, quantity: 1 }],

  total: 285000
},
{
  id: 'EM-2026-004',
  date: '2026-05-13',
  status: 'pending',
  city: 'Garoua',
  paymentMethod: 'Orange Money',
  items: [
  { id: 9, name: 'iPhone 16 Pro Max', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fc0dabeb-1772285500644.png", alt: 'iPhone 16 Pro Max in titanium finish', price: 395000, quantity: 1 },
  { id: 11, name: 'JBL Charge 6', image: "https://img.rocket.new/generatedImages/rocket_gen_img_116019093-1765274487348.png", alt: 'JBL portable bluetooth speaker', price: 42000, quantity: 1 }],

  total: 437000
}];


const statusConfig: Record<Order['status'], {label: string;color: string;icon: string;step: number;}> = {
  pending: { label: 'Order Placed', color: 'text-warning', icon: 'ClockIcon', step: 1 },
  processing: { label: 'Processing', color: 'text-primary', icon: 'CogIcon', step: 2 },
  shipped: { label: 'Shipped', color: 'text-blue-400', icon: 'TruckIcon', step: 3 },
  delivered: { label: 'Delivered', color: 'text-success', icon: 'CheckCircleIcon', step: 4 },
  cancelled: { label: 'Cancelled', color: 'text-danger', icon: 'XCircleIcon', step: 0 }
};

const trackingSteps = [
{ label: 'Order Placed', icon: 'ShoppingBagIcon' },
{ label: 'Processing', icon: 'CogIcon' },
{ label: 'Shipped', icon: 'TruckIcon' },
{ label: 'Delivered', icon: 'CheckCircleIcon' }];


function OrderCard({ order }: {order: Order;}) {
  const [expanded, setExpanded] = useState(false);
  const config = statusConfig[order.status];
  const currentStep = config.step;

  return (
    <div className="card-border rounded-2xl overflow-hidden">
      {/* Order Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-border">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm font-700 text-primary">{order.id}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Placed on {order.date} · {order.city}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1.5 text-xs font-700 px-3 py-1.5 rounded-full capitalize ${
          order.status === 'delivered' ? 'bg-success/15 text-success' :
          order.status === 'pending' ? 'bg-warning/15 text-warning' :
          order.status === 'processing' ? 'bg-primary/15 text-primary' :
          order.status === 'shipped' ? 'bg-blue-500/15 text-blue-400' : 'bg-danger/15 text-danger'}`
          }>
            <Icon name={config.icon as any} size={12} />
            {config.label}
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
            
            <Icon name={expanded ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={16} />
          </button>
        </div>
      </div>

      {/* Order Items Preview */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-3 flex-wrap">
          {order.items.map((item) =>
          <div key={item.id} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0">
                <AppImage src={item.image} alt={item.alt} width={48} height={48} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-600 text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity} · {item.price.toLocaleString()} XAF</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="CreditCardIcon" size={14} />
            {order.paymentMethod}
          </div>
          <p className="text-base font-800 text-foreground font-mono-price">{order.total.toLocaleString()} XAF</p>
        </div>
      </div>

      {/* Expanded: Tracking */}
      {expanded && order.status !== 'cancelled' &&
      <div className="px-6 pb-6 border-t border-border/50 pt-5">
          <p className="text-xs font-600 text-muted-foreground uppercase tracking-wider mb-5">Order Tracking</p>
          <div className="flex items-center gap-0">
            {trackingSteps.map((step, idx) => {
            const stepNum = idx + 1;
            const done = currentStep >= stepNum;
            const active = currentStep === stepNum;
            return (
              <React.Fragment key={step.label}>
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                  done ? 'bg-primary border-primary' : 'bg-muted border-border'} ${
                  active ? 'ring-4 ring-primary/20' : ''}`}>
                      <Icon name={step.icon as any} size={16} className={done ? 'text-primary-foreground' : 'text-muted-foreground'} />
                    </div>
                    <span className={`text-[10px] font-600 text-center max-w-[60px] leading-tight ${done ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < trackingSteps.length - 1 &&
                <div className={`flex-1 h-0.5 mb-5 mx-1 transition-all ${currentStep > stepNum ? 'bg-primary' : 'bg-border'}`} />
                }
                </React.Fragment>);

          })}
          </div>
        </div>
      }

      {/* Actions */}
      {expanded &&
      <div className="px-6 pb-5 flex flex-wrap gap-3">
          <a
          href="https://wa.me/237677000000?text=Hello%2C%20I%20need%20help%20with%20my%20order"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/25 transition-all text-sm font-600">
          
            <Icon name="ChatBubbleLeftEllipsisIcon" size={16} />
            Contact via WhatsApp
          </a>
          {order.status === 'delivered' &&
        <Link href="/products" className="btn-ghost px-4 py-2.5 text-sm font-600">
              Buy Again
            </Link>
        }
        </div>
      }
    </div>);

}

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | Order['status']>('all');

  const filtered = activeFilter === 'all' ? mockOrders : mockOrders.filter((o) => o.status === activeFilter);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-600 text-primary uppercase tracking-widest">My Account</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-section-xl text-foreground">My Orders</h1>
            <a
              href="https://wa.me/237677000000?text=Hello%20ElectroMart%2C%20I%20need%20help%20with%20my%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/25 transition-all text-sm font-600 w-fit">
              
              <Icon name="ChatBubbleLeftEllipsisIcon" size={16} />
              Need help? Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((f) =>
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-600 capitalize transition-all ${
            activeFilter === f ?
            'bg-primary text-primary-foreground' :
            'bg-muted text-muted-foreground hover:text-foreground'}`
            }>
            
              {f}
            </button>
          )}
        </div>

        {/* Orders List */}
        {filtered.length > 0 ?
        <div className="flex flex-col gap-4">
            {filtered.map((order) =>
          <OrderCard key={order.id} order={order} />
          )}
          </div> :

        <div className="card-border rounded-2xl p-16 text-center">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="ShoppingBagIcon" size={28} className="text-muted-foreground" />
            </div>
            <p className="text-base font-600 text-foreground mb-2">No orders found</p>
            <p className="text-sm text-muted-foreground mb-6">You have no {activeFilter !== 'all' ? activeFilter : ''} orders yet.</p>
            <Link href="/products" className="btn-primary px-6 py-2.5 text-sm font-600 inline-block">
              Browse Products
            </Link>
          </div>
        }
      </div>
      <Footer />
    </main>);

}