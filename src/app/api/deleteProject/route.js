import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Project from "../../../../models/project";

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Project.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Delete project completed" },
    { status: 201 }
  );
}
