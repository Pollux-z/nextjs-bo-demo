import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import TopUp from "../../../../../models/topup";


export const dynamic = "force-dynamic"
export async function GET(req: Request) {
    await connectMongoDB();
    const topups = await TopUp.aggregate([
      {
        $addFields: {
          employee: { $toObjectId: "$employee" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "employee",
          foreignField: "_id",
          as: "employee_info",
        },
        
      },
      {
        $unwind: "$employee_info"
      }
    ]).sort({ id: "desc" })
    return NextResponse.json({ topups });
  }
