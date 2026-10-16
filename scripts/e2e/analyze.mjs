import { readFileSync, existsSync, writeFileSync } from "node:fs";
const dir = process.argv[2];
const vps = ["desktop", "tablet", "mobile"];
const issues = []; const links = new Set();
for (const vp of vps) {
  const f = `${dir}/result-${vp}.json`; if (!existsSync(f)) continue;
  for (const r of JSON.parse(readFileSync(f))) {
    (r.links || []).forEach((l) => links.add(l));
    const add = (kind, d) => issues.push({ vp, route: r.route, kind, d });
    if (r.navError) add("nav", r.navError);
    if (r.overflowX > 0) add("yatay-taşma", r.overflowX + "px");
    if (r.sticking?.length) add("ekrandan-taşan", r.sticking.slice(0, 4));
    if (r.broken?.length) add("kırık-görsel", r.broken.slice(0, 4));
    if (r.pending?.length) add("yüklenmeyen-görsel", r.pending.slice(0, 3));
    if (r.noAlt?.length) add("alt-yok", r.noAlt.slice(0, 3));
    if (vp === "desktop" && r.heads?.length) add("başlık>2satır", r.heads);
    if (vp === "mobile" && r.heads?.some((h) => h.lines > 4)) add("başlık>4satır(mobil)", r.heads.filter((h) => h.lines > 4));
    if (r.dupIds?.length) add("tekrar-id", r.dupIds);
    if (r.emptyLinks?.length) add("boş-bağlantı", r.emptyLinks);
    if (r.h1 !== 1) add("h1-sayısı", r.h1);
    if (r.clsLoad > 0.05) add("CLS", r.clsLoad);
    if (r.textOverflow?.length) add("metin-taşması", r.textOverflow);
    if (r.console?.length) add("konsol", r.console.slice(0, 3));
    if (r.exceptions?.length) add("istisna", r.exceptions.slice(0, 3));
    if (r.http?.length) add("http>=400", r.http.slice(0, 4));
    if (r.failed?.length) add("istek-başarısız", r.failed.slice(0, 3));
    const want = r.route.split("/")[1]; if (r.lang && r.lang !== want) add("lang", r.lang + " ≠ " + want);
  }
}
const byKind = {};
for (const i of issues) (byKind[i.kind] ||= []).push(i);
for (const [k, list] of Object.entries(byKind)) {
  console.log(`\n## ${k} (${list.length})`);
  for (const i of list.slice(0, 40)) console.log(`- [${i.vp}] ${i.route}: ${JSON.stringify(i.d).slice(0, 260)}`);
}
writeFileSync(`${dir}/links.json`, JSON.stringify([...links].sort(), null, 1));
console.log(`\nbağlantı: ${links.size}`);
