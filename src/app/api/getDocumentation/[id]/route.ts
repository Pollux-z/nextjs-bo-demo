import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Documentation from "../../../../../models/documentation";

type IParams = {
  params: {
    id: string;
  };
};


export const dynamic = "force-dynamic"
export async function GET(req: Request, { params }: IParams) {
  const { id } = params;
  await connectMongoDB();
  const documentation = await Documentation.findOne({ _id: id });
  return NextResponse.json({ documentation }, { status: 200 });
}

export async function PUT(req: Request, { params }: IParams) {
  const { id } = params;
  await connectMongoDB();
  const { title, description, url, remark } = await req.json();
  await Documentation.findByIdAndUpdate(id, {
    title,
    description,
    url,
    remark,
  });
  return NextResponse.json(
    { message: "Completed update documentation" },
    { status: 201 }
  );
}
