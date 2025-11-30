"use client";

import { useContext,useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WishlistContext } from "@/context/WishlistContext";
import { CartContext } from "@/context/CartContext";
import {
  FaHeart,
  FaRegHeart,
  FaRupeeSign,
  FaBox,
  FaStar,
} from "react-icons/fa";

export default function ProductCard({ name, price, description, image, _id }) {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  const liked = wishlist[_id];
const [added,setAdded]=useState(false);
  // Add to Cart + Redirect
  const handleAddToCart = () => {
    addToCart({
      _id,
      name,
      price,
      image,
      description,
      qty: 1,
    });
     setAdded(true);
   
  };

   const goToCart =()=>{
      router.push("/cart");  

   }

  return (
    <div className="bg-white border rounded-2xl p-3 shadow-sm hover:shadow-lg transition flex flex-col">

      {/* IMAGE + LIKE BUTTON */}
      <div className="relative">
        <img
          src={image || "/products/placeholder.png"}
          alt={name}
          className="h-[250px] w-full object-cover rounded-xl"
        />

        {/* ❤️ Like Button */}
        <button
          onClick={() =>
            toggleWishlist({ _id, name, price, image, description })
          }
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow hover:scale-110 transition"
        >
          {liked ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-600" />
          )}
        </button>
      </div>

      {/* NAME */}
      <h3 className="font-semibold text-sm mt-3 line-clamp-2 text-gray-700">
        {name}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
        {description ? description.slice(0, 60) : "No description available."}
      </p>

      {/* PRICE */}
      <div className="flex items-center text-gray-900 font-bold mt-2">
        <FaRupeeSign className="mr-1" /> {price}
      </div>

      {/* EXTRA DETAILS */}
      <div className="flex justify-between text-gray-600 text-xs mt-3">
        <span className="flex items-center gap-1">
          <FaStar className="text-yellow-400" /> 4.3
        </span>
        <span className="flex items-center gap-1">
          <FaBox className="text-blue-500" /> Fast Delivery
        </span>
      </div>

      {/* ADD TO CART BUTTON */}
      {!added?(
      <button
        onClick={handleAddToCart}
        className="mt-3 broder-blue-500 border hover:border-blue-500 text-gray-600  w-full py-2 rounded-lg text-sm font-semibold  transition"
      >
        Add to Cart 
      </button>
      ):(
        <button
        onClick={goToCart}
        className="mt-3 broder-blue-500 border hover:border-blue-500 text-gray-600  w-full py-2 rounded-lg text-sm font-semibold  transition"
      >
        Go to Cart 
      </button>
      )}
    </div>
  );
}
