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
import PaymentModelPopup from "@/app/components/PaymentModelPopup";
import { TL_POPUP_PRESCRIPT } from "@/lib/tl-popup";
import { SiteContactProvider } from "@/app/components/cms/SiteContact";
import { getSiteContact } from "@/lib/content/store";

// Başlık sayfalarda (pageMetadata) verilir; burada yalnızca varsayılan açıklama kalır
export const metadata: Metadata = {
  description:
    "Kıbrıs'ın önde gelen gayrimenkul geliştiricisi DND Cyprus ile tanışın. Yenilikçi konut ve ticari projelerimizle yaşam alanlarını yeniden tanımlıyoruz.",
};

export default async function TRLayout({ children }: { children: React.ReactNode }) {
  const contact = await getSiteContact("tr"); // telefon/e-posta/adres panelden
  return (
    <MotionProvider>
    <SiteContactProvider value={contact}>
      {/* Erişilebilirlik: İçeriğe atla */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200]"
      >
        İçeriğe atla
      </a>

      <JsonLd data={{ ...ORGANIZATION_JSON_LD, email: contact.email, telephone: contact.phone }} />

      {/* Azure: arka plan ışık lekeleri + kaydırma efektleri */}
      <AzureFx />

      <AzureHeader locale="tr" />

      {/* Ana sayfa TL ödeme modeli penceresi: ilk HTML'de gelir, <main class="az-page"> dışında (menünün üstünde kalsın diye).
          Önündeki komut bu oturumda kapatıldıysa pencereyi çizilmeden gizler. Bileşen yalnız /tr'de görünür. */}
      <script dangerouslySetInnerHTML={{ __html: TL_POPUP_PRESCRIPT }} />
      <PaymentModelPopup />

      <main id="main" className="az-page min-h-[60vh]">
        {children}
        <WhatsAppAzure locale="tr" />
      </main>

      <AzureFooter locale="tr" />
    </SiteContactProvider>
    </MotionProvider>
  );
}
