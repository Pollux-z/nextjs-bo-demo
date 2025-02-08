import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import TimeOff from "../../../../models/timeoff";

export async function POST(req) {
  try {
    const {
      id,
      employee,
      type,
      reason,
      issueDate,
      halfDay,
      status,
      userCreate,
    } = await req.json();

    await connectMongoDB();
    await TimeOff.create({
      id,
      employee,
      type,
      reason,
      issueDate,
      halfDay,
      status,
      userCreate,
    });
    return NextResponse.json(
      { message: "Create TIME Off completed" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error while create post car record" },
      { status: 500 }
    );
  }
}
