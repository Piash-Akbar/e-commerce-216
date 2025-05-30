"use client";

import { useState } from "react";
import Navbar from "../navbar.js/Navbar";
import { useFirebase } from "../context/firebase";

export default function AdminPage() {
  const { user, handleCreateNewListing } = useFirebase();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const productData = {
      productName: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description"),

      // imageUrl: formData.get("image"), // Optional: Implement file upload if needed
    };

    await handleCreateNewListing(productData);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 text-black">
        <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Add New Product
          </h2>

          <form className="flex flex-col space-y-4" onSubmit={handleCreateProduct}>
            <div>
              <label htmlFor="image" className="block text-gray-700 mb-1">
                Product Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="w-full p-2.5 border rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="e.g., Red T-Shirt"
                className="w-full p-2.5 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                placeholder="e.g., 29.99"
                className="w-full p-2.5 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                placeholder="Short description"
                className="w-full p-2.5 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition duration-200 hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
