// app/en/layout.tsx
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
    "Discover DND Cyprus, a leading real-estate developer in Cyprus with innovative residential and commercial projects.",
};

export default async function ENLayout({ children }: { children: ReactNode }) {
  const contact = await getSiteContact("en"); // telefon/e-posta/adres panelden
  return (
    <SiteContactProvider value={contact}>
    <div>
      {/* Accessibility: skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200]"
      >
        Skip to content
      </a>

      <AzureFx />

      <AzureHeader locale="en" />

      <main id="main" className="az-page min-h-[60vh]">
        {children}
        <WhatsAppAzure locale="en" />
      </main>

      <AzureFooter locale="en" />
    </div>
    </SiteContactProvider>
  );
}
