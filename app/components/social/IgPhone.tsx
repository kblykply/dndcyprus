"use client";

import { AnimatePresence, m } from "framer-motion";

/*
  Instagram gönderisini telefon mockup'ı içinde gösterir (Instagram gömme kutusu yerine).
  Medya sitede barındırılır (public/instagram), beğeni/yorum sayısı gösterilmez.
  - Reels: tam ekran dikey video, sağda ikonlar, altta hesap + açıklama
  - Fotoğraf: akış görünümü (profil satırı, kare görsel, ikonlar, açıklama)
  Tek telefon çerçevesi sabit kalır; gönderi değişince yalnız ekran içeriği yumuşak geçişle değişir
  (yalnız gösterilen gönderinin videosu indirilir ve oynar).
*/

export type IgPost = {
  url: string;
  kind: "reel" | "image";
  media: string; // mp4 (reel) ya da görsel
  poster: string;
  caption: string;
};

export type IgPhoneLabels = { follow: string; viewOnInstagram: string; reels: string; awards: string };

// Profildeki öne çıkanlar (akış ekranının üst şeridi)
const HIGHLIGHTS: { label: string; img: string }[] = [
  { label: "La Joya", img: "/la-joya/1.jpg" },
  { label: "Lagoon", img: "/lagoon-verde/5.jpg" },
  { label: "Perla", img: "/perla/1.jpg" },
  { label: "Mariachi", img: "/mariachi/1.jpg" },
];

const USERNAME = "dndcyprus";

