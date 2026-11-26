// lib/page-zoom.ts
// Büyük ekran ölçeği (26.11.2026, app/globals.css): site 1920 pikselden büyük ekranda html'e CSS `zoom` verir.
// Ölçek açıkken tarayıcı API'leri iki ayrı birim konuşur (Chromium ve WebKit'te ölçüldü):
//   • büyütülmüş (ekran) pikseli: getBoundingClientRect, innerWidth/innerHeight, window.scrollY/scrollTo, clientX/Y,
//     document.documentElement.scrollHeight
//   • sayfa (CSS) pikseli: offsetTop/offsetHeight, clientWidth, scrollWidth, öğe scrollLeft/scrollTop, style'a yazılan px
// İkisini karıştıran kod ekran değerini pageZoom()'a böler (ya da sayfa değerini çarpar). Ölçek yoksa 1 döner.
export function pageZoom() {
  if (typeof window === "undefined") return 1;
  const z = parseFloat(getComputedStyle(document.documentElement).zoom || "1");
  return Number.isFinite(z) && z > 0 ? z : 1;
}
