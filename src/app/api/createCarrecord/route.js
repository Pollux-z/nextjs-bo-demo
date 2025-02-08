import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Carrecord from "../../../../models/carrecord";

export async function POST(req) {
  try {
    const {
      code,
      destination,
      startDistance,
      endDistance,
      remark,
      userCreate,
    } = await req.json();
    await connectMongoDB();
    await Carrecord.create({
      code,
      destination,
      startDistance,
      endDistance,
      remark,
      userCreate,
    });
    return NextResponse.json(
      { message: "Create carrecord completed" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error while create post car record" },
      { status: 500 }
    );
  }
}
