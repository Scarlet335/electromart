'use client';
import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

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

interface ProductManagerProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

const categories = ['Smartphones', 'Laptops', 'Audio', 'TVs', 'Gaming', 'Tablets', 'Accessories', 'Drones'];

export default function ProductManager({ products, setProducts }: ProductManagerProps) {
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

  // Handle image upload from phone/computer
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
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

  // Capture photo from phone camera
  const capturePhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // 'user' for front camera, 'environment' for back camera
    input.onchange = (e) => handleImageUpload(e as any);
    input.click();
  };

  // Use random placeholder image
  const useRandomImage = () => {
    const randomId = Math.floor(Math.random() * 1000);
    const randomImage = `https://picsum.photos/id/${randomId}/400/400`;
    setImagePreview(randomImage);
    setFormData(prev => ({ ...prev, image: randomImage, alt: 'Product image' }));
  };

  // Paste image URL
  const handleImageUrl = (url: string) => {
    setImagePreview(url);
    setFormData(prev => ({ ...prev, image: url }));
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Smartphones',
      price: 0,
      stock: 0,
      status: 'active',
      image: '',
      alt: ''
    });
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
      // Update existing product
      const updated = products.map(p => 
        p.id === editingProduct.id 
          ? { ...formData, id: editingProduct.id }
          : p
      );
      setProducts(updated);
      localStorage.setItem('electromart_products', JSON.stringify(updated));
      alert('Product updated!');
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: Date.now(),
      };
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
        <button 
          onClick={openAddModal}
          className="btn-primary px-4 py-2 text-sm font-600 flex items-center gap-2"
        >
          <Icon name="PlusIcon" size={16} />
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground uppercase tracking-wider">Product</th>
              <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Category</th>
              <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground uppercase tracking-wider">Price (XAF)</th>
              <th className="text-left px-6 py-3 text-xs font-600 text-muted-foreground uppercase tracking-wider hidden md:table-cell">Stock</th>
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
                      <img 
                        src={product.image} 
                        alt={product.alt} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
                        }}
                      />
                    </div>
                    <p className="text-sm font-600 text-foreground">{product.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground hidden sm:table-cell">{product.category}</td>
                <td className="px-6 py-4 text-sm font-600 text-foreground font-mono-price">{product.price.toLocaleString()}</td>
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
                    <button 
                      onClick={() => openEditModal(product)}
                      className="p-1.5 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-all"
                    >
                      <Icon name="PencilIcon" size={14} />
                    </button>
                    <button 
                      onClick={() => deleteProduct(product.id)}
                      className="p-1.5 text-muted-foreground hover:text-danger hover:bg-muted rounded-lg transition-all"
                    >
                      <Icon name="TrashIcon" size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
              <h2 className="text-xl font-700 text-foreground">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-lg transition">
                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-600 mb-3">Product Image *</label>
                
                {imagePreview && (
                  <div className="mb-4">
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-border" />
                  </div>
                )}

                <div className="space-y-3">
                  {/* Upload from phone/computer */}
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="w-full px-4 py-3 border-2 border-dashed border-border rounded-lg hover:border-primary transition text-sm font-600 flex items-center justify-center gap-2"
                    >
                      <Icon name="CloudArrowUpIcon" size={18} />
                      {uploading ? 'Uploading...' : '📱 Upload from Phone/Computer'}
                    </button>
                  </div>

                  {/* Take photo with camera (mobile) */}
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="w-full px-4 py-3 bg-muted rounded-lg hover:bg-muted/70 transition text-sm font-600 flex items-center justify-center gap-2"
                  >
                    <Icon name="CameraIcon" size={18} />
                    📸 Take Photo with Camera
                  </button>

                  {/* Paste URL */}
                  <input
                    type="url"
                    placeholder="Or paste image URL from web (e.g., Unsplash, Imgur)"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-transparent text-sm"
                    onChange={(e) => handleImageUrl(e.target.value)}
                  />

                  {/* Random placeholder */}
                  <button
                    type="button"
                    onClick={useRandomImage}
                    className="w-full px-4 py-2 bg-muted rounded-lg hover:bg-muted/70 transition text-sm font-600"
                  >
                    🎲 Use Random Placeholder Image
                  </button>
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-600 mb-2">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-transparent"
                  placeholder="e.g., Samsung Galaxy S25 Ultra"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-600 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-600 mb-2">Price (XAF) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-transparent"
                    placeholder="e.g., 285000"
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-600 mb-2">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-transparent"
                    placeholder="e.g., 10"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-600 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-transparent"
                  >
                    <option value="active">Active (Visible in store)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Alt Text */}
              <div>
                <label className="block text-sm font-600 mb-2">Image Alt Text (for accessibility)</label>
                <input
                  type="text"
                  value={formData.alt}
                  onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-transparent"
                  placeholder="Describe the product image"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={saveProduct}
                  className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-lg font-600 hover:opacity-90"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-border rounded-lg font-600 hover:bg-muted"
                >
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