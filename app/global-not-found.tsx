// Eşleşmeyen her adres için markalı 404 (sitede birden çok kök düzen olduğundan Next varsayılan 404'ü
// gösteriyordu). next.config: experimental.globalNotFound.
import type { Metadata } from "next";
import { inter, montserrat } from "@/app/fonts";
import RootDocument from "@/app/components/RootDocument";
import NotFoundContent from "@/app/components/NotFoundContent";

export const metadata: Metadata = {
  title: { absolute: "Sayfa bulunamadı (404) | DND Cyprus" },
  description: "Aradığınız sayfa bulunamadı. / Page not found. / Seite nicht gefunden. / Страница не найдена. / Nie znaleziono strony.",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <RootDocument lang="tr" fontClass={`${inter.variable} ${montserrat.variable}`}>
      <NotFoundContent />
    </RootDocument>
  );
}
