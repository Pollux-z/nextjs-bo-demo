import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import CoverLetter from "../../../../models/coverletter";

export async function POST(req) {
  try {
    const { 
        id, 
        subject, 
        project, 
        issueDate, 
        remark, 
        userCreate
     } = await req.json();

    await connectMongoDB();
    await CoverLetter.create({
        id, 
        subject, 
        project, 
        issueDate, 
        remark, 
        userCreate,
    });
    return NextResponse.json(
      { message: "Create cover letter completed" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error while create post car record" },
      { status: 500 }
    );
  }
}
