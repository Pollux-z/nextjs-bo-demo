import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Knowledge from "../../../../models/knowledge";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const { title, description, fileUrl, fileTypes, userCreate, remark, teamOwner, imgUrl } =
      await req.json();

    await connectMongoDB();

    const allDocs = await Knowledge.findOne().sort({ id: "desc" });
    const id = allDocs ? allDocs.id + 1 : 1;

    await Knowledge.create({
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
      { message: "Create Knowledge sharing completed" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error while create post Knowledge sharing" },
      { status: 500 }
    );
  }
}

