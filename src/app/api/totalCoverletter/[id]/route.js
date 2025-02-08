import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import CoverLetter from "../../../../../models/coverletter";

export const dynamic = "force-dynamic";
export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const post = await CoverLetter.findOne({ _id: id });
  return NextResponse.json({ post }, { status: 201 });
}

export async function PUT(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const {
    subject,
    project,
    issueDate,
    remark
  } = await req.json();
  await CoverLetter.findByIdAndUpdate(id, {
    subject,
    project,
    issueDate,
    remark,
  });
  return NextResponse.json({message: "Completed update cover letter"}, {status: 201})
}
