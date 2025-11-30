"use client";

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import ProductList from "@/components/ProductList";
import Categories from "@/components/Categories";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseURL}/api/products`, { cache: "no-store" });
        if (!res.ok) return setProducts([]);
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [baseURL]);

  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
   <div className="w-full min-h-screen bg-gray-100">
  <Header />

  <div className="w-full space-y-6 p-4">
    <div className="bg-white p-2 rounded-xl shadow w-full">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" />
        <input
          className="w-full p-3 pl-10 placeholder:text-gray-500 rounded-xl outline-none text-gray-800"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>

    <Banner />
    <Categories />

    <div className="bg-white rounded-xl p-4 shadow w-full">
      <h4 className="font-semibold mb-2 text-gray-700">Special Offers</h4>
      <p className="text-sm text-gray-600">
        Coupons & deals available for selected products.
      </p>
    </div>

    {/* Products at the bottom */}
    <section className="w-full mt-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-700">Products</h2>
        <span className="text-gray-600">{filtered.length} products found</span>
      </div>

      {filtered.length ? (
        <ProductList products={filtered} />
      ) : (
        <p className="text-gray-600">No products found.</p>
      )}
    </section>
  </div>
</div>

  );
}
