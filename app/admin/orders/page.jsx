
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export default async function AdminOrdersPage() {
  await connectDB();

  // Fetch orders with populated user info
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="text-gray-700 p-6">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {/* <th className="border px-4 py-2">Order ID</th> */}
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Items</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Created At</th>
            </tr>
          </thead>

          {/* FIX: Use <tbody> instead of <body> */}
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                {/* <td className="border px-4 py-2">{order._id}</td> */}
                <td className="border px-4 py-2">
                  {order.user
                    ? `${order.user.name} (${order.user.email})`
                    : "Unknown User"}
                </td>

                <td className="border px-4 py-2">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.name} x {item.qty} (${item.price})
                    </div>
                  ))}
                </td>

                <td className="border px-4 py-2">${order.total}</td>
                <td className="border px-4 py-2">{order.address}</td>
                <td className="border px-4 py-2">{order.phone}</td>
                <td className="border px-4 py-2">{order.status}</td>
                <td className="border px-4 py-2">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

