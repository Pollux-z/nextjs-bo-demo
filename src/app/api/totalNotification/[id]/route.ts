import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Notification from "../../../../../models/notificaiton";
import bcrypt from "bcrypt";

interface Params {
  id: string;
}

export async function GET(req: Request, { params }: { params: Params }) {
  const { id } = params;

  try {
    await connectMongoDB();

    // Validate and convert the id
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    // }

    const notifications = await Notification.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id)},
      },
      {
        $lookup: {
          from: "users", // Name of the topup collection
          localField: "userRequest", // Field in the users collection
          foreignField: "_id", // Field in the topup collection
          as: "userRecords", // Output array field to hold the joined data
        },
      },
    ]);

    if (!notifications || notifications.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: notifications[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
