"use server";
// app/(default)/admin/leads/actions.ts
// Satış talebi işlemleri: durum değiştirme (tek ve toplu) ve iç not. Her işlem oturumu yeniden doğrular
// (sunucu eylemleri doğrudan POST ile de çağrılabilir; middleware'e güvenilmez).

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE, safeAdminNext, verifyAdminSession } from "@/lib/admin-session";
import { MANUAL_CHANNELS, isLeadStatus, manualChannel, parseLeadForm, statusInfo } from "@/lib/lead-status";

const AUTHOR_COOKIE = "admin_author";

async function requireAdmin() {
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) redirect("/admin/login?next=/admin/leads");
  return store;
}

function backTo(formData: FormData) {
  return safeAdminNext(String(formData.get("back") || "/admin/leads"));
}

function authorName(store: Awaited<ReturnType<typeof cookies>>, formData?: FormData) {
  const typed = String(formData?.get("author") || "").trim().slice(0, 60);
  if (typed) {
    store.set(AUTHOR_COOKIE, encodeURIComponent(typed), { httpOnly: true, sameSite: "lax", secure: true, path: "/admin", maxAge: 60 * 60 * 24 * 365 });
    return typed;
  }
  const saved = store.get(AUTHOR_COOKIE)?.value;
  if (saved) {
    try {
      return decodeURIComponent(saved).slice(0, 60);
    } catch {
      /* bozuk çerez */
    }
  }
  return (process.env.ADMIN_USER || "Yönetici").slice(0, 60);
}

async function changeStatus(ids: number[], status: string, author: string) {
  if (!ids.length || !isLeadStatus(status)) return;
  const leads = await prisma.contactMessage.findMany({ where: { id: { in: ids } }, select: { id: true, status: true } });
  const changed = leads.filter((l) => l.status !== status);
  if (!changed.length) return;
  const now = new Date();
  await prisma.$transaction([
    prisma.contactMessage.updateMany({ where: { id: { in: changed.map((l) => l.id) } }, data: { status, statusAt: now } }),
    prisma.leadNote.createMany({
      data: changed.map((l) => ({
        leadId: l.id,
        kind: "durum",
        text: `Durum: ${statusInfo(l.status).label} → ${statusInfo(status).label}`,
        author,
        createdAt: now,
      })),
    }),
  ]);
}

export async function setLeadStatus(formData: FormData) {
  const store = await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isSafeInteger(id) && id > 0) await changeStatus([id], String(formData.get("status")), authorName(store));
  revalidatePath("/admin", "layout");
  redirect(backTo(formData));
}

export async function setLeadStatusBulk(formData: FormData) {
  const store = await requireAdmin();
  const ids = formData
    .getAll("ids")
    .map((v) => Number(v))
    .filter((n) => Number.isSafeInteger(n) && n > 0)
    .slice(0, 500);
  await changeStatus(ids, String(formData.get("status")), authorName(store));
  revalidatePath("/admin", "layout");
  redirect(backTo(formData));
}

export async function addLeadNote(formData: FormData) {
  const store = await requireAdmin();
  const id = Number(formData.get("id"));
  const text = String(formData.get("text") || "").trim().slice(0, 2000);
  if (Number.isSafeInteger(id) && id > 0 && text) {
    const exists = await prisma.contactMessage.findUnique({ where: { id }, select: { id: true } });
    if (exists) await prisma.leadNote.create({ data: { leadId: id, kind: "not", text, author: authorName(store, formData) } });
  }
  revalidatePath("/admin/leads");
  redirect(backTo(formData));
}

/* ---------------- Talep ekle / düzenle / sil (CRUD) ---------------- */

export type LeadFormState = { error?: string; values?: Record<string, string>; at?: number } | undefined;

/** Hata dönüşünde girilenler korunur (React 19 form eyleminden sonra alanları sıfırlar) */
function failed(error: string, formData: FormData): LeadFormState {
  const values: Record<string, string> = {};
  for (const k of ["name", "email", "phone", "project", "unitType", "subject", "message", "status", "channel", "createdAt"]) values[k] = String(formData.get(k) ?? "");
  return { error, values, at: Date.now() };
}

function formGetter(formData: FormData) {
  return (k: string) => String(formData.get(k) ?? "");
}

export async function createLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const store = await requireAdmin();
  const parsed = parseLeadForm(formGetter(formData));
  if (!parsed.ok) return failed(parsed.error, formData);
  const v = parsed.value;
  const channel = v.channel ?? "telefon";
  const channelLabel = MANUAL_CHANNELS.find((c) => c.key === channel)?.label ?? "Diğer";
  const author = authorName(store);
  const lead = await prisma.contactMessage.create({
    data: {
      name: v.name,
      email: v.email,
      phone: v.phone,
      project: v.project,
      unitType: v.unitType,
      subject: v.subject || `${v.project ? v.project + " – " : ""}${channelLabel} ile gelen talep`,
      message: v.message,
      status: v.status,
      statusAt: v.status !== "yeni" ? new Date() : null,
      form: "panel",
      source: `${channel} / manuel`,
      ...(v.createdAt ? { createdAt: v.createdAt } : {}),
      notes: { create: { kind: "durum", text: `Panelden eklendi (${channelLabel}).`, author } },
    },
    select: { id: true },
  });
  revalidatePath("/admin", "layout");
  redirect(`/admin/leads?id=${lead.id}`);
}

