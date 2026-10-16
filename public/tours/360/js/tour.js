/* ═══════════════════════════════════════════════════════════
   Lagoon Verde — 360° Sanal Tur
   Motor: Marzipano (küp haritalı panoramalar)
   Kabuk: DND Cyprus kurumsal arayüzü
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* Karo (tile) kökü. Tur dndcyprus.com'a kurulduğunda index.html içinde
     window.TOUR_TILE_BASE = 'tiles' verilerek yerel karolar kullanılır. */
  var TILE_BASE = window.TOUR_TILE_BASE ||
    '/tours/lagoon-verde/app-files/tiles';

  var META = window.TOUR_META;
  var I18N = window.TOUR_I18N;
  var DATA = window.APP_DATA;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ── Dil ─────────────────────────────────────────────── */
  var lang = (function () {
    var q = new URLSearchParams(location.search).get('lang'); if (q === 'tr' || q === 'en') return q;
    try { var s = localStorage.getItem('lv360-lang'); if (s === 'tr' || s === 'en') return s; } catch (e) {}
    return (navigator.language || '').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'tr';
  })();

  function t(key) { return (I18N[lang] && I18N[lang][key]) || I18N.tr[key] || key; }
  function sceneName(id) {
    var m = META.scenes[id];
    if (m) return m[lang] || m.tr;
    var raw = DATA.scenes.filter(function (s) { return s.id === id; })[0];
    return raw ? raw.name : id;
  }
  function sceneDesc(id) {
    var m = META.scenes[id];
    return m && m.desc ? (m.desc[lang] || m.desc.tr) : '';
  }

  /* Sahne → grup/altgrup dizini */
  var groupOf = {};
  META.groups.forEach(function (g) {
    g.sub.forEach(function (sub) {
      sub.scenes.forEach(function (id) { groupOf[id] = { group: g, sub: sub }; });
    });
  });
  /* Menüde tanımlanmayan sahne kalmasın diye güvenlik ağı */
  var orderedIds = [];
  META.groups.forEach(function (g) {
    g.sub.forEach(function (sub) {
      sub.scenes.forEach(function (id) { if (orderedIds.indexOf(id) < 0) orderedIds.push(id); });
    });
  });
  DATA.scenes.forEach(function (s) {
    if (orderedIds.indexOf(s.id) < 0) {
      orderedIds.push(s.id);
      var g = META.groups[META.groups.length - 1];
      var sub = g.sub[g.sub.length - 1];
      sub.scenes.push(s.id);
      groupOf[s.id] = { group: g, sub: sub };
    }
  });

  function groupLabel(id) {
    var g = groupOf[id];
    if (!g) return '';
    var main = g.group[lang] || g.group.tr;
    var sub = g.sub[lang] || g.sub.tr;
    return sub && sub !== main ? main + ' · ' + sub : main;
  }

  /* ── Küçük resim: preview.jpg dikey küp şeridinden yüz seçimi ──
     Marzipano şerit sırası: f, b, u, d, l, r  → konum = index * %20 */
  var flatById = {};
  (META.flatScenes || []).forEach(function (f) { flatById[f.id] = f; });

  /* Bir sahnenin karoları düzeltilip yerele alındıysa o sahne için kaynak
     değişir (bkz. scenes-<proje>.js → tileOverrides). */
  function tileRoot(id) {
    var ov = META.tileOverrides;
    return (ov && ov[id]) || (TILE_BASE + '/' + id);
  }
  function previewUrl(id) { return tileRoot(id) + '/preview.jpg'; }
  function faceOffset(sceneData) {
    var yaw = (sceneData && sceneData.initialViewParameters && sceneData.initialViewParameters.yaw) || 0;
    var deg = yaw * 180 / Math.PI;
    while (deg > 180) deg -= 360;
    while (deg < -180) deg += 360;
    var idx;
    if (deg > -45 && deg <= 45) idx = 0;        // front
    else if (deg > 45 && deg <= 135) idx = 5;   // right
    else if (deg > 135 || deg <= -135) idx = 1; // back
    else idx = 4;                               // left
    return idx * 20;
  }
  /* Menü küçük resimleri ancak menü ilk kez açıldığında yüklenir; hepsini
     baştan çekmek (27 önizleme) turun açılışını gözle görülür kastırıyordu. */
  function lazyThumb(el, id) {
    el.dataset.thumb = id;
  }
  function realiseThumbs(root) {
    $$('[data-thumb]', root).forEach(function (el) {
      thumbStyle(el, el.dataset.thumb);
      delete el.dataset.thumb;
    });
  }

  function thumbStyle(el, id) {
    if (flatById[id]) {
      /* Düz sahnenin önizlemesi görselin kendisidir; küp şeridi yoktur. */
      el.style.backgroundImage = 'url("' + flatById[id].image + '")';
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      return;
    }
    var raw = rawById[id];
    el.style.backgroundImage = 'url("' + previewUrl(id) + '")';
    el.style.backgroundPosition = '0 ' + faceOffset(raw) + '%';
  }

  var rawById = {};
  DATA.scenes.forEach(function (s) { rawById[s.id] = s; });

  /* ── Marzipano kurulumu ──────────────────────────────── */
  var panoEl = $('#pano');
  var viewer = new Marzipano.Viewer(panoEl, {
    controls: { mouseViewMode: 'drag' },
    stage: { preserveDrawingBuffer: false }
  });

  var autorotate = Marzipano.autorotate({
    yawSpeed: 0.028,
    targetPitch: 0,
    targetFov: Math.PI / 2
  });
  var autorotateOn = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var scenes = {};
  DATA.scenes.forEach(function (d) {
    var source = Marzipano.ImageUrlSource.fromString(
      tileRoot(d.id) + '/{z}/{f}/{y}/{x}.jpg',
      { cubeMapPreviewUrl: previewUrl(d.id) }
    );
    var geometry = new Marzipano.CubeGeometry(d.levels);
    var limiter = Marzipano.RectilinearView.limit.traditional(
      d.faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180
    );
    var view = new Marzipano.RectilinearView(d.initialViewParameters, limiter);
    var scene = viewer.createScene({
      source: source, geometry: geometry, view: view, pinFirstLevel: true
    });

    (d.linkHotspots || []).forEach(function (hs) {
      scene.hotspotContainer().createHotspot(linkHotspotEl(hs), { yaw: hs.yaw, pitch: hs.pitch });
    });

    /* Ham veride olmayan ek geçişler (bkz. scenes-<proje>.js → extraHotspots).
       Açılar derece cinsindendir. Bu geçişler (balkon/teras) etiketleri her
       zaman görünen belirgin noktalar olarak çizilir — kullanıcı aramasın. */
    ((META.extraHotspots && META.extraHotspots[d.id]) || []).forEach(function (hs) {
      var RAD = Math.PI / 180;
      var el = linkHotspotEl({ target: hs.target });
      el.classList.add('hs-exit');
      scene.hotspotContainer().createHotspot(el, { yaw: hs.yaw * RAD, pitch: hs.pitch * RAD });
    });

    scenes[d.id] = { data: d, scene: scene, view: view };
  });

  /* Düz sahneler (kuşbakışı, site planı, sahil) — kaydırma ve yakınlaştırma
     çalışır, 360° dönüş yoktur. */
  (META.flatScenes || []).forEach(function (f) {
    var source = Marzipano.ImageUrlSource.fromString(f.image);
    var geometry = new Marzipano.FlatGeometry([
      { width: f.w, height: f.h, tileWidth: f.w, tileHeight: f.h }
    ]);
    /* Yalnız letterbox: görselin tamamı çerçeveye sığar ve dışına taşmaz.
       ⚠️ resolution() eklenirse yakınlaştırma tamamen kilitlenir, compose ile
       zoom() eklenirse letterbox'ın tam-sığdırma sınırı eziliyor — bu yüzden
       yakınlaşma alt sınırı aşağıda zoomBy() içinde uygulanıyor. */
    var limiter = Marzipano.FlatView.limit.letterbox();
    var view = new Marzipano.FlatView({ mediaAspectRatio: f.w / f.h }, limiter);
    var scene = viewer.createScene({ source: source, geometry: geometry, view: view });

    /* Plan üzerindeki noktalar: panoramadakiyle aynı yanıp sönen halka.
       Konumlar görselin kendi 0–1 koordinatlarıdır. */
    (f.hotspots || []).forEach(function (hs) {
      scene.hotspotContainer().createHotspot(linkHotspotEl(hs), { x: hs.x, y: hs.y });
    });

    scenes[f.id] = { data: f, scene: scene, view: view, flat: true };
  });

  function linkHotspotEl(hs) {
    var wrap = document.createElement('div');
    wrap.className = 'hs hs-link';
    wrap.setAttribute('role', 'button');
    wrap.setAttribute('tabindex', '0');

    var ring = document.createElement('span');
    ring.className = 'hs-ring';

    var label = document.createElement('span');
    label.className = 'hs-label';
    label.textContent = sceneName(hs.target);
    label.dataset.target = hs.target;

    wrap.appendChild(ring);
    wrap.appendChild(label);
    wrap.setAttribute('aria-label', sceneName(hs.target));

    function go(e) { e.preventDefault(); e.stopPropagation(); switchScene(hs.target); }

    /* ⚠️ mousedown'ı DURDURMA: geçiş noktasının üstünden panoramayı
       döndürmek imkânsız hâle geliyordu. Bunun yerine basma ile bırakma
       arasındaki mesafeye bakılır — sürüklendiyse tıklama sayılmaz. */
    var downX = null, downY = null;
    function onDown(e) {
      var p = e.touches && e.touches[0] ? e.touches[0] : e;
      downX = p.clientX; downY = p.clientY;
    }
    wrap.addEventListener('mousedown', onDown);
    wrap.addEventListener('pointerdown', onDown);
    wrap.addEventListener('touchstart', onDown, { passive: true });

    wrap.addEventListener('click', function (e) {
      /* Basma konumu yakalanamadıysa tıklamayı kabul et — aksi halde hiçbir
         geçiş noktası çalışmıyordu (başlangıç değeri 0 olduğu için her
         tıklama "sürüklendi" sayılıyordu). */
      if (downX !== null) {
        var moved = Math.abs(e.clientX - downX) + Math.abs(e.clientY - downY);
        downX = downY = null;
        if (moved > 8) { e.preventDefault(); return; }
      }
      go(e);
    });
    wrap.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') go(e);
    });
    return wrap;
  }

  /* Düz sahne oranları.
     contain = görselin tamamı çerçeveye sığar (kenarlarda boşluk kalabilir)
     cover   = görsel ekranı doldurur (taşan kenarlar kırpılır)
     Açılışta cover kullanılır — boş şeritler yerine dolu bir görüntü gelir;
     uzaklaştırma sınırı contain olduğu için tamamı yine görülebilir. */
  function aspects(s) {
    return { screen: window.innerWidth / window.innerHeight, media: s.data.w / s.data.h };
  }
  function fitZoom(s) {
    var a = aspects(s);
    return a.screen > a.media ? a.screen / a.media : 1;
  }
  function coverZoom(s) {
    var a = aspects(s);
    return a.screen > a.media ? 1 : a.screen / a.media;
  }

  /* ── Sahne geçişi ────────────────────────────────────── */
  var currentId = null;
  var sceneLoader = $('#sceneLoader');
  var loaderTimer = null;
  var rotateArm = null;

  function switchScene(id, opts) {
    if (!scenes[id] || id === currentId) return;
    opts = opts || {};
    currentId = id;

    clearTimeout(loaderTimer);
    loaderTimer = setTimeout(function () { sceneLoader.hidden = false; }, 260);

    var s = scenes[id];
    if (s.flat) {
      /* Düz sahne ortalanır ve ekranı dolduracak oranda açılır.
         ⚠️ Görsel ekrandan GENİŞ oranlıysa (ör. balkon 16:9), sahne henüz
         boyutlandırılmamışken letterbox limiti "Bad view - suspect a broken
         limiter" fırlatıyor; tek tek set yerine tek çağrı + güvenli geri
         dönüş kullanılıyor. */
      try {
        s.view.setParameters({ x: 0.5, y: 0.5, zoom: coverZoom(s) });
      } catch (e1) {
        try { s.view.setParameters({ x: 0.5, y: 0.5, zoom: fitZoom(s) }); }
        catch (e2) { /* limiter sahne aktifleşince kendini toparlar */ }
      }
    } else {
      var start = s.data.initialViewParameters;
      var ov = META.initialView && META.initialView[id];
      if (ov) {
        var RAD = Math.PI / 180;
        start = {
          yaw: (ov.yaw != null ? ov.yaw * RAD : start.yaw),
          pitch: (ov.pitch != null ? ov.pitch * RAD : start.pitch),
          fov: (ov.fov != null ? ov.fov * RAD : start.fov)
        };
      }
      s.view.setParameters(start);
    }
    s.scene.switchTo({ transitionDuration: opts.instant ? 0 : 850 });

    var done = function (stable) {
      if (stable === false) return;
      clearTimeout(loaderTimer);
      sceneLoader.hidden = true;
      if (s.flat) {
        /* Sahne gerçekten çizildikten sonra (boyut kesinleşmiş) hafif
           yakınlaştırılmış başla: kenarlarda gezinme payı kalır — hem elle
           kaydırma hem otomatik süzülme bu payı kullanır. */
        try { s.view.setParameters({ x: 0.5, y: 0.5, zoom: coverZoom(s) * 0.86 }); } catch (e) {}
      }
      s.scene.layer().removeEventListener('renderComplete', done);
    };
    s.scene.layer().addEventListener('renderComplete', done);
    setTimeout(function () { clearTimeout(loaderTimer); sceneLoader.hidden = true; }, 4000);

    applyRotate();
    /* ⚠️ Marzipano, sahne geçişi (switchTo) sürerken verilen startMovement'ı
       yutuyor — bu yüzden ilk sahne dışında otomatik dönüş hiç başlamıyordu.
       Geçiş bittikten sonra bir kez daha kur. */
    clearTimeout(rotateArm);
    rotateArm = setTimeout(function () {
      if (currentId === id) applyRotate();
    }, opts.instant ? 60 : 900);

    syncUI(id);
    if (!opts.silent) {
      try { history.replaceState(null, '', '#s=' + id); } catch (e) {}
    }
  }

  /* ── Arayüz ──────────────────────────────────────────── */
  var ui = $('#ui');
  var sceneNameEl = $('#sceneName');
  var sceneGroupEl = $('#sceneGroup');
  var infoCard = $('#infoCard');
  var icGroup = $('.ic-group', infoCard);
  var icName = $('.ic-name', infoCard);
  var icDesc = $('.ic-desc', infoCard);
  var fsTrack = $('#fsTrack');
  var fsTabs = $('#fsTabs');
  var menuBody = $('#menuBody');

  var activeTab = META.groups[0].id;

  function buildMenu() {
    menuBody.innerHTML = '';
    META.groups.forEach(function (g) {
      var wrap = document.createElement('section');
      wrap.className = 'mgroup';

      var h = document.createElement('h3');
      h.className = 'mgroup-title';
      h.textContent = g[lang] || g.tr;
      wrap.appendChild(h);

      g.sub.forEach(function (sub) {
        var sc = document.createElement('div');
        sc.className = 'msub';
        if (g.sub.length > 1 || (sub[lang] || sub.tr) !== (g[lang] || g.tr)) {
          var sh = document.createElement('p');
          sh.className = 'msub-title';
          sh.textContent = sub[lang] || sub.tr;
          sc.appendChild(sh);
        }
        sub.scenes.forEach(function (id) {
          if (!scenes[id]) return;
          var b = document.createElement('button');
          b.className = 'mitem';
          b.dataset.scene = id;

          var th = document.createElement('span');
          th.className = 'mitem-thumb';
          lazyThumb(th, id);

          var lb = document.createElement('span');
          lb.className = 'mitem-label';
          lb.textContent = sceneName(id);

          b.appendChild(th); b.appendChild(lb);
          b.addEventListener('click', function () {
            switchScene(id);
            closeMenu();
          });
          sc.appendChild(b);
        });
        wrap.appendChild(sc);
      });
      menuBody.appendChild(wrap);
    });
  }

  function buildTabs() {
    fsTabs.innerHTML = '';
    META.groups.forEach(function (g) {
      var b = document.createElement('button');
      b.className = 'fs-tab' + (g.id === activeTab ? ' is-active' : '');
      b.textContent = g[lang] || g.tr;
      b.dataset.tab = g.id;
      b.setAttribute('role', 'tab');
      b.addEventListener('click', function () {
        activeTab = g.id;
        buildTabs();
        buildStrip();
      });
      fsTabs.appendChild(b);
    });
  }

  function scenesOfTab(tabId) {
    var g = META.groups.filter(function (x) { return x.id === tabId; })[0];
    if (!g) return [];
    var out = [];
    g.sub.forEach(function (sub) {
      sub.scenes.forEach(function (id) { if (scenes[id]) out.push(id); });
    });
    return out;
  }

  function buildStrip() {
    fsTrack.innerHTML = '';
    scenesOfTab(activeTab).forEach(function (id) {
      var b = document.createElement('button');
      b.className = 'fs-item' + (id === currentId ? ' is-active' : '');
      b.dataset.scene = id;
      thumbStyle(b, id);

      var cap = document.createElement('span');
      cap.className = 'fs-cap';
      cap.textContent = sceneName(id);
      b.appendChild(cap);

      b.addEventListener('click', function () { switchScene(id); });
      fsTrack.appendChild(b);
    });
    updateArrows();
  }

  function syncUI(id) {
    sceneNameEl.textContent = sceneName(id);
    sceneGroupEl.textContent = groupLabel(id);

    icGroup.textContent = groupLabel(id);
    icName.textContent = sceneName(id);
    icDesc.textContent = sceneDesc(id);


    var g = groupOf[id];
    if (g && g.group.id !== activeTab) {
      activeTab = g.group.id;
      buildTabs();
      buildStrip();
    }

    $$('.fs-item', fsTrack).forEach(function (el) {
      var on = el.dataset.scene === id;
      el.classList.toggle('is-active', on);
      if (on && el.scrollIntoView) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
    $$('.mitem', menuBody).forEach(function (el) {
      el.classList.toggle('is-active', el.dataset.scene === id);
    });
  }

  /* Şerit okları */
  var fsPrev = $('#fsPrev'), fsNext = $('#fsNext');
  function updateArrows() {
    var overflow = fsTrack.scrollWidth > fsTrack.clientWidth + 4;
    fsPrev.hidden = !overflow;
    fsNext.hidden = !overflow;
  }
  fsPrev.addEventListener('click', function () { fsTrack.scrollBy({ left: -320, behavior: 'smooth' }); });
  fsNext.addEventListener('click', function () { fsTrack.scrollBy({ left: 320, behavior: 'smooth' }); });
  window.addEventListener('resize', updateArrows);

  /* Menü aç/kapa */
  var menu = $('#menu'), scrim = $('#scrim'), menuBtn = $('#menuBtn');
  function openMenu() {
    closeNearby();
    realiseThumbs(menuBody);
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    scrim.hidden = false;
  }
  function closeMenu() {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    /* Perde iki panelin ortak zeminidir; diğeri açıksa kalmalı. */
    if (!nearby.classList.contains('is-open')) scrim.hidden = true;
  }
  menuBtn.addEventListener('click', function () {
    menu.classList.contains('is-open') ? closeMenu() : openMenu();
  });
  $('#menuClose').addEventListener('click', closeMenu);
  scrim.addEventListener('click', function () { closeMenu(); closeNearby(); });

  /* ── Çevreyi Keşfet ──────────────────────────────────── */
  var NEARBY = window.TOUR_NEARBY || { groups: [] };
  var nearby = $('#nearby'), nearbyBtn = $('#nearbyBtn');
  var nbTabs = $('#nbTabs'), nbBody = $('#nbBody');
  var nbTab = (NEARBY.groups[0] || {}).id;

  /* Üst kapak: varsayılanda Salamis, listede gezinirken o yerin fotoğrafı. */
  var nbCoverImg = $('#nbCoverImg'), nbKicker = $('#nbKicker'),
      nbTitle = $('#nbTitle'), nbCredit = $('#nbCredit');
  var COVER_DEFAULT = nbCoverImg ? nbCoverImg.getAttribute('src') : '';
  var coverTimer = null;

  function paintCover(src, kicker, title, credit) {
    nbCoverImg.classList.add('is-swapping');
    clearTimeout(coverTimer);
    coverTimer = setTimeout(function () {
      nbCoverImg.src = src;
      nbKicker.textContent = kicker;
      nbTitle.textContent = title;
      nbCredit.textContent = credit || '';
      nbCoverImg.classList.remove('is-swapping');
    }, 130);
  }
  function setCover(it) {
    paintCover(it.img, '~' + String(it.km).replace('.', ',') + ' km',
               it[lang] || it.tr, it.credit || '');
  }
  function resetCover() {
    paintCover(COVER_DEFAULT, t('nearbyKicker'), t('nearbyTitle'), '');
  }

  /* Fotoğraflar önden yüklenir ki üzerine gelince anında değişsin. */
  function preloadPlaceImages() {
    (NEARBY.groups || []).forEach(function (g) {
      g.items.forEach(function (it) { if (it.img) { var i = new Image(); i.src = it.img; } });
    });
  }

  function buildNearby() {
    nbTabs.innerHTML = '';
    NEARBY.groups.forEach(function (g) {
      var b = document.createElement('button');
      b.className = 'nb-tab' + (g.id === nbTab ? ' is-active' : '');
      b.textContent = g[lang] || g.tr;
      b.setAttribute('role', 'tab');
      b.addEventListener('click', function () { nbTab = g.id; buildNearby(); nbBody.scrollTop = 0; });
      nbTabs.appendChild(b);
    });

    nbBody.innerHTML = '';
    var g = NEARBY.groups.filter(function (x) { return x.id === nbTab; })[0];
    if (!g) return;
    g.items.forEach(function (it) {
      var a = document.createElement('a');
      a.className = 'nb-item';
      a.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(it.q);
      a.target = '_blank';
      a.rel = 'noopener';

      /* Üzerine gelince yerin adı ve fotoğrafı panelin üst kapağına taşınır. */
      if (it.img) {
        a.classList.add('has-img');
        var show = function () { setCover(it); };
        a.addEventListener('mouseenter', show);
        a.addEventListener('focus', show);
        a.addEventListener('mouseleave', resetCover);
        a.addEventListener('blur', resetCover);
      }

      var top = document.createElement('div');
      top.className = 'nb-top';
      var h = document.createElement('h3');
      h.className = 'nb-name';
      h.textContent = it[lang] || it.tr;
      var km = document.createElement('span');
      km.className = 'nb-km';
      km.textContent = '~' + String(it.km).replace('.', ',') + ' km';
      top.appendChild(h); top.appendChild(km);

      var d = document.createElement('p');
      d.className = 'nb-desc';
      d.textContent = it.desc[lang] || it.desc.tr;

      var go = document.createElement('span');
      go.className = 'nb-go';
      go.textContent = t('openMap') + ' →';

      a.appendChild(top); a.appendChild(d); a.appendChild(go);

      nbBody.appendChild(a);
    });
  }

  function openNearby() {
    closeMenu();
    if (!openNearby._pre) { openNearby._pre = true; preloadPlaceImages(); }
    nearby.classList.add('is-open');
    nearby.setAttribute('aria-hidden', 'false');
    nearbyBtn.setAttribute('aria-expanded', 'true');
    nearbyBtn.classList.add('is-on');
    scrim.hidden = false;
  }
  function closeNearby() {
    nearby.classList.remove('is-open');
    nearby.setAttribute('aria-hidden', 'true');
    nearbyBtn.setAttribute('aria-expanded', 'false');
    nearbyBtn.classList.remove('is-on');
    if (!menu.classList.contains('is-open')) scrim.hidden = true;
  }
  nearbyBtn.addEventListener('click', function () {
    nearby.classList.contains('is-open') ? closeNearby() : openNearby();
  });
  $('#nearbyClose').addEventListener('click', closeNearby);

  /* Otomatik dönüş */
  var rotateBtn = $('#rotateBtn');
  function applyRotate() {
    var isFlat = currentId && scenes[currentId] && scenes[currentId].flat;
    /* Düğme düz sahnede de aktif: panoramada dönüşü, düz sahnede yatay
       süzülmeyi (drift) açıp kapatır. */
    rotateBtn.disabled = false;
    rotateBtn.classList.toggle('is-on', autorotateOn);
    rotateBtn.setAttribute('aria-pressed', String(autorotateOn));

    if (autorotateOn && !isFlat) {
      viewer.startMovement(autorotate);
      viewer.setIdleMovement(4000, autorotate);
    } else {
      viewer.stopMovement();
      viewer.setIdleMovement(Infinity);
    }
  }
  rotateBtn.addEventListener('click', function () {
    autorotateOn = !autorotateOn;
    applyRotate();
  });

  /* Bilgi kartı */
  var infoBtn = $('#infoBtn');
  var infoOn = true;
  infoBtn.addEventListener('click', function () {
    infoOn = !infoOn;
    infoCard.classList.toggle('is-hidden', !infoOn);
    infoBtn.setAttribute('aria-pressed', String(infoOn));
    infoBtn.classList.toggle('is-on', infoOn);
  });

  /* Tam ekran */
  var fsBtn = $('#fsBtn');
  fsBtn.addEventListener('click', function () {
    var d = document, el = d.documentElement;
    if (!d.fullscreenElement && !d.webkitFullscreenElement) {
      (el.requestFullscreen || el.webkitRequestFullscreen || function () {}).call(el);
    } else {
      (d.exitFullscreen || d.webkitExitFullscreen || function () {}).call(d);
    }
  });

  /* Yakınlaştırma */
  function zoomBy(f) {
    var s = scenes[currentId];
    if (!s) return;
    /* FlatView'de görüş açısı değil, zoom oranı vardır. Küçük zoom = yakın;
       0.28'in altına inince görsel çözünürlüğü tükenip bulanıklaşıyor. */
    if (s.flat) {
      s.view.setZoom(Math.max(0.28, Math.min(fitZoom(s), s.view.zoom() * f)));
    } else {
      s.view.setFov(s.view.fov() * f);
    }
  }
  $('#zoomIn').addEventListener('click', function () { zoomBy(0.82); });
  $('#zoomOut').addEventListener('click', function () { zoomBy(1.22); });

  /* Klavye */
  var controls = viewer.controls();
  controls.registerMethod('keyLeft', new Marzipano.KeyControlMethod(37, 'x', -0.7, 3), true);
  controls.registerMethod('keyRight', new Marzipano.KeyControlMethod(39, 'x', 0.7, 3), true);
  controls.registerMethod('keyUp', new Marzipano.KeyControlMethod(38, 'y', -0.7, 3), true);
  controls.registerMethod('keyDown', new Marzipano.KeyControlMethod(40, 'y', 0.7, 3), true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeMenu(); closeNearby(); }
    else if (e.key === '+' || e.key === '=') { zoomBy(0.82); }
    else if (e.key === '-' || e.key === '_') { zoomBy(1.22); }
    else if (e.key.toLowerCase() === 'm') { menu.classList.contains('is-open') ? closeMenu() : openMenu(); }
    else if (e.key.toLowerCase() === 'f') { fsBtn.click(); }
  });

  /* ── Düz sahnede yavaş süzülme ───────────────────────────
     Panoramadaki otomatik dönüşün karşılığı: görüntü yatayda usulca
     sağa-sola gezinir. Kullanıcı dokununca durur, 4 sn sonra sürer;
     üstteki dönüş düğmesi bunu da açıp kapatır. */
  var driftPhase = 0, driftLast = 0, lastInteract = 0;
  (function driftLoop(ts) {
    requestAnimationFrame(driftLoop);
    var s = currentId && scenes[currentId];
    if (!s || !s.flat || !autorotateOn || document.hidden) { driftLast = ts; return; }
    if (Date.now() - lastInteract < 4000) { driftLast = ts; return; }
    var dt = Math.min(0.1, ((ts - driftLast) || 16) / 1000);
    driftLast = ts;
    var zoom = s.view.zoom();
    /* zoom ≈ görünen genişlik oranı; kalan pay iki yana bölüşülür. */
    var amp = Math.max(0, (1 - zoom) / 2) * 0.92;
    if (amp < 0.004) return;
    driftPhase += dt * 0.22;   /* tam gidiş-dönüş ~29 sn */
    try { s.view.setX(0.5 + amp * Math.sin(driftPhase)); } catch (e) {}
  })(0);
  ['mousedown', 'touchstart', 'wheel'].forEach(function (ev) {
    panoEl.addEventListener(ev, function () { lastInteract = Date.now(); }, { passive: true });
  });

  /* Pusula */
  var needle = $('#compassNeedle');
  var compassBox = $('#compass');
  viewer.addEventListener('viewChange', function () {
    if (!currentId || !needle) return;
    var s = scenes[currentId];
    /* Düz sahnede yön kavramı yok; pusula gizlenir. */
    if (s.flat) { compassBox.style.display = 'none'; return; }
    compassBox.style.display = '';
    needle.style.transform = 'rotate(' + (-s.view.yaw() * 180 / Math.PI) + 'deg)';
  });

  /* Dil değiştirme */
  var langBtn = $('#langBtn');
  function applyLang() {
    document.documentElement.lang = lang;
    langBtn.textContent = lang === 'tr' ? 'EN' : 'TR';
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    $$('.hs-label').forEach(function (el) {
      if (el.dataset.target) {
        el.textContent = sceneName(el.dataset.target);
        if (el.parentNode) el.parentNode.setAttribute('aria-label', sceneName(el.dataset.target));
      }
    });
    buildMenu();
    if (menu.classList.contains('is-open')) realiseThumbs(menuBody);
    buildTabs();
    buildStrip();
    buildNearby();
    var locEl = $('#introLoc');
    if (locEl && META.project && META.project.location) {
      locEl.textContent = META.project.location[lang] || META.project.location.tr;
    }
    if (currentId) syncUI(currentId);
    try { localStorage.setItem('lv360-lang', lang); } catch (e) {}
  }
  langBtn.addEventListener('click', function () {
    lang = lang === 'tr' ? 'en' : 'tr';
    applyLang();
  });

  /* ── Açılış ──────────────────────────────────────────── */
  var intro = $('#intro');
  var hint = $('#hint');

  $('#factScenes').textContent = DATA.scenes.length + (META.flatScenes || []).length;

  function initialScene() {
    var m = /[#&]s=([^&]+)/.exec(location.hash);
    if (m && scenes[decodeURIComponent(m[1])]) return decodeURIComponent(m[1]);
    return scenes[META.startScene] ? META.startScene : DATA.scenes[0].id;
  }

  var firstId = initialScene();
  buildMenu();
  buildTabs();
  switchScene(firstId, { instant: true, silent: true });
  buildStrip();
  applyLang();
  applyRotate();

  /* ── Proje kimliği ───────────────────────────────────────
     Aynı arayüz birden çok DND projesini gösterir; başlıklar, bağlantılar
     ve açılış bilgileri seçilen projeden gelir. */
  (function applyProject() {
    var P = window.TOUR_PROJECT;
    if (!P) return;

    $('.tb-project').textContent = P.name;
    $('.tb-brand').href = P.page;
    $('#menuCta').href = P.page + '#fiyat-al';
    // siteye gömülüyken bağlantılar tur kutusunda değil sayfanın kendisinde açılır
    if (window.top !== window.self) { $('.tb-brand').target = '_top'; $('#menuCta').target = '_top'; }
    if (P.whatsapp) $('#waBtn').href = P.whatsapp;
    $('#introLoc').textContent = (META.project && META.project.location)
      ? (META.project.location[lang] || META.project.location.tr) : '';

    /* Logosu olmayan projede yerini adın kendisi alır. */
    [['.intro-logo', 'intro-wordmark'], ['.menu-logo', 'menu-wordmark']].forEach(function (pair) {
      var img = $(pair[0]);
      if (!img) return;
      if (P.logo) { img.src = P.logo; img.alt = P.name; return; }
      var h = document.createElement('p');
      h.className = pair[1];
      h.textContent = P.name;
      img.parentNode.replaceChild(h, img);
    });

    if (P.units) $('#factUnitsN').textContent = P.units;
    else $('#liUnits').hidden = true;
    if (P.landArea) $('#factLandN').textContent = P.landArea;
    else $('#liLand').hidden = true;
  })();

  /* ── Harf parçacıkları ───────────────────────────────────
     Her parçaya rastgele bir yön, dönüş ve gecikme yazılır; birleşme ve
     patlama aynı değişkenleri kullandığı için hareket tutarlı görünür. */
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
      s.textContent = text[i] === ' ' ? ' ' : text[i];
      scatterVars(s, i);
      frag.appendChild(s);
    }
    el.appendChild(frag);
    el.dataset.split = '1';
  }

  /* ── Yükleme ekranı ──────────────────────────────────────
     İlerleme gerçek olaylara bağlıdır: fontlar, marka görselleri, ilk
     sahnenin önizlemesi ve ilk kare. Aralarda saniyede ~2 puanlık yavaş
     bir artış vardır (en fazla %92) — bu, ağ yavaşken çubuğun donup
     "takıldı" izlenimi vermemesi içindir; %100'ü yalnız gerçek kare verir. */
  var preloader = $('#preloader');
  var plFill = $('#plFill');
  var plPct = $('#plPct');
  var pTarget = 0, pShown = 0, pDone = false, creep = null;

  /* Marka animasyonu oturumda BİR KEZ oynar (bkz. js/hub.js — aynı kural).
     Seçim ekranından gelindiyse ekran yalnız gerçek yükleme kadar kalır. */
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
    /* Çubuk hem gerçek yüklemeye hem asgari süreye uyar. */
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
      /* Sınıf kalkınca açılış animasyonları baştan ve senkron başlar. */
      document.body.classList.remove('is-loading');
      preloader.classList.add('is-done');
      setTimeout(function () { preloader.hidden = true; }, 850);
    }, 150);
  }

  /* Marka yazısı: harfler dağınıktan birleşir. */
  (function () {
    var top = $('#wmTop'), big = $('#wmBig');
    if (lang === 'en') { top.textContent = 'DND PROJECTS'; big.textContent = '360° VIEW'; }
    /* Marka animasyonu bu oturumda izlendiyse harfler hiç bölünmez: yazı
       olduğu gibi durur, birleşme efekti bir daha oynamaz. */
    if (splashSeen) { top.classList.add('is-in'); big.classList.add('is-in'); return; }
    splitChars(top); splitChars(big);
    setTimeout(function () { top.classList.add('is-in'); big.classList.add('is-in'); }, 140);
  })();

  setProgress(10);
  creep = setInterval(function () {
    if (pDone) return clearInterval(creep);
    if (pTarget < 92) setProgress(pTarget + 1);
  }, 520);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { setProgress(26); });
  } else {
    setProgress(26);
  }

  (function () {
    var brand = ['assets/dnd-logo.svg', 'assets/lagoon-logo.png'];
    var loaded = 0;
    brand.forEach(function (src) {
      var im = new Image();
      im.onload = im.onerror = function () {
        loaded++;
        setProgress(26 + loaded * 8);
      };
      im.src = src;
    });
  })();

  (function () {
    var s = scenes[firstId];
    var im = new Image();
    im.onload = im.onerror = function () { setProgress(66); };
    im.src = s.flat ? s.data.image : previewUrl(firstId);
  })();

  (function () {
    var s = scenes[firstId];
    var onReady = function (stable) {
      if (stable === false) return;
      s.scene.layer().removeEventListener('renderComplete', onReady);
      finishLoading();
    };
    s.scene.layer().addEventListener('renderComplete', onReady);
    /* Karo sunucusu yanıt vermezse kullanıcı ekranda kilitli kalmasın. */
    setTimeout(finishLoading, 12000);
  })();

  /* Sinematik açılış: kamera geniş açıdan başlar, otomatik dönüş onu
     yavaşça normal görüş açısına çeker (targetFov). */
  if (autorotateOn && !scenes[firstId].flat) {
    var iv0 = scenes[firstId].view;
    iv0.setFov(Math.min(iv0.fov() * 1.24, 114 * Math.PI / 180));
  }

  /* Açılış ekranı patlayarak dağılır: başlık harflere ayrılır, kalan
     bloklar da aynı rastgele yönlere savrulur. */
  function prepareBlast() {
    var title = $('.intro-title');
    splitChars(title);

    /* ⚠️ Giriş animasyonları `both` fill-mode ile bitiyor ve son karesini
       (transform:none) kalıcı uyguluyor; bu da patlama geçişini eziyordu —
       öğeler dağılmayıp yerinde kalıyordu (özellikle sol üstteki DND logosu
       tur arayüzündekiyle çakışıyordu). Animasyonu inline !important ile
       kapatmak tek güvenilir yol. */
    function freeze(el) {
      if (el) el.style.setProperty('animation', 'none', 'important');
    }
    freeze(title);
    $$('.ch', title).forEach(freeze);

    ['.intro-logo-wrap', '.intro-logo', '.intro-wordmark', '.intro-kicker',
     '.intro-sub', '#startBtn', '.intro-facts', '.intro-loc',
     '.intro-brand'].forEach(function (sel, i) {
      var el = $(sel);
      if (!el) return;
      freeze(el);
      el.classList.add('blast-part');
      scatterVars(el, i * 4);
    });
    $$('.intro-facts li').forEach(freeze);
  }

  var entered = false;
  function enterTour() {
    if (entered) return;
    entered = true;

    prepareBlast();
    intro.classList.add('is-blast');
    /* Patlama bitince perde tamamen kaldırılır. `hidden` şart: yalnız
       opacity ile gizlenirse tarayıcı sayfayı geri tuşunda önbellekten
       (bfcache) getirdiğinde efekt yeniden oynuyordu. */
    setTimeout(function () {
      intro.classList.add('is-gone');
      intro.hidden = true;
    }, 950);

    document.body.classList.add('tour-live');
    ui.hidden = false;
    /* hidden kalkar kalkmaz stil yeniden hesabını zorla; aksi halde giriş
       animasyonu ilk karede tetiklenmeyip panel görünmez kalıyordu. */
    void ui.offsetHeight;
    ui.classList.add('is-live');
    setTimeout(function () { ui.classList.add('is-ready'); }, 1200);
    setTimeout(updateArrows, 60);

    hint.hidden = false;
    setTimeout(function () {
      hint.classList.add('is-out');
      setTimeout(function () { hint.hidden = true; }, 700);
    }, 3400);
  }
  $('#startBtn').addEventListener('click', enterTour);

  /* Geri/ileri tuşu sayfayı bfcache'ten eski DOM'uyla getirir. Tur çoktan
     açılmışsa açılış perdesi ve patlama efekti bir daha görünmemeli. */
  window.addEventListener('pageshow', function () {
    if (!entered) return;
    intro.classList.remove('is-blast');
    intro.classList.add('is-gone');
    intro.hidden = true;
    document.body.classList.add('tour-live');
    ui.hidden = false;
    ui.classList.add('is-live', 'is-ready');
  });

  /* Konsoldan inceleme için (tur mantığını etkilemez). */
  window.__tour = { scenes: scenes, viewer: viewer, meta: META, go: switchScene };

  /* Geri/ileri ile sahne bağlantısı */
  window.addEventListener('hashchange', function () {
    var m = /[#&]s=([^&]+)/.exec(location.hash);
    if (m) {
      var id = decodeURIComponent(m[1]);
      if (scenes[id] && id !== currentId) switchScene(id, { silent: true });
    }
  });

})();
