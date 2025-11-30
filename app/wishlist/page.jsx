"use client";

import { useContext } from "react";
import { WishlistContext } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useContext(WishlistContext);

  const items = Object.values(wishlist); // full product objects

  return (
    <div className="p-6 bg-white h-full">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>

      {items.length === 0 && (
        <p className="text-gray-500 mt-4">No items in wishlist.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((product, index) => (
          <ProductCard
            key={product._id || index} // fallback to index if _id is missing
            _id={product._id}
            name={product.name}
            price={product.price}
            description={product.description}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}
