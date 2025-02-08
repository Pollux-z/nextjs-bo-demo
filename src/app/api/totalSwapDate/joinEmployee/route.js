import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import SwapDate from "../../../../../models/swapdate";

export const dynamic = "force-dynamic";
export async function GET(req) {
  await connectMongoDB();
  const swapdate = await SwapDate.aggregate([
    {
      $addFields: {
        employee: { $toObjectId: "$employee" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "employee",
        foreignField: "_id",
        as: "employee_info",
      },
      
    },
    {
      $unwind: "$employee_info"
    }
  ]).sort({ id: -1 })
  return NextResponse.json({ swapdate });
}
