import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI!);
  const data = await req.json();
  var session = await getServerSession(authOptions);
  const email = session?.user?.email;

  const update = {
    name: '',
    image: ''
  };

  if ('name' in data) {
    update.name = data.name
  }

  if ('image' in data) {
    update.image = data.image
  }

  if (Object.keys(update).length > 0) {
    await User.updateOne({ email }, update)
  }

  return NextResponse.json(true)
}
