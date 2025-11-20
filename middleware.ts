// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

const LOCALE_COOKIE = "locale";
const ADMIN_SESSION_COOKIE = "admin_session";

const SUPPORTED = ["tr", "en"] as const;
const DEFAULT: (typeof SUPPORTED)[number] = "tr";

function pickLocale(req: NextRequest): "tr" | "en" {
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  if (saved === "en" || saved === "tr") return saved;

  const al = (req.headers.get("accept-language") || "").toLowerCase();
  if (al.includes("en")) return "en";
  if (al.includes("tr")) return "tr";
  return DEFAULT;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const session = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const isLoggedIn = !!session; // sadece cookie varsa logged in

  /* ---------------- ADMIN GUARD ---------------- */
  if (pathname.startsWith("/admin")) {
    // login ve logout sayfaları özel:
    if (
      pathname.startsWith("/admin/login") ||
      pathname.startsWith("/admin/logout")
    ) {
      // login sayfasına zaten login olmuşken gelirsen leads'e at
      if (pathname.startsWith("/admin/login") && isLoggedIn) {
        const url = req.nextUrl.clone();
        url.pathname = "/admin/leads";
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    // diğer tüm /admin sayfaları için login zorunlu
    if (!isLoggedIn) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  /* ---------------- LOCALE REDIRECT ---------------- */
  if (
    pathname.startsWith("/en") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.[a-zA-Z0-9]+$/)
  ) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    const locale = pickLocale(req);
    if (locale === "en") {
      const url = req.nextUrl.clone();
      url.pathname = "/en";
      const res = NextResponse.redirect(url);
      res.cookies.set(LOCALE_COOKIE, locale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*"],
};
