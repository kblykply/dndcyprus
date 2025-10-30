import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import SocialIcons from "./components/SocialIcons";
import WhatsAppFab from "@/app/components/WhatsAppFab";
import Preloader from "./components/Preloader";
import Footer from "./components/Footer";

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
  title: "DND Cyprus ",
  description: "Kıbrıs'ın önde gelen gayrimenkul geliştiricisi DND Cyprus ile tanışın. Yenilikçi konut ve ticari projelerimizle yaşam alanlarını yeniden tanımlıyoruz.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} antialiased` }>
        <Header />
        <SocialIcons />
        {children}

        <Footer/>
              <WhatsAppFab phone="+90 548 888 03 63" />

      </body>
    </html>
  );
}
