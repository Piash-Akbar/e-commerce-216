"use client";

import Link from "next/link";
import { useState } from "react";
import { useFirebase } from "../context/firebase";
import CartBtn from "../addToCartBtn/CartButton";
import { Menu, X } from "lucide-react"; // icon library like Lucide or Heroicons

export default function Navbar() {
  const { user, logOut } = useFirebase();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">
          <Link href="/">MyStore</Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/" className="text-gray-600 hover:text-black">
            Home
          </Link>

          {user?.role === "superadmin" && (
            <Link href="/superadmin" className="text-gray-600 hover:text-black">
              SuperAdmin
            </Link>
          )}

          {["admin", "superadmin"].includes(user?.role) && (
            <Link href="/admin" className="text-gray-600 hover:text-black">
              Admin
            </Link>
          )}

          {user ? (
            <>
              <span className="text-sm text-gray-500">
                {user.email} ({user.role})
              </span>
              <CartBtn />
              <button
                onClick={logOut}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 px-4">
          <Link href="/" className="block text-gray-600 hover:text-black">
            Home
          </Link>

          {user?.role === "superadmin" && (
            <Link href="/superadmin" className="block text-gray-600 hover:text-black">
              SuperAdmin
            </Link>
          )}

          {["admin", "superadmin"].includes(user?.role) && (
            <Link href="/admin" className="block text-gray-600 hover:text-black">
              Admin
            </Link>
          )}

          {user ? (
            <>
              <div className="text-sm text-gray-500">
                {user.email} ({user.role})
              </div>
              <CartBtn />
              <button
                onClick={logOut}
                className="bg-red-500 text-white px-4 py-2 w-full rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
