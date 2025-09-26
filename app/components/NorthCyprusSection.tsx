// app/components/NorthCyprusSection.tsx
"use client";

import { motion, Variants, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

/* ---------- Motion ---------- */
const wrap: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.06, duration: 0.22 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 180, damping: 24, mass: 0.7 } },
};

type Highlight = { title: string; desc: string };

type NorthCyprusProps = {
  imageUrl?: string;           // hero image on the left
  highlights?: Highlight[];    // right-side glass cards
};

export default function NorthCyprusSection({
  imageUrl = "/Perla II - 2.png",
  highlights = [
    { title: "Yaşam Kalitesi", desc: "Yılın büyük kısmı güneşli; sahil yaşamı, doğa ve sakin tempo bir arada." },
    { title: "Büyüme Potansiyeli", desc: "Yeni projeler ve altyapı yatırımlarıyla gelişen bölgeler." },
    { title: "Ulaşım & Erişim", desc: "Avrupa ve Orta Doğu’dan kolay erişim; ada içi kısa mesafeler." },
    { title: "Eğitim & Sağlık", desc: "Uluslararası okullar ve modern sağlık hizmetleri." },
    { title: "Topluluk & Güven", desc: "Sıcak, güvenli ve çok uluslu bir yaşam dokusu." },
    { title: "Kıyı Kültürü", desc: "Marina, sahil kulüpleri, yürüyüş rotaları ve kafe kültürü." },
  ],
}: NorthCyprusProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45, margin: "-10% 0px -10% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden"); // reset -> replay on re-enter
  }, [inView, controls]);

  const CARD =
    "relative rounded-3xl p-7 md:p-8 bg-white/70 backdrop-blur-xl border border-black/10 " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,.85),0_12px_34px_rgba(0,0,0,.06)] flex flex-col w-full";

  return (
    <section className="relative z-10 py-18 md:py-24 bg-white text-black overflow-hidden">
      {/* soft neutral texture (very subtle) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(80% 60% at 50% -10%, rgba(0,0,0,0.06), transparent 60%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.35) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "linear-gradient(#000, transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-5">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Kuzey Kıbrıs: Yaşam & Yatırım</h2>
          <p className="mt-3 text-black/60 max-w-2xl mx-auto">
            Kıyı yaşamı, güneşli iklim ve gelişen bölgeler—yaşamak ve yatırım yapmak için güçlü bir kombinasyon.
          </p>
        </div>

        {/* Equal-height grid */}
        <motion.div
          ref={ref}
          variants={wrap}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* LEFT: Hero image + quick facts */}
          <motion.div variants={item} className="lg:col-span-5 flex min-w-0">
            <div className={CARD} style={{ transform: "translateZ(0)" }}>
              {/* Image slot */}
              <div
                className="relative w-full min-h-[300px] md:min-h-[360px] rounded-2xl overflow-hidden bg-center bg-cover"
                style={{ backgroundImage: `url('${imageUrl}')` }}
              />
              {/* Quick facts chips */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["Akdeniz İklimi", "Kıyı Yaşamı", "Çok Uluslu Topluluk", "Gelişen Bölgeler"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-black/10 bg-white/75 backdrop-blur-md px-3 py-1.5 text-sm text-black/75"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 text-xs text-black/55">Genel bilgilendirme; detaylar bölgeye göre değişebilir.</div>
            </div>
          </motion.div>

          {/* RIGHT: Highlights (glass cards, equal column height) */}
          <motion.div variants={item} className="lg:col-span-7 flex min-w-0">
            <div className={CARD} style={{ transform: "translateZ(0)" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {highlights.map((h) => (
                  <article
                    key={h.title}
                    className="rounded-2xl p-5 bg-white/75 border border-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,.9)]"
                  >
                    <h3 className="text-lg font-semibold tracking-tight">{h.title}</h3>
                    <p className="mt-2 text-[13px]/6 text-black/65">{h.desc}</p>
                  </article>
                ))}
              </div>
              {/* Source / footnote */}
              <div className="mt-5 text-xs text-black/55">Bilgi amaçlı özet metin.</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
