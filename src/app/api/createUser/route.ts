import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userCode,
      nameTh,
      nameEng,
      employeeEmail,
      password,
      nickNameTh,
      employeeProfile,
      employeeTitle,
      employeeTeams,
      employeeTel,
      employeeBirthDay,
      startDate,
      endDate,
      teamLeader,
      remark,
      role,
      costPerManDay,
      targetManDay,
      userCreate,
    } = body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const date = new Date(startDate);
    const countMonth = date.getMonth();
    
    const year2025LeaveDefault = {
      personalLeave: 7,
      sickLeave: 30,
      vacationLeave: 12 - countMonth,
    };

    const newUser = await prisma.users.create({
      data: {
        userCode,
        nameTh,
        nameEng,
        employeeEmail,
        password: hashedPassword,
        nickNameTh,
        employeeProfile: employeeProfile || undefined,
        employeeTitle,
        employeeTeams,
        employeeTel,
        employeeBirthDay,
        startDate,
        endDate: endDate || null,
        teamLeader,
        year2025Leave: year2025LeaveDefault,
        role,
        costPerManDay,
        targetManDay,
        remark,
        userCreate,
        createdAt: new Date(),
        updatedAt: new Date(),
        v: 1,
      },
    });

    return NextResponse.json({ message: `User ${newUser.nameEng} created` }, { status: 201 });
  } catch (err) {
    console.error("Error creating user:", err);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
