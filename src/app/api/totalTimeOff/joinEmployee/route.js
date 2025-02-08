import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import TimeOff from "../../../../../models/timeoff";

export const dynamic = "force-dynamic";
export async function GET(req) {
  await connectMongoDB();
  const timeOff = await TimeOff.aggregate([
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
  return NextResponse.json({ timeOff });
}
