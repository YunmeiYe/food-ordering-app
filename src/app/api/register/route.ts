import { User } from "@/app/models/User";
import mongoose from "mongoose";

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(req: any) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URI!);
  if (process.env.NODE_ENV === "development") await sleep(1000);
  const createdUser = await User.create(body);
  return Response.json(createdUser);
}