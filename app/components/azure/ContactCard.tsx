"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { submitLead } from "@/lib/lead-submit";
import { CONTACT, PROJECTS, href, type Locale } from "@/lib/azure/site";

const COPY = {
  tr: {
    kicker: "İletişim",
    title: <>Birlikte değer <b>yaratalım.</b></>,
    lead: "Talebinizi iletin, ekibimiz 24–48 saat içinde dönüş yapsın. Bilgileriniz KVKK kapsamında korunur.",
    hq: "DND Cyprus Merkez Ofis", sales: "Lagoon Verde Satış Ofisi",
    name: "Ad Soyad *", phone: "Telefon *", email: "E-posta *", project: "Proje", unit: "Daire tipi", message: "Mesaj", subject: "Konu *",
    undecided: "Henüz karar vermedim",
    consentPre: "", consentLink: "Kişisel verilerimin", consentPost: " iletişim amacıyla işlenmesini kabul ediyorum.",
    submit: "Fiyat ve kat planı iste", submitContact: "Mesaj gönder", sending: "Gönderiliyor…",
    ok: "Talebiniz alındı · 24–48 saat içinde dönüş yapacağız",
    okTitle: "Teşekkürler!", okText: "Talebiniz alındı. Satış ekibimiz en kısa sürede sizinle iletişime geçecek.",
    wa: "Beklemek istemezseniz WhatsApp'tan yazın",
    err: "Gönderim sırasında bir sorun oluştu. Lütfen tekrar deneyin ya da WhatsApp üzerinden bize yazın.",
    invalid: "Lütfen işaretli alanları kontrol edin.",
    phoneHint: "Ülke koduyla yazın (ör. +90, +44).",
    note: "Bilgileriniz yalnızca talebinizi yanıtlamak için kullanılır.",
    waText: (p?: string) => p ? `Merhaba! ${p} hakkında fiyat ve kat planı bilgisi almak istiyorum.` : "Merhaba! Bilgi almak istiyorum.",
  },
  en: {
    kicker: "Contact",
    title: <>Let’s create value <b>together.</b></>,
    lead: "Send us your request and our team will get back to you within 24–48 hours. Your data is protected.",
    hq: "DND Cyprus Head Office", sales: "Lagoon Verde Sales Office",
    name: "Full name *", phone: "Phone *", email: "Email *", project: "Project", unit: "Unit type", message: "Message", subject: "Subject *",
    undecided: "Not decided yet",
    consentPre: "I agree to the processing of ", consentLink: "my personal data", consentPost: " for the purpose of contacting me.",
    submit: "Request prices & floor plans", submitContact: "Send message", sending: "Sending…",
    ok: "Request received · we will reply within 24–48 hours",
    okTitle: "Thank you!", okText: "We have received your request. Our sales team will contact you shortly.",
    wa: "Prefer not to wait? Message us on WhatsApp",
    err: "Something went wrong while sending. Please try again or message us on WhatsApp.",
    invalid: "Please check the highlighted fields.",
    phoneHint: "Include your country code (e.g. +44, +90).",
    note: "Your details are only used to respond to your request.",
    waText: (p?: string) => p ? `Hello! I would like to receive prices and floor plans for ${p}.` : "Hello! I would like more information.",
  },
};

