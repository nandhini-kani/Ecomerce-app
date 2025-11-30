"use client";

export default function CartItem({ item, onQtyChange, onRemove }) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={item.image}
        className="w-20 h-20 rounded-lg object-cover"
      />

      <div className="flex-1">
        <p className="font-semibold">{item.name}</p>
        <p>₹{item.price}</p>

        <input
          type="number"
          min="1"
          value={item.qty}
          onChange={(e) => onQtyChange(Number(e.target.value))}
          className="border p-1 w-16 mt-2"
        />
      </div>

      <button
        onClick={onRemove}
        className="text-red-600 font-bold"
      >
        X
      </button>
    </div>
  );
}




// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import Order from "@/models/Order";
// import connectDB from "@/lib/mongodb";

// export default async function OrdersPage() {
//   await connectDB();
//   const session = await getServerSession(authOptions);

//   // If not logged in
//   if (!session) {
//     return (
//       <div className="min-h-screen flex items-center justify-center px-4">
//         <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
//           <h2 className="text-xl font-semibold text-gray-700">
//             Please login to see your orders.
//           </h2>
//         </div>
//       </div>
//     );
//   }

//   // Get all orders for the user
//   const orders = await Order.find({ user: session.user.id })
//     .populate("items.product")
//     .lean();

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Orders</h1>

//         {/* EMPTY STATE */}
//         {orders.length === 0 && (
//           <div className="flex justify-center items-center min-h-[60vh] px-4 animate-fadeIn">
//             <div className="bg-white p-10 rounded-2xl shadow-xl border text-center max-w-md w-full">
//               <img
//                 src="/empty-orders.png"
//                 alt="No Orders"
//                 className="w-48 h-48 mx-auto mb-6 opacity-95"
//               />

//               <h2 className="text-2xl font-bold text-gray-800">
//                 You have no orders yet
//               </h2>

//               <p className="text-gray-500 mt-2 mb-6">
//                 When you order something, it will appear here.
//               </p>

//               <a
//                 href="/products"
//                 className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition-all duration-200"
//               >
//                 Shop Now
//               </a>
//             </div>
//           </div>
//         )}

//         {/* ORDERS LIST */}
//         <div className="space-y-6 mt-4">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-white rounded-xl shadow-lg border p-6"
//             >
//               {/* Order Header */}
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   Order #{order._id}
//                 </h2>

//                 <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
//                   {order.status}
//                 </span>
//               </div>

//               <p className="text-gray-700">
//                 <b>Total Amount:</b> ₹{order.total}
//               </p>

//               <p className="text-gray-700 mb-4">
//                 <b>Total Items:</b> {order.items.length}
//               </p>

//               <hr className="my-4" />

//               {/* Product List */}
//               <h3 className="font-semibold text-gray-800 mb-3">Products</h3>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {order.items.map((item) => (
//                   <div
//                     key={item._id}
//                     className="flex gap-4 p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
//                   >
//                     <img
//                       src={item.product?.image || "/noimg.png"}
//                       alt="Product"
//                       className="w-20 h-20 rounded-lg object-cover border"
//                     />

//                     <div className="flex-1">
//                       <p className="font-semibold text-gray-800">
//                         {item.product?.name}
//                       </p>

//                       <p className="text-sm text-gray-600">Qty: {item.qty}</p>

//                       <p className="font-medium text-gray-700">
//                         Price: ₹{item.price}
//                       </p>

//                       <p className="text-green-600 font-bold">
//                         Subtotal: ₹{item.price * item.qty}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
