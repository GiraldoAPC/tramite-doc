import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import PublicLayout from "./layouts/PublicLayout";
import { LayoutProvider } from "./layouts/LayoutContext";

import Dashboard from "./pages/Dashboard";
import LegacyPublicPage from "./pages/public/LegacyPublicPage";
import HomePage from "./pages/public/HomePage";
import ArbitrajePage from "./pages/public/ArbitrajePage";
import OrganizacionPage from "./pages/public/OrganizacionPage";
import NominaArbitrosPage from "./pages/public/NominaArbitrosPage";
import TarifarioVirtualPage from "./pages/public/TarifarioVirtualPage";
import ResourcePage from "./pages/public/ResourcePage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import "./styles/public-site.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LayoutProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route
              index
              element={
                <LegacyPublicPage
                  src="/legacy-webcorte/index.html"
                  title="Inicio - Corte de Arbitraje"
                />
              }
            />
            <Route
              path="arbitraje"
              element={
                <LegacyPublicPage
                  src="/legacy-webcorte/arbitraje.html"
                  title="Arbitraje - Corte de Arbitraje"
                />
              }
            />
            <Route
              path="organizacion"
              element={
                <LegacyPublicPage
                  src="/legacy-webcorte/organizacion.html"
                  title="Organización - Corte de Arbitraje"
                />
              }
            />
            <Route path="nomina-arbitros" element={<NominaArbitrosPage />} />
            <Route
              path="reglamentos-directivos"
              element={
                <ResourcePage
                  eyebrow="Documentación institucional"
                  title="Reglamentos directivos"
                  description="Página base para organizar reglamentos, directivas y documentos oficiales de la institución."
                />
              }
            />
            <Route
              path="tarifario-virtual"
              element={<TarifarioVirtualPage />}
            />
            <Route
              path="tarifario-incorporacion"
              element={
                <ResourcePage
                  eyebrow="Servicios institucionales"
                  title="Tarifario de incorporación"
                  description="Página base para publicar costos, criterios y requisitos de incorporación."
                />
              }
            />
            <Route
              path="comunicados"
              element={
                <ResourcePage
                  eyebrow="Información pública"
                  title="Comunicados"
                  description="Página base para publicar avisos, notas oficiales y comunicados institucionales."
                />
              }
            />
            <Route path="acceso" element={<LoginPage />} />
            <Route path="registro" element={<RegisterPage />} />
          </Route>

          <Route path="/public-react" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="arbitraje" element={<ArbitrajePage />} />
            <Route path="organizacion" element={<OrganizacionPage />} />
          </Route>

          <Route path="/app" element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LayoutProvider>
  </React.StrictMode>
);
