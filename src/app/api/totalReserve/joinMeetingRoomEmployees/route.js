import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Reserve from "../../../../../models/reserve";
import { endOfWeek, format, getMonth, startOfWeek } from "date-fns";

export const dynamic = "force-dynamic";
export async function GET(req, { params }) {

  // if sortDate="Month" return data on this month , if sortDate="Week" return on this week
  const date = req.nextUrl.searchParams.get("sortDate");

  await connectMongoDB();
  const currentDate = new Date();
  const currentMonth = getMonth(currentDate) + 1;

  const today = format(currentDate, "yyyy-MM-dd")
  const startOfWeekDate = startOfWeek(currentDate);
  const endOfWeekDate = endOfWeek(currentDate);

  const pipelineMonth = [
    {
      $match: {
        category: { $in: ["Minor Room", "Major Room", "Back office Room"] }, // Match category
      },
    },
    {
      $addFields: {
        startDateAsDate: {
          $dateFromString: { dateString: "$startDate" }, // Convert startDate string to Date
        },
        startTimeAsDate: {
          $dateFromString: {
            dateString : {
              $concat: ["2024-01-01T", "$startTime", ":00"]
            }
          }
        }
      },
    },
    {
      $match: {
        $expr: {
          $eq: [{ $month: "$startDateAsDate" }, currentMonth], // Match documents with startDate in September
        },
      },
    },
    {
      $sort: {
        startDateAsDate: 1,
        startTimeAsDate: 1
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
  ];

  const pipelineWeek = [
    {
      $match: {
        category: { $in: ["Minor Room", "Major Room", "Back office Room"] }, // Match category
      },
    },
    {
      $addFields: {
        startDateAsDate: {
          $dateFromString: { dateString: "$startDate" }, // Convert startDate string to Date
        },
        startTimeAsDate: {
          $dateFromString: {
            dateString : {
              $concat: ["2024-01-01T", "$startTime", ":00"]
            }
          }
        }
      },
    },
    {
      $match: {
        startDateAsDate: {
          $gte: startOfWeekDate,
          $lt: endOfWeekDate,
        },
      },
    },
    {
      $sort: {
        startDateAsDate: 1,
        startTimeAsDate: 1
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
  ];

  const pipelineCurrentDate = [
    {
      $match: {
        category: { $in: ["Minor Room", "Major Room", "Back office Room"] }, // Match category
      },
    },
    {
      $addFields: {
        startDateAsDate: {
          $dateFromString: { dateString: "$startDate" }, // Convert startDate string to Date
        },
        startTimeAsDate: {
          $dateFromString: {
            dateString : {
              $concat: [today, "T", "$startTime", ":00"]
            }
          }
        }
      },
    },
    {
      $match: {
        startDateAsDate: {
          $gte: new Date(today)
        }
      }
    },
  
    {
      $sort: {
        startDateAsDate: 1,
        startTimeAsDate: 1
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
  ];

  const pipelineAll = [
    {
      $match: {
        category: { $in: ["Minor Room", "Major Room", "Back office Room"] }, // Match category
      },
    },
    {
      $addFields: {
        startDateAsDate: {
          $dateFromString: { dateString: "$startDate" }, // Convert startDate string to Date
        },
        startTimeAsDate: {
          $dateFromString: {
            dateString : {
              $concat: [today, "T", "$startTime", ":00"]
            }
          }
        }
      },
    },
    {
      $sort: {
        id: -1
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
  ];

  const reserves = await Reserve.aggregate(date === "Month" ? pipelineMonth : date === "Week" ? pipelineWeek : date === "All" ? pipelineAll : pipelineCurrentDate);
  return NextResponse.json({ reserves });
}
