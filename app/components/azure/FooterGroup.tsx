"use client";

import { useState, type ReactNode } from "react";

/**
 * Altbilgi bağlantı grubu (Projeler, Genel). Telefonda akordeon: başlık düğmedir, grup kapalı başlar, dokununca
 * açılır (+ / –). Masaüstü ve tablette düğme gizli, başlık düz metin, liste hep açık (footer.css). Bağlantılar her
 * durumda sayfada durur (arama motorları görür); kapalıyken görünmez ve sekmeyle odaklanmaz.
 */
export default function FooterGroup({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`fg${open ? " open" : ""}`}>
      <h2>
        <span className="t">{title}</span>
        <button type="button" className="tg" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
          {title}<i aria-hidden />
        </button>
      </h2>
      <div className="bd" id={id}><div>{children}</div></div>
    </div>
  );
}
