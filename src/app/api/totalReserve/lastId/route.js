import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Reserve from "../../../../../models/reserve";

export const dynamic = "force-dynamic"
export async function GET(req) {
    await connectMongoDB();
    const totalReserve = await Reserve.findOne().sort({id: -1});
    return NextResponse.json({totalReserve});
}