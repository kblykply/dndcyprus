// lib/meta-leads.ts
// Meta (Facebook / Instagram) reklam formu talepleri → panel (yalnız sunucu) · 26.11.2026.
// DND Cyprus işletmesindeki "DND Panel Talepler" sistem kullanıcısının anahtarıyla, ona atanan sayfaların reklam formlarındaki
// talepler çekilir (Graph API: /me/accounts → /{sayfa}/leadgen_forms → /{form}/leads). Her talep bir kez eklenir (eventId
// "meta-lead:<kimlik>"); telefonu ya da e-postası panelde zaten olan kişi için yeni kayıt açılmaz, mevcut kaydına not düşer.
//   META_LEADS_TOKEN        → sistem kullanıcısı anahtarı (leads_retrieval, pages_show_list, pages_read_engagement, pages_manage_ads,
//                              business_management, ads_read) — Vercel, Production
//   META_GRAPH_API_VERSION  → isteğe bağlı (ör. v23.0)
import { prisma } from "@/lib/prisma";
import { leadEmailConfigured, sendLeadEmail } from "@/lib/lead-email";
import { dndAkisLeadConfigured, sendDndAkisLead } from "@/lib/dnd-akis-lead";

export const META_SYNC_KEY = "meta-leads";
const DAY = 86_400_000;

export const metaLeadsConfigured = () => !!(process.env.META_LEADS_TOKEN || "").trim();
export const graphVersion = () => {
  const v = (process.env.META_GRAPH_API_VERSION || "").trim();
  return /^v\d+\.\d+$/.test(v) ? v : "v23.0";
};

export type MetaField = { name: string; values?: string[] };
export type MetaLead = {
  id: string;
  created_time: string;
  field_data?: MetaField[];
  ad_id?: string;
  ad_name?: string;
  adset_name?: string;
  campaign_name?: string;
  platform?: string;
  is_organic?: boolean;
};
export type MetaSyncState = {
  lastRunAt?: string;
  lastLeadTs?: number;
  inserted?: number;
  merged?: number;
  forms?: number;
  pages?: string[];
  error?: string | null;
  seen?: string[];
};

/* ---------------- Saf yardımcılar (testli) ---------------- */

const STD = new Set(["full_name", "first_name", "last_name", "email", "phone_number", "phone"]);
const norm = (s: string) => s.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i");

/** Talep hangi projeye ait: form / kampanya / reklam adından */
export function projectOf(...texts: (string | undefined)[]): string | null {
  const t = norm(texts.filter(Boolean).join(" "));
  if (/neo ?city/.test(t)) return "NeoCity";
  if (/lagoon/.test(t)) return "Lagoon Verde";
  if (/perla[ -]?(ii|2)\b/.test(t)) return "La Joya Perla II";
  if (/perla/.test(t)) return "La Joya Perla";
  if (/mariachi/.test(t)) return "Mariachi Beach Club";
  if (/la ?joya/.test(t)) return "La Joya";
  return null;
}

/** "hangi_daire_tipi?" → "Hangi daire tipi?" */
export function questionLabel(key: string) {
  const s = key.replace(/_/g, " ").replace(/\s+/g, " ").trim();
  return s ? s[0].toLocaleUpperCase("tr-TR") + s.slice(1) : key;
}

/** Meta talebi → panel kaydı alanları */
export function mapMetaLead(lead: MetaLead, formName: string) {
  const f = new Map((lead.field_data ?? []).map((x) => [x.name, (x.values ?? []).join(", ").trim()]));
  const name = f.get("full_name") || [f.get("first_name"), f.get("last_name")].filter(Boolean).join(" ") || "Meta talebi";
  const email = (f.get("email") || "").trim().toLowerCase();
  const phone = (f.get("phone_number") || f.get("phone") || "").replace(/[^\d+]/g, "") || null;
  const answers = [...f.entries()].filter(([k, v]) => !STD.has(k) && v).map(([k, v]) => `${questionLabel(k)}: ${v}`);
  const platform = (lead.platform || "").toLowerCase() === "ig" ? "instagram" : "facebook";
  const createdAt = new Date(lead.created_time);
  return {
    name: name.slice(0, 200),
    email,
    phone,
    subject: `Meta reklam formu · ${formName}`.slice(0, 300),
    message: (answers.length ? answers.join("\n") : "Meta reklam formundan talep.").slice(0, 4000),
    project: projectOf(formName, lead.campaign_name, lead.ad_name),
    form: "meta-lead",
    source: lead.is_organic ? `${platform} / organic` : `${platform} / paid`,
    campaign: lead.campaign_name || null,
    eventId: `meta-lead:${lead.id}`,
    createdAt: Number.isFinite(createdAt.getTime()) ? createdAt : new Date(),
    attribution: {
      first: {
        utm_source: platform,
        utm_medium: lead.is_organic ? "organic" : "paid",
        ...(lead.campaign_name ? { utm_campaign: lead.campaign_name } : {}),
        ...(lead.ad_name ? { utm_content: lead.ad_name } : {}),
        ...(lead.adset_name ? { utm_term: lead.adset_name } : {}),
        ts: Number.isFinite(createdAt.getTime()) ? createdAt.getTime() : Date.now(),
      },
      last: null,
      current: null,
    },
  };
}

