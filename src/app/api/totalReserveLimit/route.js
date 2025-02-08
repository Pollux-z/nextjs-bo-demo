import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Reserve from "../../../../models/reserve";

export const dynamic = "force-dynamic"
export async function GET(req) {
    const category  = req.nextUrl.searchParams.get("category")
    await connectMongoDB();
    const totalReserve = await Reserve.find({category});
    return NextResponse.json({totalReserve});
}