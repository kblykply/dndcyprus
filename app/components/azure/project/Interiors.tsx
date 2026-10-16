import type { InteriorGroup, ProjectInteriors } from "@/lib/azure/project-types";
import type { Locale } from "@/lib/azure/site";
import InteriorStage from "./InteriorStage";
import ProjectHead, { splitTitle } from "./ProjectHead";

// İç mekân: başlık (+ daire tipi seçici) ve film şeridi. Daire tipi grubu olmayan projelerde açılar tek grup olur.
export default function Interiors({ d, name, id, locale }: { d: ProjectInteriors; name: string; id: string; locale: Locale }) {
  const groups: InteriorGroup[] = d.groups?.length
    ? d.groups
    : [{ id: "all", name, shots: d.angles.map((a) => ({ image: a.image, label: a.name, alt: a.alt })) }];
  return (
    <section className="az-section az-proj" id={id}>
      <div className="az-wrap">
        <InteriorStage groups={groups} locale={locale} head={<ProjectHead kicker={d.kicker} title={splitTitle(d.title, name)} lead={d.lead} />} />
      </div>
    </section>
  );
}
