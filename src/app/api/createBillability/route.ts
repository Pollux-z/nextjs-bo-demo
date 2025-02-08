import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Billability from "../../../../models/billability";

export async function POST(req: NextRequest) {
  try {
    const { projectID, billabilityProject, userCreated } = await req.json();

    const currentDate = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Bangkok",
    });

    await connectMongoDB();

    const id = (await Billability.countDocuments()) + 1;
 
    await Billability.create({
      id,
      projectID,
      billabilityProject,
      userCreated,
      timestamp: currentDate,
    });

    return NextResponse.json(
      { message: "Create Billability completed" },
      { status: 201 }
    );
    
  } catch (err) {
    return NextResponse.json(
      { message: "An error while create post Billability" },
      { status: 500 }
    );
  }
}
