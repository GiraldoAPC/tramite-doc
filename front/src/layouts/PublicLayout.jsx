import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, Link, useNavigate } from "react-router-dom";

const navItems = [
  { to: "/", label: "Inicio", end: true },
  { to: "/organizacion", label: "Organización" },
  { to: "/arbitraje", label: "Arbitraje" },
  { to: "/jrd", label: "JRD" },
  { to: "/sig", label: "SIG" },
  { to: "/contacto", label: "Contacto" },
];

const pageBanners = {
  "/organizacion": {
    crumbCurrent: "Organización",
    title: "ORGANIZACIÓN",
    subtitle: "Estructura institucional y equipo de la Corte de Arbitraje",
    image: "/img/organizacion.jpg",
    icon: "fa-solid fa-sitemap",
    cutColor: "#f3f4f6",
  },
  "/arbitraje": {
    crumbCurrent: "Arbitraje",
    title: "ARBITRAJE",
    subtitle: "Servicios, accesos rápidos y documentación institucional",
    image: "/img/arbitraje.jpg",
    icon: "fa-solid fa-scale-balanced",
    cutColor: "#f3f4f6",
  },
  "/nomina-arbitros": {
    crumbCurrent: "Nómina de árbitros",
    title: "NÓMINA DE ÁRBITROS",
    subtitle: "Directorio institucional de profesionales adscritos a la Corte",
    image: "/img/arbitraje.jpg",
    icon: "fa-solid fa-scale-balanced",
    cutColor: "#f3f4f6",
  },
  "/reglamentos-directivos": {
    crumbCurrent: "Reglamentos directivos",
    title: "REGLAMENTOS DIRECTIVOS",
    subtitle: "Normativa, directivas y documentos institucionales de consulta",
    image: "/img/arbitraje.jpg",
    icon: "fa-solid fa-file-lines",
    cutColor: "#f3f4f6",
  },
  "/jrd": {
    crumbCurrent: "JRD",
    title: "JRD",
    subtitle: "Normativa, nomina y tarifario de Junta de Resolucion de Disputas",
    image: "/img/arbitraje.jpg",
    icon: "fa-solid fa-gavel",
    cutColor: "#f3f4f6",
  },
  "/sig": {
    crumbCurrent: "SIG",
    title: "SIG",
    subtitle: "Certificaciones y documentos del Sistema Integrado de Gestion",
    image: "/img/organizacion.jpg",
    icon: "fa-solid fa-certificate",
    cutColor: "#f3f4f6",
  },
  "/contacto": {
    crumbCurrent: "Contacto",
    title: "CONTACTO",
    subtitle: "Atencion institucional, direccion, telefonos y correos oficiales",
    image: "/img/organizacion.jpg",
    icon: "fa-solid fa-headset",
    cutColor: "#f3f4f6",
  },
  "/tarifario-virtual": {
    crumbCurrent: "Tarifario virtual",
    title: "TARIFARIO VIRTUAL",
    subtitle: "Calculadora y estructura base para servicios arbitrales",
    image: "/img/arbitraje.jpg",
    icon: "fa-solid fa-calculator",
    cutColor: "#f3f4f6",
  },
  "/tarifario-incorporacion": {
    crumbCurrent: "Tarifario de incorporación",
    title: "TARIFARIO DE INCORPORACIÓN",
    subtitle: "Costos y lineamientos para procesos de incorporación institucional",
    image: "/img/organizacion.jpg",
    icon: "fa-solid fa-file-circle-plus",
    cutColor: "#f3f4f6",
  },
  "/comunicados": {
    crumbCurrent: "Comunicados",
    title: "COMUNICADOS",
    subtitle: "Avisos y publicaciones oficiales de la Corte de Arbitraje",
    image: "/img/organizacion.jpg",
    icon: "fa-solid fa-bullhorn",
    cutColor: "#f3f4f6",
  },
};

function PublicPageBanner() {
  const { pathname } = useLocation();
  const banner = pageBanners[pathname];

  if (!banner) return null;

  return (
    <section
      className="public-page-banner"
      style={{
        "--banner-image": `url(${banner.image})`,
        "--banner-cut-color": banner.cutColor,
      }}
      aria-label={`Encabezado ${banner.title}`}
    >
      <div className="public-page-banner__overlay" aria-hidden="true" />
      <div className="public-shell public-page-banner__inner">
        <p className="public-page-banner__crumb">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true"> / </span>
          <span>{banner.crumbCurrent}</span>
        </p>
        <div className="public-page-banner__icon" aria-hidden="true">
          <i className={banner.icon} />
        </div>
        <h2>{banner.title}</h2>
        <p className="public-page-banner__subtitle">{banner.subtitle}</p>
      </div>
      <div className="public-page-banner__cut" aria-hidden="true" />
      <div className="public-page-banner__stripe" aria-hidden="true" />
    </section>
  );
}

