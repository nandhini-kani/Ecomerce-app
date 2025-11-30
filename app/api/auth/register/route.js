import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { hash } from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    await connectDB();
    const exists = await User.findOne({ email });

    if (exists) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await hash(password, 10);
    await User.create({ name, email, password: hashed });

    return NextResponse.json({ msg: "Registered successfully" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
