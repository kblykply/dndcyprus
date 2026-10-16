import type { ProjectAmenities } from "@/lib/azure/project-types";
import { Icon } from "./icons";
import ProjectHead, { splitTitle } from "./ProjectHead";
import "../meridian.css";

// Olanaklar: ikon + başlık + açıklama beyaz kutuları (3 sütun).
export default function Amenities({ d, name, id }: { d: ProjectAmenities; name: string; id: string }) {
  return (
    <section className="az-section az-proj mr" id={id}>
      <div className="az-wrap">
        <ProjectHead kicker={d.kicker} title={splitTitle(d.title, name)} lead={d.lead} />
        <ul className="mr-grid rv">
          {d.items.map((a, i) => (
            <li key={a.label + i}>
              <i><Icon name={a.icon} size={28} /></i>
              <div className="t"><h3>{a.label}</h3><span className="mr-mono">{String(i + 1).padStart(2, "0")}</span></div>
              <p>{a.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
