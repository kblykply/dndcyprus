// lib/content/translate.ts
// Panelde Türkçe yazılan içeriği EN/DE/RU/PL'ye çevirir (yalnız sunucu). Google Gemini (AI Studio ücretsiz katmanı, Flash modeli):
// kelime kelime değil, sitenin çeviri kılavuzuna (translate-guide.ts) göre doğal reklam dili. Bir kayıtta değişen bütün alanlar
// TEK istekte 4 dile birden çevrilir (ücretsiz katmanın dakikalık sınırını korumak için).
//   GEMINI_API_KEY  → Google AI Studio → API key (Vercel, Production)
//   GEMINI_MODEL    → isteğe bağlı; yoksa Google'ın model listesinden en güncel kararlı Flash modeli seçilir (6 saat önbellek)
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

/** Çeviri için düşünme süresi: Flash modellerde kısa tutulur (yanıt saniyeler içinde gelsin) */
export function thinkingFor(model: string): Record<string, unknown> | null {
  const v = parseFloat(model.match(/gemini-(\d+(?:\.\d+)?)/)?.[1] ?? "0");
  if (v >= 3) return { thinkingLevel: "low" };
  if (v >= 2.5) return { thinkingBudget: 0 };
  return null;
}

async function callGemini(
  model: string,
  key: string,
  prompt: string,
  timeoutMs: number,
  thinking: Record<string, unknown> | null,
): Promise<{ ok: true; text: string } | { ok: false; status: number; error: string }> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction() }] },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, responseMimeType: "application/json", ...(thinking ? { thinkingConfig: thinking } : {}) },
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(timeoutMs),
  });
  const body = (await r.json().catch(() => null)) as { candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] } }[]; error?: { message?: string } } | null;
  if (!r.ok) return { ok: false, status: r.status, error: body?.error?.message || `Gemini ${r.status}` };
  const text = body?.candidates?.[0]?.content?.parts?.filter((p) => !p.thought).map((p) => p.text ?? "").join("") ?? "";
  if (!text) return { ok: false, status: 502, error: "Gemini boş yanıt verdi." };
  return { ok: true, text };
}

/**
 * Google'ın listesinden en güncel kararlı Flash modelini seçer (lite, önizleme, ses, görsel, canlı modeller hariç).
 * Model adı koda sabitlenmez: Google eski modelleri yeni kullanıcılara kapatınca (ör. gemini-2.5-flash) çeviri bozulmasın.
 */
export function pickFlashModel(names: string[]): string | null {
  return rankFlashModels(names)[0] ?? null;
}

/**
 * Yedekli sıra: önce en yeni kararlı Flash, sonra bir önceki kararlı Flash sürümleri, en sonda en yeni Flash-Lite.
 * Google "yoğunluk" (503) ya da kapanmış model hatası verirse çeviri sıradakiyle sürer.
 */
