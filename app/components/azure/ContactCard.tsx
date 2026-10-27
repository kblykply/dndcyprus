"use client";

import Img from "./Img";
import Link from "next/link";
import { useId, useState } from "react";
import { submitLead } from "@/lib/lead-submit";
import { CONTACT, PROJECTS, href, type Locale } from "@/lib/azure/site";
import PhoneField, { joinPhone } from "./PhoneField";

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
    phoneHint: "Ülke kodunu seçip numaranızı yazın; listede yoksa numarayı + ile başlatın.",
    note: "Bilgileriniz yalnızca talebinizi yanıtlamak için kullanılır.",
    waText: (p?: string) => p ? `Merhaba! ${p} hakkında fiyat ve kat planı bilgisi almak istiyorum.` : "Merhaba! Bilgi almak istiyorum.",
    namePh: "Adınız ve soyadınız", emailPh: "ad@eposta.com", subjectPh: "Örn. Lagoon Verde fiyat bilgisi",
    messagePh: "Bütçe, teslim tarihi veya sorularınızı yazabilirsiniz.", messagePhContact: "Size nasıl yardımcı olabiliriz?",
    brochure: "Broşür (PDF)",
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
    phoneHint: "Choose your country code and enter your number; if your country is not listed, start the number with +.",
    note: "Your details are only used to respond to your request.",
    waText: (p?: string) => p ? `Hello! I would like to receive prices and floor plans for ${p}.` : "Hello! I would like more information.",
    namePh: "Your full name", emailPh: "you@email.com", subjectPh: "E.g. Lagoon Verde prices",
    messagePh: "Budget, preferred delivery date or any questions.", messagePhContact: "How can we help you?",
    brochure: "Brochure (PDF)",
  },
  de: {
    kicker: "Kontakt",
    title: <>Gemeinsam Werte <b>schaffen.</b></>,
    lead: "Senden Sie uns Ihre Anfrage – unser Team meldet sich innerhalb von 24–48 Stunden bei Ihnen. Ihre Daten sind geschützt.",
    hq: "DND Cyprus Hauptsitz", sales: "Lagoon Verde Verkaufsbüro",
    name: "Vor- und Nachname *", phone: "Telefon *", email: "E-Mail *", project: "Projekt", unit: "Wohnungstyp", message: "Nachricht", subject: "Betreff *",
    undecided: "Noch nicht entschieden",
    consentPre: "Ich bin mit der Verarbeitung ", consentLink: "meiner personenbezogenen Daten", consentPost: " zur Kontaktaufnahme einverstanden.",
    submit: "Preise & Grundrisse anfordern", submitContact: "Nachricht senden", sending: "Wird gesendet…",
    ok: "Anfrage erhalten · wir antworten innerhalb von 24–48 Stunden",
    okTitle: "Vielen Dank!", okText: "Wir haben Ihre Anfrage erhalten. Unser Vertriebsteam meldet sich in Kürze bei Ihnen.",
    wa: "Sie möchten nicht warten? Schreiben Sie uns auf WhatsApp",
    err: "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie uns auf WhatsApp.",
    invalid: "Bitte prüfen Sie die markierten Felder.",
    phoneHint: "Wählen Sie die Ländervorwahl und geben Sie Ihre Nummer ein; fehlt Ihr Land, beginnen Sie die Nummer mit +.",
    note: "Ihre Angaben werden ausschließlich zur Beantwortung Ihrer Anfrage verwendet.",
    waText: (p?: string) => p ? `Hallo! Ich hätte gerne Preise und Grundrisse für ${p}.` : "Hallo! Ich hätte gerne weitere Informationen.",
    namePh: "Ihr Name", emailPh: "name@mail.de", subjectPh: "z. B. Preise Lagoon Verde",
    messagePh: "Budget, gewünschter Übergabetermin oder Ihre Fragen.", messagePhContact: "Wie können wir Ihnen helfen?",
    brochure: "Broschüre (PDF)",
  },
  ru: {
    kicker: "Контакты",
    title: <>Создадим ценность <b>вместе.</b></>,
    lead: "Отправьте заявку, и наша команда свяжется с вами в течение 24–48 часов. Ваши данные под защитой.",
    hq: "Головной офис DND Cyprus", sales: "Офис продаж Lagoon Verde",
    name: "Имя и фамилия *", phone: "Телефон *", email: "Эл. почта *", project: "Проект", unit: "Тип квартиры", message: "Сообщение", subject: "Тема *",
    undecided: "Пока не выбрано",
    consentPre: "Даю согласие на обработку ", consentLink: "моих персональных данных", consentPost: " для связи со мной.",
    submit: "Запросить цены и планировки", submitContact: "Отправить сообщение", sending: "Отправка…",
    ok: "Заявка получена · ответим в течение 24–48 часов",
    okTitle: "Спасибо!", okText: "Мы получили вашу заявку. Наш отдел продаж скоро свяжется с вами.",
    wa: "Не хотите ждать? Напишите нам в WhatsApp",
    err: "При отправке произошла ошибка. Попробуйте ещё раз или напишите нам в WhatsApp.",
    invalid: "Пожалуйста, проверьте отмеченные поля.",
    phoneHint: "Выберите код страны и введите номер; если вашей страны нет в списке, начните номер с +.",
    note: "Ваши данные используются только для ответа на вашу заявку.",
    waText: (p?: string) => p ? `Здравствуйте! Хочу получить цены и планировки по проекту ${p}.` : "Здравствуйте! Хочу получить больше информации.",
    namePh: "Ваше имя и фамилия", emailPh: "name@mail.ru", subjectPh: "Напр. цены Lagoon Verde",
    messagePh: "Бюджет, желаемый срок сдачи или ваши вопросы.", messagePhContact: "Чем мы можем помочь?",
    brochure: "Брошюра (PDF)",
  },
  pl: {
    kicker: "Kontakt",
    title: <>Twórzmy wartość <b>razem.</b></>,
    lead: "Prosimy przesłać zapytanie – nasz zespół skontaktuje się z Państwem w ciągu 24–48 godzin. Państwa dane są chronione.",
    hq: "Siedziba główna DND Cyprus", sales: "Biuro sprzedaży Lagoon Verde",
    name: "Imię i nazwisko *", phone: "Telefon *", email: "E-mail *", project: "Projekt", unit: "Typ mieszkania", message: "Wiadomość", subject: "Temat *",
    undecided: "Jeszcze nie wybrano",
    consentPre: "Wyrażam zgodę na przetwarzanie ", consentLink: "moich danych osobowych", consentPost: " w celu kontaktu.",
    submit: "Poproś o ceny i plany", submitContact: "Wyślij wiadomość", sending: "Wysyłanie…",
    ok: "Zapytanie otrzymane · odpowiemy w ciągu 24–48 godzin",
    okTitle: "Dziękujemy!", okText: "Otrzymaliśmy Państwa zapytanie. Nasz dział sprzedaży wkrótce się z Państwem skontaktuje.",
    wa: "Wolą Państwo nie czekać? Prosimy napisać do nas na WhatsApp",
    err: "Podczas wysyłania wystąpił błąd. Prosimy spróbować ponownie lub napisać do nas na WhatsApp.",
    invalid: "Prosimy sprawdzić zaznaczone pola.",
    phoneHint: "Wybierz kierunkowy kraju i wpisz numer; jeśli kraju nie ma na liście, zacznij numer od +.",
    note: "Państwa dane wykorzystujemy wyłącznie do odpowiedzi na zapytanie.",
    waText: (p?: string) => p ? `Dzień dobry! Proszę o ceny i plany mieszkań w projekcie ${p}.` : "Dzień dobry! Proszę o więcej informacji.",
    namePh: "Imię i nazwisko", emailPh: "ty@poczta.pl", subjectPh: "Np. ceny Lagoon Verde",
    messagePh: "Budżet, preferowany termin oddania lub pytania.", messagePhContact: "W czym możemy pomóc?",
    brochure: "Broszura (PDF)",
  },
} satisfies Record<Locale, unknown>;