export async function updateLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const store = await requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isSafeInteger(id) || id <= 0) return failed("Talep bulunamadı.", formData);
  const current = await prisma.contactMessage.findUnique({ where: { id }, select: { id: true, status: true, source: true, form: true } });
  if (!current) return failed("Talep bulunamadı.", formData);
  const parsed = parseLeadForm(formGetter(formData));
  if (!parsed.ok) return failed(parsed.error, formData);
  const v = parsed.value;
  const author = authorName(store);
  const statusChanged = v.status !== current.status;
  // Kaynak yalnız elle eklenen taleplerde değişir; siteden gelenin reklam kaynağı korunur
  const source = current.form === "panel" || manualChannel(current.source) ? `${v.channel ?? manualChannel(current.source) ?? "diger"} / manuel` : undefined;
  await prisma.$transaction([
    prisma.contactMessage.update({
      where: { id },
      data: {
        name: v.name,
        email: v.email,
        phone: v.phone,
        project: v.project,
        unitType: v.unitType,
        subject: v.subject || "Bilgi talebi",
        message: v.message,
        status: v.status,
        ...(statusChanged ? { statusAt: new Date() } : {}),
        ...(source ? { source } : {}),
        ...(v.createdAt ? { createdAt: v.createdAt } : {}),
      },
    }),
    prisma.leadNote.create({
      data: {
        leadId: id,
        kind: "durum",
        text: statusChanged
          ? `Talep bilgileri düzenlendi; durum: ${statusInfo(current.status).label} → ${statusInfo(v.status).label}`
          : "Talep bilgileri düzenlendi.",
        author,
      },
    }),
  ]);
  revalidatePath("/admin", "layout");
  redirect(`/admin/leads?id=${id}`);
}

export async function deleteLead(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isSafeInteger(id) && id > 0) await prisma.contactMessage.deleteMany({ where: { id } }); // notlar ON DELETE CASCADE
  revalidatePath("/admin", "layout");
  redirect("/admin/leads");
}

export async function deleteLeadNote(formData: FormData) {
  await requireAdmin();
  const noteId = Number(formData.get("noteId"));
  if (Number.isSafeInteger(noteId) && noteId > 0) await prisma.leadNote.deleteMany({ where: { id: noteId, kind: "not" } });
  revalidatePath("/admin/leads");
  redirect(backTo(formData));
}

/* ---------------- Sayfa yenilenmeden çalışan eylemler (talep ayrıntısı) ----------------
 * Form istemcide çalışır: düğme kayıt sürerken kilitlenir, sonuç bildirim olarak görünür, sayfa yönlendirilmeden
 * güncellenir (revalidatePath aynı yanıtta yeni görünümü getirir). Aynı not 2 dakika içinde ikinci kez kaydedilmez.
 */
export type LiveState = { ok?: boolean; message?: string; error?: string; at?: number } | undefined;

export async function addLeadNoteLive(_prev: LiveState, formData: FormData): Promise<LiveState> {
  const store = await requireAdmin();
  const id = Number(formData.get("id"));
  const text = String(formData.get("text") || "").trim().slice(0, 2000);
  if (!Number.isSafeInteger(id) || id <= 0) return { error: "Talep bulunamadı.", at: Date.now() };
  if (!text) return { error: "Not boş olamaz.", at: Date.now() };
  const exists = await prisma.contactMessage.findUnique({ where: { id }, select: { id: true } });
  if (!exists) return { error: "Talep bulunamadı (silinmiş olabilir).", at: Date.now() };
  const recent = await prisma.leadNote.findFirst({ where: { leadId: id, kind: "not", text, createdAt: { gte: new Date(Date.now() - 120_000) } }, select: { id: true } });
  if (recent) return { ok: true, message: "Bu not zaten eklendi.", at: Date.now() };
  await prisma.leadNote.create({ data: { leadId: id, kind: "not", text, author: authorName(store, formData) } });
  revalidatePath("/admin/leads");
  return { ok: true, message: "Not eklendi.", at: Date.now() };
}

export async function setLeadStatusLive(_prev: LiveState, formData: FormData): Promise<LiveState> {
  const store = await requireAdmin();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));
  if (!Number.isSafeInteger(id) || id <= 0 || !isLeadStatus(status)) return { error: "Durum değiştirilemedi.", at: Date.now() };
  await changeStatus([id], status, authorName(store));
  revalidatePath("/admin", "layout");
  return { ok: true, message: `Durum: ${statusInfo(status).label}`, at: Date.now() };
}

export async function deleteLeadNoteLive(_prev: LiveState, formData: FormData): Promise<LiveState> {
  await requireAdmin();
  const noteId = Number(formData.get("noteId"));
  if (!Number.isSafeInteger(noteId) || noteId <= 0) return { error: "Not bulunamadı.", at: Date.now() };
  await prisma.leadNote.deleteMany({ where: { id: noteId, kind: "not" } });
  revalidatePath("/admin/leads");
  return { ok: true, message: "Not silindi.", at: Date.now() };
}
