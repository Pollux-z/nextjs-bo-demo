import {NextResponse} from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Carrecord from "../../../../models/carrecord"

export const dynamic = "force-dynamic"
export async function GET(req) {
    await connectMongoDB();
    const lastCarrecord = await Carrecord.findOne().sort({code: -1});
    return NextResponse.json({lastCarrecord})
}