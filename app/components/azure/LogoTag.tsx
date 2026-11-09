/**
 * Fotoğraf üstündeki logo etiketi (kullanıcı: "kullandığın bütün görsellere logoları koy, üst tarafta etiket gibi";
 * "etiket logo kadar olmalı", "boyları eşit olmalı"). Koyu cam etiket her logoda aynı ölçüde; logo içine sığdırılır
 * (dosya kenar boşlukları kırpılmış kopyalar: public/logos/web/tag). Varsayılan sağ üst köşe; inline: bulunduğu satırın
 * içinde (proje kartlarında etiketlerin yanında). keepColor: logonun kendi renkleri (DND).
 */
const TRIM: Record<string, string> = {
  "/logos/web/neocity.webp": "/logos/web/tag/neocity.webp",
  "/logos/web/neocity-white.webp": "/logos/web/tag/neocity.webp",
  "/logos/web/lagoon.webp": "/logos/web/tag/lagoon.webp",
  "/logos/web/lajoya.webp": "/logos/web/tag/lajoya.webp",
  "/logos/web/mariachi.webp": "/logos/web/tag/mariachi.webp",
};

// görsel boyutları (yüklenmeden önce yer ayrılsın, etiket genişliği zıplamasın)
const DIMS: Record<string, [number, number]> = {
  "/logos/web/tag/neocity.webp": [1523, 233],
  "/logos/web/tag/lagoon.webp": [425, 212],
  "/logos/web/tag/lajoya.webp": [510, 184],
  "/logos/perla.svg": [1718, 1389],
  "/logos/perlaii.svg": [2065, 1628],
  "/logos/web/tag/mariachi.webp": [326, 240],
  "/DND-LOGO-LIGHT.svg": [418, 180],
  "/azure/venues/ulfet-beach-logo.png": [854, 420],
  "/azure/venues/ulfet-shu-logo.png": [366, 192],
};

// dik oranlı, ince yazılı logolar yatay hapta küçük kalıyordu ("okunmuyor"): yuvarlak ve büyük etikette (kullanıcı, 9 Kasım 2026)
const ROUND = new Set(["/logos/web/mariachi.webp", "/logos/perla.svg", "/logos/perlaii.svg"]);

export default function LogoTag({ src, at = "tr", inline, keepColor, className = "" }: { src: string; at?: "tr" | "tl"; inline?: boolean; keepColor?: boolean; className?: string }) {
  const file = TRIM[src] ?? src;
  const dims = DIMS[file];
  return (
    <span className={`az-logotag ${inline ? "inline" : at}${keepColor ? " color" : ""}${ROUND.has(src) ? " round" : ""} ${className}`.trim()} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={file} alt="" width={dims?.[0]} height={dims?.[1]} loading="lazy" decoding="async" />
    </span>
  );
}
