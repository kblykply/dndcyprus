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
  ["/gecitkale", "/tr/gecitkale"],
  ["/projects/perla2", "/tr/perla-ii"],
  ["/brochure/brochure.pdf", "/lagoonbrotr.pdf"],
  ["/wp-content/uploads/LAGOON-DIJITAL-KATALOG.pdf", "/lagoonbrotr.pdf"],
];

const nextConfig: NextConfig = {
  images: {
    // Photographic backgrounds use 65; plans and text-heavy images keep 75.
    qualities: [65, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",

      },

    ],
  },

  async headers() {
    // Only generated content-addressed assets get immutable caching. Existing
    // brochure/menu URLs can still be updated without stale year-long caches.
    return [{
      source: "/optimized/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }, {
      source: "/admin/:path*",
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }];
  },

  async redirects() {
    return LEGACY_REDIRECTS.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
