"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProduct() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });

  // Fetch product by ID
  const fetchProduct = async () => {
    const res = await fetch(`/api/products?id=${id}`);
    const data = await res.json();

    if (res.ok) {
      setForm({
        name: data.name || "",
        description: data.description || "",
        price: data.price || "",
        image: data.image || "",
        category: data.category || "",
        stock: data.stock || "",
      });
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id, ...form }),
    });

    if (res.ok) router.push("/admin/products");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Product Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full text-gray-700 border-gray-300 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full text-gray-700 border-gray-300 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
            />
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full text-gray-700 border-gray-300 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full text-gray-700 border-gray-300 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter stock count"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full text-gray-700 border-gray-300 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product category"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full text-gray-700 border-gray-300 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste image URL"
            />
          </div>

          {/* Preview Image */}
          {form.image && (
            <div className="w-full text-gray-700 border-gray-300 flex justify-center">
              <img
                src={form.image}
                alt="Preview"
                className="w-64 h-64 object-cover rounded-xl shadow-md mt-4"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-3 rounded-lg shadow-lg"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
