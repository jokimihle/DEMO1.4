import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ─── Event-Daten ─────────────────────────────────────────────────────────────
const eventData = [
  {
    artist: "(Sample Artist)", title: "(Sample Tour Name)", date: "00.00.0000", location: "(Sample City)", category: "(Sample Genre)", hasTicket: true, ticketUrl: "/Impressum.html",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    artist: "(Sample Artist)", title: "(Sample Tour Name)", date: "00.00.0000", location: "(Sample City)", category: "(Sample Genre)", hasTicket: true, ticketUrl: "/Impressum.html",
    desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur adipisci velit."
  },
  {
    artist: "(Sample Artist)", title: "(Sample Tour Name)", date: "00.00.0000", location: "(Sample City)", category: "(Sample Genre)", hasTicket: false, ticketUrl: "",
    desc: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident. Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus."
  },
  {
    artist: "(Sample Artist)", title: "(Sample Tour Name)", date: "00.00.0000", location: "(Sample City)", category: "(Sample Genre)", hasTicket: true, ticketUrl: "/Impressum.html",
    desc: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit."
  },
  {
    artist: "(Sample Artist)", title: "(Sample Tour Name)", date: "00.00.0000", location: "(Sample City)", category: "(Sample Genre)", hasTicket: true, ticketUrl: "/Impressum.html",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
  },
  {
    artist: "(Sample Artist)", title: "(Sample Tour Name)", date: "00.00.0000", location: "(Sample City)", category: "(Sample Genre)", hasTicket: true, ticketUrl: "/Impressum.html",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    artist: "(Sample Artist)", title: "(Sample Tour Name)", date: "00.00.0000", location: "(Sample City)", category: "(Sample Genre)", hasTicket: true, ticketUrl: "/Impressum.html",
    desc: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores quas molestias excepturi sint occaecati cupiditate non provident."
  },
  {
    artist: "(Sample Artist)", title: "(Sample Tour Name)", date: "00.00.0000", location: "(Sample City)", category: "(Sample Genre)", hasTicket: false, ticketUrl: "",
    desc: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur."
  },
  {
    artist: "(Sample Artist)", title: "(Sample Tour Name)", date: "00.00.0000", location: "(Sample City)", category: "(Sample Genre)", hasTicket: true, ticketUrl: "/Impressum.html",
    desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
  },
  {
    artist: "(Sample Artist)", title: "(Sample Tour Name)", date: "00.00.0000", location: "(Sample City)", category: "(Sample Genre)", hasTicket: true, ticketUrl: "/Impressum.html",
    desc: "Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Nemo enim ipsam voluptatem quia voluptas sit aspernatur."
  },
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
            const zone = VH * 0.28;
            const isCenter = r.top <= mid + zone && r.bottom >= mid - zone;
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
  const snapSections = Array.from(document.querySelectorAll(".snap-section"));
  let snapTimer  = null;
  let isSnapping = false;

  lenis.on("scroll", () => {
    if (isSnapping) return;
    clearTimeout(snapTimer);
    snapTimer = setTimeout(() => {
      const threshold = window.innerHeight * 0.20;
      let snapTarget = null, minDist = Infinity;
      snapSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const dist = Math.abs(rect.top);
        if (dist < threshold && dist < minDist) { minDist = dist; snapTarget = section; }
      });
      if (snapTarget && minDist > 2) {
        isSnapping = true;
        const exactTop = snapTarget.getBoundingClientRect().top + window.scrollY;
        lenis.scrollTo(exactTop, {
          duration: 0.55,
          easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
          onComplete: () => { isSnapping = false; },
        });
      }
    }, 80);
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

  // ─── Side Panel ───────────────────────────────────────────────────────────
  let openCardIdx = -1;
  const espPanel   = document.getElementById("eventSidePanel");
  const espContent = document.getElementById("espContent");
  const espClose   = document.getElementById("espClose");
  const espBdrop   = document.getElementById("espBackdrop");

  function buildPanelContent(idx) {
    const ev  = eventData[idx];
    if (!ev) return "";
    const num     = String(idx + 1).padStart(2, "0");
    const imgSrc  = document.querySelector(`.project-img[data-index="${idx}"] img`)?.src || "";
    const dateParts = ev.date.split(".");
    const dateDisplay = dateParts.length === 3
      ? `${dateParts[0]} — ${dateParts[1]} — ${dateParts[2]}`
      : ev.date;
    const ticketBtn = ev.hasTicket
      ? `<a href="${ev.ticketUrl}" class="esp-ticket" target="_blank"><span>Tickets kaufen</span><span class="esp-ticket-arrow">↗</span></a>`
      : "";
    return `
      <img src="${imgSrc}" class="esp-bg-img" alt="" aria-hidden="true" />
      <div class="esp-left">
        <div class="esp-vline" aria-hidden="true"></div>
        <p class="esp-num">${num} — ${ev.category}</p>
        <p class="esp-artist">${ev.artist}</p>
        <h2 class="esp-title">${ev.title}</h2>
        <div class="esp-rule">
          <span class="esp-rule-dot"></span>
          <span class="esp-rule-line"></span>
          <span class="esp-rule-dot"></span>
        </div>
        <div class="esp-date">${dateDisplay}</div>
        <div class="esp-location">
          <span class="esp-loc-label">Location</span>
          <span class="esp-loc-val">${ev.location}</span>
        </div>
        <p class="esp-desc">${ev.desc}</p>
        <div class="esp-actions">
          ${ticketBtn}
          <a href="#" class="esp-info">↗ weitere Infos</a>
        </div>
      </div>`;
  }

  function openCard(idx) {
    if (openCardIdx === idx) return;
    openCardIdx = idx;

    espContent.innerHTML = buildPanelContent(idx);
    espPanel.setAttribute("aria-hidden", "false");

    gsap.set(espPanel, { x: "100%" });
    gsap.to(espPanel, { x: "0%", duration: 0.38, ease: "expo.out" });
    gsap.to(espBdrop, { opacity: 1, duration: 0.25, ease: "power2.out", pointerEvents: "all" });

    gsap.fromTo(espContent.querySelector(".esp-bg-img"),
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.05 }
    );
    const els = espContent.querySelectorAll(".esp-num, .esp-artist, .esp-title, .esp-rule, .esp-date, .esp-location, .esp-desc, .esp-actions");
    gsap.fromTo(els,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.26, stagger: 0.045, ease: "power2.out", delay: 0.18 }
    );

    document.querySelectorAll(".project-name-item").forEach(item =>
      gsap.to(item, { opacity: 0, x: 28, duration: 0.22, ease: "power2.in" })
    );
    const projectIndexEl = document.querySelector(".project-index");
    if (projectIndexEl) gsap.to(projectIndexEl, { opacity: 0, x: -28, duration: 0.22, ease: "power2.in" });
    document.querySelectorAll(".project-connector").forEach(c => gsap.to(c, { opacity: 0, duration: 0.15 }));
  }

  function closeCard(animate = true) {
    if (openCardIdx === -1) return;
    openCardIdx = -1;
    espPanel.setAttribute("aria-hidden", "true");

    if (animate) {
      gsap.to(espPanel, { x: "100%", duration: 0.28, ease: "expo.in" });
      gsap.to(espBdrop, { opacity: 0, duration: 0.2, ease: "power2.in", pointerEvents: "none" });
    } else {
      gsap.set(espPanel, { x: "100%" });
      gsap.set(espBdrop, { opacity: 0, pointerEvents: "none" });
    }

    document.querySelectorAll(".project-name-item").forEach(item =>
      gsap.to(item, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out", delay: animate ? 0.1 : 0 })
    );
    const projectIndexEl2 = document.querySelector(".project-index");
    if (projectIndexEl2) gsap.to(projectIndexEl2, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out", delay: animate ? 0.1 : 0 });
    setTimeout(() => {
      document.querySelectorAll(".project-connector").forEach(c => gsap.set(c, { clearProps: "opacity" }));
    }, animate ? 260 : 0);
  }

  espClose.addEventListener("click", () => closeCard(true));
  espBdrop.addEventListener("click", () => closeCard(true));

  // Klick auf Bild öffnet/schließt Panel
  document.querySelectorAll(".project-img").forEach((imgEl) => {
    imgEl.style.cursor = "pointer";
    imgEl.addEventListener("click", () => {
      const idx = parseInt(imgEl.dataset.index, 10);
      if (openCardIdx === idx) closeCard(true);
      else openCard(idx);
    });
  });

  // calibrateExtLines entfernt – divider-ext-left/right werden nicht mehr verwendet.

  // ─── Klick auf Titel-Item öffnet Panel ───────────────────────────────────
  document.querySelectorAll(".project-name-item").forEach((item) => {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      const idx = parseInt(item.dataset.index, 10);
      if (openCardIdx === idx) closeCard(true);
      else openCard(idx);
    });
  });

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

  // ─── Venue Section Animation ─────────────────────────────────────────────
  const venueSection = document.getElementById("location");
  if (venueSection) {
    const svg     = venueSection.querySelector(".floorplan-svg");
    const stats   = venueSection.querySelectorAll(".venue-stat");
    const header  = venueSection.querySelector(".venue-header");
    const bottom  = venueSection.querySelector(".venue-bottom-bar");
    const corners = venueSection.querySelectorAll(".fp-corner");

    // SVG fade + scale in
    if (svg) {
      gsap.fromTo(svg,
        { opacity: 0, scale: 0.97, transformOrigin: "50% 50%" },
        { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: venueSection, start: "top 80%", once: true } }
      );
    }

    // Eckmarken einblenden
    gsap.to(corners, {
      opacity: 1, duration: 0.8, stagger: 0.12, ease: "power2.out",
      scrollTrigger: { trigger: venueSection, start: "top 75%", once: true },
    });


    // Header + bottom bar slide in
    gsap.fromTo([header, bottom],
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: venueSection, start: "top 80%", once: true } }
    );

    // Corner stats: count-up, jedes Mal wenn Section sichtbar wird
    const dirs = { "vs-tl": -22, "vs-bl": -22, "vs-tr": 22, "vs-br": 22 };
    ScrollTrigger.create({
      trigger: venueSection,
      start: "top 75%",
      end: "bottom top",
      onEnter:     () => runCountUp(),
      onEnterBack: () => runCountUp(),
      onLeave:     () => resetStats(),
      onLeaveBack: () => resetStats(),
    });

    function runCountUp() {
      stats.forEach((block, i) => {
        const cls   = [...block.classList].find(c => dirs[c] !== undefined);
        const xFrom = cls ? dirs[cls] : 0;
        const el    = block.querySelector(".vsb-value");
        const target = parseInt(el.dataset.target, 10);
        const obj   = { val: 0 };
        gsap.fromTo(block,
          { opacity: 0, x: xFrom },
          { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", delay: i * 0.08 }
        );
        gsap.to(obj, {
          val: target, duration: 1.6, ease: "power2.out", delay: i * 0.08,
          onUpdate() { el.textContent = Math.round(obj.val).toLocaleString("de-DE"); },
        });
      });
    }

    function resetStats() {
      stats.forEach(block => {
        gsap.set(block, { opacity: 0 });
        const el = block.querySelector(".vsb-value");
        el.textContent = "0";
      });
    }
  }

