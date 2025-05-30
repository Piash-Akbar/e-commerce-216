'use client';

import Link from 'next/link';
import { useCart } from '../context/cartContext';
import { ShoppingCart } from 'lucide-react'; // optional icon (install lucide-react if not yet)

export default function CartBtn() {
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      <ShoppingCart className="mr-2" size={18} />
      Cart

      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {totalQuantity}
          
        </span>
      )}
    </Link>
  );
}
