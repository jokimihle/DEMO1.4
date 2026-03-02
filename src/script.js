import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ─── Lenis initialisieren (außerhalb von load, damit es früh verfügbar ist) ──
const lenis = new Lenis({
  smoothWheel: true,
  syncTouch: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// ─── ScrollTrigger muss Lenis als Scroll-Proxy kennen ────────────────────────
ScrollTrigger.scrollerProxy(document.documentElement, {
  scrollTop(value) {
    if (arguments.length) {
      lenis.scrollTo(value, { immediate: true });
    }
    return lenis.scroll;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: document.documentElement.style.transform ? "transform" : "fixed",
});

// ─── WICHTIG: window.load statt DOMContentLoaded ─────────────────────────────
// Bilder müssen geladen sein, damit offsetHeight korrekte Werte liefert!
window.addEventListener("load", () => {

  // ─── SplitText ───────────────────────────────────────────────────────────
  const headlineEl = document.querySelector(".headline");
  if (headlineEl) {
    const split = new SplitText(headlineEl, { type: "chars", charsClass: "char" });
    gsap.set(".char", { transformOrigin: "50% 60%" });
    split.chars.forEach((char, i) => {
      char.addEventListener("mouseenter", () => {
        gsap.to(char, { scale: 1.1, duration: 0.25, ease: "power2.out" });
        if (split.chars[i - 1]) gsap.to(split.chars[i - 1], { scale: 1.05, duration: 0.25, ease: "power2.out" });
        if (split.chars[i + 1]) gsap.to(split.chars[i + 1], { scale: 1.05, duration: 0.25, ease: "power2.out" });
      });
      char.addEventListener("mouseleave", () => {
        gsap.to(split.chars, { scale: 1, duration: 0.25, ease: "power2.out" });
      });
    });
  }

  // ─── Hero Badge ──────────────────────────────────────────────────────────
  const heroBadgeRing = document.querySelector(".hero-badge-ring");
  if (heroBadgeRing) gsap.to(heroBadgeRing, { rotation: 360, duration: 20, ease: "none", repeat: -1 });

  const heroBadge = document.querySelector(".hero-badge");
  if (heroBadge) {
    heroBadge.addEventListener("click", () => {
      const locationEl = document.getElementById("location");
      if (locationEl) lenis.scrollTo(locationEl, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
    });
  }

  // ─── Hero Scroll-Line ────────────────────────────────────────────────────
  const scrollLineInner = document.querySelector(".hero-scroll-line-inner");
  const introEl = document.querySelector(".intro");
  if (scrollLineInner && introEl) {
    gsap.to(scrollLineInner, {
      scaleY: 0, transformOrigin: "top center",
      scrollTrigger: { trigger: introEl, start: "top top", end: "bottom top", scrub: true },
    });
  }

  // ─── Page Counter ────────────────────────────────────────────────────────
  const sections = [
    { id: "intro",     index: 0 },
    { id: "spotlight", index: 1 },
    { id: "location",  index: 2 },
    { id: "footer",    index: 3 },
  ];
  const labelItems   = document.querySelectorAll(".page-label-item");
  const pageLabel    = document.getElementById("pageLabel");
  let currentSection = 0;

  if (labelItems.length) {
    function switchLabel(newIndex) {
      if (newIndex === currentSection) return;
      currentSection = newIndex;
      labelItems.forEach((item, i) => {
        if (i === newIndex) {
          gsap.fromTo(item,
            { rotateX: 90, opacity: 0, display: "flex" },
            { rotateX: 0, opacity: 1, duration: 0.55, ease: "power3.out" }
          );
        } else {
          gsap.to(item, {
            rotateX: -90, opacity: 0, duration: 0.3, ease: "power2.in",
            onComplete: () => gsap.set(item, { display: "none" }),
          });
        }
      });
    }

    gsap.set(labelItems, { display: "none", opacity: 0 });
    gsap.set(labelItems[0], { display: "flex", opacity: 1, rotateX: 0 });

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sec = sections.find(s => s.id === entry.target.id);
          if (sec) switchLabel(sec.index);
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) sectionObserver.observe(el);
    });
  }

  // ─── Spotlight ───────────────────────────────────────────────────────────
  const spotlightSection = document.querySelector(".spotlight");

  if (spotlightSection) {
    const projectIndex           = spotlightSection.querySelector(".project-index h2");
    const projectImgs            = spotlightSection.querySelectorAll(".project-img");
    const projectImagesContainer = spotlightSection.querySelector(".project-images");
    const projectNameItems       = spotlightSection.querySelectorAll(".project-name-item");
    const connector              = spotlightSection.querySelector(".project-connector");
    const totalProjectCount      = projectNameItems.length;

    if (!projectIndex || !projectImagesContainer || totalProjectCount === 0) {
      console.warn("Spotlight: Pflicht-Elemente fehlen");
    } else {

      // Jetzt nach window.load: Bilder sind geladen → offsetHeight ist korrekt ✓
      const VH  = window.innerHeight;
      const mid = VH / 2;

      const spotH   = spotlightSection.offsetHeight;
      const padV    = parseFloat(getComputedStyle(spotlightSection).paddingTop) || 0;
      const idxH    = projectIndex.offsetHeight;
      const imgsH   = projectImagesContainer.offsetHeight;

      const moveDistanceIndex  = spotH - padV * 2 - idxH;
      const moveDistanceImages = VH - imgsH;

      const firstImg     = projectImgs[0];
      const firstDivider = spotlightSection.querySelector(".project-divider");
      const imgH         = firstImg     ? firstImg.offsetHeight     : VH * 0.197;
      const divH         = firstDivider ? firstDivider.offsetHeight : VH * 0.10;
      const halfSpan     = (imgH + 2 * divH) / 2;
      const ITEM_GAP     = Math.max(VH * 0.025, imgH * 0.18);

      const SLOTS = {
        TOP_1:  mid - halfSpan - ITEM_GAP,
        TOP_2:  mid - halfSpan,
        CENTER: mid,
        BOT_1:  mid + halfSpan,
        BOT_2:  mid + halfSpan + ITEM_GAP,
        EXIT:   -100,
        PARK:   VH + 100,
      };

      const SLOT_OPACITY = {
        TOP_1: 0.32, TOP_2: 0.45, CENTER: 1,
        BOT_1: 0.45, BOT_2: 0.32, EXIT: 0, PARK: 0,
      };
      const SLOT_COLOR = {
        TOP_1:  "rgba(255,255,255,0.32)", TOP_2:  "rgba(255,255,255,0.45)",
        CENTER: "rgba(255,255,255,0.95)",
        BOT_1:  "rgba(255,255,255,0.45)", BOT_2:  "rgba(255,255,255,0.32)",
        EXIT:   "rgba(255,255,255,0)",    PARK:   "rgba(255,255,255,0)",
      };

      function getSlot(i, N) {
        const d = i - N;
        if (d === -2) return "TOP_1";
        if (d === -1) return "TOP_2";
        if (d ===  0) return "CENTER";
        if (d === +1) return "BOT_1";
        if (d === +2) return "BOT_2";
        if (d  <  -2) return "EXIT";
        return "PARK";
      }

      gsap.set(projectNameItems, { top: SLOTS.PARK, opacity: 0, yPercent: -50 });
      gsap.set(projectIndex, { opacity: 0 });
      if (connector) gsap.set(connector, { display: "none", opacity: 0 });

      // ─── Divider-Titel Setup ──────────────────────────────────────────────
      // Sammle alle Projektnamen aus den rechten Items
      const projectTitles = Array.from(projectNameItems).map(item => {
        const p = item.querySelector("p");
        return p ? p.textContent.trim() : "";
      });

      // Erzeuge in jedem Divider (außer keinem – es gibt eh keinen nach Bild 9)
      // ein animierbares Titel-Element
      const projectDividers = spotlightSection.querySelectorAll(".project-divider");
      const dividerTitleEls = [];

      projectDividers.forEach((div, di) => {
        // Wrapper mit overflow:hidden für clip-animation
        const wrapper = document.createElement("div");
        wrapper.className = "divider-title-wrapper";

        const titleEl = document.createElement("span");
        titleEl.className = "divider-title-text";
        // Divider di liegt nach Bild di → zeigt Titel[di]
        titleEl.textContent = projectTitles[di] || "";

        wrapper.appendChild(titleEl);
        // Einfügen zwischen num und mark
        const numSpan = div.querySelector(".project-divider-num");
        div.insertBefore(wrapper, numSpan ? numSpan.nextSibling : null);

        dividerTitleEls.push(titleEl);
        // Startzustand: unsichtbar (clip von unten)
        gsap.set(titleEl, { clipPath: "inset(0 0 100% 0)", opacity: 0 });
      });

      let lastDividerN = -99;
      let lastScrollDir = 1; // 1 = nach unten, -1 = nach oben

      function updateDividerTitles(N, scrollDir) {
        // N = aktiver Bild-Index (0-basiert), -1 wenn kein Bild aktiv
        // Jeder Divider di zeigt den Titel von Bild di (direkt darüber)
        // Wir zeigen den Divider-Titel wenn das aktuelle Bild das Bild ÜBER diesem Divider ist
        // d.h. Divider di ist aktiv wenn N === di
        if (N === lastDividerN) return;
        const prevN = lastDividerN;
        lastDividerN = N;

        dividerTitleEls.forEach((titleEl, di) => {
          const isActive = (di === N);
          const wasActive = (di === prevN);

          if (isActive && !wasActive) {
            // Einblenden: von unten rein wenn scrollen nach unten, von oben wenn rückwärts
            gsap.killTweensOf(titleEl);
            gsap.fromTo(titleEl,
              {
                clipPath: scrollDir > 0 ? "inset(0 0 100% 0)" : "inset(100% 0 0% 0)",
                opacity: 0,
                y: scrollDir > 0 ? 6 : -6,
              },
              {
                clipPath: "inset(0 0 0% 0)",
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power2.out",
              }
            );
          } else if (!isActive && wasActive) {
            // Ausblenden: nach oben wenn scrollen nach unten, nach unten wenn rückwärts
            gsap.killTweensOf(titleEl);
            gsap.to(titleEl, {
              clipPath: scrollDir > 0 ? "inset(100% 0 0% 0)" : "inset(0 0 100% 0)",
              opacity: 0,
              y: scrollDir > 0 ? -6 : 6,
              duration: 0.25,
              ease: "power2.in",
            });
          }
        });
      }

      // Letzter valider Bild-Index für die rechte Spalte + Datum
      let lastValidN  = 0;
      let lastDisplayN = -99; // verhindert unnötige Tween-Starts

      function applySlots(N) {
        // Für die rechte Spalte: wenn kein Bild aktiv (N < 0 oder N >= totalProjectCount),
        // zeigen wir weiterhin den letzten validen Titel — Spalte bleibt nie leer.
        const displayN = (N >= 0 && N < totalProjectCount) ? N : lastValidN;
        if (N >= 0 && N < totalProjectCount) lastValidN = N;

        // Nur animieren wenn sich der angezeigte Index wirklich geändert hat
        const changed = (displayN !== lastDisplayN);
        lastDisplayN = displayN;

        projectNameItems.forEach((item, i) => {
          const slot     = getSlot(i, displayN);
          const dest     = SLOTS[slot];
          const alpha    = SLOT_OPACITY[slot];
          const color    = SLOT_COLOR[slot];
          const numColor = slot === "CENTER" ? "rgba(255,255,255,0.50)" : "rgba(255,255,255,0.15)";

          gsap.killTweensOf(item);

          if (changed) {
            // Kurze Animation: bei normalem Scrollen huscht sie durch, bei schnellem Scrollen
            // wird sie durch killTweensOf direkt unterbrochen → wirkt wie ein Sprung
            gsap.to(item, {
              top: dest,
              opacity: alpha,
              yPercent: -50,
              duration: 0.22,
              ease: "power4.inOut",
            });
          } else {
            // Kein Wechsel → sofort setzen (z.B. beim Rückscrollen innerhalb desselben Titels)
            gsap.set(item, { top: dest, opacity: alpha, yPercent: -50 });
          }

          const textEl = item.querySelector("p");
          const numEl  = item.querySelector(".proj-num");
          if (textEl) {
            gsap.killTweensOf(textEl);
            if (changed) {
              gsap.to(textEl, { color, duration: 0.22, ease: "power4.inOut" });
            } else {
              gsap.set(textEl, { color });
            }
          }
          if (numEl) {
            gsap.killTweensOf(numEl);
            if (changed) {
              gsap.to(numEl, { color: numColor, duration: 0.22, ease: "power4.inOut" });
            } else {
              gsap.set(numEl, { color: numColor });
            }
          }
        });
      }

      ScrollTrigger.create({
        trigger: spotlightSection,
        start: "top top",
        end: `+=${VH * 5}px`,
        pin: true,
        pinSpacing: true,
        // scrub entfernt – onUpdate mit gsap.set verträgt sich nicht mit scrub
        onUpdate: (self) => {
          const progress  = self.progress;
          const scrollDir = self.direction; // 1 = vorwärts, -1 = rückwärts

          gsap.set(projectImagesContainer, { y: progress * moveDistanceImages });
          // Fade in quickly at start, stay visible, fade out only in last 2%
          const dateOpacity = Math.min(1, progress / 0.04) * Math.min(1, (1 - progress) / 0.02);
          gsap.set(projectIndex, { opacity: dateOpacity, y: progress * moveDistanceIndex });


          // N = das Bild das gerade im Zentrum ist oder zuletzt die Mitte passiert hat.
          // Höchster Index bei dem r.top <= mid → das ist das aktive Bild.
          let N = 0;
          for (let i = totalProjectCount - 1; i >= 0; i--) {
            const r = projectImgs[i].getBoundingClientRect();
            if (r.top <= mid) {
              N = i;
              break;
            }
          }

          projectImgs.forEach((img) => {
            const r = img.getBoundingClientRect();
            gsap.set(img, { opacity: (r.top <= mid && r.bottom >= mid) ? 1 : 0.35 });
          });

          // Datum: lastValidN wird in applySlots gesetzt, daher danach aufrufen
          applySlots(N);
          const stableN = (N >= 0 && N < totalProjectCount) ? N : lastValidN;
          projectIndex.textContent = `${String(stableN + 1).padStart(2, "0")}.01.26`;
          updateDividerTitles(N, scrollDir);

          if (connector) {
            const activeImg = Array.from(projectImgs).find(img => {
              const r = img.getBoundingClientRect();
              return r.top <= mid && r.bottom >= mid;
            });
            const cItem = projectNameItems[Math.max(0, Math.min(N, totalProjectCount - 1))];

            if (activeImg && cItem && N >= 0 && N < totalProjectCount) {
              const imgR  = activeImg.getBoundingClientRect();
              const itemR = cItem.getBoundingClientRect();
              const lineX = imgR.right + 10;
              const lineW = Math.max(0, itemR.left - lineX - 10);
              const titleY = SLOTS.CENTER;

              gsap.set(connector, {
                display: "flex", left: lineX, top: titleY,
                width: lineW, opacity: dateOpacity > 0.15 ? 0.5 : 0,
              });
            } else {
              gsap.set(connector, { opacity: 0 });
            }
          }
        },
      });

      // ScrollTrigger nach Proxy-Setup refreshen
      ScrollTrigger.refresh();

    }
  }

  // ─── Section Snap ────────────────────────────────────────────────────────
  const snapSections = Array.from(document.querySelectorAll(".snap-section:not(.spotlight)"));
  let snapTimer  = null;
  let isSnapping = false;

  lenis.on("scroll", () => {
    if (isSnapping) return;
    clearTimeout(snapTimer);
    snapTimer = setTimeout(() => {
      const threshold = window.innerHeight * 0.25;
      let snapTarget = null, minDist = Infinity;
      snapSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const dist = Math.abs(rect.top);
        if (dist < threshold && dist < minDist) { minDist = dist; snapTarget = section; }
      });
      if (snapTarget && minDist > 2) {
        isSnapping = true;
        lenis.scrollTo(snapTarget, {
          duration: 0.8, easing: (t) => 1 - Math.pow(1 - t, 4),
          onComplete: () => { isSnapping = false; },
        });
      }
    }, 120);
  });

  // ─── Navbar ──────────────────────────────────────────────────────────────
  const menuBtn  = document.getElementById("menu04");
  const navbar   = document.getElementById("Navbar");

  if (menuBtn && navbar) {
    const navItems = document.querySelectorAll(".navH");
    const navTexts = document.querySelectorAll(".nav-item-text");
    const navNums  = document.querySelectorAll(".nav-item-num");
    const navLines = document.querySelectorAll(".nav-line");

    gsap.set(navLines, { scaleX: 0 });
    gsap.set(navTexts, { y: 60, opacity: 0 });
    gsap.set(navNums,  { opacity: 0 });

    function openNav() {
      navbar.classList.add("nav-open");
      menuBtn.classList.add("active");
      lenis.stop();
      if (pageLabel) gsap.to(pageLabel, { opacity: 0, duration: 0.2 });
      gsap.to(navTexts, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.08, delay: 0.25 });
      gsap.to(navNums,  { opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.35 });
    }

    function closeNav() {
      gsap.to(navTexts, { y: -40, opacity: 0, duration: 0.3, ease: "power2.in", stagger: 0.04 });
      gsap.to(navNums,  { opacity: 0, duration: 0.2 });
      document.querySelectorAll(".navImgWrapper").forEach(w => gsap.to(w, { opacity: 0, duration: 0.2 }));
      if (pageLabel) gsap.to(pageLabel, { opacity: 1, duration: 0.35, delay: 0.25 });
      setTimeout(() => {
        navbar.classList.remove("nav-open");
        menuBtn.classList.remove("active");
        lenis.start();
      }, 200);
    }

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navbar.classList.contains("nav-open") ? closeNav() : openNav();
    });

    navItems.forEach((item) => {
      const clip = item.querySelector(".navImgWrapper");
      const line = item.querySelector(".nav-line");
      if (!clip) return;
      const rots = [3, -2, 1.5];
      const idx  = Array.from(navItems).indexOf(item);
      gsap.set(clip, { rotation: rots[idx] || 2, xPercent: -50, yPercent: -50, opacity: 0, scale: 0.85 });
      item.addEventListener("mouseenter", () => {
        gsap.to(clip, { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" });
        if (line) gsap.to(line, { scaleX: 1, duration: 0.45, ease: "power3.out" });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(clip, { opacity: 0, scale: 0.85, duration: 0.35, ease: "power3.in" });
        if (line) gsap.to(line, { scaleX: 0, duration: 0.3, ease: "power2.in" });
      });
      item.addEventListener("mousemove", (e) => {
        gsap.to(clip, { x: e.clientX, y: e.clientY, duration: 0.55, ease: "power2.out" });
      });
    });

    const clockEl = document.getElementById("navClock");
    if (clockEl) {
      const tick = () => { clockEl.textContent = new Date().toLocaleTimeString("de-DE"); };
      tick(); setInterval(tick, 1000);
    }

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        closeNav();
        setTimeout(() => {
          lenis.scrollTo(target, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
        }, 650);
      });
    });
  }

  // ─── Custom Cursor ────────────────────────────────────────────────────────
  const cursor = document.createElement("div");
  cursor.id = "cursor";
  document.body.appendChild(cursor);

  window.addEventListener("mousemove", (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
  });

  document.querySelectorAll("a, button, .navH, .project-name-item, .project-divider, .hero-badge").forEach((el) => {
    el.addEventListener("mouseenter", () => gsap.to(cursor, { scale: 3.5, duration: 0.3, ease: "power2.out" }));
    el.addEventListener("mouseleave", () => gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" }));
  });

}); // end window.load