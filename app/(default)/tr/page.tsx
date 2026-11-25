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
  locale: "tr",
  path: "",
  title: "DND Cyprus | Kuzey Kıbrıs’ta Ödüllü Konut ve Villa Projeleri",
  description:
    "NeoCity, Lagoon Verde, La Joya, La Joya Perla ve Perla II: Kuzey Kıbrıs’ta ödüllü projeler, 60 aya kadar faizsiz TL ödeme modelleri ve Mariachi Beach Club ayrıcalığı.",
});
export default async function HomePage() {
  // Metinler ve basın listesi panelden düzenlenebilir (lib/content): veritabanındaki değişiklik koddakinin üstüne yazılır
  const c = await getScopeContent("anasayfa", "tr");
  const press = await getPress("tr");
  // Akış (müşteri belgesi, Ekim 2026): vitrin · projeler · neden DND · ödeme fırsatları · yaşam ve ayrıcalıklar ·
  // rakamlar · haberler ve ödüller (haberlerin yanında S.S.S., kullanıcı isteğiyle) · iletişim. Ana sayfada Amerika anılmaz (Hakkımızda'da).
  return (
    <>
      <HomeHero locale="tr" content={c.vitrin} />
      <ProjectsCarousel locale="tr" content={c.projeler} />
      <WhyDnd locale="tr" content={c.neden} />
      <Offers locale="tr" content={c.odeme} />
      <LifePerks locale="tr" content={c.yasam} />
      <Story locale="tr" content={c.gun} />
      <Numbers locale="tr" content={c.rakamlar} />
      <AwardsShowcase locale="tr" kicker={c.oduller.kicker} withProjects projectLabel={c.oduller.awardsProject} companyName={c.oduller.homesProject} awards={c.oduller.kartlar} strip={c.oduller.strip} />
      <PressFaq locale="tr" items={press} content={{ press: c.basin, faq: c.sss }} />
      <ContactCard locale="tr" mode="home" kicker={c.iletisim.kicker} title={c.iletisim.title} lead={c.iletisim.lead} highlights={c.iletisim.highlights} image="/azure/contact-sea.webp" id="iletisim" />
    </>
  );
}
