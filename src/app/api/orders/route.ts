import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { Order } from "@/app/models/Order";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI!);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  let isAdmin = false;
  
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (_id) {
    return NextResponse.json(await Order.findById(_id));
  }

  if (userEmail) {
    const user = await User.findOne({ email: userEmail });
    isAdmin = user?.isAdmin;
  }

  if (isAdmin) {
    return NextResponse.json(await Order.find());
  } else {
    return NextResponse.json(await Order.find({ userEmail: userEmail }));
  }
}