import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import SwapDate from "../../../../../models/swapdate";

export const dynamic = "force-dynamic"
export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const swapDate = await SwapDate.findOne({ _id: id });
  return NextResponse.json({ swapDate }, { status: 200 });
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { employee, projectAction, actionDate, swapDate, attachFile, status, remark } = await req.json();
  await connectMongoDB();
  await SwapDate.findByIdAndUpdate(id, {
    employee,
    projectAction,
    actionDate,
    swapDate,
    attachFile,
    status,
    remark,
  });
  return NextResponse.json(
    { message: "Completed update Swap date" },
    { status: 200 }
  );
}
