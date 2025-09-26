"use client";

import React, { useState } from "react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot (bots will often fill this hidden field)
    if (data.get("company")) {
      setStatus("success"); // silently succeed
      form.reset();
      return;
    }

    // simple client validation
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
  const msg = err instanceof Error ? err.message : String(err);
  setError("Gönderim sırasında bir sorun oluştu. Lütfen tekrar deneyin.");
  // optionally log msg somewhere if needed
}

  }

  return (
    <section
  aria-label="İletişim Formu"
  className="relative overflow-hidden"
  style={{
    background: "#ffffff",
    color: "#141517",
    ["--stroke"]: "rgba(20,21,23,0.08)",
  } as React.CSSProperties & Record<"--stroke", string>}
>

      {/* subtle color accents */}
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

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-semibold">Bize Yazın</h2>
        <p className="mt-2 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.65)" }}>
          Sorularınız ve teklif talepleriniz için formu doldurun. En kısa sürede dönüş yaparız.
        </p>

        <form onSubmit={onSubmit} className="mt-8">
          <div
            className="rounded-2xl p-6 sm:p-7 space-y-5"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))",
              border: "1px solid var(--stroke)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Honeypot (hidden) */}
            <div className="hidden">
              <label htmlFor="company">Şirket</label>
              <input id="company" name="company" type="text" autoComplete="organization" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium">Ad Soyad *</label>
                <input
                  id="name" name="name" required
                  className="mt-1 w-full rounded-lg px-3 py-2 outline-none"
                  style={{
                    background: "#fff",
                    border: "1px solid var(--stroke)",
                  }}
                  placeholder="Adınız ve soyadınız"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium">E-posta *</label>
                <input
                  id="email" name="email" type="email" required
                  className="mt-1 w-full rounded-lg px-3 py-2 outline-none"
                  style={{ background: "#fff", border: "1px solid var(--stroke)" }}
                  placeholder="ornek@eposta.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-sm font-medium">Telefon</label>
                <input
                  id="phone" name="phone" type="tel"
                  className="mt-1 w-full rounded-lg px-3 py-2 outline-none"
                  style={{ background: "#fff", border: "1px solid var(--stroke)" }}
                  placeholder="+90 ..."
                />
              </div>

              <div>
                <label htmlFor="subject" className="text-sm font-medium">Konu *</label>
                <input
                  id="subject" name="subject" required
                  className="mt-1 w-full rounded-lg px-3 py-2 outline-none"
                  style={{ background: "#fff", border: "1px solid var(--stroke)" }}
                  placeholder="Teklif / İş birliği / Genel"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium">Mesaj *</label>
              <textarea
                id="message" name="message" required rows={6}
                className="mt-1 w-full rounded-lg px-3 py-2 outline-none resize-y"
                style={{ background: "#fff", border: "1px solid var(--stroke)" }}
                placeholder="Projeniz veya talebiniz hakkında birkaç detay yazabilirsiniz."
              />
            </div>

            {/* status / errors */}
            {error ? (
              <div
                className="text-sm rounded-lg px-3 py-2"
                style={{ background: `${ORANGE}14`, color: ORANGE, border: `1px solid ${ORANGE}33` }}
              >
                {error}
              </div>
            ) : null}

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs" style={{ color: "rgba(20,21,23,0.55)" }}>
                * Zorunlu alanlar
              </p>

              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-xl px-5 py-2.5 text-sm font-medium disabled:opacity-60"
                style={{
                  background: `linear-gradient(180deg, ${TEAL}, ${TEAL})`,
                  color: "#fff",
                  boxShadow: `0 10px 28px ${TEAL}40`,
                  border: `1px solid ${TEAL}55`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = `linear-gradient(180deg, ${ORANGE}, ${ORANGE})`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = `linear-gradient(180deg, ${TEAL}, ${TEAL})`)
                }
              >
                {status === "loading" ? "Gönderiliyor..." : status === "success" ? "Gönderildi ✓" : "Gönder"}
              </button>
            </div>
          </div>
        </form>

        {/* success note under form */}
        {status === "success" ? (
          <div className="mt-4 text-sm"
               style={{ color: "rgba(20,21,23,0.7)" }}>
            Teşekkürler! Mesajınız alındı. En kısa sürede size dönüş yapacağız.
          </div>
        ) : null}
      </div>
    </section>
  );
}
