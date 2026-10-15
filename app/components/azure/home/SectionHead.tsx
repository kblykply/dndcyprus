import type { ReactNode } from "react";

// Eski (karmaşık) bölümleri Azure başlığıyla sarmak için
export default function SectionHead({ kicker, title, lead, id, children }: { kicker: string; title: ReactNode; lead?: string; id?: string; children: ReactNode }) {
  return (
    <section className="az-section" id={id}>
      <div className="az-wrap">
        <div className="az-head"><span className="az-kicker rv">{kicker}</span><h2 className="az-h2 sm rv d1">{title}</h2>{lead && <p className="az-lead rv d2">{lead}</p>}</div>
      </div>
      <div className="rv d2">{children}</div>
    </section>
  );
}
