import JsonLd from "@/app/components/seo/JsonLd";
import { ORGANIZATION_JSON_LD } from "@/lib/structured-data";
import MotionProvider from "@/app/components/performance/MotionProvider";
// app/ru/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getSiteContact } from "@/lib/content/store";

// Başlık sayfalarda verilir; kök layout "DND Cyprus" varsayılanını taşır
export const metadata: Metadata = {
  description: "Премиальные жилые проекты на Северном Кипре",
};

export default async function RuLayout({
  children,
}: {
  children: ReactNode;
}) {
  const contact = await getSiteContact("ru"); // telefon/e-posta/adres panelden
  return (
    <MotionProvider>
      <JsonLd data={{ ...ORGANIZATION_JSON_LD, email: contact.email, telephone: contact.phone }} />
      {children}
    </MotionProvider>
  );
}