type Props = {
  locale: Locale;
  /** "home": proje seçimi; "lead": belirli projenin daire tipleri; "contact": konu + mesaj */
  mode?: "home" | "lead" | "contact";
  project?: string;            // lead modunda analitik slug (lagoon-verde …)
  projectName?: string;
  unitTypes?: string[];
  image?: string;
  kicker?: string;
  title?: React.ReactNode;
  lead?: string;
  highlights?: string[];
  showOffices?: boolean;
  brochureHref?: string;
  id?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactCard({
  locale, mode = "home", project, projectName, unitTypes = [], image = "/azure/p2-9.jpg",
  kicker, title, lead, highlights = [], showOffices = true, brochureHref, id,
}: Props) {
  const t = COPY[locale];
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const v = (k: string) => String(data.get(k) || "").trim();
    const name = v("name"), phone = v("phone"), email = v("email"), message = v("message");
    const choice = v("choice");
    const subject = mode === "contact" ? v("subject") : "";
    const errs: Record<string, boolean> = {};
    if (name.length < 2) errs.name = true;
    const digits = phone.replace(/\D/g, "");
    if (!phone || digits.length < 7 || digits.length > 15) errs.phone = true;
    if (!EMAIL_RE.test(email)) errs.email = true;
    if (mode === "contact" && !subject) errs.subject = true;
    if (mode === "contact" && !message) errs.message = true;
    if (!data.get("consent")) errs.consent = true;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("loading");
    const selectedProject = mode === "home" ? choice : (project || "");
    const result = await submitLead({
      name, email, phone,
      subject: mode === "contact" ? subject : (mode === "lead" ? `${projectName} · ${choice || t.undecided}` : (choice || t.undecided)),
      message,
      project: selectedProject || undefined,
      unitType: mode === "lead" ? (choice || undefined) : undefined,
      form: mode === "contact" ? "contact" : (mode === "lead" ? "lead" : "home"),
      company: v("company"),
    });
    if (result.ok) {
      setStatus("success");
      setToast(true);
      setTimeout(() => setToast(false), 4000);
      form.reset();
    } else {
      setStatus("error");
    }
  }

  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t.waText(projectName))}`;
  const options = mode === "lead" ? unitTypes : PROJECTS.filter((p) => p.slug !== "gecitkale").map((p) => p.name);

  return (
    <section className="az-section az-contact" id={id}>
      <div className="az-wrap">
        <div className="card rv">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="bg" src={image} alt="" loading="lazy" />
          <div>
            <span className="az-kicker light">{kicker ?? t.kicker}</span>
            <h2>{title ?? t.title}</h2>
            <p className="lead">{lead ?? t.lead}</p>
            {highlights.length > 0 && <div className="hl">{highlights.map((h) => <span key={h}>{h}</span>)}</div>}
            {showOffices && (
              <div className="off">
                <div><b>{t.hq}</b><span>{CONTACT.hq[locale]} · {CONTACT.hours[locale]}</span></div>
                <div><b>{t.sales}</b><span>{CONTACT.sales[locale]}</span></div>
                <div><b><a href={CONTACT.phoneHref}>{CONTACT.phone}</a> · <a href={`tel:+${CONTACT.whatsapp}`}>{CONTACT.mobile}</a></b><span><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> · <a href={waHref} target="_blank" rel="noopener noreferrer">WhatsApp</a></span></div>
              </div>
            )}
            {brochureHref && (
              <div className="cta"><a className="az-btn glass sm" href={brochureHref} target={brochureHref.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{locale === "tr" ? "Broşür (PDF)" : "Brochure (PDF)"}</a></div>
            )}
          </div>

          {status === "success" ? (
            <div className="az-f az-done" role="status" aria-live="polite" style={{ display: "grid" }}>
              <h3>{t.okTitle}</h3>
              <p>{t.okText}</p>
              <a className="az-btn sea sm" href={waHref} target="_blank" rel="noopener noreferrer">{t.wa}</a>
            </div>
          ) : (
            <form className="az-f" onSubmit={onSubmit} noValidate aria-describedby={Object.keys(errors).length ? `${uid}-err` : undefined}>
              <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999, opacity: 0 }} />
              <div className="az-field"><label htmlFor={`${uid}-n`}>{t.name}</label><input id={`${uid}-n`} name="name" type="text" autoComplete="name" required aria-invalid={errors.name || undefined} /></div>
              <div className="az-field"><label htmlFor={`${uid}-p`}>{t.phone}</label><input id={`${uid}-p`} name="phone" type="tel" placeholder={locale === "tr" ? "+90" : "+44"} autoComplete="tel" required aria-invalid={errors.phone || undefined} /></div>
              <div className="az-field"><label htmlFor={`${uid}-e`}>{t.email}</label><input id={`${uid}-e`} name="email" type="email" autoComplete="email" required aria-invalid={errors.email || undefined} /></div>
              {mode === "contact" ? (
                <div className="az-field"><label htmlFor={`${uid}-s`}>{t.subject}</label><input id={`${uid}-s`} name="subject" type="text" required aria-invalid={errors.subject || undefined} /></div>
              ) : (
                <div className="az-field"><label htmlFor={`${uid}-c`}>{mode === "lead" ? t.unit : t.project}</label>
                  <select id={`${uid}-c`} name="choice" defaultValue="">
                    <option value="">{t.undecided}</option>
                    {options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              )}
              <div className="az-field full"><label htmlFor={`${uid}-m`}>{t.message}{mode === "contact" ? " *" : ""}</label><textarea id={`${uid}-m`} name="message" aria-invalid={errors.message || undefined} /></div>
              <div className="az-field full">
                <label className="kv"><input type="checkbox" name="consent" required aria-invalid={errors.consent || undefined} />
                  <span>{t.consentPre}<Link href={href(locale, "/privacy")} prefetch={false}>{t.consentLink}</Link>{t.consentPost}</span>
                </label>
              </div>
              {Object.keys(errors).length > 0 && <p className="az-note err" id={`${uid}-err`} role="alert" style={{ color: "#ffd4c8" }}>{t.invalid} {errors.phone ? t.phoneHint : ""}</p>}
              {status === "error" && <p className="az-note" role="alert" style={{ color: "#ffd4c8" }}>{t.err} <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>WhatsApp</a></p>}
              <div className="az-field full" style={{ gridTemplateColumns: "1fr", alignContent: "end" }}>
                <button className="az-btn" type="submit" disabled={status === "loading"}>{status === "loading" ? t.sending : (mode === "contact" ? t.submitContact : t.submit)}</button>
                <span className="az-note">{t.note}</span>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className={`az-toast${toast ? " on" : ""}`} aria-hidden={!toast}>{t.ok}</div>
    </section>
  );
}
