import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Notification from "../../../../../models/notificaiton";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await connectMongoDB();

  // Parse the URL to get the category from query parameters
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const totalNotifications = await Notification.aggregate([
    {
      $match: { userRequest: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: "users", // Name of the topup collection
        localField: "userRequest", // Field in the users collection
        foreignField: "_id", // Field in the topup collection
        as: "userRecords", // Output array field to hold the joined data
      },
    },
    {
      $project: {
        _id: 1, // Include the `_id` field
        userRequest: 1, // Include specific fields (example: userRequest)
        title: 1, // Include specific fields (example: title)
        message: 1, // Include specific fields (example: message)
        type: 1, // Include specific fields (example: type)
        createdAt: 1, // Include specific fields (example: createdAt)
        userRecords: { $arrayElemAt: ["$userRecords.nameEng", 0] },
        teamLeader: { $arrayElemAt: ["$userRecords.teamLeader", 0] },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $limit: 10,
    }
  ]);

  return NextResponse.json({ totalNotifications });
}
