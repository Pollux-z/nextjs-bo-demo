import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Announcement from "../../../../../models/announcement";

export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const post = await Announcement.findOne({ _id: id });
  return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(req, { params }) {
  const { id } = params;
  const {
    newSubject: subject,
    newIssueDate: issueDate,
    newRemark: remark,
  } = await req.json();
  await connectMongoDB();
  await Announcement.findByIdAndUpdate(id, { subject, issueDate, remark });
  return NextResponse.json(
    { message: "Completed update announcement" },
    { status: 200 }
  );
}
