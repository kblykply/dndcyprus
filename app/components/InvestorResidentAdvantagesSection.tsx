// app/components/InvestorResidentAdvantagesSection.tsx
"use client";

import { motion, Variants, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

/* ---------- Motion ---------- */
const wrap: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { when: "beforeChildren", staggerChildren: 0.06, duration: 0.22 },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 180, damping: 24, mass: 0.7 } },
};

type Advantage = { title: string; desc: string };

type Props = {
  investor?: Advantage[];
  resident?: Advantage[];
  showSideImage?: boolean;
  sideImageUrl?: string; // optional decorative image on the right column bottom
};

export default function InvestorResidentAdvantagesSection({
  investor = [
    { title: "Ölçekli Proje Erişimi", desc: "Gelişen koridorlarda kurumsal planlama ve şeffaf süreçler." },
    { title: "Uzaktan Yönetim Kolaylığı", desc: "Periyodik raporlar, saha fotoğrafları ve online onay akışları." },
    { title: "Portföy Çeşitliliği", desc: "Rezidans, arsa ve kıyı hattı projeleriyle farklı risk profilleri." },
  ],
  resident = [
    { title: "Yaşam Kalitesi", desc: "Işık, hava, depolama ve ergonomi odaklı planlar." },
    { title: "Topluluk & Olanaklar", desc: "Sahil kulübü, yürüyüş parkurları ve sosyal alanlara erişim." },
    { title: "Teslim Sonrası Destek", desc: "Kullanım eğitimi, garanti ve bakım yönlendirmeleri." },
  ],
  showSideImage = true,
  sideImageUrl = "/Perla II - 2.png",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45, margin: "-10% 0px -10% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden"); // reset -> replay on re-enter
  }, [inView, controls]);

  const CARD =
    "relative flex flex-col w-full rounded-3xl p-6 md:p-7 bg-white/70 backdrop-blur-xl border border-black/10 " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,.85),0_12px_34px_rgba(0,0,0,.06)]";

  const TILE =
    "rounded-2xl p-5 bg-white/75 border border-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,.9)]";

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
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Yatırımcı & Oturumcu Avantajları</h2>
          <p className="mt-3 text-black/60 max-w-2xl mx-auto">
            Aynı altyapı, iki güçlü fayda seti: sermaye sahipleri için öngörülebilirlik; oturumcular için konfor odaklı yaşam.
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
          {/* LEFT: Investor */}
          <motion.div variants={item} className="lg:col-span-6 flex min-w-0">
            <div className={CARD} style={{ transform: "translateZ(0)" }}>
              <header className="mb-5">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight">Yatırımcı İçin</h3>
                <p className="mt-1 text-sm text-black/65">Şeffaf süreç, raporlama ve çeşitlendirme.</p>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {investor.map((a) => (
                  <article key={a.title} className={TILE}>
                    <h4 className="text-base md:text-lg font-semibold tracking-tight">{a.title}</h4>
                    <p className="mt-2 text-[13px]/6 text-black/65">{a.desc}</p>
                  </article>
                ))}
              </div>

              {/* micro footnote */}
              <div className="mt-6 text-xs text-black/55">* Proje tipine göre seçenekler değişebilir.</div>
            </div>
          </motion.div>

          {/* RIGHT: Resident + image footer (keeps equal height) */}
          <motion.div variants={item} className="lg:col-span-6 flex min-w-0">
            <div className={CARD} style={{ transform: "translateZ(0)" }}>
              <header className="mb-5">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight">Oturumcu İçin</h3>
                <p className="mt-1 text-sm text-black/65">Konfor, olanaklara erişim ve teslim sonrası destek.</p>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {resident.map((a) => (
                  <article key={a.title} className={TILE}>
                    <h4 className="text-base md:text-lg font-semibold tracking-tight">{a.title}</h4>
                    <p className="mt-2 text-[13px]/6 text-black/65">{a.desc}</p>
                  </article>
                ))}
              </div>

              {/* Decorative image (keeps column heights balanced); remove if not needed */}
              {showSideImage && (
                <div
                  className="mt-6 relative w-full min-h-[180px] rounded-2xl overflow-hidden bg-center bg-cover"
                  style={{ backgroundImage: `url('${sideImageUrl}')` }}
                >
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* CTA row */}
        <div className="mt-8 md:mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-black text-white border border-black/10 hover:opacity-90 transition"
          >
            Detaylı Bilgi Al
          </a>
          <a
            href="/DND-Brosur.pdf"
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-white border border-black/10 hover:bg-black/5 transition"
          >
            Broşürü İndir
          </a>
        </div>
      </div>
    </section>
  );
}
