import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    if (await isAdmin()) {
      const data = await req.json();
      const menuItem = await MenuItem.create(data);
      return NextResponse.json(menuItem);
    }
    return NextResponse.json({});
  } catch (err: any) {
    return NextResponse.json(err);
  }
}

export async function PUT(req: NextRequest) {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    if (await isAdmin()) {
      const { _id, ...data } = await req.json();
      const updatedMenuItem = await MenuItem.findByIdAndUpdate({ _id }, data, { new: true });
      return NextResponse.json(updatedMenuItem);
    }
    return NextResponse.json({});
  } catch (err: any) {
    return NextResponse.json(err);
  }
}

export async function GET() {
  mongoose.connect(process.env.MONGODB_URI!);
  const menuItems = await MenuItem.find();
  return NextResponse.json(menuItems);
}

export async function DELETE(req: NextRequest) {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    if (await isAdmin()) {
      const url = new URL(req.url);
      const _id = url.searchParams.get('_id');
      const deleteResult = await MenuItem.deleteOne({ _id });
      return NextResponse.json(deleteResult);
    }
    return NextResponse.json(true);
  } catch (err) {
    return NextResponse.json(err);
  }
}