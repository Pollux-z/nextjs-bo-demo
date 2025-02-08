import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { to, subject, textEmail } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "notificationboweb@gmail.com",
        pass: "mfxmwhwlbperetbb", // ใช้ App Password แทนรหัสผ่านบัญชี Google
      },
    });

    const mailOption = {
      from: "notificationboweb@gmail.com",
      to: to,
      subject: subject,
      html: textEmail,
    };

    await transporter.sendMail(mailOption);

    return NextResponse.json(
      { message: "Email send Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error send email" }, { status: 500 });
  }

}
