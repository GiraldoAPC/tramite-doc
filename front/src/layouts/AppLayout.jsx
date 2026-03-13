import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useLayout } from "./LayoutContext";
import { useEffect } from "react";

export default function AppLayout() {
  const { device, sidebarSize, mobileOpen, closeMobileSidebar } = useLayout();

  useEffect(() => {
    const html = document.documentElement;

    // ✅ MANTENER ESTO (Velzon usa este atributo)
    html.setAttribute("data-sidebar-size", sidebarSize);

    // recomendado por Velzon para layout vertical
    document.body.classList.add("vertical-sidebar-enable");

    // ✅ MÓVIL: abrir/cerrar con sidebar-enable (offcanvas)
    if (device === "mobile") {
      if (mobileOpen) document.body.classList.add("sidebar-enable");
      else document.body.classList.remove("sidebar-enable");
    } else {
      // si no es móvil, asegúrate que no quede pegado
      document.body.classList.remove("sidebar-enable");
    }
  }, [device, sidebarSize, mobileOpen]);

  return (
    <div id="layout-wrapper">
      <Topbar />
      <Sidebar />

      {/* ✅ overlay SOLO en móvil cuando esté abierto */}
      {device === "mobile" && mobileOpen && (
        <div className="vertical-overlay" onClick={closeMobileSidebar}></div>
      )}

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
