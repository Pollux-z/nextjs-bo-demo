import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcrypt";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    await connectMongoDB();

    // Validate and convert the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const user = await User.aggregate([
      { 
        $match: { _id: new mongoose.Types.ObjectId(id) } 
      },
      {
        $lookup: {
          from: "timeoffs",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [{ $toObjectId: "$employee" }, "$$userId"] },
                  ],
                },
              },
            },
          ],
          as: "timeOffRecords", // Changed from timeOffRecords to sickLeaveRecords
        },
      },
      {
        $lookup: {
          from: "topups", // Name of the topup collection
          localField: "_id", // Field in the users collection
          foreignField: "employee", // Field in the topup collection
          as: "topupRecords" // Output array field to hold the joined data
        }
      },
    ]);

    if (!user || user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: user[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}

// export async function GET(req, { params }) {
//   const { id } = params;
//   await connectMongoDB();
//   const user = await User.findOne({ _id: id });
//   return NextResponse.json({ user }, { status: 200 });
// }

export async function PUT(req, { params }) {
  const { id } = params;
  const user = await User.findOne({ _id: id });
  const passwordUser = user?.password;
  const {
    nameTh,
    nameEng,
    nickNameTh,
    employeeProfile,
    employeeTitle,
    employeeTeams,
    employeeTel,
    employeeEmail,
    employeeBirthDay,
    startDate,
    endDate,
    teamLeader,
    vacationLeave,
    sickLeave,
    personalLeave,
    remark,
    password,
    role,
    userUpdated,
  } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);
  await connectMongoDB();
  // *Check input password for update data
  // *If not input password not update
  // *If password update same old password not update
  if (!password || passwordUser === password) {
    await User.findByIdAndUpdate(id, {
      nameTh,
      nameEng,
      nickNameTh,
      employeeProfile,
      employeeTitle,
      employeeTeams,
      employeeTel,
      employeeEmail,
      employeeBirthDay,
      startDate,
      endDate,
      teamLeader,
      vacationLeave,
      sickLeave,
      personalLeave,
      remark,
      role,
      userUpdated,
    });
    return NextResponse.json(
      { message: "Completed update announcement" },
      { status: 200 }
    );
  } else {
    await User.findByIdAndUpdate(id, {
      nameTh,
      nameEng,
      nickNameTh,
      employeeProfile,
      employeeTitle,
      employeeTeams,
      employeeTel,
      employeeEmail,
      employeeBirthDay,
      startDate,
      endDate,
      teamLeader,
      vacationLeave,
      sickLeave,
      personalLeave,
      remark,
      password: hashedPassword,
      role,
      userUpdated,
    });
    return NextResponse.json(
      { message: "Completed update announcement" },
      { status: 200 }
    );
  }
}
