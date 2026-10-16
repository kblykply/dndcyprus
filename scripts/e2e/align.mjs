// Bölüm hizalaması ve dikey ritim: her bölümde görünen içeriğin sol/sağ kenarı ve bölümler arası boşluk
import { writeFileSync } from "node:fs";
import { launch, open } from "./cdp.mjs";
const [,, base, w, h, out, ...paths] = process.argv;
const b = await launch({ profileDir: `${out}/.prof-align-${w}` });
const all = {};
for (const p of paths) {
  await open(b, base + p, { width: +w, height: +h, waitMs: 2000 });
  const r = await b.ev(`(async()=>{
    document.documentElement.style.scrollBehavior="auto";
    for(let y=0;y<document.documentElement.scrollHeight;y+=600){scrollTo(0,y); await new Promise(r=>setTimeout(r,90));}
    document.querySelectorAll(".rv").forEach(e=>e.classList.add("in")); await new Promise(r=>setTimeout(r,900)); scrollTo(0,0);
    const vis=(e)=>{const r=e.getBoundingClientRect(); const cs=getComputedStyle(e); return r.width>4&&r.height>4&&cs.visibility!=="hidden"&&+cs.opacity>0.05;};
    const secs=[...document.querySelectorAll("main > section, main > div > section, main > div.az-section, main section.az-section")].filter((s,i,a)=>a.indexOf(s)===i && vis(s));
    const rows=[];
    for (const s of secs) {
      const r=s.getBoundingClientRect();
      // görünen içerik: metin, görsel, kart kutuları (absolute süsler ve bölüm dışına taşan karuseller hariç)
      const items=[...s.querySelectorAll("h1,h2,h3,p,img,video,iframe,a.az-btn,.az-card,.az-tile,.az-pc,.az-person,.card,figure,details,li,button")].filter(e=>{ if(!vis(e)) return false; const cs=getComputedStyle(e); if(cs.position==="fixed") return false; let p=e; while(p&&p!==s){ const c=getComputedStyle(p); if(c.position==="absolute"&&p!==e&&!p.closest(".az-car")) {} if(p.matches&&p.matches(".az-car,.az-wheel,.az-cdots,.frame,.stick,.stage,.mr-band")) return false; p=p.parentElement;} return true; });
      if(!items.length) continue;
      const lefts=items.map(e=>e.getBoundingClientRect().left), rights=items.map(e=>e.getBoundingClientRect().right), tops=items.map(e=>e.getBoundingClientRect().top+scrollY), bots=items.map(e=>e.getBoundingClientRect().bottom+scrollY);
      const head=s.querySelector(".az-kicker, h2, h1");
      rows.push({ sec:(s.id?"#"+s.id:"")+"."+(s.getAttribute("class")||"").split(" ").slice(0,3).join("."), left:Math.round(Math.min(...lefts)), right:Math.round(Math.max(...rights)), headLeft: head&&vis(head)? Math.round(head.getBoundingClientRect().left):null, top:Math.round(Math.min(...tops)), bottom:Math.round(Math.max(...bots)) });
    }
    for(let i=1;i<rows.length;i++) rows[i].gapAbove = rows[i].top - rows[i-1].bottom;
    return {vw:innerWidth, rows};
  })()`);
  all[p] = r;
  console.log("\\n== " + p + " @" + w);
  for (const x of r.rows || []) console.log(String(x.gapAbove ?? "").padStart(5), " L", String(x.left).padStart(4), " R", String(x.right).padStart(5), " head", String(x.headLeft ?? "-").padStart(4), " ", x.sec);
}
writeFileSync(`${out}/align-${w}.json`, JSON.stringify(all, null, 1));
b.close(); process.exit(0);
