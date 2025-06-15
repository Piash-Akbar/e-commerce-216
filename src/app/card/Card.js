'use client';

import Link from "next/link";
import { useCart } from "../context/cartContext";
import CartBtn from "../addToCartBtn/CartButton";
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
  const { productName, price, description, imageUrl, id, addedBy } = product;

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
      <div className="rounded overflow-hidden shadow-lg bg-white text-black h-full flex flex-col">
        <img className="w-full h-48 object-cover" src={imageUrl} alt={productName} />
        <div className="px-3 py-2 flex-1">
          <div className="font-bold text-xl mb-2">{productName}</div>
          <TruncatedDescription description={description} productId={id} />
          <p className="text-sm text-gray-500 mt-1">Seller: {addedBy}</p>
          <p className="text-lg font-semibold mt-2">${price}</p>
        </div>
        <div className="px-3 py-2">
          <AddCartBtn product={product} />
        </div>
      </div>
    </div>
  );
}
