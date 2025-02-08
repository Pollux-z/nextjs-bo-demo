import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import TimeOff from "../../../../../models/timeoff";

export const dynamic = "force-dynamic"
export async function GET(req) {
    const user = req.nextUrl.searchParams.get("value");
    await connectMongoDB();
    const userTimeOff = await TimeOff.find({employee: user}).sort({id: -1});
    return NextResponse.json({userTimeOff});
}