"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTag, FaImage, FaRupeeSign, FaLayerGroup, FaBox } from "react-icons/fa";

export default function CreateProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    router.push("/admin/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full  bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-xl border  border-white/30">

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Create New Product
        </h1>
        <div className="h-1   rounded-full mb-6"></div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">

          {/* NAME */}
          <div className="relative">
            <FaTag className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="w-full pl-10 p-3  text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300  rounded-xl outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3  text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300 rounded-xl outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition h-28"
          />

          {/* PRICE */}
          <div className="relative">
            <FaRupeeSign className="absolute left-3 top-3  text-gray-700 placeholder:text-gray-400 text-gray-500" />
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="w-full pl-10 p-3 bg-white border border-gray-300 text-gray-700 placeholder:text-gray-400 rounded-xl outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* IMAGE */}
          <div className="relative">
            <FaImage className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full pl-10 p-3 bg-white border border-gray-300 text-gray-700 placeholder:text-gray-400 rounded-xl outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* CATEGORY */}
          <div className="relative">
            <FaLayerGroup className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full pl-10 p-3 bg-white border border-gray-300 text-gray-700 placeholder:text-gray-400 rounded-xl outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* STOCK */}
          <div className="relative">
            <FaBox className="absolute left-3 top-3 text-gray-500" />
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="w-full pl-10 p-3 bg-white border border-gray-300 text-gray-700 placeholder:text-gray-400 rounded-xl outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
