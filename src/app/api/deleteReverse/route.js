import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../../../lib/mongodb'
import Reserve from '../../../../models/reserve';

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id")
    await connectMongoDB();
    await Reserve.findByIdAndDelete(id)
    return NextResponse.json({message: "Delete Meeting Room completed"},{status: 201})
}