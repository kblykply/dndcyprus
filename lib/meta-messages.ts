// lib/meta-messages.ts
// Meta mesajları (Facebook Messenger + Instagram DM) → panel talepleri · 27.11.2026.
// DND'nin reklamları mesaj reklamı (Messenger + Instagram): yazan kişiler panele hiç düşmüyordu. Burada sayfanın sohbetleri
// okunur; her sohbet bir talep olur (eventId "meta-mesaj:<sohbet kimliği>"). Mesajda telefon ya da e-posta yazdıysa talebe
// işlenir; numara sonradan gelirse talep güncellenir ve not düşer. Aynı kişi panelde zaten varsa (telefon / e-posta) yeni talep
// açılmaz, mevcut talebine not düşülür.
//   META_LEADS_TOKEN → reklam formu çekimiyle aynı sistem kullanıcısı anahtarı; ek izinler: pages_messaging,
//                      pages_manage_metadata, instagram_basic, instagram_manage_messages (izin yoksa yalnız hata yazılır)
// Meta yalnız sohbetin son 20 mesajını verir; ilk çalışmada son 60 gün aktarılır, sonra yalnız değişen sohbetlere bakılır.
import { prisma } from "@/lib/prisma";
import { leadEmailConfigured, sendLeadEmail } from "@/lib/lead-email";
import { dndAkisLeadConfigured, sendDndAkisLead } from "@/lib/dnd-akis-lead";
import { allPages, graph, phoneKey, projectOf } from "@/lib/meta-leads";

export const META_MSG_SYNC_KEY = "meta-mesaj";
const DAY = 86_400_000;
const BACKFILL_DAYS = 60;
/** Bu kadar sessizlikten sonra yazan kişi için "tekrar yazdı" notu düşülür */
const REVISIT_GAP = 3 * DAY;
const NO_NUMBER = " · numara vermedi";

export type MsgPlatform = "messenger" | "instagram";
export type GraphPerson = { id: string; name?: string; username?: string };
export type GraphMsg = { id: string; message?: string; created_time?: string; from?: GraphPerson };
export type GraphConv = { id: string; updated_time: string; participants?: { data?: GraphPerson[] }; messages?: { data?: GraphMsg[] } };

/** Sohbet hafızası: l = talep kimliği, t = işlenen son müşteri mesajının zamanı */
type ConvMemo = { l?: number; t: number };
export type MetaMsgState = {
  lastRunAt?: string;
  /** platform başına: bu zamandan sonra güncellenen sohbetlere bakılır */
  lastTs?: Partial<Record<MsgPlatform, number>>;
  inserted?: number;
  updated?: number;
  merged?: number;
  conversations?: number;
  instagram?: string | null;
  error?: string | null;
  convs?: Record<string, ConvMemo>;
};

/* ---------------- Saf yardımcılar (testli) ---------------- */

const EMAIL_IN_TEXT = /[A-Z0-9._%+-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)*\.[A-Z]{2,}/gi;
const PHONE_IN_TEXT = /(?:\+|00)?\d[\d\s().\-/]{7,}\d/g;

/**
 * Mesaj metnindeki telefon ve e-postalar. Telefon en az 10, en çok 15 rakam (0533 123 45 67, +90 548 …, +44 7700 …);
 * fiyat (£169.000, 16.537.500 TL), tarih (27.11.2026) ve m² sayıları rakam sayısı ya da birim yüzünden alınmaz.
 */
export function extractContacts(text: string) {
  const emails = [...new Set((text.match(EMAIL_IN_TEXT) ?? []).map((e) => e.toLowerCase()))].filter((e) => !e.endsWith("@facebook.com"));
  const phones: string[] = [];
  for (const m of text.matchAll(PHONE_IN_TEXT)) {
    const raw = m[0];
    const at = m.index ?? 0;
    const before = text.slice(Math.max(0, at - 2), at);
    const after = text.slice(at + raw.length, at + raw.length + 4);
    if (/[£$€₺]\s?$/.test(before) || /^\s?(tl\b|try\b|gbp\b|eur\b|usd\b|m2|m²|£|€|\$|₺)/i.test(after)) continue;
    const digits = raw.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) continue;
    const p = /^(\+|00)/.test(raw) ? `+${raw.startsWith("00") ? digits.slice(2) : digits}` : digits;
    if (!phones.some((x) => phoneKey(x) === phoneKey(p))) phones.push(p);
  }
  return { phones: phones.slice(0, 3), emails: emails.slice(0, 3) };
}

const platformLabel = (p: MsgPlatform) => (p === "instagram" ? "Instagram mesajı" : "Messenger mesajı");

