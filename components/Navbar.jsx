"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { CartContext } from "@/context/CartContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold">
          MyStore
        </Link>

        {/* MENUS */}
        <div className="flex items-center gap-6">
          <Link href="/products">Products</Link>

          {/* CART */}
          <Link href="/cart" className="relative">
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          {/* USER */}
          {user ? (
            <button onClick={logout} className="flex items-center gap-1">
              <User /> Logout
            </button>
          ) : (
            <Link href="/auth/login" className="flex items-center gap-1">
              <User /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
