import { Link } from "react-router-dom";
import { useLayout } from "./LayoutContext";

export default function Topbar() {
  // Placeholder (luego lo conectamos con tu auth real)

  const user = {
    name: "Usuario",
    role: "Mesa de Partes",
    avatar: "/build/images/users/avatar-1.jpg",
  };

  const onLogout = (e) => {
    e.preventDefault();
    // TODO: aquí harás logout real (API + limpiar token)
    alert("Logout (pendiente implementar)");
  };
  const { device, mobileOpen, toggleSidebar } = useLayout();

  const handleHamburger = () => {
    const w = window.innerWidth;
    const html = document.documentElement;

    // MÓVIL
    if (w < 992) {
      document.body.classList.toggle("sidebar-enable");
      return;
    }

    // TABLET y DESKTOP: alterna sm <-> lg
    const current = html.getAttribute("data-sidebar-size") || "lg";
    html.setAttribute("data-sidebar-size", current === "sm" ? "lg" : "sm");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };
  const toggleDarkMode = () => {
    const html = document.documentElement;
    const current = html.getAttribute("data-bs-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-bs-theme", next);
  };

  return (
    <>
      <header id="page-topbar">
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">
              {/* LOGO */}
              <div className="navbar-brand-box horizontal-logo">
                <Link to="/app/dashboard" className="logo logo-dark">
                  <span className="logo-sm">
                    <img
                      src="/build/images/logo-sm.png"
                      alt="logo"
                      height="22"
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src="/build/images/logo-dark.png"
                      alt="logo"
                      height="17"
                    />
                  </span>
                </Link>

                <Link to="/app/dashboard" className="logo logo-light">
                  <span className="logo-sm">
                    <img
                      src="/build/images/logo-sm.png"
                      alt="logo"
                      height="22"
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src="/build/images/logo-light.png"
                      alt="logo"
                      height="17"
                    />
                  </span>
                </Link>
              </div>

              {/* HAMBURGER */}
              <button
                type="button"
                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                id="topnav-hamburger-icon"
                onClick={toggleSidebar}
              >
                {device === "mobile" ? (
                  // móvil: flecha derecha cuando está cerrado, izquierda cuando está abierto
                  <i
                    className={`ri ${mobileOpen ? "ri-arrow-left-line" : "ri-arrow-right-line"} fs-20`}
                  />
                ) : (
                  // tablet/desktop: hamburguesa normal
                  <span className="hamburger-icon">
                    <span />
                    <span />
                    <span />
                  </span>
                )}
              </button>

              {/* App Search */}
              <form className="app-search d-none d-md-block">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    autoComplete="off"
                    id="search-options"
                    defaultValue=""
                  />
                  <span className="mdi mdi-magnify search-widget-icon" />
                  <span
                    className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                    id="search-close-options"
                  />
                </div>

                <div
                  className="dropdown-menu dropdown-menu-lg"
                  id="search-dropdown"
                >
                  <div data-simplebar="init" style={{ maxHeight: 320 }}>
                    <div className="dropdown-header">
                      <h6 className="text-overflow text-muted mb-0 text-uppercase">
                        Recent Searches
                      </h6>
                    </div>

                    <div className="dropdown-item bg-transparent text-wrap">
                      <a
                        href="#!"
                        className="btn btn-soft-secondary btn-sm rounded-pill"
                      >
                        how to setup <i className="mdi mdi-magnify ms-1" />
                      </a>
                      <a
                        href="#!"
                        className="btn btn-soft-secondary btn-sm rounded-pill"
                      >
                        buttons <i className="mdi mdi-magnify ms-1" />
                      </a>
                    </div>

                    <div className="dropdown-header mt-2">
                      <h6 className="text-overflow text-muted mb-1 text-uppercase">
                        Pages
                      </h6>
                    </div>

                    <a href="#!" className="dropdown-item notify-item">
                      <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2" />
                      <span>Analytics Dashboard</span>
                    </a>
                    <a href="#!" className="dropdown-item notify-item">
                      <i className="ri-lifebuoy-line align-middle fs-18 text-muted me-2" />
                      <span>Help Center</span>
                    </a>
                    <a href="#!" className="dropdown-item notify-item">
                      <i className="ri-user-settings-line align-middle fs-18 text-muted me-2" />
                      <span>My account settings</span>
                    </a>

                    <div className="dropdown-header mt-2">
                      <h6 className="text-overflow text-muted mb-2 text-uppercase">
                        Members
                      </h6>
                    </div>

                    <div className="notification-list">
                      <a href="#!" className="dropdown-item notify-item py-2">
                        <div className="d-flex">
                          <img
                            src="/build/images/users/avatar-2.jpg"
                            className="me-3 rounded-circle avatar-xs"
                            alt="user"
                          />
                          <div className="flex-grow-1">
                            <h6 className="m-0">Angela Bernier</h6>
                            <span className="fs-11 mb-0 text-muted">
                              Manager
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div className="text-center pt-3 pb-1">
                    <a href="#!" className="btn btn-primary btn-sm">
                      View All Results{" "}
                      <i className="ri-arrow-right-line ms-1" />
                    </a>
                  </div>
                </div>
              </form>
            </div>

            <div className="d-flex align-items-center">
              {/* Search móvil */}
              <div className="dropdown d-md-none topbar-head-dropdown header-item">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  id="page-header-search-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-search fs-22" />
                </button>

                <div
                  className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                  aria-labelledby="page-header-search-dropdown"
                >
                  <form className="p-3">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search ..."
                          aria-label="search"
                        />
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Idioma (simplificado) */}
              <div className="dropdown ms-1 topbar-head-dropdown header-item">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src="/build/images/flags/us.svg"
                    className="rounded"
                    alt="Lang"
                    height="18"
                  />
                </button>

                <div className="dropdown-menu dropdown-menu-end">
                  <a
                    href="#!"
                    className="dropdown-item notify-item language py-2"
                    data-lang="en"
                  >
                    <img
                      src="/build/images/flags/us.svg"
                      alt="en"
                      className="me-2 rounded"
                      height="18"
                    />
                    <span className="align-middle">English</span>
                  </a>
                  <a
                    href="#!"
                    className="dropdown-item notify-item language"
                    data-lang="sp"
                  >
                    <img
                      src="/build/images/flags/spain.svg"
                      alt="sp"
                      className="me-2 rounded"
                      height="18"
                    />
                    <span className="align-middle">Español</span>
                  </a>
                </div>
              </div>

              {/* Fullscreen / Dark */}
              <div className="ms-1 header-item d-none d-sm-flex">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  onClick={toggleFullscreen}
                >
                  <i className="bx bx-fullscreen fs-22"></i>
                </button>
              </div>

              <div className="ms-1 header-item d-none d-sm-flex">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode"
                  onClick={toggleDarkMode}
                >
                  <i className="bx bx-moon fs-22"></i>
                </button>
              </div>

              {/* Notificaciones (dejamos el botón; luego conectamos a data real) */}
              <div
                className="dropdown topbar-head-dropdown ms-1 header-item"
                id="notificationDropdown"
              >
                <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  id="page-header-notifications-dropdown"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-bell fs-22" />
                  <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                    3<span className="visually-hidden">unread messages</span>
                  </span>
                </button>

                <div
                  className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                  aria-labelledby="page-header-notifications-dropdown"
                >
                  <div className="dropdown-head bg-primary bg-pattern rounded-top">
                    <div className="p-3">
                      <div className="row align-items-center">
                        <div className="col">
                          <h6 className="m-0 fs-16 fw-semibold text-white">
                            Notifications
                          </h6>
                        </div>
                        <div className="col-auto dropdown-tabs">
                          <span className="badge bg-light-subtle text-body fs-13">
                            4 New
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3">
                    <p className="mb-0 text-muted">
                      Aquí luego cargamos notificaciones reales.
                    </p>
                    <button
                      type="button"
                      className="btn btn-soft-danger btn-sm mt-2"
                      data-bs-toggle="modal"
                      data-bs-target="#removeNotificationModal"
                    >
                      Probar modal eliminar
                    </button>
                  </div>
                </div>
              </div>

              {/* Usuario */}
              <div className="dropdown ms-sm-3 header-item topbar-user">
                <button
                  type="button"
                  className="btn"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center">
                    <img
                      className="rounded-circle header-profile-user"
                      src={user.avatar}
                      alt="Avatar"
                    />
                    <span className="text-start ms-xl-2">
                      <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                        {user.name}
                      </span>
                      <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">
                        {user.role}
                      </span>
                    </span>
                  </span>
                </button>

                <div className="dropdown-menu dropdown-menu-end">
                  <h6 className="dropdown-header">Bienvenido!</h6>
                  <Link className="dropdown-item" to="/app/profile">
                    <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" />
                    <span className="align-middle">Profile</span>
                  </Link>

                  <div className="dropdown-divider" />

                  <a className="dropdown-item" href="#!" onClick={onLogout}>
                    <i className="bx bx-power-off font-size-16 align-middle me-1" />
                    <span className="align-middle">Logout</span>
                  </a>
                </div>
              </div>
            </div>
            {/* end right */}
          </div>
        </div>
      </header>

      {/* Modal (se queda fuera del header) */}
      <div
        id="removeNotificationModal"
        className="modal fade zoomIn"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="NotificationModalbtn-close"
              />
            </div>
            <div className="modal-body">
              <div className="mt-2 text-center">
                {/* Para que <lord-icon> funcione, puede requerir su script en index.html */}
                <lord-icon
                  src="https://cdn.lordicon.com/gsqxdxog.json"
                  trigger="loop"
                  colors="primary:#f7b84b,secondary:#f06548"
                  style={{ width: 100, height: 100 }}
                />
                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                  <h4>Are you sure ?</h4>
                  <p className="text-muted mx-4 mb-0">
                    Are you sure you want to remove this Notification ?
                  </p>
                </div>
              </div>

              <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                <button
                  type="button"
                  className="btn w-sm btn-light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn w-sm btn-danger"
                  id="delete-notification"
                >
                  Yes, Delete It!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
