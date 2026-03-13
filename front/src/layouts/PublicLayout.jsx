import { NavLink, Outlet, useLocation, Link } from "react-router-dom";

const navItems = [
  { to: "/", label: "Inicio", end: true },
  { to: "/organizacion", label: "Organización" },
  { to: "/arbitraje", label: "Arbitraje" },
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

          <nav className="public-nav" aria-label="Navegación principal">
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
          </nav>

          <div className="public-header__actions">
            <NavLink to="/registro" className="public-cta public-cta--ghost">
              <i className="fa-solid fa-user-plus" aria-hidden="true" />
              <span>Registrarse</span>
            </NavLink>
            <NavLink to="/acceso" className="public-cta">
              <i className="fa-solid fa-right-to-bracket" aria-hidden="true" />
              <span>Ingresar</span>
            </NavLink>
          </div>
        </div>
      </header>

      <main className="public-main">
        <PublicPageBanner />
        <Outlet />
      </main>

      <footer className="public-footer">
        <div className="public-shell">
          <div className="public-footer__grid">
            <div>
              <p className="public-footer__title">Corte Superior de Arbitraje</p>
              <p className="public-footer__text">
                Cámara de Comercio de Áncash. Plataforma pública integrada con
                React + Laravel para información institucional y servicios.
              </p>
            </div>
            <div className="public-footer__meta">
              <p>
                <i className="fa-solid fa-location-dot" aria-hidden="true" />{" "}
                Jr. José de Sucre 765 - 3er Piso, Huaraz - Áncash
              </p>
              <p>
                <i className="fa-solid fa-phone" aria-hidden="true" /> 972 495
                162
              </p>
              <p>
                <i className="fa-solid fa-envelope" aria-hidden="true" />{" "}
                secretariageneralcaa@camaradeancash.org.pe
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
