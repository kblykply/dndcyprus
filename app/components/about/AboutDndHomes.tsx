    "use client";

    import Image from "next/image";
    import Link from "next/link";
    import { motion, useInView, useReducedMotion } from "framer-motion";
    import { useMemo, useRef, useState } from "react";

    const TEAL = "#27959b";
    const ORANGE = "#f15c34";

    type Props = {
    bgSrc?: string;          // section background image
    bgAlt?: string;
    kicker?: string;
    videoId: string;         // <-- REQUIRED: YouTube ID (e.g. "dQw4w9WgXcQ")
    poster?: string;         // optional poster for the video tile
    videoTitle?: string;     // accessible title for iframe
    startAt?: number;        // start seconds
    heading?: string;        // overlay heading on poster
    description?: string;    // overlay description on poster
    };

    export default function AboutDndHomes({
    bgSrc = "/dndprojects.jpg",
    bgAlt = "DND Homes — ABD ve Kuzey Kıbrıs konut projeleri",
    kicker = "ABD'de doğdu, Kuzey Kıbrıs’ta yaşıyor",
    videoId,
    poster,
    videoTitle = "DND Homes Tanıtım Videosu",
    startAt = 0,
    heading = "DND Homes",
    description = "Creating Spaces, Inspiring Lives",
    }: Props) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const inView = useInView(sectionRef, { margin: "-20% 0px -20% 0px", amount: 0.3 });
    const reduced = useReducedMotion();

    const ease = [0.22, 1, 0.36, 1] as const;
    const D = reduced ? 0.001 : 0.6;

    const rise = useMemo(
        () => ({
        hidden: { opacity: 0, y: reduced ? 0 : 18, filter: "blur(6px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: D, ease } },
        }),
        [D, ease, reduced]
    );

    const fadeScale = useMemo(
        () => ({
        hidden: { opacity: 0, scale: reduced ? 1 : 0.985 },
        show: { opacity: 1, scale: 1, transition: { duration: D, ease, delay: 0.05 } },
        }),
        [D, ease, reduced]
    );

    return (
        <section
        ref={sectionRef}
        id="dnd-homes"
        className="relative isolate min-h-[70vh] overflow-hidden"
        aria-label="DND Homes Bölümü"
        >
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
            <Image src={bgSrc} alt={bgAlt} fill sizes="100vw" className="object-cover" />
            {/* Scrim for readability */}
            <div className="absolute inset-0 bg-black/35 md:bg-black/30" aria-hidden />
            {/* Brand glows */}
            <div
            className="absolute inset-0"
            aria-hidden
            style={{
                background: `
                radial-gradient(34rem 22rem at 10% 0%, ${TEAL}18, transparent 70%),
                radial-gradient(28rem 18rem at 90% 100%, ${ORANGE}16, transparent 70%)
                `,
                mixBlendMode: "screen",
                opacity: 0.9,
            }}
            />
            {/* Subtle noise */}
            <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
                backgroundImage:
                "url('data:image/svg+xml;utf8,\
                <svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22>\
                <filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%221%22 stitchTiles=%22stitch%22/></filter>\
                <rect width=%2240%22 height=%2240%22 filter=%22url(%23n)%22 opacity=%220.15%22/></svg>')",
            }}
            aria-hidden
            />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-12 lg:py-28">
            <div className="grid gap-8 lg:grid-cols-5 lg:items-center">
            {/* Text glass card */}
            <motion.div
                variants={rise}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className={[
                "rounded-2xl border shadow-[0_8px_40px_rgba(0,0,0,0.25)]",
                "bg-white/10 supports-[backdrop-filter]:backdrop-blur-xl",
                "border-white/20 ring-1 ring-white/10",
                "text-white p-7 md:p-9",
                "lg:col-span-3",
                ].join(" ")}
                style={{ WebkitBackdropFilter: "blur(18px)" }}
            >
                {/* Kicker + line */}
                <div className="mb-3 flex items-center gap-3">
                <span className="h-[2px] w-12 rounded-full flex-none" style={{ backgroundColor: TEAL }} aria-hidden />
                <span className="text-[11px] md:text-[12px] font-semibold tracking-[0.22em] uppercase text-white/80">
                    {kicker}
                </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-semibold leading-tight">DND Homes</h2>
                <p className="mt-3 text-[15px] md:text-base text-white/90">
                DND Homes; Massachusetts (ABD) ve Kuzey Kıbrıs’ta, seçkin lokasyonlarda üst düzey
                konutlar geliştiren bir gayrimenkul geliştiricisidir.
                </p>

                <ul className="mt-6 space-y-3 text-sm md:text-[15px] text-white/90">
                <li className="flex gap-2"><Dot /> Boston kökenli marka; Massachusetts’te <strong>120 tamamlanmış proje</strong>.</li>
                <li className="flex gap-2"><Dot /> Kuzey Kıbrıs’ta <strong>30.000+ konut</strong>luk vizyon üzerinde çalışma.</li>
                <li className="flex gap-2"><Dot /> Turizmde Bafra lüks otel yatırımı ve <strong>Mariachi Beach Club</strong> ile yaşam ayrıcalıkları.</li>
                <li className="flex gap-2"><Dot /> ABD &amp; KKTC merkez ofisleri; Amerikan kalite standartları.</li>
                </ul>

                <div className="mt-7 flex flex-wrap gap-3">
                <Link
                    href="https://dnd-homes.com/"
                    target="_blank"
                    className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-black shadow ring-1 ring-black/5 hover:brightness-95 transition"
                    style={{ backgroundColor: "#ffffff" }}
                >
                    DND Homes Web Sitesi
                </Link>
                <Link
                    href="/projects"
                    className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-white/90 ring-1 ring-white/25 hover:bg-white/10 transition"
                >
                    Kuzey Kıbrıs Projeleri
                </Link>
                </div>

            </motion.div>

            {/* RIGHT: Glass-framed YouTube video */}
            <motion.figure
                variants={fadeScale}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className={[
                "relative overflow-hidden rounded-2xl",
                "bg-white/10 supports-[backdrop-filter]:backdrop-blur-xl",
                "border border-white/20 ring-1 ring-white/10",
                "shadow-[0_8px_40px_rgba(0,0,0,0.25)]",
                "lg:col-span-2",
                ].join(" ")}
                aria-label="DND Homes video"
            >
                <div className="relative aspect-video w-full">
                <VideoPlayer
                    id={videoId}
                    title={videoTitle}
                    poster={poster}
                    startAt={startAt}
                    autoPlayOnClick={!reduced}
                    heading={heading}
                    description={description}
                />
                </div>
                {/* Subtle top gloss */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10" />
            </motion.figure>
            </div>
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
    function VideoPlayer({
    id,
    title,
    poster,
    startAt = 0,
    autoPlayOnClick = true,
    heading = "DND Homes",
    description = "Creating Spaces, Inspiring Lives",
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
    const src =
        `https://www.youtube-nocookie.com/embed/${id}?` +
        `${autoPlayOnClick && play ? "autoplay=1&" : ""}` +
        `rel=0&modestbranding=1&playsinline=1&mute=0&start=${startAt}`;

    return (
        <div className="relative h-full w-full">
        {play ? (
            <iframe
            className="absolute inset-0 h-full w-full rounded-none"
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
            <Image
                src={poster || `/api/og/video/${id}.jpg`}
                alt={title}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                priority={false}
            />
            {/* dark gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            {/* Text overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-left md:bottom-6 md:left-6 md:right-6">
                <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">{heading}</h3>
                <p className="mt-1 text-xs md:text-sm text-white/90 max-w-xl">{description}</p>
            </div>
            {/* Play button */}
            <span className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex items-center justify-center rounded-full p-5 md:p-6 bg-white/90 shadow-2xl ring-1 ring-white/60 transition-transform group-hover:scale-105">
                <svg width="28" height="28" viewBox="0 0 24 24" fill={TEAL} aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                </svg>
                </span>
            </span>
            </button>
        )}
        </div>
    );
    }
