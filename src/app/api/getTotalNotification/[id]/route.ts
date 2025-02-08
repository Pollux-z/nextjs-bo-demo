import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Notification from "../../../../../models/notificaiton";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
  
    try {
      await connectMongoDB();
  
      // Validate and convert the id
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
      }
  
      const user = await Notification.aggregate([
        { 
          $match: { _id: new mongoose.Types.ObjectId(id) } 
        },
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
                    ],
                  },
                },
              },
            ],
            as: "timeOffRecords", // Changed from timeOffRecords to sickLeaveRecords
          },
        },
      ]);
  
      if (!user || user.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json({ user: user[0] }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Server error"},
        { status: 500 }
      );
    }
  }