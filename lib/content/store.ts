// lib/content/store.ts
// Sitenin içerik okuma katmanı (yalnız sunucu): veritabanındaki değişiklikleri koddaki varsayılanla birleştirir.
// Veritabanı yoksa ya da hata verirse site koddaki içerikle aynen çalışır (derleme ortamı, yerel geliştirme, kesinti).
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { applyOverrides, type ContentLocale } from "./core";
import { SCOPES, type HomeScopeContent, type ScopeKey } from "./scopes";
import { PRESS_DEFAULTS, pressItemFor, type PressRecord } from "./defaults/press";
import { TEAM_DEFAULTS, memberFor, type TeamRecord } from "./defaults/team";

const hasDb = () => !!(process.env.DATABASE_URL || "").trim();

export const getOverrides = cache(async (scope: string, locale: string): Promise<Record<string, string>> => {
  if (!hasDb()) return {};
  try {
    const rows = await prisma.contentOverride.findMany({ where: { scope, locale }, select: { path: true, value: true } });
    return Object.fromEntries(rows.map((r) => [r.path, r.value]));
  } catch {
    return {};
  }
});

export async function getScopeContent(scope: "anasayfa", locale: ContentLocale): Promise<HomeScopeContent>;
export async function getScopeContent(scope: ScopeKey, locale: ContentLocale) {
  const base = SCOPES[scope].build(locale);
  return applyOverrides(base, await getOverrides(scope, locale));
}

export type CollectionKey = "basin" | "ekip";

/** Liste veritabanına hiç aktarılmadıysa null (site koddaki listeyi kullanır) */
export const getCollectionRows = cache(async (collection: CollectionKey) => {
  if (!hasDb()) return null;
  try {
    const rows = await prisma.contentItem.findMany({ where: { collection }, orderBy: [{ sortOrder: "asc" }, { id: "asc" }] });
    return rows.length ? rows : null;
  } catch {
    return null;
  }
});

export async function getPress(locale: ContentLocale) {
  const rows = await getCollectionRows("basin");
  const records = rows ? rows.filter((r) => r.published).map((r) => r.data as unknown as PressRecord) : PRESS_DEFAULTS;
  return records.map((r) => pressItemFor(r, locale));
}

export async function getTeam(locale: ContentLocale) {
  const rows = await getCollectionRows("ekip");
  const records = rows ? rows.filter((r) => r.published).map((r, i) => ({ ...(r.data as unknown as TeamRecord), sortOrder: i + 1 })) : TEAM_DEFAULTS;
  return records.map((r) => memberFor(r, locale));
}
