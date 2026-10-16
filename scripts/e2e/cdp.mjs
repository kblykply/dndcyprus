// Küçük CDP yardımcı katmanı: tek Chrome, tek sekme; sayfa açma, değerlendirme, ekran görüntüsü, olay toplama.
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";

export async function launch({ profileDir, port = 9500 + Math.floor(Math.random() * 300) }) {
  mkdirSync(profileDir, { recursive: true });
  const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const chrome = spawn(CHROME, [
    "--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profileDir}`, "--no-first-run",
    "--hide-scrollbars", "--mute-audio", "--autoplay-policy=no-user-gesture-required", "about:blank",
  ], { stdio: "ignore" });
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let target;
  for (let i = 0; i < 60 && !target; i++) { await sleep(200); try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page"); } catch {} }
  if (!target) throw new Error("chrome başlamadı");
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.addEventListener("open", r); ws.addEventListener("error", j); });
  let id = 0; const pend = new Map(); const listeners = new Set();
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
    if (m.method) for (const l of listeners) l(m);
  });
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (expression, timeout = 120000) => {
    const res = await Promise.race([send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }), sleep(timeout).then(() => ({ timeout: true }))]);
    if (res.timeout) return { __error: "evaluate timeout" };
    if (res.result?.exceptionDetails) return { __error: res.result.exceptionDetails.exception?.description || res.result.exceptionDetails.text };
    return res.result?.result?.value;
  };
  await send("Page.enable"); await send("Runtime.enable"); await send("Network.enable"); await send("Log.enable");
  return { send, ev, sleep, on: (fn) => { listeners.add(fn); return () => listeners.delete(fn); }, close: () => { try { ws.close(); } catch {} chrome.kill(); } };
}

export async function open(b, url, { width, height, mobile = width < 768, waitMs = 2500 } = {}) {
  await b.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile });
  await b.send("Emulation.setTouchEmulationEnabled", { enabled: mobile, maxTouchPoints: mobile ? 5 : 0 });
  const loaded = new Promise((r) => { const off = b.on((m) => { if (m.method === "Page.loadEventFired") { off(); r(); } }); setTimeout(r, 30000); });
  const nav = await b.send("Page.navigate", { url });
  await loaded;
  await b.sleep(waitMs);
  return nav.result;
}
