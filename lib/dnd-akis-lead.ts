// lib/dnd-akis-lead.ts
// Sunucu: web formu talebini DND Akış'ın lead ucuna iletir (01 Satış › Yeni Lead kartı açılır).
// Adres ve anahtar yalnızca ortam değişkeninden okunur; anahtar istemciye gitmez ve asla loglanmaz.
// İkisinden biri yoksa hiçbir şey yapılmaz. Hata / zaman aşımı formun sonucunu etkilemez;
// günlüğe yalnızca durum kodu ya da neden yazılır (kişisel veri yok).

import { PROJECTS, localeFromPathname } from "./azure/site";

export type DndAkisLeadInput = {
  name: string;
  email: string;
  phone?: string;
  /** Sitedeki proje: slug ("perla-ii") ya da ad ("La Joya Perla II") */
  project?: string;
  /** Ziyaretçinin yazdığı mesaj (API'nin varsayılan metni değil) */
  message?: string;
  /** Ziyaretçinin seçtiği konu (yalnız iletişim formunda anlamlı) */
  subject?: string;
  unitType?: string;
  /** "lead" (proje sayfası fiyat formu), "home" (genel bilgi formu), "contact" (iletişim sayfası) */
  form?: string;
  pageUrl?: string;
  /** sourceFromAttribution: "facebook / paid_social", "google / cpc" … */
  source?: string | null;
  campaign?: string | null;
};

export type DndAkisLeadResult =
  | { skipped: true }
  | { ok: true; status: number; id?: string; repeat?: boolean }
  | { ok: false; status?: number; reason?: "timeout" | "network" };

// İletim kullanıcıya yanıt döndükten sonra (after) çalışır; soğuk başlangıçta DND Akış yanıtı 5 sn’yi aşabildiği için 10 sn.
const TIMEOUT_MS = 10000;

const FORM_LABEL: Record<string, string> = {
  lead: "Fiyat / kat planı talebi (proje sayfası)",
  home: "Bilgi talebi",
  contact: "İletişim formu",
};

let warnedBadUrl = false;

function endpoint(): { url: string; key: string } | null {
  const url = (process.env.DND_AKIS_LEAD_URL || "").trim();
  const key = (process.env.DND_AKIS_LEAD_ANAHTAR || "").trim();
  if (!url || !key) return null;
  try {
    const u = new URL(url);
    // Anahtar düz HTTP ile dolaşmasın: yalnız https (yerel test için localhost'ta http)
    const local = u.hostname === "localhost" || u.hostname === "127.0.0.1" || u.hostname === "[::1]";
    if (u.protocol === "https:" || (u.protocol === "http:" && local)) return { url: u.toString(), key };
  } catch {
    // geçersiz adres
  }
  if (!warnedBadUrl) {
    console.warn("DND_AKIS_LEAD_SKIPPED: DND_AKIS_LEAD_URL geçersiz (https adresi olmalı)");
    warnedBadUrl = true;
  }
  return null;
}

export function dndAkisLeadConfigured() {
  return !!(process.env.DND_AKIS_LEAD_URL || "").trim() && !!(process.env.DND_AKIS_LEAD_ANAHTAR || "").trim();
}

/** Sitedeki proje slug'ı ya da adı → DND Akış proje adı (birebir eşleşirse kart projeye bağlanır) */
export function dndAkisProjectName(value?: string) {
  const s = (value || "").trim();
  if (!s) return "";
  const k = s.toLowerCase();
  const p = PROJECTS.find((x) => x.slug === k || x.name.toLowerCase() === k);
  return p ? p.name : s;
}

function pathOf(pageUrl?: string) {
  if (!pageUrl) return "";
  try {
    return new URL(pageUrl).pathname;
  } catch {
    return "";
  }
}

/**
 * DND Akış gövdesi. Ek bilgiler (sayfa, form türü, kaynak…) üst düzey metin alanı olarak gider:
 * DND Akış tanımadığı metin alanlarını (en çok 12) kart açıklamasına "Alan: değer" satırı olarak ekler.
 * Boş alanlar gönderilmez.
 */
export function dndAkisLeadBody(input: DndAkisLeadInput): Record<string, string> {
  const body: Record<string, string> = {};
  const put = (key: string, value: unknown, max: number) => {
    const s = typeof value === "string" ? value.trim().slice(0, max) : "";
    if (s) body[key] = s;
  };
  const path = pathOf(input.pageUrl);

  put("ad", input.name, 120);
  put("telefon", input.phone, 40);
  put("eposta", input.email, 160);
  put("proje", dndAkisProjectName(input.project), 80);
  put("mesaj", input.message, 2000);
  body.kaynak = "web";
  if (path) body.dil = localeFromPathname(path);

  // Ek alanlar
  put("Form türü", input.form ? FORM_LABEL[input.form] || input.form : "", 80);
  if (input.form === "contact") put("Konu", input.subject, 200);
  put("Daire tipi", input.unitType, 80);
  put("Sayfa", path, 300);
  put("Trafik kaynağı", input.source, 200);
  put("Kampanya", input.campaign, 200);
  return body;
}

export async function sendDndAkisLead(input: DndAkisLeadInput): Promise<DndAkisLeadResult> {
  const target = endpoint();
  if (!target) return { skipped: true };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(target.url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-dnd-anahtar": target.key },
      body: JSON.stringify(dndAkisLeadBody(input)),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) {
      // Yalnızca durum kodu; yanıt gövdesi ve form verisi loglanmaz
      console.warn("DND_AKIS_LEAD_FAILED", { status: res.status });
      return { ok: false, status: res.status };
    }
    let id: string | undefined;
    let repeat: boolean | undefined;
    try {
      const j = (await res.json()) as { id?: unknown; tekrar?: unknown };
      if (typeof j?.id === "string" || typeof j?.id === "number") id = String(j.id);
      if (typeof j?.tekrar === "boolean") repeat = j.tekrar;
    } catch {
      // gövde JSON değil; talep yine iletildi
    }
    return { ok: true, status: res.status, id, repeat };
  } catch (err) {
    const reason = (err as { name?: unknown } | null)?.name === "AbortError" ? "timeout" : "network";
    console.warn("DND_AKIS_LEAD_FAILED", { reason });
    return { ok: false, reason };
  } finally {
    clearTimeout(timer);
  }
}
