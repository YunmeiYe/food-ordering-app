import { Category } from "@/app/models/Category";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    if (await isAdmin()) {
      const body = await req.json();
      const createdCategory = await Category.create(body);
      return NextResponse.json(createdCategory);
    }
    return NextResponse.json({});
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json({
        error: err.name,
        message: "Error: Category name is required.",
      })
    }
    else if (err.name === "MongoServerError" && err.code === 11000) {
      return NextResponse.json({
        error: err.name,
        message: "Error: Category name already exists.",
      })
    }
  }
}

export async function PUT(req: NextRequest) {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    if (await isAdmin()) {
      const { _id, name, image } = await req.json();
      const updatedCategory = await Category.findByIdAndUpdate({ _id }, { name, image }, { new: true });
      return NextResponse.json(updatedCategory);
    }
    return NextResponse.json({});
  } catch (err: any) {
    if (err.name === "MongoServerError" && err.code === 11000) {
      return NextResponse.json({
        error: err.name,
        message: "Error: Category name already exists.",
      })
    }
    return NextResponse.json({
      error: err.name,
      message: err.message
    })
  }
}

export async function GET() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const categories = await Category.find();
    return NextResponse.json(categories);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    if (await isAdmin()) {
      const url = new URL(req.url);
      const _id = url.searchParams.get('_id');
      const deleteResult = await Category.deleteOne({ _id });
      return NextResponse.json(deleteResult);
    }
    return NextResponse.json(true);
  } catch (err) {
    return NextResponse.json(err);
  }
}