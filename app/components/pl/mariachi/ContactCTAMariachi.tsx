// app/components/pl/mariachi/ContactCTAMariachi.tsx
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
  kicker = "Kontakt i rezerwacje",
  title = <>Mariachi <b>Beach Club</b></>,
  subtitle =
    "Bahçeler, İskele — pięciogwiazdkowa plaża i basen, gdzie śródziemnomorskie słońce spotyka latynoski temperament. Restauracja z menu inspirowanym kuchnią latynoską, 2 bary, 4 baseny z jacuzzi i występy DJ-ów na żywo.",
  bgImage = "/azure/mb-4.jpg",
  highlights = [
    "Restauracja (menu w stylu latynoskim)",
    "Basen + 4 jacuzzi",
    "2 bary",
    "DJ i rozrywka na żywo",
    "Plaża • parasole i leżaki",
    "Parking zewnętrzny i kryty",
  ],
  id = "iletisim",
}: Props) {
  return (
    <ContactCard
      locale="pl"
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
