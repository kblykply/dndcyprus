import { headers } from "next/headers";

export function absUrl(path: string) {
  const h = headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host")!;
  return `${proto}://${host}${path.startsWith("/") ? path : `/${path}`}`;
}
