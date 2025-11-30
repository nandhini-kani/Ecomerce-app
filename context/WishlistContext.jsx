"use client";

import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState({});

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Toggle product in wishlist
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const updated = { ...prev };
      if (updated[product._id]) {
        delete updated[product._id]; // remove from wishlist
      } else {
        updated[product._id] = product; // add full product object
      }
      return updated;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

