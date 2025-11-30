import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    image: { type: String },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Prevent model overwrite in Next.js (important)
export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
