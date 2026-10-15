import JsonLd from "@/app/components/seo/JsonLd";
import { ORGANIZATION_JSON_LD } from "@/lib/structured-data";
import MotionProvider from "@/app/components/performance/MotionProvider";
// app/ru/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

// Başlık sayfalarda verilir; kök layout "DND Cyprus" varsayılanını taşır
export const metadata: Metadata = {
  description: "Премиальные жилые проекты на Северном Кипре",
};

export default function RuLayout({
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