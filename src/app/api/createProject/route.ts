import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Project from "../../../../models/project";
import { PrismaClient } from "@prisma/client";
import prisma from "../../../../lib/prisma";

interface billabilityProjectType {
  indexId: number;
  userId: string;
  manDay: number;
}

// TODO: POST project with prisma
// FIXME: POST Error handling with prisma and return response

export async function POST(req: Request) {
  try {
    const {
      projectCode,
      projectEng,
      projectTh,
      contactCode,
      customerName,
      customerAddress,
      customerTax,
      value,
      valuePeriod,
      billabilityProjects,
      projectOwner,
      projectManager,
      startDateContact,
      endDateContact,
      letterGuarantee,
      status,
      bankGuaranteeSend,
      bankGuaranteeReceive,
      latterGuaranteeSend,
      letterGuaranteeReceive,
      refund,
      pdmoBranch,
      expert,
      remark,
      projectTarget,
      projectScope,
      userCreate,
    } = await req.json();

    const allDocs = await prisma.projects.findFirst({
      orderBy: { id_: "desc" },
      });
      


    const newProject = await prisma.projects.create({
      data: {
        id_: allDocs ? allDocs.id_ + 1 : 1,
        projectCode,
        projectEng,
        projectTh,
        contactCode,
        customerName,
        customerAddress,
        customerTax,
        value,
        valuePeriod,
        projectOwner,
        projectManager,
        startDateContact,
        endDateContact,
        letterGuarantee,
        status,
        bankGuaranteeSend,
        bankGuaranteeReceive,
        latterGuaranteeSend,
        letterGuaranteeReceive,
        refund,
        pdmoBranch,
        expert,
        remark,
        projectTarget,
        projectScope,
        userCreate,
        createdAt: new Date(),
        updatedAt: new Date(),
        v: 1,
        billabilityProjects: {
          create: billabilityProjects?.map(
            (billability: billabilityProjectType) => ({
              indexId: billability.indexId,
              userId: billability.userId,
              manDay: billability.manDay,
            })
          ),
        },
      },
    });

    return NextResponse.json(
      { message: "Create project completed", newProject },
      { status: 201 }
    );
  } catch (err) {
    const errorMessage = (err as any).message || "An unknown error occurred";
    return NextResponse.json(
      {
        message: "An error occurred while creating the project",
        error: errorMessage,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// export async function POST(req: Request) {
//   try {
//     const {
//       projectCode,
//       projectEng,
//       projectTh,
//       contactCode,
//       customerName,
//       customerAddress,
//       customerTax,
//       value,
//       valuePeriod,
//       billabilityProject,
//       projectOwner,
//       projectManager,
//       startDateContact,
//       endDateContact,
//       letterGuarantee,
//       status,
//       bankGuaranteeSend,
//       bankGuaranteeReceive,
//       latterGuaranteeSend,
//       letterGuaranteeReceive,
//       refund,
//       pdmoBranch,
//       expert,
//       remark,
//       projectTarget,
//       projectScope,
//       fileContact1,
//       fileContact2,
//       fileContact3,
//       userCreate,
//     } = await req.json();

//     await connectMongoDB();

//     const allDocs = await Project.findOne().sort({ id: "desc" });
//     const id = allDocs ? allDocs.id + 1 : 1;

//     await Project.create({
//       id,
//       projectCode,
//       projectEng,
//       projectTh,
//       contactCode,
//       customerName,
//       customerAddress,
//       customerTax,
//       value,
//       valuePeriod,
//       billabilityProject,
//       projectOwner,
//       projectManager,
//       startDateContact,
//       endDateContact,
//       letterGuarantee,
//       status,
//       bankGuaranteeSend,
//       bankGuaranteeReceive,
//       latterGuaranteeSend,
//       letterGuaranteeReceive,
//       refund,
//       pdmoBranch,
//       expert,
//       remark,
//       projectTarget,
//       projectScope,
//       fileContact1,
//       fileContact2,
//       fileContact3,
//       userCreate,
//     });
//     return NextResponse.json(
//       { message: "Create project completed" },
//       { status: 201 }
//     );
//   } catch (err) {
//     return NextResponse.json(
//       { message: "An error while create project" },
//       { status: 500 }
//     );
//   }
// }
