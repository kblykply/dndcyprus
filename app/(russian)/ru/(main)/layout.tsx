// app/ru/(main)/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "@/app/globals.css";

import AzureHeader from "@/app/components/azure/AzureHeader";
import AzureFooter from "@/app/components/azure/AzureFooter";
import AzureFx from "@/app/components/azure/AzureFx";
import WhatsAppAzure from "@/app/components/azure/WhatsAppAzure";

// Başlık sayfalarda (pageMetadata) verilir; burada yalnızca varsayılan açıklama kalır
export const metadata: Metadata = {
  description:
    "DND Cyprus — ведущий девелопер на Кипре: инновационные жилые и коммерческие проекты.",
};

export default function RULayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Accessibility: skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200]"
      >
        Перейти к содержимому
      </a>

      <AzureFx />

      <AzureHeader locale="ru" />

      <main id="main" className="az-page min-h-[60vh]">
        {children}
        <WhatsAppAzure locale="ru" />
      </main>

      <AzureFooter locale="ru" />
    </div>
  );
}
