import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Notification from "../../../../models/notificaiton";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  await connectMongoDB();
  // Aggregation pipeline to fetch all notifications
  const totalNotifications = await Notification.aggregate([
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
        teamsLeader: { $arrayElemAt: ["$userRecords.teamLeader", 0] },
      },
    },
  ]);
  return NextResponse.json({ totalNotifications });
}
