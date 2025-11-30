"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { cart, updateQty, removeItem } = useContext(CartContext);
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleCheckout = () => {
    router.push("/checkout");
  };

  // EMPTY CART
  if (cart.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-40 bg-white px-4 text-center">
        <ShoppingCart size={80} className="text-gray-400" />
        <h1 className="mt-6 text-3xl font-semibold text-gray-700">
          Your Cart is Empty
        </h1>
        <p className="text-gray-500 mt-2">
          Add some products to continue shopping.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800">
          Shopping Cart
        </h1>

        {/* RESPONSIVE GRID */}
        <div className="grid grid-cols-1 text-gray-700 gap-8">

          {/* LEFT SIDE — ITEMS */}
          <div className="lg:col-span-2 space-y-5">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row bg-white p-5 rounded-xl shadow-sm border border-gray-200 w-full gap-5"
              >
                {/* IMAGE */}
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-full sm:w-32 h-40 sm:h-32 object-cover rounded-lg border"
                />

                {/* DETAILS */}
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 mt-1 text-lg">₹{item.price}</p>
                  </div>

                  {/* QTY + DELETE */}
                  <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
                    {/* Qty Buttons */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQty(item._id, item.qty - 1)}
                        disabled={item.qty <= 1}
                        className="p-2 bg-gray-100 rounded-full disabled:opacity-40"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="text-lg font-semibold">{item.qty}</span>

                      <button
                        onClick={() => updateQty(item._id, item.qty + 1)}
                        className="p-2 bg-gray-100 rounded-full"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 hover:text-red-600 p-2"
                    >
                      <Trash2 size={26} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/*  TOTAL */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between text-lg font-medium text-gray-700 mb-2">
              <p>Items</p>
              <p>{cart.length}</p>
            </div>

            <div className="flex justify-between text-lg font-medium text-gray-700 mb-6">
              <p>Total Amount</p>
              <p className="font-bold text-gray-900">₹{total}</p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-900"
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
