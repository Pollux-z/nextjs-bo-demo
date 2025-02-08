import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { addHours } from "date-fns";

interface sellerUser {
  id: number;
  userId: string;
  indexId: number;
  manDay: number;
  costPerManDay: number;
  totalCost: number;
}

export async function POST(req: Request) {
  const bangkokTimeZone = "Asia/Bangkok";
  const date = new Date();
  const currentDate = addHours(date, 7);
  
  try {
    const body = await req.json();
    const { 
      title, 
      buyerUserId, 
      sellerUserId,
      sellerTeam,
      sellerUser, 
      projectRequest,
      note,
      status } = body;


    const response = await prisma.internalCharge.create({
      data: {
        title,
        buyerUserId,
        sellerUserId,
        sellerTeam,
        sellerUsers: {
          create: sellerUser.map((seller: sellerUser) => ({
            indexId: seller.indexId,
            userId: seller.userId,
            manDay: seller.manDay,
            costPerManDay: seller.costPerManDay,
            totalCost: seller.totalCost,
          })),
        },
        projectRequest,
        status,
        note,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 400 }
    );
  }
}
