"use client";

import React, { useState } from "react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type FormState = "idle" | "loading" | "success" | "error";

// CSS değişkeni için tip:
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
      setError("Lütfen zorunlu alanları doldurun.");
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      setError("Geçerli bir e-posta adresi girin.");
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
      setError("Gönderim sırasında bir sorun oluştu. Lütfen tekrar deneyin.");
    }
  }

   return (
    <section
      aria-label="İletişim Formu"
      className="relative overflow-hidden bg-white"
      id ="form"
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
            Bize Yazın
          </h2>
          <p
            className="mt-3 text-sm sm:text-base"
            style={{ color: "rgba(20,21,23,0.65)" }}
          >
            Sorularınız ve teklif talepleriniz için formu doldurun. En kısa
            sürede dönüş yaparız.
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
                Teşekkürler! Mesajınız alındı. En kısa sürede size dönüş
                yapacağız.
              </div>
            ) : null}

            {/* Honeypot (hidden) */}
            <div className="hidden">
              <label htmlFor="company">Şirket</label>
              <input id="company" name="company" type="text" autoComplete="organization" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                id="name"
                label="Ad Soyad *"
                placeholder="Adınız ve soyadınız"
                required
                type="text"
              />
              <Field
                id="email"
                label="E-posta *"
                placeholder="ornek@eposta.com"
                required
                type="email"
              />
              <Field
                id="phone"
                label="Telefon"
                placeholder="+90 ..."
                type="tel"
              />
              <Field
                id="subject"
                label="Konu *"
                placeholder="Teklif / İş birliği / Genel"
                required
                type="text"
              />
            </div>

            <div className="mt-5">
              <Label htmlFor="message">Mesaj *</Label>
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
                placeholder="Projeniz veya talebiniz hakkında birkaç detay yazabilirsiniz."
              />
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <p className="text-xs" style={{ color: "rgba(20,21,23,0.55)" }}>
                * Zorunlu alanlar
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
                    <Spinner /> Gönderiliyor...
                  </span>
                ) : status === "success" ? (
                  "Gönderildi ✓"
                ) : (
                  "Gönder"
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
                  Hızlı İletişim
                </p>
                <h3 className="mt-1.5 text-xl font-semibold">
                  Sizinle Bağlantı Kuralım
                </h3>
                <p className="mt-2 text-sm text-white/90">
                  Talebinizi iletin, ekibimiz en kısa sürede dönüş yapsın. Dilerseniz
                  doğrudan da iletişime geçebilirsiniz.
                </p>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="rounded-lg px-3 py-2 bg-white/10">
                    <span className="opacity-80">E-posta:</span>{" "}
                    <a className="underline-offset-2 hover:underline" href="mailto:info@dndcyprus.com">
                      info@dndcyprus.com
                    </a>
                  </div>
                  <div className="rounded-lg px-3 py-2 bg-white/10">
                    <span className="opacity-80">Telefon:</span>{" "}
                    <a className="underline-offset-2 hover:underline" href="tel:+90xxxxxxxxxx">
                      +90 392 444 03 63
                    </a>
                  </div>
                  <div className="rounded-lg px-3 py-2 bg-white/10">
                    <span className="opacity-80">WhatsApp:</span>{" "}
                    <a className="underline-offset-2 hover:underline" href="https://wa.me/905488880363" target="_blank">
                      Hızlı Mesaj Gönderin
                    </a>
                  </div>
                </div>

                <div className="mt-5 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-[13px]">
                  <strong className="font-medium">Aydınlatma:</strong>{" "}
                  Bilgileriniz KVKK kapsamında korunur; yalnızca talebinizi
                  karşılamak amacıyla kullanılacaktır.
                </div>
              </div>
            </div>

            {/* mini bullets */}
            <ul className="mt-6 space-y-3 text-sm" style={{ color: "rgba(20,21,23,0.8)" }}>
              <li className="rounded-lg border border-[var(--stroke)] px-3 py-2 bg-white">
                <span className="font-medium">Tahmini dönüş:</span> 24–48 saat
              </li>
              <li className="rounded-lg border border-[var(--stroke)] px-3 py-2 bg-white">
                <span className="font-medium">Çalışma saatleri:</span> Hafta içi 08:30–17:30
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
