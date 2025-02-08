import {NextResponse} from "next/server"
import { connectMongoDB } from "../../../../lib/mongodb"
import Documentation from "../../../../models/documentation";

export const dynamic = "force-dynamic"
export async function GET(req: Request) {
    await connectMongoDB();

    const totalDocumentations = await Documentation.find();
    return NextResponse.json({totalDocumentations})
}
