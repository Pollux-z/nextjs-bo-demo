import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req: Request) {
  try {
    const totalInternalCharge = await prisma.internalCharge.findMany({
      include: {
        buyerUser: {
          select: {
            nameEng: true,
          },
        },
        sellerUsers : {
          select: {
            userId: true,
            manDay: true,
            costPerManDay: true,
            totalCost: true,
          },
        },
        projectInternalCharge: {
          select: {
            projectCode: true,
            projectEng : true
          },
        },
      },
    });

    return NextResponse.json(totalInternalCharge, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 400 }
    );
  }
}
