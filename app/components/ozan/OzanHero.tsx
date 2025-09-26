    // app/components/about/OzanHero.tsx
    "use client";

    import React from "react";
    import { motion } from "framer-motion";
    import Image from "next/image";

    const TEAL = "#27959b";
    const ORANGE = "#f15c34";

    export default function OzanHero() {
    return (
        <section
        aria-label="Ozan Dökmecioğlu — Hero"
        className="relative overflow-hidden h-[100vh]"
        style={{ background: "#ffffff", color: "#141517" }}
        >
        {/* subtle brand wash */}
        <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
            background: `
                radial-gradient(28rem 20rem at 15% 0%, ${TEAL}12, transparent 70%),
                radial-gradient(26rem 16rem at 85% 100%, ${ORANGE}14, transparent 70%)
            `,
            }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
            {/* portrait */}
        <motion.div
    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="mx-auto w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden ring-4 ring-[rgba(39,149,155,0.55)]"
    >
    <Image
        src="/Ozanbey.png" // replace with real portrait
        alt="Ozan Dökmecioğlu"
        width={300}
        height={300}
        className="w-full h-full object-cover"
        priority
    />
    </motion.div>

            {/* name & role */}
            <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-2xl sm:text-3xl font-semibold tracking-tight"
            >
            Ozan Dökmecioğlu
            </motion.h1>
            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-2 text-sm sm:text-base"
            style={{ color: "rgba(20,21,23,0.65)" }}
            >
            Kurucu & Yönetim Kurulu Başkanı, DND Cyprus
            </motion.p>

            {/* tagline */}
            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
            style={{ color: "rgba(20,21,23,0.78)" }}
            >
            Yatırım ve inşaat sektöründe vizyoner liderliğiyle, DND Cyprus’un
            uluslararası başarı hikâyesini yönlendiriyor.
            </motion.p>
        </div>
        </section>
    );
    }
