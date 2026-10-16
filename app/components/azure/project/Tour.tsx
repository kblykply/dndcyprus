import type { ProjectTour } from "@/lib/azure/project-types";
import type { Locale } from "@/lib/azure/site";
import { mono } from "@/app/fonts";
import ProjectHead, { splitTitle } from "./ProjectHead";
import TourStage from "./TourStage";
import "../meridian.css";

// 360° sanal tur — Meridian dili: renk katmanı olmayan temiz kapak, ortada oynat, altta mono satır.
export default function Tour({ d, name, id, locale }: { d: ProjectTour; name: string; id: string; locale: Locale }) {
  return (
    <section className={`az-section az-proj mr ${mono.variable}`} id={id}>
      <div className="az-wrap">
        <ProjectHead kicker={d.kicker} title={splitTitle(d.title, name)} lead={d.lead} />
        <TourStage src={d.src} poster={d.poster} iframeTitle={d.iframeTitle} locale={locale} />
      </div>
    </section>
  );
}
