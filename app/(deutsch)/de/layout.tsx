import JsonLd from "@/app/components/seo/JsonLd";
import { ORGANIZATION_JSON_LD } from "@/lib/structured-data";
import MotionProvider from "@/app/components/performance/MotionProvider";
// app/de/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getSiteContact } from "@/lib/content/store";

// Başlık sayfalarda verilir; kök layout "DND Cyprus" varsayılanını taşır
export const metadata: Metadata = {
  description: "Premium-Immobilienprojekte in Nordzypern",
};

export default async function DeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const contact = await getSiteContact("de"); // telefon/e-posta/adres panelden
  return (
    <MotionProvider>
      <JsonLd data={{ ...ORGANIZATION_JSON_LD, email: contact.email, telephone: contact.phone }} />
      {children}
    </MotionProvider>
  );
}