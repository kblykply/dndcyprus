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
  "/logos/web/perla.webp": "/logos/web/tag/perla.webp",
  "/logos/web/perlaii.webp": "/logos/web/tag/perlaii.webp",
  "/logos/web/mariachi.webp": "/logos/web/tag/mariachi.webp",
};

export default function LogoTag({ src, at = "tr", inline, keepColor, className = "" }: { src: string; at?: "tr" | "tl"; inline?: boolean; keepColor?: boolean; className?: string }) {
  return (
    <span className={`az-logotag ${inline ? "inline" : at}${keepColor ? " color" : ""} ${className}`.trim()} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={TRIM[src] ?? src} alt="" loading="lazy" decoding="async" />
    </span>
  );
}
