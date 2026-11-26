// lib/content/translate-jobs.ts
// Otomatik çevirinin uygulanması ve bekleyen çeviri kuyruğu (yalnız sunucu) · 26.11.2026.
// Kayıt anında Google'ın ücretsiz çeviri modeli yoğun/kotası dolu olursa Türkçe yine kaydedilir, iş kuyruğa girer; kuyruk
// 10 dakikada bir (cron /api/cron/ceviri) ve panelden "Şimdi dene" ile yeniden denenir. Böylece kimsenin yeniden kaydetmesi
// gerekmez. Kuyruk SyncState "translate-queue" satırında durur. Sırada beklerken o dilde elle yazılan metin korunur.
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { CONTENT_LOCALES, postHtml, type ContentLocale } from "./core";
import { AUTO_TRANSLATOR, TARGET_LOCALES, isTranslatable, translateFromTurkish, translationConfigured, type TargetLocale } from "./translate";
import { SCOPES, isScopeKey, type ScopeKey } from "./scopes";
import { COLLECTIONS, allRoutes, isCollectionKey, sectionFields } from "./admin";
import type { CollectionKey } from "./store";

export const TRANSLATE_KINDS = new Set(["text", "long", "rich"]);
const QUEUE_KEY = "translate-queue";
const MAX_TRIES = 60; // 10 dakikada bir → yaklaşık 10 saat

export type SectionJob = { kind: "section"; scope: string; section: string; paths: string[]; at: number; tries: number; error?: string };
export type ItemJob = {
  kind: "item";
  collection: string;
  key: string;
  fields: string[];
  /** kuyruğa girerken diğer dillerdeki değer: o dil sonradan elle değişmediyse çeviriyle dolar */
  snapshot: Record<string, Record<string, string>>;
  at: number;
  tries: number;
  error?: string;
};
export type TranslateJob = SectionJob | ItemJob;
type QueueState = { jobs: TranslateJob[]; lastRunAt?: number; dropped?: number };

/* ---------------- Uygulama ---------------- */

async function setOverride(scope: string, locale: string, path: string, value: string | null, author: string) {
  if (value === null) await prisma.contentOverride.deleteMany({ where: { scope, locale, path } });
  else
    await prisma.contentOverride.upsert({
      where: { scope_locale_path: { scope, locale, path } },
      create: { scope, locale, path, value, updatedBy: author },
      update: { value, updatedBy: author },
    });
}

function refresh(routes: string[], siteWide = false) {
  try {
    if (siteWide) revalidatePath("/", "layout");
    for (const r of new Set(routes)) {
      if (r.includes("[")) revalidatePath(r, "page");
      else revalidatePath(r);
    }
  } catch {
    /* istek dışı çağrıda yenileme yapılamazsa sayfa bir sonraki üretimde güncellenir */
  }
}

const isSiteWide = (scope: ScopeKey) => "siteWide" in SCOPES[scope] && !!SCOPES[scope].siteWide;

export type Changed = { path: string; kind: string; value: string; reverted: boolean };

/**
 * Türkçede değişen yazıları 4 dile çevirip o dillerin aynı alanına "otomatik çeviri" olarak yazar. Türkçe orijinaline dönen
 * alanda diğer dillerin otomatik çevirisi silinir. since verilirse (kuyruktan): o tarihten sonra elle yazılmış çeviriye dokunulmaz.
 */
