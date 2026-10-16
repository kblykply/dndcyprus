import { Outfit, Albert_Sans } from "next/font/google";

// Azure tasarımı: başlıklar Outfit, metinler Albert Sans. Her iki dil kökü aynı örnekleri paylaşır;
// değişken adları eski (Inter/Montserrat) kurulumla aynı tutuldu, globals.css bunları okur.
export const inter = Albert_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans-core",
  display: "swap",
});

export const montserrat = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display-core",
  display: "swap",
});

