"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useFirebase } from "../context/firebase";
import CartBtn from "../addToCartBtn/CartButton";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { user, logOut } = useFirebase();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const defaultAvatar = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md p-4 z-50 relative">
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

        {/* Desktop Menu */}
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

          <CartBtn />

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <img
                src={user.photoURL || defaultAvatar}
                alt="User"
                width={40}
                height={40}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full object-cover border border-gray-300 cursor-pointer"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border text-black rounded shadow-md z-50">
                  <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link href="/myOrders" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    My Orders
                  </Link>
                  <button
                    onClick={logOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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

          <CartBtn />

          {user ? (
            <div className="flex flex-col items-left space-x-2 mt-2">
              {/* <Image
                src={user.photoURL || ""}
                alt="User"
                width={40}
                height={40}
                className=" w-10 h-10 rounded-full object-cover border border-gray-300"
              /> */}
              <button
                onClick={logOut}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-25"
              >
                Logout
              </button>
            </div>
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
