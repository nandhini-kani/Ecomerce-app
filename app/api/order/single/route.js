import { NextResponse} from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req){
try{
  await connectDB();

  const {searchParams} = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if(!orderId){
    return NextResponse.json({error:"orderId is required"},{status:400})
  }

  const order = await Order.findById(orderId);

  if(!order){
    return NextResponse.json({error:"Order not found"},{status:404})
  }

  return NextResponse.json({success:true, order});

}
catch(err){
  return NextResponse.json({error:err.message},{status:500})
}

}