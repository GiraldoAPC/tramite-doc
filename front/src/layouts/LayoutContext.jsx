/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LayoutContext = createContext(null);

// Bootstrap breakpoints típicos
const getDevice = (w) => (w < 992 ? "mobile" : w < 1200 ? "tablet" : "desktop");

export function LayoutProvider({ children }) {
  const [device, setDevice] = useState(() => getDevice(window.innerWidth));
  // sidebarSize controla Velzon: "lg" (full) | "sm" (mini iconos)
  const [sidebarSize, setSidebarSize] = useState(
    device === "tablet" ? "sm" : "lg",
  );

  // en móvil se abre como offcanvas (sidebar-enable)
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const next = getDevice(window.innerWidth);
      setDevice((prev) => (prev === next ? prev : next));
    };

    onResize(); // asegura que al cargar quede correcto
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // normaliza cuando cambia el dispositivo
  useEffect(() => {
    if (device === "desktop") {
      setSidebarSize("lg");
      setMobileOpen(false);
    } else if (device === "tablet") {
      setSidebarSize("sm");
      setMobileOpen(false);
    } else {
      // mobile
      setSidebarSize("lg");
      setMobileOpen(false);
    }
  }, [device]);

  const toggleSidebar = () => {
    if (device === "mobile") {
      setMobileOpen((v) => !v);
    } else {
      setSidebarSize((s) => (s === "lg" ? "sm" : "lg"));
    }
  };

  const closeMobileSidebar = () => setMobileOpen(false);

  const value = useMemo(
    () => ({
      device,
      sidebarSize,
      mobileOpen,
      toggleSidebar,
      closeMobileSidebar,
    }),
    [device, sidebarSize, mobileOpen],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used inside LayoutProvider");
  return ctx;
}
