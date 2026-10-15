import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

// Preserve the full zoom resolution. Run before each build so replacing the
// original weekly menu automatically creates a fresh URL; the PNG remains intact.
const original = await readFile("public/qr/image.png");
const output = await sharp(original).webp({ quality: 90, effort: 6 }).toBuffer();
const avif = await sharp(original).avif({ quality: 80, effort: 6, chromaSubsampling: "4:4:4" }).toBuffer();
const { width, height } = await sharp(output).metadata();
const hash = createHash("sha256").update(output).digest("hex").slice(0, 12);
const name = `menu.${hash}.webp`;
const avifName = `menu.${createHash("sha256").update(avif).digest("hex").slice(0, 12)}.avif`;
await mkdir("public/optimized", { recursive: true });
await writeFile(`public/optimized/${name}`, output);
await writeFile(`public/optimized/${avifName}`, avif);
await writeFile("lib/menu-asset.json", JSON.stringify({ src: `/optimized/${name}`, avifSrc: `/optimized/${avifName}`, width, height }, null, 2) + "\n");
console.log(`QR menu, original resolution: ${original.length} → WebP ${output.length}; AVIF ${avif.length} bytes`);
