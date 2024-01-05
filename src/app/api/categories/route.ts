import { Category } from "@/app/models/Category";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    mongoose.connect(process.env.MONGODB_URI!);
    const createdCategory = await Category.create(body);
    return NextResponse.json(createdCategory);
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
    const { _id, name, image } = await req.json();
    const updateResult = await Category.updateOne({ _id }, { name, image });
    return NextResponse.json(updateResult);
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