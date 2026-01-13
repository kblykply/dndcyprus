"use client";

import React, { useState } from "react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type FormState = "idle" | "loading" | "success" | "error";

// Type for CSS variable:
type CSSVars = React.CSSProperties & { "--stroke"?: string };

export default function ContactForm() {
  const [status, setStatus] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot
    if (data.get("company")) {
      setStatus("success");
      form.reset();
      return;
    }

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !subject || !message) {
      setError("Please fill in all required fields.");
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      if (!res.ok) throw new Error(await res.text());
      setStatus("success");
      form.reset();
    } catch (err: unknown) {
      setStatus("error");
      setError("There was a problem sending your message. Please try again.");
    }
  }

  return (
    <section
      aria-label="Contact Form"
      className="relative overflow-hidden bg-white"
      id="form"
      style={
        {
          background: "#ffffff",
          color: "#141517",
          "--stroke": "rgba(20,21,23,0.08)",
        } as CSSVars
      }
    >
      {/* Decorative background (soft blobs + subtle grid) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(34rem 28rem at 8% 0%, ${TEAL}12, transparent 60%),
            radial-gradient(36rem 28rem at 100% 100%, ${ORANGE}12, transparent 60%)
          `,
          maskImage:
            "radial-gradient(1200px 800px at 50% 0%, black, transparent 85%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(20,21,23,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(20,21,23,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Write to Us
          </h2>
          <p
            className="mt-3 text-sm sm:text-base"
            style={{ color: "rgba(20,21,23,0.65)" }}
          >
            Fill out the form for your questions and quote requests. We&apos;ll get
            back to you as soon as possible.
          </p>
        </div>

        {/* 2-column layout on large screens */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-8">
          {/* FORM CARD */}
          <form
            onSubmit={onSubmit}
            aria-busy={status === "loading"}
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.7))",
              border: "1px solid var(--stroke)",
              boxShadow:
                "0 18px 44px rgba(0,0,0,0.07), inset 0 1px rgba(255,255,255,0.65)",
              backdropFilter: "blur(14px)",
            }}
          >
            {/* banner area */}
            {error ? (
              <div
                role="alert"
                className="mb-5 text-sm rounded-xl px-3.5 py-3"
                style={{
                  background: `${ORANGE}14`,
                  color: ORANGE,
                  border: `1px solid ${ORANGE}33`,
                }}
              >
                {error}
              </div>
            ) : status === "success" ? (
              <div
                role="status"
                className="mb-5 text-sm rounded-xl px-3.5 py-3"
                style={{
                  background: `${TEAL}14`,
                  color: TEAL,
                  border: `1px solid ${TEAL}33`,
                }}
              >
                Thank you! Your message has been received. We will get back to you
                as soon as possible.
              </div>
            ) : null}

            {/* Honeypot (hidden) */}
            <div className="hidden">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                id="name"
                label="Full Name *"
                placeholder="Your full name"
                required
                type="text"
              />
              <Field
                id="email"
                label="Email *"
                placeholder="example@email.com"
                required
                type="email"
              />
              <Field
                id="phone"
                label="Phone"
                placeholder="+90 ..."
                type="tel"
              />
              <Field
                id="subject"
                label="Subject *"
                placeholder="Quote / Partnership / General"
                required
                type="text"
              />
            </div>

            <div className="mt-5">
              <Label htmlFor="message">Message *</Label>
              <textarea
                id="message"
                name="message"
                required
                rows={8}
                className="mt-1.5 w-full rounded-xl px-3.5 py-3 outline-none transition-shadow"
                style={{
                  background: "#fff",
                  border: "1px solid var(--stroke)",
                  boxShadow:
                    "inset 0 1px rgba(0,0,0,0.02), 0 0 0 0px rgba(39,149,155,0)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow =
                    "inset 0 1px rgba(0,0,0,0.02), 0 0 0 4px rgba(39,149,155,0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow =
                    "inset 0 1px rgba(0,0,0,0.02), 0 0 0 0px rgba(39,149,155,0)";
                }}
                placeholder="You can share a few details about your project or request."
              />
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <p
                className="text-xs"
                style={{ color: "rgba(20,21,23,0.55)" }}
              >
                * Required fields
              </p>

              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-2xl px-5 sm:px-6 py-2.5 text-sm sm:text-[15px] font-medium disabled:opacity-60 relative overflow-hidden"
                style={{
                  background: `linear-gradient(180deg, ${TEAL}, ${TEAL})`,
                  color: "#fff",
                  boxShadow: `0 12px 30px ${TEAL}40`,
                  border: `1px solid ${TEAL}55`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = `linear-gradient(180deg, ${ORANGE}, ${ORANGE})`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = `linear-gradient(180deg, ${TEAL}, ${TEAL})`)
                }
              >
                {status === "loading" ? (
                  <span className="inline-flex items-center gap-2">
                    <Spinner /> Sending...
                  </span>
                ) : status === "success" ? (
                  "Sent ✓"
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </form>

          {/* SIDE INFO / VISUAL CARD */}
          <aside
            className="rounded-2xl p-6 sm:p-7 lg:p-8"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.75), rgba(255,255,255,0.65))",
              border: "1px solid var(--stroke)",
              boxShadow:
                "0 18px 44px rgba(0,0,0,0.06), inset 0 1px rgba(255,255,255,0.6)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="relative overflow-hidden rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${TEAL} 0%, ${ORANGE} 100%)`,
                boxShadow: `0 24px 48px ${TEAL}33`,
              }}
            >
              {/* translucent glass layer */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06))",
                  backdropFilter: "blur(8px)",
                }}
              />
              {/* content */}
              <div className="relative p-6 sm:p-7 text-white">
                <p className="text-xs uppercase tracking-wider/loose opacity-90">
                  Quick Contact
                </p>
                <h3 className="mt-1.5 text-xl font-semibold">
                  Let&apos;s Get in Touch
                </h3>
                <p className="mt-2 text-sm text-white/90">
                  Send us your request and our team will respond as soon as
                  possible. You can also reach out directly if you prefer.
                </p>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="rounded-lg px-3 py-2 bg-white/10">
                    <span className="opacity-80">Email:</span>{" "}
                    <a
                      className="underline-offset-2 hover:underline"
                      href="mailto:info@dndcyprus.com"
                    >
                      info@dndcyprus.com
                    </a>
                  </div>
                  <div className="rounded-lg px-3 py-2 bg-white/10">
                    <span className="opacity-80">Phone:</span>{" "}
                    <a
                      className="underline-offset-2 hover:underline"
                      href="tel:+903924440363"
                    >
                      +90 392 444 03 63
                    </a>
                  </div>
                  <div className="rounded-lg px-3 py-2 bg-white/10">
                    <span className="opacity-80">WhatsApp:</span>{" "}
                    <a
                      className="underline-offset-2 hover:underline"
                      href="https://wa.me/905488880363"
                      target="_blank"
                    >
                      Send a Quick Message
                    </a>
                  </div>
                </div>

                <div className="mt-5 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-[13px]">
                  <strong className="font-medium">Notice:</strong>{" "}
                  Your information is protected under applicable data protection
                  laws and will be used only to respond to your request.
                </div>
              </div>
            </div>

            {/* mini bullets */}
            <ul
              className="mt-6 space-y-3 text-sm"
              style={{ color: "rgba(20,21,23,0.8)" }}
            >
              <li className="rounded-lg border border-[var(--stroke)] px-3 py-2 bg-white">
                <span className="font-medium">Estimated response:</span>{" "}
                24–48 hours
              </li>
              <li className="rounded-lg border border-[var(--stroke)] px-3 py-2 bg-white">
                <span className="font-medium">Business hours:</span>{" "}
                Weekdays 08:30–17:30
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- Small UI bits ---------- */

function Label(props: React.ComponentProps<"label">) {
  return (
    <label
      {...props}
      className={"text-sm font-medium " + (props.className ?? "")}
      style={{ color: "rgba(20,21,23,0.9)" }}
    />
  );
}

function Field({
  id,
  label,
  placeholder,
  required,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {required ? "" : ""}
      </Label>
      <input
        id={id}
        name={id}
        required={required}
        type={type}
        className="mt-1.5 w-full rounded-xl px-3.5 py-2.5 outline-none transition-shadow"
        style={{
          background: "#fff",
          border: "1px solid var(--stroke)",
          boxShadow:
            "inset 0 1px rgba(0,0,0,0.02), 0 0 0 0px rgba(39,149,155,0)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow =
            "inset 0 1px rgba(0,0,0,0.02), 0 0 0 4px rgba(39,149,155,0.15)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow =
            "inset 0 1px rgba(0,0,0,0.02), 0 0 0 0px rgba(39,149,155,0)";
        }}
        placeholder={placeholder}
        autoComplete="on"
      />
    </div>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 align-[-2px]"
      style={{
        borderColor: "#fff",
        borderRightColor: "transparent",
      }}
    />
  );
}
