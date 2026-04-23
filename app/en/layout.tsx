// app/en/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "DND Cyprus",
  description: "Premium real estate projects in North Cyprus",
};

export default function EnLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}