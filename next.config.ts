import type { NextConfig } from "next";

// Dil öneki olmayan eski adresler ve eski WordPress/broşür bağlantıları → kalıcı (308) yönlendirme
const LEGACY_REDIRECTS: [source: string, destination: string][] = [
  ["/contact", "/tr/contact"],
  ["/about", "/tr/about"],
  ["/projects", "/tr/projects"],
  ["/team", "/tr/team"],
  ["/press", "/tr/press"],
  ["/privacy", "/tr/privacy"],
  ["/terms", "/tr/terms"],
  ["/mariachi", "/tr/mariachi"],
  ["/lagoon-verde", "/tr/lagoon-verde"],
  ["/perla", "/tr/perla"],
  ["/perla-ii", "/tr/perla-ii"],
  ["/la-joya", "/tr/la-joya"],
  ["/gecitkale", "/tr/projects"], // Geçitkale kaldırıldı (19 Ekim 2026)
  ["/projects/perla2", "/tr/perla-ii"],
  ["/brochure/brochure.pdf", "/lagoonbrotr.pdf"],
  ["/wp-content/uploads/LAGOON-DIJITAL-KATALOG.pdf", "/lagoonbrotr.pdf"],
];

const nextConfig: NextConfig = {
  // Birden çok kök düzen var: eşleşmeyen adresler için app/global-not-found.tsx
  experimental: { globalNotFound: true },
  images: {
    // Photographic backgrounds use 65; plans and text-heavy images keep 75.
    qualities: [65, 75],
    // AVIF önce (aynı kalitede WebP'den belirgin küçük), desteklemeyen tarayıcıya WebP
    formats: ["image/avif", "image/webp"],
    // telefon hero kesitleri için 1440 basamağı; en büyük 2560 (3840 genişlik ekranda fark etmiyor, boyutu ikiye katlıyordu)
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2560],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",

      },
      // YouTube kapakları siteden (optimize) iner: telefonda küçük, çerez onayından önce YouTube'a istek yok
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },

  // "X-Powered-By: Next.js" başlığı gönderilmez
  poweredByHeader: false,

  async headers() {
    // Only generated content-addressed assets get immutable caching. Existing
    // brochure/menu URLs can still be updated without stale year-long caches.
    return [{
      // Güvenli varsayılan başlıklar (HSTS'yi Vercel ekliyor). Tam CSP yok: GA4 / Meta / Clarity / YouTube /
      // harita / 360° tur kaynakları canlı analitikle doğrulanmadan zorunlu kılınırsa ölçüm ve gömmeler kırılabilir.
      // frame-ancestors yalnız kendi alan adı: 360° tur iframe'i aynı kökenden geliyor.
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
      ],
    }, {
      source: "/optimized/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }, {
      source: "/admin/:path*",
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }];
  },

  async redirects() {
    return [
      ...LEGACY_REDIRECTS.map(([source, destination]) => ({ source, destination, permanent: true })),
      // Geçitkale sayfası sitenin her yerinden kaldırıldı (kullanıcı, 19 Ekim 2026): eski bağlantılar Projeler sayfasına.
      // Geçici (307): proje ileride geri gelirse tarayıcılar yönlendirmeyi kalıcı olarak hatırlamasın.
      ...(["tr", "en", "de", "ru", "pl"] as const).map((l) => ({ source: `/${l}/gecitkale`, destination: `/${l}/projects`, permanent: false })),
    ];
  },
};

export default nextConfig;
