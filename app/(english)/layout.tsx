import type { ReactNode } from "react";
import { Inter, Montserrat } from "next/font/google";
import RootDocument from "@/app/components/RootDocument";
import { siteMetadata } from "@/lib/site-metadata";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-display", display: "swap" });

export const metadata = siteMetadata;
// Refresh date-dependent public content without request-time personalization.
export const revalidate = 86400;

export default function Layout({ children }: { children: ReactNode }) {
  return <RootDocument lang="en" fontClass={`${inter.variable} ${montserrat.variable}`}>{children}</RootDocument>;
}
