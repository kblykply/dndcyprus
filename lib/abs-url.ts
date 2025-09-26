import { headers } from "next/headers";

export async function absUrl(path: string) {
  const h = await headers(); // ✅ Promise çözüldü
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host")!;
  return `${proto}://${host}${path.startsWith("/") ? path : `/${path}`}`;
}
