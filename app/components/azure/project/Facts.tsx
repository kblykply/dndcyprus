import JsonLd from "@/app/components/seo/JsonLd";
import type { ProjectFacts } from "@/lib/azure/project-types";
import ProjectHead, { splitTitle } from "./ProjectHead";
import FactsGrid from "./FactsGrid";
import "../meridian.css";

// Öne çıkan bilgiler: etiket + değer kutuları; schema.org ApartmentComplex JSON-LD korunur.
export default function Facts({ d, name, id, done = false, map }: { d: ProjectFacts; name: string; id: string; done?: boolean; map?: { href: string; label: string } }) {
  return (
    <section className="az-section az-proj mr" id={id}>
      <div className="az-wrap">
        <ProjectHead kicker={d.kicker} title={splitTitle(d.title, name)} lead={d.lead} />
        <FactsGrid items={d.items} done={done} map={map} />
        <p className="az-note-sm">{d.note}</p>
      </div>
      <JsonLd data={d.jsonLd} />
    </section>
  );
}
