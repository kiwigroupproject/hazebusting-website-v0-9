/* Haze-Busting Global Services — interactions (v0.2)
   Smooth scrolling: Lenis · Scroll animation: GSAP ScrollTrigger (both from CDN; page degrades gracefully without them). */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var reduce = /[?&]noanim/.test(location.search) || matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  var hasLenis = typeof window.Lenis !== 'undefined';
  var lenis = null;

  /* smooth scroll */
  if (hasLenis && !reduce) {
    document.documentElement.style.scrollBehavior = 'auto';
    lenis = new Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
    if (hasGsap) {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
  } else if (hasGsap) { gsap.registerPlugin(ScrollTrigger); }

  /* nav + progress */
  var nav = $('.nav'), bar = $('.progress');
  var onScroll = function () {
    nav.classList.toggle('scrolled', scrollY > 40);
    var h = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* drawer */
  var toggle = $('.nav-toggle'), drawer = $('#drawer');
  var setDrawer = function (open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    drawer.classList.toggle('open', open);
    document.body.classList.toggle('drawer-locked', open);
    nav.classList.toggle('scrolled', open || scrollY > 40);
    if (lenis) { open ? lenis.stop() : lenis.start(); }
  };
  if (toggle && drawer) {
    toggle.addEventListener('click', function () { setDrawer(toggle.getAttribute('aria-expanded') !== 'true'); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setDrawer(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('open')) setDrawer(false); });
  }

  /* scroll reveals */
  var fx = $$('.fx, .img-reveal');
  fx.forEach(function (el) { var d = el.getAttribute('data-fx-delay'); if (d) el.style.transitionDelay = d + 's'; });
  if (reduce || !('IntersectionObserver' in window)) {
    fx.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    fx.forEach(function (el) { if (!el.closest('.hero')) io.observe(el); });
  }
  requestAnimationFrame(function () { requestAnimationFrame(function () { $$('.hero .fx').forEach(function (el) { el.classList.add('in'); }); }); });

  /* parallax backdrops */
  if (hasGsap && !reduce) {
    $$('[data-parallax]').forEach(function (img) {
      gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.closest('section') || img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  /* counters */
  var count = function (el) {
    var end = parseInt(el.getAttribute('data-count'), 10), suf = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = end + suf; return; }
    var t0 = null;
    (function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / 1400, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  };
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { count(e.target); cio.unobserve(e.target); } }); }, { threshold: 0.5 });
    $$('[data-count]').forEach(function (el) { cio.observe(el); });
  } else { $$('[data-count]').forEach(count); }

  /* tabs / filters (deep-linkable via #hash) */
  $$('[data-tabs]').forEach(function (group) {
    var tabs = $$('.filter-btn, .cat', group), scope = group.closest('.container') || document;
    var panels = $$('.panel', scope);
    var show = function (id) {
      tabs.forEach(function (t) { var on = t.dataset.tab === id; t.classList.toggle('active', on); t.setAttribute('aria-selected', on); });
      panels.forEach(function (p) { p.classList.toggle('active', p.dataset.panel === id); });
      var shown = panels.filter(function (p) { return p.classList.contains('active'); })[0];
      if (shown && !reduce) {
        $$('.fx', shown).forEach(function (el, i) {
          el.style.transitionDelay = '0s'; el.classList.remove('in'); void el.offsetWidth;
          setTimeout(function () { el.classList.add('in'); }, 60 + i * 70);
        });
      }
      if (hasGsap) ScrollTrigger.refresh();
    };
    tabs.forEach(function (t) { t.addEventListener('click', function () { show(t.dataset.tab); history.replaceState(null, '', '#' + t.dataset.tab); }); });
    var fromHash = function () { var h = location.hash.slice(1); if (tabs.some(function (t) { return t.dataset.tab === h; })) show(h); };
    addEventListener('hashchange', fromHash); fromHash();
  });

  /* service cards: cursor spotlight + subtle 3D tilt */
  $$('.svc, .model').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      el.style.setProperty('--mx', x + 'px'); el.style.setProperty('--my', y + 'px');
      if (!reduce && e.pointerType === 'mouse' && el.classList.contains('svc')) {
        var rx = ((y / r.height) - 0.5) * -7, ry = ((x / r.width) - 0.5) * 7;
        el.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-6px)';
      }
    });
    el.addEventListener('pointerleave', function () { el.style.transform = ''; });
  });

  /* flip cards: tap-to-flip on touch devices (hover flips on desktop via CSS) */
  var flips = $$('.flip');
  if (matchMedia('(hover: none)').matches) {
    flips.forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        flips.forEach(function (o) { if (o !== card) o.classList.remove('flipped'); });
        card.classList.toggle('flipped');
      });
    });
  }
  flips.forEach(function (card) {
    card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); } });
  });

  /* FAQ */
  $$('.faq-item').forEach(function (item) {
    $('.faq-q', item).addEventListener('click', function () {
      var open = item.classList.toggle('open');
      $('.faq-q', item).setAttribute('aria-expanded', open);
    });
  });

  /* contact: open-now badge (IST) */
  var badge = $('.open-badge');
  if (badge) {
    var ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    var d = ist.getDay(), h = ist.getHours();
    var open = d >= 1 && d <= 6 && h >= 9 && h < 20;
    badge.classList.toggle('open', open);
    $('span', badge).textContent = open ? 'We are open now' : 'Closed now — opens Mon–Sat, 9 AM';
  }

  $$('.yr').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
