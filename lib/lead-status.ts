// lib/lead-status.ts
// Satış talebi takibi (25.11.2026): durumlar, kaynak etiketleri, dönem filtreleri ve panelin süzme/özet hesapları.
// Saf fonksiyonlar: hem panel sayfası hem Excel indirme aynı kuralı kullanır, birim testleri doğrudan çağırır.

export const LEAD_STATUSES = [
  { key: "yeni", label: "Yeni", pill: "border-amber-200 bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  { key: "arandi", label: "Arandı", pill: "border-slate-200 bg-slate-50 text-slate-600", dot: "bg-slate-400" },
  { key: "gorusuluyor", label: "Görüşülüyor", pill: "border-blue-200 bg-blue-50 text-blue-700", dot: "bg-blue-500" },
  { key: "satis", label: "Satış", pill: "border-teal-200 bg-teal-50 text-teal-700", dot: "bg-teal-500" },
  { key: "olumsuz", label: "Olumsuz", pill: "border-rose-200 bg-rose-50 text-rose-600", dot: "bg-rose-400" },
  // Alıcı olmayan kayıt (tedarikçi teklifi, iş başvurusu, reklam/hizmet satışı…): listede kalır, satış rakamlarına girmez (26.11.2026)
  { key: "satis_disi", label: "Satış dışı", pill: "border-violet-200 bg-violet-50 text-violet-700", dot: "bg-violet-400" },
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number]["key"];

export function isLeadStatus(v: unknown): v is LeadStatus {
  return typeof v === "string" && LEAD_STATUSES.some((s) => s.key === v);
}

export function statusInfo(v: string | null | undefined) {
  return LEAD_STATUSES.find((s) => s.key === v) ?? LEAD_STATUSES[0];
}

/** Satış talebi mi? "Satış dışı" işaretlenenler (tedarikçi, iş başvurusu vb.) özet, dönüşüm, rapor ve takipte sayılmaz */
export const isSalesLead = (l: { status: string | null }) => statusInfo(l.status).key !== "satis_disi";

/** Talebin geldiği yer, ekibin okuyacağı biçimde: "Web sitesi · İletişim formu", "Meta reklam formu", "Panelden eklendi" */
export function formOrigin(form: string | null | undefined) {
  if (!form) return "Web sitesi formu";
  if (form === "meta-lead" || form === "meta-mesaj" || form === "panel") return formLabel(form);
  return `Web sitesi · ${formLabel(form)}`;
}

/** Kaynak: formun kaydettiği "utm_source / utm_medium" metninden ekibin okuyacağı gruba */
export type SourceGroup = { key: string; label: string };

export function sourceGroup(source: string | null | undefined): SourceGroup {
  const raw = (source || "").trim();
  if (!raw) return { key: "bilinmiyor", label: "Bilinmiyor" };
  const [srcPart, ...rest] = raw.toLowerCase().split(" / ");
  const src = srcPart.trim();
  const medium = rest.join(" / ").trim();
  const paid = /(^|[^a-z])(cpc|ppc|paid|ads?|cpm|cpv|display|fbclid|paidsocial|paid_social|social_paid)([^a-z]|$)/.test(medium);

  if (medium === "manuel") {
    const ch = MANUAL_CHANNELS.find((c) => c.key === src);
    if (src === "instagram") return { key: "instagram", label: "Instagram" };
    if (src === "facebook") return { key: "facebook", label: "Facebook" };
    if (src === "whatsapp") return { key: "whatsapp", label: "WhatsApp" };
    if (src === "e-posta") return { key: "e-posta", label: "E-posta" };
    return { key: `manuel-${ch ? ch.key : "diger"}`, label: ch ? ch.label : "Diğer" };
  }
  if (src === "(direct)") return { key: "dogrudan", label: "Doğrudan" };
  if (/^(ig|instagram)(\.com)?$|instagram/.test(src)) return paid ? { key: "meta-reklam", label: "Meta reklam" } : { key: "instagram", label: "Instagram" };
  if (/^(fb|facebook|meta|m\.facebook\.com|l\.facebook\.com)$|facebook/.test(src)) return paid ? { key: "meta-reklam", label: "Meta reklam" } : { key: "facebook", label: "Facebook" };
  if (/google/.test(src)) {
    if (paid) return { key: "google-ads", label: "Google Ads" };
    if (medium === "organic" || medium === "referral") return { key: "google-arama", label: "Google arama" };
    return { key: "google", label: "Google" };
  }
  if (medium === "organic") return { key: "arama", label: "Arama motoru" };
  if (/whatsapp|wa\.me/.test(src)) return { key: "whatsapp", label: "WhatsApp" };
  if (medium === "email" || /mail/.test(src)) return { key: "e-posta", label: "E-posta" };
  if (medium === "referral") return { key: "site", label: "Başka site" };
  return { key: "diger", label: "Diğer" };
}

/** Panelden elle eklenen talebin geldiği kanal; kaynak "<kanal> / manuel" olarak saklanır */
export const MANUAL_CHANNELS = [
  { key: "telefon", label: "Telefon" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "instagram", label: "Instagram mesajı" },
  { key: "facebook", label: "Facebook mesajı" },
  { key: "ofis", label: "Ofis ziyareti" },
  { key: "referans", label: "Referans" },
  { key: "fuar", label: "Fuar / etkinlik" },
  { key: "e-posta", label: "E-posta" },
  { key: "diger", label: "Diğer" },
] as const;

export function manualChannel(source: string | null | undefined) {
  const m = /^([a-z-]+) \/ manuel$/.exec((source || "").trim().toLowerCase());
  return m && MANUAL_CHANNELS.some((c) => c.key === m[1]) ? m[1] : null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadInput = {
  name: string;
  email: string;
  phone: string | null;
  project: string | null;
  unitType: string | null;
  subject: string;
  message: string;
  status: LeadStatus;
  channel: string | null;
  createdAt: Date | null;
};

/** Panel formu (ekle/düzenle) doğrulaması: ad zorunlu; telefon ya da geçerli e-posta zorunlu */
export function parseLeadForm(get: (k: string) => string): { ok: true; value: LeadInput } | { ok: false; error: string } {
  const t = (k: string, max: number) => get(k).trim().slice(0, max);
  const name = t("name", 120);
  const email = t("email", 254);
  const phone = t("phone", 40);
  if (!name) return { ok: false, error: "Ad soyad gerekli." };
  if (email && !EMAIL_RE.test(email)) return { ok: false, error: "E-posta adresi geçersiz." };
  if (!email && phone.replace(/\D/g, "").length < 6) return { ok: false, error: "Telefon ya da e-posta gerekli." };
  const status = get("status");
  const channel = get("channel");
  const when = get("createdAt").trim();
  let createdAt: Date | null = null;
  if (when) {
    createdAt = cyprusLocalToUtc(when);
    if (!createdAt) return { ok: false, error: "Talep tarihi geçersiz." };
  }
  return {
    ok: true,
    value: {
      name,
      email,
      phone: phone || null,
      project: t("project", 80) || null,
      unitType: t("unitType", 80) || null,
      subject: t("subject", 200),
      message: t("message", 5000),
      status: isLeadStatus(status) ? status : "yeni",
      channel: MANUAL_CHANNELS.some((c) => c.key === channel) ? channel : null,
      createdAt,
    },
  };
}

/** "2026-11-25T17:44" (Kıbrıs saati, datetime-local) → UTC Date */
export function cyprusLocalToUtc(v: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(v);
  if (!m) return null;
  const guess = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]));
  if (Number.isNaN(guess.getTime())) return null;
  return new Date(guess.getTime() - cyprusOffsetMinutes(guess) * 60_000);
}

