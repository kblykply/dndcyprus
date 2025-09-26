// components/utils.ts
export const TABS = ["Tümü", "Rezidans Projeleri", "Arsa Projeleri", "İşletmeler"] as const;
export type Tab = (typeof TABS)[number];

export function getTabFromHash(): Tab {
  if (typeof window === "undefined") return TABS[0];
  const m = window.location.hash.match(/tab=([^&]+)/);
  const decoded = m ? decodeURIComponent(m[1]) : "";
  return (TABS as readonly string[]).includes(decoded) ? (decoded as Tab) : TABS[0];
}
