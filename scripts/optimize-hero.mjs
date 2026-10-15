import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";

const original = "/lagoon-verde/1.jpg";
const avif = [];
await fs.mkdir("public/optimized", { recursive: true });
for (const width of [480, 640, 750, 828, 1080, 1200, 1536]) {
  const { data, info } = await sharp("public" + original).rotate().resize({ width, withoutEnlargement: true }).avif({ quality: 50, effort: 6 }).toBuffer({ resolveWithObject: true });
  const hash = createHash("sha256").update(data).digest("hex").slice(0, 12);
  const file = `home-hero-${info.width}.${hash}.avif`;
  await fs.writeFile("public/optimized/" + file, data);
  avif.push({ src: "/optimized/" + file, width: info.width, height: info.height, bytes: data.length });
}
await fs.writeFile("lib/home-hero-asset.json", JSON.stringify({ original, avif }, null, 2) + "\n");
console.log("Home hero AVIF: " + avif.map((asset) => `${asset.width}px / ${asset.bytes} bytes`).join(", "));
