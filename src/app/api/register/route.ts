import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    mongoose.connect(process.env.MONGODB_URI!);
    const createdUser = await User.create(body);
    return NextResponse.json(createdUser);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json({
        error: err.name,
        message: "Error: Password must be at least 8 characters.",
      })
    }
    else if (err.name === "MongoServerError" && err.code === 11000) {
      return NextResponse.json({
        error: err.name,
        message: "Error: Account with this email already exists.",
      })
    }
  }
}



