// app/admin/page.tsx
import { redirect } from "next/navigation";

export default function AdminIndexPage() {
  // /admin açılınca direkt leads sayfasına gönder
  redirect("/admin/leads");
}
