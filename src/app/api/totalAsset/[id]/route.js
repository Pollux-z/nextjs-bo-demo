import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Asset from "../../../../../models/asset";

export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const post = await Asset.findOne({ _id: id });
  return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(req, { params }) {
  const { id } = params;
  const {
    projectData: project,
    startDateData: startDate,

  } = await req.json();
  await connectMongoDB();
  await Asset.findByIdAndUpdate(id, { project, startDate });
  return NextResponse.json(
    { message: "Completed update announcement" },
    { status: 200 }
  );
}