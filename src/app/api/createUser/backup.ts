import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
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
      userCreate,
    } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();
    await User.create({
      userCode,
      nameTh,
      nameEng,
      employeeEmail,
      password: hashedPassword,
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
      userCreate,
    });

    return NextResponse.json({ message: `User ${nameEng} created` }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "An error occured while registrating the user." },
      { status: 500 }
    );
  }
}
