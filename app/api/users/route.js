import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  await connectDB();
  const users = await User.find();
  return Response.json(users);
}
