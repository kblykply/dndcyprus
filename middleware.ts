import { NextResponse, type NextRequest } from "next/server";

const LOCALE_COOKIE = "locale";
const SUPPORTED = ["tr", "en"] as const;
const DEFAULT: (typeof SUPPORTED)[number] = "tr";

function pickLocale(req: NextRequest): "tr" | "en" {
  // 1) Remember user choice
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  if (saved === "en" || saved === "tr") return saved;

  // 2) Detect from browser
  const al = (req.headers.get("accept-language") || "").toLowerCase();
  if (al.includes("en")) return "en";
  if (al.includes("tr")) return "tr";
  return DEFAULT;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  /* ---------------- ADMIN BASIC AUTH ---------------- */
  if (pathname.startsWith("/admin")) {
    const basicAuth = req.headers.get("authorization");
    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    // Güvenlik: env set edilmemişse admin paneli açılmasın
    if (!ADMIN_USER || !ADMIN_PASSWORD) {
      return new NextResponse("Admin credentials are not configured.", {
        status: 500,
      });
    }

    if (basicAuth) {
      const authValue = basicAuth.split(" ")[1] ?? "";
      const [user, password] = atob(authValue).split(":");

      if (user === ADMIN_USER && password === ADMIN_PASSWORD) {
        // Doğru kullanıcı/şifre → devam
        return NextResponse.next();
      }
    }

    // Yanlış / eksik → basic auth popup
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Area"',
      },
    });
  }

  /* ---------------- LOCALE REDIRECT ---------------- */
  // Don’t interfere with /en or assets/api
  if (
    pathname.startsWith("/en") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.[a-zA-Z0-9]+$/)
  ) {
    return NextResponse.next();
  }

  // Only act on home
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

// Middleware hangi path'lerde çalışsın:
export const config = {
  matcher: ["/", "/admin/:path*"],
};
