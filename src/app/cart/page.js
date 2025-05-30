'use client';

import { useCart } from '../context/cartContext';
import Image from 'next/image';
import Navbar from '../navbar.js/Navbar';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
        <>
        <Navbar />
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Your cart is empty 🛒
      </div>
        </>
    );
  }

  return (

    <>
    <Navbar />
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Shopping Cart</h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            <div className="flex items-center gap-4">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold text-black">{item.productName}</h3>
                <p className="text-gray-600">${item.price} × {item.quantity}</p>
                {console.log(item)}
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-sm text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between items-center border-t pt-6">
        <p className="text-xl font-semibold">
          Total: <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
        </p>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Clear Cart
          </button>
          <button
            onClick={() => alert('Proceed to checkout')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
    </>


  );
}
