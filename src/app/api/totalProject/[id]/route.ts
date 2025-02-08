import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Project from "../../../../../models/project";

import prisma from "../../../../../lib/prisma";

interface billabilityProjectType {
  indexId: number;
  userId: string;
  manDay: number;
}

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const project = await prisma.projects.findUnique({
    where: { id },
    include: {
      billabilityProjects: true,
    },
  });
  return NextResponse.json({ project }, { status: 200 });
}


export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const body = await req.json();
    const {
      projectEng,
      projectTh,
      projectCode,
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
      fileCertificate,
      fileProjectWord,
      fileProjectPowerpoint,
    } = body;

    const project = await prisma.$transaction( async (tx) => {
      
      await tx.billabilityProjects.deleteMany({
        where: { projectId: id },
      });

      return await tx.projects.update({
        where: { id },
        data: {
          projectEng,
          projectTh,
          projectCode,
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
          fileCertificate,
          fileProjectWord,
          fileProjectPowerpoint,
          billabilityProjects: {
            create: billabilityProjects.map((billabilityProject: billabilityProjectType) => ({
              indexId: billabilityProject.indexId,
              userId: billabilityProject.userId,
              manDay: billabilityProject.manDay,
            })),
          },
        },
      });
    });

    // const updatedProject = await prisma.projects.update({
    //   where: { id },
    //   data: {
    //     projectEng,
    //     projectTh,
    //     projectCode,
    //     contactCode,
    //     customerName,
    //     customerAddress,
    //     customerTax,
    //     value,
    //     valuePeriod,
    //     projectOwner,
    //     projectManager,
    //     startDateContact,
    //     endDateContact,
    //     letterGuarantee,
    //     status,
    //     bankGuaranteeSend,
    //     bankGuaranteeReceive,
    //     latterGuaranteeSend,
    //     letterGuaranteeReceive,
    //     refund,
    //     pdmoBranch,
    //     expert,
    //     remark,
    //     projectTarget,
    //     projectScope,
    //     fileContact1,
    //     fileContact2,
    //     fileContact3,
    //     fileCertificate,
    //     fileProjectWord,
    //     fileProjectPowerpoint,
    //     billabilityProjects,
    //   },
    // });

    return NextResponse.json(
      { message: "Completed update project", project },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/totalProject/[id] error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 400 }
    );
  }
}
