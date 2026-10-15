import type { ReactNode } from "react";

/** "La Joya Perla II Kat Planları" → "La Joya Perla II" + <b>Kat Planları</b> (Azure başlık dili). */
export function splitTitle(title: string, name: string): ReactNode {
  const t = title.trim();
  const m = t.match(/^(.*?)\s+[—–-]\s+(.+)$/);
  if (m && m[1] === name) return <><span className="az-nm">{m[1]}</span> <b>{m[2]}</b></>;
  if (t.startsWith(name + " ") && t.length > name.length + 1) return <><span className="az-nm">{name}</span> <b>{t.slice(name.length + 1)}</b></>;
  return t;
}

type Props = { kicker: string; title: ReactNode; lead?: ReactNode; className?: string; as?: "h2" | "h3" };

// Proje bölümleri için ortak başlık: az-kicker + az-h2.sm + az-lead
export default function ProjectHead({ kicker, title, lead, className = "", as = "h2" }: Props) {
  const H = as;
  return (
    <div className={`az-head ${className}`.trim()}>
      <span className="az-kicker rv">{kicker}</span>
      <H className="az-h2 sm rv d1">{title}</H>
      {lead ? <p className="az-lead rv d2">{lead}</p> : null}
    </div>
  );
}
