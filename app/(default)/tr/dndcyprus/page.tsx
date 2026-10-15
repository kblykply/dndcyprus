import PageHero from "@/app/components/azure/PageHero";

import LagoonVerdeMediaHub from "@/app/components/lagoon-verde/LagoonVerdeMediaHubtr";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/dndcyprus",
  title: "DND Medya Merkezi | Broşür, Katalog ve Videolar – DND Cyprus",
  description:
    "DND Cyprus medya merkezi: Lagoon Verde broşürü ve ödeme planı, KKTC kataloğu, La Joya ve Property Awards videoları ile kampanyaları tek yerde inceleyin.",
});

export default function Page() {
  return (
    <main>
      <PageHero size="short" kicker="DND Cyprus" title={<>Medya Merkezi</>} lead="Katalogları, broşürleri, videoları, kampanyaları ve dijital içerikleri keşfedin." image="/azure/vid-1.jpg" />
      <LagoonVerdeMediaHub

      />
        

    </main>
  );
}
