import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      {/* ========== App Menu ========== */}
      <div className="app-menu navbar-menu">
        {/* LOGO */}
        <div className="navbar-brand-box">
          {/* Dark Logo */}
          <NavLink to="/app/dashboard" className="logo logo-dark">
            <span className="logo-sm">
              <img src="/build/images/logo-sm.png" alt="logo" height="22" />
            </span>
            <span className="logo-lg">
              <img src="/build/images/logo-dark.png" alt="logo" height="17" />
            </span>
          </NavLink>

          {/* Light Logo */}
          <NavLink to="/app/dashboard" className="logo logo-light">
            <span className="logo-sm">
              <img src="/build/images/logo-sm.png" alt="logo" height="22" />
            </span>
            <span className="logo-lg">
              <img src="/build/images/logo-light.png" alt="logo" height="17" />
            </span>
          </NavLink>

          <button
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line" />
          </button>
        </div>

        <div id="scrollbar">
          <div className="container-fluid">
            <div id="two-column-menu"></div>

            <ul className="navbar-nav" id="navbar-nav">
              {/* ====== MENU ====== */}
              <li className="menu-title">
                <span>MENÚ</span>
              </li>

              {/* Dashboard */}
              <li className="nav-item">
                <NavLink className="nav-link menu-link" to="/app/dashboard">
                  <i className="las la-tachometer-alt" /> <span>Dashboard</span>
                </NavLink>
              </li>

              {/* Trámite Documentario */}
              <li className="menu-title">
                <i className="ri-more-fill" /> <span>TRÁMITE DOCUMENTARIO</span>
              </li>

              {/* Expedientes (collapse) */}
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarExpedientes"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarExpedientes"
                >
                  <i className="ri-folder-3-line" /> <span>Expedientes</span>
                </a>

                <div className="collapse menu-dropdown" id="sidebarExpedientes">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <NavLink to="/app/expedientes" className="nav-link">
                        Bandeja de expedientes
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/app/expedientes/nuevo" className="nav-link">
                        Registrar expediente
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/app/expedientes/derivados"
                        className="nav-link"
                      >
                        Derivados / En trámite
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/app/expedientes/archivados"
                        className="nav-link"
                      >
                        Archivados
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Consulta */}
              <li className="nav-item">
                <NavLink className="nav-link menu-link" to="/app/consulta">
                  <i className="ri-search-eye-line" /> <span>Consulta</span>
                </NavLink>
              </li>

              {/* Reportes */}
              <li className="nav-item">
                <NavLink className="nav-link menu-link" to="/app/reportes">
                  <i className="ri-bar-chart-2-line" /> <span>Reportes</span>
                </NavLink>
              </li>

              {/* Configuración */}
              <li className="menu-title">
                <i className="ri-more-fill" /> <span>CONFIGURACIÓN</span>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarConfig"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarConfig"
                >
                  <i className="ri-settings-3-line" />{" "}
                  <span>Configuración</span>
                </a>

                <div className="collapse menu-dropdown" id="sidebarConfig">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <NavLink to="/app/areas" className="nav-link">
                        Áreas / Oficinas
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/app/usuarios" className="nav-link">
                        Usuarios
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/app/roles" className="nav-link">
                        Roles y permisos
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          {/* Sidebar */}
        </div>

        <div className="sidebar-background" />
      </div>
      {/* Left Sidebar End */}

      {/* Vertical Overlay */}
      {/* <div className="vertical-overlay" />*/}
    </>
  );
}
