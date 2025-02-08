import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Asset from "../../../../models/asset";

export async function POST(req) {
  try {
    const {
      project,
      startDate
    } = await req.json();
    await connectMongoDB();
    await Asset.create({
      project,
      startDate
    });
    return NextResponse.json(
      { message: "Create asset completed" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error while create post car record" },
      { status: 500 }
    );
  }
}
