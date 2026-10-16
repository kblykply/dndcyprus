// app/components/mariachi/ContactCTAMariachi.tsx
// Azure iletişim kartı: Mariachi metinleri ContactCard'a (form + öne çıkanlar) taşındı.
import type { ReactNode } from "react";
import ContactCard from "@/app/components/azure/ContactCard";

type Props = {
  kicker?: string;
  title?: ReactNode;
  subtitle?: string;
  /** Arka plan görseli (public/ yolu) */
  bgImage?: string;
  /** Alt başlık altındaki öne çıkan etiketler */
  highlights?: string[];
  id?: string;
};

export default function ContactCTAMariachi({
  kicker = "İletişim & Rezervasyon",
  title = <>Mariachi <b>Beach Club</b></>,
  subtitle =
    "Bahçeler, İskele — Akdeniz güneşiyle Latin ruhunun buluştuğu beş yıldızlı plaj & havuz deneyimi. Restoran (Latino menü), 2 bar, 4 jakuzili havuz ve canlı DJ performansları.",
  bgImage = "/azure/contact-sea.webp",
  highlights = [
    "Restoran (Latino menü)",
    "Havuz + 4 jakuzi",
    "2 bar",
    "DJ & canlı eğlence",
    "Plaj • şemsiye & şezlong",
    "Açık & kapalı otopark",
  ],
  id = "iletisim",
}: Props) {
  return (
    <ContactCard
      locale="tr"
      mode="home"
      showOffices={false}
      id={id}
      kicker={kicker}
      title={title}
      lead={subtitle}
      image={bgImage}
      highlights={highlights}
    />
  );
}
