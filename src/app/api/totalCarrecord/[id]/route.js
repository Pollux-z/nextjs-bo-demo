import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Carrecord from "../../../../../models/carrecord";

export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const post = await Carrecord.findOne({ _id: id });
  return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const { endDistance, floor, slot, remark } = await req.json();
  await Carrecord.findByIdAndUpdate(id, {
    endDistance,
    floor,
    slot,
    remark,
  });
  return NextResponse.json(
    { message: "Completed update cover letter" },
    { status: 201 }
  );
}
