// app/en/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "@/app/globals.css";

import HeaderEn from "@/app/components/headers/HeaderEn"; // English header
import Footer from "@/app/components/footers/FooterEn";              // Generic or EN footer
import WhatsAppFab from "@/app/components/whatsapp/WhatsappEn";
import SocialIcons from "@/app/components/SocialIcons";


// Başlık sayfalarda (pageMetadata) verilir; burada yalnızca varsayılan açıklama kalır
export const metadata: Metadata = {
  description:
    "Discover DND Cyprus, a leading real-estate developer in Cyprus with innovative residential and commercial projects.",
};





export default function ENLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Accessibility: skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50"
      >
        Skip to content
      </a>



      <HeaderEn />

      {/* If HeaderEn is fixed, give top padding (e.g., pt-[72px]) to avoid overlap */}
      <main id="main" className="min-h-[60vh]">
        {children}
                <WhatsAppFab phone="+90 548 888 03 63" />

        <SocialIcons />

      </main>

      <Footer />
    </div>
  );
}
