'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';

// ============ TYPES ============
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  image: string;
  alt: string;
}

interface Order {
  id: string;
  customer: string;
  phone: string;
  items: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  city: string;
}

// ============ DEFAULT DATA ============
const defaultProducts: Product[] = [
  { id: 1, name: 'Samsung Galaxy S25 Ultra', category: 'Smartphones', price: 285000, stock: 12, status: 'active', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f98b28e8-1772328373491.png", alt: 'Samsung Galaxy S25 Ultra smartphone' },
  { id: 2, name: 'MacBook Pro 14" M4', category: 'Laptops', price: 720000, stock: 5, status: 'active', image: "https://images.unsplash.com/photo-1555449218-e3d347e35300", alt: 'MacBook Pro laptop' },
  { id: 3, name: 'Sony WH-1000XM6', category: 'Audio', price: 95000, stock: 23, status: 'active', image: "https://img.rocket.new/generatedImages/rocket_gen_img_15b612b2a-1774133844071.png", alt: 'Sony headphones' },
  { id: 4, name: 'LG OLED C4 55"', category: 'TVs', price: 425000, stock: 3, status: 'active', image: "https://img.rocket.new/generatedImages/rocket_gen_img_162e6d9e7-1775963538583.png", alt: 'LG OLED TV' },
  { id: 5, name: 'iPhone 16 Pro Max', category: 'Smartphones', price: 395000, stock: 8, status: 'active', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b8623b45-1772991356571.png", alt: 'iPhone 16 Pro Max' },
  { id: 6, name: 'PlayStation 5 Slim', category: 'Gaming', price: 215000, stock: 0, status: 'inactive', image: "https://images.unsplash.com/photo-1709587796970-4e6bae1d4c68", alt: 'PlayStation 5 console' }
];

const mockOrders: Order[] = [
  { id: 'EM-2026-001', customer: 'Jean-Pierre Mbarga', phone: '+237677123456', items: 'Samsung Galaxy S25 Ultra x1', total: 285000, status: 'delivered', date: '2026-05-10', city: 'Yaoundé' },
  { id: 'EM-2026-002', customer: 'Fatima Nkeng', phone: '+237699234567', items: 'MacBook Pro 14" M4 x1', total: 720000, status: 'shipped', date: '2026-05-11', city: 'Douala' },
  { id: 'EM-2026-003', customer: 'Emmanuel Tabi', phone: '+237655345678', items: 'Sony WH-1000XM6 x2', total: 190000, status: 'processing', date: '2026-05-12', city: 'Bafoussam' },
  { id: 'EM-2026-004', customer: 'Aïcha Bello', phone: '+237677456789', items: 'iPhone 16 Pro Max x1, JBL Charge 6 x1', total: 437000, status: 'pending', date: '2026-05-13', city: 'Garoua' },
  { id: 'EM-2026-005', customer: 'Rodrigue Essomba', phone: '+237699567890', items: 'LG OLED C4 55" x1', total: 425000, status: 'cancelled', date: '2026-05-09', city: 'Douala' },
  { id: 'EM-2026-006', customer: 'Clarisse Fouda', phone: '+237655678901', items: 'iPad Pro 13" M4 x1', total: 380000, status: 'pending', date: '2026-05-13', city: 'Yaoundé' }
];

const statusColors: Record<Order['status'], string> = {
  pending: 'bg-warning/15 text-warning',
  processing: 'bg-primary/15 text-primary',
  shipped: 'bg-blue-500/15 text-blue-400',
  delivered: 'bg-success/15 text-success',
  cancelled: 'bg-danger/15 text-danger'
};

// ============ PASSWORD PROTECTION ============
function PasswordProtection({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // CHANGE THIS PASSWORD to something only you know!
    if (password === 'ElectroMart2026') {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Wrong password. Access denied.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="bg-card rounded-2xl p-8 w-full max-w-md border border-border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
            <p className="text-muted-foreground mt-2">Enter password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-input text-foreground placeholder:text-muted-foreground"
              autoFocus
            />
            {error && <div className="text-danger text-sm text-center">{error}</div>}
            <button type="submit" className="w-full btn-primary py-3 rounded-lg font-semibold">
              Access Admin Panel
            </button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-6">Authorized access only</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// ============ PRODUCT MANAGEMENT COMPONENT ============
function ProductManager({ products, setProducts }: { products: Product[]; setProducts: (products: Product[]) => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Smartphones',
    price: 0,
    stock: 0,
    status: 'active' as 'active' | 'inactive',
    image: '',
    alt: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image too large! Max 5MB');
        return;
      }
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, image: reader.result as string, alt: file.name }));
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const capturePhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => handleImageUpload(e as any);
    input.click();
  };

  const useRandomImage = () => {
    const randomId = Math.floor(Math.random() * 1000);
    const randomImage = `https://picsum.photos/id/${randomId}/400/400`;
    setImagePreview(randomImage);
    setFormData(prev => ({ ...prev, image: randomImage, alt: 'Product image' }));
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ name: '', category: 'Smartphones', price: 0, stock: 0, status: 'active', image: '', alt: '' });
    setImagePreview('');
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status,
      image: product.image,
      alt: product.alt
    });
    setImagePreview(product.image);
    setIsModalOpen(true);
  };

  const saveProduct = () => {
    if (!formData.name || !formData.image || formData.price <= 0) {
      alert('Please fill all required fields (name, image, price)');
      return;
    }

    if (editingProduct) {
      const updated = products.map(p => p.id === editingProduct.id ? { ...formData, id: editingProduct.id } : p);
      setProducts(updated);
      localStorage.setItem('electromart_products', JSON.stringify(updated));
      alert('Product updated!');
    } else {
      const newProduct = { ...formData, id: Date.now() };
      const updated = [...products, newProduct];
      setProducts(updated);
      localStorage.setItem('electromart_products', JSON.stringify(updated));
      alert('Product added!');
    }
    setIsModalOpen(false);
  };

  const deleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStorage.setItem('electromart_products', JSON.stringify(updated));
      alert('Product deleted');
    }
  };

  return (
    <div className="card-border rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-wrap gap-3">
        <h2 className="text-base font-700 text-foreground">Products ({products.length})</h2>
        <button onClick={openAddModal} className="btn-primary px-4 py-2 text-sm font-600 flex items-center gap-2 rounded-lg">
          <Icon name="PlusIcon" size={16} />
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground uppercase tracking-wider">Product</th>
              <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground hidden sm:table-cell uppercase tracking-wider">Category</th>
              <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground uppercase tracking-wider">Price (XAF)</th>
              <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground hidden md:table-cell uppercase tracking-wider">Stock</th>
              <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground uppercase tracking-wider">Actions</th>
             </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img src={product.image} alt={product.alt} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm font-600 text-foreground">{product.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground hidden sm:table-cell">{product.category}</td>
                <td className="px-6 py-4 text-sm font-600 text-foreground">{product.price.toLocaleString()} FCFA</td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className={`text-sm font-600 ${product.stock === 0 ? 'text-danger' : product.stock <= 5 ? 'text-warning' : 'text-success'}`}>
                    {product.stock}
                  </span>
                 </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-700 px-2.5 py-1 rounded-full ${product.status === 'active' ? 'bg-success/15 text-success' : 'bg-muted text-muted-foreground'}`}>
                    {product.status}
                  </span>
                 </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal(product)} className="p-1.5 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-all">
                      <Icon name="PencilIcon" size={14} />
                    </button>
                    <button onClick={() => deleteProduct(product.id)} className="p-1.5 text-muted-foreground hover:text-danger hover:bg-muted rounded-lg transition-all">
                      <Icon name="TrashIcon" size={14} />
                    </button>
                  </div>
                 </td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL - Add/Edit Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="bg-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border">
            
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
              <h2 className="text-xl font-700 text-foreground">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition">
                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-600 text-foreground mb-3">Product Image *</label>
                {imagePreview && (
                  <div className="mb-4">
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-border" />
                  </div>
                )}
                <div className="space-y-3">
                  <div>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="w-full px-4 py-3 border-2 border-dashed border-border rounded-lg hover:border-primary transition text-sm font-600 flex items-center justify-center gap-2 text-foreground bg-card">
                      <Icon name="CloudArrowUpIcon" size={18} />
                      {uploading ? 'Uploading...' : '📱 Upload from Phone/Computer'}
                    </button>
                  </div>
                  <button onClick={capturePhoto} className="w-full px-4 py-3 bg-muted rounded-lg hover:bg-muted/70 transition text-sm font-600 flex items-center justify-center gap-2 text-foreground">
                    <Icon name="CameraIcon" size={18} />
                    📸 Take Photo with Camera
                  </button>
                  <input type="url" placeholder="Or paste image URL from web" className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-input text-foreground placeholder:text-muted-foreground" onChange={(e) => { setImagePreview(e.target.value); setFormData(prev => ({ ...prev, image: e.target.value })); }} />
                  <button onClick={useRandomImage} className="w-full px-4 py-2 bg-muted rounded-lg hover:bg-muted/70 transition text-sm font-600 text-foreground">
                    🎲 Use Random Placeholder Image
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <input type="text" placeholder="Product Name *" className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-input text-foreground placeholder:text-muted-foreground" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-input text-foreground" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                  {['Smartphones', 'Laptops', 'Audio', 'TVs', 'Gaming', 'Tablets', 'Accessories', 'Drones'].map(cat => (
                    <option key={cat} value={cat} className="bg-card">{cat}</option>
                  ))}
                </select>

                <input type="number" placeholder="Price (XAF) *" className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-input text-foreground placeholder:text-muted-foreground" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })} />

                <input type="number" placeholder="Stock Quantity" className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-input text-foreground placeholder:text-muted-foreground" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })} />

                <select className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-input text-foreground" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}>
                  <option value="active" className="bg-card">Active (Visible in store)</option>
                  <option value="inactive" className="bg-card">Inactive (Hidden)</option>
                </select>
              </div>

              <input type="text" placeholder="Image Alt Text (for accessibility)" className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-input text-foreground placeholder:text-muted-foreground" value={formData.alt} onChange={(e) => setFormData({ ...formData, alt: e.target.value })} />

              <div className="flex gap-3 pt-4">
                <button onClick={saveProduct} className="flex-1 btn-primary py-2.5 rounded-lg font-600">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 btn-ghost rounded-lg font-600">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ MAIN ADMIN PAGE ============
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [orderFilter, setOrderFilter] = useState<'all' | Order['status']>('all');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('electromart_products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem('electromart_products', JSON.stringify(defaultProducts));
    }
  }, []);

  const filteredOrders = orderFilter === 'all' ? mockOrders : mockOrders.filter((o) => o.status === orderFilter);
  
  const stats = [
    { label: 'Total Revenue', value: '12.4M XAF', icon: 'BanknotesIcon', change: '+18%', positive: true },
    { label: 'Orders Today', value: '24', icon: 'ShoppingBagIcon', change: '+6', positive: true },
    { label: 'Active Products', value: products.filter(p => p.status === 'active').length.toString(), icon: 'CubeIcon', change: '+3', positive: true },
    { label: 'Pending Orders', value: '7', icon: 'ClockIcon', change: '-2', positive: false }
  ];

  return (
    <PasswordProtection>
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-600 text-primary uppercase tracking-widest">ElectroMart</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://wa.me/237677000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/25 transition-all text-sm font-600">
                <Icon name="ChatBubbleLeftEllipsisIcon" size={16} />
                WhatsApp Support
              </a>
              <button onClick={() => { localStorage.removeItem('adminAuth'); window.location.href = '/admin/login'; }} className="px-4 py-2.5 bg-danger/80 text-white rounded-lg hover:bg-danger text-sm font-600">
                Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-muted rounded-xl mb-8 w-fit">
            {(['dashboard', 'products', 'orders'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 rounded-lg text-sm font-600 capitalize transition-all ${activeTab === tab ? 'bg-card text-foreground shadow-sm border border-border' : 'text-muted-foreground hover:text-foreground'}`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="card-border rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2.5 bg-primary/10 rounded-xl">
                        <Icon name={stat.icon as any} size={20} className="text-primary" />
                      </div>
                      <span className={`text-xs font-700 px-2 py-1 rounded-full ${stat.positive ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-2xl font-800 text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="card-border rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                  <h2 className="text-base font-700 text-foreground">Recent Orders</h2>
                  <button onClick={() => setActiveTab('orders')} className="text-xs font-600 text-primary hover:underline">View all</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground uppercase tracking-wider">Order</th>
                        <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground uppercase tracking-wider">Customer</th>
                        <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground hidden md:table-cell uppercase tracking-wider">Total</th>
                        <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground uppercase tracking-wider">Status</th>
                       </tr>
                    </thead>
                    <tbody>
                      {mockOrders.slice(0, 4).map((order) => (
                        <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4 text-sm font-600 text-primary">{order.id}</td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-500 text-foreground">{order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.city}</p>
                          </td>
                          <td className="px-6 py-4 text-sm font-600 text-foreground hidden md:table-cell">{order.total.toLocaleString()} XAF</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-700 px-2.5 py-1 rounded-full capitalize ${statusColors[order.status]}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && <ProductManager products={products} setProducts={setProducts} />}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {(['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((f) => (
                  <button key={f} onClick={() => setOrderFilter(f)} className={`px-4 py-1.5 rounded-full text-xs font-600 capitalize transition-all ${orderFilter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
                    {f}
                  </button>
                ))}
              </div>

              <div className="card-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground uppercase tracking-wider">Order ID</th>
                        <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground uppercase tracking-wider">Customer</th>
                        <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground hidden lg:table-cell uppercase tracking-wider">Items</th>
                        <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground hidden md:table-cell uppercase tracking-wider">Total</th>
                        <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground hidden sm:table-cell uppercase tracking-wider">Date</th>
                        <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground uppercase tracking-wider">Contact</th>
                       </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4 text-sm font-600 text-primary">{order.id}</td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-500 text-foreground">{order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.city}</p>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground hidden lg:table-cell max-w-[200px] truncate">{order.items}</td>
                          <td className="px-6 py-4 text-sm font-600 text-foreground hidden md:table-cell">{order.total.toLocaleString()} XAF</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-700 px-2.5 py-1 rounded-full capitalize ${statusColors[order.status]}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground hidden sm:table-cell">{order.date}</td>
                          <td className="px-6 py-4">
                            <a href={`https://wa.me/${order.phone.replace(/\s+/g, '').replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-600 text-[#25D366] hover:underline">
                              <Icon name="ChatBubbleLeftEllipsisIcon" size={14} />
                              WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </main>
    </PasswordProtection>
  );
}