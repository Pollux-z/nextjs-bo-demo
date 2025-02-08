import { NextResponse, NextRequest } from 'next/server'
import { connectMongoDB } from '../../../../lib/mongodb'
import Documentation from '../../../../models/documentation';

export const dynamic = "force-dynamic"
export async function DELETE(req : NextRequest) {
    const id = req.nextUrl.searchParams.get("id")
    await connectMongoDB();
    await Documentation.findByIdAndDelete(id)
    return NextResponse.json({message: "Delete carrecord completed"},{status: 201})
}