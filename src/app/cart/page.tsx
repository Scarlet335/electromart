'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Icon name="ShoppingCartIcon" size={64} className="mx-auto text-muted-foreground/30 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to your cart</p>
          <Link href="/products" className="bg-primary text-white px-6 py-3 rounded-lg inline-block hover:opacity-90 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const total = getCartTotal();

  const orderMessage = () => {
    let message = "Hello, I would like to order:\n\n";
    cart.forEach(item => {
      message += `• ${item.name} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()} FCFA\n`;
    });
    message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Total: ${total.toLocaleString()} FCFA\n`;
    message += `\nPlease confirm availability and delivery to:`;
    message += `\nName: ___________`;
    message += `\nPhone: ___________`;
    message += `\nAddress: ___________`;
    return encodeURIComponent(message);
  };

  // Replace with your WhatsApp number
  const whatsappNumber = "2376XXXXXXXX";

  return (
    <div className="pt-32 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <Link href="/products" className="text-primary hover:underline flex items-center gap-2">
            <Icon name="ArrowLeftIcon" size={16} />
            Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border rounded-lg bg-card">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100';
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-primary font-bold mt-1">{item.price.toLocaleString()} FCFA</p>
                  {item.storage && <p className="text-xs text-muted-foreground">Storage: {item.storage}</p>}
                  {item.color && <p className="text-xs text-muted-foreground">Color: {item.color}</p>}
                  <div className="flex items-center gap-3 mt-2">
                    <select
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="border border-border rounded-lg px-2 py-1 text-sm bg-background"
                    >
                      {[1, 2, 3, 4, 5].map(q => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
                    >
                      <Icon name="TrashIcon" size={14} />
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">{(item.price * item.quantity).toLocaleString()} FCFA</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-24 bg-card">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{(item.price * item.quantity).toLocaleString()} FCFA</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{total.toLocaleString()} FCFA</span>
                </div>
              </div>
              
              <div className="space-y-3 mt-6">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${orderMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.569-.347z"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.891.547 3.656 1.496 5.156L2 22l4.844-1.496A9.958 9.958 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.469 0-2.859-.406-4.062-1.125l-.281-.156-2.875.875.875-2.875-.156-.281A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                  </svg>
                  Order via WhatsApp
                </a>
                
                <button
                  onClick={clearCart}
                  className="w-full border border-red-600 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
                >
                  Clear Cart
                </button>
              </div>

              <div className="mt-4 pt-4 border-t text-xs text-muted-foreground text-center">
                <p>✓ Fast delivery in Douala (24h) and other cities (48-72h)</p>
                <p className="mt-1">✓ Cash on delivery available</p>
                <p className="mt-1">✓ Official warranty included</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}