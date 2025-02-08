import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import SwapDate from "../../../../models/swapdate";

export async function POST(req) {
  try {
    const {
      id,
      employee,
      actionDate,
      projectAction,
      swapDate,
      status,
      attachFile,
      remark,
      userCreate,
    } = await req.json();

    await connectMongoDB();
    await SwapDate.create({
      id,
      employee,
      actionDate,
      projectAction,
      swapDate,
      status,
      attachFile,
      remark,
      userCreate,
    });
    return NextResponse.json(
      { message: "Create Swap date completed" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error while create post car record" },
      { status: 500 }
    );
  }
}
