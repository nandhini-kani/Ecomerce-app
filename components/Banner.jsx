// components/Banner.jsx
"use client";
import { useState, useEffect } from "react";

const banners = [
  { id: 1, title: "Big Sale - Up to 50% off", bg: "bg-gradient-to-r from-pink-400 to-pink-600" },
  { id: 2, title: "New Arrivals - Check Now", bg: "bg-gradient-to-r from-indigo-400 to-blue-600" },
  { id: 3, title: "Free Shipping on Orders ₹499+", bg: "bg-gradient-to-r from-green-400 to-teal-600" },
];

export default function Banner() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((s) => (s + 1) % banners.length), 4000);
    return () => clearInterval(t);
  }, []);
  const b = banners[idx];

  return (
    <div className={`rounded-xl text-white p-6 ${b.bg} shadow-lg`}>
      <h2 className="text-2xl font-bold">{b.title}</h2>
      <p className="mt-1 opacity-90">Limited time offers — grab before it's gone!</p>
    </div>
  );
}