export default function IgPhone({ post, labels }: { post: IgPost; labels: IgPhoneLabels }) {
  return (
    <div className="relative mx-auto w-[228px] sm:w-[240px] lg:w-[250px]">
      {/* Gövde */}
      <div className="relative aspect-[9/19.2] rounded-[2.5rem] bg-[#0d0d0f] p-[8px] ring-1 ring-black/10">
        {/* Yan tuşlar */}
        <span aria-hidden className="absolute -left-[3px] top-[22%] h-10 w-[3px] rounded-l bg-[#1b1b1f]" />
        <span aria-hidden className="absolute -left-[3px] top-[32%] h-10 w-[3px] rounded-l bg-[#1b1b1f]" />
        <span aria-hidden className="absolute -right-[3px] top-[27%] h-14 w-[3px] rounded-r bg-[#1b1b1f]" />

        {/* Ekran */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.05rem] bg-white">
          {/* Dinamik ada */}
          <span aria-hidden className="absolute left-1/2 top-2 z-30 h-[20px] w-[76px] -translate-x-1/2 rounded-full bg-black" />

          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={post.url}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              {post.kind === "reel" ? <ReelScreen post={post} labels={labels} /> : <FeedScreen post={post} labels={labels} />}
              {/* Ana ekran çubuğu */}
              <span
                aria-hidden
                className={`absolute bottom-1.5 left-1/2 z-30 h-[4px] w-[84px] -translate-x-1/2 rounded-full ${post.kind === "reel" ? "bg-white/80" : "bg-black/80"}`}
              />
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StatusBar({ light }: { light?: boolean }) {
  const c = light ? "text-white" : "text-black";
  return (
    <div className={`relative z-20 flex h-9 shrink-0 items-center justify-between px-6 pt-1 text-[11px] font-semibold ${c}`}>
      <span>9:41</span>
      <span className="flex items-center gap-1" aria-hidden>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="6" width="3" height="4" rx="0.6" /><rect x="4.3" y="4" width="3" height="6" rx="0.6" /><rect x="8.6" y="2" width="3" height="8" rx="0.6" /><rect x="12.9" y="0" width="3" height="10" rx="0.6" /></svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><path d="M7 2.2c1.9 0 3.6.7 4.9 1.9l1-1C11.3 1.6 9.2.8 7 .8S2.7 1.6 1.1 3.1l1 1C3.4 2.9 5.1 2.2 7 2.2Zm0 2.8c1.1 0 2.1.4 2.9 1.1l1-1C9.8 4.1 8.5 3.6 7 3.6S4.2 4.1 3.1 5.1l1 1C4.9 5.4 5.9 5 7 5Zm0 2.8c.4 0 .7.1 1 .4L7 9.2 6 8.2c.3-.3.6-.4 1-.4Z" /></svg>
        <svg width="24" height="11" viewBox="0 0 24 11" fill="none"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="currentColor" opacity="0.5" /><rect x="2" y="2" width="15" height="7" rx="1.5" fill="currentColor" /><rect x="21.5" y="3.5" width="1.5" height="4" rx="0.75" fill="currentColor" opacity="0.5" /></svg>
      </span>
    </div>
  );
}

function Avatar({ size = 30 }: { size?: number }) {
  return (
    <span
      className="inline-grid shrink-0 place-items-center rounded-full p-[2px]"
      style={{ width: size, height: size, background: "conic-gradient(from 210deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5, #feda75)" }}
    >
      <span className="grid h-full w-full place-items-center overflow-hidden rounded-full bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/DND.png" alt="" className="w-[78%] object-contain" />
      </span>
    </span>
  );
}

const Icon = {
  heart: (cls = "") => (
    <svg className={cls} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.4 4.5 7 4.5c2.1 0 3.5 1.2 5 3 1.5-1.8 2.9-3 5-3 3.6 0 5.6 3.5 4.3 6.8C19.5 15.9 12 20.5 12 20.5Z" /></svg>
  ),
  comment: (cls = "") => (
    <svg className={cls} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"><path d="M20.5 12a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.2-4.2A8.5 8.5 0 1 1 20.5 12Z" /></svg>
  ),
  send: (cls = "") => (
    <svg className={cls} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"><path d="M21.5 3 10.2 13.8M21.5 3l-6.8 18-4.5-7.2L3 9.4 21.5 3Z" /></svg>
  ),
  save: (cls = "") => (
    <svg className={cls} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"><path d="M18.5 21 12 15.8 5.5 21V3.5h13V21Z" /></svg>
  ),
  more: (cls = "") => (
    <svg className={cls} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" /></svg>
  ),
};

function ReelScreen({ post, labels }: { post: IgPost; labels: IgPhoneLabels }) {
  return (
    <div className="absolute inset-0 bg-black text-white">
      <video
        src={post.media}
        poster={post.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* okunabilirlik için üst/alt gölge */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 to-transparent" />
      <a href={post.url} target="_blank" rel="noopener noreferrer" aria-label={`${labels.viewOnInstagram}: ${post.caption}`} className="absolute inset-0" />

      <div className="pointer-events-none relative">
        <StatusBar light />
        <div className="px-4 text-[17px] font-semibold drop-shadow">{labels.reels}</div>
      </div>

      {/* Sağ ikonlar (sayı yok) */}
      <div className="pointer-events-none absolute bottom-24 right-3 flex flex-col items-center gap-5 drop-shadow" aria-hidden>
        {Icon.heart("h-[26px] w-[26px]")}
        {Icon.comment("h-[26px] w-[26px]")}
        {Icon.send("h-[25px] w-[25px]")}
        {Icon.more("h-5 w-5")}
      </div>

      {/* Alt: hesap + açıklama */}
      <div className="pointer-events-none absolute inset-x-0 bottom-7 px-3.5 pr-14 [&_a]:pointer-events-auto">
        <div className="flex items-center gap-2">
          <Avatar size={28} />
          <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-[13px] font-semibold hover:underline">
            {USERNAME}
          </a>
          <a
            href="https://www.instagram.com/dndcyprus/"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-md border border-white/70 px-2 py-0.5 text-[11px] font-semibold"
          >
            {labels.follow}
          </a>
        </div>
        <p className="mt-2 line-clamp-2 text-[12px] leading-snug text-white/95">{post.caption}</p>
        <a href={post.url} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-block text-[11px] font-medium text-white/75 hover:text-white">
          {labels.viewOnInstagram} →
        </a>
      </div>
    </div>
  );
}

function FeedScreen({ post, labels }: { post: IgPost; labels: IgPhoneLabels }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-white text-black">
      <StatusBar />
      {/* Uygulama başlığı */}
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-black/5 px-4">
        <span className="text-[19px] font-semibold tracking-tight" style={{ fontFamily: "'Segoe Script','Brush Script MT',cursive" }}>
          Instagram
        </span>
        <span className="flex items-center gap-4" aria-hidden>
          {Icon.heart("h-[22px] w-[22px]")}
          {Icon.send("h-[21px] w-[21px]")}
        </span>
      </div>

      {/* Öne çıkanlar şeridi */}
      <div className="flex shrink-0 gap-3 overflow-hidden border-b border-black/5 px-3 py-2.5" aria-hidden>
        {[...HIGHLIGHTS, { label: labels.awards, img: "/BEST-NEWCOMER.png" }].map((h) => (
          <span key={h.label} className="flex w-[42px] shrink-0 flex-col items-center gap-1 sm:w-[50px]">
            <span
              className="grid h-[42px] w-[42px] place-items-center rounded-full p-[2px] sm:h-[50px] sm:w-[50px]"
              style={{ background: "conic-gradient(from 210deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5, #feda75)" }}
            >
              <span className="block h-full w-full overflow-hidden rounded-full border-2 border-white bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={h.img} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </span>
            </span>
            <span className="w-full truncate text-center text-[10px] text-black/80">{h.label}</span>
          </span>
        ))}
      </div>

      {/* Gönderi başlığı */}
      <div className="flex shrink-0 items-center gap-2 px-3 py-2">
        <Avatar size={30} />
        <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-[13px] font-semibold hover:underline">
          {USERNAME}
        </a>
        <span className="ml-auto text-black/70" aria-hidden>{Icon.more()}</span>
      </div>

      {/* Görsel */}
      <a href={post.url} target="_blank" rel="noopener noreferrer" className="relative block aspect-square min-h-0 w-full shrink bg-black/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.media} alt={post.caption} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </a>

      {/* İkonlar (sayı yok) */}
      <div className="flex shrink-0 items-center gap-4 px-3 pt-2.5" aria-hidden>
        {Icon.heart("h-[24px] w-[24px]")}
        {Icon.comment("h-[24px] w-[24px]")}
        {Icon.send("h-[23px] w-[23px]")}
        <span className="ml-auto">{Icon.save("h-[23px] w-[23px]")}</span>
      </div>

      {/* Açıklama */}
      <div className="shrink-0 px-3 pb-6 pt-2 text-[12.5px] leading-snug">
        <p className="line-clamp-2 sm:line-clamp-3">
          <span className="font-semibold">{USERNAME}</span> {post.caption}
        </p>
        <a href={post.url} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-block text-[11.5px] font-medium text-black/50 hover:text-black/80">
          {labels.viewOnInstagram} →
        </a>
      </div>
    </div>
  );
}
