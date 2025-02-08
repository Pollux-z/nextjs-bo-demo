import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../../../lib/mongodb'
import Carrecord from '../../../../models/carrecord'

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id")
    await connectMongoDB();
    await Carrecord.findByIdAndDelete(id)
    return NextResponse.json({message: "Delete carrecord completed"},{status: 201})
}