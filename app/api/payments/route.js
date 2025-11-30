import Razorpay from "razorpay";

export async function POST(req) {
  const body = await req.json();

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const order = await razorpay.orders.create({
    amount: body.amount * 100,
    currency: "INR",
    receipt: "order_receipt_1",
  });

  return Response.json(order);
}
