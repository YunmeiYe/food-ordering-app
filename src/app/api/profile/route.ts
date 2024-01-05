import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI!);
  const data = await req.json();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  await User.updateOne({ email }, data)

  return NextResponse.json(true)
}

export async function GET() { 
  mongoose.connect(process.env.MONGODB_URI!);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json(false);
  }
  const profile = await User.findOne({email});
  return NextResponse.json(profile);
}
