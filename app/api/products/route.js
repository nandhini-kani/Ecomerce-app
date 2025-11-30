import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// GET (All products or single product)
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  // If ID exists → return single product
  if (id) {
    const product = await Product.findById(id).lean();
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  }

  // Otherwise return all products
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(products, { status: 200 });
}

// CREATE a product
export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const product = await Product.create(body);
  return NextResponse.json(product, { status: 201 });
}

// UPDATE a product
export async function PUT(req) {
  await connectDB();

  const body = await req.json();
  const { _id, ...updateData } = body;

  const updated = await Product.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  return NextResponse.json(updated, { status: 200 });
}

// DELETE a product
export async function DELETE(req) {
  await connectDB();

  const body = await req.json();
  const { _id } = body;

  await Product.findByIdAndDelete(_id);

  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}
