import type { ProjectAmenities } from "@/lib/azure/project-types";
import { Icon } from "./icons";
import ProjectHead, { splitTitle } from "./ProjectHead";
import "../meridian.css";
import "./cards.css";

// Olanaklar: Öne çıkan bilgilerle aynı Azure kartları (simge, numara, başlık, açıklama; sırayla belirme, üzerine gelince yükselme).
export default function Amenities({ d, name, id }: { d: ProjectAmenities; name: string; id: string }) {
  return (
    <section className="az-section az-proj mr" id={id}>
      <div className="az-wrap">
        <ProjectHead kicker={d.kicker} title={splitTitle(d.title, name)} lead={d.lead} />
        <ul className="az-amen">
          {d.items.map((a, i) => (
            <li key={a.label + i} className={`az-fact rv d${i % 3} ${a.accent === "coral" ? "coral" : "sea"}`}>
              {/* simge | başlık | numara tek satırda; açıklama altında */}
              <div className="hd"><span className="ic"><Icon name={a.icon} size={22} /></span><h3>{a.label}</h3><span className="no">{String(i + 1).padStart(2, "0")}</span></div>
              <p>{a.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
