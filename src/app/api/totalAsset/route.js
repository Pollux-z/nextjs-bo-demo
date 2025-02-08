import {NextResponse} from "next/server"
import { connectMongoDB } from "../../../../lib/mongodb"
import Asset from "../../../../models/asset";

export async function GET(req) {
    await connectMongoDB();
    const totalAsset = await Asset.find();
    return NextResponse.json({totalAsset})
}
