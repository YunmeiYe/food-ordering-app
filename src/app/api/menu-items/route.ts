import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const data = await req.json();
    const menuItem = await MenuItem.create(data);
    return NextResponse.json(menuItem);
  } catch (err: any) {
    return NextResponse.json(err);
  }
}

export async function PUT(req: NextRequest) {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const {_id, ...data} = await req.json();
    const updatedMenuItem = await MenuItem.findByIdAndUpdate({ _id }, data, { new: true });
    return NextResponse.json(updatedMenuItem);
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
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    const deleteResult = await MenuItem.deleteOne({ _id });
    return NextResponse.json(deleteResult);
  } catch (err) {
    return NextResponse.json(err);
  }
}