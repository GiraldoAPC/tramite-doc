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
import ResolucionesPage from "./pages/public/ResolucionesPage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import ContactPage from "./pages/public/ContactPage";
import SigPage from "./pages/public/SigPage";
import SecretariaArbitralPage from "./pages/public/SecretariaArbitralPage";
import SecretariaGeneralPage from "./pages/public/SecretariaGeneralPage";
import "./index.css";
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
                  title="Organizacion - Corte de Arbitraje"
                />
              }
            />
            <Route path="secretaria-general" element={<SecretariaGeneralPage />} />
            <Route path="secretaria-arbitral" element={<SecretariaArbitralPage />} />
            <Route path="nomina-arbitros" element={<NominaArbitrosPage />} />
            <Route
              path="reglamentos-directivos"
              element={
                <ResourcePage
                  description="La documentacion publica esta separada por categorias para distinguir reglamentos, marco legal y documentos institucionales."
                  sections={[
                    {
                      title: "Reglamentos y marco legal",
                      description:
                        "Normas, reglamentos y documentos de referencia aplicables a la actividad arbitral institucional.",
                      items: [
                        {
                          title: "Reglamento arbitral 05-03-2025",
                          description:
                            "Version actual del reglamento arbitral institucional publicada el 5 de marzo de 2025.",
                          href: "/documentos/reglamentos/REGLAMENTO%20ARBITRAL%2005-03-2025.pdf",
                        },
                        {
                          title: "Reglamento arbitral 2015",
                          description:
                            "Texto reglamentario institucional anterior para consulta y referencia historica.",
                          href: "/documentos/reglamentos/REGLAMENTO%202015.pdf",
                        },
                        {
                          title: "Estatuto",
                          description:
                            "Documento estatutario de la institucion para consulta publica.",
                          href: "/documentos/reglamentos/ESTATUTO.pdf",
                        },
                        {
                          title: "Decreto Legislativo 1071",
                          description:
                            "Norma legal de referencia para arbitraje y procedimientos relacionados.",
                          href: "/documentos/reglamentos/DECRETO%20LEGISLATIVO%201071.pdf",
                        },
                        {
                          title: "Codigo de etica",
                          description:
                            "Lineamientos de conducta y principios aplicables a la funcion arbitral.",
                          href: "/documentos/reglamentos/CODIGO%20DE%20ETICA.pdf",
                        },
                      ],
                    },
                    {
                      items: [
                        {
                          title: "Licencia de funcionamiento",
                          description:
                            "Licencia municipal de funcionamiento publicada como respaldo institucional de la Camara de Comercio de Ancash.",
                          href: "/documentos/institucionales/Licencia%20de%20funcionamiento.pdf",
                        },
                      ],
                    },
                  ]}
                />
              }
            />
            <Route
              path="jrd"
              element={
                <ResourcePage
                  sections={[
                    {
                      title: "Normativa y recursos JRD",
                      description:
                        "Descargue los reglamentos, nomina y tarifario vigentes disponibles en la carpeta institucional JRD.",
                      items: [
                        {
                          title: "Nomina de adjudicadores JRD",
                          description:
                            "Relacion institucional de adjudicadores habilitados para la Junta de Resolucion de Disputas.",
                          href: "/documentos/JRD/Nomina-de-adjudicadores-JRD.pdf",
                        },
                        {
                          title: "Reglamento de etica para las JRD",
                          description:
                            "Documento de principios, deberes y reglas de conducta aplicables a las JRD.",
                          href: "/documentos/JRD/Reglamento-de-Etica-para-las-JRD.pdf",
                        },
                        {
                          title: "Reglamento JRD CC Ancash",
                          description:
                            "Reglamento institucional de Junta de Resolucion de Disputas de la Camara de Comercio de Ancash.",
                          href: "/documentos/JRD/Reglamento-JRD-CC-Ancash.pdf",
                        },
                        {
                          title: "Tarifario JRD Camara de Comercio Industria y Turismo de Ancash",
                          description:
                            "Tarifario aplicable a los servicios de Junta de Resolucion de Disputas.",
                          href: "/documentos/JRD/Tarifario-JRD-Camara-de-Comercio-Industria-y-Turismo-de-Ancash-2.pdf",
                        },
                      ],
                    },
                  ]}
                />
              }
            />
            <Route path="sig" element={<SigPage />} />
            <Route path="contacto" element={<ContactPage />} />
            <Route path="tarifario-virtual" element={<TarifarioVirtualPage />} />
            <Route path="resoluciones" element={<ResolucionesPage />} />
            <Route
              path="tarifario-incorporacion"
              element={
                <ResourcePage
                  eyebrow="Servicios institucionales"
                  title="Tarifario de incorporacion"
                  description="Pagina base para publicar costos, criterios y requisitos de incorporacion."
                />
              }
            />
            <Route
              path="comunicados"
              element={
                <ResourcePage
                  eyebrow="Informacion publica"
                  title="Comunicados"
                  description="Pagina base para publicar avisos, notas oficiales y comunicados institucionales."
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
  </React.StrictMode>,
);
