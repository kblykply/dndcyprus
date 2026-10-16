"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { COUNTRIES, COUNTRY_HEAD, COUNTRY_UI, DEFAULT_DIAL, type Country } from "@/lib/azure/countries";
import type { Locale } from "@/lib/azure/site";
import "./phone-field.css";

/**
 * Numara "+" ya da "00" ile tam yazıldıysa olduğu gibi; değilse seçilen ülke kodu eklenir, baştaki 0 atılır
 * ("0533 123 45 67" + "+90" → "+90 533 123 45 67"). Kod boşsa ("Diğer ülke") numara olduğu gibi döner.
 */
export function joinPhone(code: string, raw: string) {
  const s = raw.trim();
  if (!s) return "";
  if (/^(\+|00)/.test(s)) return s.replace(/^00\s*/, "+").replace(/^\+\s+/, "+");
  return code ? `${code} ${s.replace(/^0+/, "")}` : s;
}

type Props = { id: string; locale: Locale; invalid?: boolean };

const HEAD = COUNTRIES.slice(0, COUNTRY_HEAD);
const OTHER = COUNTRIES[COUNTRIES.length - 1];
/** arama için: Türkçe İ/ı ve aksanlar yok sayılır */
const norm = (t: string, locale: Locale) =>
  t.replace(/[İIı]/g, "i").toLocaleLowerCase(locale).normalize("NFD").replace(/[̀-ͯ]/g, "");

/**
 * Telefon alanı: solda bayraklı ülke kodu düğmesi, sağda numara (La Joya sitesindeki seçicinin Azure karşılığı).
 * Kapalıyken yalnız "🇹🇷 +90"; açılınca üstte "Ülke ara" kutusu, önce sık kullanılanlar sonra A–Z tüm ülkeler (adlar sayfa dilinde).
 * Ad ya da kod yazınca süzülür ("alm" → Almanya, "49" → +49; Türkçe harf / aksan farkı gözetilmez). Ok tuşları + Enter seçer,
 * Escape kapatır; düğmeye odaklıyken harfe basmak listeyi o harfle açar. Seçilen kod gizli "cc" alanıyla forma gider.
 */
