// app/not-found.tsx
// Markalı, çok dilli (TR ağırlıklı) 404 sayfası. Yalnızca kök layout içinde çizilir (header/footer yok).
// Başlık metadata ile verilir; JSX içine <title> koymayın (yoksa sayfada iki <title> olur).
import type { Metadata } from "next";
import NotFoundContent from "@/app/components/NotFoundContent";

export const metadata: Metadata = {
  title: { absolute: "Sayfa bulunamadı (404) | DND Cyprus" },
  description:
    "Aradığınız sayfa bulunamadı. DND Cyprus projelerine veya iletişim sayfasına dönebilirsiniz. / Page not found. / Seite nicht gefunden. / Страница не найдена. / Nie znaleziono strony.",
};

export default function NotFound() {
  return <NotFoundContent />;
}
