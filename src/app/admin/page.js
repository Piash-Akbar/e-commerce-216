"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../navbar.js/Navbar";
import { useFirebase } from "../context/firebase";
import Link from "next/link";

export default function AdminPage() {
  const { user } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role === "customer") {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div >
      <Navbar />
      <h1 className={"text-2xl font-bold mb-4 text-center m-10"}>Admin Dashboard🛒<br/></h1>
      <div className="flex justify-center font-bold items-center min-h-screen bg-gray-100 px-4 text-black space-x-4 ">
        <Link href="/admin/addProduct" className="relative inline-flex items-center px-4 py-2 bg-black text-white rounded hover:bg-green-500 transition">Add Product</Link>
        <Link href="/admin/viewOrders" className="relative inline-flex items-center px-4 py-2 bg-black text-white rounded hover:bg-yellow-500 transition">Orders</Link>
        <Link href="/admin/editProduct" className="relative inline-flex items-center px-4 py-2 bg-black text-white rounded hover:bg-red-500 transition">Edit Product</Link>
      </div>
      
    </div>
  );
}