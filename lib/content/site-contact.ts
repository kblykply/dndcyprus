// lib/content/site-contact.ts
// Site geneli iletişim bilgisi (telefon, cep/WhatsApp, e-posta, merkez ofis adresi ve saatleri). Panelden düzenlenir
// (İçerik → İletişim ve alt bilgi → Telefon ve e-posta; tüm dillerde ortak). Saf yardımcılar: sunucu, istemci ve testler kullanır.
import { CONTACT, type Locale } from "@/lib/azure/site";

export type SiteContact = {
  phone: string;
  phoneHref: string;
  mobile: string;
  /** wa.me için yalnız rakam, ülke koduyla (905…) */
  whatsapp: string;
  email: string;
  hq: string;
  hours: string;
};

export const digits = (s: string) => String(s ?? "").replace(/\D/g, "");

export function siteContact(t: { phone: string; mobile: string; whatsapp: string; email: string }, hq: string, hours: string): SiteContact {
  const p = digits(t.phone);
  return {
    phone: t.phone.trim() || CONTACT.phone,
    phoneHref: p ? `tel:+${p}` : CONTACT.phoneHref,
    mobile: t.mobile.trim() || CONTACT.mobile,
    whatsapp: digits(t.whatsapp) || CONTACT.whatsapp,
    email: t.email.trim() || CONTACT.email,
    hq,
    hours,
  };
}

export const defaultSiteContact = (l: Locale): SiteContact => siteContact(CONTACT, CONTACT.hq[l], CONTACT.hours[l]);