export function rankFlashModels(names: string[]): string[] {
  const ver = (n: string) => parseFloat(n.match(/gemini-(\d+(?:\.\d+)?)/)?.[1] ?? "0");
  const clean = names.map((n) => n.replace(/^models\//, "")).filter((n) => /^gemini-\d+(\.\d+)?-flash/.test(n));
  const bad = /image|tts|audio|live|thinking|8b|native|embedding|robotics|computer/i;
  const sortV = (a: string, b: string) => ver(b) - ver(a) || a.length - b.length;
  const flash = clean.filter((n) => !bad.test(n) && !/lite/i.test(n));
  const stable = flash.filter((n) => !/preview|exp/i.test(n)).sort(sortV);
  const preview = flash.filter((n) => /preview|exp/i.test(n)).sort(sortV);
  const lite = clean.filter((n) => !bad.test(n) && /lite/i.test(n) && !/preview|exp/i.test(n)).sort(sortV);
  // her sürümden bir model (aynı sürümün tarihli kopyaları ayrı denenmez)
  const perVersion = (list: string[]) => list.filter((n, i) => list.findIndex((m) => ver(m) === ver(n)) === i);
  return [...perVersion(stable).slice(0, 3), ...(stable.length ? [] : perVersion(preview).slice(0, 1)), ...lite.slice(0, 1)];
}

let modelCache: { names: string[]; at: number } | null = null;

/** Kotası dolan (429) ya da yoğun (503) model bir süre sona alınır: her kayıtta aynı hatayı beklemeyelim */
const cooldown = new Map<string, number>();
const COOL_MS = { quota: 15 * 60_000, busy: 2 * 60_000 };
export function orderByCooldown(models: string[], now = Date.now()): string[] {
  const ready = models.filter((m) => (cooldown.get(m) ?? 0) <= now);
  const cooling = models.filter((m) => (cooldown.get(m) ?? 0) > now).sort((a, b) => (cooldown.get(a) ?? 0) - (cooldown.get(b) ?? 0));
  return [...ready, ...cooling];
}

async function resolveModels(key: string): Promise<string[]> {
  const list: string[] = [];
  const env = (process.env.GEMINI_MODEL || "").trim();
  if (env) list.push(env);
  if (modelCache && Date.now() - modelCache.at < 6 * 3600_000) list.push(...modelCache.names);
  else {
    try {
      const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models?pageSize=1000", { headers: { "x-goog-api-key": key }, cache: "no-store", signal: AbortSignal.timeout(15_000) });
      const body = (await r.json().catch(() => null)) as { models?: { name: string; supportedGenerationMethods?: string[] }[] } | null;
      const names = (body?.models ?? []).filter((m) => m.supportedGenerationMethods?.includes("generateContent")).map((m) => m.name);
      const ranked = rankFlashModels(names);
      if (ranked.length) {
        modelCache = { names: ranked, at: Date.now() };
        list.push(...ranked);
      }
    } catch {
      /* liste alınamazsa takma ad denenir */
    }
  }
  list.push("gemini-flash-latest");
  return list.filter((m, i, a) => a.indexOf(m) === i);
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
  const models = orderByCooldown(await resolveModels(key));
  const out: Record<string, Record<TargetLocale, string>> = {};
  const groups = chunk(todo);
  // Süre sınırı: kayıt düğmesi dakikalarca beklemesin. Tek istek en çok 30 sn; bütün çeviri 40 sn (+20 sn / ek parça, en çok 4 dk).
  const deadline = Date.now() + Math.min(240_000, 40_000 + 20_000 * (groups.length - 1));
  const slow = "Çeviri servisi zamanında yanıt vermedi; Türkçe kaydedildi, biraz sonra yeniden kaydedin.";
  for (const group of groups) {
    const prompt = buildPrompt(group, context);
    let last = "";
    let done = false;
    for (const model of models) {
      let thinking = thinkingFor(model);
      for (let attempt = 0; attempt < 2 && !done; attempt++) {
        const left = deadline - Date.now();
        if (left < 3000) return { ok: false, error: last && last !== slow ? `${slow} (${last})` : slow };
        const t0 = Date.now();
        try {
          const r = await callGemini(model, key, prompt, Math.min(30_000, left), thinking);
          console.info("TRANSLATE_CALL", { model, ok: r.ok, status: r.ok ? 200 : r.status, ms: Date.now() - t0 });
          if (!r.ok) {
            last = r.status === 429 ? "Çeviri servisinin dakikalık/günlük ücretsiz sınırı doldu; biraz sonra yeniden kaydedin." : r.error;
            if (r.status === 400 && thinking && /thinking/i.test(r.error)) {
              thinking = null; // bu model düşünme ayarını tanımıyor → ayarsız yeniden dene
              attempt--;
              continue;
            }
            if (r.status === 404 || r.status === 400 || /no longer available|not found|not supported/i.test(r.error)) {
              if (modelCache?.names.includes(model)) modelCache = null; // kapanan model: bir dahakine liste yeniden alınır
              break; // bu model yok/kapalı → sıradaki model
            }
            if (r.status === 503 || r.status === 500 || r.status === 504 || /high demand|overloaded|unavailable|deadline/i.test(r.error)) {
              last = "Çeviri servisi şu an yoğun; biraz sonra yeniden kaydedin.";
              cooldown.set(model, Date.now() + COOL_MS.busy);
              break; // yoğun model: beklemeden sıradaki modele geç
            }
            if (r.status === 429) {
              cooldown.set(model, Date.now() + COOL_MS.quota);
              break; // bu modelin ücretsiz kotası dolu: beklemeden sıradaki modele geç
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
          const timedOut = /timeout|aborted/i.test(`${(e as Error).name} ${(e as Error).message}`);
          console.info("TRANSLATE_CALL", { model, ok: false, status: timedOut ? "timeout" : "network", ms: Date.now() - t0 });
          last = timedOut ? slow : `Çeviri servisine ulaşılamadı: ${(e as Error).message}`;
          break; // yanıt vermeyen model aynı istekle yeniden beklenmez → sıradaki model
        }
      }
      if (done) break;
    }
    if (!done) return { ok: false, error: last || "Çeviri yapılamadı." };
  }
  return { ok: true, out };
}
