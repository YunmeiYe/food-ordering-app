import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { Order } from "@/app/models/Order";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI!);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (_id) {
    return NextResponse.json(await Order.findById(_id));
  }
  if (admin) {
    return NextResponse.json(await Order.find());
  } else {
    return NextResponse.json(await Order.find({ userEmail: userEmail }));
  }
}