import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received Body",body)
    const { userId, customerName, phone, address, paymentMethod, items, total } = body;

    // Validate incoming data
    if (!userId || !customerName || !items || !address || !phone || !total) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }), 
        { status: 400 }
      );
    }

    await connectDB();

    // SAVE ORDER
    const order = await Order.create({
      user: new mongoose.Types.ObjectId(userId),
      customerName,
      phone,
      address,
      paymentMethod,
      items,
      total,
    });

    return new Response( JSON.stringify({ success: true, order }),
      { status: 201 }
    );

  } catch (err) { console.error("Order Error:", err);return new Response(JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