export async function translateSectionFields(scope: ScopeKey, section: string, changed: Changed[], since?: Date) {
  const others = CONTENT_LOCALES.filter((l) => l !== "tr");
  const reverted = changed.filter((x) => x.reverted).map((x) => x.path);
  if (reverted.length)
    await prisma.contentOverride.deleteMany({ where: { scope, locale: { in: others }, path: { in: reverted }, updatedBy: AUTO_TRANSLATOR } });
  const items = changed
    .filter((x) => !x.reverted && TRANSLATE_KINDS.has(x.kind) && isTranslatable(x.value))
    .map((x) => ({ id: x.path, text: x.value, kind: x.kind as "text" | "long" | "rich" }));
  if (!items.length) return { count: 0, paths: [] as string[] };
  if (!translationConfigured()) return { count: 0, paths: [], error: "Otomatik çeviri kapalı (GEMINI_API_KEY tanımlı değil); diğer diller eski metinle kaldı.", off: true };
  const def = SCOPES[scope];
  const label = def.sections.find(([k]) => k === section)?.[1] ?? section;
  const r = await translateFromTurkish(items, `${def.label} page, section "${label}" of www.dndcyprus.com`);
  if (!r.ok) return { count: 0, paths: items.map((i) => i.id), error: r.error };
  const manual = since
    ? new Set(
        (
          await prisma.contentOverride.findMany({
            where: { scope, locale: { in: others }, path: { in: items.map((i) => i.id) }, updatedAt: { gt: since }, NOT: { updatedBy: AUTO_TRANSLATOR } },
            select: { locale: true, path: true },
          })
        ).map((o) => `${o.locale}|${o.path}`),
      )
    : new Set<string>();
  let count = 0;
  for (const l2 of others) {
    const fields = new Map((await sectionFields(scope, l2, section)).map((f) => [f.path, f]));
    for (const [path, rec] of Object.entries(r.out)) {
      const f = fields.get(path);
      if (!f || manual.has(`${l2}|${path}`)) continue; // bu dilde aynı yer yok ya da sırada beklerken elle yazıldı
      const v = rec[l2 as TargetLocale];
      await setOverride(scope, l2, path, v === f.original ? null : v, AUTO_TRANSLATOR);
      count++;
    }
  }
  if (since && count) refresh(others.flatMap((l) => def.routes(l)), isSiteWide(scope));
  return { count: items.length, paths: [] as string[] };
}

const asText = (v: unknown) => (Array.isArray(v) ? v.join(", ") : String(v ?? ""));

/**
 * Liste kaydında Türkçesi değişen (ya da yeni) alanları 4 dile çevirip data'ya yazar. O dilde bu kayıtta elle değiştirilmiş
 * metin korunur. data yerinde güncellenir. Çeviri yapılamazsa çevrilecek alanlar ve diğer dillerin o anki değeri döner (kuyruk).
 */
export async function translateItemData(collection: CollectionKey, data: Record<string, unknown>, prev: Record<string, unknown> | null) {
  const def = COLLECTIONS[collection];
  const items: { id: string; text: string; kind: "text" | "long" | "html" | "tags" }[] = [];
  for (const f of def.perLocale) {
    const now = (data[f.key] ?? {}) as Record<string, unknown>;
    const old = (prev?.[f.key] ?? {}) as Record<string, unknown>;
    const trNow = asText(now.tr).trim();
    if (!trNow || (prev && trNow === asText(old.tr).trim())) continue; // Türkçe aynı → çeviri gerekmez
    items.push({ id: f.key, text: trNow, kind: f.kind === "html" ? "html" : f.kind === "tags" ? "tags" : f.kind === "long" ? "long" : "text" });
  }
  if (!items.length) return { count: 0 };
  if (!translationConfigured()) return { count: 0, error: "Otomatik çeviri kapalı (GEMINI_API_KEY tanımlı değil); diğer diller elle girilmeli ya da boş kalır.", off: true };
  const r = await translateFromTurkish(items, `${def.label} list item on www.dndcyprus.com`);
  if (!r.ok) {
    // elle yazılmamış diller kuyruktan dolacak: o anki değerleri saklanır (sonradan elle değişirse dokunulmaz)
    const snapshot: Record<string, Record<string, string>> = {};
    const pending: string[] = [];
    for (const it of items) {
      const now = (data[it.id] ?? {}) as Record<string, unknown>;
      const old = (prev?.[it.id] ?? {}) as Record<string, unknown>;
      const open = TARGET_LOCALES.filter((l) => {
        const typed = asText(now[l]).trim();
        return !(prev ? typed !== "" && typed !== asText(old[l]).trim() : typed !== "");
      });
      if (!open.length) continue;
      pending.push(it.id);
      snapshot[it.id] = Object.fromEntries(open.map((l) => [l, asText(now[l]).trim()]));
    }
    return { count: 0, error: r.error, pending, snapshot };
  }
  let count = 0;
  for (const it of items) {
    const rec = r.out[it.id];
    if (!rec) continue;
    const now = (data[it.id] ?? {}) as Record<string, unknown>;
    const old = (prev?.[it.id] ?? {}) as Record<string, unknown>;
    for (const l of TARGET_LOCALES) {
      const typed = asText(now[l]).trim();
      const touched = prev ? typed !== "" && typed !== asText(old[l]).trim() : typed !== "";
      if (touched) continue; // bu kayıtta o dil elle yazıldı/değiştirildi
      now[l] = valueFor(it.kind, rec[l]);
    }
    data[it.id] = now;
    count++;
  }
  return { count };
}

