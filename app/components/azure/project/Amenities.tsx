import type { ProjectAmenities } from "@/lib/azure/project-types";
import { Icon } from "./icons";
import ProjectHead, { splitTitle } from "./ProjectHead";

// Olanaklar: ikon + başlık + açıklama beyaz kutuları (3 sütun).
export default function Amenities({ d, name, id }: { d: ProjectAmenities; name: string; id: string }) {
  return (
    <section className="az-section az-proj" id={id}>
      <div className="az-wrap">
        <ProjectHead kicker={d.kicker} title={splitTitle(d.title, name)} lead={d.lead} />
        <ul className="az-am">
          {d.items.map((a, i) => (
            <li key={a.label + i} className={`rv d${Math.min(i % 3, 4)}${a.accent === "coral" ? " c" : ""}`}>
              <i><Icon name={a.icon} size={26} /></i>
              <div><h3>{a.label}</h3><p>{a.desc}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
