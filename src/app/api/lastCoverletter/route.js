import {NextResponse} from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import CoverLetter from "../../../../models/coverletter";

export const dynamic = "force-dynamic"
export async function GET(req) {
    await connectMongoDB();
    const lastCoverletter = await CoverLetter.findOne().sort({id: -1});
    return NextResponse.json({lastCoverletter})
}