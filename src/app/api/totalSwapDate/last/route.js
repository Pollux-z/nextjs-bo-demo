import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import SwapDate from "../../../../../models/swapdate";

export const dynamic = "force-dynamic"
export async function GET(req) {
    await connectMongoDB();
    const lastSwapDate = await SwapDate.findOne().sort({id: -1});
    return NextResponse.json({lastSwapDate});
}