function valueFor(kind: string, v: string): unknown {
  return kind === "tags" ? v.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 12) : kind === "html" ? postHtml(v) : v;
}

/* ---------------- Kuyruk ---------------- */

async function loadQueue(): Promise<QueueState> {
  try {
    const row = await prisma.syncState.findUnique({ where: { key: QUEUE_KEY } });
    const st = row?.data as QueueState | undefined;
    return { jobs: Array.isArray(st?.jobs) ? st!.jobs : [], lastRunAt: st?.lastRunAt, dropped: st?.dropped };
  } catch {
    return { jobs: [] };
  }
}

async function saveQueue(st: QueueState) {
  const data = JSON.parse(JSON.stringify(st));
  await prisma.syncState.upsert({ where: { key: QUEUE_KEY }, create: { key: QUEUE_KEY, data }, update: { data } });
}

/** Aynı bölüm / aynı kayıt için tek iş tutulur; alanlar birleşir */
export function mergeJob(jobs: TranslateJob[], job: TranslateJob): TranslateJob[] {
  const same = (j: TranslateJob) =>
    j.kind === job.kind && (j.kind === "section" ? j.scope === (job as SectionJob).scope && j.section === (job as SectionJob).section : j.collection === (job as ItemJob).collection && j.key === (job as ItemJob).key);
  const old = jobs.find(same);
  if (!old) return [...jobs, job];
  const merged: TranslateJob =
    old.kind === "section"
      ? { ...old, paths: [...new Set([...old.paths, ...(job as SectionJob).paths])], tries: 0, error: job.error }
      : { ...old, fields: [...new Set([...old.fields, ...(job as ItemJob).fields])], snapshot: { ...old.snapshot, ...(job as ItemJob).snapshot }, tries: 0, error: job.error };
  return jobs.map((j) => (j === old ? merged : j));
}

export async function enqueueTranslation(job: TranslateJob) {
  const st = await loadQueue();
  st.jobs = mergeJob(st.jobs, job);
  await saveQueue(st);
}

export const QUEUED_MESSAGE = "Çeviri servisi şu an yoğun; Türkçe kaydedildi, diğer diller birkaç dakika içinde kendiliğinden çevrilecek.";

async function runSectionJob(job: SectionJob): Promise<{ ok: boolean; error?: string }> {
  if (!isScopeKey(job.scope) || !SCOPES[job.scope].sections.some(([k]) => k === job.section)) return { ok: true }; // bölüm kalktı
  const fields = new Map((await sectionFields(job.scope, "tr", job.section)).map((f) => [f.path, f]));
  const changed: Changed[] = [];
  for (const p of job.paths) {
    const f = fields.get(p);
    if (!f || !f.overridden) continue; // Türkçe orijinaline döndü ya da alan yok → çevrilecek bir şey kalmadı
    changed.push({ path: p, kind: f.kind, value: f.value, reverted: false });
  }
  if (!changed.length) return { ok: true };
  const r = await translateSectionFields(job.scope, job.section, changed, new Date(job.at));
  if (r.error) return { ok: !!("off" in r && r.off), error: r.error };
  await prisma.contentLog.create({
    data: { area: SCOPES[job.scope].label, action: "otomatik çeviri", detail: `${SCOPES[job.scope].sections.find(([k]) => k === job.section)?.[1] ?? job.section}: ${r.count} alan 4 dile çevrildi (sıradan)`, author: AUTO_TRANSLATOR },
  });
  return { ok: true };
}

