// app/components/office/TurkiyeOfficeLocationTimes.tsx
"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
};

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;

  image?: string;
  imageAlt?: string;

  city?: string;
  address?: string;

  // ✅ Google map embed iframe src
  mapEmbedSrc?: string;

  // Work times
  workTimes?: { day: string; hours: string }[];

  // Contacts (optional)
  phone?: string;
  phoneHref?: string;
  whatsapp?: string;
  whatsappHref?: string;

  // Buttons
  directionsHref?: string; // Google Maps link
  contactHref?: string; // "#contact" or "/contact"
};

export default function TurkiyeOfficeLocationTimes({
  kicker = "Turkey Office",
  title = "Location & Working Hours",
  subtitle =
    "You can meet our Turkey team online anytime, or plan an in-office appointment.",
  image = "/dndturkiye/office.jpeg",
  imageAlt = "DND Turkey Office",
  city = "Istanbul",
  address =
    "Defne 05Ada, Bahçeşehir 1. Kısım, Dalgıçkuşu Sk. Villa 2, 34488 Başakşehir/Istanbul",

  mapEmbedSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126721.87407630496!2d28.53773139726562!3d41.0638687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7ae9b35ed53%3A0x9c37d6a4d5a018f4!2sDND%20Group%20T%C3%BCrkiye%20Ofisi!5e1!3m2!1str!2str!4v1767826874396!5m2!1str!2str",

  workTimes = [
    { day: "Monday", hours: "09:00 – 18:00" },
    { day: "Tuesday", hours: "09:00 – 18:00" },
    { day: "Wednesday", hours: "09:00 – 18:00" },
    { day: "Thursday", hours: "09:00 – 18:00" },
    { day: "Friday", hours: "09:00 – 18:00" },
    { day: "Saturday", hours: "By appointment" },
    { day: "Sunday", hours: "Closed" },
  ],
  phone = "+90 392 444 03 63",
  phoneHref = "tel:+903924440363",
  whatsapp = "+90 548 888 03 63",
  whatsappHref = "https://wa.me/905488880363",
  directionsHref = "https://maps.app.goo.gl/Qf2zGeLU2yCGsCF5Am",
  contactHref = "#contact",
}: Props) {
  return (
    <section
      aria-label="Turkey Office Location and Working Hours"
      className="relative bg-white"
      style={{ color: "#141517" }}
      data-bg="light"
    >
      {/* Soft glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(44rem 30rem at 0% 100%, ${TEAL}10, transparent 70%),
            radial-gradient(44rem 30rem at 100% 0%, ${ORANGE}10, transparent 70%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* LEFT IMAGE + MAP */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="lg:col-span-5 space-y-5"
          >
            {/* Image */}
            <div
              className="relative overflow-hidden rounded-2xl border bg-white/70 backdrop-blur-sm"
              style={{
                borderColor: "rgba(20,21,23,0.10)",
                boxShadow: "0 18px 55px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={image}
                alt={imageAlt}
                className="h-[280px] sm:h-[320px] lg:h-[360px] w-full object-cover"
                draggable={false}
              />

              {/* subtle overlay for consistency */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.18), rgba(0,0,0,0.0) 55%)",
                }}
              />
            </div>

            {/* Google Map */}
            <div
              className="relative overflow-hidden rounded-2xl border bg-white/70 backdrop-blur-sm"
              style={{
                borderColor: "rgba(20,21,23,0.10)",
                boxShadow: "0 18px 55px rgba(0,0,0,0.08)",
              }}
            >
              <iframe
                src={mapEmbedSrc}
                className="w-full h-[260px] lg:h-[300px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="DND Turkey Office Google Map"
              />

              {/* Map label */}
              <div className="pointer-events-none absolute bottom-3 left-3">
                <span
                  className="inline-block text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full border"
                  style={{
                    background: "rgba(255,255,255,0.88)",
                    color: TEAL,
                    borderColor: `${TEAL}33`,
                  }}
                >
                  Map
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-7">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              className="max-w-2xl"
            >
              {kicker && (
                <span
                  className="inline-block text-[12px] uppercase tracking-wide px-3 py-1 rounded-full mb-4"
                  style={{
                    background: `${TEAL}14`,
                    color: TEAL,
                    border: `1px solid ${TEAL}33`,
                  }}
                >
                  {kicker}
                </span>
              )}

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
                {title}
              </h2>

              {subtitle && (
                <p className="mt-3 text-base sm:text-lg text-black/70">
                  {subtitle}
                </p>
              )}
            </motion.div>

            {/* Cards row */}
            <div className="mt-8 grid gap-4 md:grid-cols-1">
              {/* Work times + contact card */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                className="rounded-2xl border bg-white/70 backdrop-blur-sm p-6 shadow-[0_10px_30px_rgba(0,0,0,.06)]"
                style={{ borderColor: "rgba(20,21,23,0.10)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-black/50">
                      Working Hours
                    </div>
                    <div className="mt-1 text-lg font-semibold text-slate-900">
                      Choose a time that works for you
                    </div>
                  </div>
                  <span
                    className="inline-flex items-center text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full border"
                    style={{
                      background: `${TEAL}14`,
                      color: TEAL,
                      borderColor: `${TEAL}33`,
                    }}
                  >
                    Support
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  {workTimes.map((t, i) => (
                    <div
                      key={t.day + i}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-black/60">{t.day}</span>
                      <span className="font-medium text-black/80">
                        {t.hours}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-5 pt-5 border-t"
                  style={{ borderColor: "rgba(20,21,23,0.08)" }}
                >
                  <div className="text-[11px] uppercase tracking-wide text-black/50">
                    Quick Contact
                  </div>

                  <div className="mt-3 flex flex-wrap gap-3 text-sm">
                    <a
                      href={whatsappHref}
                      className="px-4 py-2 rounded-full font-medium transition-transform hover:-translate-y-0.5"
                      style={{
                        background: TEAL,
                        color: "#fff",
                        boxShadow: `0 10px 24px ${TEAL}33`,
                      }}
                    >
                      WhatsApp
                    </a>
                    <a
                      href={phoneHref}
                      className="px-4 py-2 rounded-full font-medium"
                      style={{
                        background: `${ORANGE}14`,
                        color: ORANGE,
                        border: `1px solid ${ORANGE}33`,
                      }}
                    >
                      Call
                    </a>

                    <span className="inline-flex items-center gap-2 text-black/55">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: ORANGE }}
                        aria-hidden
                      />
                      Response within 24 hours
                    </span>
                  </div>

                  <div className="mt-3 text-xs text-black/45">
                    Phone:{" "}
                    <span className="font-medium text-black/70">{phone}</span> •
                    WhatsApp:{" "}
                    <span className="font-medium text-black/70">{whatsapp}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}