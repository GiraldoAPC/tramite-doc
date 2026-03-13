import { useEffect, useRef, useState } from "react";

export default function LegacyPublicPage({ src, title }) {
  const frameRef = useRef(null);
  const resizeTimerRef = useRef(null);
  const modalObserverRef = useRef(null);
  const [frameHeight, setFrameHeight] = useState("100vh");
  const [frameReady, setFrameReady] = useState(false);
  const [frameSrc, setFrameSrc] = useState(src);
  const [frameOverlayMode, setFrameOverlayMode] = useState(false);

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  useEffect(() => {
    setFrameHeight("100vh");
    setFrameReady(false);
    setFrameSrc(`${src}${src.includes("?") ? "&" : "?"}v=${Date.now()}`);
  }, [src]);

  useEffect(() => {
    return () => {
      if (resizeTimerRef.current) {
        window.clearInterval(resizeTimerRef.current);
        resizeTimerRef.current = null;
      }
      if (modalObserverRef.current) {
        modalObserverRef.current.disconnect();
        modalObserverRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    setFrameOverlayMode(false);
  }, [src]);

  useEffect(() => {
    document.body.style.overflow = frameOverlayMode ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [frameOverlayMode]);

  const handleLoad = () => {
    const doc = frameRef.current?.contentDocument;
    if (!doc) return;

    if (resizeTimerRef.current) {
      window.clearInterval(resizeTimerRef.current);
      resizeTimerRef.current = null;
    }
    if (modalObserverRef.current) {
      modalObserverRef.current.disconnect();
      modalObserverRef.current = null;
    }

    const currentSrc = frameRef.current?.getAttribute("src") || src;
    const isHome = currentSrc.includes("/index.html");
    const isArbitraje = currentSrc.includes("/arbitraje.html");
    const isOrganizacion = currentSrc.includes("/organizacion.html");

    if (isArbitraje) {
      // `arbitraje.html` carga también `assets/css/index.css` (home) y rompe el
      // hero por colisión de clases globales (.hero, .hero-overlay, etc.).
      doc
        .querySelectorAll('link[rel="stylesheet"]')
        .forEach((link) => {
          const href = link.getAttribute("href") || "";
          if (href.endsWith("assets/css/index.css")) {
            link.remove();
          }
        });
    }

    const heroTargetPx = Math.max(500, window.innerHeight - 64);
    const style = doc.createElement("style");
    style.setAttribute("data-react-bridge", "public-layout");
    style.textContent = `
      .topbar,
      body > header,
      body > footer.footer,
      body > footer {
        display: none !important;
      }
      html, body {
        overflow: hidden !important;
      }
      body {
        margin: 0 !important;
      }
      :root {
        --header-total: 0px !important;
      }
      ${isHome ? `
      .hero,
      .hero-slider {
        min-height: ${heroTargetPx}px !important;
        height: ${heroTargetPx}px !important;
      }
      .hero-slider {
        padding-bottom: 26px !important;
      }
      .hero-slider .container {
        position: relative !important;
        z-index: 4 !important;
        min-height: ${heroTargetPx}px !important;
        height: ${heroTargetPx}px !important;
      }
      .hero-grid {
        min-height: ${Math.max(420, Math.round(heroTargetPx * 0.72))}px !important;
        justify-content: flex-start !important;
        align-items: center !important;
      }
      .hero-card {
        width: min(100%, 760px) !important;
        max-width: 760px !important;
        margin-left: clamp(24px, 6vw, 96px) !important;
        margin-right: 0 !important;
        padding-top: 0 !important;
      }
      .hero-card,
      .hero-card .kicker,
      .hero-card h1,
      .hero-card .lead,
      .hero-card .cta-row {
        position: relative !important;
        z-index: 4 !important;
      }
      .hero-dots {
        left: 50% !important;
        transform: translateX(-50%) !important;
        bottom: 34px !important;
        z-index: 5 !important;
      }
      .hero-arrow {
        z-index: 5 !important;
      }
      ` : ""}
      ${isArbitraje ? `
      body > section.hero:first-of-type {
        display: none !important;
      }
      .hero {
        min-height: min(78vh, 720px) !important;
      }
      .hero-bg {
        background-image: url('/legacy-webcorte/fondocorte.jpg') !important;
        background-position: center !important;
        background-size: cover !important;
      }
      .hero-inner,
      .hero .container {
        position: relative !important;
        z-index: 3 !important;
      }
      .hero-overlay {
        z-index: 1 !important;
      }
      .wave {
        z-index: 3 !important;
      }
      ` : ""}
      ${isOrganizacion ? `
      body > section.hero-like:first-of-type,
      body > section.fondo-pagina:first-of-type {
        display: none !important;
      }
      .hero-bg {
        background-image: url('/legacy-webcorte/fondocorte.jpg') !important;
        background-position: center !important;
        background-size: cover !important;
      }
      .hero .container,
      .hero-inner,
      .section .container,
      section .container {
        position: relative;
        z-index: 3;
      }
      ` : ""}
    `;

    doc.head.querySelectorAll('style[data-react-bridge="public-layout"]').forEach((n) => n.remove());
    doc.head.appendChild(style);

    // Fuerza navegación dentro de React para enlaces legacy entre páginas.
    doc.querySelectorAll('a[href$=".php"]').forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (href.includes("organizacion.php")) a.setAttribute("href", "/organizacion");
      else if (href.includes("arbitraje.php")) a.setAttribute("href", "/arbitraje");
      else if (href.includes("index.php")) a.setAttribute("href", "/");
      a.setAttribute("target", "_top");
    });

    const syncHeight = () => {
      const body = doc.body;
      const html = doc.documentElement;
      if (!body || !html) return;

      // Usa solo alturas de scroll reales. Incluir offset/clientHeight crea
      // un bucle de crecimiento porque depende del alto actual del iframe.
      const bodyScroll = body.scrollHeight || 0;
      const htmlScroll = html.scrollHeight || 0;
      let contentBottom = 0;

      for (const el of Array.from(body.children)) {
        const candidate = (el.offsetTop || 0) + (el.offsetHeight || 0);
        if (candidate > contentBottom) contentBottom = candidate;
      }

      const next = Math.max(bodyScroll, htmlScroll, contentBottom);
      if (next > 0) {
        setFrameHeight((prev) => {
          const prevNum = Number.parseInt(String(prev), 10) || 0;
          return Math.abs(prevNum - next) > 2 ? `${next}px` : prev;
        });
      }
    };

    syncHeight();
    resizeTimerRef.current = window.setInterval(syncHeight, 400);

    if (isArbitraje) {
      const syncModalMode = () => {
        setFrameOverlayMode(
          Boolean(doc.querySelector(".modal.is-open, .modal.is-closing"))
        );
      };

      syncModalMode();
      modalObserverRef.current = new MutationObserver(syncModalMode);
      modalObserverRef.current.observe(doc.body, {
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "aria-hidden", "style"],
      });
    } else {
      setFrameOverlayMode(false);
    }

    setFrameReady(true);
  };

  return (
    <div
      className={`legacy-frame-shell${frameOverlayMode ? " is-overlay-active" : ""}`}
    >
      <iframe
        ref={frameRef}
        key={frameSrc}
        src={frameSrc}
        title={title ?? "Página pública"}
        onLoad={handleLoad}
        className="legacy-frame"
        scrolling="no"
        style={{
          height: frameHeight,
          visibility: frameReady ? "visible" : "hidden",
          opacity: frameReady ? 1 : 0,
          transition: "opacity 120ms ease",
        }}
      />
    </div>
  );
}
