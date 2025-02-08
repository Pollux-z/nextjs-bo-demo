import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import TopUp from "../../../../models/topup";

export async function POST(req: Request) {
  try {
    const {
      employee,
      topUpDay,
      type,
      remark,
      userCreate,
    } = await req.json();

    await connectMongoDB();

    const allDocs = await TopUp.findOne().sort({ id: "desc" });
    const id = allDocs ? allDocs.id + 1 : 1;

    await TopUp.create({
      id,
      employee,
      topUpDay,
      type,
      remark,
      userCreate,
    });
    return NextResponse.json(
      { message: "Create TopUp day completed" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error while create post Topup" },
      { status: 500 }
    );
  }
}
