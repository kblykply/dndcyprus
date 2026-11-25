// lib/tl-popup.ts — TL ödeme modeli penceresinin ortak sabitleri (sunucu yerleşimi ve istemci bileşeni birlikte kullanır;
// "use client" modülünden düz değer dışa aktarılamadığı için ayrı dosyada).
// Oturum başına bir kez; kampanya değişirse anahtarın sürümü artırılır
export const TL_POPUP_DISMISS_KEY = "dnd_tl_payment_popup_v1";
export const TL_POPUP_ID = "tl-odeme-popup";
/** Sayfa çizilmeden önce çalışır: bu oturumda kapatıldıysa <html>'e "tl-pop-off" ekler, pencere hiç görünmez */
export const TL_POPUP_PRESCRIPT = `try{if(sessionStorage.getItem(${JSON.stringify(TL_POPUP_DISMISS_KEY)}))document.documentElement.classList.add("tl-pop-off")}catch(e){}`;
