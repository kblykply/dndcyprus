// app/components/en/mariachi/ContactCTAMariachi.tsx
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
  kicker = "Contact & Reservations",
  title = <>Mariachi <b>Beach Club</b></>,
  subtitle =
    "Bahçeler, İskele — a five-star beach & pool experience where the Mediterranean sun meets Latin spirit. Restaurant with a Latino-inspired menu, 2 bars, 4 jacuzzi pools and live DJ performances.",
  bgImage = "/azure/mb-4.jpg",
  highlights = [
    "Restaurant (Latino-inspired menu)",
    "Pool + 4 jacuzzis",
    "2 bars",
    "DJ & live entertainment",
    "Beach • umbrellas & sunbeds",
    "Outdoor & indoor parking",
  ],
  id = "iletisim",
}: Props) {
  return (
    <ContactCard
      locale="en"
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
