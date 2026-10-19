// YouTube IFrame API yardımcıları: video vitrini (VideoShowcase) ve Neden DND kartındaki açılış videosu (WhyVideo) ortak kullanır.
export const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

export type YTPlayer = { playVideo(): void; pauseVideo(): void; mute(): void; unMute(): void; destroy(): void; unloadModule?(name: string): void };
export type YTGlobal = {
  Player: new (el: HTMLElement, o: {
    videoId: string; width: string; height: string; playerVars: Record<string, unknown>;
    events: { onReady?: (e: { target: YTPlayer }) => void; onStateChange?: (e: { data: number }) => void };
  }) => YTPlayer;
};
type WinYT = Window & { YT?: YTGlobal; onYouTubeIframeAPIReady?: () => void };

let ytApi: Promise<YTGlobal | null> | null = null;
export function loadYouTube(): Promise<YTGlobal | null> {
  const w = window as WinYT;
  if (w.YT?.Player) return Promise.resolve(w.YT);
  if (!ytApi) {
    ytApi = new Promise((resolve) => {
      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      const prev = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => { prev?.(); resolve(w.YT ?? null); };
      const until = Date.now() + 10000;
      const check = () => (w.YT?.Player ? resolve(w.YT) : Date.now() < until ? setTimeout(check, 150) : resolve(null));
      check();
    });
  }
  return ytApi;
}

// Tarayıcı dili Türkçe olunca YouTube otomatik altyazıyı ("[müzik]") açıyor; sessiz vitrin videosunda kapalı kalsın
export const noCaptions = (p: YTPlayer) => { try { p.unloadModule?.("captions"); p.unloadModule?.("cc"); } catch {} };
