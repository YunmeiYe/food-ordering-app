import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET() { 
  mongoose.connect(process.env.MONGODB_URI!);
  const users = await User.find();
  return NextResponse.json(users);
}
