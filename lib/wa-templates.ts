// lib/wa-templates.ts
// Talep ayrıntısındaki hazır WhatsApp mesajları (26.11.2026). Bağlantı WhatsApp'ı mesaj yazılmış olarak açar; gönderen yine
// satış ekibidir (otomatik gönderim yok). Türkçe + İngilizce; Türkiye/KKTC dışı numarada İngilizce önce gelir.
// Metinlerde verilmemiş vaat (fiyat, indirim, ücretsiz konaklama vb.) yok: yalnız dönüş, ulaşamama, takip ve ziyaret daveti.

export type WaLang = "tr" | "en";
export type WaTemplate = { key: string; label: string; text: string };

const realName = (name: string) => (/talebi|^lead\b|^meta\b|^test\b/i.test(name.trim()) ? "" : name.trim());
const first = (name: string) => {
  const w = realName(name).split(/\s+/)[0] ?? "";
  return w.length > 1 ? w : "";
};
/** Türkçede cinsiyet bilinmediği için ad soyad birlikte: "Merhaba Ayşe Yılmaz," */
const full = (name: string) => realName(name).split(/\s+/).slice(0, 3).join(" ");

/** +90 (Türkiye, KKTC) Türkçe; diğer ülke kodları İngilizce */
export function guessWaLang(phone: string | null | undefined): WaLang {
  let d = String(phone ?? "").replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (!d) return "tr";
  if (d.startsWith("90") || d.startsWith("0") || (d.length === 10 && d.startsWith("5"))) return "tr";
  return "en";
}

export function waTemplates(lead: { name: string; project?: string | null }, lang: WaLang): WaTemplate[] {
  const n = first(lead.name);
  const p = (lead.project || "").trim();
  if (lang === "en") {
    const hi = n ? `Hi ${n},` : "Hello,";
    const about = p ? `about ${p}` : "about our projects";
    return [
      { key: "ilk", label: "First reply", text: `${hi} this is DND Cyprus. Thank you for your enquiry ${about}. I'd be happy to send you the price list and floor plans. When would be a good time for a quick call?` },
      { key: "ulasilamadi", label: "Couldn't reach", text: `${hi} we tried to call you ${about} but couldn't get through. What time suits you best? You can also simply reply here. DND Cyprus` },
      { key: "takip", label: "Follow-up", text: `${hi} just checking in after our chat. Do you have any questions ${about}? I can share the latest prices and payment options whenever you like. DND Cyprus` },
      { key: "ziyaret", label: "Visit invite", text: `${hi} if you'd like to see ${p || "our projects"} in person, we'd be delighted to welcome you in North Cyprus and show you around. Which dates would work for you? DND Cyprus` },
    ];
  }
  const fn = full(lead.name);
  const hi = fn.length > 1 ? `Merhaba ${fn},` : "Merhaba,";
  const about = p ? `${p} için` : "projelerimiz için";
  return [
    { key: "ilk", label: "İlk dönüş", text: `${hi} DND Cyprus'tan yazıyorum. ${about} bıraktığınız talep bize ulaştı, teşekkür ederiz. Fiyat listesi ve kat planlarını buradan iletebilirim. Kısa bir görüşme için size hangi saat uygun olur?` },
    { key: "ulasilamadi", label: "Ulaşamadık", text: `${hi} ${about} sizi aradık ancak ulaşamadık. Size hangi saat uygun olur? Dilerseniz buradan da yazabilirsiniz. DND Cyprus` },
    { key: "takip", label: "Takip", text: `${hi} görüşmemizden sonra aklınıza takılan bir soru oldu mu? ${about} güncel fiyat ve ödeme seçeneklerini dilediğiniz zaman paylaşabilirim. DND Cyprus` },
    { key: "ziyaret", label: "Ziyaret daveti", text: `${hi} ${p ? `${p} projesini` : "projelerimizi"} yerinde görmek isterseniz sizi Kıbrıs'ta ağırlamaktan ve gezdirmekten mutluluk duyarız. Hangi tarihler size uygun? DND Cyprus` },
  ];
}

export const waLink = (number: string, text: string) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
