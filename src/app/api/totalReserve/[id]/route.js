import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Reserve from "../../../../../models/reserve";

export const dynamic = "force-dynamic";
export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const reserve = await Reserve.findOne({ _id: id });
  return NextResponse.json({ reserve }, { status: 201 });
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { category, subject, startDate, endDate, startTime, endTime, remark } =
    await req.json();
  await connectMongoDB();
  await Reserve.findByIdAndUpdate(id, {
    category,
    subject,
    startDate,
    endDate,
    startTime,
    endTime,
    remark,
  });
  return NextResponse.json(
    { message: "Completed update Reserve data" },
    { status: 200 }
  );
}
