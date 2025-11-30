"use client";

import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p._id === product._id);
      if (exists) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) =>
    setCart((prev) => prev.filter((p) => p._id !== id));

  const updateQty = (id, qty) =>
    setCart((prev) =>
      prev.map((p) => (p._id === id ? { ...p, qty } : p))
    );

  const clear = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeItem, updateQty, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}
