"use client";

import { useEffect, useRef, useState } from "react";

type Item = { year: string; tag: string; p: string; img: string };

// Kaydırdıkça ekranın ortasına gelen madde etkinleşir; soldaki büyük yıl ve görsel ona geçer.
// İlk üç kilometre taşı ABD'de (Boston), sonrakiler Kıbrıs'ta (İskele).
export default function StoryTimeline({ items, places }: { items: Item[]; places: { from: [string, string]; to: [string, string] } }) {
  const [on, setOn] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setOn(Number((e.target as HTMLElement).dataset.i)); }),
      { rootMargin: "-42% 0px -52% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [items.length]);

  const place = (i: number) => (i < 3 ? places.from : places.to);
  const pad = (n: number) => String(n).padStart(2, "0");
  const cur = items[on];

  return (
    <div className="mr-story">
      <div className="side" aria-hidden>
        <div className="yr"><span key={on}>{cur.year}</span></div>
        <div className="where">
          <span className="mr-mono"><b>{place(on)[0]}</b> · {place(on)[1]}</span>
          <span className="mr-mono">{pad(on + 1)} / {pad(items.length)}</span>
        </div>
        <figure className="yf">
          {items.map((it, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={it.img + i} src={it.img} alt="" loading="lazy" className={i === on ? "on" : undefined} />
          ))}
        </figure>
      </div>
      <ol>
        {items.map((it, i) => (
          <li key={it.tag + it.year + i} ref={(el) => { refs.current[i] = el; }} data-i={i} className={i === on ? "on" : undefined}>
            <span className="mr-mono">{pad(i + 1)}</span>
            <div>
              <div className="head">
                <small>{it.year} · {it.tag} · {place(i)[0]}</small>
                <span className="yy" aria-hidden>{it.year}</span>
              </div>
              <h3>{it.p}</h3>
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.img} alt="" loading="lazy" />
              </figure>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
