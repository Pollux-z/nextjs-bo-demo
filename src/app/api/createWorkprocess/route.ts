import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Workprocess from "../../../../models/workprocess";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const { title, description, fileUrl, fileTypes, userCreate, remark, teamOwner, imgUrl } =
      await req.json();

    await connectMongoDB();

    const allDocs = await Workprocess.findOne().sort({ id: "desc" });
    const id = allDocs ? allDocs.id + 1 : 1;

    await Workprocess.create({
      id,
      title,
      description,
      fileUrl,
      fileTypes,
      remark,
      teamOwner,
      imgUrl,
      userCreate,
    });
    return NextResponse.json(
      { message: `Create Workprocess id:${id} ${title} completed` },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error while create post Workprocess" },
      { status: 500 }
    );
  }
}