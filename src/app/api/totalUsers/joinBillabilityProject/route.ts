import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import Project from "../../../../../models/project";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  await connectMongoDB();
  const users = await User.aggregate([
    {
      $match: {
        $or: [
          { endDate: { $eq: null } },  // Match users where endDate is null
          { endDate: { $exists: false } } 
        ],
      },
    },
    {
      $lookup: {
        from: "projects", // The name of the projects collection
        let: { userId: "$_id" }, // Pass the user _id as a variable
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $isArray: "$billabilityProject" }, // Ensure billabilityProject is an array
                  {
                    $in: [
                      { $toString: "$$userId" }, // Convert _id to string
                      {
                        $map: {
                          input: "$billabilityProject", // Map over billabilityProject array
                          as: "bp",
                          in: "$$bp.userId", // Extract userId for comparison
                        },
                      },
                    ],
                  },
                ],
              },
            },
          },
          {
            $project: {
              projectCode: 1,
              projectEng: 1,
              billabilityProject: 1,
              endDate: 1,
            },
          },
        ],
        as: "userBillability", // The resulting field with matched projects
      },
    },
    {
      $sort: { userCode: 1 },
    },
    // {
    //   $project: {
    //     nameEng: 1, // Optionally include user details if needed
    //     userProjects: 1 // Keep only the userProjects array
    //   }
    // }
  ]);
  return NextResponse.json({ users });
}