/** Sohbetteki müşteri (sayfa ya da Instagram hesabı olmayan katılımcı) ve onun mesajları, eskiden yeniye */
export function customerSide(conv: GraphConv, ownIds: string[]) {
  const own = new Set(ownIds);
  const person = (conv.participants?.data ?? []).find((p) => !own.has(p.id)) ?? null;
  const msgs = (conv.messages?.data ?? [])
    .filter((m) => m.from && !own.has(m.from.id))
    .map((m) => ({ ts: new Date(m.created_time || "").getTime(), text: (m.message || "").trim() }))
    .filter((m) => Number.isFinite(m.ts))
    .sort((a, b) => a.ts - b.ts);
  return { person, msgs };
}

const fmt = (ts: number) =>
  new Date(ts).toLocaleString("tr-TR", { timeZone: "Asia/Famagusta", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

/** Müşteri mesajları, ekibin okuyacağı biçimde: "27.11 14:05 · Merhaba, fiyat alabilir miyim?" */
export function transcript(msgs: { ts: number; text: string }[], max = 3000) {
  const s = msgs.map((m) => `${fmt(m.ts)} · ${m.text || "(fotoğraf / ek)"}`).join("\n");
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

/** Sohbetten panel talebi; müşteri hiç yazmamışsa null */
export function conversationLead(conv: GraphConv, platform: MsgPlatform, ownIds: string[]) {
  const { person, msgs } = customerSide(conv, ownIds);
  if (!msgs.length) return null;
  const all = msgs.map((m) => m.text).join("\n");
  const { phones, emails } = extractContacts(all);
  const project = projectOf(all);
  const name =
    platform === "instagram"
      ? person?.username ? `@${person.username}` : person?.name || "Instagram kullanıcısı"
      : person?.name || "Messenger kullanıcısı";
  const first = new Date(msgs[0].ts);
  const extra = [...phones.slice(1), ...emails.slice(1)];
  const src = platform === "instagram" ? "instagram" : "facebook";
  return {
    name: name.slice(0, 200),
    email: emails[0] ?? "",
    phone: phones[0] ?? null,
    subject: `${platformLabel(platform)}${project ? ` · ${project}` : ""}${phones.length || emails.length ? "" : NO_NUMBER}`.slice(0, 300),
    message: `${transcript(msgs)}${extra.length ? `\n\nDiğer iletişim: ${extra.join(", ")}` : ""}\n\nYanıt: Business Suite → Gelen kutusu`.slice(0, 4000),
    project,
    form: "meta-mesaj",
    source: `${src} / mesaj`,
    campaign: null as string | null,
    eventId: `meta-mesaj:${conv.id}`,
    createdAt: first,
    lastTs: msgs[msgs.length - 1].ts,
    attribution: { first: { utm_source: src, utm_medium: "mesaj", ts: first.getTime() }, last: null, current: null },
  };
}

/** Meta hatasını ekibin anlayacağı cümleye çevirir */
export function messageError(e: unknown) {
  const err = e as { code?: number; message?: string } | null;
  if (err?.code === 190) return "Meta anahtarı geçersiz ya da iptal edilmiş.";
  if (err?.code === 10 || err?.code === 200 || err?.code === 230 || err?.code === 3) return "mesaj okuma izni yok (anahtar yeni izinlerle oluşturulmalı).";
  return (err?.message || "bilinmeyen hata").slice(0, 200);
}

/* ---------------- Graph API ---------------- */

const CONV_FIELDS = "id,updated_time,participants,messages.limit(20){id,message,from,created_time}";

/** `since` sonrasında güncellenen sohbetler (Meta yeniden eskiye verir; sınıra gelince durulur) */
async function recentConversations(pageId: string, token: string, platform: MsgPlatform, since: number) {
  const out: GraphConv[] = [];
  let next: string | null = null;
  for (let i = 0; i < 20; i++) {
    const page: { data?: GraphConv[]; paging?: { next?: string } } =
      i === 0 ? await graph(`${pageId}/conversations`, token, { platform, fields: CONV_FIELDS, limit: "25" }) : await graph(next!, token);
    let stop = false;
    for (const c of page.data ?? []) {
      if (Date.parse(c.updated_time) < since) {
        stop = true;
        break;
      }
      out.push(c);
    }
    next = page.paging?.next ?? null;
    if (stop || !next) break;
  }
  return out;
}

/** Instagram bazen mesaj ayrıntısını sohbet listesinde vermez (yalnız kimlik): o zaman mesajlar tek tek okunur */
async function withMessageDetails(conv: GraphConv, token: string, budget: { left: number }) {
  const ms = conv.messages?.data ?? [];
  if (!ms.some((m) => !m.from || !m.created_time)) return conv;
  const take = ms.slice(0, Math.min(20, Math.max(0, budget.left)));
  budget.left -= take.length;
  const full = await Promise.all(take.map((m) => graph<GraphMsg>(m.id, token, { fields: "id,message,from,created_time" }).catch(() => null)));
  return { ...conv, messages: { data: full.filter((m): m is GraphMsg => !!m) } };
}

/* ---------------- Eşitleme ---------------- */

export async function loadMetaMsgState(): Promise<MetaMsgState | null> {
  try {
    const row = await prisma.syncState.findUnique({ where: { key: META_MSG_SYNC_KEY } });
    return (row?.data as MetaMsgState | undefined) ?? null;
  } catch {
    return null;
  }
}

type Notify = { leadId: number; at: Date; v: { name: string; email: string; phone: string | null; project: string | null; subject: string; message: string; source: string; eventId: string } };

/** Panelde aynı kişi (telefonun son 10 rakamı ya da e-posta) */
async function findPerson(phone: string | null, email: string) {
  const pk = phoneKey(phone);
  if (!pk && !email) return null;
  const candidates = await prisma.contactMessage.findMany({
    where: { OR: [...(email ? [{ email: { equals: email, mode: "insensitive" as const } }] : []), ...(pk ? [{ phone: { endsWith: pk.slice(-9) } }] : [])] },
    select: { id: true, phone: true, email: true },
    orderBy: { createdAt: "asc" },
    take: 5,
  });
  return candidates.find((c) => (pk && phoneKey(c.phone) === pk) || (email && c.email.toLowerCase() === email)) ?? null;
}

/**
 * Yeni ve değişen sohbetleri panele işler. 90 sn ve 300 tekil mesaj okuma sınırı var; sınıra gelinirse kalan sohbetler bir
 * sonraki çalışmada işlenir (platformun kaldığı yer işlenen son sohbetin zamanı olur).
 */
export async function syncMetaMessages(): Promise<MetaMsgState & { ok: boolean }> {
  const token = (process.env.META_LEADS_TOKEN || "").trim();
  const prev = (await loadMetaMsgState()) ?? {};
  const now = Date.now();
  const state: MetaMsgState = { ...prev, lastRunAt: new Date(now).toISOString(), inserted: 0, updated: 0, merged: 0, conversations: 0, error: null };
  const convs: Record<string, ConvMemo> = { ...(prev.convs ?? {}) };
  const lastTs: Partial<Record<MsgPlatform, number>> = { ...(prev.lastTs ?? {}) };
  const errors: string[] = [];
  const notify: Notify[] = [];
  const budget = { left: 300 };
  const deadline = now + 90_000;

  const save = async () => {
    // hafıza en çok 3000 sohbet (en son yazanlar kalır)
    const kept = Object.entries(convs).sort((a, b) => b[1].t - a[1].t).slice(0, 3000);
    state.convs = Object.fromEntries(kept);
    state.lastTs = lastTs;
    state.error = errors.length ? errors.join(" · ").slice(0, 400) : null;
    await prisma.syncState.upsert({
      where: { key: META_MSG_SYNC_KEY },
      create: { key: META_MSG_SYNC_KEY, data: state as object },
      update: { data: state as object },
    });
  };

  if (!token) {
    state.error = "META_LEADS_TOKEN tanımlı değil.";
    return { ...state, ok: false };
  }

  const handle = async (conv: GraphConv, platform: MsgPlatform, ownIds: string[], pageToken: string) => {
    const full = await withMessageDetails(conv, pageToken, budget);
    const v = conversationLead(full, platform, ownIds);
    if (!v) return;
    const memo = convs[conv.id];
    const { msgs } = customerSide(full, ownIds);
    const fresh = msgs.filter((m) => m.ts > (memo?.t ?? 0));
    if (!fresh.length) return;
    let leadId = memo?.l;
    if (!leadId) leadId = (await prisma.contactMessage.findFirst({ where: { eventId: v.eventId }, select: { id: true } }))?.id;

    if (!leadId) {
      const match = await findPerson(v.phone, v.email);
      if (match) {
        await prisma.leadNote.create({
          data: { leadId: match.id, kind: "not", text: `${platformLabel(platform)} ile yazdı:\n${transcript(msgs, 1500)}`, author: "Meta", createdAt: new Date(v.lastTs) },
        });
        state.merged = (state.merged ?? 0) + 1;
        convs[conv.id] = { l: match.id, t: v.lastTs };
        return;
      }
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
      state.inserted = (state.inserted ?? 0) + 1;
      convs[conv.id] = { l: created.id, t: v.lastTs };
      if (v.phone || v.email) notify.push({ leadId: created.id, at: new Date(v.lastTs), v });
      return;
    }

    // Bilinen sohbet: yeni mesajda telefon / e-posta varsa talebe işle; uzun aradan sonra yazdıysa not düş
    const lead = await prisma.contactMessage.findUnique({ where: { id: leadId }, select: { id: true, name: true, phone: true, email: true, subject: true, project: true, message: true } });
    const lastFresh = fresh[fresh.length - 1].ts;
    convs[conv.id] = { l: leadId, t: lastFresh };
    if (!lead) return; // ekip talebi silmiş: yeniden açılmaz
    const found = extractContacts(fresh.map((m) => m.text).join("\n"));
    const newPhones = found.phones.filter((p) => phoneKey(p) !== phoneKey(lead.phone));
    const newEmails = found.emails.filter((e) => e !== lead.email.toLowerCase());
    if (newPhones.length || newEmails.length) {
      const data: { phone?: string; email?: string; subject?: string } = {};
      if (!lead.phone && newPhones[0]) data.phone = newPhones[0];
      if (!lead.email && newEmails[0]) data.email = newEmails[0];
      if (lead.subject.endsWith(NO_NUMBER)) data.subject = lead.subject.slice(0, -NO_NUMBER.length);
      if (Object.keys(data).length) await prisma.contactMessage.update({ where: { id: lead.id }, data });
      await prisma.leadNote.create({
        data: {
          leadId: lead.id,
          kind: "not",
          text: `${platformLabel(platform)}nda iletişim bilgisi verdi: ${[...newPhones, ...newEmails].join(", ")}\n${transcript(fresh, 1500)}`,
          author: "Meta",
          createdAt: new Date(lastFresh),
        },
      });
      state.updated = (state.updated ?? 0) + 1;
      if (data.phone || data.email) {
        notify.push({
          leadId: lead.id,
          at: new Date(lastFresh),
          v: { name: lead.name, email: data.email ?? lead.email, phone: data.phone ?? lead.phone, project: lead.project, subject: data.subject ?? lead.subject, message: lead.message, source: v.source, eventId: `${v.eventId}:${lastFresh}` },
        });
      }
    } else if (memo?.t && fresh[0].ts - memo.t > REVISIT_GAP) {
      await prisma.leadNote.create({
        data: { leadId: lead.id, kind: "not", text: `${platformLabel(platform)} ile tekrar yazdı:\n${transcript(fresh, 1500)}`, author: "Meta", createdAt: new Date(lastFresh) },
      });
      state.updated = (state.updated ?? 0) + 1;
    }
  };

  try {
    const pages = await allPages<{ id: string; name: string; access_token?: string }>("me/accounts", token, { fields: "id,name,access_token", limit: "100" }, 5);
    for (const page of pages) {
      const pageToken = page.access_token || token;
      const targets: { platform: MsgPlatform; ownIds: string[] }[] = [{ platform: "messenger", ownIds: [page.id] }];
      try {
        const p = await graph<{ instagram_business_account?: { id: string; username?: string } }>(page.id, pageToken, { fields: "instagram_business_account{id,username}" });
        const ig = p.instagram_business_account;
        if (ig?.id) {
          targets.push({ platform: "instagram", ownIds: [page.id, ig.id] });
          state.instagram = ig.username ? `@${ig.username}` : ig.id;
        }
      } catch (e) {
        errors.push(`Instagram hesabı: ${messageError(e)}`);
      }
      for (const t of targets) {
        const label = t.platform === "instagram" ? "Instagram" : "Messenger";
        try {
          const since = (lastTs[t.platform] ?? now - BACKFILL_DAYS * DAY) - 3600_000;
          // eskiden yeniye: süre ya da okuma sınırı dolarsa kalan yer kaydedilir, sonraki çalışma oradan sürer
          const list = (await recentConversations(page.id, pageToken, t.platform, since)).sort((a, b) => Date.parse(a.updated_time) - Date.parse(b.updated_time));
          let reached = lastTs[t.platform] ?? 0;
          let complete = true;
          for (const conv of list) {
            if (Date.now() > deadline || budget.left <= 0) {
              complete = false;
              break;
            }
            await handle(conv, t.platform, t.ownIds, pageToken);
            state.conversations = (state.conversations ?? 0) + 1;
            reached = Math.max(reached, Date.parse(conv.updated_time));
          }
          lastTs[t.platform] = complete ? Math.max(reached, now - 3600_000) : reached;
        } catch (e) {
          errors.push(`${label}: ${messageError(e)}`);
        }
      }
    }
  } catch (e) {
    errors.push(messageError(e));
  }
  await save();

  // bildirim: yalnız son 3 saatte yazılan ve toplu olmayanlar (ilk geçmiş aktarımında e-posta yağmuru olmasın)
  const recent = notify.filter((x) => now - x.at.getTime() < 3 * 3600_000);
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
          form: "meta-mesaj",
          source: x.v.source,
          campaign: null,
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
        form: "meta-mesaj",
        source: x.v.source,
        campaign: null,
        eventId: x.v.eventId,
        receivedAt: x.at,
        leadId: x.leadId,
      }).catch(() => null);
    }
  }
  return { ...state, ok: !state.error };
}
