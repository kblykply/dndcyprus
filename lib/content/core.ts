// lib/content/core.ts
// İçerik yönetimi çekirdeği (26.11.2026): koddaki içerik nesnesi VARSAYILAN kalır; panelde değiştirilen alanlar yol (path) ile
// üstüne yazılır. Saf fonksiyonlar (sunucu, istemci ve testler kullanır).
//  - walkFields: nesnedeki düzenlenebilir alanları çıkarır (yazı, uzun yazı, kalın vurgulu başlık, sayı, görsel)
//  - toMarkup / fromMarkup: JSX başlık ↔ "Akdeniz’de yeni bir **yaşam ritmi.**" (satır sonu = \n)
//  - applyOverrides: varsayılanın kopyasına değişiklikleri uygular (kod değişip yol kaybolduysa sessizce atlar)
import { Fragment, createElement, isValidElement, type ReactElement, type ReactNode } from "react";

export const CONTENT_LOCALES = ["tr", "en", "de", "ru", "pl"] as const;
export type ContentLocale = (typeof CONTENT_LOCALES)[number];
export const LOCALE_LABELS: Record<ContentLocale, string> = { tr: "Türkçe", en: "English", de: "Deutsch", ru: "Русский", pl: "Polski" };

export type FieldKind = "text" | "long" | "rich" | "number" | "image";
export type Field = { path: string; kind: FieldKind; value: string };

/** Düzenlemeye açılmayan teknik anahtarlar (bağlantı, ikon, kimlik, yerleşim değerleri) */
const SKIP_KEYS = new Set(["slug", "icon", "href", "id", "url", "w", "accent", "sortOrder", "category"]);
const IMAGE_RE = /^(\/[^\s]*|https:\/\/[^\s]+)\.(jpe?g|png|webp|avif|gif|svg)(\?.*)?$/i;

export const isImageValue = (v: unknown) => typeof v === "string" && IMAGE_RE.test(v.trim());

/** JSX → işaretli metin: <b>/<strong> → **…**, <br/> → satır sonu; diğer etiketlerin yalnız yazısı alınır */
export function toMarkup(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toMarkup).join("");
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    const inner = toMarkup(el.props.children);
    if (el.type === "b" || el.type === "strong") return inner ? `**${inner}**` : "";
    if (el.type === "br") return "\n";
    return inner;
  }
  return "";
}

/** İşaretli metin → JSX (kalın + satır sonu). Düz metinse yine Fragment döner (başlık tipi ReactNode kalır) */
export function fromMarkup(text: string): ReactElement {
  const lines = String(text).replace(/\r\n?/g, "\n").split("\n");
  const out: ReactNode[] = [];
  lines.forEach((line, li) => {
    if (li) out.push(createElement("br", { key: `br${li}` }));
    const parts = line.split(/\*\*(.+?)\*\*/g);
    parts.forEach((p, i) => {
      if (!p) return;
      out.push(i % 2 ? createElement("b", { key: `b${li}-${i}` }, p) : p);
    });
  });
  return createElement(Fragment, null, ...out);
}

export function walkFields(obj: unknown, prefix = "", out: Field[] = []): Field[] {
  if (obj === null || obj === undefined) return out;
  if (isValidElement(obj)) {
    out.push({ path: prefix, kind: "rich", value: toMarkup(obj as ReactNode) });
    return out;
  }
  if (typeof obj === "string") {
    out.push({ path: prefix, kind: isImageValue(obj) ? "image" : obj.length > 90 ? "long" : "text", value: obj });
    return out;
  }
  if (typeof obj === "number") {
    out.push({ path: prefix, kind: "number", value: String(obj) });
    return out;
  }
  if (Array.isArray(obj)) {
    // [etiket, değer] çiftleri gibi kısa diziler de dahil: her öğe kendi yolunu alır
    obj.forEach((v, i) => walkFields(v, prefix ? `${prefix}.${i}` : String(i), out));
    return out;
  }
  if (typeof obj === "object") {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      if (SKIP_KEYS.has(k) || typeof v === "function") continue;
      walkFields(v, prefix ? `${prefix}.${k}` : k, out);
    }
  }
  return out;
}

/** Yoldaki değeri okur (yoksa undefined) */
export function getAt(obj: unknown, path: string): unknown {
  let cur: unknown = obj;
  for (const seg of path.split(".")) {
    if (cur === null || cur === undefined || typeof cur !== "object" || isValidElement(cur)) return undefined;
    cur = (cur as Record<string, unknown>)[seg];
  }
  return cur;
}

