import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";

export const dynamic = "force-dynamic"
export async function GET(req) {
    await connectMongoDB();
    const totalUsers = await User.find().sort({userCode: "desc"});
    return NextResponse.json({totalUsers});
    
}