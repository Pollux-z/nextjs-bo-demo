import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Reserve from "../../../../models/reserve";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const {
      subject,
      category,
      startDate,
      endDate,
      startTime,
      endTime,
      status,
      remark,
      userCreate,
    } = await req.json();
    await connectMongoDB();

    const allReserve = await Reserve.findOne().sort({ id: "desc" });
    const id = allReserve ? allReserve.id + 1 : 1;

    await Reserve.create({
      id,
      subject,
      category,
      startDate,
      endDate,
      startTime,
      endTime,
      status,
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
