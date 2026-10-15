// app/components/ru/mariachi/ContactCTAMariachi.tsx
// Azure contact card: the Mariachi copy now lives on ContactCard (form + highlights).
import type { ReactNode } from "react";
import ContactCard from "@/app/components/azure/ContactCard";

type Props = {
  kicker?: string;
  title?: ReactNode;
  subtitle?: string;
  /** Background image (public/ path) */
  bgImage?: string;
  /** Highlight pills under the lead */
  highlights?: string[];
  id?: string;
};

export default function ContactCTAMariachi({
  kicker = "Контакты и бронирование",
  title = <>Mariachi <b>Beach Club</b></>,
  subtitle =
    "Bahçeler, Искеле — пляж и бассейн пятизвёздочного уровня, где средиземноморское солнце встречается с латиноамериканским духом. Ресторан с латиноамериканским меню, 2 бара, 4 бассейна-джакузи и живые DJ-сеты.",
  bgImage = "/azure/mb-4.jpg",
  highlights = [
    "Ресторан (латиноамериканское меню)",
    "Бассейн + 4 джакузи",
    "2 бара",
    "DJ и живые выступления",
    "Пляж • зонты и шезлонги",
    "Открытая и крытая парковка",
  ],
  id = "iletisim",
}: Props) {
  return (
    <ContactCard
      locale="ru"
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
