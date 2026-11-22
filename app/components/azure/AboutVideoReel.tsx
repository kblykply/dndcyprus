"use client";

import { useState } from "react";
import Img from "./Img";
import type { Locale } from "@/lib/azure/site";
import "./about-video-reel.css";

/**
 * Hakkımızda · DND Homes kartındaki video alanı (22 Kasım 2026): tek kurumsal video yerine 5 videoluk liste.
 * İlk video La Joya açılışı (yatay, tam ekran; kullanıcı 22.11), ardından ödeme modeli ve projeler (DND Cyprus YouTube kanalı, Kasım 2026), kurumsal video en sonda
 * (kurumsal video ileride değişecek; yalnız `corporate` değeri güncellenir). Dikey videolar (Shorts, Instagram reel)
 * sahnenin ortasında 9:16 çerçevede, yanlar kapağın bulanık kopyasıyla dolar.
 */
type Clip = { key: string; label: string; youtube?: string; src?: string; poster?: string; vertical?: boolean };

const TL = { key: "tl", src: "/videos/tl-odeme-modeli.mp4", poster: "/videos/tl-odeme-modeli.jpg", vertical: true };
const LV_BUILD = { key: "lv-insaat", youtube: "qb7jNE8JZCA", vertical: true };
const NEO = { key: "neocity", youtube: "yIR3S_f8X-k", vertical: true };
const LJ_OPEN = { key: "lj-acilis", youtube: "GKH4VSPH57E" };
const LV_FILM = { key: "lv-film", youtube: "bKNPhMFNzGY" };
const LJ_TOUR = { key: "lj-tur", youtube: "hMbzVAJMzXo" };

const LIST: Record<Locale, { region: string; play: string; corporate: string; clips: Clip[] }> = {
  tr: { region: "DND videoları", play: "Videoyu oynat", corporate: "Kurumsal video", clips: [
    { ...LJ_OPEN, label: "La Joya açıldı" },
    { ...TL, label: "Ödeme modeli: Maaşınız TL, taksitiniz de TL" },
    { ...LV_BUILD, label: "Lagoon Verde’de inşaat başladı" },
    { ...NEO, label: "NeoCity: Güzel bir hayat nasıl başlar?" },
  ] },
  en: { region: "DND videos", play: "Play video", corporate: "Corporate video", clips: [
    { ...LJ_OPEN, label: "La Joya is open" },
    { ...LV_FILM, label: "Lagoon Verde: the project" },
    { ...LV_BUILD, label: "Lagoon Verde: construction has begun" },
    { ...LJ_TOUR, label: "La Joya: residence tour" },
  ] },
  de: { region: "DND-Videos", play: "Video abspielen", corporate: "Unternehmensvideo", clips: [
    { ...LJ_OPEN, label: "La Joya ist eröffnet" },
    { ...LV_FILM, label: "Lagoon Verde: das Projekt" },
    { ...LV_BUILD, label: "Lagoon Verde: Baubeginn" },
    { ...LJ_TOUR, label: "La Joya: Rundgang" },
  ] },
  ru: { region: "Видео DND", play: "Смотреть видео", corporate: "Корпоративное видео", clips: [
    { ...LJ_OPEN, label: "La Joya открыт" },
    { ...LV_FILM, label: "Lagoon Verde: о проекте" },
    { ...LV_BUILD, label: "Lagoon Verde: стройка началась" },
    { ...LJ_TOUR, label: "La Joya: обзор резиденций" },
  ] },
  pl: { region: "Filmy DND", play: "Odtwórz film", corporate: "Film korporacyjny", clips: [
    { ...LJ_OPEN, label: "La Joya otwarta" },
    { ...LV_FILM, label: "Lagoon Verde: o projekcie" },
    { ...LV_BUILD, label: "Lagoon Verde: ruszyła budowa" },
    { ...LJ_TOUR, label: "La Joya: wizyta w rezydencjach" },
  ] },
};

const thumb = (c: Clip) => c.poster ?? `https://i.ytimg.com/vi/${c.youtube}/hqdefault.jpg`;
const Play = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
);

export default function AboutVideoReel({ locale, corporate }: { locale: Locale; corporate: { youtube: string; poster?: string } }) {
  const t = LIST[locale];
  const clips: Clip[] = [...t.clips, { key: "kurumsal", youtube: corporate.youtube, poster: corporate.poster, label: t.corporate }];
  const [i, setI] = useState(0);
  const [on, setOn] = useState(false);
  const c = clips[i];
  const pick = (k: number) => { setI(k); setOn(true); };

  const player = c.src ? (
    <video key={c.key} src={c.src} poster={c.poster} controls playsInline autoPlay preload="metadata" />
  ) : (
    <iframe key={c.key} src={`https://www.youtube-nocookie.com/embed/${c.youtube}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
      title={c.label} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
  );

  return (
    <div className="az-vreel" aria-label={t.region}>
      <div className={`stage${c.vertical ? " v" : ""}`}>
        {/* dikey videoda yanlar kapağın bulanık kopyası */}
        {c.vertical ? <Img className="blur" src={thumb(c)} sizes="60vw" alt="" quality={65} /> : null}
        <div className="frame">
          {on ? player : (
            <button type="button" className="cover" onClick={() => setOn(true)} aria-label={`${t.play}: ${c.label}`}>
              <Img src={thumb(c)} sizes="(min-width: 1440px) 900px, 100vw" alt="" quality={65} />
              <span className="pl"><Play /></span>
            </button>
          )}
        </div>
        <span className="cap">{c.label}</span>
      </div>
      <ol className="thumbs">
        {clips.map((x, k) => (
          <li key={x.key}>
            <button type="button" className={k === i ? "on" : undefined} aria-pressed={k === i} onClick={() => pick(k)}>
              <span className="im"><Img src={thumb(x)} sizes="160px" alt="" quality={65} /><span className="pl"><Play /></span></span>
              <span className="lb">{x.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
