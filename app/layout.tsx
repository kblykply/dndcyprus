// app/layout.tsx
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import SocialIcons from "./components/SocialIcons";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const stored = cookies().get("locale")?.value;
  const lang = stored === "en" ? "en" : "tr"; // default TR

  return (
    <html lang={lang}>
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        <SocialIcons />
        {children}
        
      </body>
    </html>
  );
}
