// lib/meta-capi.ts
// Sunucu: Meta Conversions API "Lead" olayı. Pixel ile aynı event_id → Meta tekilleştirir.
// Token yalnızca ortam değişkeninden okunur ve asla loglanmaz; hata kullanıcı isteğini bozmaz.

import { createHash } from "node:crypto";
import { normalizePhoneE164 } from "./analytics";

export type MetaLeadInput = {
  eventId: string;
  eventSourceUrl?: string;
  email: string;
  phone?: string;
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  /** _fbc çerezi yoksa fbc bundan üretilir */
  fbclid?: string;
  fbclidTs?: number;
  contentName?: string;
  locale?: "tr" | "en";
};

let warnedMissingVersion = false;

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

export function metaCapiConfigured() {
  return !!(process.env.NEXT_PUBLIC_META_PIXEL_ID || "").trim() && !!(process.env.META_CAPI_TOKEN || "").trim();
}

export async function sendMetaLeadEvent(input: MetaLeadInput): Promise<void> {
  const pixelId = (process.env.NEXT_PUBLIC_META_PIXEL_ID || "").trim();
  const token = (process.env.META_CAPI_TOKEN || "").trim();
  if (!pixelId || !token) return;

  const version = (process.env.META_GRAPH_API_VERSION || "").trim();
  if (!/^v\d+\.\d+$/.test(version)) {
    if (!warnedMissingVersion) {
      console.warn("META_CAPI_SKIPPED: META_GRAPH_API_VERSION eksik veya geçersiz (ör. v2X.0)");
      warnedMissingVersion = true;
    }
    return;
  }
  if (!/^\d+$/.test(pixelId)) {
    console.warn("META_CAPI_SKIPPED: NEXT_PUBLIC_META_PIXEL_ID geçersiz");
    return;
  }

  const userData: Record<string, unknown> = {};
  const email = input.email.trim().toLowerCase();
  if (email) userData.em = [sha256(email)];
  const phone = normalizePhoneE164(input.phone, input.locale);
  if (phone) userData.ph = [sha256(phone.replace(/\D/g, ""))];
  if (input.clientIp) userData.client_ip_address = input.clientIp;
  if (input.userAgent) userData.client_user_agent = input.userAgent;
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;
  else if (input.fbclid) userData.fbc = `fb.1.${input.fbclidTs || Date.now()}.${input.fbclid}`;

  const event: Record<string, unknown> = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: input.eventId,
    action_source: "website",
    user_data: userData,
    custom_data: input.contentName ? { content_name: input.contentName } : {},
  };
  if (input.eventSourceUrl) event.event_source_url = input.eventSourceUrl;

  const body: Record<string, unknown> = { data: [event], access_token: token };
  const testCode = (process.env.META_TEST_EVENT_CODE || "").trim();
  if (testCode) body.test_event_code = testCode;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(`https://graph.facebook.com/${version}/${pixelId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) {
      let code: unknown;
      let subcode: unknown;
      try {
        const j = (await res.json()) as { error?: { code?: unknown; error_subcode?: unknown } };
        code = j?.error?.code;
        subcode = j?.error?.error_subcode;
      } catch {
        // gövde okunamadı
      }
      // Yalnızca durum ve hata kodu; kişisel veri ya da token yok
      console.warn("META_CAPI_FAILED", { status: res.status, code, subcode });
    }
  } catch (err) {
    const reason = err instanceof Error && err.name === "AbortError" ? "timeout" : "network";
    console.warn("META_CAPI_FAILED", { reason });
  } finally {
    clearTimeout(timer);
  }
}
