import MotionProvider from "@/app/components/performance/MotionProvider";
// app/tr/layout.tsx
import type { Metadata } from "next";
import "@/app/globals.css";

import AzureHeader from "@/app/components/azure/AzureHeader";
import AzureFooter from "@/app/components/azure/AzureFooter";
import AzureFx from "@/app/components/azure/AzureFx";
import WhatsAppAzure from "@/app/components/azure/WhatsAppAzure";
import { ORGANIZATION_JSON_LD } from "@/lib/structured-data";
import JsonLd from "@/app/components/seo/JsonLd";

// Başlık sayfalarda (pageMetadata) verilir; burada yalnızca varsayılan açıklama kalır
export const metadata: Metadata = {
  description:
    "Kıbrıs'ın önde gelen gayrimenkul geliştiricisi DND Cyprus ile tanışın. Yenilikçi konut ve ticari projelerimizle yaşam alanlarını yeniden tanımlıyoruz.",
};

export default function TRLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      {/* Erişilebilirlik: İçeriğe atla */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200]"
      >
        İçeriğe atla
      </a>

      <JsonLd data={ORGANIZATION_JSON_LD} />

      {/* Azure: arka plan ışık lekeleri + kaydırma efektleri */}
      <AzureFx />

      <AzureHeader locale="tr" />

      <main id="main" className="az-page min-h-[60vh]">
        {children}
        <WhatsAppAzure locale="tr" />
      </main>

      <AzureFooter locale="tr" />
    </MotionProvider>
  );
}
