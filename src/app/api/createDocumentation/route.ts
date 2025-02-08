import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Documentation from "../../../../models/documentation";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const { title, description, url, fileTypes, userCreate, remark } =
      await req.json();

    await connectMongoDB();

    const allDocs = await Documentation.findOne().sort({ id: "desc" });
    const id = allDocs ? allDocs.id + 1 : 1;

    await Documentation.create({
      id,
      title,
      description,
      url,
      fileTypes,
      remark,
      userCreate,
    });
    return NextResponse.json(
      { message: "Create Documentation completed" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error while create post Documentation" },
      { status: 500 }
    );
  }
}
