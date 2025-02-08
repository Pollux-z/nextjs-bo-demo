import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(req: Request) {
  try {
    const userTeamConsult = await prisma.users.findMany({
      where: {
        AND: [
          { employeeTeams: { not: "Business Operation" } },
          { employeeTeams: { not: "Business Development" } },
          { OR: [{ endDate: null }, { endDate: undefined }] },
        ],
      },
    });
    return NextResponse.json(userTeamConsult, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 400 }
    );
  }
}
