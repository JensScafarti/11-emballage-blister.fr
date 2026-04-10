/* ═══════════════════════════════════════════════════════
   SCAFA THERMOFORMING GmbH — Main JavaScript
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Nav Scroll Behavior ───
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function handleNavScroll() {
    const y = window.scrollY;
    if (y > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = y;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  // ─── Mobile Menu ───
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgerLines = menuBtn.querySelector('.hamburger-lines');
  var menuAnimating = false;

  var savedScrollY = 0;

  function lockBodyScroll() {
    savedScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + savedScrollY + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
  }

  function unlockBodyScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';
    window.scrollTo(0, savedScrollY);
  }

  function closeMobileMenu() {
    if (!mobileMenu.classList.contains('active')) return;
    mobileMenu.classList.remove('active');
    hamburgerLines.classList.remove('active');
    unlockBodyScroll();
  }

  function openMobileMenu() {
    if (mobileMenu.classList.contains('active')) return;
    mobileMenu.classList.add('active');
    hamburgerLines.classList.add('active');
    lockBodyScroll();
  }

  function toggleMobileMenu() {
    if (menuAnimating) return;
    menuAnimating = true;
    if (mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
    setTimeout(function () { menuAnimating = false; }, 250);
  }

  menuBtn.addEventListener('click', toggleMobileMenu);
  // Faster touch response: fire on touchend instead of waiting for click
  menuBtn.addEventListener('touchend', function (e) {
    e.preventDefault();
    toggleMobileMenu();
  }, { passive: false });

  // Event delegation: close menu when ANY link inside is clicked
  // (catches dynamically injected language switcher links too)
  mobileMenu.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      closeMobileMenu();
    }
  });

  // Close menu on Escape key (Accessibility)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
      menuBtn.focus();
    }
  });

  // bfcache fix: reset menu state on back/forward navigation (iOS Safari)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      closeMobileMenu();
    }
  });

  // Close menu when resizing past mobile breakpoint (device rotation)
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth >= 1024) {
        closeMobileMenu();
      }
    }, 100);
  });

  // Safety: ensure scroll lock is never stuck on page load
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';

  // ─── Inject "Home" link into mobile menu ───
  var HOME_LABELS = {
    de: 'Startseite', en: 'Home', nl: 'Startpagina', fr: 'Accueil',
    es: 'Inicio', tr: 'Ana Sayfa', pl: 'Strona główna', sk: 'Domov', it: 'Home'
  };
  var currentLang = document.documentElement.getAttribute('lang') || 'de';
  var homeHref = currentLang === 'de' ? '/' : '/' + currentLang + '/';
  var homeLabel = HOME_LABELS[currentLang] || 'Home';
  var mobileMenuInner = mobileMenu.querySelector('.flex.flex-col');
  if (mobileMenuInner) {
    var homeLink = document.createElement('a');
    homeLink.href = homeHref;
    homeLink.className = 'mobile-nav-link font-heading text-3xl text-white';
    homeLink.textContent = homeLabel;
    mobileMenuInner.insertBefore(homeLink, mobileMenuInner.firstChild);
  }

  // Close menu when tapping the backdrop (outside the panel)
  mobileMenu.addEventListener('click', function (e) {
    if (e.target === mobileMenu) {
      closeMobileMenu();
    }
  });


  // ─── Mobile Accordion Toggles ───
  document.querySelectorAll('.mobile-accordion-toggle').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var panel = btn.closest('.w-full').querySelector('.mobile-accordion-panel');
      var icon = btn.querySelector('svg');
      if (panel.style.maxHeight && panel.style.maxHeight !== '0px') {
        panel.style.maxHeight = '0px';
        icon.style.transform = 'rotate(0deg)';
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });


  // ─── Scroll Reveal (IntersectionObserver) ───
  const revealItems = document.querySelectorAll('.reveal-item:not(#hero .reveal-item)');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('visible');
    });
  }


  // ─── Counter Animation ───
  const counters = document.querySelectorAll('.counter');

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var current = 0;
    var duration = 1500;
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(eased * target);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.classList.add('counter-glow');
        el.addEventListener('animationend', function handler() {
          el.classList.remove('counter-glow');
          el.removeEventListener('animationend', handler);
        });
      }
    }

    requestAnimationFrame(step);
  }


  // ─── 3D Tilt Effect on Cards ───
  var tiltCards = document.querySelectorAll('.tilt-card');
  var isMobile = window.matchMedia('(max-width: 1023px)').matches;

  if (!isMobile && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tiltCards.forEach(function (card) {
      var glassCard = card.querySelector('.glass-card') || card.querySelector('.partner-card');
      if (!glassCard) return; // Guard: skip cards without inner element
      var glow = card.querySelector('.tilt-glow');

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = ((y - centerY) / centerY) * -6;
        var rotateY = ((x - centerX) / centerX) * 6;

        glassCard.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';

        if (glow) {
          var percentX = (x / rect.width) * 100;
          var percentY = (y / rect.height) * 100;
          glow.style.setProperty('--mouse-x', percentX + '%');
          glow.style.setProperty('--mouse-y', percentY + '%');
        }
      });

      card.addEventListener('mouseleave', function () {
        glassCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
      });
    });
  }


  // ─── Smooth Scroll for Anchor Links ───
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var navHeight = nav.offsetHeight;
        var targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });


  // ─── Theme Toggle (Light / Dark) ───
  var SVG_SUN = '<svg class="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  var SVG_MOON = '<svg class="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  var THEME_LABELS = {
    de: 'Farbmodus wechseln', en: 'Toggle color mode', nl: 'Kleurenmodus wisselen',
    fr: 'Changer le mode couleur', es: 'Cambiar modo de color', tr: 'Renk modunu değiştir',
    pl: 'Przełącz tryb kolorów', sk: 'Prepnúť farebný režim', it: 'Cambia modalità colore'
  };

  function createToggleBtn() {
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', THEME_LABELS[currentLang] || THEME_LABELS.en);
    btn.innerHTML = SVG_SUN + SVG_MOON;
    btn.addEventListener('click', toggleTheme);
    return btn;
  }

  function toggleTheme() {
    var html = document.documentElement;
    var isLight = html.getAttribute('data-theme') === 'light';
    var next = isLight ? 'dark' : 'light';

    html.classList.add('theme-transition');

    if (next === 'dark') {
      html.removeAttribute('data-theme');
    } else {
      html.setAttribute('data-theme', 'light');
    }

    localStorage.setItem('scafa-theme', next);

    setTimeout(function () {
      html.classList.remove('theme-transition');
    }, 450);
  }

  // Inject into desktop nav
  var desktopNav = document.querySelector('#nav .hidden.lg\\:flex');
  if (desktopNav) {
    var ctaLink = desktopNav.querySelector('.btn-green');
    if (ctaLink) {
      desktopNav.insertBefore(createToggleBtn(), ctaLink);
    } else {
      desktopNav.appendChild(createToggleBtn());
    }
  }

  // Inject theme toggle + lang switcher into mobile nav bar (next to hamburger)
  var mobileMenuContent = document.querySelector('#mobileMenu .flex.flex-col');
  var mobileNavBar = menuBtn.parentElement; // The nav bar div

  // Create a wrapper for mobile controls: [lang] [theme] [hamburger]
  var mobileControls = document.createElement('div');
  mobileControls.className = 'lg:hidden flex items-center gap-2';
  mobileControls.id = 'mobileControls';
  // Move hamburger button into this wrapper
  mobileNavBar.insertBefore(mobileControls, menuBtn);
  mobileControls.appendChild(menuBtn);

  // Add theme toggle before hamburger in the wrapper
  var mobileToggle = createToggleBtn();
  mobileToggle.classList.add('mobile-header-toggle');
  mobileToggle.style.width = '36px';
  mobileToggle.style.height = '36px';
  mobileControls.insertBefore(mobileToggle, menuBtn);


  // ─── Language Switcher ───
  var LANG_NAMES = {
    de: 'Deutsch', en: 'English', nl: 'Nederlands', fr: 'Français',
    es: 'Español', tr: 'Türkçe', pl: 'Polski', sk: 'Slovenčina', it: 'Italiano'
  };
  var LANG_FLAGS = {
    de: '🇩🇪', en: '🇬🇧', nl: '🇳🇱', fr: '🇫🇷',
    es: '🇪🇸', tr: '🇹🇷', pl: '🇵🇱', sk: '🇸🇰', it: '🇮🇹'
  };
  var SVG_GLOBE = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';

  function getHreflangLinks() {
    var links = {};
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(function (el) {
      var lang = el.getAttribute('hreflang');
      if (lang && lang !== 'x-default') {
        links[lang] = el.getAttribute('href');
      }
    });
    return links;
  }

  function getCurrentLang() {
    return document.documentElement.getAttribute('lang') || 'de';
  }

  // Track all lang switcher instances for shared close handler
  var langSwitcherInstances = [];

  function createLangSwitcher(isMobile) {
    var links = getHreflangLinks();
    var currentLang = getCurrentLang();
    if (Object.keys(links).length < 2) return null;

    var wrapper = document.createElement('div');
    wrapper.className = 'lang-switcher' + (isMobile ? ' lang-switcher--mobile' : '');
    wrapper.style.position = 'relative';

    var btn = document.createElement('button');
    btn.className = 'lang-btn';
    var LANG_LABELS = { de:'Sprache wechseln', en:'Change language', nl:'Taal wijzigen', fr:'Changer de langue', es:'Cambiar idioma', tr:'Dil değiştir', pl:'Zmień język', sk:'Zmeniť jazyk', it:'Cambia lingua' };
    btn.setAttribute('aria-label', LANG_LABELS[currentLang] || LANG_LABELS.en);
    btn.innerHTML = SVG_GLOBE + '<span class="lang-current">' + currentLang.toUpperCase() + '</span>';

    var dropdown = document.createElement('div');
    dropdown.className = 'lang-dropdown';
    dropdown.style.display = 'none';

    var langOrder = ['de', 'en', 'nl', 'fr', 'es', 'it', 'pl', 'sk', 'tr'];
    langOrder.forEach(function (lang) {
      if (!links[lang]) return;
      var a = document.createElement('a');
      a.href = links[lang];
      a.className = 'lang-option' + (lang === currentLang ? ' lang-option--active' : '');
      a.innerHTML = '<span class="lang-flag">' + (LANG_FLAGS[lang] || '') + '</span><span>' + (LANG_NAMES[lang] || lang) + '</span>';
      dropdown.appendChild(a);
    });

    // SCAFA International Section: Deutschsprachige ccTLDs (AT + CH)
    var regions = [
      { hreflang: 'de-AT', flag: '🇦🇹', name: 'Österreich', fallback: 'https://blisterverpackung.at/' },
      { hreflang: 'de-CH', flag: '🇨🇭', name: 'Schweiz',    fallback: 'https://blisterverpackung.ch/' }
    ];
    var hostname = window.location.hostname.toLowerCase();
    var currentRegion = hostname.indexOf('blisterverpackung.at') !== -1 ? 'de-AT'
                      : hostname.indexOf('blisterverpackung.ch') !== -1 ? 'de-CH' : null;
    var availableRegions = regions.filter(function (r) { return links[r.hreflang] || r.fallback; });
    if (availableRegions.length > 0) {
      var sep = document.createElement('div');
      sep.className = 'lang-section-header';
      sep.textContent = 'SCAFA International';
      dropdown.appendChild(sep);
      availableRegions.forEach(function (r) {
        var a = document.createElement('a');
        a.href = links[r.hreflang] || r.fallback;
        a.hreflang = r.hreflang;
        a.className = 'lang-option' + (r.hreflang === currentRegion ? ' lang-option--active' : '');
        a.innerHTML = '<span class="lang-flag">' + r.flag + '</span><span>' + r.name + '</span>';
        dropdown.appendChild(a);
      });
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      // Close all OTHER dropdowns first
      langSwitcherInstances.forEach(function (inst) {
        if (inst.dropdown !== dropdown) {
          inst.dropdown.style.display = 'none';
          inst.wrapper.classList.remove('lang-open');
        }
      });
      var isOpen = dropdown.style.display !== 'none';
      dropdown.style.display = isOpen ? 'none' : 'flex';
      wrapper.classList.toggle('lang-open', !isOpen);
    });

    langSwitcherInstances.push({ wrapper: wrapper, dropdown: dropdown });

    wrapper.appendChild(btn);
    wrapper.appendChild(dropdown);
    return wrapper;
  }

  // Single shared document click handler (not one per instance)
  document.addEventListener('click', function () {
    langSwitcherInstances.forEach(function (inst) {
      inst.dropdown.style.display = 'none';
      inst.wrapper.classList.remove('lang-open');
    });
  });

  // Inject desktop lang switcher (before theme toggle)
  if (desktopNav) {
    var langDesktop = createLangSwitcher(false);
    if (langDesktop) {
      var themeBtn = desktopNav.querySelector('.theme-toggle');
      if (themeBtn) {
        desktopNav.insertBefore(langDesktop, themeBtn);
      } else {
        var ctaBtn = desktopNav.querySelector('.btn-green');
        if (ctaBtn) desktopNav.insertBefore(langDesktop, ctaBtn);
        else desktopNav.appendChild(langDesktop);
      }
    }
  }

  // Inject mobile lang switcher into controls wrapper (before theme toggle)
  if (mobileControls) {
    var langMobile = createLangSwitcher(true);
    if (langMobile) {
      // Insert as first item: [lang] [theme] [hamburger]
      mobileControls.insertBefore(langMobile, mobileControls.firstChild);
    }
  }


  // ─── Country Picker (SCAFA International — alle 5 ccTLDs) ───
  var COUNTRIES = [
    { code: 'de', flag: '🇩🇪', name: 'Deutschland', hreflang: 'de',    fallback: 'https://www.blisterverpackung.de/' },
    { code: 'at', flag: '🇦🇹', name: 'Österreich',  hreflang: 'de-AT', fallback: 'https://blisterverpackung.at/' },
    { code: 'ch', flag: '🇨🇭', name: 'Schweiz',     hreflang: 'de-CH', fallback: 'https://blisterverpackung.ch/' },
    { code: 'it', flag: '🇮🇹', name: 'Italia',      hreflang: 'it',    fallback: 'https://imballaggio-blister.it/' },
    { code: 'fr', flag: '🇫🇷', name: 'France',      hreflang: 'fr',    fallback: 'https://emballage-blister.fr/' },
  ];

  function detectCurrentCountry() {
    var hostname = window.location.hostname.toLowerCase();
    if (hostname.indexOf('blisterverpackung.at') !== -1) return 'at';
    if (hostname.indexOf('blisterverpackung.ch') !== -1) return 'ch';
    if (hostname.indexOf('imballaggio-blister.it') !== -1) return 'it';
    if (hostname.indexOf('emballage-blister.fr') !== -1) return 'fr';
    return 'de';
  }

  function getCountryUrl(country) {
    // Versuche zuerst hreflang-Tag — nutzt automatisch die richtige Slug-Übersetzung
    var link = document.querySelector('link[rel="alternate"][hreflang="' + country.hreflang + '"]');
    if (link && link.getAttribute('href')) {
      return link.getAttribute('href');
    }
    // Fallback: Homepage der Country-Domain
    return country.fallback;
  }

  var countryPickerInstances = [];

  function createCountryPicker(isMobile) {
    var currentCountry = detectCurrentCountry();
    var currentCountryData = COUNTRIES.find(function (c) { return c.code === currentCountry; });
    if (!currentCountryData) currentCountryData = COUNTRIES[0];

    var wrapper = document.createElement('div');
    wrapper.className = 'country-picker' + (isMobile ? ' country-picker--mobile' : '');
    wrapper.style.position = 'relative';

    var btn = document.createElement('button');
    btn.className = 'country-btn';
    var BTN_LABELS = {
      de: 'Land wählen', at: 'Land wählen', ch: 'Land wählen',
      it: 'Seleziona paese', fr: 'Sélectionner pays'
    };
    btn.setAttribute('aria-label', BTN_LABELS[currentCountry] || BTN_LABELS.de);
    btn.innerHTML = '<span class="country-flag">' + currentCountryData.flag + '</span>' +
                    '<svg class="country-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

    var dropdown = document.createElement('div');
    dropdown.className = 'country-dropdown';
    dropdown.style.display = 'none';

    // Header
    var header = document.createElement('div');
    header.className = 'country-dropdown-header';
    var HEADER_TEXT = {
      de: 'SCAFA International', at: 'SCAFA International', ch: 'SCAFA International',
      it: 'SCAFA Internazionale', fr: 'SCAFA International'
    };
    header.textContent = HEADER_TEXT[currentCountry] || HEADER_TEXT.de;
    dropdown.appendChild(header);

    // Country options
    COUNTRIES.forEach(function (country) {
      var a = document.createElement('a');
      a.href = getCountryUrl(country);
      a.className = 'country-option' + (country.code === currentCountry ? ' country-option--active' : '');
      a.innerHTML = '<span class="country-option-flag">' + country.flag + '</span>' +
                    '<span class="country-option-name">' + country.name + '</span>' +
                    (country.code === currentCountry ? '<span class="country-option-check">●</span>' : '');
      dropdown.appendChild(a);
    });

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      // Close all other country dropdowns
      countryPickerInstances.forEach(function (inst) {
        if (inst.dropdown !== dropdown) {
          inst.dropdown.style.display = 'none';
          inst.wrapper.classList.remove('country-open');
        }
      });
      // Also close lang switchers
      langSwitcherInstances.forEach(function (inst) {
        inst.dropdown.style.display = 'none';
        inst.wrapper.classList.remove('lang-open');
      });
      var isOpen = dropdown.style.display !== 'none';
      dropdown.style.display = isOpen ? 'none' : 'flex';
      wrapper.classList.toggle('country-open', !isOpen);
    });

    countryPickerInstances.push({ wrapper: wrapper, dropdown: dropdown });

    wrapper.appendChild(btn);
    wrapper.appendChild(dropdown);
    return wrapper;
  }

  // Close country pickers on outside click (extends existing handler)
  document.addEventListener('click', function () {
    countryPickerInstances.forEach(function (inst) {
      inst.dropdown.style.display = 'none';
      inst.wrapper.classList.remove('country-open');
    });
  });

  // Country-Picker deaktiviert — AT/CH sind jetzt im Sprach-Dropdown unter "SCAFA International"
  // createCountryPicker() bleibt als Helper-Funktion im Code, wird aber nicht mehr injiziert.

})();
