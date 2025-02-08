import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import TopUp from "../../../../models/topup";

export const dynamic = "force-dynamic"
export async function GET(req) {
    await connectMongoDB();
    const totalTopUp = await TopUp.find().sort({_id: -1});
    return NextResponse.json({totalTopUp});
    
}