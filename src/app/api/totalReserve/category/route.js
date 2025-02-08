import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Reserve from "../../../../../models/reserve";

export const dynamic = "force-dynamic";
export async function GET(req) {
  const { searchParams } = req.nextUrl;
  const item = searchParams.getAll("items");

    const page = searchParams.get("page");
    const limit = Number(searchParams.get("limit"));
    const skip = (page - 1) * limit;

  await connectMongoDB();

  const pipelineCategory = [
    {
      $match: {
        category: { $in: item },
      },
    },
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
    ...(limit && page ? [
        {
            $skip: skip,
          },
          {
            $limit: limit,
          },
    ] : [])
  ];

  const pipelineAll = [
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
    ...(limit && page ? [
        {
            $skip: skip,
          },
          {
            $limit: limit,
          },
    ] : [])
  
  ];
  const category = await Reserve.aggregate(
    item.length > 0 ? pipelineCategory : pipelineAll
  );
  // const category = await Reserve.find({category: item}).sort({startTime: 1});
  return NextResponse.json({ category });
}
