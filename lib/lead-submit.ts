// lib/lead-submit.ts
// Tüm formların ortak gönderimi: kaynak bilgisi + izin bayrakları ile /api/contact'a POST,
// başarıda generate_lead (Meta Pixel ve CAPI aynı eventId ile tekilleştirilir).

import { localeFromPath, readConsent, setEnhancedConversionData, track } from "./analytics";
import { getAttribution } from "./attribution";

export type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  project?: string;
  unitType?: string;
  /** "contact", "lead" … admin'de ve olaylarda form türü */
  form: string;
  /** honeypot */
  company?: string;
};

export type LeadSubmitResult = { ok: boolean; error?: string };

function newEventId() {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  } catch {
    // eski tarayıcı
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}-${Math.random().toString(36).slice(2, 12)}`;
}

export async function submitLead(payload: LeadPayload): Promise<LeadSubmitResult> {
  // Bot: sessizce başarılı say, kaydetme ve ölçme
  if (payload.company && payload.company.trim()) return { ok: true };

  const eventId = newEventId();
  const consent = readConsent();
  const consentFlags = { analytics: !!consent?.analytics, ads: !!consent?.ads };
  const pageUrl = `${location.origin}${location.pathname}${location.search}`;

  let res: Response;
  try {
    res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        pageUrl,
        eventId,
        attribution: getAttribution(),
        consent: consentFlags,
      }),
    });
  } catch {
    return { ok: false, error: "network" };
  }

  if (!res.ok) {
    let error = "server";
    try {
      const j = (await res.json()) as { error?: unknown };
      if (typeof j?.error === "string") error = j.error;
    } catch {
      // gövde JSON değil
    }
    return { ok: false, error };
  }

  try {
    // Gelişmiş dönüşümler dönüşümden önce ayarlanmalı
    if (consentFlags.ads) {
      setEnhancedConversionData({
        email: payload.email,
        phone: payload.phone,
        locale: localeFromPath(location.pathname),
      });
    }
    track("generate_lead", { project: payload.project, form: payload.form }, { eventId });
  } catch {
    // ölçüm hatası kullanıcıya yansımaz
  }

  return { ok: true };
}
