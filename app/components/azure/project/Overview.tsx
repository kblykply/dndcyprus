import LazyYouTube from "@/app/components/LazyYouTube";
import type { ProjectOverview } from "@/lib/azure/project-types";
import ProjectHead, { splitTitle } from "./ProjectHead";

// Genel bakış: beyaz kart — solda başlık + metin + maddeler + etiketler, sağda tanıtım videosu (16:9, kırpılmadan).
export default function Overview({ d, name, id }: { d: ProjectOverview; name: string; id: string }) {
  const q = d.youtubeId ? `autoplay=1&mute=1&controls=0&rel=0&playsinline=1&loop=1&modestbranding=1&playlist=${d.youtubeId}` : "";
  return (
    <section className="az-section az-proj" id={id}>
      <div className="az-wrap">
        <div className="az-po rv">
          <div className="t">
            <ProjectHead kicker={d.kicker} title={splitTitle(d.title, name)} className="mb-0" />
            <p className="lead">{d.lead}</p>
            <ul className="hl">
              {d.highlights.map((h, i) => <li key={h} className={i % 2 ? "c" : undefined}><i aria-hidden />{h}</li>)}
            </ul>
            {d.chips.length > 0 && (
              <div className="az-tags">{d.chips.map((c) => <span key={c.label} className={c.accent === "coral" ? "c" : "s"}>{c.label}</span>)}</div>
            )}
          </div>
          {/* video 16:9 çerçevede, kırpılmaz (videonun içindeki yazılar kesiliyordu); görselde kart yüksekliğini doldurur */}
          <div className={d.youtubeId ? "m v" : "m"}>
            {d.youtubeId ? (
              <LazyYouTube videoId={d.youtubeId} query={q} title={d.videoTitle} posterAlt={d.videoPosterAlt} playLabel={d.videoPlayLabel} className="absolute inset-0" cover />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={d.image} alt={d.imageAlt} loading="lazy" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