function isPlainObject(v: object) {
  const proto = Object.getPrototypeOf(v);
  return proto === null || proto.constructor?.name === "Object";
}

/** Düz nesne/dizi kopyası; React öğeleri ve diğer değerler aynen paylaşılır */
function cloneData<T>(v: T): T {
  if (Array.isArray(v)) return v.map(cloneData) as T;
  if (v && typeof v === "object" && !isValidElement(v) && isPlainObject(v)) {
    const o: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v as Record<string, unknown>)) o[k] = cloneData(x);
    return o as T;
  }
  return v;
}

/** Varsayılanla aynı türde değer: JSX alanına işaretli metin JSX olarak, sayı alanına sayı olarak yazılır */
export function coerceLike(original: unknown, value: string): unknown {
  if (isValidElement(original)) return fromMarkup(value);
  if (typeof original === "number") {
    const n = Number(String(value).replace(",", "."));
    return Number.isFinite(n) ? n : original;
  }
  return value;
}

export function applyOverrides<T>(base: T, overrides: Record<string, string>): T {
  const copy = cloneData(base);
  for (const [path, value] of Object.entries(overrides)) {
    const segs = path.split(".");
    let parent: unknown = copy;
    for (const seg of segs.slice(0, -1)) {
      if (parent === null || typeof parent !== "object" || isValidElement(parent)) {
        parent = undefined;
        break;
      }
      parent = (parent as Record<string, unknown>)[seg];
    }
    const last = segs[segs.length - 1];
    if (!parent || typeof parent !== "object" || isValidElement(parent) || !(last in (parent as object))) continue; // yol artık yok
    const original = (parent as Record<string, unknown>)[last];
    if (original !== null && typeof original === "object" && !isValidElement(original)) continue; // yalnız yaprak alanlar
    (parent as Record<string, unknown>)[last] = coerceLike(original, value);
  }
  return copy;
}

/** Alan yolundan okunur Türkçe ad: "neden.items.1.h" → "Madde 2 · Kart başlığı" */
const KEY_LABELS: Record<string, string> = {
  kicker: "Üst başlık", title: "Başlık", lead: "Giriş metni", p: "Metin", h: "Kart başlığı", k: "Etiket", cta: "Düğme yazısı",
  q: "Soru", a: "Cevap", img: "Görsel", sub: "Alt yazı", name: "Ad", label: "Etiket", motto: "Slogan", note: "Dipnot", t: "Saat",
  ribbon: "Rozet görseli", text: "Metin", b: "Kalın kısım", rest: "Devamı", n: "Sayı", suffix: "Sayının eki (+, %)", pre: "Sayıdan önce",
  post: "Sayıdan sonra", imageAlt: "Görsel açıklaması (erişilebilirlik)", imageTag: "Görsel etiketi", videoTitle: "Video başlığı",
  brand: "Marka satırı", prev: "Önceki düğmesi", next: "Sonraki düğmesi", pause: "Durdur düğmesi", play: "Oynat düğmesi", all: "Tümü bağlantısı",
  awardsProject: "Ödül bölümü proje adı", homesProject: "Ödül bölümü şirket adı", role: "Görev", bio: "Kısa tanıtım", outlet: "Yayın",
  excerpt: "Özet", date: "Tarih", cover: "Kapak görseli", photo: "Fotoğraf", upto: "Sayının yanındaki yazı", months: "Ay yazısı",
  tl: "TL kartı", neo: "NeoCity kartı", strip: "Ödül şeridi", kartlar: "Ödül kartları", press: "Basın", faq: "S.S.S.",
};
const LIST_LABELS: Record<string, string> = {
  items: "Madde", slides: "Slayt", steps: "Adım", more: "Ek paragraf", zeros: "Sıfır maddesi", tags: "Etiket", highlights: "Öne çıkan madde",
  rules: "Kural", chips: "Rozet", people: "Kişi", dist: "Mesafe", dl: "Bilgi",
};

export function fieldLabel(path: string): string {
  const segs = path.split(".");
  const parts: string[] = [];
  segs.forEach((s, i) => {
    if (/^\d+$/.test(s)) {
      const listKey = segs[i - 1];
      parts.push(`${LIST_LABELS[listKey] ?? "Öğe"} ${Number(s) + 1}`);
    } else if (!/^\d+$/.test(segs[i + 1] ?? "")) {
      parts.push(KEY_LABELS[s] ?? s);
    }
  });
  return parts.join(" · ") || path;
}
