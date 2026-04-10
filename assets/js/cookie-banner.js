/* ═══════════════════════════════════════════════════════
   SCAFA THERMOFORMING — DSGVO Cookie-Banner
   Multilingual (DE/EN/NL/FR/ES/TR/PL/SK/IT)
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Translations ───
  var translations = {
    de: {
      title: 'Cookie-Einstellungen',
      description: 'Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.',
      necessary: 'Notwendig',
      necessarySub: '(immer aktiv)',
      analytics: 'Statistik & Analyse',
      analyticsSub: '(Google Analytics)',
      marketing: 'Marketing',
      marketingSub: '(Google Ads, Remarketing)',
      acceptAll: 'Alle akzeptieren',
      saveSelection: 'Auswahl speichern',
      rejectAll: 'Nur notwendige',
      privacyLink: 'Datenschutzerklärung',
      privacyHref: '/datenschutzerklaerung/'
    },
    en: {
      title: 'Cookie Settings',
      description: 'We use cookies to provide you with the best possible experience on our website.',
      necessary: 'Necessary',
      necessarySub: '(always active)',
      analytics: 'Statistics & Analytics',
      analyticsSub: '(Google Analytics)',
      marketing: 'Marketing',
      marketingSub: '(Google Ads, Remarketing)',
      acceptAll: 'Accept all',
      saveSelection: 'Save selection',
      rejectAll: 'Necessary only',
      privacyLink: 'Privacy Policy',
      privacyHref: '/en/privacy-policy/'
    },
    nl: {
      title: 'Cookie-instellingen',
      description: 'Wij gebruiken cookies om u de best mogelijke ervaring op onze website te bieden.',
      necessary: 'Noodzakelijk',
      necessarySub: '(altijd actief)',
      analytics: 'Statistieken & Analyse',
      analyticsSub: '(Google Analytics)',
      marketing: 'Marketing',
      marketingSub: '(Google Ads, Remarketing)',
      acceptAll: 'Alles accepteren',
      saveSelection: 'Selectie opslaan',
      rejectAll: 'Alleen noodzakelijke',
      privacyLink: 'Privacybeleid',
      privacyHref: '/nl/privacybeleid/'
    },
    fr: {
      title: 'Paramètres des cookies',
      description: 'Nous utilisons des cookies pour vous offrir la meilleure expérience possible sur notre site web.',
      necessary: 'Nécessaires',
      necessarySub: '(toujours actifs)',
      analytics: 'Statistiques & Analyse',
      analyticsSub: '(Google Analytics)',
      marketing: 'Marketing',
      marketingSub: '(Google Ads, Remarketing)',
      acceptAll: 'Tout accepter',
      saveSelection: 'Enregistrer la sélection',
      rejectAll: 'Nécessaires uniquement',
      privacyLink: 'Politique de confidentialité',
      privacyHref: '/politique-confidentialite/'
    },
    es: {
      title: 'Configuración de cookies',
      description: 'Utilizamos cookies para ofrecerle la mejor experiencia posible en nuestro sitio web.',
      necessary: 'Necesarias',
      necessarySub: '(siempre activas)',
      analytics: 'Estadísticas y Análisis',
      analyticsSub: '(Google Analytics)',
      marketing: 'Marketing',
      marketingSub: '(Google Ads, Remarketing)',
      acceptAll: 'Aceptar todas',
      saveSelection: 'Guardar selección',
      rejectAll: 'Solo necesarias',
      privacyLink: 'Política de privacidad',
      privacyHref: '/es/politica-privacidad/'
    },
    tr: {
      title: 'Çerez Ayarları',
      description: 'Web sitemizde size mümkün olan en iyi deneyimi sunmak için çerezler kullanıyoruz.',
      necessary: 'Gerekli',
      necessarySub: '(her zaman aktif)',
      analytics: 'İstatistik & Analiz',
      analyticsSub: '(Google Analytics)',
      marketing: 'Pazarlama',
      marketingSub: '(Google Ads, Remarketing)',
      acceptAll: 'Tümünü kabul et',
      saveSelection: 'Seçimi kaydet',
      rejectAll: 'Yalnızca gerekli',
      privacyLink: 'Gizlilik Politikası',
      privacyHref: '/tr/gizlilik-politikasi/'
    },
    pl: {
      title: 'Ustawienia plików cookie',
      description: 'Używamy plików cookie, aby zapewnić Państwu najlepsze możliwe doświadczenia na naszej stronie internetowej.',
      necessary: 'Niezbędne',
      necessarySub: '(zawsze aktywne)',
      analytics: 'Statystyki i Analiza',
      analyticsSub: '(Google Analytics)',
      marketing: 'Marketing',
      marketingSub: '(Google Ads, Remarketing)',
      acceptAll: 'Zaakceptuj wszystkie',
      saveSelection: 'Zapisz wybór',
      rejectAll: 'Tylko niezbędne',
      privacyLink: 'Polityka prywatności',
      privacyHref: '/pl/polityka-prywatnosci/'
    },
    sk: {
      title: 'Nastavenia súborov cookie',
      description: 'Používame súbory cookie, aby sme vám poskytli čo najlepší zážitok na našej webovej stránke.',
      necessary: 'Nevyhnutné',
      necessarySub: '(vždy aktívne)',
      analytics: 'Štatistika & Analýza',
      analyticsSub: '(Google Analytics)',
      marketing: 'Marketing',
      marketingSub: '(Google Ads, Remarketing)',
      acceptAll: 'Prijať všetky',
      saveSelection: 'Uložiť výber',
      rejectAll: 'Iba nevyhnutné',
      privacyLink: 'Zásady ochrany osobných údajov',
      privacyHref: '/sk/zasady-ochrany/'
    },
    it: {
      title: 'Impostazioni cookie',
      description: 'Utilizziamo i cookie per offrirvi la migliore esperienza possibile sul nostro sito web.',
      necessary: 'Necessari',
      necessarySub: '(sempre attivi)',
      analytics: 'Statistiche & Analisi',
      analyticsSub: '(Google Analytics)',
      marketing: 'Marketing',
      marketingSub: '(Google Ads, Remarketing)',
      acceptAll: 'Accetta tutti',
      saveSelection: 'Salva selezione',
      rejectAll: 'Solo necessari',
      privacyLink: 'Informativa sulla privacy',
      privacyHref: '/it/privacy-policy/'
    }
  };

  // Detect page language, fallback to German
  var lang = (document.documentElement.getAttribute('lang') || 'de').toLowerCase().split('-')[0];
  var t = translations[lang] || translations.de;

  var COOKIE_NAME = 'scafa_cookie_consent';
  var COOKIE_DAYS = 365;

  // Check if consent already given
  function getConsent() {
    var match = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'));
    if (match) {
      try { return JSON.parse(decodeURIComponent(match[2])); }
      catch (e) { return null; }
    }
    return null;
  }

  function setConsent(consent) {
    var d = new Date();
    d.setTime(d.getTime() + COOKIE_DAYS * 24 * 60 * 60 * 1000);
    document.cookie = COOKIE_NAME + '=' + encodeURIComponent(JSON.stringify(consent)) +
      ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }

  function loadGTM() {
    if (window._gtmLoaded) return;
    window._gtmLoaded = true;

    // GTM Script
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l !== 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-NGXBLMB');

    // GTM noscript iframe
    var noscript = document.createElement('noscript');
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-NGXBLMB';
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
  }

  function applyConsent(consent) {
    if (consent.analytics) {
      loadGTM();
    }
    // Push consent state to dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'cookie_consent_update',
      consent_analytics: consent.analytics,
      consent_marketing: consent.marketing
    });
  }

  // Check existing consent
  var existingConsent = getConsent();
  if (existingConsent) {
    applyConsent(existingConsent);
    return; // Don't show banner
  }

  // ─── Build Banner DOM ───
  var overlay = document.createElement('div');
  overlay.id = 'cookieBannerOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:99998;opacity:0;transition:opacity 0.3s ease;';

  // Inject mobile-responsive styles
  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '@media(max-width:640px){',
    '#cookieBanner{bottom:5vh!important;left:0!important;right:0!important;transform:translateY(20px)!important;width:100%!important}',
    '#cookieBanner .cb-inner{padding:14px 16px!important;border-radius:16px!important;max-width:100%!important;width:100%!important}',
    '#cookieBanner .cb-header{margin-bottom:8px!important}',
    '#cookieBanner .cb-header svg{width:20px!important;height:20px!important}',
    '#cookieBanner .cb-title{font-size:15px!important}',
    '#cookieBanner .cb-text{font-size:12px!important;line-height:1.4!important;margin-bottom:10px!important}',
    '#cookieBanner .cb-checks{margin-bottom:10px!important;display:flex!important;flex-wrap:wrap!important;gap:4px 16px!important}',
    '#cookieBanner .cb-checks label{margin-bottom:0!important;gap:6px!important}',
    '#cookieBanner .cb-checks input{width:14px!important;height:14px!important}',
    '#cookieBanner .cb-checks .cb-lbl{font-size:12px!important}',
    '#cookieBanner .cb-checks .cb-sub{display:none!important}',
    '#cookieBanner .cb-btns{gap:8px!important}',
    '#cookieBanner .cb-btns button{padding:10px 12px!important;font-size:13px!important;border-radius:10px!important;min-width:0!important}',
    '#cookieBanner .cb-btn-reject{padding:7px 12px!important;font-size:11px!important}',
    '}'
  ].join('');
  document.head.appendChild(styleEl);

  var banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.innerHTML = [
    '<div class="cb-inner" style="background:#0F1420;border:1px solid #1F2937;border-radius:16px;padding:28px 32px;max-width:520px;width:calc(100% - 32px);box-shadow:0 25px 50px rgba(0,0,0,0.5);font-family:\'DM Sans\',sans-serif;">',
    '  <div class="cb-header" style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">',
    '    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#6DC424" stroke-width="2"/><circle cx="8" cy="9" r="1.5" fill="#6DC424"/><circle cx="15" cy="8" r="1" fill="#6DC424" opacity="0.6"/><circle cx="10" cy="14" r="1.2" fill="#6DC424" opacity="0.8"/><circle cx="16" cy="13" r="1.5" fill="#6DC424"/></svg>',
    '    <span class="cb-title" style="font-family:\'Space Grotesk\',sans-serif;font-weight:700;font-size:18px;color:#fff;">' + t.title + '</span>',
    '  </div>',
    '  <p class="cb-text" style="color:#94A3B8;font-size:14px;line-height:1.5;margin:0 0 20px;">',
    '    ' + t.description,
    '    <a href="' + t.privacyHref + '" style="color:#6DC424;text-decoration:underline;text-underline-offset:2px;">' + t.privacyLink + '</a>',
    '  </p>',
    '  <div class="cb-checks" style="margin-bottom:20px;">',
    '    <label style="display:flex;align-items:center;gap:10px;margin-bottom:10px;cursor:default;">',
    '      <input type="checkbox" checked disabled style="accent-color:#6DC424;width:18px;height:18px;">',
    '      <span class="cb-lbl" style="color:#E2E8F0;font-size:14px;font-weight:500;">' + t.necessary + '</span>',
    '      <span class="cb-sub" style="color:#94A3B8;font-size:12px;">' + t.necessarySub + '</span>',
    '    </label>',
    '    <label style="display:flex;align-items:center;gap:10px;margin-bottom:10px;cursor:pointer;" id="cookieLabelAnalytics">',
    '      <input type="checkbox" id="cookieAnalytics" style="accent-color:#6DC424;width:18px;height:18px;cursor:pointer;">',
    '      <span class="cb-lbl" style="color:#E2E8F0;font-size:14px;font-weight:500;">' + t.analytics + '</span>',
    '      <span class="cb-sub" style="color:#94A3B8;font-size:12px;">' + t.analyticsSub + '</span>',
    '    </label>',
    '    <label style="display:flex;align-items:center;gap:10px;cursor:pointer;" id="cookieLabelMarketing">',
    '      <input type="checkbox" id="cookieMarketing" style="accent-color:#6DC424;width:18px;height:18px;cursor:pointer;">',
    '      <span class="cb-lbl" style="color:#E2E8F0;font-size:14px;font-weight:500;">' + t.marketing + '</span>',
    '      <span class="cb-sub" style="color:#94A3B8;font-size:12px;">' + t.marketingSub + '</span>',
    '    </label>',
    '  </div>',
    '  <div class="cb-btns" style="display:flex;gap:12px;flex-wrap:wrap;">',
    '    <button id="cookieAcceptAll" style="flex:1;min-width:120px;padding:12px 20px;background:linear-gradient(135deg,#6DC424,#4A8A1A);color:#0A0E17;font-weight:700;font-size:14px;border:none;border-radius:12px;cursor:pointer;font-family:\'DM Sans\',sans-serif;transition:transform 0.2s ease,box-shadow 0.2s ease;">' + t.acceptAll + '</button>',
    '    <button id="cookieSaveSelection" style="flex:1;min-width:120px;padding:12px 20px;background:transparent;color:#6DC424;font-weight:600;font-size:14px;border:1px solid #6DC424;border-radius:12px;cursor:pointer;font-family:\'DM Sans\',sans-serif;transition:border-color 0.2s ease,color 0.2s ease;">' + t.saveSelection + '</button>',
    '    <button id="cookieRejectAll" class="cb-btn-reject" style="flex-basis:100%;padding:10px 20px;background:transparent;color:#94A3B8;font-weight:500;font-size:13px;border:1px solid #1F2937;border-radius:12px;cursor:pointer;font-family:\'DM Sans\',sans-serif;transition:border-color 0.2s ease,color 0.2s ease;">' + t.rejectAll + '</button>',
    '  </div>',
    '</div>'
  ].join('\n');
  banner.style.cssText = 'position:fixed;bottom:12px;left:50%;transform:translateX(-50%) translateY(20px);z-index:99999;opacity:0;transition:opacity 0.3s ease,transform 0.3s ease;';

  document.body.appendChild(overlay);
  document.body.appendChild(banner);

  // Animate in
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      overlay.style.opacity = '1';
      banner.style.opacity = '1';
      banner.style.transform = window.innerWidth <= 640 ? 'translateY(0)' : 'translateX(-50%) translateY(0)';
    });
  });

  // Hover effects
  var acceptBtn = document.getElementById('cookieAcceptAll');
  var saveBtn = document.getElementById('cookieSaveSelection');
  var rejectBtn = document.getElementById('cookieRejectAll');

  acceptBtn.addEventListener('mouseenter', function () { this.style.transform = 'scale(1.03)'; this.style.boxShadow = '0 0 20px rgba(109,196,36,0.3)'; });
  acceptBtn.addEventListener('mouseleave', function () { this.style.transform = 'scale(1)'; this.style.boxShadow = 'none'; });
  saveBtn.addEventListener('mouseenter', function () { this.style.borderColor = '#8AE040'; this.style.color = '#8AE040'; });
  saveBtn.addEventListener('mouseleave', function () { this.style.borderColor = '#6DC424'; this.style.color = '#6DC424'; });
  rejectBtn.addEventListener('mouseenter', function () { this.style.borderColor = '#94A3B8'; this.style.color = '#E2E8F0'; });
  rejectBtn.addEventListener('mouseleave', function () { this.style.borderColor = '#1F2937'; this.style.color = '#94A3B8'; });

  function closeBanner() {
    banner.style.opacity = '0';
    banner.style.transform = window.innerWidth <= 640 ? 'translateY(100%)' : 'translateX(-50%) translateY(20px)';
    overlay.style.opacity = '0';
    setTimeout(function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 300);
  }

  // Accept All
  acceptBtn.addEventListener('click', function () {
    var consent = { necessary: true, analytics: true, marketing: true };
    setConsent(consent);
    applyConsent(consent);
    closeBanner();
  });

  // Save Selection
  saveBtn.addEventListener('click', function () {
    var consent = {
      necessary: true,
      analytics: document.getElementById('cookieAnalytics').checked,
      marketing: document.getElementById('cookieMarketing').checked
    };
    setConsent(consent);
    applyConsent(consent);
    closeBanner();
  });

  // Reject All
  rejectBtn.addEventListener('click', function () {
    var consent = { necessary: true, analytics: false, marketing: false };
    setConsent(consent);
    applyConsent(consent);
    closeBanner();
  });

})();