/** UTC Date → datetime-local değeri (Kıbrıs saati) */
export function utcToCyprusLocal(d: Date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(d)
      .map((x) => [x.type, x.value]),
  );
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

export const PERIODS = [
  { key: "tumu", label: "Tüm zamanlar", days: 0 },
  { key: "7g", label: "Son 7 gün", days: 7 },
  { key: "30g", label: "Son 30 gün", days: 30 },
  { key: "90g", label: "Son 90 gün", days: 90 },
  { key: "bu-ay", label: "Bu ay", days: -1 },
] as const;

export type PeriodKey = (typeof PERIODS)[number]["key"];

const TZ = "Asia/Famagusta";

/** Kıbrıs saatine göre ayın ilk anı (UTC Date) */
export function cyprusMonthStart(now: Date, monthOffset = 0) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit" }).formatToParts(now).map((x) => [x.type, x.value]),
  );
  let y = Number(p.year);
  let m = Number(p.month) - 1 + monthOffset;
  y += Math.floor(m / 12);
  m = ((m % 12) + 12) % 12;
  // Ayın 1'i 00:00 Kıbrıs → UTC: Kıbrıs UTC+2/+3; o anki ofseti hesapla
  const guess = new Date(Date.UTC(y, m, 1, 0, 0, 0));
  const offsetMin = cyprusOffsetMinutes(guess);
  return new Date(guess.getTime() - offsetMin * 60_000);
}

function cyprusOffsetMinutes(d: Date) {
  const s = new Intl.DateTimeFormat("en-US", { timeZone: TZ, timeZoneName: "longOffset" }).format(d);
  const m = /GMT([+-])(\d{2}):?(\d{2})?/.exec(s);
  if (!m) return 120;
  return (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3] || 0));
}

export function periodStart(key: string | undefined, now: Date): Date | null {
  const p = PERIODS.find((x) => x.key === key);
  if (!p || p.days === 0) return null;
  if (p.days === -1) return cyprusMonthStart(now);
  return new Date(now.getTime() - p.days * 24 * 3600 * 1000);
}

export type LeadLike = {
  id: number;
  createdAt: Date;
  name: string;
  email: string;
  phone: string | null;
  project: string | null;
  source: string | null;
  status: string;
};

