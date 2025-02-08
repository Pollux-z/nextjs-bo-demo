import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token

    // ตรวจสอบสิทธิ์การเข้าถึง /admin
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (token?.role !== "Admin") {
        return NextResponse.redirect(new URL("/", req.url)); // Redirect หากไม่ใช่ Admin
      }
    }

    // ตรวจสอบสิทธิ์การเข้าถึง /users/internalCharge
    if (req.nextUrl.pathname === "/users/internalCharge") {
      if (!token || (token.role !== "Admin" && token.role !== "Project Manager")) {
        return NextResponse.redirect(new URL("/", req.url)); // เฉพาะ Admin หรือ Project Manager
      }
    }

    if (req.nextUrl.pathname === "/users/project/:path*") {
      if (!token || (token.role === "User" )) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // ผู้ใช้ต้องล็อกอินเสมอ
    },
  }
);

export const config = {
  matcher: ["/users/:path*", "/admin/:path*", "/"],
};


// export { default } from "next-auth/middleware"

// export const config = { matcher: ["/users/:path*", "/admin/:path*", "/"] }
