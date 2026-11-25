// app/pl/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "@/app/globals.css";

import AzureHeader from "@/app/components/azure/AzureHeader";
import AzureFooter from "@/app/components/azure/AzureFooter";
import AzureFx from "@/app/components/azure/AzureFx";
import WhatsAppAzure from "@/app/components/azure/WhatsAppAzure";
import { SiteContactProvider } from "@/app/components/cms/SiteContact";
import { getSiteContact } from "@/lib/content/store";

// Başlık sayfalarda (pageMetadata) verilir; burada yalnızca varsayılan açıklama kalır
export const metadata: Metadata = {
  description:
    "Poznaj DND Cyprus – czołowego dewelopera na Cyprze, realizującego nowoczesne inwestycje mieszkaniowe i komercyjne.",
};

export default async function PLLayout({ children }: { children: ReactNode }) {
  const contact = await getSiteContact("pl"); // telefon/e-posta/adres panelden
  return (
    <SiteContactProvider value={contact}>
    <div>
      {/* Accessibility: skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200]"
      >
        Przejdź do treści
      </a>

      <AzureFx />

      <AzureHeader locale="pl" />

      <main id="main" className="az-page min-h-[60vh]">
        {children}
        <WhatsAppAzure locale="pl" />
      </main>

      <AzureFooter locale="pl" />
    </div>
    </SiteContactProvider>
  );
}