// ─── Floorplan Room Hover Cards ──────────────────────────────────────────────
(function () {
  const rooms = {
    "Hauptsaal": {
      type: "info",
      items: ["Bis zu 600 Personen", "Große Hauptbühne", "Professionelle Licht- & Tonanlage", "Klimatisiert"],
    },
    "Bühne": {
      type: "info",
      items: ["Großzügige Bühnenfläche", "Vollständig beleuchtet", "Professionelles Equipment", "Rampe zum Hauptsaal"],
    },
    "Backstage": {
      type: "info",
      items: ["3 Künstlerkabinen", "Catering-Station", "Eigene Dusche & Lounge", "Direktzugang Bühne"],
    },
    "Produktion": {
      type: "info",
      items: ["Ton- & Lichtregie", "Zentraler Technikbereich", "Streaming-fähig", "Direktsicht zur Bühne"],
    },
    "Bar": {
      type: "bar",
      items: [
        { label: "Dock50 Sour", price: "9 €" },
        { label: "Draft Beer", price: "4 €" },
        { label: "Wein & Sekt", price: "6 €" },
        { label: "Signature Cocktail", price: "11 €" },
        { label: "Softdrinks", price: "3 €" },
      ],
    },
    "VIP Lounge": {
      type: "info",
      items: ["Bis zu 80 Personen", "Exklusiver Bereich", "Eigener Barservice", "Direkte Bühnensicht"],
    },
  };

  const card = document.createElement("div");
  card.className = "fp-card";
  document.body.appendChild(card);

  function buildCard(name) {
    const data = rooms[name];
    if (!data) return;
    const isBar = data.type === "bar";
    const isMenu = data.type === "menu";
    card.className = "fp-card" + (isBar ? " fp-card--bar" : isMenu ? " fp-card--menu" : "");
    let html = `<div class="fp-card-title">${isBar ? "Getränkekarte" : name}</div>`;
    data.items.forEach(item => {
      if (typeof item === "string") {
        html += `<div class="fp-card-item">${item}</div>`;
      } else if (isBar) {
        html += `<div class="fp-card-item"><span>${item.label}</span><span class="fp-card-leader"></span><span class="fp-card-price">${item.price}</span></div>`;
      } else {
        html += `<div class="fp-card-item"><span>${item.label}</span><span class="fp-card-price">${item.price}</span></div>`;
      }
    });
    card.innerHTML = html;
  }

  document.querySelectorAll(".fp-room").forEach(room => {
    room.addEventListener("mouseenter", () => {
      buildCard(room.dataset.room);
      card.classList.add("fp-card--visible");
    });
    room.addEventListener("mousemove", e => {
      card.style.left = (e.clientX + 20) + "px";
      card.style.top  = (e.clientY - 20) + "px";
    });
    room.addEventListener("mouseleave", () => {
      card.classList.remove("fp-card--visible");
    });
  });
})();

}); // end window.load