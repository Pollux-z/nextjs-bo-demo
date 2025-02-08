import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import SwapDate from "../../../../models/swapdate";

export const dynamic = "force-dynamic"
export async function GET(req) {
    await connectMongoDB();
    const totalSwapDate = await SwapDate.find().sort({_id: -1});
    return NextResponse.json({totalSwapDate});
}