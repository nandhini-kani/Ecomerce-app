"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard"; // optional
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  // Fetch all products
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
  const res = await fetch("/api/products", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: id }),
  });

  if (res.ok) {
    fetchProducts(); // refresh UI
  }


  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin: Products</h1>

      <Link
        href="/admin/products/create"
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4 inline-block"
      >
        + Add New Product
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-xl shadow">
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded"
            />

            <h2 className="font-semibold mt-2 text-gray-600">{product.name}</h2>
            <p className="text-gray-600 text-sm">{product.price}₹</p>

            <div className="flex justify-between mt-3">
              <button
                onClick={() => deleteProduct(product._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

              <Link
               href={`/admin/products/edit/${product._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
