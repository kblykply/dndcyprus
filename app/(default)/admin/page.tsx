// app/admin/page.tsx
import { redirect } from "next/navigation";

export default function AdminIndexPage() {
  // /admin açılınca Genel Bakış
  redirect("/admin/genel");
}
