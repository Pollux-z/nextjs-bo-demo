import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../../../lib/mongodb'
import SwapDate from '../../../../models/swapdate';

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id")
    await connectMongoDB();
    await SwapDate.findByIdAndDelete(id)
    return NextResponse.json({message: "Delete Swap Date Completed"},{status: 201})
}