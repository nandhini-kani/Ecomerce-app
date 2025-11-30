import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const body = await req.json();

    // Create Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create order
    const order = await razorpay.orders.create({
      amount: body.amount * 100, // amount in paise
      currency: "INR",
      receipt: "order_receipt_1",
    });

    return Response.json(
      { success: true, order },
      { status: 200 }
    );
  } catch (error) {
    console.error("Razorpay Error:", error);

    return Response.json(
      { success: false, message: "Razorpay order error" },
      { status: 500 }
    );
  }
}
