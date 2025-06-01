'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import AddCartBtn from "../addToCartBtn/AddCartBtn";

function TruncatedDescription({ description = "", productId }) {
  const words = description.split(" ");
  const isLong = words.length > 10;
  const shortDesc = isLong ? words.slice(0, 10).join(" ") + "..." : description;

  return (
    <p className="text-gray-700 text-base">
      {shortDesc}{" "}
      {isLong && (
        <Link className="text-blue-600" href={`/product-description/${productId}`}>
          see more
        </Link>
      )}
    </p>
  );
}

export default function Card({ product }) {
  const { productName, price, description, imageUrl, id } = product;
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/admin/editProduct/${id}`);
  };

  const handleDeleteClick = () => {
    // TODO: Add your delete logic here (e.g., call Firebase delete)
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("Deleting product with ID:", id);
      // Example: await deleteProduct(id);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white text-black mb-4 w-1/3 h-full">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={productName} />
      <div className="px-3 py-2">
        <div className="font-bold text-xl mb-2">{productName}</div>
        <TruncatedDescription description={description} productId={id} />
        <p className="text-lg font-semibold mt-2">${price}</p>
      </div>
      <div className="flex justify-between px-3 py-2">
        <button
          onClick={handleEditClick}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={handleDeleteClick}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
