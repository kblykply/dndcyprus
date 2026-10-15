import type { ReactNode } from "react";
import { siteMetadata } from "@/lib/site-metadata";
import "./menu.css";

export const metadata = siteMetadata;
export const revalidate = 86400;

// The standalone image menu needs no site navigation, web fonts or analytics.
export default function MenuLayout({ children }: { children: ReactNode }) {
  return <html lang="tr"><body>{children}</body></html>;
}
