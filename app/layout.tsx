// app/layout.tsx
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Inter, Montserrat } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
import { CONSENT_COOKIE, CONSENT_DEFAULT_SCRIPT } from "@/lib/analytics";
import AnalyticsRoot from "./components/analytics/AnalyticsRoot";
import "./globals.css";

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
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description:
    "Kıbrıs'ın önde gelen gayrimenkul geliştiricisi DND Cyprus ile tanışın. Yenilikçi konut ve ticari projelerimizle yaşam alanlarını yeniden tanımlıyoruz.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: { card: "summary_large_image" },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: {
    "facebook-domain-verification": "w1ojaqwwotv6uzovm0on3w6lkrq03n",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Dil, adres yolundan gelir (middleware x-dnd-locale başlığını yazar).
  // Eskiden çerezden okunuyordu; /en sayfaları çerezsiz ziyaretçiye lang="tr" gidiyordu.
  const h = await headers();
  const lang = h.get("x-dnd-locale") === "en" ? "en" : "tr";
  // İzin çerezi yoksa çerez bandı sunucuda çizilir (ilk ziyarette LCP'yi JS'e bağlamaz)
  const needsConsent = !(await cookies()).get(CONSENT_COOKIE)?.value;

  return (
    <html lang={lang}>
      <head>
        {/* Google Consent Mode v2: her etiketten önce varsayılan "denied" (KVKK/GDPR) */}
        <Script id="consent-default" strategy="beforeInteractive">
          {CONSENT_DEFAULT_SCRIPT}
        </Script>
      </head>
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        {children}
        <AnalyticsRoot needsConsent={needsConsent} />
      </body>
    </html>
  );
}