async function runItemJob(job: ItemJob): Promise<{ ok: boolean; error?: string }> {
  if (!isCollectionKey(job.collection)) return { ok: true };
  const collection = job.collection;
  const row = await prisma.contentItem.findUnique({ where: { collection_key: { collection, key: job.key } } });
  if (!row) return { ok: true }; // kayıt silinmiş
  const def = COLLECTIONS[collection];
  const data = { ...(row.data as Record<string, unknown>) };
  const items: { id: string; text: string; kind: "text" | "long" | "html" | "tags" }[] = [];
  for (const key of job.fields) {
    const f = def.perLocale.find((x) => x.key === key);
    const trNow = asText(((data[key] ?? {}) as Record<string, unknown>).tr).trim();
    if (!f || !trNow) continue;
    items.push({ id: key, text: trNow, kind: f.kind === "html" ? "html" : f.kind === "tags" ? "tags" : f.kind === "long" ? "long" : "text" });
  }
  if (!items.length) return { ok: true };
  if (!translationConfigured()) return { ok: true, error: "Otomatik çeviri kapalı." };
  const r = await translateFromTurkish(items, `${def.label} list item on www.dndcyprus.com`);
  if (!r.ok) return { ok: false, error: r.error };
  let filled = 0;
  for (const it of items) {
    const rec = r.out[it.id];
    if (!rec) continue;
    const now = { ...((data[it.id] ?? {}) as Record<string, unknown>) };
    for (const [l, was] of Object.entries(job.snapshot[it.id] ?? {})) {
      if (asText(now[l]).trim() !== was) continue; // sırada beklerken o dil elle yazıldı → dokunma
      now[l] = valueFor(it.kind, rec[l as TargetLocale]);
      filled++;
    }
    data[it.id] = now;
  }
  if (filled) {
    await prisma.contentItem.update({ where: { id: row.id }, data: { data: data as object } });
    await prisma.contentLog.create({ data: { area: def.label, action: "otomatik çeviri", detail: `${def.title(data).slice(0, 120)}: 4 dile çevrildi (sıradan)`, author: AUTO_TRANSLATOR } });
    refresh([...allRoutes(def.routes), ...(collection === "haber" ? ["/sitemap.xml"] : [])]);
  }
  return { ok: true };
}

/** Bekleyen çevirileri dener (süre bütçesi içinde). Başaran ve artık gerekmeyen işler kuyruktan çıkar. */
export async function processTranslationQueue(budgetMs = 50_000) {
  const st = await loadQueue();
  if (!st.jobs.length) return { done: 0, left: 0, failed: 0 };
  const start = Date.now();
  const left: TranslateJob[] = [];
  let done = 0;
  let failed = 0;
  let dropped = st.dropped ?? 0;
  for (const job of st.jobs) {
    if (Date.now() - start > budgetMs) {
      left.push(job);
      continue;
    }
    let r: { ok: boolean; error?: string };
    try {
      r = job.kind === "section" ? await runSectionJob(job) : await runItemJob(job);
    } catch (e) {
      r = { ok: false, error: (e as Error).message.slice(0, 200) };
    }
    if (r.ok) done++;
    else if (job.tries + 1 >= MAX_TRIES) dropped++;
    else {
      failed++;
      left.push({ ...job, tries: job.tries + 1, error: r.error });
    }
  }
  // çalışırken yeni gelen işler kaybolmasın: kuyruğu yeniden okuyup birleştir
  const fresh = await loadQueue();
  const known = new Set(st.jobs.map((j) => JSON.stringify(j)));
  let jobs = left;
  for (const j of fresh.jobs) if (!known.has(JSON.stringify(j))) jobs = mergeJob(jobs, j);
  await saveQueue({ jobs, lastRunAt: Date.now(), dropped });
  return { done, left: jobs.length, failed };
}

/** Panel için kısa özet */
export async function translationQueueSummary() {
  const st = await loadQueue();
  return {
    count: st.jobs.length,
    sections: st.jobs.filter((j) => j.kind === "section").length,
    items: st.jobs.filter((j) => j.kind === "item").length,
    oldest: st.jobs.length ? Math.min(...st.jobs.map((j) => j.at)) : null,
    lastRunAt: st.lastRunAt ?? null,
    lastError: st.jobs.find((j) => j.error)?.error ?? null,
    dropped: st.dropped ?? 0,
  };
}

export type { ContentLocale };
