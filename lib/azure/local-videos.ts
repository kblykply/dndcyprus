// Sessiz, kontrolsüz arka plan YouTube videolarının sitede barındırılan kopyaları (LazyYouTube kullanır).
// DND Cyprus kanalındaki videoların YouTube'daki en iyi H.264 720p akışı (Mariachi 960×720, kanaldaki en yüksek),
// yeniden kodlanmadan faststart MP4'e paketlendi, ses izi yok. Kutular telefonda ~900, bilgisayarda ~1200–1430 px
// genişlikte; YouTube bu boylarda da 720p seçiyordu. Kapak: videonun YouTube küçük resmi (maxres; yoksa hq).
// YouTube oynatıcısı (telefonda ~1 MB JS), üçüncü taraf çerezleri ve arayüzü gizlemek için 3,8 sn kapak beklemesi kalktı.
export const LOCAL_VIDEO: Record<string, { src: string; poster: string }> = {
  bKNPhMFNzGY: { src: "/videos/lagoon-verde-tanitim.mp4", poster: "/videos/lagoon-verde-tanitim.jpg" },
  uNnqGH_QFVw: { src: "/videos/perla-tanitim.mp4", poster: "/videos/perla-tanitim.jpg" },
  rhNxT0eZw_0: { src: "/videos/perla-ii-tanitim.mp4", poster: "/videos/perla-ii-tanitim.jpg" },
  hMbzVAJMzXo: { src: "/videos/la-joya-tanitim.mp4", poster: "/videos/la-joya-tanitim.jpg" },
  AobeR8p2Aq4: { src: "/videos/mariachi-tanitim.mp4", poster: "/videos/mariachi-tanitim.jpg" },
  fpGuMq5qIEk: { src: "/videos/gecitkale-tanitim.mp4", poster: "/videos/gecitkale-tanitim.jpg" },
};
