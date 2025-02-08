import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const conutResignation = await prisma.resignations.count() + 1;
    
    const body = await req.json();
    const { userRequest, effectiveDate, note, status, userCreate } = body;
    const resignation = await prisma.resignations.create({
      data: {
        userRequest,
        effectiveDate: new Date(effectiveDate),
        note,
        status,
        userCreate,
        createdAt: new Date(),
        updatedAt: new Date(),
        v: 1, // or appropriate value
        id_: conutResignation, // or appropriate value
      },
    });

    return NextResponse.json(resignation, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 400 }
    );
  }
}
