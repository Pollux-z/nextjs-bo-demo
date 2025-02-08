import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Announcement from "../../../../models/announcement";

export async function POST(req) {
  try {
    const { subject, issueDate, remark, attachFile, userCreate } =
      await req.json();

    await connectMongoDB();
    await Announcement.create({
      subject,
      issueDate,
      remark,
      attachFile,
      userCreate,
    });

    return NextResponse.json(
      { message: "Post Announcement completed" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error occured while post the announcement." },
      { status: 500 }
    );
  }
}
