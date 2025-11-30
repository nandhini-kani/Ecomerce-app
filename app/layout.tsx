"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import CartProvider from "@/context/CartContext";
import WishlistProvider from "@/context/WishlistContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
