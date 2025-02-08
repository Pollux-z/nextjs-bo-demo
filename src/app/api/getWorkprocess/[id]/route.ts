import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Workprocess from "../../../../../models/workprocess";

type IParams = {
  params: {
    id: string;
  };
};


export const dynamic = "force-dynamic"
export async function GET(req: Request, { params }: IParams) {
  const { id } = params;
  await connectMongoDB();
  const workprocess = await Workprocess.findOne({ _id: id });
  return NextResponse.json({ workprocess }, { status: 200 });
}

export async function PUT(req: Request, { params }: IParams) {
  const { id } = params;
  await connectMongoDB();
  const { title, description, fileUrl, fileTypes, userCreate, remark, teamOwner } = await req.json();
  await Workprocess.findByIdAndUpdate(id, {
      title,
      description,
      fileUrl,
      fileTypes,
      remark,
      teamOwner,
      userCreate,
  });
  return NextResponse.json(
    { message: "Completed update Workprocess" },
    { status: 201 }
  );
}
