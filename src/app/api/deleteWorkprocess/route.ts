import { NextResponse, NextRequest } from 'next/server'
import { connectMongoDB } from '../../../../lib/mongodb'
import Workprocess from '../../../../models/workprocess'
export const dynamic = "force-dynamic"

export async function DELETE(req : NextRequest) {
    const id = req.nextUrl.searchParams.get("id")
    await connectMongoDB();
    await Workprocess.findByIdAndDelete(id)
    return NextResponse.json({message: "Delete workprocess completed"},{status: 201})
}