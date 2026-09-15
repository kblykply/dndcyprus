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
  ["/dndturkiye", "/tr/dndturkiye"],
  ["/projects/perla2", "/tr/perla-ii"],
  ["/brochure/brochure.pdf", "/lagoonbrotr.pdf"],
  ["/wp-content/uploads/LAGOON-DIJITAL-KATALOG.pdf", "/lagoonbrotr.pdf"],
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",

      },

    ],
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