export default function PhoneField({ id, locale, invalid }: Props) {
  const ui = COUNTRY_UI[locale];
  const lid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [code, setCode] = useState(DEFAULT_DIAL[locale]);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [act, setAct] = useState(-1);
  const wrap = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const center = useRef(false);

  const cur = COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0];
  // arama boşken liste: sık kullanılanlar, A–Z tüm ülkeler (sayfa dilinde sıralı), en sonda "Diğer ülke"
  const az = useMemo(() => {
    const col = new Intl.Collator(locale);
    return COUNTRIES.slice(0, -1).sort((a, b) => col.compare(a.name[locale], b.name[locale]));
  }, [locale]);
  const full = useMemo(() => [...HEAD, ...az, OTHER], [az]);
  const selIndex = Math.max(0, full.findIndex((c) => c.code === code));

  const query = norm(q.trim(), locale);
  const shown: Country[] = useMemo(() => {
    if (!query) return full;
    const d = query.replace(/\D/g, "");
    const starts: Country[] = [], has: Country[] = [];
    for (const c of az) {
      const n = norm(c.name[locale], locale);
      if (n.startsWith(query) || n.split(/[\s/()-]+/).some((w) => w.startsWith(query))) starts.push(c);
      else if ((query.length > 1 && n.includes(query)) || (d && c.code.replace(/\D/g, "").startsWith(d))) has.push(c);   // tek harfte yalnız o harfle başlayanlar
    }
    return [...starts, ...has];
  }, [query, az, full, locale]);

  const openList = (seed = "") => {
    if (open) return;
    setQ(seed);
    center.current = !seed;
    setAct(seed ? 0 : selIndex);
    setOpen(true);
  };
  const close = (back: boolean) => {
    setOpen(false);
    if (back) btn.current?.focus({ preventScroll: true });
  };
  const pick = (c?: Country) => {
    if (!c) return;
    setCode(c.code);
    close(true);
  };

  // açılınca arama kutusuna odak; liste kartın (overflow: hidden) ve ekranın içinde kalsın, sığmazsa daralır
  useLayoutEffect(() => {
    const p = pop.current, w = wrap.current;
    if (!open || !p || !w) return;
    p.style.left = ""; p.style.width = "";
    const host = (w.closest(".card") as HTMLElement | null)?.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const minL = Math.max(12, host ? host.left + 8 : 12), maxR = Math.min(vw - 12, host ? host.right - 8 : vw - 12);
    const r = p.getBoundingClientRect(), wr = w.getBoundingClientRect();
    const width = Math.min(r.width, maxR - minL);
    let left = r.left;
    if (left + width > maxR) left = maxR - width;
    if (left < minL) left = minL;
    if (width < r.width) p.style.width = `${width}px`;
    if (left !== r.left) p.style.left = `${left - wr.left}px`;
    search.current?.focus({ preventScroll: true });
  }, [open]);

  // etkin satır görünür kalsın (açılışta seçili ülke listenin ortasında)
  useEffect(() => {
    const l = list.current;
    if (!open || !l || act < 0) return;
    const li = l.querySelector<HTMLElement>(`#${lid}-o-${act}`);
    if (!li) return;
    if (center.current) { l.scrollTop = li.offsetTop - l.clientHeight / 2 + li.offsetHeight / 2; center.current = false; }
    else if (li.offsetTop < l.scrollTop) l.scrollTop = li.offsetTop;
    else if (li.offsetTop + li.offsetHeight > l.scrollTop + l.clientHeight) l.scrollTop = li.offsetTop + li.offsetHeight - l.clientHeight;
  }, [open, act, shown, lid]);

  // dışarı dokununca kapanır
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const onBtnKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); openList(); }
    else if (e.key.length === 1 && /\S/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); openList(e.key); }
  };
  const onSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setAct((k) => Math.min(shown.length - 1, k + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setAct((k) => Math.max(0, k - 1)); }
    else if (e.key === "Enter") { e.preventDefault(); pick(shown[act]); }
    else if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(true); }
    else if (e.key === "Tab") close(false);
  };

  const item = (c: Country, k: number) => (
    <li key={`${k}-${c.code}`} id={`${lid}-o-${k}`} role="option" aria-selected={c.code === code} className={k === act ? "act" : undefined}
      onClick={() => pick(c)} onPointerMove={() => { if (k !== act) setAct(k); }}>
      <span className="az-cc-f" aria-hidden>{c.flag}</span><span className="az-cc-n">{c.name[locale]}</span><span className="az-cc-k">{c.code}</span>
    </li>
  );

  return (
    <div className="az-tel">
      <div ref={wrap} className={`az-cc${open ? " open" : ""}`}>
        <input type="hidden" name="cc" value={code} />
        <button ref={btn} type="button" className="az-cc-btn" aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? `${lid}-list` : undefined}
          aria-label={`${ui.code}: ${cur.name[locale]}${cur.code ? ` ${cur.code}` : ""}`}
          onClick={() => (open ? close(true) : openList())} onKeyDown={onBtnKey}>
          <span className="az-cc-f" aria-hidden>{cur.flag}</span><span className="az-cc-c">{cur.code || "+"}</span>
        </button>
        {open && (
          <div ref={pop} className="az-cc-pop">
            <input ref={search} type="text" role="combobox" aria-expanded="true" aria-controls={`${lid}-list`} aria-autocomplete="list" aria-label={ui.search}
              aria-activedescendant={act > -1 && shown[act] ? `${lid}-o-${act}` : undefined}
              placeholder={ui.search} value={q} autoComplete="off" autoCapitalize="off" spellCheck={false} enterKeyHint="done"
              onChange={(e) => { const v = e.target.value; setQ(v); if (!v.trim()) center.current = true; setAct(v.trim() ? 0 : selIndex); }}
              onKeyDown={onSearchKey} />
            {/* liste satırına basınca arama kutusu odağını kaybetmesin */}
            <ul ref={list} id={`${lid}-list`} className="az-cc-list" role="listbox" aria-label={ui.code} onMouseDown={(e) => e.preventDefault()}>
              {query
                ? shown.map(item)
                : <>
                    {HEAD.map(item)}
                    <li className="az-cc-sep" role="presentation">{ui.all}</li>
                    {az.map((c, k) => item(c, k + COUNTRY_HEAD))}
                    {item(OTHER, COUNTRY_HEAD + az.length)}
                  </>}
            </ul>
            {shown.length === 0 && <p className="az-cc-none">{ui.none}</p>}
          </div>
        )}
      </div>
      <input id={id} name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder={code ? undefined : "+"} aria-invalid={invalid || undefined} />
    </div>
  );
}
