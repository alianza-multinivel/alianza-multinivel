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
    const html = data.brands.map(chip).join("");
    target.innerHTML = html + html;
  }

  function mountTestimonials() {
    const target = $("[data-testi]");
    if (!target || target.children.length > 0 || !data.testimonials) return;
    const card = t => `
      <div class="wa-card">
        <div class="wa-head">
          <span class="wa-av" style="background:${escHTML(t.color)}">${escHTML(t.initial)}</span>
          <div><b>${escHTML(t.name)}</b><span>en línea</span></div>
          <svg class="wa-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="#25D366" d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Z"/><path fill="#fff" d="M9 7.2c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.7 4.2 3.7 2.1.8 2.5.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3l-1.5-.7c-.2-.1-.4-.1-.5.1l-.6.8c-.1.2-.3.2-.5.1-.7-.3-1.4-.6-2.1-1.6-.2-.3.2-.5.4-.8.1-.1.1-.3.2-.4 0-.2 0-.3 0-.4l-.8-1.6Z"/></svg>
        </div>
        <div class="wa-body">
          ${t.msgs.map(m => `<div class="wa-msg ${m.me ? "wa-out" : "wa-in"}">${escHTML(m.t)}</div>`).join("")}
        </div>
        <div class="wa-result">↑ ${escHTML(t.result)}</div>
      </div>`;
    const html = data.testimonials.map(card).join("");
    target.innerHTML = html + html; // duplicate for seamless loop
  }

  function mountMentors() {
    const target = $("[data-mentors]");
    if (!target || target.children.length > 0 || !data.mentores) return;
    target.innerHTML = data.mentores.map(m => {
      const avatar = m.photo
        ? `<span class="mentor-photo" style="background-image:url('${escHTML(m.photo)}')"></span>`
        : `<span class="mentor-photo mentor-photo-empty">${escHTML(m.name.charAt(0))}</span>`;
      return `
      <article class="mentor">
        <div class="mentor-art" style="background-image:url('${escHTML(m.arch)}')"></div>
        <div class="mentor-info">
          ${avatar}
          <span class="mentor-arch">${escHTML(m.title)}</span>
          <h3 class="mentor-name">${escHTML(m.name)}</h3>
        </div>
      </article>`;
    }).join("");
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
      <div class="tz-card">
        <div class="tz-card-top">
          <img src="https://flagcdn.com/${escHTML(t.cc)}.svg" alt="${escHTML(t.country)}" loading="lazy">
          <span class="tz-country">${escHTML(t.country)}</span>
        </div>
        <div class="tz-slots">
          <span class="tz-slot"><span class="tz-slot-lbl">Espacio 1</span>${escHTML(t.s1)}</span>
          <span class="tz-slot"><span class="tz-slot-lbl">Espacio 2</span>${escHTML(t.s2)}</span>
        </div>
      </div>`).join("");
  }

  function mountFaqs() {
    const target = $("[data-faq]");
    if (!target || target.children.length > 0 || !data.faqs) return;
    target.innerHTML = data.faqs.map((f, i) => `
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}">
          <span>${escHTML(f.q)}</span><span class="faq-icon" aria-hidden="true"></span>
        </button>
        <div class="faq-a" id="faq-a-${i}" role="region"><div class="faq-a-inner"><p>${escHTML(f.a)}</p></div></div>
      </div>`).join("");
  }

  /* ---------- Countdown ---------- */
  function initCountdown() {
    const root = $("[data-countdown]");
    if (!root || !data.event || !data.event.targetISO) return;
    const target = new Date(data.event.targetISO).getTime();
    const dEl = $("[data-cd-days]"), hEl = $("[data-cd-hours]"), mEl = $("[data-cd-mins]"), sEl = $("[data-cd-secs]");
    const pad = n => String(Math.max(0, n)).padStart(2, "0");
    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) { dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = "00"; return; }
      const s = Math.floor(diff / 1000);
      dEl.textContent = pad(Math.floor(s / 86400));
      hEl.textContent = pad(Math.floor((s % 86400) / 3600));
      mEl.textContent = pad(Math.floor((s % 3600) / 60));
      sEl.textContent = pad(s % 60);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Seats bar (78% +3%/day) ---------- */
  function initSeats() {
    const fill = $("[data-seats-fill]"), pctEl = $("[data-seats-pct]");
    if (!fill || !data.event) return;
    const base = data.event.seatsBase || 78;
    const perDay = data.event.seatsPerDay || 3;
    const cap = data.event.seatsCap || 96;
    const baseDate = new Date(data.event.seatsBaseDate || Date.now()).getTime();
    const days = Math.max(0, Math.floor((Date.now() - baseDate) / 86400000));
    const pct = Math.min(cap, base + perDay * days);
    pctEl.textContent = pct + "%";
    // animate width when in view
    fill.style.width = "0%";
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { fill.style.width = pct + "%"; io.unobserve(e.target); } });
    }, { threshold: 0.3 });
    io.observe(fill);
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
      $$(".faq-item", list).forEach(it => { it.classList.remove("is-open"); const b = it.querySelector(".faq-q"); if (b) b.setAttribute("aria-expanded", "false"); });
      if (!open) { item.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); }
    });
  }

  /* ---------- Splash / Nav / Anchors / Reveals ---------- */
  function initSplash() {
    const splash = $("[data-splash]"); if (!splash) return;
    const hide = () => splash.classList.add("is-out");
    if (document.readyState === "complete") setTimeout(hide, 600);
    else window.addEventListener("load", () => setTimeout(hide, 400));
    setTimeout(hide, 4000);
  }
  function initNav() {
    const nav = $("[data-nav]"); if (!nav) return;
    const on = () => nav.classList.toggle("is-scrolled", scrollY > 70);
    on(); window.addEventListener("scroll", on, { passive: true });
  }
  function initAnchors() {
    document.addEventListener("click", e => {
      const a = e.target.closest('a[href^="#"]'); if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#" || id.indexOf("PLACEHOLDER") !== -1) return;
      const el = document.querySelector(id); if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 70, behavior: "smooth" });
    });
  }
  function initReveals() {
    const els = $$("[data-reveal]"); if (!els.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-revealed"); io.unobserve(e.target); } });
    }, { threshold: 0.04, rootMargin: "0px 0px -3% 0px" });
    els.forEach(el => io.observe(el));
    setTimeout(() => { $$("[data-reveal]:not(.is-revealed)").forEach(el => { if (el.getBoundingClientRect().top < innerHeight * 1.2) el.classList.add("is-revealed"); }); }, 6000);
  }

  /* ---------- Marquees (brands + testimonials) ---------- */
  function initMarquees() {
    if (!window.gsap) return;
    // brands (existing, leftward)
    $$("[data-marquee]").forEach(track => {
      const half = track.scrollWidth / 2; if (half <= 0) return;
      gsap.to(track, { x: -half, duration: half / 60, ease: "none", repeat: -1,
        modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % half) } });
    });
    // testimonials (right→left, pause on hover)
    const tt = $("[data-testi]");
    if (tt) {
      const half = tt.scrollWidth / 2;
      if (half > 0) {
        const tw = gsap.to(tt, { x: -half, duration: half / 45, ease: "none", repeat: -1,
          modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % half) } });
        const wrap = tt.closest(".testi-marquee");
        if (wrap) {
          wrap.addEventListener("mouseenter", () => tw.pause());
          wrap.addEventListener("mouseleave", () => tw.resume());
        }
      }
    }
  }

  /* ---------- Tilt ---------- */
  function initTilt() {
    if (matchMedia("(hover: none)").matches) return;
    $$("[data-tilt]").forEach(card => {
      const MAX = 6; let tx=0,ty=0,cx=0,cy=0,raf=null,hov=false;
      card.addEventListener("mousemove", e => {
        hov=true; const r=card.getBoundingClientRect();
        tx=-((e.clientY-r.top)/r.height-0.5)*MAX; ty=((e.clientX-r.left)/r.width-0.5)*MAX;
        if(!raf) raf=requestAnimationFrame(loop);
      });
      card.addEventListener("mouseleave", () => { hov=false; tx=0; ty=0; if(!raf) raf=requestAnimationFrame(loop); });
      function loop(){ cx+=(tx-cx)*0.15; cy+=(ty-cy)*0.15;
        card.style.transform=`perspective(1000px) rotateX(${cx.toFixed(2)}deg) rotateY(${cy.toFixed(2)}deg) translateY(${hov?-8:0}px)`;
        raf=(Math.abs(tx-cx)>0.05||Math.abs(ty-cy)>0.05)?requestAnimationFrame(loop):null; }
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
    safe(mountTestimonials, "mountTestimonials");
    safe(mountMentors, "mountMentors");
    safe(mountRelics, "mountRelics");
    safe(mountTimezones, "mountTimezones");
    safe(mountFaqs, "mountFaqs");
    safe(initFaq, "initFaq");
    safe(initCountdown, "initCountdown");
    safe(initSeats, "initSeats");
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initAnchors, "initAnchors");
    safe(initReveals, "initReveals");
    safe(initTilt, "initTilt");

    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}
      safe(initMarquees, "initMarquees");
      safe(initHeroParallax, "initHeroParallax");
    }
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
