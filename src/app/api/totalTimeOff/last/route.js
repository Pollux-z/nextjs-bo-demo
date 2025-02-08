import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import TimeOff from "../../../../../models/timeoff";

export const dynamic = "force-dynamic"
export async function GET(req) {
    await connectMongoDB();
    const lastTimeOff = await TimeOff.findOne().sort({id: -1});
    return NextResponse.json({lastTimeOff});
}