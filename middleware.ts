// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "./lib/admin-session";

const LOCALE_COOKIE = "locale";

const SUPPORTED = ["tr", "en"] as const;
const DEFAULT: (typeof SUPPORTED)[number] = "tr";

function pickLocale(req: NextRequest): "tr" | "en" {
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  if (saved === "en" || saved === "tr") return saved;

  // Accept-Language sırası/q değeri önemlidir: "tr-TR,tr;q=0.9,en;q=0.8" Türkçe tercih eder.
  // Eskiden başlıkta herhangi bir yerde "en" geçmesi /en'e yolluyordu.
  const prefs = (req.headers.get("accept-language") || "")
    .toLowerCase()
    .split(",")
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { lang: tag.split("-")[0], q: q ? Number(q.slice(2)) || 0 : 1, i };
    })
    .filter((p) => p.lang && p.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i);
  for (const { lang } of prefs) {
    if (lang === "tr" || lang === "en") return lang;
  }
  return DEFAULT;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  /* ---------------- ADMIN GUARD ---------------- */
  if (pathname.startsWith("/admin")) {
    // Eskiden çerezin yalnızca varlığına bakılıyordu; artık imza doğrulanıyor.
    const isLoggedIn = await verifyAdminSession(req.cookies.get(ADMIN_SESSION_COOKIE)?.value);

    if (pathname.startsWith("/admin/login") || pathname.startsWith("/admin/logout")) {
      if (pathname.startsWith("/admin/login") && isLoggedIn) {
        const url = req.nextUrl.clone();
        url.pathname = "/admin/leads";
        url.search = "";
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    if (!isLoggedIn) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.search = "";
      loginUrl.searchParams.set("next", pathname);
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete(ADMIN_SESSION_COOKIE);
      return res;
    }

    return NextResponse.next();
  }

  /* ---------------- ROOT → /tr veya /en ---------------- */
  // "/" eskiden içerik veriyordu ve /en ile aynıydı (yinelenen içerik).
  if (pathname === "/") {
    const locale = pickLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    const res = NextResponse.redirect(url);
    if (locale === "en") {
      res.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    }
    return res;
  }

  return NextResponse.next();
}

export const config = {
  // _next, api ve uzantılı dosyalar (pdf, jpg, tours/…/index.html) hariç tüm sayfalar
  matcher: ["/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)"],
};
