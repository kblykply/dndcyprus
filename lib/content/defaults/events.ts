// lib/content/defaults/events.ts
// "Etkinlikler" (Haberler sayfası) KOD İÇİNDEKİ varsayılan listesi: lib/azure/pages.tsx'teki 5 dil sırayla birleştirilir.
// Panelde liste ilk değiştiğinde veritabanına aktarılır; sonra site listeyi veritabanından okur (lib/content/store.ts).
// Dile göre değişen: tarih yazısı, başlık, metin. Ortak: görsel, bağlantı.
import { PAGES } from "@/lib/azure/pages";
import { CONTENT_LOCALES, slugify, type ContentLocale } from "../core";

export type EventRecord = {
  id: string;
  img: string;
  href?: string;
  date: Record<ContentLocale, string>;
  h: Record<ContentLocale, string>;
  p: Record<ContentLocale, string>;
};
export type EventItem = { date: string; h: string; p: string; img: string; href?: string };

const per = (i: number, k: "date" | "h" | "p") =>
  Object.fromEntries(CONTENT_LOCALES.map((l) => [l, PAGES[l].events.items[i]?.[k] ?? ""])) as Record<ContentLocale, string>;

export const EVENT_DEFAULTS: EventRecord[] = PAGES.tr.events.items.map((e, i) => ({
  id: slugify(e.h) || `etkinlik-${i + 1}`,
  img: e.img,
  ...(e.href ? { href: e.href } : {}),
  date: per(i, "date"),
  h: per(i, "h"),
  p: per(i, "p"),
}));

/** Kayıt → sayfadaki biçim; çevirisi boş alanda İngilizce, o da yoksa Türkçe */
export function eventFor(r: EventRecord, l: ContentLocale): EventItem {
  const pick = (v: Record<string, string> | undefined) => (v?.[l] || v?.en || v?.tr || "").trim();
  return { date: pick(r.date), h: pick(r.h), p: pick(r.p), img: r.img, ...(r.href ? { href: r.href } : {}) };
}
