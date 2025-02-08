import { NextResponse } from "next/server";
import User from "../../../../../models/user";
import { connectMongoDB } from "../../../../../lib/mongodb";

export const dynamic = "force-dynamic";
export async function GET(req) {
  await connectMongoDB();
  const user = await User.findOne().sort({ userCode: -1 });
  return NextResponse.json({ user });
}
