// app/api/admin-login/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSession,
  safeAdminNext,
  safeEqual,
} from "../../../lib/admin-session";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  const nextPath = safeAdminNext(String(formData.get("next") || ""));

  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  const valid =
    !!ADMIN_USER &&
    !!ADMIN_PASSWORD &&
    safeEqual(username, ADMIN_USER) &&
    safeEqual(password, ADMIN_PASSWORD);

  const session = valid ? await createAdminSession() : null;

  if (session) {
    // 303: POST sonrası hedefe GET ile git
    const res = NextResponse.redirect(new URL(nextPath, req.nextUrl.origin), 303);
    res.cookies.set(ADMIN_SESSION_COOKIE, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE,
    });
    return res;
  }

  // Deneme-yanılmayı yavaşlat
  await new Promise((r) => setTimeout(r, 800));

  const url = new URL("/admin/login", req.nextUrl.origin);
  url.searchParams.set("error", "1");
  url.searchParams.set("next", nextPath);
  return NextResponse.redirect(url, 303);
}
