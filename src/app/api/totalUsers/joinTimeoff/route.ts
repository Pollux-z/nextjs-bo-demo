import { NextResponse } from "next/server";
import mongoose from "mongoose"; // Import mongoose for ObjectId
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await connectMongoDB();

  const user = await User.aggregate([
    {
      $match: {
        $or: [
          { endDate: { $eq: null } },  // Match users where endDate is null
          { endDate: { $exists: false } } 
        ],
      },
    },
    {
      $sort: { userCode: 1 } 
    },
    {
      $lookup: {
        from: "timeoffs", // Name of the timeoff collection
        localField: "_id", // Field in the users collection
        foreignField: "employee", // Field in the timeoff collection
        as: "timeOffRecords" // Output array field to hold the joined data
      }
    },
    {
      $lookup: {
        from: "topups", // Name of the topup collection
        localField: "_id", // Field in the users collection
        foreignField: "employee", // Field in the topup collection
        as: "topupRecords" // Output array field to hold the joined data
      }
    },
    {
      $project: {
        _id: 1,
        userCode: 1,
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
        topupRecords: 1, // Include all joined topup records
        timeOffRecords: 1 // Include all joined timeoff records
      }
    },
    
  ]);

  return NextResponse.json({ user });
}
