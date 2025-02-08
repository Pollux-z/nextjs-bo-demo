import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

interface sellerUser {
  id: number;
  userId: string;
  indexId: number;
  manDay: number;
  costPerManDay: number;
  totalCost: number;
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const totalInternalCharge = await prisma.internalCharge.findUnique({
      where: {
        id: id,
      },
      include: {
        buyerUser: {
          select: {
            nameEng: true,
          },
        },
        sellerUsers: {
          select: {
            id: true,
            indexId: true,
            userId: true,
            manDay: true,
            costPerManDay: true,
            totalCost: true,
          },
        },
        projectInternalCharge: {
          select: {
            projectCode: true,
            projectEng: true,
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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {

    if(!id) {
        return NextResponse.json(
            { message: "Internal charge ID is required" },
            { status
            : 400 }
        );
    }

    if (!req.body) {
      return NextResponse.json(
        { message: "Request body is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const {
      title,
      buyerUserId,
      sellerTeam,
      sellerUser,
      projectRequest,
      note,
      status,
    } = body;

    // Transaction for data consistency
    const response = await prisma.$transaction(async (tx) => {
      // Clear existing relations
      await tx.sellerUser.deleteMany({
        where: { internalChargeId: id },
      });

      // Create new relations
      return await tx.internalCharge.update({
        where: { id },
        data: {
          title,
          buyerUserId,
          sellerTeam,
          projectRequest,
          note,
          status,
          sellerUsers: {
            create: sellerUser.map((seller: sellerUser) => ({
              indexId: seller.indexId,
              userId: seller.userId,
              manDay: seller.manDay,
              costPerManDay: seller.costPerManDay,
              totalCost: seller.totalCost,
            })),
          },
        },
        include: { sellerUsers: true },
      });
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("PUT /api/internal-charge/[id] error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
