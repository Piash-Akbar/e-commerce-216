'use client';

import { useFirebase } from "@/app/context/firebase";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/app/navbar.js/Navbar";
import CartBtn from "@/app/addToCartBtn/CartButton";
import { Car } from "lucide-react";
import AddCartBtn from "@/app/addToCartBtn/AddCartBtn";

export default function ProductDescriptionPage() {
  const { id } = useParams();
  const { handleGetProductById, db } = useFirebase();
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (!db) return;
    const fetchProduct = async () => {
      const product = await handleGetProductById(id);
      setProduct(product);
    };
    fetchProduct();
    console.log(product);
  }, [db, id]);


    return (
      <>
      <Navbar />
      
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Product Description</h1>
        {/* <img src={product.imageUrl} alt={product.productName} className="w-full max-w-sm mb-4" /> */}
        <h2 className="text-xl font-bold">{product.productName}</h2>
        <p className="text-lg text-gray-800">Tk.{product.price}</p>
        <p className="mt-2 text-gray-700">{product.description}</p>


        <AddCartBtn key={product.id} product={product} />
      </div>
      
      </>)
  } 

