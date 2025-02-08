import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Notification from "../../../../models/notificaiton";

export async function GET(req: Request) {
  try {
    await connectMongoDB();
    const totalNotifications = await Notification.aggregate([
      {
        $lookup: {
            from: "users",
            localField: "userRequest",
            foreignField: "_id",
            as: "userRequest",
            },
      },
      {
        $lookup: {
            from: "users",
            localField: "userReceive",
            foreignField: "_id",
            as: "userReceive",
            },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          userRequest: { 
            nameEng: { $arrayElemAt: ["$userRequest.nameEng", 0] },
            employeeEmail: { $arrayElemAt: ["$userRequest.employeeEmail", 0] }
          },
          userReceive: { 
            nameEng: { $arrayElemAt: ["$userReceive.nameEng", 0] },
            employeeEmail: { $arrayElemAt: ["$userReceive.employeeEmail", 0] }
          },
          message: 1,
          read: 1,
          timestamp: 1,
        }
      }
    ]);

    return NextResponse.json({ totalNotifications }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message:
          "An error occurred while fetching the total number of notifications",
      },
      { status: 500 }
    );
  }
}
