'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFirebase } from "@/app/context/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import Navbar from "@/app/navbar.js/Navbar";
import LoadingSpinner from "@/app/loading/LoadingSpinner";

export default function EditProductPage() {
  const { db, user, updateMyProducts, handleDelete } = useFirebase();
  const router = useRouter();
  const { id } = useParams();

  const [product, setProduct] = useState({
    productName: "",
    price: "",
    description: "",
    imageUrl: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id || !user) return;

      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          if (data.addedBy !== user.uid) {
            alert("You are not authorized to edit this product.");
            router.push("/");
            return;
          }

          setProduct({
            productName: data.productName || "",
            price: data.price || "",
            description: data.description || "",
            imageUrl: data.imageUrl || "",
            category: data.category || "",
          });
        } else {
          alert("Product not found");
          router.push("/");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, user]);

  const handleChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    if (!id || !user) return;
  
    try {
      await updateMyProducts(db, id, product); // Use imported function
      alert("Product updated successfully!");
      router.push("/");
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };


  const deleteProduct = async (id) => {
    try {
        await handleDelete(id);
        alert("Product deleted successfully!");
        router.push("/");
    } catch (err) {
        console.error("Error deleting product:", err);
    }
  };
  

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Navbar />
      
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 text-black">
        <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Edit Product
          </h2>

          <form className="flex flex-col space-y-4" onSubmit={handleUpdate}>
            <div>
              <label htmlFor="imageUrl" className="block text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                id="imageUrl"
                value={product.imageUrl}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-xl bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="productName" className="block text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                id="productName"
                value={product.productName}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-xl bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-gray-700 mb-1">
                Product Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={product.price}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-xl bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={product.description}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-xl bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-gray-700 mb-1">Category</label>
              <select
                name="category"
                id="category"
                value={product.category}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-xl bg-gray-50 hover:cursor-pointer"
              >
                <option value="blank">Select a category</option>
                <option value="sounds">Sounds</option>
                <option value="electronics">Electronics</option>
                <option value="watches">Watches</option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
                <option value="jewelry">Jewelry</option>
                <option value="homeDecor">Home Decor</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition duration-200 hover:scale-105"
              disabled={!user}
            >
              Update Product
            </button>

            <button
              type="button"
              onClick={deleteProduct}
              className="w-full bg-red-600 text-white font-semibold py-2.5 rounded-xl hover:bg-red-700 transition duration-200 hover:scale-105"
            >
              Delete Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
