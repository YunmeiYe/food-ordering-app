import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET() {
  mongoose.connect(process.env.MONGODB_URI!);
  if (await isAdmin()) {
    const users = await User.find();
    return NextResponse.json(users);
  }
  return NextResponse.json([]);
}
