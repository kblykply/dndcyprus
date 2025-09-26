    // components/Hero.tsx
    "use client";

    import { useState, useEffect, useRef } from "react";
    import { motion, AnimatePresence, useInView } from "framer-motion";
    import type { Variants } from "framer-motion"; 
    import Image from "next/image";
    import BackgroundVideo from "./BackgroundVideo";







    /* ---------------- Entrance Variants ---------------- */
const listVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
};




const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      // "easeOut" -> cubic-bezier tuple (ease-out)
      ease: [0.16, 1, 0.3, 1],
    },
  },
};



/* ---------------- Types ---------------- */
type ProjectItem = {
  id: number;
  title: string;
  subtitle: string;
  images: string[];
  floors: number;
  area: number;
  bedrooms: number;
};

  

    /* ---------------- Card ---------------- */
    function ProjectCard({ item }: { item: ProjectItem }) {
    const img1 = item.images[0];
    const img2 = item.images[1] ?? item.images[0];

    return (
        <motion.div
        variants={itemVariants} // entrance animation per card
        className="relative group rounded-lg overflow-hidden shadow-lg h-72 min-w-[85%] sm:min-w-[420px] md:min-w-[520px] snap-center"
        >
        <Image src={img1} alt={item.title} fill className="object-cover transition-opacity duration-300" />
        <Image src={img2} alt={`${item.title} hover`} fill className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-200" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-4">
            {/* Title + subtitle move up on hover */}
            <div className="transform transition-transform duration-300 group-hover:-translate-y-4">
            <h4 className="text-xl font-semibold">{item.title}</h4>
            <p className="text-sm mt-1 text-white/90">{item.subtitle}</p>
            </div>

            {/* Extra info appears */}
            <div className="mt-8 flex flex-col items-center opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <button
  className="px-5 py-2 text-sm font-medium rounded-full 
             bg-white/15 text-white border border-white/25 
             backdrop-blur-md shadow-sm
             hover:bg-white/25 transition mb-3"
>
  Daha Fazla
</button>
            <div className="flex gap-4 justify-center text-sm text-white/80">
                <span>Daire Tipi: {item.floors}</span>
                <span>Alan: {item.area} m²</span>
                <span>Oda: {item.bedrooms}</span>
            </div>
            </div>
        </div>
        </motion.div>
    );
    }

    /* ---------------- Typewriter ---------------- */
    const MESSAGES = [
    "Biz ev değil, daha iyi bir yaşam inşa ediyoruz",
    "Mimariyi doğayla buluşturuyoruz",
    "Yatırımınıza değer katan projeler üretiyoruz",
    ];

    function Typewriter({
    messages = MESSAGES,
    typingSpeed = 100,
    deletingSpeed = 60,
    pauseAfterType = 1400,
    pauseAfterDelete = 300,
    className = "",
    }: {
    messages?: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseAfterType?: number;
    pauseAfterDelete?: number;
    className?: string;
    }) {
    const [msgIndex, setMsgIndex] = useState(0);
    const [display, setDisplay] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [blink, setBlink] = useState(true);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        const t = window.setInterval(() => setBlink((b) => !b), 500);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        const full = messages[msgIndex];
        const step = () => {
        if (!isDeleting) {
            if (display.length < full.length) {
            setDisplay(full.slice(0, display.length + 1));
            timerRef.current = window.setTimeout(step, typingSpeed) as unknown as number;
            } else {
            timerRef.current = window.setTimeout(() => setIsDeleting(true), pauseAfterType) as unknown as number;
            }
        } else {
            if (display.length > 0) {
            setDisplay(full.slice(0, display.length - 1));
            timerRef.current = window.setTimeout(step, deletingSpeed) as unknown as number;
            } else {
            timerRef.current = window.setTimeout(() => {
                setIsDeleting(false);
                setMsgIndex((i) => (i + 1) % messages.length);
            }, pauseAfterDelete) as unknown as number;
            }
        }
        };
        timerRef.current = window.setTimeout(step, isDeleting ? deletingSpeed : typingSpeed) as unknown as number;
        return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [display, isDeleting, msgIndex, messages, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete]);

    return (
        <h2 className={`text-2xl md:text-4xl font-medium leading-snug max-w-3xl mx-auto tracking-tight ${className}`} aria-live="polite">
        {display}
        <span className={`inline-block w-[2px] md:w-[3px] h-[1.1em] align-[-0.15em] ml-1 bg-white ${blink ? "opacity-100" : "opacity-20"}`} aria-hidden="true" />
        </h2>
    );
    }

    /* ---------------- Data ---------------- */


    const TAB_LABELS = [
  "Rezidans Projeleri",
  "Arsa Projeleri",
  "İşletmeler",
] as const;
type Tab = typeof TAB_LABELS[number];




   
const projects: Record<Tab, ProjectItem[]> = {
  "Rezidans Projeleri": [
    { id: 1, title: "Lagoonn Verde", subtitle: "Lamine kirişten yapılmış konut", images: ["/lagoon-verde/5.jpg", "/lagoon-verde/7.jpg"], floors: 2, area: 584, bedrooms: 3 },
    { id: 2, title: "La Joya Perla II", subtitle: "Doğayla iç içe yaşam", images: ["/perla-ii/9.jpg", "/perla-ii/5.jpg"], floors: 1, area: 420, bedrooms: 2 },
    { id: 3, title: "La Joya Perla I", subtitle: "Doğayla iç içe yaşam", images: ["/perla/9.jpg", "/perla/4.jpg"], floors: 1, area: 420, bedrooms: 2 },
    { id: 7, title: "La Joya", subtitle: "Doğayla iç içe yaşam", images: ["/la-joya/13.jpg", "/la-joya/16.jpg"], floors: 1, area: 420, bedrooms: 2 },
  ],
  "Arsa Projeleri": [
    { id: 5, title: "Geçitkale", subtitle: "Yatırıma uygun arazi", images: ["/gecitkale-1.png", "/gecitkale-2.png"], floors: 0, area: 900, bedrooms: 0 },
  ],
  "İşletmeler": [
    { id: 8, title: "Mariachi Beach Club", subtitle: "Doğayla iç içe yaşam", images: ["/mariachi/9.jpg", "/mariachi/12.jpg"], floors: 1, area: 420, bedrooms: 2 },
  ],
};

