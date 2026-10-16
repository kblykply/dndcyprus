import JsonLd from "@/app/components/seo/JsonLd";
import type { ProjectFacts } from "@/lib/azure/project-types";
import ProjectHead, { splitTitle } from "./ProjectHead";
import { mono } from "@/app/fonts";
import "../meridian.css";

// Öne çıkan bilgiler: etiket + değer kutuları; schema.org ApartmentComplex JSON-LD korunur.
export default function Facts({ d, name, id }: { d: ProjectFacts; name: string; id: string }) {
  return (
    <section className={`az-section az-proj mr ${mono.variable}`} id={id}>
      <div className="az-wrap">
        <ProjectHead kicker={d.kicker} title={splitTitle(d.title, name)} lead={d.lead} />
        <div className="mr-kpi rv">
          {d.items.map((f, i) => (
            <div key={f.label + i}>
              <span className="mr-mono">{String(i + 1).padStart(2, "0")} · {f.label}</span>
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
