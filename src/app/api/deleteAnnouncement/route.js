import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Announcement from "../../../../models/announcement";

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Announcement.findByIdAndDelete(id)
    return NextResponse.json({message: "Delete post comleted"}, {status: 200})
}
