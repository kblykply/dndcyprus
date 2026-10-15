import JsonLd from "@/app/components/seo/JsonLd";
import type { ProjectFacts } from "@/lib/azure/project-types";
import ProjectHead, { splitTitle } from "./ProjectHead";

// Öne çıkan bilgiler: etiket + değer kutuları; schema.org ApartmentComplex JSON-LD korunur.
export default function Facts({ d, name, id }: { d: ProjectFacts; name: string; id: string }) {
  return (
    <section className="az-section az-proj" id={id}>
      <div className="az-wrap">
        <ProjectHead kicker={d.kicker} title={splitTitle(d.title, name)} lead={d.lead} />
        <div className="az-facts">
          {d.items.map((f, i) => (
            <div key={f.label + i} className={`az-fact rv d${Math.min(i, 4)}${f.accent === "coral" ? " c" : ""}`}>
              <small>{f.label}</small>
              <b>{f.value}</b>
            </div>
          ))}
        </div>
        <p className="az-note-sm">{d.note}</p>
      </div>
      <JsonLd data={d.jsonLd} />
    </section>
  );
}
