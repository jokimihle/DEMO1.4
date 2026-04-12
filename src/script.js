import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ─── Event-Daten ─────────────────────────────────────────────────────────────
const eventData = [
  { artist: "Bruno Mars",     title: "The Romantic Tour",          date: "12.04.2026", location: "Flensburg", category: "Pop / R&B",      desc: "Eine unvergessliche Nacht mit dem King of Pop-Soul.",          hasTicket: true,  ticketUrl: "#" },
  { artist: "Shakira",        title: "Las Mujeres World Tour",     date: "28.05.2026", location: "Hamburg",   category: "Pop / Latin",     desc: "Weltklasse-Entertainment und kolumbianische Energie.",         hasTicket: true,  ticketUrl: "#" },
  { artist: "Megan Moroney",  title: "The Cloud 9 Tour",           date: "14.06.2026", location: "Berlin",    category: "Country",         desc: "Country-Sound aus Nashville live in Deutschland.",             hasTicket: false, ticketUrl: "" },
  { artist: "Ed Sheeran",     title: "Loop Tour",                  date: "03.07.2026", location: "Kiel",      category: "Pop / Folk",      desc: "Der britische Songwriter und seine Loop-Magie live.",          hasTicket: true,  ticketUrl: "#" },
  { artist: "Olivia Dean",    title: "The Art of Loving Live",     date: "19.07.2026", location: "Flensburg", category: "Soul / Pop",      desc: "Britische Soul-Musik mit warmem Groove und tiefer Emotion.",  hasTicket: true,  ticketUrl: "#" },
  { artist: "Bad Bunny",      title: "Stadion-Shows (UK)",         date: "02.08.2026", location: "Hamburg",   category: "Latin / Trap",    desc: "Der Reggaeton-König bringt seine Stadium-Show nach Deutschland.", hasTicket: true, ticketUrl: "#" },
  { artist: "Simple Plan & 3OH!3", title: "Simple Plan 3OH!3 Tour", date: "16.08.2026", location: "Flensburg", category: "Rock / Pop-Punk", desc: "Zwei Kultbands der 2000er auf einer gemeinsamen Tour.",       hasTicket: true,  ticketUrl: "#" },
  { artist: "Gianna Nannini", title: "Jubiläumskonzert",           date: "05.09.2026", location: "Kiel",      category: "Pop / Rock",      desc: "50 Jahre Rocklegende – die Italienerin feiert ihr Bühnenjubiläum.", hasTicket: false, ticketUrl: "" },
  { artist: "Europe",         title: "Jubiläums-Tour",             date: "20.09.2026", location: "Kiel",      category: "Rock",            desc: "Die schwedischen Rock-Ikonen mit Klassikern wie 'The Final Countdown'.", hasTicket: true, ticketUrl: "#" },
  { artist: "Kanye West",     title: "Ye Live",                    date: "10.10.2026", location: "Hamburg",   category: "Hip-Hop",         desc: "Das kontroverse Genie präsentiert sein neuestes Album live.", hasTicket: true,  ticketUrl: "#" },
];

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
      const locationEl = document.getElementById("contact");
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
    { id: "contact",   index: 3 },
    { id: "footer",    index: 4 },
  ];
  const labelItems   = document.querySelectorAll(".page-label-item");
  const pageLabel    = document.getElementById("pageLabel");
  let currentSection = 0;

  if (labelItems.length) {
    function switchLabel(newIndex) {
      if (newIndex === currentSection) return;
      currentSection = newIndex;

      // Filter-Panel nur in der Events-Section (index 1) zeigen
      const _sfPanel = document.getElementById("spotlightFilter");
      if (_sfPanel) {
        if (newIndex === 1) _sfPanel.classList.add("sf-visible");
        else _sfPanel.classList.remove("sf-visible");
      }

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

  // Outer-scope refs für Card-Logik (außerhalb des spotlight if-Blocks erreichbar)
  let moveDistanceImages = 0;
  let moveDistanceOffset = 0;
  let _projectImagesContainer = null;
  let _projectIndex = null;

  if (spotlightSection) {
    const projectIndex           = spotlightSection.querySelector(".project-index h2");
    const projectImgs            = spotlightSection.querySelectorAll(".project-img");
    const projectImagesContainer = spotlightSection.querySelector(".project-images");
    const projectNameItems       = spotlightSection.querySelectorAll(".project-name-item");
    const connector              = spotlightSection.querySelector(".project-connector");
    _projectImagesContainer = projectImagesContainer;
    _projectIndex = projectIndex;
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
      moveDistanceImages = VH - imgsH;
      moveDistanceOffset = 0;

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
      projectIndex.textContent = eventData[0]?.date ?? "01.01.26";
      if (connector) gsap.set(connector, { display: "none", opacity: 0 });

      // ─── Linker Connector (Datum ↔ Bild) ─────────────────────────────────
      const connectorLeft = document.createElement("div");
      connectorLeft.className = "project-connector";
      spotlightSection.appendChild(connectorLeft);
      connectorLeft.innerHTML = `<div class="project-connector-line" style="order:1;"></div><div class="project-connector-dot" style="order:2;"></div>`;
      gsap.set(connectorLeft, { display: "none", opacity: 0 });

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

      // divider-ext-left/right entfernt – JS-Connectors übernehmen diese Funktion
      // und sind korrekt an Datum- und Titel-Element verankert.

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

      // ─── Badge-Button an jedem Projektbild ───────────────────────────────
      projectImgs.forEach((imgEl) => {
        const badge = document.createElement("div");
        badge.className = "project-img-badge";
        badge.innerHTML = `
          <svg viewBox="0 0 80 80" class="project-badge-ring">
            <defs>
              <path id="badgeCircleProj" d="M 40,40 m -28,0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0"/>
            </defs>
            <text font-size="7.5" fill="rgba(255,255,255,0.85)" font-family="monospace" letter-spacing="2.8">
              <textPath href="#badgeCircleProj">VIEW · EVENT · INFO ·&nbsp;</textPath>
            </text>
          </svg>
          <span class="project-badge-center">↗</span>
        `;
        imgEl.appendChild(badge);

        // ─── Badge-Ring: langsame Dauerdrehung ───────────────────────────────
        const ring = badge.querySelector(".project-badge-ring");
        const center = badge.querySelector(".project-badge-center");
        // Dauerdrehung bei normaler Geschwindigkeit
        const ringTween = gsap.to(ring, {
          rotation: 360, duration: 18, ease: "none", repeat: -1, transformOrigin: "50% 50%",
        });

        // ─── Hover: beschleunigen, Skalierung, cursor-Feedback ───────────────
        badge.style.cursor = "pointer";
        badge.addEventListener("mouseenter", () => {
          gsap.to(badge, { scale: 1.14, duration: 0.35, ease: "power2.out" });
          gsap.to(center, { scale: 1.25, opacity: 1, duration: 0.3, ease: "power2.out" });
          ringTween.timeScale(3.5); // Ring dreht sich schneller
          // Custom-Cursor vergrößern
          const cur = document.querySelector(".cursor");
          if (cur) gsap.to(cur, { scale: 3.5, duration: 0.3, ease: "power2.out" });
        });
        badge.addEventListener("mouseleave", () => {
          gsap.to(badge, { scale: 1, duration: 0.4, ease: "power2.out" });
          gsap.to(center, { scale: 1, opacity: 0.9, duration: 0.35, ease: "power2.out" });
          ringTween.timeScale(1); // zurück zur normalen Geschwindigkeit
          const cur = document.querySelector(".cursor");
          if (cur) gsap.to(cur, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });
      let lastScrollDir = 1; // 1 = nach unten, -1 = nach oben

      function updateDividerTitles(N, scrollDir) {
        // N = aktiver Bild-Index (0-basiert), -1 wenn kein Bild aktiv
        // Jeder Divider di zeigt den Titel von Bild di (direkt darüber)
        // Wir zeigen den Divider-Titel wenn das aktuelle Bild das Bild ÜBER diesem Divider ist
        // d.h. Divider di ist aktiv wenn N === di

        // ─── Extending Lines: aktiven Divider markieren ─────────────────────
        projectDividers.forEach((div, di) => {
          div.classList.toggle("active", di === N);
        });

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

        // ─── Wenn eine Card offen ist: keine Slot-Animationen starten ────────
        // Sonst würde gsap.killTweensOf() die Slide-Out-Animation von openCard abbrechen.
        if (openCardIdx !== -1) return;

        // Datum wechselt im gleichen Rhythmus wie der Titel
        if (changed) {
          gsap.to(projectIndex, { opacity: 0, duration: 0.12, ease: "power2.in", onComplete: () => {
            projectIndex.textContent = eventData[displayN]?.date ?? `${String(displayN + 1).padStart(2, "0")}.01.26`;
            gsap.to(projectIndex, { opacity: 1, duration: 0.2, ease: "power2.out" });
          }});
        }

        projectNameItems.forEach((item, i) => {
          const slot        = getSlot(i, displayN);
          const dest        = SLOTS[slot];
          const filteredOut = window._activeLocFilter && window._activeLocFilter !== "ALL" && item.dataset.location !== window._activeLocFilter;
          const alpha       = filteredOut ? 0.05 : SLOT_OPACITY[slot];
          const color       = filteredOut ? "rgba(255,255,255,0.07)" : SLOT_COLOR[slot];
          const numColor    = (slot === "CENTER" && !filteredOut) ? "rgba(255,255,255,0.50)" : "rgba(255,255,255,0.08)";

          gsap.killTweensOf(item);

          if (changed) {
            gsap.to(item, {
              top: dest,
              opacity: alpha,
              yPercent: -50,
              x: 0,
              duration: 0.22,
              ease: "power4.inOut",
            });
          } else {
            gsap.set(item, { top: dest, opacity: alpha, yPercent: -50, x: 0 });
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

          gsap.set(projectImagesContainer, { y: progress * moveDistanceImages + moveDistanceOffset });
          // Fade in quickly at start, stay visible, fade out only in last 2%
          const dateOpacity = Math.min(1, progress / 0.04) * Math.min(1, (1 - progress) / 0.02);
          gsap.set(projectIndex, { opacity: dateOpacity });


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
            const filteredOut = window._activeLocFilter && window._activeLocFilter !== "ALL" && img.dataset.location !== window._activeLocFilter;
            const isCenter = r.top <= mid && r.bottom >= mid;
            gsap.set(img, { opacity: filteredOut ? 0.06 : (isCenter ? 1 : 0.35) });
          });

          applySlots(N);
          updateDividerTitles(N, scrollDir);

          if (connector && openCardIdx === -1) {
            const activeImg = Array.from(projectImgs).find(img => {
              const r = img.getBoundingClientRect();
              return r.top <= mid && r.bottom >= mid;
            });
            const cItem = projectNameItems[Math.max(0, Math.min(N, totalProjectCount - 1))];

            if (activeImg && cItem && N >= 0 && N < totalProjectCount) {
              const imgR  = activeImg.getBoundingClientRect();
              const itemR = cItem.getBoundingClientRect();
              const idxR  = projectIndex.getBoundingClientRect();

              // Rechter Connector: Y-Mittelpunkt des Titel-Elements
              const lineX   = imgR.right + 10;
              const lineW   = Math.max(0, itemR.left - lineX - 10);
              const rightY  = itemR.top + itemR.height / 2;

              gsap.set(connector, {
                display: "flex", left: lineX, top: rightY,
                width: lineW, opacity: dateOpacity > 0.15 ? 0.5 : 0,
              });

              // Linker Connector: Y-Mittelpunkt des Datums-Elements
              const leftLineEnd   = imgR.left - 10;
              const leftLineStart = idxR.right + 10;
              const leftLineW     = Math.max(0, leftLineEnd - leftLineStart);
              const leftY         = idxR.top + idxR.height / 2;
              gsap.set(connectorLeft, {
                display: "flex", left: leftLineStart, top: leftY,
                width: leftLineW, opacity: dateOpacity > 0.15 ? 0.5 : 0,
              });
            } else {
              gsap.set(connector, { opacity: 0 });
              gsap.set(connectorLeft, { opacity: 0 });
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

  document.querySelectorAll("a, button, .navH, .project-name-item, .project-divider, .hero-badge, .project-index").forEach((el) => {
    el.addEventListener("mouseenter", () => gsap.to(cursor, { scale: 3.5, duration: 0.3, ease: "power2.out" }));
    el.addEventListener("mouseleave", () => gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" }));
  });

  // ─── Inline Info-Cards ─────────────────────────────────────────────────────
  const infoCards = Array.from(document.querySelectorAll(".project-info-card"));
  let openCardIdx = -1;
  const CARD_VH   = window.innerHeight * 0.50; // 50vh

  function buildCardInner(idx) {
    const ev = eventData[idx];
    if (!ev) return "";
    const num = String(idx + 1).padStart(2, "0");
    const ticketBtn = ev.hasTicket
      ? `<a href="${ev.ticketUrl}" class="edc-btn edc-btn-ticket" target="_blank">Tickets ↗</a>`
      : "";
    return `
      <div class="project-info-card-inner">
        <!-- Schließen + Ticket oben rechts -->
        <div class="edc-top-right">
          ${ticketBtn}
          <button class="edc-close pic-close" data-index="${idx}">✕</button>
        </div>

        <!-- HEADER: Künstler + Titel oben links -->
        <div class="edc-header">
          <p class="edc-num">${num} — ${ev.category}</p>
          <p class="edc-artist">${ev.artist}</p>
          <h2 class="edc-title">${ev.title}</h2>
        </div>

        <!-- BODY: Bilder links | Text rechts -->
        <div class="edc-body">
          <div class="edc-visuals">
            <div class="edc-img-a"></div>
            <div class="edc-img-b"></div>
          </div>
          <div class="edc-content">
            <div class="edc-text-block">
              <p class="edc-desc">${ev.desc}</p>
              <p class="edc-desc edc-desc-sub">DOCK50 präsentiert – Live in Flensburg. Einlass ab 19:00 Uhr, Konzertbeginn 21:00 Uhr.</p>
            </div>
            <div class="edc-bottom-row">
              <div class="edc-tags">
                <span class="edc-tag">${ev.date}</span>
                <span class="edc-tag">${ev.location}</span>
              </div>
              <a href="#" class="edc-btn edc-btn-info">↗ weitere Infos</a>
            </div>
          </div>
        </div>
      </div>`;
  }

  // ─── ScrollTrigger-Instanz merken um progress abzufragen ─────────────────
  let spotST = null;

  function getSpotProgress() {
    if (spotST) return spotST.progress;
    const st = ScrollTrigger.getAll().find(t => t.trigger === document.querySelector(".spotlight"));
    if (st) spotST = st;
    return st ? st.progress : 0;
  }

  function openCard(idx) {
    if (openCardIdx === idx) return; // schon offen
    if (openCardIdx !== -1) closeCard(false); // vorherige schließen (ohne anim-wait)

    const card = infoCards[idx];
    const P    = getSpotProgress();

    card.innerHTML = buildCardInner(idx);
    card.querySelector(".pic-close").addEventListener("click", () => closeCard(true));

    // Viewport-Verschiebung: aktives Bild + Card so verschieben, dass
    // Abstand oben (Bild-Oberkante → Viewport-Top) = Abstand unten (Card-Unterkante → Viewport-Bottom)
    const Y_initial = P * moveDistanceImages + moveDistanceOffset;
    const activeImgEl = document.querySelector(`.project-img[data-index="${idx}"]`);
    const imgRect = activeImgEl?.getBoundingClientRect();
    const VH_now  = window.innerHeight;
    // Exakte Verschiebung: (Bild-Oberkante + Card/2) - (VH/2 - imgH/2)
    // → Bild soll so stehen, dass Mitte von (Bild+Card) bei VH/2 liegt
    const imgH    = imgRect ? imgRect.height : CARD_VH;
    const actualShift = imgRect
      ? imgRect.top - (VH_now - imgH - CARD_VH) / 2
      : CARD_VH / 2;

    gsap.fromTo(card, { height: 0 }, {
      height: CARD_VH,
      duration: 0.65,
      ease: "expo.out",
      onUpdate() {
        if (!_projectImagesContainer) return;
        const tweenProg = this.progress();
        moveDistanceImages = VH_now - _projectImagesContainer.offsetHeight;
        const targetY = Y_initial - actualShift * tweenProg;
        moveDistanceOffset = targetY - P * moveDistanceImages;
        gsap.set(_projectImagesContainer, { y: targetY });
      },
    });

    // Inhalt einblenden (leicht nach oben gleiten)
    const inner = card.querySelector(".project-info-card-inner");
    if (inner) {
      gsap.fromTo(inner, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", delay: 0.18 });
    }

    openCardIdx = idx;

    // ─── Container hochziehen damit Card über fixed Elementen liegt ─────────
    if (_projectImagesContainer) gsap.set(_projectImagesContainer, { zIndex: 20 });

    // ─── Titel-Items und Datum wegschieben ────────────────────────────────
    document.querySelectorAll(".project-name-item").forEach(item => {
      gsap.to(item, { opacity: 0, x: 28, duration: 0.28, ease: "power2.in" });
    });
    const projectIndexEl = document.querySelector(".project-index");
    if (projectIndexEl) gsap.to(projectIndexEl, { opacity: 0, x: -28, duration: 0.28, ease: "power2.in" });
    const connectors = document.querySelectorAll(".project-connector");
    connectors.forEach(c => gsap.to(c, { opacity: 0, duration: 0.2 }));

    // ─── Aktives Bild hervorheben ─────────────────────────────────────────
    const imgEl = document.querySelector(`.project-img[data-index="${idx}"]`);
    if (imgEl) {
      gsap.to(imgEl, { outline: "1px solid rgba(255,255,255,0.35)", duration: 0.3 });
    }
  }

  function closeCard(animate = true) {
    if (openCardIdx === -1) return;
    const idx  = openCardIdx;
    const card = infoCards[idx];
    const P    = getSpotProgress();
    openCardIdx = -1;

    // Beim Schließen: Viewport-Verschiebung umkehren
    // Die Verschiebung beim Öffnen war "actualShift" – beim Schließen gleiche Distanz zurück.
    // Da wir die beim Öffnen gemessene Distanz nicht mehr haben, messen wir neu:
    // Aktuell sitzen wir bei Y_initial_close (= nach Verschiebung beim Öffnen).
    // Der ursprüngliche Y war Y_initial_close + actualShift_close.
    const Y_initial_close = P * moveDistanceImages + moveDistanceOffset;
    // Erneut messen: Bild ist jetzt verschoben, reverse-Shift aus aktueller Position berechnen
    const closeImgEl   = document.querySelector(`.project-img[data-index="${idx}"]`);
    const closeImgRect = closeImgEl?.getBoundingClientRect();
    const VH_close     = window.innerHeight;
    const closeImgH    = closeImgRect ? closeImgRect.height : CARD_VH;
    // Ziel beim Schließen: Bild wieder bei VH/2 zentrieren (ohne Card)
    const closeTargetImgTop = VH_close / 2 - closeImgH / 2;
    const closeShift = closeImgRect ? closeImgRect.top - closeTargetImgTop : CARD_VH / 2;
    const Y_restored = Y_initial_close - closeShift; // Container muss nach unten (weniger negativ)

    const doClose = () => { card.innerHTML = ""; };

    if (animate) {
      const inner = card.querySelector(".project-info-card-inner");
      if (inner) {
        gsap.to(inner, { y: -12, opacity: 0, duration: 0.2, ease: "power2.in" });
      }
      gsap.to(card, {
        height: 0, duration: 0.5, ease: "expo.in", delay: 0.1,
        onUpdate() {
          if (!_projectImagesContainer) return;
          const tweenProg = this.progress();
          moveDistanceImages = VH_close - _projectImagesContainer.offsetHeight;
          const targetY = Y_initial_close + (-closeShift) * tweenProg;
          moveDistanceOffset = targetY - P * moveDistanceImages;
          gsap.set(_projectImagesContainer, { y: targetY });
        },
        onComplete: doClose,
      });
    } else {
      gsap.set(card, { height: 0 });
      if (_projectImagesContainer) {
        moveDistanceImages = VH_close - _projectImagesContainer.offsetHeight;
        const instantY = Y_initial_close + (-closeShift);
        moveDistanceOffset = instantY - P * moveDistanceImages;
        gsap.set(_projectImagesContainer, { y: instantY });
      }
      doClose();
    }

    // ─── Container wieder auf normalen z-index ────────────────────────────
    if (_projectImagesContainer) gsap.set(_projectImagesContainer, { zIndex: 0 });

    // ─── Titel, Datum und Connectors zurückschieben ───────────────────────
    document.querySelectorAll(".project-name-item").forEach(item => {
      gsap.to(item, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out", delay: animate ? 0.3 : 0 });
    });
    const projectIndexEl2 = document.querySelector(".project-index");
    if (projectIndexEl2) gsap.to(projectIndexEl2, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out", delay: animate ? 0.3 : 0 });
    // Connectors: Sichtbarkeit wird beim nächsten onUpdate neu gesetzt → kurz warten
    setTimeout(() => {
      document.querySelectorAll(".project-connector").forEach(c => gsap.set(c, { clearProps: "opacity" }));
    }, animate ? 450 : 0);

    // ─── Bild-Hervorhebung zurücksetzen ───────────────────────────────────
    const imgEl = document.querySelector(`.project-img[data-index="${idx}"]`);
    if (imgEl) {
      gsap.to(imgEl, { outline: "none", duration: 0.2 });
    }
  }

  // Klick auf Bild oder Info-Button öffnet Card
  document.querySelectorAll(".project-img").forEach((imgEl) => {
    imgEl.style.cursor = "pointer";
    imgEl.addEventListener("click", () => {
      const idx = parseInt(imgEl.dataset.index, 10);
      if (openCardIdx === idx) closeCard(true);
      else openCard(idx);
    });
  });

  // calibrateExtLines entfernt – divider-ext-left/right werden nicht mehr verwendet.

  // ─── Info-Button rechts ────────────────────────────────────────────────────
  const infoBtn = document.getElementById("eventInfoBtn");
  let currentActiveIdx = 0;

  infoBtn.addEventListener("click", () => {
    if (openCardIdx === currentActiveIdx) closeCard(true);
    else openCard(currentActiveIdx);
  });

  // ─── Filter Bar ───────────────────────────────────────────────────────────
  const filterBar   = document.getElementById("eventFilter");
  const filterItems = filterBar.querySelectorAll(".ef-item");
  const indicator   = filterBar.querySelector(".ef-indicator");

  function moveIndicator(activeEl) {
    if (!indicator || !activeEl) return;
    const trackRect  = filterBar.querySelector(".ef-track").getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();
    indicator.style.top    = (activeRect.top - trackRect.top) + "px";
    indicator.style.height = activeRect.height + "px";
  }

  // Initiale Position setzen
  moveIndicator(filterBar.querySelector(".ef-item.active"));

  filterItems.forEach((item) => {
    item.addEventListener("click", () => {
      const loc = item.dataset.filter;
      window._activeLocFilter = loc === "all" ? "ALL" : loc;

      filterItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      moveIndicator(item);

      // Bilder: passende hell lassen, nicht passende dimmen
      document.querySelectorAll(".project-img[data-location]").forEach((img) => {
        const match = loc === "all" || img.dataset.location === loc;
        gsap.to(img, { opacity: match ? 0.35 : 0.06, duration: 0.35, ease: "power2.out" });
      });
      // Titel: passende hell lassen, nicht passende dimmen
      document.querySelectorAll(".project-name-item[data-location]").forEach((el) => {
        const match  = loc === "all" || el.dataset.location === loc;
        const textEl = el.querySelector("p");
        const numEl  = el.querySelector(".proj-num");
        if (textEl) gsap.to(textEl, { color: match ? null : "rgba(255,255,255,0.07)", duration: 0.35 });
        if (numEl)  gsap.to(numEl,  { color: match ? null : "rgba(255,255,255,0.07)", duration: 0.35 });
      });
    });
  });

  // ─── Filter + Info-Button visibility ─────────────────────────────────────
  ScrollTrigger.create({
    trigger: ".spotlight",
    start: "top top",
    end: `+=${window.innerHeight * 5}px`,
    onEnter:     () => { filterBar.classList.add("visible"); infoBtn.classList.add("visible"); },
    onLeave:     () => { filterBar.classList.remove("visible"); infoBtn.classList.remove("visible"); },
    onEnterBack: () => { filterBar.classList.add("visible"); infoBtn.classList.add("visible"); },
    onLeaveBack: () => { filterBar.classList.remove("visible"); infoBtn.classList.remove("visible"); },
  });

  // currentActiveIdx für Info-Button synchron halten
  lenis.on("scroll", () => {
    const vh2  = window.innerHeight / 2;
    document.querySelectorAll(".project-img").forEach((img) => {
      const r = img.getBoundingClientRect();
      if (r.top <= vh2 && r.bottom >= vh2) {
        currentActiveIdx = parseInt(img.dataset.index, 10);
      }
    });
  });

  window._activeLocFilter = "ALL";

}); // end window.load