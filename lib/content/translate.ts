// lib/content/translate.ts
// Panelde Türkçe yazılan içeriği EN/DE/RU/PL'ye çevirir (yalnız sunucu). Google Gemini (AI Studio ücretsiz katmanı, Flash modeli):
// kelime kelime değil, sitenin çeviri kılavuzuna (translate-guide.ts) göre doğal reklam dili. Bir kayıtta değişen bütün alanlar
// TEK istekte 4 dile birden çevrilir (ücretsiz katmanın dakikalık sınırını korumak için).
//   GEMINI_API_KEY  → Google AI Studio → API key (Vercel, Production)
//   GEMINI_MODEL    → isteğe bağlı; varsayılan "gemini-flash-latest" (Google'ın güncel Flash modeli), olmazsa gemini-2.5-flash
//   CONTENT_TRANSLATE_MOCK=1 → yalnız yerel testlerde: ağ yok, metnin sonuna [en] gibi etiket ekler
import { TRANSLATION_SYSTEM, houseStyleExamples } from "./translate-guide";

let systemText: string | null = null;
const systemInstruction = () => (systemText ??= TRANSLATION_SYSTEM + houseStyleExamples());

export const TARGET_LOCALES = ["en", "de", "ru", "pl"] as const;
export type TargetLocale = (typeof TARGET_LOCALES)[number];
export type TranslateKind = "text" | "long" | "rich" | "html" | "tags";
export type TranslateItem = { id: string; text: string; kind: TranslateKind };
export type TranslateResult =
  | { ok: true; out: Record<string, Record<TargetLocale, string>> }
  | { ok: false; error: string };

/** Panelde otomatik çeviri işaretinin yazanı (ContentOverride.updatedBy) */
export const AUTO_TRANSLATOR = "otomatik çeviri";

export const translationConfigured = () => !!(process.env.GEMINI_API_KEY || "").trim() || process.env.CONTENT_TRANSLATE_MOCK === "1";

