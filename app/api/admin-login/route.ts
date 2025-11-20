// app/api/admin-login/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  const nextPath = String(formData.get("next") || "/admin/leads");

  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
    // nextPath /admin/leads vb. olacak
    const url = new URL(nextPath || "/admin/leads", req.nextUrl.origin);
    const res = NextResponse.redirect(url);

    // basit session cookie
    res.cookies.set("admin_session", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 saat
    });

    return res;
  }

  const url = new URL("/admin/login", req.nextUrl.origin);
  url.searchParams.set("error", "1");
  if (nextPath) url.searchParams.set("next", nextPath);
  return NextResponse.redirect(url);
}
