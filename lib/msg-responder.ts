// lib/msg-responder.ts
// Mesaj sohbetinin ilk cevabını kimin verdiği (27.11.2026). Meta, sayfa adına yazılan cevabın hangi kişiden geldiğini API'de
// bildirmez; sohbetler varsayılan olarak MSG_RESPONDER'a (Talha) sayılır, başkası (ör. Muhammed) cevapladıysa Satış
// Talepleri'ndeki sohbet kutusundan işaretlenir. Mesaj senkronu her 10 dakikada "meta-mesaj" satırını yeniden yazdığı için
// işaretler ayrı SyncState satırında durur (yarış olmasın). Yalnız sunucu.
import { prisma } from "@/lib/prisma";
import { MSG_RESPONDER, MSG_TEAM } from "@/lib/meta-msg-view";

export const RESPONDER_KEY = "yanit-sahibi";

/** talep no → ilk cevabı veren (yalnız varsayılandan farklı olanlar saklanır) */
export async function loadResponderMap(): Promise<Record<string, string>> {
  try {
    const row = await prisma.syncState.findUnique({ where: { key: RESPONDER_KEY } });
    const by = (row?.data as { by?: Record<string, string> } | null)?.by;
    return by && typeof by === "object" ? by : {};
  } catch {
    return {};
  }
}

/** İşareti değiştir; değiştiyse true */
export async function setResponderFor(leadId: number, name: string) {
  if (!MSG_TEAM.includes(name)) return false;
  const by = await loadResponderMap();
  const key = String(leadId);
  const cur = by[key] || MSG_RESPONDER;
  if (cur === name) return false;
  if (name === MSG_RESPONDER) delete by[key];
  else by[key] = name;
  await prisma.syncState.upsert({ where: { key: RESPONDER_KEY }, create: { key: RESPONDER_KEY, data: { by } }, update: { data: { by } } });
  return true;
}
