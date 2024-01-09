import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const data = await req.json();
    if (data._id) { // update other user
      const updatedUser = await User.findByIdAndUpdate({ _id: data._id }, data, { new: true });
      return NextResponse.json(updatedUser)
    } else { // update current user
      const session = await getServerSession(authOptions);
      const email = session?.user?.email;
      const updatedUser = await User.findOneAndUpdate({ email }, data, { new: true })
      return NextResponse.json(updatedUser)
    }
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function GET() { 
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json(false);
    }
    const profile = await User.findOne({email});
    return NextResponse.json(profile);
  } catch (err) {
    return NextResponse.json(err);
   }
}