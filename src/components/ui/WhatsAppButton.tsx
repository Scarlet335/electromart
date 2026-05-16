'use client';

interface WhatsAppButtonProps {
  productName: string;
  productPrice: number;
  phoneNumber?: string;
  buttonText?: string;
  className?: string;
}

export default function WhatsAppButton({ 
  productName, 
  productPrice, 
  phoneNumber = "237671834918", // Replace with YOUR Cameroon number
  buttonText = "Buy on WhatsApp",
  className = ""
}: WhatsAppButtonProps) {
  
  const handleClick = () => {
    const message = `Hello, I would like to order ${productName} for ${productPrice.toLocaleString()} FCFA. Is it available?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-green-600 hover:bg-green-700 text-white py-2 text-xs font-600 rounded-lg transition-all flex items-center justify-center gap-1.5 ${className}`}
    >
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.569-.347z"/>
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.891.547 3.656 1.496 5.156L2 22l4.844-1.496A9.958 9.958 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.469 0-2.859-.406-4.062-1.125l-.281-.156-2.875.875.875-2.875-.156-.281A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
      </svg>
      {buttonText}
    </button>
  );
}