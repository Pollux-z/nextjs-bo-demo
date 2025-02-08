import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Project from "../../../../../models/project";

export const dynamic = "force-dynamic"
export async function GET(req) {
  await connectMongoDB();
  const lastProject = await Project.findOne().sort({ projectCode: -1 });
  return NextResponse.json({ lastProject });
}