type Props = {
  locale: Locale;
  /** "home": proje seçimi; "lead": belirli projenin daire tipleri; "contact": konu + mesaj */
  mode?: "home" | "lead" | "contact";
  project?: string;            // lead modunda analitik slug (lagoon-verde …)
  projectName?: string;
  unitTypes?: string[];
  image?: string;
  /** fotoğraf üstündeki üst etiket kaldırıldı (Ekim 2026); sayfalar hâlâ geçebilir */
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
  locale, mode = "home", project, projectName, unitTypes = [], image = "/azure/contact-sea.webp", // tüm formlarda aynı deniz arka planı (kum ve dalga kırpılmış)
  title, lead, highlights = [], showOffices = true, brochureHref, id,
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
    const name = v("name"), email = v("email"), message = v("message");
    // telefon: seçilen ülke kodu + numara ("0533…" → "+90 533…"); "+" / "00" ile tam yazıldıysa olduğu gibi
    const phoneIn = v("phone"), cc = v("cc");
    const phone = joinPhone(cc, phoneIn);
    const choice = v("choice");
    const subject = mode === "contact" ? v("subject") : "";
    const errs: Record<string, boolean> = {};
    if (name.length < 2) errs.name = true;
    const full = /^(\+|00)/.test(phoneIn) || !!cc;   // "Diğer ülke" seçiliyse numara + ile yazılmalı
    if (!phoneIn || phoneIn.replace(/\D/g, "").length < 7 || phone.replace(/\D/g, "").length > 15 || !full) errs.phone = true;
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
  const options = mode === "lead" ? unitTypes : PROJECTS.map((p) => p.name);

  return (
    <section className="az-section az-contact" id={id}>
      <div className="az-wrap">
        <div className="card rv">
          <Img className="bg" src={image} sizes="(min-width: 1000px) 50vw, 100vw" alt="" />
          <div>
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
              <div className="cta"><a className="az-btn glass sm" href={brochureHref} target={brochureHref.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{t.brochure}</a></div>
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
              <div className="az-field az-wide"><label htmlFor={`${uid}-n`}>{t.name}</label><input id={`${uid}-n`} name="name" type="text" autoComplete="name" placeholder={t.namePh} required aria-invalid={errors.name || undefined} /></div>
              <div className="az-field az-wide"><label htmlFor={`${uid}-p`}>{t.phone}</label><PhoneField id={`${uid}-p`} locale={locale} invalid={errors.phone} /></div>
              <div className="az-field"><label htmlFor={`${uid}-e`}>{t.email}</label><input id={`${uid}-e`} name="email" type="email" autoComplete="email" placeholder={t.emailPh} required aria-invalid={errors.email || undefined} /></div>
              {mode === "contact" ? (
                <div className="az-field"><label htmlFor={`${uid}-s`}>{t.subject}</label><input id={`${uid}-s`} name="subject" type="text" placeholder={t.subjectPh} required aria-invalid={errors.subject || undefined} /></div>
              ) : (
                <div className="az-field"><label htmlFor={`${uid}-c`}>{mode === "lead" ? t.unit : t.project}</label>
                  <select id={`${uid}-c`} name="choice" defaultValue="">
                    <option value="">{t.undecided}</option>
                    {options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              )}
              <div className="az-field full"><label htmlFor={`${uid}-m`}>{t.message}{mode === "contact" ? " *" : ""}</label><textarea id={`${uid}-m`} name="message" placeholder={mode === "contact" ? t.messagePhContact : t.messagePh} aria-invalid={errors.message || undefined} /></div>
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