/** Çevrilecek gerçek yazı mı (boş, sayı, adres, görsel yolu, e-posta değil) */
export function isTranslatable(text: string) {
  const t = String(text ?? "").trim();
  if (!t) return false;
  if (/^[\d\s.,:%+\-–—/₺£€$≈~x×]+$/i.test(t)) return false; // yalnız sayı/simge
  if (/^(https?:\/\/|\/|mailto:|tel:|#)\S*$/i.test(t)) return false; // bağlantı / yol
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return false; // e-posta
  return /\p{L}/u.test(t);
}

const KIND_NOTE: Record<TranslateKind, string> = {
  text: "short text (headline, label or button)",
  long: "paragraph",
  rich: "headline with **bold** markers and optional line breaks",
  html: "HTML article body: keep all tags and attributes",
  tags: "comma-separated tags",
};

/** Modele giden kullanıcı mesajı: bağlam + alanlar (JSON) */
export { systemInstruction };

export function buildPrompt(items: TranslateItem[], context?: string) {
  const payload = items.map((i) => ({ id: i.id, type: KIND_NOTE[i.kind], tr: i.text }));
  return [
    context ? `Context: ${context}.` : "",
    "Translate every item's Turkish text (field \"tr\") into en, de, ru and pl following all rules.",
    'Return ONLY a JSON array: [{"id": "...", "en": "...", "de": "...", "ru": "...", "pl": "..."}] with exactly one object per input id.',
    "Items:",
    JSON.stringify(payload),
  ]
    .filter(Boolean)
    .join("\n");
}

/** Model yanıtını doğrular: her kimlik ve 4 dil dolu olmalı; ** sayısı tutmayan kalın vurgu sadeleştirilir */
export function parseTranslation(raw: string, items: TranslateItem[]): TranslateResult {
  let data: unknown;
  try {
    const cleaned = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/```$/, "");
    data = JSON.parse(cleaned);
  } catch {
    return { ok: false, error: "Çeviri yanıtı okunamadı." };
  }
  if (!Array.isArray(data)) return { ok: false, error: "Çeviri yanıtı beklenen biçimde değil." };
  const byId = new Map<string, Record<string, unknown>>();
  for (const row of data) if (row && typeof row === "object" && "id" in row) byId.set(String((row as { id: unknown }).id), row as Record<string, unknown>);
  const out: Record<string, Record<TargetLocale, string>> = {};
  for (const it of items) {
    const row = byId.get(it.id);
    if (!row) return { ok: false, error: "Çeviride eksik alan var." };
    const rec = {} as Record<TargetLocale, string>;
    for (const l of TARGET_LOCALES) {
      let v = String(row[l] ?? "").trim();
      if (!v) return { ok: false, error: `Çeviride boş dil var (${l}).` };
      const srcBold = (it.text.match(/\*\*/g) || []).length;
      if (it.kind !== "html" && (v.match(/\*\*/g) || []).length !== srcBold) v = srcBold ? v : v.replace(/\*\*/g, "");
      rec[l] = v;
    }
    out[it.id] = rec;
  }
  return { ok: true, out };
}

function chunk(items: TranslateItem[]) {
  // uzun yazılar (blog) tek başına, diğerleri ~6.000 karakterlik paketler
  const groups: TranslateItem[][] = [];
  let cur: TranslateItem[] = [];
  let size = 0;
  for (const it of items) {
    if (cur.length && (size + it.text.length > 6000 || cur.length >= 40)) {
      groups.push(cur);
      cur = [];
      size = 0;
    }
    cur.push(it);
    size += it.text.length;
  }
  if (cur.length) groups.push(cur);
  return groups;
}

async function callGemini(model: string, key: string, prompt: string): Promise<{ ok: true; text: string } | { ok: false; status: number; error: string }> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction() }] },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, responseMimeType: "application/json" },
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(90_000),
  });
  const body = (await r.json().catch(() => null)) as { candidates?: { content?: { parts?: { text?: string }[] } }[]; error?: { message?: string } } | null;
  if (!r.ok) return { ok: false, status: r.status, error: body?.error?.message || `Gemini ${r.status}` };
  const text = body?.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
  if (!text) return { ok: false, status: 502, error: "Gemini boş yanıt verdi." };
  return { ok: true, text };
}

/** Türkçe alanları 4 dile çevirir. Çevrilecek bir şey yoksa boş sonuç döner. */
export async function translateFromTurkish(items: TranslateItem[], context?: string): Promise<TranslateResult> {
  const todo = items.filter((i) => isTranslatable(i.text));
  if (!todo.length) return { ok: true, out: {} };
  if (process.env.CONTENT_TRANSLATE_MOCK === "1") {
    const out: Record<string, Record<TargetLocale, string>> = {};
    for (const i of todo) out[i.id] = Object.fromEntries(TARGET_LOCALES.map((l) => [l, i.kind === "tags" ? i.text.split(",").map((t) => `${t.trim()} [${l}]`).join(", ") : `${i.text} [${l}]`])) as Record<TargetLocale, string>;
    return { ok: true, out };
  }
  const key = (process.env.GEMINI_API_KEY || "").trim();
  if (!key) return { ok: false, error: "Otomatik çeviri kapalı: GEMINI_API_KEY tanımlı değil." };
  const models = [(process.env.GEMINI_MODEL || "").trim() || "gemini-flash-latest", "gemini-2.5-flash"].filter((m, i, a) => a.indexOf(m) === i);
  const out: Record<string, Record<TargetLocale, string>> = {};
  for (const group of chunk(todo)) {
    const prompt = buildPrompt(group, context);
    let last = "";
    let done = false;
    for (const model of models) {
      for (let attempt = 0; attempt < 2 && !done; attempt++) {
        try {
          const r = await callGemini(model, key, prompt);
          if (!r.ok) {
            last = r.status === 429 ? "Çeviri servisinin dakikalık/günlük ücretsiz sınırı doldu; biraz sonra yeniden kaydedin." : r.error;
            if (r.status === 404 || r.status === 400) break; // bu model yok/desteklenmiyor → sıradaki model
            if (r.status === 429 && attempt === 0) {
              await new Promise((res) => setTimeout(res, 6000));
              continue;
            }
            if (r.status === 401 || r.status === 403) return { ok: false, error: "Çeviri anahtarı geçersiz (GEMINI_API_KEY)." };
            continue;
          }
          const parsed = parseTranslation(r.text, group);
          if (!parsed.ok) {
            last = parsed.error;
            continue;
          }
          Object.assign(out, parsed.out);
          done = true;
        } catch (e) {
          last = `Çeviri servisine ulaşılamadı: ${(e as Error).message}`;
        }
      }
      if (done) break;
    }
    if (!done) return { ok: false, error: last || "Çeviri yapılamadı." };
  }
  return { ok: true, out };
}
