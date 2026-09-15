// app/tr/layout.tsx
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "../globals.css";

import Header from "../components/headers/HeaderTr";
import Footer from "../components/footers/FooterTr";
import WhatsAppFab from "../components/whatsapp/WhatsappTr";
import SocialIcons from "../components/SocialIcons";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

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

// Başlık sayfalarda (pageMetadata) verilir; burada yalnızca varsayılan açıklama kalır
export const metadata: Metadata = {
  description:
    "Kıbrıs'ın önde gelen gayrimenkul geliştiricisi DND Cyprus ile tanışın. Yenilikçi konut ve ticari projelerimizle yaşam alanlarını yeniden tanımlıyoruz.",
};

// Site geneli kuruluş yapısal verisi (JSON-LD) — her sayfada bir kez basılır
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/DND.png`,
  email: "info@dndcyprus.com",
  telephone: "+90 392 444 03 63",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alasya Park Sitesi 2. Etap, Dükkan No: 2-3, Uluçam Yolu, Sakarya",
    addressLocality: "Gazimağusa",
    addressCountry: "CY",
  },
  sameAs: [
    "https://cy.linkedin.com/company/dndcyprus",
    "https://www.instagram.com/dndcyprus/",
    "https://www.facebook.com/dndcyprus/",
    "https://www.youtube.com/@dndcyprus",
  ],
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ORGANIZATION_JSON_LD).replace(/</g, "\\u003c"),
        }}
      />

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
