import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Notification from "../../../../models/notificaiton";
import { TZDate } from "@date-fns/tz";

export async function POST(req: Request) {
  try {
    const { title, userRequest, userReceive, message, typeRequest, read } =
      await req.json();

    const currentDate = new Date();

    const timestamp = new TZDate(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      currentDate.getHours() + 7,
      currentDate.getMinutes(),
      currentDate.getSeconds(),
      currentDate.getMilliseconds(),
      "Asia/Bangkok"
    );

    await connectMongoDB();

    await Notification.create({
      title,
      userRequest,
      userReceive,
      typeRequest,
      message,
      read,
      timestamp,
    });
    return NextResponse.json(
      { message: "Notification created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred while creating the notification" },
      { status: 500 }
    );
  }
}
