// models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: String,
      name: String,
      image: String,
      price: Number,
      qty: Number,
    },
  ],
  total: Number,
  customerName:String,
  address: String,
  phone: String,
  paymentMethod: String,
  status: { type: String, default: "placed" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
