"use client";
// app/components/cms/SiteContact.tsx
// İstemci bileşenleri (menü, iletişim kartı, WhatsApp düğmesi) panelden gelen iletişim bilgisini buradan okur.
// Yerleşim (layout) sunucuda değeri çekip sağlayıcıyla verir; sağlayıcı yoksa koddaki bilgi kullanılır.
import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/lib/azure/site";
import { defaultSiteContact, type SiteContact } from "@/lib/content/site-contact";

const Ctx = createContext<SiteContact | null>(null);

export function SiteContactProvider({ value, children }: { value: SiteContact; children: ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSiteContact(locale: Locale): SiteContact {
  return useContext(Ctx) ?? defaultSiteContact(locale);
}
