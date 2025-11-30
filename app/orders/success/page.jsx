
"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Truck, Package, CreditCard, User, Home, Phone } from "lucide-react";

export default function OrderSuccessPage() {
const [order, setOrder] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
const orderId = localStorage.getItem("lastOrderId");


if (!orderId) {
  setLoading(false);
  return;
}

fetch(`/api/order/single?orderId=${orderId}`)
  .then((res) => res.json())
  .then((data) => {
    setOrder(data.order);
    setLoading(false);
  });


}, []);

if (loading) return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;

if (!order) return <div className="text-center mt-10 text-xl font-semibold">No order found</div>;

return ( <div className="max-w-full h-[680px] p-6 bg-gray-50 rounded-2xl shadow-lg mt-10"> <h1 className="text-3xl font-bold text-green-600 flex items-center gap-3"> <CheckCircle className="w-10 h-10" /> Order Successful 🎉 </h1>


  {/* Customer Details */}
  <div className="mt-6 grid text-gray-700  gap-6">
    <div className="space-y-3">
      <p className="text-lg"><User className="inline w-5 h-5 mr-2 text-blue-500" /> <b>Name:</b> {order.customerName}</p>
      <p className="text-lg"><Home className="inline w-5 h-5 mr-2 text-blue-500" /> <b>Address:</b> {order.address}</p>
      <p className="text-lg"><Phone className="inline w-5 h-5 mr-2 text-blue-500" /> <b>Phone:</b> {order.phone}</p>
      <p className="text-lg"><CreditCard className="inline w-5 h-5 mr-2 text-blue-500" /> <b>Total:</b> ₹{order.total}</p>
    </div>

    {/* Order Items */}
    <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
      <h2 className="text-2xl font-semibold mb-4">Items</h2>
      <ul className="space-y-2">
        {order.items.map((item, i) => (
          <li key={i} className="flex justify-between border-b pb-1">
            <span>{item.name} × {item.qty}</span>
            <span>₹{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>

  {/* Order Status Tracker */}
  <div className="mt-10 text-gray-800">
    <h2 className="text-2xl font-bold mb-4">Order Status</h2>
    <div className="flex items-center justify-between text-gray-600">
      <div className="flex flex-col items-center">
        <CheckCircle className={`w-8 text-gray-700 h-8 mb-2 ${order.status === "Processing" || order.status === "Shipped" || order.status === "Backing" || order.status === "Delivered" ? "text-green-500" : "text-gray-300"}`} />
        <span>Processing</span>
      </div>
      <div className="flex-1 h-1 bg-gray-300 mx-2 relative">
        <div className={`absolute top-0 left-0 h-1 bg-green-500`} style={{ width: `${["Processing","Shipped","Backing","Delivered"].indexOf(order.status)/3*100}%` }}></div>
      </div>
      <div className="flex flex-col items-center">
        <Truck className={`w-8 h-8 mb-2 text-gray-700 ${order.status === "Shipped" || order.status === "Backing" || order.status === "Delivered" ? "text-green-500" : "text-gray-300"}`} />
        <span>Shipped</span>
      </div>
      <div className="flex-1 h-1 bg-gray-300 mx-2 relative">
        <div className={`absolute top-0 left-0 h-1 bg-green-500`} style={{ width: `${["Backing","Delivered"].includes(order.status)?50:0}%` }}></div>
      </div>
      <div className="flex flex-col items-center">
        <Package className={`w-8 h-8 mb-2 text-gray-700 ${order.status === "Backing" || order.status === "Delivered" ? "text-green-500" : "text-gray-300"}`} />
        <span>Backing</span>
      </div>
      <div className="flex-1 h-1 bg-gray-300 mx-2 relative">
        <div className={`absolute top-0 left-0 h-1 bg-green-500`} style={{ width: `${order.status === "Delivered"?100:0}%` }}></div>
      </div>
      <div className="flex flex-col items-center">
        <CheckCircle className={`w-8 h-8 mb-2  text-gray-700 ${order.status === "Delivered" ? "text-green-500" : "text-gray-300"}`} />
        <span>Delivered</span>
      </div>
    </div>
  </div>
</div>


);
}