export type LeadFilters = { durum?: string; q?: string; proje?: string; kaynak?: string; donem?: string };

const fold = (s: string) => s.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i");
const digitsOnly = (s: string) => s.replace(/\D/g, "");

/** Durum dışındaki filtreler (sekme sayıları bunlarla hesaplanır) */
export function filterLeads<T extends LeadLike>(leads: T[], f: LeadFilters, now = new Date(), withStatus = true): T[] {
  const from = periodStart(f.donem, now);
  const q = (f.q || "").trim();
  const qFold = fold(q);
  const qDigits = digitsOnly(q);
  return leads.filter((l) => {
    if (withStatus && f.durum && f.durum !== "tumu" && l.status !== f.durum) return false;
    if (f.proje && (f.proje === "-" ? !!l.project : l.project !== f.proje)) return false;
    if (f.kaynak && sourceGroup(l.source).key !== f.kaynak) return false;
    if (from && l.createdAt < from) return false;
    if (q) {
      const hay = fold(`${l.name} ${l.email}`);
      const phoneHit = qDigits.length >= 3 && digitsOnly(l.phone || "").includes(qDigits);
      if (!hay.includes(qFold) && !phoneHit) return false;
    }
    return true;
  });
}

export function statusCounts(leads: { status: string }[]) {
  const c: Record<string, number> = { tumu: leads.length };
  for (const s of LEAD_STATUSES) c[s.key] = 0;
  for (const l of leads) c[statusInfo(l.status).key] += 1;
  return c;
}

/** Özet kartları: tüm talepler üzerinden (filtreden bağımsız) */
export function leadSummary(allLeads: LeadLike[], now = new Date()) {
  const leads = allLeads.filter(isSalesLead);
  const thisMonth = cyprusMonthStart(now);
  const lastMonth = cyprusMonthStart(now, -1);
  const months = Array.from({ length: 7 }, (_, i) => cyprusMonthStart(now, i - 6));
  const monthly = months.map((start, i) => {
    const end = i < 6 ? months[i + 1] : new Date(8.64e15);
    return leads.filter((l) => l.createdAt >= start && l.createdAt < end).length;
  });
  const waiting = leads.filter((l) => statusInfo(l.status).key === "yeni");
  const oldestWaiting = waiting.reduce<Date | null>((m, l) => (!m || l.createdAt < m ? l.createdAt : m), null);
  const talked = leads.filter((l) => ["arandi", "gorusuluyor"].includes(statusInfo(l.status).key)).length;
  const sold = leads.filter((l) => statusInfo(l.status).key === "satis").length;
  const projects = new Map<string, number>();
  for (const l of leads) if (l.project) projects.set(l.project, (projects.get(l.project) || 0) + 1);
  const topProject = [...projects.entries()].sort((a, b) => b[1] - a[1])[0] ?? null;
  return {
    total: leads.length,
    thisMonth: leads.filter((l) => l.createdAt >= thisMonth).length,
    lastMonth: leads.filter((l) => l.createdAt >= lastMonth && l.createdAt < thisMonth).length,
    monthly,
    monthStarts: months,
    waiting: waiting.length,
    oldestWaitingDays: oldestWaiting ? Math.floor((now.getTime() - oldestWaiting.getTime()) / 86_400_000) : null,
    talked,
    sold,
    conversion: leads.length ? (sold / leads.length) * 100 : 0,
    topProject,
  };
}

/** WhatsApp için uluslararası numara: 05xx… → 905xx…, 5xx… (10 hane) → 905xx…; diğerleri olduğu gibi */
export function waNumber(phone: string | null | undefined) {
  let d = digitsOnly(phone || "");
  if (!d) return "";
  if (d.startsWith("00")) d = d.slice(2);
  if (d.length === 11 && d.startsWith("05")) d = "9" + d;
  else if (d.length === 10 && d.startsWith("5")) d = "90" + d;
  return d.length >= 8 ? d : "";
}

export function telHref(phone: string | null | undefined) {
  const raw = (phone || "").trim();
  if (!raw) return "";
  const wa = waNumber(raw);
  return raw.startsWith("+") ? `tel:${raw.replace(/[^\d+]/g, "")}` : wa ? `tel:+${wa}` : `tel:${digitsOnly(raw)}`;
}

export const FORM_LABELS: Record<string, string> = {
  contact: "İletişim formu",
  lead: "Proje formu",
  form: "Proje formu",
  "meta-lead": "Meta reklam formu",
  "meta-mesaj": "Meta reklam mesajı (Instagram/Facebook)",
  panel: "Panelden eklendi",
};

export function formLabel(form: string | null | undefined) {
  if (!form) return "Web sitesi formu";
  return FORM_LABELS[form] ?? form;
}

export function cyprusDateTime(d: Date) {
  const s = d.toLocaleString("tr-TR", { timeZone: TZ, day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const [date, time] = s.split(" ");
  return { date, time: time ?? "" };
}
