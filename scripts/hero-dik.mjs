// Telefon (dik ekran) için hero kesitleri. Çerçeve fotoğrafı "cover" ile gösterdiği için dik ekranda yalnız ortası
// görünüyor; o bölgenin kesiti (aynı yükseklik, aynı ölçek, aynı pikseller) iner, tam boy JPEG inmez.
// Çerçeve en/boy üst sınırı (max-aspect-ratio: 3/5) ekranlarda: full 0,77 (min-height 78vh), compact 1,07 (56vh).
// short (40vh) çerçevede görselin neredeyse tamamı görünüyor, kesit yok.
// Yeni hero görseli eklenince LIST'e ekleyip `node scripts/hero-dik.mjs` çalıştırın: kesitleri ve lib/azure/hero-dik.ts'i yazar.
import { writeFileSync } from "node:fs";
import sharp from "sharp";

const RATIO = { full: 0.836, compact: 1.12 };
// [görsel, çerçeve boyu, object-position x (0–1)]
const LIST = [
  ["/azure/lv-5.jpg", "full", 0.5],
  ["/azure/mb-6.jpg", "full", 0.5],
  ["/azure/p1-7.jpg", "full", 0.5],
  ["/perla-ii/3.jpg", "full", 0.5],
  ["/azure/lj-2.jpg", "full", 0.5],
  ["/azure/lv-7.jpg", "compact", 0.5],
  ["/azure/about-uu.jpg", "compact", 0.5],
  ["/gecitkaleimage.jpg", "compact", 0.5],
  ["/neocity/hero.jpg", "full", 0.5],
];

const rows = [];
for (const [src, size, x] of LIST) {
  const { width, height } = await sharp(`public${src}`).metadata();
  let w = Math.round(height * RATIO[size]);
  if (x === 0.5 && (width - w) % 2) w += 1; // tam ortalansın: yarım piksel kayma kenarlarda fark bırakıyordu
  const left = Math.round((width - w) * x); // object-position x ile aynı bölge
  const out = src.replace(/\.(jpe?g|png|webp)$/i, "-dik.jpg");
  await sharp(`public${src}`).extract({ left, top: 0, width: w, height }).withMetadata().jpeg({ quality: 95, mozjpeg: true }).toFile(`public${out}`);
  rows.push(`  "${src}": { src: "${out}", w: ${w}, h: ${height} },`);
  console.log(src, "→", out, `${w}×${height}`);
}
writeFileSync("lib/azure/hero-dik.ts", `// scripts/hero-dik.mjs üretir; elle düzenlemeyin.
// Dik telefon ekranı için hero görselinin görünen orta kesiti (PageHero / HomeHero).
export const HERO_DIK: Record<string, { src: string; w: number; h: number }> = {
${rows.join("\n")}
};
`);