export default function PublicLayout() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, search]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    setTrackingOpen(params.get("seguimiento") === "1");
  }, [search]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setShowScrollTop(scrollHeight > 0 && scrollTop > scrollHeight / 2);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!trackingOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setTrackingOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [trackingOpen]);

  const closeTrackingModal = () => {
    const params = new URLSearchParams(search);

    if (params.get("seguimiento") === "1") {
      navigate(pathname, { replace: true });
      return;
    }

    setTrackingOpen(false);
  };

  return (
    <div className="public-site">
      <header className="public-header">
        <div className="public-shell">
          <NavLink to="/" className="public-brand" aria-label="Inicio">
            <div className="public-brand__mark" aria-hidden="true">
              <img
                src="/legacy-webcorte/LOGOCORTE.png"
                alt=""
                className="public-brand__logo"
              />
            </div>
            <div>
              <p className="public-brand__eyebrow">Corte Superior de Arbitraje</p>
              <h1 className="public-brand__title">
                Cámara de Comercio de Áncash
              </h1>
            </div>
          </NavLink>

          <button
            type="button"
            className={`public-menu-toggle${menuOpen ? " is-open" : ""}`}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            aria-controls="public-nav"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            id="public-nav"
            className={`public-nav${menuOpen ? " is-open" : ""}`}
            aria-label="Navegación principal"
          >
            <div className="public-nav__mobile-head">
              <div className="public-nav__mobile-brand" aria-hidden="true">
                <img
                  src="/legacy-webcorte/LOGOCORTE.png"
                  alt=""
                  className="public-nav__mobile-logo"
                />
              </div>
              <button
                type="button"
                className="public-nav__mobile-close"
                aria-label="Cerrar menu"
                onClick={() => setMenuOpen(false)}
              >
                <i className="fa-solid fa-xmark" aria-hidden="true" />
              </button>
            </div>

            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `public-nav__link${isActive ? " is-active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="public-nav__mobile-actions">
              <Link
                to="/registro"
                target="_blank"
                rel="noreferrer"
                className="public-cta public-cta--ghost"
              >
                <i className="fa-solid fa-user-plus" aria-hidden="true" />
                <span>Nueva solicitud</span>
              </Link>
              <Link
                to="/acceso"
                target="_blank"
                rel="noreferrer"
                className="public-cta"
              >
                <i className="fa-solid fa-right-to-bracket" aria-hidden="true" />
                <span>Ingresar</span>
              </Link>
            </div>
          </nav>

          <div className="public-header__actions">
            <Link
              to="/registro"
              target="_blank"
              rel="noreferrer"
              className="public-cta public-cta--ghost"
            >
              <i className="fa-solid fa-user-plus" aria-hidden="true" />
              <span>Nueva solicitud</span>
            </Link>
            <Link
              to="/acceso"
              target="_blank"
              rel="noreferrer"
              className="public-cta"
            >
              <i className="fa-solid fa-right-to-bracket" aria-hidden="true" />
              <span>Ingresar</span>
            </Link>
          </div>
        </div>

        {menuOpen ? (
          <button
            type="button"
            className="public-nav__backdrop"
            aria-label="Cerrar menu"
            onClick={() => setMenuOpen(false)}
          />
        ) : null}
      </header>

      {trackingOpen ? (
        <div
          className="public-modal-backdrop"
          role="presentation"
          onClick={closeTrackingModal}
        >
          <div
            className="public-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tracking-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="public-modal__head">
              <div>
                <p className="public-modal__eyebrow">Consulta rapida</p>
                <h2 id="tracking-modal-title">Seguimiento de expediente</h2>
                <p>
                  Consulte el estado preliminar de su tramite arbitral con los
                  datos de control del expediente.
                </p>
              </div>

              <button
                type="button"
                className="public-modal__close"
                aria-label="Cerrar seguimiento"
                onClick={closeTrackingModal}
              >
                <i className="fa-solid fa-xmark" aria-hidden="true" />
              </button>
            </div>

            <form
              className="public-modal__form"
              onSubmit={(event) => event.preventDefault()}
            >
              <label>
                Numero de expediente
                <span className="auth-input">
                  <i className="fa-solid fa-hashtag" aria-hidden="true" />
                  <input
                    type="text"
                    name="numero_expediente"
                    placeholder="Ej. 01-2025-CSAA"
                    required
                  />
                </span>
              </label>

              <label>
                DNI o RUC del representante
                <span className="auth-input">
                  <i className="fa-solid fa-id-card" aria-hidden="true" />
                  <input
                    type="text"
                    name="documento_consulta"
                    placeholder="Documento de validacion"
                    required
                  />
                </span>
              </label>

              <label>
                Correo electronico registrado
                <span className="auth-input">
                  <i className="fa-solid fa-envelope" aria-hidden="true" />
                  <input
                    type="email"
                    name="correo_consulta"
                    placeholder="correo@dominio.com"
                    required
                  />
                </span>
              </label>

              <label>
                Codigo de verificacion
                <span className="auth-input">
                  <i className="fa-solid fa-shield-halved" aria-hidden="true" />
                  <input
                    type="text"
                    name="codigo_verificacion"
                    placeholder="Codigo enviado al correo"
                  />
                </span>
              </label>

              <div className="public-modal__note">
                <i className="fa-solid fa-circle-info" aria-hidden="true" />
                <p>
                  Ingrese los datos de control del expediente para consultar el
                  estado y la etapa actual del tramite arbitral.
                </p>
              </div>

              <div className="public-modal__actions">
                <button
                  type="button"
                  className="public-modal__secondary"
                  onClick={closeTrackingModal}
                >
                  Cerrar
                </button>
                <button type="submit" className="auth-submit">
                  <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                  <span>Consultar seguimiento</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <main className="public-main">
        <PublicPageBanner />
        <Outlet />
      </main>

      <button
        type="button"
        className={`public-scroll-top${showScrollTop ? " is-visible" : ""}`}
        aria-label="Volver arriba"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        <i className="fa-solid fa-arrow-up" aria-hidden="true" />
      </button>

      <footer className="public-footer">
        <div className="public-shell">
          <div className="public-footer__top">
            <div className="public-footer__brand">
              <img
                src="/legacy-webcorte/LOGOCORTE.png"
                alt=""
                className="public-footer__logo"
              />
              <div className="public-footer__brand-copy">
                <p className="public-footer__brand-name">
                  Corte Superior de Arbitraje
                </p>
                <p className="public-footer__brand-subtitle">
                  Camara de Comercio de Ancash
                </p>
              </div>
            </div>

            <div className="public-footer__links">
              <p className="public-footer__eyebrow">Explora aqui</p>
              <div className="public-footer__link-list">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className="public-footer__link"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="public-footer__certs">
              <p className="public-footer__eyebrow">Certificaciones</p>
              <div className="public-footer__cert-list">
                <div className="public-footer__cert">
                  <img src="/img/certificaciones/ias.png" alt="IAS" />
                </div>
                <div className="public-footer__cert">
                  <img src="/img/certificaciones/iaf.png" alt="IAF" />
                </div>
                <div className="public-footer__cert">
                  <img src="/img/certificaciones/acs.png" alt="ACS" />
                </div>
              </div>
            </div>
          </div>

          <div className="public-footer__contact">
            <div className="public-footer__contact-item">
              <i className="fa-solid fa-location-dot" aria-hidden="true" />
              <span>Jr. Jose de Sucre 765 - 3 er Piso - Huaraz - Ancash - Peru</span>
            </div>
            <div className="public-footer__contact-item">
              <i className="fa-solid fa-phone" aria-hidden="true" />
              <span>972495162</span>
            </div>
            <div className="public-footer__contact-item">
              <i className="fa-solid fa-envelope" aria-hidden="true" />
              <span>secretariageneralcaa@camaradeancash.org.pe</span>
            </div>
            <div className="public-footer__contact-item">
              <i className="fa-solid fa-envelope-open-text" aria-hidden="true" />
              <span>centrodearbitrajedeancash@camaradeancash.org.pe</span>
            </div>
          </div>

          <div className="public-footer__bottom">
            <p>
              Copyright © 2026 Corte Superior de Arbitraje - Camara de Comercio
              de Ancash. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
