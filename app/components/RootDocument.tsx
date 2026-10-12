import type { ReactNode } from "react";
import Script from "next/script";
import { CONSENT_COOKIE, CONSENT_DEFAULT_SCRIPT } from "@/lib/analytics";
import AnalyticsRoot from "./analytics/AnalyticsRoot";
import "@/app/globals.css";

// Separate static roots keep the server-rendered HTML language correct without
// making every public page depend on request headers or consent cookies.
export default function RootDocument({ children, lang, fontClass }: { children: ReactNode; lang: "tr" | "en"; fontClass: string }) {
  return (
    <html lang={lang}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var m=document.cookie.match(/(?:^|; )${CONSENT_COOKIE}=([^;]*)/);if(m){var c=JSON.parse(decodeURIComponent(m[1]));if(c&&c.v===1&&typeof c.analytics==='boolean'&&typeof c.ads==='boolean')document.documentElement.dataset.dndConsent='saved';}}catch(e){}` }} />
        <Script id="consent-default" strategy="beforeInteractive">{CONSENT_DEFAULT_SCRIPT}</Script>
      </head>
      <body className={`${fontClass} antialiased`}>
        {children}
        <AnalyticsRoot needsConsent />
      </body>
    </html>
  );
}
