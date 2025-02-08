import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Knowledge from "../../../../../models/knowledge";
type IParams = {
  params: {
    id: string;
  };
};


export const dynamic = "force-dynamic"
export async function GET(req: Request, { params }: IParams) {
  const { id } = params;
  await connectMongoDB();
  const knowledge = await Knowledge.findOne({ _id: id });
  return NextResponse.json({ knowledge }, { status: 200 });
}

export async function PUT(req: Request, { params }: IParams) {
  const { id } = params;
  await connectMongoDB();
  const { title, description, fileUrl, fileTypes, userCreate, remark, teamOwner } = await req.json();
  await Knowledge.findByIdAndUpdate(id, {
      title,
      description,
      fileUrl,
      fileTypes,
      remark,
      teamOwner,
      userCreate,
  });
  return NextResponse.json(
    { message: "Completed update knowledge sharing" },
    { status: 201 }
  );
}
