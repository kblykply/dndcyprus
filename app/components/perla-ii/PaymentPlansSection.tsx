"use client";
import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Brand colors (Perla2)
const TEAL = "#27959b";
const ORANGE = "#f15c34";

/* ---------------- Types ---------------- */
type Unit = { title: string; priceGBP: number; details: string[] };
type Composition = { label: string; percent: number };
type Plan = { id: string; title: string; badge?: string | null; units: Unit[]; composition?: Composition[] };

/* ---------------- Helpers ---------------- */
const fmtGBP = (v: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(v);

const LS_KEY = "pps_unlock_v1"; // localStorage flag to persist unlock client-side only

/* ---------------- Embedded Data ---------------- */
const DEFAULT_PLANS: Plan[] = [
  {
    id: "std-72",
    title: "72 Ay – Standart Plan",
    units: [
      {
        title: "Studio",
        priceGBP: 99900,
        details: [`Depozito: ${fmtGBP(4995)}`, `Peşinat: ${fmtGBP(29970)}`, "Taksitler: £900 Aylık x 72 ay"],
      },
      {
        title: "1+1",
        priceGBP: 134900,
        details: [`Depozito: ${fmtGBP(6745)}`, `Peşinat: ${fmtGBP(40470)}`, "Taksitler: £1,217 Aylık x 72 ay"],
      },
      {
        title: "2+1",
        priceGBP: 184900,
        details: [`Depozito: ${fmtGBP(9245)}`, `Peşinat: ${fmtGBP(55470)}`, "Taksitler: £1,670 Aylık x 72 ay"],
      },
    ],
    composition: [
      { label: "Depozito", percent: 5 },
      { label: "Peşinat", percent: 30 },
      { label: "Taksitler", percent: 65 },
    ],
  },
  {
    id: "disc-72",
    title: "72 Ay – İndirimli Plan",
    badge: "%5 indirim",
    units: [
      {
        title: "Studio",
        priceGBP: 94900,
        details: [`Depozito: ${fmtGBP(4745)}`, `Peşinat: ${fmtGBP(42705)}`, "Taksitler: £660 Aylık x 72 ay"],
      },
      {
        title: "1+1",
        priceGBP: 128155,
        details: [`Depozito: ${fmtGBP(6407)}`, `Peşinat: ${fmtGBP(57670)}`, "Taksitler: £890 Aylık x 72 ay"],
      },
      {
        title: "2+1",
        priceGBP: 175655,
        details: [`Depozito: ${fmtGBP(8782)}`, `Peşinat: ${fmtGBP(79045)}`, "Taksitler: £1,220 Aylık x 72 ay"],
      },
    ],
    composition: [
      { label: "Depozito", percent: 5 },
      { label: "Peşinat", percent: 45 },
      { label: "Taksitler", percent: 50 },
    ],
  },
  {
    id: "cash",
    title: "Nakit Ödeme Planı",
    badge: "%25 indirim",
    units: [
      {
        title: "Studio",
        priceGBP: 74925,
        details: [`Depozito: ${fmtGBP(3746)}`, `Peşinat: ${fmtGBP(33719)}`, "3 Ayda 1 Ödeme £9,365 x 4"],
      },
      {
        title: "1+1",
        priceGBP: 101175,
        details: [`Depozito: ${fmtGBP(5061)}`, `Peşinat: ${fmtGBP(45530)}`, "3 Ayda 1 Ödeme £12,646 x 4"],
      },
      {
        title: "2+1",
        priceGBP: 138675,
        details: [`Depozito: ${fmtGBP(6930)}`, `Peşinat: ${fmtGBP(62405)}`, "3 Ayda 1 Ödeme £17,335 x 4"],
      },
    ],
    composition: [
      { label: "Depozito", percent: 5 },
      { label: "Peşinat", percent: 45 },
      { label: "3 Ayda 1 ödeme", percent: 50 },
    ],
  },
];

/* ---------------- Component (Front-end only lock) ---------------- */
export default function PaymentPlansSection() {
  const [activePlanIdx, setActivePlanIdx] = React.useState(0);
  const [prevPlanIdx, setPrevPlanIdx] = React.useState(0);
  const [unlocked, setUnlocked] = React.useState(false);
  const reduceMotion = useReducedMotion();

  // Lead form state
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const plan = DEFAULT_PLANS[activePlanIdx];

  // Load unlock flag from localStorage
  React.useEffect(() => {
    try {
      const saved = typeof window !== "undefined" ? window.localStorage.getItem(LS_KEY) : null;
      if (saved === "1") setUnlocked(true);
    } catch {}
  }, []);

  const validate = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) return "Lütfen tüm alanları doldurun.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Geçerli bir e-posta girin.";
    if (!/^[0-9 +()\-]{6,20}$/.test(phone)) return "Geçerli bir telefon numarası girin.";
    return null;
  };

  const unlockFrontOnly = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(LS_KEY, "1");
        sessionStorage.setItem(
          `${LS_KEY}_lead`,
          JSON.stringify({ name, email, phone, interestedIn: plan.title, ts: Date.now() })
        );
      }
    } catch {}
    setSuccess(true);
    setTimeout(() => setUnlocked(true), 350);
  };

  // Direction-aware tab slide
  const direction = activePlanIdx > prevPlanIdx ? 1 : -1;
  const pageVariants = {
    enter: (dir: number) =>
      reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, x: dir * 36, filter: "blur(6px)" },
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (dir: number) =>
      reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, x: dir * -36, filter: "blur(6px)" },
  };
  const pageTransition = reduceMotion
    ? { duration: 0.18 }
    : { type: "spring", stiffness: 420, damping: 36, mass: 0.9 };

  return (
    <section aria-label="Ödeme Planları" className="relative">
      {/* FULL-SECTION LOCK OVERLAY */}
      {!unlocked && (
        <div className="absolute inset-0 z-30 flex items-center justify-center" style={{ pointerEvents: "auto" }}>
          {/* Strong blur & soft white veil */}
          <div
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(14px) saturate(1.2)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.86), rgba(255,255,255,0.86))",
            }}
          />
          {/* Glassmorphic form card */}
          <div
            className="relative z-40 w-[min(92vw,640px)] rounded-2xl p-6 sm:p-8"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.14))",
              border: "1px solid rgba(255,255,255,0.35)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
              backdropFilter: "blur(22px) saturate(1.3)",
            }}
          >
            <h3 className="text-lg sm:text-xl font-semibold" style={{ color: "#141517" }}>
              Ödeme Planını görmek için formu doldurunuz.
            </h3>
            <p className="mt-2 text-sm" style={{ color: "rgba(20,21,23,0.72)" }}>
              Dilerseniz daha ayrıntılı bilgi vermek için size ulaşabiliriz.
            </p>

            <form className="mt-5" onSubmit={unlockFrontOnly} noValidate>
              <div className="grid grid-cols-1 gap-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ad Soyad"
                  className="w-full rounded-lg px-3 py-2 text-[15px]"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    border: "1px solid rgba(20,21,23,0.14)",
                    color: "#141517",
                  }}
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta"
                  type="email"
                  className="w-full rounded-lg px-3 py-2 text-[15px]"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    border: "1px solid rgba(20,21,23,0.14)",
                    color: "#141517",
                  }}
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefon"
                  className="w-full rounded-lg px-3 py-2 text-[15px]"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    border: "1px solid rgba(20,21,23,0.14)",
                    color: "#141517",
                  }}
                />
              </div>

              {error && (
                <div className="mt-3 text-sm" style={{ color: "#c0392b" }}>
                  {error}
                </div>
              )}
              {success && (
                <div className="mt-3 text-sm" style={{ color: "#0f7b3e" }}>
                  Teşekkürler — bölüm açılıyor…
                </div>
              )}

              <div className="mt-5 flex items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-white text-sm font-medium"
                  style={{ background: TEAL, boxShadow: "0 8px 24px rgba(39,149,155,0.35)" }}
                >
                  Gönder & Aç
                </button>
              </div>

              <p className="mt-3 text-xs" style={{ color: "rgba(20,21,23,0.55)" }}>
                Bilgileriniz yalnızca size dönüş için kullanılacaktır.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Real section content underneath */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black">Birim Tipleri & Ödeme Planları</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.65)" }}>
            Her bir birim tipi için GBP (£) detaylı kırılım.
          </p>
        </div>

        {/* Plan selector with animated pill */}
        <div className="mt-6 flex items-center gap-3">
          {DEFAULT_PLANS.map((p, i) => {
            const active = i === activePlanIdx;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setPrevPlanIdx(activePlanIdx);
                  setActivePlanIdx(i);
                }}
                className={`relative px-3.5 py-1.5 rounded-full text-sm border transition 
                  ${active ? "font-semibold" : ""}`}
                aria-pressed={active}
                aria-selected={active}
                style={{
                  background: active ? `${TEAL}1a` : "rgba(255,255,255,0.92)",
                  color: active ? TEAL : "rgba(20,21,23,0.9)",
                  border: `1px solid ${active ? `${TEAL}44` : "rgba(20,21,23,0.12)"}`,
                  backdropFilter: "blur(6px)",
                }}
              >
                {/* animated background pill */}
                {active && (
                  <motion.span
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: `${TEAL}12`, border: `1px solid ${TEAL}33` }}
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="relative z-10">{p.title}</span>
                {p.badge ? (
                  <span
                    className="relative z-10 ml-2 px-2 py-0.5 rounded-full text-[11px]"
                    style={{ background: `${ORANGE}1f`, color: ORANGE, border: `1px solid ${ORANGE}44` }}
                  >
                    {p.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Content grid */}
        <div className="mt-8 relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={plan.id}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${unlocked ? "" : "pointer-events-none"}`}
              aria-hidden={!unlocked}
            >
              {plan.units.map((u) => (
                <div
                  key={u.title}
                  className="rounded-2xl overflow-hidden border text-black"
                  style={{
                    background: "rgba(255,255,255,0.96)",
                    borderColor: "rgba(20,21,23,0.12)",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.06), inset 0 1px rgba(255,255,255,0.8)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <div className="p-4 border-b" style={{ borderColor: "rgba(20,21,23,0.10)" }}>
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base sm:text-lg font-semibold">{u.title}</h3>
                      <div
                        className="px-2.5 py-0.5 rounded-full text-sm font-semibold tabular-nums"
                        style={{
                          background: `${TEAL}1f`,
                          color: TEAL,
                          border: `1px solid ${TEAL}44`,
                        }}
                      >
                        {fmtGBP(u.priceGBP)}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 text-[15px] leading-6">
                    <ul className="space-y-2">
                      {u.details.map((d, i) => {
                        const [k, v] = d.split(":");
                        return (
                          <li
                            key={i}
                            className="flex items-center justify-between border-b pb-2 text-black/80 tabular-nums"
                            style={{ borderColor: "rgba(20,21,23,0.08)" }}
                          >
                            <span className="text-black/65">{k}</span>
                            <span className="font-medium">{v ? v.trim() : d}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {plan.composition && (
                    <div className="px-4 pb-4">
                      <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-[rgba(20,21,23,0.08)]">
                        <div className="flex h-full w-full">
                          {plan.composition.map((c, i) => (
                            <div
                              key={i}
                              className="h-full"
                              style={{
                                width: `${Math.max(0, Math.min(100, c.percent))}%`,
                                background: i === 0 ? TEAL : i === 1 ? ORANGE : "#141517",
                                opacity: i === 2 ? 0.9 : 1,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[12px] text-black/75">
                        {plan.composition.map((c, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5">
                            <span
                              className="inline-block h-2.5 w-2.5 rounded-full"
                              style={{ background: i === 0 ? TEAL : i === 1 ? ORANGE : "#141517" }}
                            />
                            {c.label} %{c.percent}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-8 text-xs" style={{ color: "rgba(20,21,23,0.55)" }}>
          * Fiyatlar ve koşullar bilgilendirme amaçlıdır; proje ve kampanyalara bağlı olarak değişebilir.
        </p>
      </div>
    </section>
  );
}
