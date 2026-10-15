"use client";

import { useState } from "react";
import type { InteriorAngle } from "@/lib/azure/project-types";
import { PROJECT_UI } from "@/lib/azure/project-ui";
import type { Locale } from "@/lib/azure/site";

export default function InteriorStage({ angles, locale }: { angles: InteriorAngle[]; locale: Locale }) {
  const t = PROJECT_UI[locale].interiors;
  const [cur, setCur] = useState(angles[0]?.id);
  return (
    <div className="az-int rv">
      {angles.map((a, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={a.id} src={a.image} alt={a.alt} className={a.id === cur ? "on" : undefined} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
      ))}
      <div className="tabs" role="tablist" aria-label={t.tabs}>
        {angles.map((a) => (
          <button key={a.id} type="button" role="tab" aria-selected={a.id === cur} className={a.id === cur ? "on" : undefined} onClick={() => setCur(a.id)}>{a.name}</button>
        ))}
      </div>
    </div>
  );
}
