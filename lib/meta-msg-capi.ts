// lib/meta-msg-capi.ts
// Mesaj reklamı dönüşümleri → Meta (Conversions API for Business Messaging) · 27.11.2026.
// Messenger'dan yazan kişi numara / e-posta verince "LeadSubmitted", ekip talebi Görüşülüyor ya da Satış yapınca "QualifiedLead"
// olayı sayfanın veri setine gönderilir. Böylece Reklam Yöneticisi hangi mesaj reklamının numara getirdiğini görür ve Messenger
// reklamlarında bu sinyali kullanabilir. Meta bu olayları tekilleştirmez: her sohbet için her olay bir kez (sohbet hafızasında bit).
//   İzin: page_events (META_LEADS_TOKEN'ın sayfa anahtarı). Instagram için instagram_manage_events gerekir ve Meta Instagram mesaj
//   reklamlarında bu sinyali optimizasyonda kullanmıyor: şimdilik yalnız Messenger.
//   Olay zamanı 7 günden eskiyse gönderilmez (Meta kabul etmez), yalnız işaretlenir.
import { graphVersion } from "@/lib/meta-leads";
import type { ConvMemo } from "@/lib/meta-messages";

const DAY = 86_400_000;
export const CAPI_MAX_AGE = 7 * DAY;
export const EV_LEAD = 1; // LeadSubmitted
export const EV_QUALIFIED = 2; // QualifiedLead

export type CapiLead = { id: number; phone: string | null; email: string; status: string; statusAt: Date | null };
export type CapiEvent = { conv: string; bit: number; name: "LeadSubmitted" | "QualifiedLead"; time: number; psid: string; send: boolean };

const QUALIFIED = new Set(["gorusuluyor", "satis"]);

/** Gönderilecek (send) ya da süresi geçtiği için yalnız işaretlenecek olaylar */
export function pendingConversions(convs: Record<string, ConvMemo>, leads: Map<number, CapiLead>, now: number): CapiEvent[] {
  const out: CapiEvent[] = [];
  for (const [conv, m] of Object.entries(convs)) {
    if (m.c !== "m" || !m.p || !m.l) continue;
    const lead = leads.get(m.l);
    if (!lead || lead.status === "satis_disi") continue; // tedarikçi, iş başvurusu… alıcı değil
    const done = m.e ?? 0;
    if (!(done & EV_LEAD) && (lead.phone || lead.email)) {
      const time = Math.min(now, m.t);
      out.push({ conv, bit: EV_LEAD, name: "LeadSubmitted", time, psid: m.p, send: now - time < CAPI_MAX_AGE });
    }
    if (!(done & EV_QUALIFIED) && QUALIFIED.has(lead.status)) {
      const time = Math.min(now, (lead.statusAt ?? new Date(now)).getTime());
      out.push({ conv, bit: EV_QUALIFIED, name: "QualifiedLead", time, psid: m.p, send: now - time < CAPI_MAX_AGE });
    }
  }
  return out;
}

/** Hafızada olay bitlerini işaretlemek için kontrol edilecek talepler (son 30 günde yazan Messenger kişileri) */
export function capiCandidateLeadIds(convs: Record<string, ConvMemo>, now: number) {
  const ids = new Set<number>();
  for (const m of Object.values(convs)) {
    if (m.c === "m" && m.p && m.l && (m.e ?? 0) !== (EV_LEAD | EV_QUALIFIED) && now - m.t < 30 * DAY) ids.add(m.l);
  }
  return [...ids];
}

async function post<T>(path: string, token: string, body: unknown): Promise<T> {
  const r = await fetch(`https://graph.facebook.com/${graphVersion()}/${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  const j = (await r.json().catch(() => null)) as (T & { error?: { message?: string; code?: number; error_subcode?: number } }) | null;
  if (!r.ok || !j || j.error) {
    console.warn("META_MSG_CAPI_ERROR", { step: path.replace(/\d{6,}/g, ":id"), status: r.status, code: j?.error?.code, subcode: j?.error?.error_subcode, message: (j?.error?.message || "").slice(0, 200) });
    throw Object.assign(new Error(j?.error?.message || `Meta ${r.status}`), { code: j?.error?.code });
  }
  return j;
}

export function capiErrorText(e: unknown) {
  const err = e as { code?: number; message?: string } | null;
  if (err?.code === 190) return "Meta anahtarı geçersiz.";
  if (err?.code === 10 || err?.code === 200 || err?.code === 3) return "page_events izni yok (yeni anahtar onaylanınca açılır).";
  return (err?.message || "bilinmeyen hata").slice(0, 160);
}

/** Sayfanın veri seti: yoksa Meta oluşturur, varsa mevcut olanı verir */
export async function pageDataset(pageId: string, pageToken: string) {
  const env = (process.env.META_MSG_DATASET_ID || "").trim();
  if (/^\d+$/.test(env)) return env;
  const r = await post<{ id?: string }>(`${pageId}/dataset`, pageToken, {});
  if (!r.id) throw new Error("Meta veri seti kimliği vermedi");
  return String(r.id);
}

/** Olayları gönderir (50'şer); başarılı olanların bitleri hafızaya işlenir. Dönen: gönderilen sayı */
export async function sendConversions(events: CapiEvent[], convs: Record<string, ConvMemo>, pageId: string, pageToken: string, datasetId: string) {
  const mark = (e: CapiEvent) => {
    const m = convs[e.conv];
    if (m) m.e = (m.e ?? 0) | e.bit;
  };
  events.filter((e) => !e.send).forEach(mark);
  const toSend = events.filter((e) => e.send);
  const testCode = (process.env.META_TEST_EVENT_CODE || "").trim();
  let sent = 0;
  for (let i = 0; i < toSend.length; i += 50) {
    const batch = toSend.slice(i, i + 50);
    await post(`${datasetId}/events`, pageToken, {
      data: batch.map((e) => ({
        event_name: e.name,
        event_time: Math.floor(e.time / 1000),
        action_source: "business_messaging",
        messaging_channel: "messenger",
        user_data: { page_id: pageId, page_scoped_user_id: e.psid },
      })),
      ...(testCode ? { test_event_code: testCode } : {}),
    });
    batch.forEach(mark);
    sent += batch.length;
  }
  return sent;
}
