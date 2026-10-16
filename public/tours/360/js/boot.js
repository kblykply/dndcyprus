/* Tur önyükleyici
 * ?p=<proje> parametresine göre o projenin sahne verisini ve meta dosyasını
 * sırayla yükler, sonra turu başlatır. Bilinmeyen ya da turu olmayan proje
 * istenirse seçim ekranına döner.
 */
(function () {
  'use strict';

  var VER = (document.currentScript && document.currentScript.src.split('?v=')[1]) || '1';

  /* ⚠️ SESSIZ VARSAYILAN KALDIRILDI (brief-2, 2026-08-18): p yokken
     'lagoon-verde' varsayiliyordu — sorgusu kirpilmis bir Perla linki
     ziyaretciyi YANLIS projeye (Lagoon Verde) sokuyordu. p yoksa ya da
     bilinmiyorsa proje secim ekranina donulur; site slug'lari da
     (la-joya-perla gibi) alias tablosuyla dogru ide cevrilir. */
  var ALIAS = {
    'la-joya-perla': 'perla', 'la-joya-perla-ii': 'perla-ii',
    'mariachi-beach-club': 'mariachi'
  };
  var id = new URLSearchParams(location.search).get('p') || '';
  id = ALIAS[id] || id;
  var list = window.TOUR_PROJECTS || [];
  var project = list.filter(function (p) { return p.id === id; })[0];

  if (!project || !project.tour) {
    location.replace('index.html');
    return;
  }

  window.TOUR_PROJECT = project;
  /* Karolar: yerelde canlı siteden, kurulumda proje klasöründen okunur. */
  // Siteye gömülü kullanım: ?site=<dil> verilirse proje sayfası bağlantısı o dilin sayfasına gider
  var site = new URLSearchParams(location.search).get('site');
  if (project.page && /^(tr|en|de|ru|pl)$/.test(site || '')) project.page = project.page.replace(/^\/tr\//, '/' + site + '/');
  window.TOUR_TILE_BASE = project.tileBase;

  document.title = project.name + ' — 360° Sanal Tur | DND Cyprus';

  loadSequential([
    'js/data-' + id + '.js',
    'js/scenes-' + id + '.js',
    'js/tour.js'
  ]);

  function loadSequential(srcs) {
    var i = 0;
    (function next() {
      if (i >= srcs.length) return;
      var s = document.createElement('script');
      s.src = srcs[i++] + '?v=' + VER;
      s.onload = next;
      s.onerror = function () {
        console.error('Tur dosyası yüklenemedi:', s.src);
        location.replace('index.html');
      };
      document.head.appendChild(s);
    })();
  }
})();
