import { DeferredCatalog } from "@/app/components/performance/DeferredCatalog";
import ProjectHero from "@/app/components/azure/ProjectHero";
import ProjectCTA from "@/app/components/azure/ProjectCTA";
import { PROJECT_PAGES, type ProjectPage } from "@/lib/azure/projects";
import { PROJECT_DATA } from "@/lib/azure/projects/index";
import { PROJECT_UI } from "@/lib/azure/project-ui";
import type { Locale } from "@/lib/azure/site";
import Gallery from "./Gallery";
import ProjectHead, { splitTitle } from "./ProjectHead";
import Overview from "./Overview";
import Facts from "./Facts";
import Tech from "./Tech";
import Interiors from "./Interiors";
import FloorPlans from "./FloorPlans";
import Mariachi from "./Mariachi";
import Amenities from "./Amenities";
import Tour from "./Tour";
import Location from "./Location";
import Update from "./Update";
import SitePlan from "./SitePlan";
import Payment from "./Payment";

/**
 * Ortak Azure proje sayfası: hero → galeri → genel bakış → bilgiler → teknik donanım → iç mekân →
 * kat planları → Mariachi → olanaklar → 360° tur → konum → katalog → son güncelleme → talep formu.
 * Bölüm sırası eski sayfalarla aynı; içerik lib/azure/projects/<slug>.tsx dosyasından gelir.
 */
export default function AzureProject({ slug, locale }: { slug: ProjectPage["slug"]; locale: Locale }) {
  const name = PROJECT_PAGES[slug].name;
  const d = PROJECT_DATA[slug][locale];
  const ids = PROJECT_UI[locale].ids;
  // "Galeri" gibi kicker ile aynı olan başlıklara proje adı eklenir: "Lagoon Verde <b>Galeri</b>"
  const galleryTitle = d.gallery.title.trim().toLowerCase() === d.gallery.kicker.trim().toLowerCase()
    ? `${name} ${d.gallery.title.trim()}` : d.gallery.title;
  return (
    <>
      <ProjectHero slug={slug} locale={locale} />

      <section className="az-section az-proj" id={ids.gallery}>
        <div className="az-wrap">
          <ProjectHead kicker={d.gallery.kicker} title={splitTitle(galleryTitle, name)} lead={d.gallery.lead} />
          <Gallery items={d.gallery.items} locale={locale} />
          {d.gallery.hint && <p className="az-hint">{d.gallery.hint}</p>}
        </div>
      </section>

      <Overview d={d.overview} name={name} id={ids.overview} />
      <Facts d={d.facts} name={name} id={ids.facts} done={PROJECT_PAGES[slug].status.tr.startsWith("Tamamlan")} />
      {d.sitePlan && <SitePlan d={d.sitePlan} name={name} id={ids.sitePlan} />}
      {d.tech && <Tech d={d.tech} name={name} id={ids.tech} locale={locale} />}
      <Interiors d={d.interiors} name={name} id={ids.interiors} locale={locale} />
      <FloorPlans d={d.floorPlans} name={name} id={ids.floorPlans} locale={locale} cta={{ brochure: PROJECT_PAGES[slug].brochure?.[locale], tour: d.tour ? `#${ids.tour}` : undefined }} />
      {d.payment && <Payment d={d.payment} id={ids.payment} />}
      {d.mariachi !== false && <Mariachi locale={locale} id={ids.mariachi} />}
      <Amenities d={d.amenities} name={name} id={ids.amenities} />
      {d.tour && <Tour d={d.tour} name={name} id={ids.tour} locale={locale} />}
      <Location d={d.location} name={name} id={ids.location} locale={locale} />
      {d.catalog && (slug === "lagoon-verde" || slug === "perla" || slug === "perla-ii") && <div className="az-catalog"><DeferredCatalog locale={locale} project={slug} /></div>}
      {d.update && <Update d={d.update} id={ids.update} locale={locale} />}

      <ProjectCTA slug={slug} locale={locale} />
    </>
  );
}
