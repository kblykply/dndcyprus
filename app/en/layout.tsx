// app/en/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "../globals.css";

import HeaderEn from "../components/headers/HeaderEn"; // English header
import Footer from "../components/footers/FooterEn";              // Generic or EN footer
import WhatsAppFab from "../components/whatsapp/WhatsappEn";

export const metadata: Metadata = {
  title: "DND Cyprus — English",
  description:
    "Discover DND Cyprus, a leading real-estate developer in Cyprus with innovative residential and commercial projects.",
};

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

export default function ENLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${inter.variable} ${montserrat.variable} antialiased`}>
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

      </main>

      <Footer />
    </div>
  );
}
