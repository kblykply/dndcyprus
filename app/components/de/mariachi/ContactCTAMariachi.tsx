// app/components/de/mariachi/ContactCTAMariachi.tsx
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
  kicker = "Kontakt & Reservierung",
  title = <>Mariachi <b>Beach Club</b></>,
  subtitle =
    "Bahçeler, İskele – ein Fünf-Sterne-Erlebnis an Strand und Pool, bei dem die Mittelmeersonne auf Latino-Flair trifft. Restaurant mit lateinamerikanisch inspirierter Karte, 2 Bars, 4 Jacuzzi-Pools und Live-DJ-Auftritte.",
  bgImage = "/azure/mb-4.jpg",
  highlights = [
    "Restaurant (lateinamerikanisch inspirierte Karte)",
    "Pool + 4 Jacuzzis",
    "2 Bars",
    "DJ & Live-Entertainment",
    "Strand • Sonnenschirme & Liegen",
    "Parkplätze im Freien & überdacht",
  ],
  id = "iletisim",
}: Props) {
  return (
    <ContactCard
      locale="de"
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
