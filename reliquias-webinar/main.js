(function () {
  "use strict";

  const data = window.__BRAND__ || {};
  const $  = (s, sc) => (sc || document).querySelector(s);
  const $$ = (s, sc) => Array.from((sc || document).querySelectorAll(s));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const escHTML = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[c]);
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  /* ---------- Mounts ---------- */
  function mountBrands() {
    const target = $("[data-brands]");
    if (!target || target.children.length > 0 || !data.brands) return;
    const chip = name => `<span class="brand-name">${escHTML(name)}</span><span class="brand-sep" aria-hidden="true"></span>`;
    // render twice for seamless marquee loop
    const html = data.brands.map(chip).join("");
    target.innerHTML = html + html;
  }

  function mountRelics() {
    const target = $("[data-relics]");
    if (!target || target.children.length > 0 || !data.reliquias) return;
    target.innerHTML = data.reliquias.map(r => `
      <article class="relic" data-tilt>
        <div class="relic-bg" style="background-image:url('${escHTML(r.img)}')"></div>
        <div class="relic-roman">${escHTML(r.roman)}</div>
        <div class="relic-content">
          <span class="relic-kicker">${escHTML(r.kicker)}</span>
          <h3 class="relic-name">${escHTML(r.name)}</h3>
          <span class="relic-sub">${escHTML(r.sub)}</span>
          <p class="relic-desc">${escHTML(r.desc)}</p>
        </div>
      </article>`).join("");
  }

  function mountTimezones() {
    const target = $("[data-timezones]");
    if (!target || target.children.length > 0 || !data.timezones) return;
    target.innerHTML = data.timezones.map(t => `
      <div class="tz-pill">
        <img src="https://flagcdn.com/${escHTML(t.cc)}.svg" alt="${escHTML(t.country)}" loading="lazy">
        <span>${escHTML(t.country)}</span>
        <span class="tz-time">${escHTML(t.time)}</span>
      </div>`).join("");
  }

  function mountFaqs() {
    const target = $("[data-faq]");
    if (!target || target.children.length > 0 || !data.faqs) return;
    target.innerHTML = data.faqs.map((f, i) => `
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}">
          <span>${escHTML(f.q)}</span>
          <span class="faq-icon" aria-hidden="true"></span>
        </button>
        <div class="faq-a" id="faq-a-${i}" role="region">
          <div class="faq-a-inner"><p>${escHTML(f.a)}</p></div>
        </div>
      </div>`).join("");
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq() {
    const list = $("[data-faq]");
    if (!list) return;
    list.addEventListener("click", e => {
      const btn = e.target.closest(".faq-q");
      if (!btn) return;
      const item = btn.parentElement;
      const open = item.classList.contains("is-open");
      // close all
      $$(".faq-item", list).forEach(it => {
        it.classList.remove("is-open");
        const b = it.querySelector(".faq-q");
        if (b) b.setAttribute("aria-expanded", "false");
      });
      // open clicked (toggle)
      if (!open) { item.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); }
    });
  }

  /* ---------- Splash ---------- */
  function initSplash() {
    const splash = $("[data-splash]");
    if (!splash) return;
    const hide = () => splash.classList.add("is-out");
    if (document.readyState === "complete") setTimeout(hide, 600);
    else window.addEventListener("load", () => setTimeout(hide, 400));
    setTimeout(hide, 4000);
  }

  /* ---------- Nav ---------- */
  function initNav() {
    const nav = $("[data-nav]");
    if (!nav) return;
    const on = () => nav.classList.toggle("is-scrolled", scrollY > 70);
    on(); window.addEventListener("scroll", on, { passive: true });
  }

  /* ---------- Anchors ---------- */
  function initAnchors() {
    document.addEventListener("click", e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#" || id.indexOf("PLACEHOLDER") !== -1) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 70, behavior: "smooth" });
    });
  }

  /* ---------- Reveals ---------- */
  function initReveals() {
    const els = $$("[data-reveal]");
    if (!els.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-revealed"); io.unobserve(e.target); } });
    }, { threshold: 0.04, rootMargin: "0px 0px -3% 0px" });
    els.forEach(el => io.observe(el));
    setTimeout(() => {
      $$("[data-reveal]:not(.is-revealed)").forEach(el => {
        if (el.getBoundingClientRect().top < innerHeight * 1.2) el.classList.add("is-revealed");
      });
    }, 6000);
  }

  /* ---------- Marquee ---------- */
  function initMarquee() {
    if (!window.gsap) return;
    $$("[data-marquee]").forEach(track => {
      const half = track.scrollWidth / 2;
      if (half <= 0) return;
      const speed = 60;
      gsap.to(track, {
        x: -half, duration: half / speed, ease: "none", repeat: -1,
        modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % half) }
      });
    });
  }

  /* ---------- Tilt ---------- */
  function initTilt() {
    if (matchMedia("(hover: none)").matches) return;
    $$("[data-tilt]").forEach(card => {
      const MAX = 6;
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = null, hovering = false;
      card.addEventListener("mousemove", e => {
        hovering = true;
        const r = card.getBoundingClientRect();
        tx = -((e.clientY - r.top) / r.height - 0.5) * MAX;
        ty = ((e.clientX - r.left) / r.width - 0.5) * MAX;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      card.addEventListener("mouseleave", () => { hovering = false; tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); });
      function loop() {
        cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15;
        card.style.transform = `perspective(1000px) rotateX(${cx.toFixed(2)}deg) rotateY(${cy.toFixed(2)}deg) translateY(${hovering ? -8 : 0}px)`;
        raf = (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) ? requestAnimationFrame(loop) : null;
      }
    });
  }

  /* ---------- Hero parallax ---------- */
  function initHeroParallax() {
    if (!window.gsap || !window.ScrollTrigger || reduced) return;
    const vis = $(".hero-visual");
    if (vis) gsap.to(vis, { yPercent: 16, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  }

  /* ---------- Boot ---------- */
  function boot() {
    safe(mountBrands, "mountBrands");
    safe(mountRelics, "mountRelics");
    safe(mountTimezones, "mountTimezones");
    safe(mountFaqs, "mountFaqs");
    safe(initFaq, "initFaq");
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initAnchors, "initAnchors");
    safe(initReveals, "initReveals");
    safe(initTilt, "initTilt");

    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}
      safe(initMarquee, "initMarquee");
      safe(initHeroParallax, "initHeroParallax");
    }
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
