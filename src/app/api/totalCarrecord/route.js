import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Carrecord from "../../../../models/carrecord";

export const dynamic = "force-dynamic"
export async function GET(req) {
  await connectMongoDB();

  const pipeline = [
    {
      $addFields: {
        userCreate: { $toObjectId: "$userCreate" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userCreate",
        foreignField: "_id",
        as: "employee_info",
      },
    },
    {
      $unwind: "$employee_info",
    },
    {
      $sort: {
        code: -1,
      },
    },
    
   ];


  // const totalCarrecord = await Carrecord.find().sort({ code: -1 });
  const totalCarrecord = await Carrecord.aggregate(pipeline)
  return NextResponse.json({ totalCarrecord });
}
