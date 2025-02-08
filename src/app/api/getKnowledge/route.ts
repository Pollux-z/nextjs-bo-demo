import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "../../../../lib/prisma";


export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const totalKnowledges = await prisma.knowledges.findMany();
    return NextResponse.json(totalKnowledges, { status: 200 });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 400 }
    );
  }
}
