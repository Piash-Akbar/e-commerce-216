"use client";

import Link from "next/link";
import { useFirebase } from "../context/firebase";
import CartBtn from "../addToCartBtn/CartButton";

export default function Navbar() {
  const { user, logOut } = useFirebase();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">
        <Link href="/">MyStore</Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/" className="text-gray-600 hover:text-black">
          Home
        </Link>

        {user && user.role === "superadmin" && (
          <Link href="/superadmin" className="text-gray-600 hover:text-black">
            SuperAdmin
          </Link>
        )}

        {user && (user.role === "admin" || user.role === "superadmin") && (
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
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 hover:cursor-pointer"
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
    </nav>
  );
}
