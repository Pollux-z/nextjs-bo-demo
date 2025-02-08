import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";

export const dynamic = "force-dynamic";
export async function GET(req) {
  await connectMongoDB();
  const user = await User.aggregate([
    {
      $addFields: {
        teamLeader: { $toObjectId: "$teamLeader" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "teamLeader",
        foreignField: "_id",
        as: "teamLeader_info",
      },
      
    },
    {
      $unwind: "$teamLeader_info"
    }
  ]).sort({ id: -1 })
  return NextResponse.json({ user });
}
