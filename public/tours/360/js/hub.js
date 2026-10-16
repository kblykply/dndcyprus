/* DND 360° — proje seçim ekranı
 * Yükleme ekranı, proje kartları ve tura geçiş.
 */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var PROJECTS = window.TOUR_PROJECTS || [];
  var I18N = window.TOUR_I18N;

  var lang = (function () {
    var q = new URLSearchParams(location.search).get('lang'); if (q === 'tr' || q === 'en') return q;
    try { var s = localStorage.getItem('lv360-lang'); if (s === 'tr' || s === 'en') return s; } catch (e) {}
    return 'tr';
  })();
  function t(k) { return (I18N[lang] && I18N[lang][k]) || I18N.tr[k] || k; }

  /* ── Harf parçacıkları (tur ile aynı dil) ─────────────── */
  function scatterVars(el, i) {
    var a = Math.random() * Math.PI * 2;
    var r = 0.34 + Math.random() * 0.66;
    el.style.setProperty('--dx', (Math.cos(a) * r).toFixed(3));
    el.style.setProperty('--dy', (Math.sin(a) * r).toFixed(3));
    el.style.setProperty('--rot', ((Math.random() * 2 - 1) * 110).toFixed(1) + 'deg');
    el.style.setProperty('--d', (i * 34 + Math.random() * 190).toFixed(0) + 'ms');
  }
  function splitChars(el) {
    if (!el || el.dataset.split === '1') return;
    var text = el.textContent;
    el.setAttribute('aria-label', text);
    el.textContent = '';
    var frag = document.createDocumentFragment();
    for (var i = 0; i < text.length; i++) {
      var s = document.createElement('span');
      s.className = 'ch';
      s.setAttribute('aria-hidden', 'true');
      s.textContent = text[i] === ' ' ? ' ' : text[i];
      scatterVars(s, i);
      frag.appendChild(s);
    }
    el.appendChild(frag);
    el.dataset.split = '1';
  }

  /* ── Yükleme ekranı ───────────────────────────────────── */
  var preloader = $('#preloader'), plFill = $('#plFill'), plPct = $('#plPct');
  var pTarget = 0, pShown = 0, pDone = false, creep = null;

  /* Marka animasyonu oturumda BİR KEZ oynar. Sonraki sayfalarda (tura geçiş,
     geri dönüş) beklemeye gerek yok — ekran gerçek yükleme kadar kalır.
     2600 ms, harflerin birleşmesinin tamamlandığı andır; sonrasında bekletmek
     "gereksiz gecikme" hissi veriyordu. */
  var splashSeen = (function () {
    try { return sessionStorage.getItem('lv360-splashed') === '1'; } catch (e) { return false; }
  })();
  var MIN_SPLASH = splashSeen ? 0 : 2600;
  try { sessionStorage.setItem('lv360-splashed', '1'); } catch (e) {}

  var splashStart = Date.now();
  function elapsed() { return Date.now() - splashStart; }

  /* İkinci ve sonraki açılışlarda perde kalır ama sadeleşir: yalnız dönen DND
     logosu ve marka yazısı görünür, yüzde/çubuk yoktur. Açılış metinleri bu
     perde kalktıktan SONRA sırayla gelir — perde olmadan hepsi birden
     hareket edince "patlama" gibi görünüyordu. */
  if (splashSeen) preloader.classList.add('is-minimal');

  function setProgress(v) { pTarget = Math.max(pTarget, Math.min(100, v)); }
  function paint() {
    var n = Math.round(pShown);
    plPct.textContent = n;
    plFill.style.width = n + '%';
  }
  (function tick() {
    if (pDone) return;
    var timeCap = Math.min(100, (elapsed() / MIN_SPLASH) * 100);
    var goal = Math.min(pTarget, timeCap);
    pShown += (goal - pShown) * 0.14;
    if (goal - pShown < 0.5) pShown = goal;
    paint();
    requestAnimationFrame(tick);
  })();

  function finishLoading() {
    if (pDone) return;
    var left = MIN_SPLASH - elapsed();
    if (left > 0) { setTimeout(finishLoading, left + 40); return; }
    pDone = true;
    clearInterval(creep);
    pTarget = pShown = 100;
    paint();
    setTimeout(function () {
      document.body.classList.remove('is-loading');
      preloader.classList.add('is-done');
      setTimeout(function () { preloader.hidden = true; }, 850);
    }, 150);
  }

  (function () {
    var top = $('#wmTop'), big = $('#wmBig');
    if (lang === 'en') { top.textContent = 'DND PROJECTS'; big.textContent = '360° VIEW'; }
    /* Marka animasyonu bu oturumda izlendiyse harfler hiç bölünmez: yazı
       olduğu gibi durur, birleşme efekti bir daha oynamaz. */
    if (splashSeen) { top.classList.add('is-in'); big.classList.add('is-in'); return; }
    splitChars(top); splitChars(big);
    setTimeout(function () { top.classList.add('is-in'); big.classList.add('is-in'); }, 140);
  })();

  setProgress(12);
  creep = setInterval(function () {
    if (pDone) return clearInterval(creep);
    if (pTarget < 90) setProgress(pTarget + 2);
  }, 420);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { setProgress(34); });
  } else { setProgress(34); }

  /* Kapak görselleri yüklendikçe ilerler; hepsi bitince ekran kalkar. */
  (function () {
    var covers = PROJECTS.map(function (p) { return p.cover; }).filter(Boolean);
    if (!covers.length) { setProgress(100); finishLoading(); return; }
    var done = 0;
    covers.forEach(function (src) {
      var im = new Image();
      im.onload = im.onerror = function () {
        done++;
        setProgress(34 + Math.round((done / covers.length) * 66));
        if (done === covers.length) finishLoading();
      };
      im.src = src;
    });
    /* Ağ yanıt vermezse ekran kilitlenmesin. */
    setTimeout(finishLoading, 10000);
  })();

  /* ── Proje kartları ───────────────────────────────────── */
  var grid = $('#hubGrid');

  function build() {
    grid.innerHTML = '';
    PROJECTS.forEach(function (p, i) {
      var hasTour = !!p.tour;
      var card = document.createElement(hasTour ? 'button' : 'a');
      card.className = 'pcard' + (hasTour ? '' : ' is-soon');
      card.style.setProperty('--i', i);
      if (!hasTour) {
        card.href = p.page;
        card.target = window.top !== window.self ? '_top' : '_blank';
        card.rel = 'noopener';
      }

      var media = document.createElement('div');
      media.className = 'pcard-media';
      if (p.cover) media.style.backgroundImage = 'url("' + p.cover + '")';

      var badge = document.createElement('span');
      badge.className = 'pcard-badge' + (hasTour ? '' : ' is-muted');
      badge.textContent = hasTour
        ? (p.sceneCount || '') + ' ' + t('factStops')
        : t('tourSoon');
      media.appendChild(badge);

      if (hasTour) {
        var play = document.createElement('span');
        play.className = 'pcard-play';
        play.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">' +
          '<path d="M8 5l11 7-11 7z" fill="currentColor"/></svg>';
        media.appendChild(play);
      }

      var body = document.createElement('div');
      body.className = 'pcard-body';

      var name = document.createElement('h2');
      name.className = 'pcard-name';
      name.textContent = p.name;

      var loc = document.createElement('p');
      loc.className = 'pcard-loc';
      loc.textContent = p.location[lang] || p.location.tr;

      var meta = document.createElement('p');
      meta.className = 'pcard-meta';
      var bits = [];
      if (p.status) bits.push(p.status[lang] || p.status.tr);
      if (p.delivery) bits.push(t('deliveryShort') + ' ' + p.delivery);
      meta.textContent = bits.join('  ·  ');

      body.appendChild(name);
      body.appendChild(loc);
      if (bits.length) body.appendChild(meta);

      card.appendChild(media);
      card.appendChild(body);

      if (hasTour) {
        card.addEventListener('click', function () { openTour(p); });
      }
      grid.appendChild(card);
    });

    /* Giriş animasyonu bitmeliydi; bitmediyse kartları görünür kıl. */
    clearTimeout(build._t);
    grid.classList.remove('is-ready');
    build._t = setTimeout(function () { grid.classList.add('is-ready'); }, 1400);
  }

  /* Kart tıklanınca doğrudan tura geçilir. Buraya çıkış animasyonu konmuyor:
     kullanıcı zaten karara varmış oluyor, araya giren efekt "yavaş açılıyor"
     hissi veriyordu. */
  var leaving = false;
  function openTour(p) {
    if (leaving) return;
    leaving = true;
    location.href = 'tour.html?p=' + encodeURIComponent(p.id) + (location.search.match(/[?&](lang|site)=[a-z]+/g) || []).join('').replace(/^\?/, '&');
  }

  /* Tarayıcı geri tuşu sayfayı önbellekten (bfcache) eski DOM'uyla geri
     getiriyor; kalan geçiş durumu temizlenmezse ızgara bozuk görünüyordu. */
  window.addEventListener('pageshow', function () {
    leaving = false;
    document.body.classList.remove('is-leaving');
    $$('.pcard').forEach(function (el) {
      el.classList.remove('blast-part', 'is-chosen');
      el.style.removeProperty('--dx');
      el.style.removeProperty('--dy');
      el.style.removeProperty('--rot');
      el.style.removeProperty('--d');
    });
    grid.classList.add('is-ready');
  });

  /* ── Dil ──────────────────────────────────────────────── */
  function applyLang() {
    document.documentElement.lang = lang;
    $('#hubLang').textContent = lang === 'tr' ? 'EN' : 'TR';
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    build();
    try { localStorage.setItem('lv360-lang', lang); } catch (e) {}
  }
  $('#hubLang').addEventListener('click', function () {
    lang = lang === 'tr' ? 'en' : 'tr';
    applyLang();
  });

  applyLang();
})();
