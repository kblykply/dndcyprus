import JsonLd from "@/app/components/seo/JsonLd";
import { ORGANIZATION_JSON_LD } from "@/lib/structured-data";
import MotionProvider from "@/app/components/performance/MotionProvider";
// app/en/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

// Başlık sayfalarda verilir; kök layout "DND Cyprus" varsayılanını taşır
export const metadata: Metadata = {
  description: "Premium real estate projects in North Cyprus",
};

export default function EnLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <MotionProvider>
      <JsonLd data={ORGANIZATION_JSON_LD} />
      {children}
    </MotionProvider>
  );
}