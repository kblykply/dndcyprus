import type { ProjectInteriors } from "@/lib/azure/project-types";
import type { Locale } from "@/lib/azure/site";
import InteriorStage from "./InteriorStage";
import ProjectHead, { splitTitle } from "./ProjectHead";

// İç mekân: başlık + çerçeveli sahne (sekmeli, çapraz geçişli iç mekân görselleri).
export default function Interiors({ d, name, id, locale }: { d: ProjectInteriors; name: string; id: string; locale: Locale }) {
  return (
    <section className="az-section az-proj" id={id}>
      <div className="az-wrap">
        <ProjectHead kicker={d.kicker} title={splitTitle(d.title, name)} lead={d.lead} />
        <InteriorStage angles={d.angles} locale={locale} />
      </div>
    </section>
  );
}
