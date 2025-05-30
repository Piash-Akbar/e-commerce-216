'use client';

import { useCart } from '../context/cartContext';

export default function AddCartBtn({ product }) {
  const { addToCart } = useCart();

  const handleClick = () => {
    if (!product) return;
    addToCart(product);
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 hover:cursor-pointer transition"
    >
      Add to Cart
    </button>
  );
}
