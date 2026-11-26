// lib/lead-followup.ts
// Talep takibi (26.11.2026): talebi kim arayacak (sorumlu) ve bir sonraki arama ne zaman. Saatler Kıbrıs saatiyle
// (Asia/Famagusta) girilir ve gösterilir; veritabanında UTC durur. Saf yardımcılar (testli).

const TZ = "Asia/Famagusta";
const DAY = 86_400_000;

function parts(d: Date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(d)
      .map((x) => [x.type, x.value]),
  );
  return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour, min: +p.minute };
}

/** Kıbrıs takvim günü: "2026-11-26" */
export function cyprusDayKey(d: Date) {
  const p = parts(d);
  return `${p.y}-${String(p.m).padStart(2, "0")}-${String(p.d).padStart(2, "0")}`;
}

/** Kıbrıs saatiyle girilen tarih + saat → gerçek an (yaz/kış saati dahil). Geçersizse null. */
export function cyprusLocalToDate(date: string, time: string): Date | null {
  const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date.trim());
  const tm = /^(\d{1,2}):(\d{2})$/.exec((time || "10:00").trim());
  if (!dm || !tm) return null;
  const [y, mo, d, h, mi] = [+dm[1], +dm[2], +dm[3], +tm[1], +tm[2]];
  if (mo < 1 || mo > 12 || d < 1 || d > 31 || h > 23 || mi > 59) return null;
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  // Kıbrıs ile UTC farkı o ana göre (iki kez: saat değişimi gecesinde doğru tarafa oturur)
  let t = guess;
  for (let i = 0; i < 2; i++) {
    const p = parts(new Date(t));
    const shown = Date.UTC(p.y, p.m - 1, p.d, p.h, p.min);
    t = guess - (shown - t);
  }
  const back = parts(new Date(t));
  if (back.y !== y || back.m !== mo || back.d !== d) return null; // 31 Şubat gibi
  return new Date(t);
}

/** Forma doldurmak için: Kıbrıs saatiyle tarih ve saat */
export function dateToCyprusInputs(d: Date | null | undefined) {
  if (!d) return { date: "", time: "" };
  const p = parts(d);
  return { date: cyprusDayKey(d), time: `${String(p.h).padStart(2, "0")}:${String(p.min).padStart(2, "0")}` };
}

export type FollowUpState = "gecikti" | "bugun" | "ileride";

/** Takibin durumu: zamanı geçti (gecikti), bugün (Kıbrıs günü), ileride */
export function followUpState(at: Date | null | undefined, now = new Date()): FollowUpState | null {
  if (!at) return null;
  if (at.getTime() < now.getTime()) return "gecikti";
  return cyprusDayKey(at) === cyprusDayKey(now) ? "bugun" : "ileride";
}

/** Kısa etiket: "Bugün 14:00", "Yarın 10:00", "28.11 09:30", "2 gün gecikti", "3 saat gecikti" */
export function followUpLabel(at: Date | null | undefined, now = new Date()) {
  if (!at) return "";
  const st = followUpState(at, now);
  const { time } = dateToCyprusInputs(at);
  if (st === "gecikti") {
    const late = now.getTime() - at.getTime();
    if (late < 3600_000) return `${Math.max(1, Math.round(late / 60_000))} dk gecikti`;
    if (late < DAY) return `${Math.round(late / 3600_000)} saat gecikti`;
    return `${Math.floor(late / DAY)} gün gecikti`;
  }
  if (st === "bugun") return `Bugün ${time}`;
  if (cyprusDayKey(at) === cyprusDayKey(new Date(now.getTime() + DAY))) return `Yarın ${time}`;
  const p = parts(at);
  return `${String(p.d).padStart(2, "0")}.${String(p.m).padStart(2, "0")} ${time}`;
}

/** Takip listesi: bugün sonuna kadar zamanı gelenler (gecikenler önce) */
export function dueFollowUps<T extends { followUpAt?: Date | null; status?: string }>(leads: T[], now = new Date()) {
  const today = cyprusDayKey(now);
  return leads
    .filter((l) => l.followUpAt && (l.followUpAt.getTime() < now.getTime() || cyprusDayKey(l.followUpAt) === today))
    .filter((l) => l.status !== "satis" && l.status !== "olumsuz")
    .sort((a, b) => a.followUpAt!.getTime() - b.followUpAt!.getTime());
}

/** Sorumlu adı: boşluklar sadeleşir, en çok 40 harf */
export const cleanAssignee = (s: unknown) => String(s ?? "").replace(/\s+/g, " ").trim().slice(0, 40);
