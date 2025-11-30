"use client";

import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Home, Phone, CreditCard, PackageCheck, Loader2 ,User} from "lucide-react";

export default function CheckoutPage() {
  const { cart, clear } = useContext(CartContext);
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    customerName:session?.user?.name || "",
    address: "",
    phone: "",
    paymentMethod: "COD",
  });
  const [loading, setLoading] = useState(false);

  if (!session) {
    return <h1 className="text-center mt-10 text-xl font-semibold">Please Login First</h1>;
  }

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
const placeOrder = async () => {
  try {
    setLoading(true);
    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.id,
        customerName: form.customerName,
        phone: form.phone,
        address: form.address,
        paymentMethod: form.paymentMethod,
        items: cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          image: item.image,
        })),
        total: cart.reduce((sum, item) => sum + item.qty * item.price, 0)
      })
    });

    const data = await res.json(); // now safe

    if (data.success) {
       localStorage.setItem("lastOrderId", data.order._id);
      clear();
      router.push("/orders/success"); // success page fetches last order
    } else {
      alert("Order failed: " + (data.error || "Unknown error"));
    }

  } catch (err) {
    console.error(err);
    alert("Something went wrong: " + err.message);
  }
};


  return (
    <div className="w-full min-h-screen text-gray-800 bg-white p-4 sm:p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <PackageCheck className="w-8 h-8 text-blue-500" /> Checkout
      </h1>

      <div className="grid grid-cols-1 px-12 gap-8 w-full">
        {/* LEFT FORM */}
        <div className="flex flex-col gap-6">
            <div>
            <label className="font-semibold flex items-center gap-2 mb-2 text-lg">
              <User className="w-6 h-6" /> Customer Name
            </label>
            <input
              type="text"
              className="w-full border p-4 rounded-xl bg-gray-50 text-lg"
              placeholder="Enter your full Customer Name"
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
            />
          </div>
          <div>
            <label className="font-semibold flex items-center gap-2 mb-2 text-lg">
              <Home className="w-6 h-6" /> Address
            </label>
            <input
              type="text"
              className="w-full border p-4 rounded-xl bg-gray-50 text-lg"
              placeholder="Enter your full address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2 text-lg">
              <Phone className="w-6 h-6" /> Phone Number
            </label>
            <input
              type="text"
              className="w-full border p-4 rounded-xl bg-gray-50 text-lg"
              placeholder="Enter your mobile number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2 text-lg">
              <CreditCard className="w-6 h-6" /> Payment Method
            </label>
            <select
              className="w-full border p-4 rounded-xl bg-gray-50 text-lg"
              value={form.paymentMethod}
              onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
            >
              <option value="COD">Cash On Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>
        </div>

        {/* RIGHT SUMMARY */}
        <div className="bg-gray-50 p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between border-b pb-2 text-lg">
                <span>{item.name}</span>
                <span>{item.qty} × ₹{item.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-2xl font-bold flex justify-between">
            <span>Total:</span>
            <span className="text-green-600">₹{total}</span>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading}
            className={`mt-6 w-full bg-green-600 text-white p-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading && <Loader2 className="animate-spin w-5 h-5" />}
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
