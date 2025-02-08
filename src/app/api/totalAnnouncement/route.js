import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Announcement from "../../../../models/announcement";

export const dynamic = "force-dynamic"
export async function GET(req) {
  await connectMongoDB();
  const totalAnnouncement = await Announcement.find().sort({ id: -1});
  return NextResponse.json({ totalAnnouncement });
}
