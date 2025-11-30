"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { WishlistContext } from "@/context/WishlistContext";

export default function Header() {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  // Correct wishlist count from object
  const wishlistCount = Object.keys(wishlist).length;

  return (
    <header className="flex items-center justify-between p-3 bg-white rounded-xl shadow">
      
      {/* LOGO */}
      <Link href="/" className="text-xl font-bold text-blue-600">
        MyShop
      </Link>

      {/* ICONS */}
      <div className="flex items-center gap-6">

        {/* ❤️ Wishlist */}
        <Link href="/wishlist" className="relative">
          <Heart className="w-6 h-6 text-gray-700" />

          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* 🛒 Cart */}
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-7 h-7 text-gray-700" />
          
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>

        {/* 👤 User */}
        <Link href="/profile">
          <img
            src="https://i.pravatar.cc/100"
            className="w-10 h-10 rounded-full border"
          />
        </Link>
      </div>

    </header>
  );
}
