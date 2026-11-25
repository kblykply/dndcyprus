// Azure tasarımı: başlıklar Outfit, metinler Albert Sans. Yazı tipleri sitenin içinden (public/fonts + fonts.css);
// derleme artık Google Fonts'a bağlı değil. Değişken adları eski (Inter/Montserrat) kurulumla aynı tutuldu, globals.css bunları okur.
import "./fonts.css";

export const inter = { variable: "font-sans-core" };
export const montserrat = { variable: "font-display-core" };

/** Sayfa başında önceden yüklenecek dosyalar (next/font'un yaptığı gibi dört dosya da) */
export const FONT_PRELOADS = [
  "/fonts/albert-sans-latin.v1.woff2",
  "/fonts/albert-sans-latin-ext.v1.woff2",
  "/fonts/outfit-latin.v1.woff2",
  "/fonts/outfit-latin-ext.v1.woff2",
];
