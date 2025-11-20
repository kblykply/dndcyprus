// app/tr/layout.tsx
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "../globals.css";

import Header from "../components/headers/HeaderTr";
import Footer from "../components/footers/FooterTr";
import WhatsAppFab from "../components/whatsapp/WhatsappTr";
import SocialIcons from "../components/SocialIcons";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DND Cyprus",
  description:
    "Kıbrıs'ın önde gelen gayrimenkul geliştiricisi DND Cyprus ile tanışın. Yenilikçi konut ve ticari projelerimizle yaşam alanlarını yeniden tanımlıyoruz.",
};

export default function TRLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} ${montserrat.variable} antialiased`}>
      {/* Erişilebilirlik: İçeriğe atla */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50"
      >
        İçeriğe atla
      </a>

      {/* TR'ye özel Header */}
      <Header />

      {/* Header fixed ise uygun bir üst boşluk ekleyin: pt-[72px] gibi */}
      <main id="main" className="min-h-[60vh]">
        {children}
                        <WhatsAppFab phone="+90 548 888 03 63" />
        
        
        <SocialIcons />
      </main>

      <Footer />
    </div>
  );
}
