// lib/fit-sizes.ts
import { pageZoom } from "./page-zoom";

// Büyük ekran ölçeği (26.11.2026, app/globals.css): sayfa CSS `zoom` ile büyüyünce görseller de büyük çizilir, ama tarayıcı
// srcset'ten seçerken `sizes` içindeki pikselleri büyütmez (Chromium ve WebKit'te denendi) → görsel bulanık kalır. Bu yardımcı
// `sizes` değerindeki piksel genişliklerini ölçekle çarpar; medya koşulları ((min-width: 1280px) gibi) olduğu gibi kalır,
// çünkü @media gerçek ekran pikseline bakar. vw değerleri değişmez: postcss-viewport-zoom.cjs vw'yi zaten gerçek ekrana dengeliyor.

/** Üst düzey virgüllerden böl (calc(...) içindeki virgüller bölünmez) */
function splitTop(s: string) {
  const out: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of s) {
    if (ch === "(") depth++;
    else if (ch === ")") depth = Math.max(0, depth - 1);
    if (ch === "," && depth === 0) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out;
}

/** "(min-width: 1280px) and (max-width: 2000px) 400px" → ["(min-width: 1280px) and (max-width: 2000px) ", "400px"] */
function splitCondition(entry: string): [string, string] {
  let i = 0;
  const n = entry.length;
  for (;;) {
    while (i < n && /\s/.test(entry[i])) i++;
    const rest = entry.slice(i);
    const kw = /^(and|or|not|only)\b/i.exec(rest);
    if (kw) {
      i += kw[0].length;
      continue;
    }
    if (entry[i] !== "(") break;
    let depth = 0;
    for (; i < n; i++) {
      if (entry[i] === "(") depth++;
      else if (entry[i] === ")" && --depth === 0) {
        i++;
        break;
      }
    }
  }
  return [entry.slice(0, i), entry.slice(i)];
}

/** `sizes` değerindeki piksel genişliklerini z ile çarpar. z ≤ 1 ise değer aynen döner. */
export function scaleSizes(sizes: string, z: number) {
  if (!sizes || !(z > 1)) return sizes;
  return splitTop(sizes)
    .map((entry) => {
      const [cond, value] = splitCondition(entry);
      return cond + value.replace(/(\d*\.?\d+)px\b/g, (_, num) => `${Math.round(parseFloat(num) * z)}px`);
    })
    .join(",");
}

/** Sayfadaki bütün img/source `sizes` değerlerini ölçeğe uydurur; özgün değer data-fit-sizes'ta saklanır (ölçek değişirse yeniden hesaplanır) */
export function fitAllSizes(root: ParentNode = document) {
  const z = pageZoom();
  root.querySelectorAll<HTMLImageElement | HTMLSourceElement>("img[sizes], source[sizes]").forEach((el) => {
    const orig = el.dataset.fitSizes ?? el.getAttribute("sizes") ?? "";
    if (z <= 1 && el.dataset.fitSizes === undefined) return; // ölçek yok, hiç dokunma
    if (el.dataset.fitSizes === undefined) el.dataset.fitSizes = orig;
    const next = scaleSizes(orig, z);
    if (el.getAttribute("sizes") !== next) el.setAttribute("sizes", next);
  });
}
