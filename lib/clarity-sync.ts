// lib/clarity-sync.ts
// Clarity verisini veritabanına yazar (her sabah görev, elle "Şimdi güncelle"). Bir çalıştırma 3 istek harcar (URL, Cihaz, Kanal);
// Clarity sınırı günde 10. Hata olan boyut atlanır, diğerleri kaydedilir; yanıtta kişisel veri yok.
import { prisma } from "./prisma";
import { CLARITY_DIMENSIONS, clarityFetch, type ClarityResponse } from "./clarity";

export async function syncClarity(day: string) {
  const saved: string[] = [];
  const errors: string[] = [];
  for (const dimension of CLARITY_DIMENSIONS) {
    const r = await clarityFetch(dimension, 1);
    if (!r.ok) {
      errors.push(`${dimension}: ${r.error}`);
      if (r.status === 429 || r.status === 401 || r.status === 403) break; // sınır ya da yetki: diğerlerini boşa harcama
      continue;
    }
    await prisma.claritySnapshot.upsert({
      where: { day_dimension: { day, dimension } },
      create: { day, dimension, data: r.data as unknown as object },
      update: { data: r.data as unknown as object, fetchedAt: new Date() },
    });
    saved.push(dimension);
  }
  return { saved, errors };
}

export async function loadClarity(days: number | "anlik", today: string) {
  if (days === "anlik") {
    const rows = await prisma.claritySnapshot.findMany({ where: { day: "anlik" } });
    return { rows: rows.map((r) => ({ ...r, data: r.data as unknown as ClarityResponse })), dayCount: rows.length ? 1 : 0 };
  }
  const from = new Date(`${today}T12:00:00Z`);
  from.setUTCDate(from.getUTCDate() - days);
  const fromKey = from.toISOString().slice(0, 10);
  const rows = await prisma.claritySnapshot.findMany({ where: { day: { gte: fromKey, not: "anlik" } }, orderBy: { day: "desc" } });
  return { rows: rows.map((r) => ({ ...r, data: r.data as unknown as ClarityResponse })), dayCount: new Set(rows.map((r) => r.day)).size };
}
