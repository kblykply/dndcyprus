"use client";

// Proje sayfaları için fiyat / kat planı talep formu (reklam kampanyalarının ana dönüşümü).
// Gönderim lib/lead-submit üzerinden: kaynak bilgisi, izin bayrakları, generate_lead + Meta CAPI.

import Link from "next/link";
import React, { useId, useRef, useState } from "react";
import { submitLead } from "@/lib/lead-submit";
import { attributionRef } from "@/lib/attribution";

const TEAL = "#27959b";
const ORANGE = "#f15c34";
const WHATSAPP = "905488880363";

type Props = {
  locale: "tr" | "en";
  project: string;
  projectName: string;
  unitTypes: string[];
  id?: string;
};

type FieldName = "name" | "phone" | "email" | "unitType" | "consent";
type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COPY = {
  tr: {
    eyebrow: "Satış ofisi",
    heading: "Fiyat ve kat planı bilgisi alın",
    intro: (p: string) =>
      `${p} için güncel fiyat listesi, kat planları ve ödeme seçeneklerini size iletelim.`,
    bullets: ["Güncel fiyat listesi", "Kat planları ve daire tipleri", "Ödeme planı seçenekleri"],
    name: "Ad Soyad",
    namePh: "Adınız ve soyadınız",
    phone: "Telefon",
    phonePh: "+90 5xx xxx xx xx",
    phoneHint: "Ülke koduyla birlikte yazın (ör. +90, +44).",
    email: "E-posta",
    emailPh: "ornek@eposta.com",
    unitType: "Daire tipi",
    unitTypePh: "Seçiniz",
    undecided: "Henüz karar vermedim",
    message: "Mesaj (isteğe bağlı)",
    messagePh: "Bütçe, teslim tarihi veya sorularınızı yazabilirsiniz.",
    consentPre: "",
    consentLink: "Kişisel verilerimin",
    consentPost: " iletişim amacıyla işlenmesini kabul ediyorum.",
    privacyHref: "/tr/privacy",
    submit: "Fiyat ve kat planını iste",
    sending: "Gönderiliyor…",
    errors: {
      name: "Lütfen adınızı ve soyadınızı yazın.",
      phone: "Lütfen ülke koduyla geçerli bir telefon numarası yazın.",
      email: "Lütfen geçerli bir e-posta adresi yazın.",
      unitType: "Lütfen bir daire tipi seçin.",
      consent: "Devam etmek için onay kutusunu işaretleyin.",
    },
    summary: "Lütfen işaretli alanları kontrol edin.",
    successTitle: "Teşekkürler!",
    success: "Talebiniz alındı. Satış ekibimiz en kısa sürede sizinle iletişime geçecek.",
    successWa: "Beklemek istemezseniz WhatsApp'tan yazın",
    error: "Gönderim sırasında bir sorun oluştu. Lütfen tekrar deneyin ya da WhatsApp üzerinden bize yazın.",
    errorWa: "WhatsApp'tan yazın",
    waText: (p: string) => `Merhaba! ${p} hakkında fiyat ve kat planı bilgisi almak istiyorum.`,
    privacyNote: "Bilgileriniz yalnızca talebinizi yanıtlamak için kullanılır.",
  },
  en: {
    eyebrow: "Sales office",
    heading: "Get prices and floor plans",
    intro: (p: string) =>
      `We will send you the current price list, floor plans and payment options for ${p}.`,
    bullets: ["Current price list", "Floor plans and unit types", "Payment plan options"],
    name: "Full name",
    namePh: "Your full name",
    phone: "Phone",
    phonePh: "+44 7xxx xxxxxx",
    phoneHint: "Please include your country code (e.g. +44, +90).",
    email: "Email",
    emailPh: "name@example.com",
    unitType: "Unit type",
    unitTypePh: "Please select",
    undecided: "Not decided yet",
    message: "Message (optional)",
    messagePh: "Budget, preferred delivery date or any questions.",
    consentPre: "I agree to the processing of ",
    consentLink: "my personal data",
    consentPost: " for the purpose of contacting me.",
    privacyHref: "/en/privacy",
    submit: "Request prices & floor plans",
    sending: "Sending…",
    errors: {
      name: "Please enter your full name.",
      phone: "Please enter a valid phone number with country code.",
      email: "Please enter a valid email address.",
      unitType: "Please select a unit type.",
      consent: "Please tick the consent box to continue.",
    },
    summary: "Please check the highlighted fields.",
    successTitle: "Thank you!",
    success: "We have received your request. Our sales team will contact you shortly.",
    successWa: "Prefer not to wait? Message us on WhatsApp",
    error: "Something went wrong while sending your request. Please try again or message us on WhatsApp.",
    errorWa: "Message us on WhatsApp",
    waText: (p: string) => `Hello! I would like to receive prices and floor plans for ${p}.`,
    privacyNote: "Your details are only used to respond to your request.",
  },
} as const;

