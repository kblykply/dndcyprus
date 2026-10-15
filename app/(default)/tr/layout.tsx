import MotionProvider from "@/app/components/performance/MotionProvider";
// app/tr/layout.tsx
import type { Metadata } from "next";
import "@/app/globals.css";

import Header from "@/app/components/headers/HeaderTr";
import Footer from "@/app/components/footers/FooterTr";
import WhatsAppFab from "@/app/components/whatsapp/WhatsappTr";
import SocialIcons from "@/app/components/SocialIcons";
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
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50"
      >
        İçeriğe atla
      </a>

      <JsonLd data={ORGANIZATION_JSON_LD} />

      {/* TR'ye özel Header */}
      <Header />

      {/* Header fixed ise uygun bir üst boşluk ekleyin: pt-[72px] gibi */}
      <main id="main" className="min-h-[60vh]">
        {children}
                        <WhatsAppFab phone="+90 548 888 03 63" />
        
        
        <SocialIcons />
      </main>

      <Footer />
    </MotionProvider>
  );
}