/** Telefonun karşılaştırma anahtarı: son 10 rakam (ülke kodu ve baştaki 0 farkı yok sayılır) */
export const phoneKey = (p: string | null | undefined) => {
  const d = String(p ?? "").replace(/\D/g, "");
  return d.length >= 8 ? d.slice(-10) : "";
};

/* ---------------- Graph API ---------------- */

export async function graph<T>(path: string, token: string, params: Record<string, string> = {}, timeoutMs = 20_000): Promise<T> {
  const url = path.startsWith("https://") ? new URL(path) : new URL(`https://graph.facebook.com/${graphVersion()}/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store", signal: AbortSignal.timeout(timeoutMs) });
  const body = (await r.json().catch(() => null)) as (T & { error?: { message?: string; code?: number; error_subcode?: number; type?: string } }) | null;
  if (!r.ok || !body || body.error) {
    const code = body?.error?.code;
    // Teşhis: hangi adımın neden reddedildiği (yalnız yol ve Meta'nın mesajı; sorgu dizesi ve jeton yazılmaz)
    console.warn("META_GRAPH_ERROR", { step: url.pathname.replace(/\/\d{6,}/g, "/:id"), status: r.status, code, subcode: body?.error?.error_subcode, type: body?.error?.type, message: (body?.error?.message || "").slice(0, 240) });
    const msg = code === 190 ? "Meta anahtarı geçersiz ya da iptal edilmiş." : code === 10 || code === 200 ? "Meta izni eksik (talep erişimi verilmemiş olabilir)." : body?.error?.message || `Meta ${r.status}`;
    throw Object.assign(new Error(msg), { code, subcode: body?.error?.error_subcode });
  }
  return body;
}

export async function allPages<T>(path: string, token: string, params: Record<string, string>, max = 50): Promise<T[]> {
  const out: T[] = [];
  let next: string | null = null;
  let first = true;
  for (let i = 0; i < max && (first || next); i++) {
    const page: { data?: T[]; paging?: { next?: string } } = first ? await graph(path, token, params) : await graph(next!, token);
    first = false;
    out.push(...(page.data ?? []));
    next = page.paging?.next ?? null;
  }
  return out;
}

/* ---------------- Eşitleme ---------------- */

export async function loadMetaSyncState(): Promise<MetaSyncState | null> {
  try {
    const row = await prisma.syncState.findUnique({ where: { key: META_SYNC_KEY } });
    return (row?.data as MetaSyncState | undefined) ?? null;
  } catch {
    return null;
  }
}

/**
 * Yeni talepleri çeker ve panele ekler. İlk çalışmada son 90 günü (Meta'nın sakladığı süre) alır; sonra son talepten 1 saat
 * öncesinden başlar (çakışma eventId ile ayıklanır). Bildirim e-postası yalnız son 3 saatte gelen ve toplu olmayan taleplerde.
 */
export async function syncMetaLeads(): Promise<MetaSyncState & { ok: boolean }> {
  const token = (process.env.META_LEADS_TOKEN || "").trim();
  const prev = (await loadMetaSyncState()) ?? {};
  const now = Date.now();
  const state: MetaSyncState = { ...prev, lastRunAt: new Date(now).toISOString(), inserted: 0, merged: 0, error: null };
  const save = async () => {
    await prisma.syncState.upsert({
      where: { key: META_SYNC_KEY },
      create: { key: META_SYNC_KEY, data: state as object },
      update: { data: state as object },
    });
  };
  if (!token) {
    state.error = "META_LEADS_TOKEN tanımlı değil.";
    return { ...state, ok: false };
  }
  const since = Math.floor(((prev.lastLeadTs ?? now - 90 * DAY) - 3600_000) / 1000);
  const seen = new Set(prev.seen ?? []);
  const fresh: { leadId: number; v: ReturnType<typeof mapMetaLead> }[] = [];
  try {
    const pages = await allPages<{ id: string; name: string; access_token?: string }>("me/accounts", token, { fields: "id,name,access_token", limit: "100" }, 5);
    state.pages = pages.map((p) => p.name);
    let forms = 0;
    let maxTs = prev.lastLeadTs ?? 0;
    for (const page of pages) {
      const pageToken = page.access_token || token;
      const lfs = await allPages<{ id: string; name: string; status?: string }>(`${page.id}/leadgen_forms`, pageToken, { fields: "id,name,status", limit: "200" }, 5);
      forms += lfs.length;
      for (const form of lfs) {
        const leads = await allPages<MetaLead>(`${form.id}/leads`, pageToken, {
          fields: "id,created_time,field_data,ad_id,ad_name,adset_name,campaign_name,platform,is_organic",
          limit: "100",
          filtering: JSON.stringify([{ field: "time_created", operator: "GREATER_THAN", value: since }]),
        });
        for (const lead of leads) {
          const ts = new Date(lead.created_time).getTime();
          if (Number.isFinite(ts) && ts > maxTs) maxTs = ts;
          const eventId = `meta-lead:${lead.id}`;
          if (seen.has(lead.id)) continue;
          const v = mapMetaLead(lead, form.name);
          const already = await prisma.contactMessage.findFirst({ where: { eventId }, select: { id: true } });
          if (already) {
            seen.add(lead.id);
            continue;
          }
          // aynı kişi panelde varsa (telefon / e-posta) yeni kayıt açılmaz, not düşülür
          const pk = phoneKey(v.phone);
          const candidates = await prisma.contactMessage.findMany({
            where: { OR: [...(v.email ? [{ email: { equals: v.email, mode: "insensitive" as const } }] : []), ...(pk ? [{ phone: { endsWith: pk.slice(-9) } }] : [])] },
            select: { id: true, phone: true, email: true },
            take: 5,
          });
          const match = candidates.find((c) => (pk && phoneKey(c.phone) === pk) || (v.email && c.email.toLowerCase() === v.email));
          if (match) {
            await prisma.leadNote.create({
              data: { leadId: match.id, kind: "not", text: `Meta reklam formunu tekrar doldurdu: ${form.name}${v.message && v.message !== "Meta reklam formundan talep." ? `\n${v.message}` : ""}`, author: "Meta", createdAt: v.createdAt },
            });
            state.merged = (state.merged ?? 0) + 1;
          } else {
            const created = await prisma.contactMessage.create({
              data: {
                name: v.name,
                email: v.email,
                phone: v.phone,
                subject: v.subject,
                message: v.message,
                project: v.project,
                form: v.form,
                source: v.source,
                campaign: v.campaign,
                eventId: v.eventId,
                attribution: v.attribution as object,
                createdAt: v.createdAt,
              },
              select: { id: true },
            });
            fresh.push({ leadId: created.id, v });
            state.inserted = (state.inserted ?? 0) + 1;
          }
          seen.add(lead.id);
        }
      }
    }
    state.forms = forms;
    state.lastLeadTs = maxTs || prev.lastLeadTs;
    state.seen = [...seen].slice(-3000);
  } catch (e) {
    state.error = (e as Error).message.slice(0, 300);
    state.seen = [...seen].slice(-3000);
  }
  await save();
  // bildirim (e-posta + DND Akış kartı): yalnız yeni (son 3 saat) ve toplu olmayan talepler — ilk geçmiş aktarımda yağmur olmasın
  const recent = fresh.filter((x) => now - x.v.createdAt.getTime() < 3 * 3600_000);
  if (recent.length && recent.length <= 10) {
    for (const x of recent) {
      if (dndAkisLeadConfigured()) {
        await sendDndAkisLead({
          name: x.v.name,
          email: x.v.email,
          phone: x.v.phone ?? undefined,
          project: x.v.project ?? undefined,
          message: x.v.message,
          subject: x.v.subject,
          form: x.v.form,
          source: x.v.source,
          campaign: x.v.campaign,
        }).catch(() => null);
      }
      if (!leadEmailConfigured()) continue;
      await sendLeadEmail({
        name: x.v.name,
        email: x.v.email,
        phone: x.v.phone ?? undefined,
        project: x.v.project ?? undefined,
        subject: x.v.subject,
        message: x.v.message,
        form: x.v.form,
        source: x.v.source,
        campaign: x.v.campaign,
        eventId: x.v.eventId,
        receivedAt: x.v.createdAt,
        leadId: x.leadId,
      }).catch(() => null);
    }
  }
  return { ...state, ok: !state.error };
}