type Values = { name: string; phone: string; email: string; unitType: string; message: string; consent: boolean };

function validate(v: Values): Partial<Record<FieldName, true>> {
  const e: Partial<Record<FieldName, true>> = {};
  if (v.name.trim().length < 2) e.name = true;
  const digits = v.phone.replace(/\D/g, "");
  if (!/^[+\d\s().-]+$/.test(v.phone.trim()) || digits.length < 7 || digits.length > 15) e.phone = true;
  if (!EMAIL_RE.test(v.email.trim())) e.email = true;
  if (!v.unitType) e.unitType = true;
  if (!v.consent) e.consent = true;
  return e;
}

export default function LeadForm({ locale, project, projectName, unitTypes, id = "fiyat-al" }: Props) {
  const t = COPY[locale];
  const uid = useId();
  const fid = (n: string) => `${uid}-${n}`;

  const [values, setValues] = useState<Values>({
    name: "",
    phone: "",
    email: "",
    unitType: "",
    message: "",
    consent: false,
  });
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const companyRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const errors = validate(values);
  const show = (n: FieldName) => !!errors[n] && (submitted || !!touched[n]);
  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t.waText(projectName))}`;
  // Kampanya referansı tıklama anında eklenir (sunucu/istemci çıktısı aynı kalsın)
  const withRef = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t.waText(projectName) + attributionRef())}`;
  };
  const options = [...unitTypes, t.undecided];

  const set = <K extends keyof Values>(k: K, v: Values[K]) => setValues((s) => ({ ...s, [k]: v }));
  const blur = (n: FieldName) => setTouched((s) => ({ ...s, [n]: true }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    if (status === "loading") return;

    const errs = validate(values);
    const first = (Object.keys(errs) as FieldName[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("loading");
    const res = await submitLead({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      subject: `${projectName} – Fiyat/Bilgi talebi`,
      message: values.message.trim(),
      project,
      unitType: values.unitType,
      form: "lead",
      company: companyRef.current?.value || "",
    });

    if (res.ok) {
      setStatus("success");
      // Başarı mesajı ekran okuyucuya ve klavyeye duyurulsun
      window.setTimeout(() => successRef.current?.focus(), 0);
    } else {
      setStatus("error");
      // Hata kutusu formun üstünde; butona basan kullanıcı görsün
      window.setTimeout(() => errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
    }
  }

  const inputBase =
    "mt-1.5 w-full rounded-xl bg-white px-3.5 py-2.5 text-[15px] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(39,149,155,0.15)]";
  const borderFor = (n: FieldName) => ({
    border: `1px solid ${show(n) ? `${ORANGE}99` : "rgba(20,21,23,0.1)"}`,
  });

  return (
    <section
      id={id}
      aria-labelledby={fid("heading")}
      className="relative overflow-hidden bg-white scroll-mt-24"
      style={{ color: "#141517" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(34rem 26rem at 0% 0%, ${TEAL}14, transparent 60%), radial-gradient(30rem 24rem at 100% 100%, ${ORANGE}10, transparent 60%)`,
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-8 lg:py-20">
        {/* Tanıtım */}
        <div className="lg:pt-4">
          <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: TEAL }}>
            {t.eyebrow} · {projectName}
          </p>
          <h2 id={fid("heading")} className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.65)" }}>
            {t.intro(projectName)}
          </p>
          <ul className="mt-6 space-y-2.5">
            {t.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm sm:text-[15px]" style={{ color: "rgba(20,21,23,0.82)" }}>
                <span
                  aria-hidden
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs text-white"
                  style={{ background: TEAL }}
                >
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Form kartı */}
        <div
          className="rounded-2xl p-5 sm:p-8"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.75))",
            border: "1px solid rgba(20,21,23,0.08)",
            boxShadow: "0 18px 44px rgba(0,0,0,0.07), inset 0 1px rgba(255,255,255,0.65)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          {status === "success" ? (
            <div ref={successRef} role="status" tabIndex={-1} className="py-6 text-center outline-none">
              <span
                aria-hidden
                className="mx-auto grid h-14 w-14 place-items-center rounded-full text-2xl text-white"
                style={{ background: TEAL, boxShadow: `0 12px 30px ${TEAL}40` }}
              >
                ✓
              </span>
              <h3 className="mt-4 text-xl font-semibold">{t.successTitle}</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.7)" }}>
                {t.success}
              </p>
              <a
                href={waHref}
                onClick={withRef}
                target="_blank"
                rel="noopener noreferrer"
                data-track-label="lead_form_success"
                className="mt-5 inline-block text-sm font-medium underline underline-offset-4"
                style={{ color: TEAL }}
              >
                {t.successWa}
              </a>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={status === "loading"}>
              {status === "error" ? (
                <div
                  ref={errorRef}
                  role="alert"
                  className="mb-5 rounded-xl px-3.5 py-3 text-sm"
                  style={{ background: `${ORANGE}14`, color: "#b93d1b", border: `1px solid ${ORANGE}33` }}
                >
                  {t.error}{" "}
                  <a
                    href={waHref}
                    onClick={withRef}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track-label="lead_form_error"
                    className="font-medium underline underline-offset-2"
                  >
                    {t.errorWa}
                  </a>
                </div>
              ) : submitted && Object.keys(errors).length > 0 ? (
                <p role="alert" className="mb-4 text-sm" style={{ color: "#b93d1b" }}>
                  {t.summary}
                </p>
              ) : null}

              {/* Honeypot (gizli) */}
              <div className="hidden" aria-hidden>
                <label htmlFor={fid("company")}>Company</label>
                <input ref={companyRef} id={fid("company")} name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="sm:col-span-2">
                  <label htmlFor={fid("name")} className="text-sm font-medium">
                    {t.name} <span aria-hidden style={{ color: TEAL }}>*</span>
                  </label>
                  <input
                    id={fid("name")}
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={120}
                    required
                    placeholder={t.namePh}
                    value={values.name}
                    onChange={(e) => set("name", e.target.value)}
                    onBlur={() => blur("name")}
                    aria-invalid={show("name")}
                    aria-describedby={show("name") ? fid("name-err") : undefined}
                    className={inputBase}
                    style={borderFor("name")}
                  />
                  <FieldError id={fid("name-err")} show={show("name")} text={t.errors.name} />
                </div>

                <div>
                  <label htmlFor={fid("phone")} className="text-sm font-medium">
                    {t.phone} <span aria-hidden style={{ color: TEAL }}>*</span>
                  </label>
                  <input
                    id={fid("phone")}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={40}
                    required
                    placeholder={t.phonePh}
                    value={values.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    onBlur={() => blur("phone")}
                    aria-invalid={show("phone")}
                    aria-describedby={`${fid("phone-hint")}${show("phone") ? ` ${fid("phone-err")}` : ""}`}
                    className={inputBase}
                    style={borderFor("phone")}
                  />
                  <p id={fid("phone-hint")} className="mt-1 text-xs" style={{ color: "rgba(20,21,23,0.55)" }}>
                    {t.phoneHint}
                  </p>
                  <FieldError id={fid("phone-err")} show={show("phone")} text={t.errors.phone} />
                </div>

                <div>
                  <label htmlFor={fid("email")} className="text-sm font-medium">
                    {t.email} <span aria-hidden style={{ color: TEAL }}>*</span>
                  </label>
                  <input
                    id={fid("email")}
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    placeholder={t.emailPh}
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    onBlur={() => blur("email")}
                    aria-invalid={show("email")}
                    aria-describedby={show("email") ? fid("email-err") : undefined}
                    className={inputBase}
                    style={borderFor("email")}
                  />
                  <FieldError id={fid("email-err")} show={show("email")} text={t.errors.email} />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor={fid("unitType")} className="text-sm font-medium">
                    {t.unitType} <span aria-hidden style={{ color: TEAL }}>*</span>
                  </label>
                  <select
                    id={fid("unitType")}
                    name="unitType"
                    required
                    value={values.unitType}
                    onChange={(e) => set("unitType", e.target.value)}
                    onBlur={() => blur("unitType")}
                    aria-invalid={show("unitType")}
                    aria-describedby={show("unitType") ? fid("unitType-err") : undefined}
                    className={`${inputBase} appearance-none pr-10`}
                    style={{
                      ...borderFor("unitType"),
                      color: values.unitType ? "#141517" : "rgba(20,21,23,0.5)",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5l5-5' stroke='%2327959b' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                    }}
                  >
                    <option value="" disabled>
                      {t.unitTypePh}
                    </option>
                    {options.map((o) => (
                      <option key={o} value={o} style={{ color: "#141517" }}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <FieldError id={fid("unitType-err")} show={show("unitType")} text={t.errors.unitType} />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor={fid("message")} className="text-sm font-medium">
                    {t.message}
                  </label>
                  <textarea
                    id={fid("message")}
                    name="message"
                    rows={3}
                    maxLength={2000}
                    placeholder={t.messagePh}
                    value={values.message}
                    onChange={(e) => set("message", e.target.value)}
                    className={`${inputBase} resize-y`}
                    style={{ border: "1px solid rgba(20,21,23,0.1)" }}
                  />
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-start gap-3">
                  <input
                    id={fid("consent")}
                    name="consent"
                    type="checkbox"
                    required
                    checked={values.consent}
                    onChange={(e) => {
                      set("consent", e.target.checked);
                      blur("consent");
                    }}
                    aria-invalid={show("consent")}
                    aria-describedby={show("consent") ? fid("consent-err") : undefined}
                    className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded"
                    style={{ accentColor: TEAL }}
                  />
                  <label htmlFor={fid("consent")} className="text-[13px] leading-relaxed" style={{ color: "rgba(20,21,23,0.78)" }}>
                    {t.consentPre}
                    <Link
                      href={t.privacyHref}
                      target="_blank"
                      rel="noopener"
                      className="font-medium underline underline-offset-2"
                      style={{ color: TEAL }}
                    >
                      {t.consentLink}
                    </Link>
                    {t.consentPost} <span aria-hidden style={{ color: TEAL }}>*</span>
                  </label>
                </div>
                <FieldError id={fid("consent-err")} show={show("consent")} text={t.errors.consent} />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-6 w-full rounded-2xl px-6 py-3 text-[15px] font-medium text-white transition-colors disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27959b]"
                style={{ background: TEAL, border: `1px solid ${TEAL}55`, boxShadow: `0 12px 30px ${TEAL}40` }}
                onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE)}
                onMouseLeave={(e) => (e.currentTarget.style.background = TEAL)}
              >
                {status === "loading" ? (
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden
                      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"
                    />
                    {t.sending}
                  </span>
                ) : (
                  t.submit
                )}
              </button>
              <p className="mt-3 text-center text-xs" style={{ color: "rgba(20,21,23,0.55)" }}>
                {t.privacyNote}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FieldError({ id, show, text }: { id: string; show: boolean; text: string }) {
  if (!show) return null;
  return (
    <p id={id} className="mt-1 text-xs" style={{ color: "#b93d1b" }}>
      {text}
    </p>
  );
}
