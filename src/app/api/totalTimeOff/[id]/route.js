import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import TimeOff from "../../../../../models/timeoff";

export const dynamic = "force-dynamic"
export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const timeOff = await TimeOff.findOne({ _id: id });
  return NextResponse.json({ timeOff }, { status: 201 });
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { 
    employee, 
    type, 
    reason,
    status,
    issueDate, 
    halfDay, 
    userCreate } =
    await req.json();
  await connectMongoDB();
  await TimeOff.findByIdAndUpdate(id, {
    employee,
    type,
    reason,
    status,
    issueDate,
    halfDay,
    userCreate,
  });
  return NextResponse.json(
    { message: "Completed update Time Off" },
    { status: 200 }
  );
}
