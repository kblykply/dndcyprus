  // app/components/mariachi/LaJoyaTechnicalFacilities.tsx
  "use client";

  import React, { useEffect, useMemo, useRef, useState } from "react";
  import {
    motion,
    type Variants,
    type Easing,
    useMotionValue,
    animate,
  } from "framer-motion";
  import {
    Wind,
    Zap,
    Home,
    RadioTower,
    Waves,
    Sparkles,
    Thermometer,
  } from "lucide-react";

  const TEAL = "#27959b";
  const EASE: Easing = [0.22, 1, 0.36, 1] as const;
  const GAP = 20;

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.45, ease: EASE },
    },
  };

  type Highlight = {
    title: string;
    desc?: string;
    image: string;
    icon?: React.ReactNode;
  };

  type Props = {
    title?: string;
    subtitle?: string;
    autoPlay?: boolean;
    intervalMs?: number;
  };

  export default function LaJoyaTechnicalFacilities({
    title = "Teknik Donanımlar",
    subtitle = "Projemizdeki ayrıcalıklar size konforlu ve modern bir yaşam sunar.",
    autoPlay = true,
    intervalMs = 4800,
  }: Props) {
    /* ---- Veri (TR) ---- */
    const data: Highlight[] = useMemo(
      () => [
        {
          title: "Merkezi Isıtma/Soğutma",
          desc:
            "merkezi ısıtma/soğutma sistemiyle ideal sıcaklık her zaman elinizin altında.",
          image: "/tec/klima.jpg",
          icon: <Wind className="h-5 w-5" />,
        },
        {
          title: "Merkezi Jeneratör",
          desc:
            "Kesintisiz enerji sağlayan merkezi jeneratör ile olası elektrik kesintilerinde endişeye gerek yok.",
          image: "/tec/jenerator.jpg",
          icon: <Zap className="h-5 w-5" />,
        },
        {
          title: "Akıllı Ev Sistemleri",
          desc:
            "Evinizi uzaktan kontrol edebileceğiniz akıllı ev sistemi günlük yaşamı kolaylaştırır.",
          image: "/tec/smart.jpg",
          icon: <Home className="h-5 w-5" />,
        },
    
    
      
        {
          title: "Banyolarda Yerden Isıtma",
          desc:
            "Zemin ısıtma sistemiyle banyoda maksimum konfor ve her zaman sıcak bir atmosfer.",
          image: "/tec/yer.jpg",
          icon: <Thermometer className="h-5 w-5" />,
        },
      ],
      []
    );

    /* ---- Motion/State ---- */
    const x = useMotionValue(0);
    const [index, setIndex] = useState(0);
    const [step, setStep] = useState(0);
    const [visibleCount, setVisibleCount] = useState(1);
    const [maxIndex, setMaxIndex] = useState(0);
    const [limits, setLimits] = useState<{ left: number; right: number }>({
      left: 0,
      right: 0,
    });
    const hoverRef = useRef(false);
    const draggingRef = useRef(false);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    /* ---- Ölçüm ---- */
    const measure = () => {
      const vp = viewportRef.current;
      const track = trackRef.current;
      if (!vp || !track) return;
      const slides = Array.from(track.children) as HTMLElement[];
      if (!slides.length) return;

      const firstWidth = slides[0].getBoundingClientRect().width;
      const stepPx = firstWidth + GAP;
      setStep(stepPx);

      const trackWidth =
        slides.reduce((s, el) => s + el.getBoundingClientRect().width, 0) +
        GAP * (slides.length - 1);

      const vpWidth = vp.getBoundingClientRect().width;
      const visible = Math.max(1, Math.floor((vpWidth + GAP - 1) / stepPx)) || 1;
      setVisibleCount(visible);

      const maxNegative = Math.min(0, vpWidth - trackWidth);
      setLimits({ left: maxNegative, right: 0 });

      const newMaxIndex = Math.max(0, slides.length - visible);
      const safeIndex = clamp(index, 0, newMaxIndex);
      setMaxIndex(newMaxIndex);
      if (safeIndex !== index) setIndex(safeIndex);

      x.set(clamp(-safeIndex * stepPx, maxNegative, 0));
    };

    useEffect(() => {
      measure();
      const ro = new ResizeObserver(measure);
      if (viewportRef.current) ro.observe(viewportRef.current);
      window.addEventListener("resize", measure, { passive: true });
      return () => {
        ro.disconnect();
        window.removeEventListener("resize", measure);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.length]);

    /* ---- Navigasyon ---- */
    const goTo = (i: number) => {
      const vp = viewportRef.current;
      if (!vp || !step) return;
      const targetIndex = clamp(i, 0, maxIndex);
      setIndex(targetIndex);
      const target = clamp(-targetIndex * step, limits.left, limits.right);
      animate(x, target, { duration: 0.55, ease: EASE });
    };

    const onDragStart = () => {
      draggingRef.current = true;
      hoverRef.current = true;
    };
    const onDragEnd = () => {
      draggingRef.current = false;
      if (!step) return;
      const current = x.get();
      const nearest = clamp(Math.round(Math.abs(current) / step), 0, maxIndex);
      goTo(nearest);
      setTimeout(() => (hoverRef.current = false), 80);
    };

    /* ---- Autoplay ---- */
    useEffect(() => {
      if (!autoPlay || maxIndex <= 0) return;
      const id = setInterval(() => {
        if (hoverRef.current || draggingRef.current) return;
        goTo(index >= maxIndex ? 0 : index + 1);
      }, intervalMs);
      return () => clearInterval(id);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoPlay, intervalMs, index, maxIndex, step]);

    const totalPages = Math.max(1, maxIndex + 1);

    return (
      <section
        aria-label="La Joya — Teknik Donanımlar"
        className="relative overflow-hidden"
        style={{ background: "#ffffff", color: "#141517" }}
        data-bg="light"
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
      >
        {/* Auralar */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[26rem] w-[26rem] rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(39,149,155,0.20), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 right-1/4 h-[24rem] w-[24rem] rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(241,92,52,0.16), transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-12 lg:pb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              {title}
            </h2>
            <p className="mt-3 text-base sm:text-lg" style={{ color: "#141517CC" }}>
              {subtitle}
            </p>
          </motion.div>

         {/* Carousel */}
<div className="mt-8 relative select-none">
  <div ref={viewportRef} className="overflow-hidden" style={{ touchAction: "pan-y" }}>
    <motion.div
      ref={trackRef}
      className="flex will-change-transform"
      style={{ x, columnGap: GAP }}
      drag="x"
      dragConstraints={limits}
      dragElastic={0.08}
      dragMomentum={false}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      role="group"
      aria-roledescription="carousel"
      aria-label="Teknik donanım listesi"
    >
      {data.map((card, i) => {
        const isActive = i >= index && i < index + visibleCount;
        return (
          <div
            key={card.title + i}
            /* CHANGED: base => full width; keep your existing sm/md/lg sizes */
            className="shrink-0 basis-full sm:basis-[56%] md:basis-[44%] lg:basis-[32%]"
            data-slide={i}
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="relative h-[380px] sm:h-[420px] rounded-[24px] overflow-hidden"
              style={{
                boxShadow: isActive
                  ? `0 20px 50px rgba(0,0,0,0.15), 0 10px 26px ${TEAL}12`
                  : "0 14px 32px rgba(0,0,0,0.10)",
                transform: isActive ? "scale(1.02)" : "scale(0.98)",
                transition: "transform .35s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {/* Kapak */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${card.image})` }}
                aria-hidden
              />
              {/* Koyuluk */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0.08))",
                }}
                aria-hidden
              />
              {/* Alt cam panel */}
              <div
                className="absolute inset-x-4 bottom-4 rounded-2xl p-4 sm:p-5 backdrop-blur-md"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.10))",
                  border: "1px solid rgba(255,255,255,0.26)",
                }}
              >
                {card.icon ? (
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full"
                    style={{
                      background: "#fff",
                      border: `1px solid ${TEAL}33`,
                      color: TEAL,
                      boxShadow: `0 6px 14px ${TEAL}1f`,
                    }}
                  >
                    {card.icon} <span>Özellik</span>
                  </span>
                ) : null}

                <h3 className="mt-2 text-[18px] sm:text-xl font-semibold text-white drop-shadow">
                  {card.title}
                </h3>
                {card.desc ? (
                  <p className="mt-1.5 text-[13.5px] sm:text-sm leading-relaxed text-white/90 break-words">
                    {card.desc}
                  </p>
                ) : null}
              </div>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  </div>

  {/* Noktalar */}
  <div className="mt-6 flex items-center justify-center gap-2">
    {Array.from({ length: totalPages }).map((_, i) => {
      const isActive = i === index;
      return (
        <button
          type="button"
          key={`dot-${i}`}
          onClick={() => goTo(i)}
          aria-label={`Sayfa ${i + 1}`}
          aria-current={isActive ? "true" : undefined}
          className="h-2.5 rounded-full transition-all"
          style={{
            width: isActive ? 28 : 8,
            background: isActive ? TEAL : "#fff",
            border: `1px solid ${isActive ? `${TEAL}66` : "rgba(20,21,23,0.1)"}`,
            boxShadow: isActive ? `0 6px 12px ${TEAL}22` : "none",
          }}
        />
      );
    })}
  </div>
</div>

        </div>
      </section>
    );
  }
