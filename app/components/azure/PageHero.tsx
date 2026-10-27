import type { CSSProperties, ReactNode } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import { preload } from "react-dom";
import { HERO_DIK } from "@/lib/azure/hero-dik";
import { logoScale } from "@/lib/azure/logos";

type Cta = { label: string; href: string; variant?: "coral" | "sea" | "glass" | "ghost"; track?: string };

type Props = {
  /** artık gösterilmiyor (sayfalar hâlâ geçebilir) */
  kicker?: string;
  title: ReactNode;
  lead?: string;
  image: string;
  imageAlt?: string;
  video?: string;              // mp4; image poster olur
  tags?: string[];             // sol üst etiketler (ilk altın renkte olabilir)
  goldTag?: string;
  /** artık gösterilmiyor (sayfalar hâlâ geçebilir) */
  chips?: { big: string; label: string }[];
  ctas?: Cta[];
  logo?: string;               // proje logosu (sağ üst)
  size?: "full" | "compact" | "short";
  id?: string;
  /** Görselin odak noktası (object-position), ör. "50% 18%": yüz/kişi kırpılmasın */
  imagePosition?: string;
};

// Dik telefon ekranı: çerçeve fotoğrafın yalnız ortasını gösteriyor; HERO_DIK'te kesiti olan görselde o bölge iner
// (scripts/hero-dik.mjs). Kesiti olmayan görsel (short çerçeve) tam çözünürlükte WebP iner.
const DIK = "(max-aspect-ratio: 3/5)";

function HeroImage({ src, alt, position }: { src: string; alt: string; position?: string }) {
  const k = HERO_DIK[src];
  // kesit çerçeve yüksekliğinde gösterilir: görünen genişlik ≈ çerçeve boyu (78vh / 56vh) × kesit oranı ≈ 0,65 ekran yüksekliği
  const dik = k ? getImageProps({ src: k.src, alt, width: k.w, height: k.h, quality: 75, sizes: "66vh" }).props : null;
  // dik ve kareye yakın ekranlarda çerçeve fotoğrafın enini aşıyor (cover): tam çözünürlük insin diye 200vw
  const { srcSet, sizes, ...img } = getImageProps({ src, alt, fill: true, quality: 75, sizes: "(max-aspect-ratio: 1/1) 200vw, 100vw", loading: "eager", fetchPriority: "high" }).props;
  if (dik) preload(dik.src, { as: "image", imageSrcSet: dik.srcSet, imageSizes: dik.sizes, fetchPriority: "high", media: DIK });
  preload(img.src, { as: "image", imageSrcSet: srcSet, imageSizes: sizes, fetchPriority: "high", media: dik ? `not all and ${DIK}` : undefined });
  return (
    <picture>
      {dik && <source media={DIK} srcSet={dik.srcSet} sizes={dik.sizes} />}
      <img {...img} alt={alt} srcSet={srcSet} sizes={sizes} className="bg" style={position ? { ...img.style, objectPosition: position } : img.style} />
    </picture>
  );
}

// İç sayfalar için Azure hero çerçevesi: 36px yuvarlatılmış görsel, cam etiketler.
export default function PageHero({ title, lead, image, imageAlt = "", video, tags = [], goldTag, ctas = [], logo, size = "compact", id, imagePosition }: Props) {
  return (
    <section className={`az-hero ${size}`} id={id}>
      <div className="frame">
        {video ? (
          <video className="bg" autoPlay muted loop playsInline preload="metadata" poster={image} aria-label={imageAlt} style={imagePosition ? { objectPosition: imagePosition } : undefined}>
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <HeroImage src={image} alt={imageAlt} position={imagePosition} />
        )}
        {(goldTag || tags.length || logo) ? (
          <div className="top">
            {/* telefonda tek satır, yatay kayar: klavyeyle de kaydırılabilsin diye odaklanabilir liste */}
            <div className="tagrow" role="list" tabIndex={0}>
              {goldTag && <span role="listitem" className="az-tag gold">{goldTag}</span>}
              {tags.map((t) => <span key={t} role="listitem" className="az-tag">{t}</span>)}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {logo && <img className="plogo" src={logo} alt="" style={{ ["--k" as string]: logoScale(logo) } as CSSProperties} />}
          </div>
        ) : null}
        <div className="c">
          <div>
            {/* üst etiket ("— İLETİŞİM") başlığın tekrarıydı; kullanıcı isteğiyle sayfa başlıklarında gösterilmiyor (Ekim 2026) */}
            <h1 className="rv d1">{title}</h1>
            {lead && <p className="rv d2">{lead}</p>}
            {ctas.length > 0 && (
              <div className="cta rv d3">
                {ctas.map((c) => {
                  const cls = `az-btn${c.variant && c.variant !== "coral" ? ` ${c.variant}` : ""}`;
                  return c.href.startsWith("#") || c.href.startsWith("http") || c.href.endsWith(".pdf")
                    ? <a key={c.label} className={cls} href={c.href} data-track={c.track} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}>{c.label}</a>
                    : <Link key={c.label} className={cls} href={c.href} data-track={c.track} prefetch={false}>{c.label}</Link>;
                })}
              </div>
            )}
          </div>
          {/* sağdaki rakam kartları kaldırıldı (patron: "sağdaki rakamlardan kurtul"; rakamlar sayfadaki bilgi kutularında) */}
        </div>
      </div>
    </section>
  );
}
