import { NextResponse } from "next/server";
import mongoose from "mongoose"; // Import mongoose for ObjectId handling
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await connectMongoDB();

    const user = await User.aggregate([
      // {
      //     $match: {
      //       $or: [
      //         { endDate: { $eq: null } },  // Match users where endDate is null
      //         { endDate: { $exists: false } } 
      //       ],
      //     },
      //   },
        {
          $lookup: {
            from: "timeoffs",
            let: { userId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: [{ $toObjectId: "$employee" }, "$$userId"] },
                      { $eq: ["$type", "Sick Leave"] },
                    ],
                  },
                },
              },
            ],
            as: "sickLeaveRecords", // Changed from timeOffRecords to sickLeaveRecords
          },
        },
      {
        $project: {
          _id: 1,
          nameTh: 1,
          nameEng: 1,
          nickNameTh: 1,
          employeeProfile: 1,
          employeeTitle: 1,
          employeeTeams: 1,
          employeeTel: 1,
          employeeEmail: 1,
          year2023Leave: 1,
          year2024Leave: 1,
          year2025Leave: 1,
          sickLeaveRecords: 1 // Include all joined timeoff records
        }
      }
    ]);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching users with timeoffs");
    return NextResponse.json(
      { error: "Failed to fetch users with timeoffs" },
      { status: 500 }
    );
  }
}
