"use client";

import { useCallback } from "react";
import { useReportWebVitals } from "next/web-vitals";
import { ANALYTICS_ENV, hasConsent, isAdminPath } from "@/lib/analytics";

export default function WebVitals() {
  const report = useCallback<Parameters<typeof useReportWebVitals>[0]>((metric) => {
    if (isAdminPath(location.pathname) || location.pathname.startsWith("/tr/qr") ||
      !hasConsent("analytics") || !ANALYTICS_ENV.ga4Id || !window.gtag) return;
    // Paths exclude query strings; performance measurements never include lead data.
    window.gtag("event", "web_vital", {
      send_to: ANALYTICS_ENV.ga4Id,
      metric_name: metric.name,
      metric_value: metric.value,
      metric_id: metric.id,
      metric_rating: metric.rating,
      page_path: location.pathname,
      non_interaction: true,
    });
  }, []);
  useReportWebVitals(report);
  return null;
}
