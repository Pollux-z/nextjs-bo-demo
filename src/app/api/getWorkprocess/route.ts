import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Workprocess from "../../../../models/workprocess";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  await connectMongoDB();

  const totalWorkprocess = await Workprocess.find();
  return NextResponse.json({ totalWorkprocess });
}
