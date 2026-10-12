// app/admin/logout/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/admin/login", req.url));

  // Cookie'yi net şekilde sil
  res.cookies.delete("admin_session");

  return res;
}
