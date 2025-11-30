import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();

  return NextResponse.json({
    totalOrders,
    totalProducts,
  });
}
