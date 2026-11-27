// app/admin/page.tsx
import { redirect } from "next/navigation";

export default function AdminIndexPage() {
  // /admin açılınca Bugün (27.11.2026: ekibi bekleyen işler önce)
  redirect("/admin/bugun");
}
