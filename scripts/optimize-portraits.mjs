import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

// Keep the original portraits and transparency. Content-derived names let the
// generated versions use immutable caching without making future updates stale.
const portraits = ["aynurhanimhome.PNG", "ozanbeycropped.png"];
const manifest = {};
await mkdir("public/optimized", { recursive: true });
for (const file of portraits) {
  const original = await readFile(`public/${file}`);
  const output = await sharp(original).rotate().webp({ quality: 85, alphaQuality: 100, effort: 6 }).toBuffer();
  const hash = createHash("sha256").update(output).digest("hex").slice(0, 12);
  const name = `${file.replace(/\.[^.]+$/, "")}.${hash}.webp`;
  await writeFile(`public/optimized/${name}`, output);
  manifest[`/${file}`] = `/optimized/${name}`;
  console.log(`${file}: ${original.length} → ${output.length} bytes`);
}
await writeFile("lib/portrait-assets.json", JSON.stringify(manifest, null, 2) + "\n");
