import type { ReactNode } from "react";
import { inter, montserrat } from "@/app/fonts";
import RootDocument from "@/app/components/RootDocument";
import { siteMetadata } from "@/lib/site-metadata";

export const metadata = siteMetadata;
// Refresh date-dependent public content without request-time personalization.
export const revalidate = 86400;

export default function Layout({ children }: { children: ReactNode }) {
  return <RootDocument lang="tr" fontClass={`${inter.variable} ${montserrat.variable}`}>{children}</RootDocument>;
}
