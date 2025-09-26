// app/components/DNDProcessSection.tsx
"use client";

import { motion, Variants, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

/* ---- Motion (transform/opacity only) ---- */
const wrap: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.06, duration: 0.22 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 180, damping: 24, mass: 0.7 } },
};

type Step = { n: number; title: string; desc: string };

const STEPS: Step[] = [
  { n: 1, title: "Keşif & İhtiyaç Analizi", desc: "Hedefler, bütçe ve yaşam tarzı beklentileri netleştirilir." },
  { n: 2, title: "Konsept & Bütçe Çerçevesi", desc: "Ön taslaklar ve şeffaf bütçe aralıkları oluşturulur." },
  { n: 3, title: "Tasarım Geliştirme", desc: "Planlar, malzemeler ve detaylar birlikte finalize edilir." },
  { n: 4, title: "Sözleşme & İzinler", desc: "Takvim, kapsam ve resmi süreçler netleştirilir." },
  { n: 5, title: "İnşa & Kalite Kontrol", desc: "Saha yönetimi, periyodik raporlama ve ölçülebilir kalite." },
  { n: 6, title: "Teslim & Sonrası Destek", desc: "Kullanım eğitimi, garanti ve bakım rehberliği." },
];

export default function DNDProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45, margin: "-10% 0px -10% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden"); // reset -> replay when re-enter
  }, [inView, controls]);

  const CARD =
    "relative flex flex-col w-full rounded-3xl p-6 md:p-7 bg-white/70 backdrop-blur-xl border border-black/10 " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,.85),0_12px_34px_rgba(0,0,0,.06)]";

  const BADGE =
    "inline-flex items-center justify-center rounded-full h-9 w-9 text-[13px] font-semibold " +
    "bg-black/5 border border-black/10";

  return (
    <section className="relative z-10 py-18 md:py-24 bg-white text-black overflow-hidden">
      {/* subtle neutral texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(80% 60% at 50% -10%, rgba(0,0,0,0.06), transparent 60%)" }}
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
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">DND </h2>
          <p className="mt-3 text-black/60 max-w-2xl mx-auto">
            Uçtan uca şeffaf, planlı ve konfor odaklı bir teslim süreci: keşiften teslim sonrası desteğe.
          </p>
        </div>

        {/* Equal-height columns */}
        <motion.div
          ref={ref}
          variants={wrap}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* LEFT: Step grid */}
          <motion.div variants={item} className="lg:col-span-7 flex min-w-0">
            <div className={CARD} style={{ transform: "translateZ(0)" }}>
              {/* Progress line (decorative) */}
              <div className="relative mb-6">
                <div className="h-[3px] w-full rounded-full bg-black/10" />
                <div className="absolute top-1/2 -translate-y-1/2 left-0 h-[3px] w-1/2 rounded-full bg-black/50" />
              </div>

              {/* Steps (glass tiles) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {STEPS.map((s) => (
                  <article
                    key={s.n}
                    className="rounded-2xl p-5 bg-white/75 border border-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,.9)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className={BADGE}>{s.n}</span>
                      <h3 className="text-base md:text-lg font-semibold tracking-tight">{s.title}</h3>
                    </div>
                    <p className="mt-2 text-[13px]/6 text-black/65">{s.desc}</p>
                  </article>
                ))}
              </div>

              {/* Small notes */}
              <div className="mt-6 text-xs text-black/55">
                * Takvim ve kapsam proje tipine göre değişebilir. Tüm aşamalarda düzenli raporlama sağlanır.
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Image + checklist (fills height) */}
          <motion.div variants={item} className="lg:col-span-5 flex min-w-0">
            <div className={CARD} style={{ transform: "translateZ(0)" }}>
              <div
                className="relative w-full min-h-[320px] md:min-h-[380px] rounded-2xl overflow-hidden bg-center bg-cover"
                style={{ backgroundImage: "url('/Perla II - 2.png')" }}
              >
                {/* subtle overlay */}
                <div className="absolute inset-0 bg-black/10" />
                {/* floating checklist card */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur-xl p-4 shadow-[0_12px_30px_rgba(0,0,0,.12)]">
                    <ul className="text-sm text-black/75 space-y-2">
                      <li className="flex items-start gap-2"><Check /> Zaman çizelgesi & bütçe şeffaflığı</li>
                      <li className="flex items-start gap-2"><Check /> Düzenli saha fotoğrafları ve raporlar</li>
                      <li className="flex items-start gap-2"><Check /> Malzeme onayları ve numuneler</li>
                      <li className="flex items-start gap-2"><Check /> Teslim sonrası eğitim & garanti</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA row */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-black text-white border border-black/10 hover:opacity-90 transition"
                >
                  Süreci Başlat
                </a>
                <span className="text-sm text-black/60">1:1 ön görüşme — ücretsiz</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---- Minimal monochrome check icon ---- */
function Check() {
  return (
    <svg viewBox="0 0 20 20" className="h-[18px] w-[18px] text-black/70" fill="none" stroke="currentColor">
      <path d="M5 10l3 3 7-7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
