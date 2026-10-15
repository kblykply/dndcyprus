// Proje slug'ı → Azure veri (TR/EN). Veri dosyaları eski bileşenlerden birebir taşındı.
import type { ProjectData } from "@/lib/azure/project-types";
import type { ProjectPage } from "@/lib/azure/projects";
import { LAGOON_VERDE } from "./lagoon-verde";
import { PERLA_II } from "./perla-ii";
import { PERLA } from "./perla";
import { LA_JOYA } from "./la-joya";

export const PROJECT_DATA: Record<ProjectPage["slug"], ProjectData> = {
  "lagoon-verde": LAGOON_VERDE,
  "perla-ii": PERLA_II,
  perla: PERLA,
  "la-joya": LA_JOYA,
};
