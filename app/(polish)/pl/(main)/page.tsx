import { getPress, getScopeContent } from "@/lib/content/store";
import { pageMetadata } from "@/lib/seo";

// Azure tasarımı — ana sayfa bölümleri
import HomeHero from "@/app/components/azure/home/HomeHero";
import AwardsShowcase from "@/app/components/azure/home/AwardsShowcase";
import Story from "@/app/components/azure/home/Story";
import ProjectsCarousel from "@/app/components/azure/home/ProjectsCarousel";
import PressFaq from "@/app/components/azure/home/PressFaq";
import ContactCard from "@/app/components/azure/ContactCard";
import { WhyDnd, Offers, LifePerks, Numbers } from "@/app/components/azure/home/FlowSections";

export const metadata = pageMetadata({
  locale: "pl",
  path: "",
  title: "DND Cyprus | Nagradzane mieszkania i wille na Cyprze Północnym",
  description:
    "NeoCity, Lagoon Verde, La Joya, La Joya Perla i Perla II: nagradzane projekty na Cyprze Północnym, nieoprocentowane raty w lirach do 60 miesięcy i przywileje Mariachi Beach Club.",
});

export default async function HomePage() {
  // Metinler ve basın listesi panelden düzenlenebilir (lib/content): veritabanındaki değişiklik koddakinin üstüne yazılır
  const c = await getScopeContent("anasayfa", "pl");
  const press = await getPress("pl");
  // Akış (müşteri belgesi, Ekim 2026): vitrin · projeler · neden DND · ödeme fırsatları · yaşam ve ayrıcalıklar ·
  // rakamlar · haberler ve ödüller (haberlerin yanında S.S.S., kullanıcı isteğiyle) · iletişim. Ana sayfada Amerika anılmaz (Hakkımızda'da).
  return (
    <>
      <HomeHero locale="pl" content={c.vitrin} />
      <ProjectsCarousel locale="pl" content={c.projeler} />
      <WhyDnd locale="pl" content={c.neden} />
      <Offers locale="pl" content={c.odeme} />
      <LifePerks locale="pl" content={c.yasam} />
      <Story locale="pl" content={c.gun} />
      <Numbers locale="pl" content={c.rakamlar} />
      <AwardsShowcase locale="pl" kicker={c.oduller.kicker} withProjects projectLabel={c.oduller.awardsProject} companyName={c.oduller.homesProject} awards={c.oduller.kartlar} strip={c.oduller.strip} />
      <PressFaq locale="pl" items={press} content={{ press: c.basin, faq: c.sss }} />
      <ContactCard locale="pl" mode="home" kicker={c.iletisim.kicker} title={c.iletisim.title} lead={c.iletisim.lead} highlights={c.iletisim.highlights} image="/azure/contact-sea.webp" id="iletisim" />
    </>
  );
}
