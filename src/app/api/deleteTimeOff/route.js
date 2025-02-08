import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../../../lib/mongodb'
import TimeOff from '../../../../models/timeoff';

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id")
    await connectMongoDB();
    await TimeOff.findByIdAndDelete(id)
    return NextResponse.json({message: "Delete Time-off Completed"},{status: 201})
}