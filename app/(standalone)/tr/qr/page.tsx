import type { Metadata } from "next";
import Image from "next/image";

const title = "Joy Cafe Haftalık Menü";
const description = "La Joya Resort & Residences Joy Cafe haftalık yemek menüsü.";
const menuImage = "/qr/joy-cafe-menu.webp";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tr/qr" },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/tr/qr",
    locale: "tr_TR",
    images: [{ url: menuImage, width: 1600, height: 1600, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: [menuImage] },
};

export default function QrMenuPage() {
  return (
    <main className="min-h-svh bg-[#f5f4ef]">
      <Image
        src={menuImage}
        alt="Joy Cafe haftalık menüsü: Pazartesiden pazara günlük yemekler, kişi başı 280 TL. Sipariş: +90 539 134 0363."
        width={1600}
        height={1600}
        preload
        // Keep the full-resolution menu legible when visitors pinch to zoom.
        unoptimized
        className="mx-auto block h-auto w-full max-w-[1600px]"
      />
    </main>
  );
}