const tabs: readonly Tab[] = TAB_LABELS; // ✅ no mutation intended anyway




    /* ---------------- Hero ---------------- */
    export default function Hero() {


  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]); // <- Tab, not string
  const items = projects[activeTab]; // <- fully typed now
  // 
  
  
  const useCarousel = items.length > 2;



    // 👇 Re-trigger entrance when section enters viewport
    const projectsRef = useRef<HTMLDivElement | null>(null);
    const inView = useInView(projectsRef, { amount: 0.35 }); // 35% visible
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        if (inView) setAnimKey((k) => k + 1);
    }, [inView]);

    return (
        <main className="relative w-full min-h-screen text-white overflow-x-hidden">
        <BackgroundVideo />

        {/* HERO */}
        <section className="relative h-screen px-6 z-10">
            <div className="h-full flex flex-col items-center justify-center text-center">
            <Typewriter className="mt-[90px]" />
            </div>

            {/* Tabs */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-5xl">
            <div className="flex gap-6 text-lg font-medium border-b border-white/30 justify-center">
                {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 pb-1 transition ${activeTab === tab ? "border-b-2 border-white" : "text-white/70"}`}
                >
                    {tab}
                </button>
                ))}
            </div>
            </div>
        </section>

        {/* PROJECTS */}
        <section className="relative z-10 text-black mt-6 pb-14">
            <div className="w-full max-w-6xl px-4 mx-auto">
            {/* Ref here so useInView tracks this section */}
            <div ref={projectsRef}>
                <AnimatePresence mode="wait">
                {/* key changes on tab AND whenever section enters view */}
                <motion.div
                    key={`${activeTab}-${animKey}`}
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
                >
                    {useCarousel ? (
                    <motion.div
                        className="flex gap-6 cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ left: -((items.length - 1) * 320), right: 0 }}
                        dragElastic={0.1}
                        variants={listVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {items.map((item) => (
                        <ProjectCard key={item.id} item={item} />
                        ))}
                    </motion.div>
                    ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        variants={listVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {items.map((item) => (
                        <ProjectCard key={item.id} item={item} />
                        ))}
                    </motion.div>
                    )}
                </motion.div>
                </AnimatePresence>
            </div>
            </div>
        </section>
        </main>
    );
    }
