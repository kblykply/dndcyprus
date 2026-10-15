import menu from "@/lib/menu-asset.json";
import { SITE_URL } from "@/lib/seo";
import { siteMetadata } from "@/lib/site-metadata";

export const dynamic = "force-static";
export const revalidate = 86400;

const title = "Joy Cafe Haftalık Menü";
const description = "La Joya Resort & Residences Joy Cafe haftalık yemek menüsü.";
const originalImage = `${SITE_URL}/qr/image.png?v=20261009`;
const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]!));

// This image-only document has no client state. Deliver its native picture and
// metadata directly, preserving zoom and format fallback without React hydration.
export function GET() {
  const google = siteMetadata.verification?.google;
  const facebook = siteMetadata.other?.["facebook-domain-verification"];
  const html = `<!doctype html><html lang="tr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title><meta name="description" content="${escape(description)}">
<link rel="canonical" href="${SITE_URL}/tr/qr">
${typeof google === "string" ? `<meta name="google-site-verification" content="${escape(google)}">` : ""}
${typeof facebook === "string" ? `<meta name="facebook-domain-verification" content="${escape(facebook)}">` : ""}
<meta property="og:title" content="${title}"><meta property="og:description" content="${escape(description)}">
<meta property="og:url" content="${SITE_URL}/tr/qr"><meta property="og:locale" content="tr_TR"><meta property="og:type" content="website">
<meta property="og:image" content="${originalImage}"><meta property="og:image:width" content="1280"><meta property="og:image:height" content="1280"><meta property="og:image:alt" content="${title}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${originalImage}">
<link rel="icon" href="/favicon.ico" sizes="256x256" type="image/x-icon">
<link rel="preload" href="${menu.avifSrc}" as="image" type="image/avif" fetchpriority="high">
<style>body{margin:0;background:#f5f4ef}.qr-menu{min-height:100svh}.qr-menu-image{display:block;width:100%;height:auto;max-width:1600px;margin-inline:auto}</style>
</head><body><main class="qr-menu"><picture><source type="image/avif" srcset="${menu.avifSrc}"><img class="qr-menu-image" src="${menu.src}" width="${menu.width}" height="${menu.height}" fetchpriority="high" decoding="async" alt="Joy Cafe haftalık menüsü: Pazartesiden pazara günlük yemekler, kişi başı 280 TL. Sipariş: +90 548 889 03 63."></picture></main></body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
