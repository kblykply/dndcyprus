import { readFileSync, writeFileSync } from "node:fs";
const dir = process.argv[2]; const base = process.argv[3];
const links = JSON.parse(readFileSync(`${dir}/links.json`));
const bad = [];
let n = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (links.length) {
    const u = links.shift(); n++;
    const url = base + new URL(u).pathname + new URL(u).search;
    try {
      const r = await fetch(url, { redirect: "manual" });
      if (r.status !== 200) bad.push(`${r.status} ${new URL(u).pathname}${r.headers.get("location") ? " → " + r.headers.get("location") : ""}`);
    } catch (e) { bad.push(`ERR ${u} ${e}`); }
  }
}));
console.log(`denetlenen: ${n}, sorunlu: ${bad.length}`); bad.sort().forEach((x) => console.log(x));
writeFileSync(`${dir}/links-bad.json`, JSON.stringify(bad, null, 1));
