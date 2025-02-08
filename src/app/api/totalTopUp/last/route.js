import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import TopUp from "../../../../../models/topup";

export const dynamic = "force-dynamic"
export async function GET(req) {
    await connectMongoDB();
    const lastTopUp = await TopUp.findOne().sort({id: -1});
    return NextResponse.json({lastTopUp});
}