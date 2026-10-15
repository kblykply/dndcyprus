import type { ProjectTour } from "@/lib/azure/project-types";
import type { Locale } from "@/lib/azure/site";
import ProjectHead, { splitTitle } from "./ProjectHead";
import TourStage from "./TourStage";

// 360° sanal tur: başlık + koyu çerçeve içinde kapak/oynat, tıklanınca tur iframe'i.
export default function Tour({ d, name, id, locale }: { d: ProjectTour; name: string; id: string; locale: Locale }) {
  return (
    <section className="az-section az-proj" id={id}>
      <div className="az-wrap">
        <ProjectHead kicker={d.kicker} title={splitTitle(d.title, name)} lead={d.lead} />
        <TourStage src={d.src} bg={d.bg} poster={d.poster} iframeTitle={d.iframeTitle} locale={locale} />
      </div>
    </section>
  );
}
