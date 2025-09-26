"use client";

import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type ImageSet = {
  main: string;      // fallback if no youtubeId
  sideTop: string;
  sideBottom: string;
};

type Props = {
  images: ImageSet;
  youtubeId?: string;      // if present, big tile is video
  poster?: string;         // poster for the video tile
  videoTitle?: string;     // accessible title for iframe
  startAt?: number;        // start seconds
};

export default function AboutWhoWeAreGlass({
  images = {
    main: "/Mariachi - 2.png",
    sideTop: "/Mariachi - 2.png",
    sideBottom: "/Mariachi - 2.png",
  },
  youtubeId,
  poster,
  videoTitle = "Tanıtım Videosu",
  startAt = 0,
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { margin: "-15% 0px -15% 0px", amount: 0.35 });
  const reduced = useReducedMotion();

  // Animation controls
  const textCtrl = useAnimation();
  const gridCtrl = useAnimation();
  const figMainCtrl = useAnimation();
  const figTopCtrl = useAnimation();
  const figBotCtrl = useAnimation();

  // Variants
  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
  const D = reduced ? 0.001 : 0.6;

  const rise = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduced ? 0 : 18 },
      show: { opacity: 1, y: 0, transition: { duration: D, ease } },
    }),
    [D, ease, reduced]
  );

  const fadeScale = useMemo(
    () => ({
      hidden: { opacity: 0, scale: reduced ? 1 : 0.985 },
      show: { opacity: 1, scale: 1, transition: { duration: D, ease } },
    }),
    [D, ease, reduced]
  );

  useEffect(() => {
    if (inView) {
      textCtrl.start("show");
      gridCtrl.start("show");
      figMainCtrl.start({ opacity: 1, scale: 1, transition: { duration: D, ease, delay: reduced ? 0 : 0.05 } });
      figTopCtrl.start({ opacity: 1, y: 0, transition: { duration: D, ease, delay: reduced ? 0 : 0.1 } });
      figBotCtrl.start({ opacity: 1, y: 0, transition: { duration: D, ease, delay: reduced ? 0 : 0.15 } });
    } else {
      textCtrl.set("hidden");
      gridCtrl.set("hidden");
      figMainCtrl.set({ opacity: 0, scale: reduced ? 1 : 0.985 });
      figTopCtrl.set({ opacity: 0, y: reduced ? 0 : 14 });
      figBotCtrl.set({ opacity: 0, y: reduced ? 0 : 14 });
    }
  }, [inView, textCtrl, gridCtrl, figMainCtrl, figTopCtrl, figBotCtrl, D, ease, reduced]);

  return (
    <section
      ref={sectionRef}
      id="biz-kimiz"
      className="relative isolate bg-white px-6 py-24 md:px-12"
      aria-label="Biz Kimiz bölümü"
    >
      {/* brand glows */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(34rem 22rem at 10% 100%, ${TEAL}12, transparent 70%),
            radial-gradient(28rem 20rem at 90% 0%, ${ORANGE}12, transparent 70%)
          `,
        }}
      />
      {/* faint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

<div className="relative z-10 mx-auto max-w-7xl lg:grid lg:grid-cols-5 lg:items-center gap-10">
  
          {/* Text card */}
        <motion.div
          variants={rise}
          initial="hidden"
          animate={textCtrl}
          className="glass rounded-2xl border bg-white/70 p-7 shadow-[0_8px_40px_rgba(0,0,0,0.06)] md:p-9 lg:col-span-2"
        >
          <div className="mb-5 h-[2px] w-12 rounded-full" style={{ backgroundColor: TEAL }} aria-hidden="true" />
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">Biz Kimiz</h2>
          <p className="mt-3 text-[15px] text-neutral-700 md:text-base">
            DND Cyprus, Kıbrıs genelinde konut ve karma kullanımlı projeler geliştiren, tasarım odaklı bir
            gayrimenkul şirketidir.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-neutral-700 md:text-[15px]">
            <li className="flex gap-2"><Dot /> Konseptten teslimata güvenilir iş ortaklarıyla süreç yönetimi.</li>
            <li className="flex gap-2"><Dot /> Öne çıkan bölgelerde, denize ve şehre yakın lokasyon seçimi.</li>
            <li className="flex gap-2"><Dot /> Satış, satış sonrası ve uzun vadeli müşteri desteğinde şeffaflık.</li>
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/projects"
              className="glass-thin inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-neutral-900 ring-1 ring-[var(--glass-border)] transition-transform hover:scale-[1.02]"
            >
              Projelerimizi Görün
            </a>
            <a
              href="#vizyon"
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-neutral-700 hover:underline"
            >
              Vizyon &amp; Misyon
            </a>
          </div>
        </motion.div>

        {/* Visual area */}
<motion.div
  variants={fadeScale}
  initial="hidden"
  animate={gridCtrl}
  className="relative lg:col-span-3 flex items-center" // <-- add flex + items-center
>
  <div className="grid grid-cols-3 gap-4 lg:grid-cols-5 w-full">
    <motion.figure
      initial={{ opacity: 0, scale: reduced ? 1 : 0.985 }}
      animate={figMainCtrl}
      className="col-span-3 row-span-3 lg:col-span-7 lg:row-span-6 overflow-hidden rounded-2xl border bg-white/50 ring-1 ring-black/5 shadow-xl"
    >
      {youtubeId ? (
        <VideoPlayer
          id={youtubeId}
          title={videoTitle}
          startAt={startAt}
          poster={poster ?? images.main}
          autoPlayOnClick={!reduced}
        />
      ) : (
        <img
          src={images.main}
          alt="Ekip / proje çalışması"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
      )}
    </motion.figure>
  </div>
</motion.div>


      </div>
    </section>
  );
}

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full"
      style={{ backgroundColor: TEAL }}
    />
  );
}

/** Lightweight YouTube player with poster & play overlay */
/** Lightweight YouTube player with poster & play overlay */
function VideoPlayer({
  id,
  title,
  poster,
  startAt = 0,
  autoPlayOnClick = true,
  heading = " DND Beach Club Party ",
  description = "Projelerimizi ve ekibimizi yakından tanıyın.",
}: {
  id: string;
  title: string;
  poster?: string;
  startAt?: number;
  autoPlayOnClick?: boolean;
  heading?: string;
  description?: string;
}) {
  const [play, setPlay] = useState(false);
  const src = `https://www.youtube-nocookie.com/embed/${id}?${
    autoPlayOnClick && play ? "autoplay=1&" : ""
  }rel=0&modestbranding=1&playsinline=1&mute=0&start=${startAt}`;

  return (
    <div className="relative aspect-video w-full bg-black overflow-hidden rounded-2xl">
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`${title} videoyu oynat`}
        >
          <img
            src={poster || `/api/og/video/${id}.jpg`}
            alt={title}
            className="h-full w-full object-cover opacity-95 transition-opacity group-hover:opacity-100"
            loading="lazy"
          />
          {/* dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          {/* Text overlay */}
          <div className="absolute bottom-8 left-8 right-8 text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
              {heading}
            </h3>
            <p className="mt-2 text-sm md:text-base text-white/90 max-w-xl">
              {description}
            </p>
          </div>

          {/* Play button */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center justify-center rounded-full p-5 md:p-6 bg-white/90 shadow-2xl ring-1 ring-white/60 transition-transform group-hover:scale-105">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill={TEAL}
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

