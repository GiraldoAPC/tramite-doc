import { useMemo, useState } from "react";

const resoluciones = [
  {
    id: 1,
    titulo: "Resolución Administrativa 001-2026-CSA",
    descripcion:
      "Disposiciones administrativas emitidas por la Corte para la gestión institucional y operativa.",
    fecha: "2026-01-15",
    href: "/documentos/resoluciones/Resolucion-001-2026-CSA.pdf",
  },
  {
    id: 2,
    titulo: "Resolución Administrativa 002-2026-CSA",
    descripcion:
      "Lineamientos complementarios para la organización y soporte de actuaciones arbitrales.",
    fecha: "2026-02-28",
    href: "/documentos/resoluciones/Resolucion-002-2026-CSA.pdf",
  },
  {
    id: 3,
    titulo: "Resolución Administrativa 003-2026-CSA",
    descripcion:
      "Criterios internos para la tramitación documentaria y seguimiento de expedientes.",
    fecha: "2026-04-04",
    href: "/documentos/resoluciones/Resolucion-003-2026-CSA.pdf",
  },
];

function formatFecha(value) {
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export default function ResolucionesPage() {
  const [busqueda, setBusqueda] = useState("");

  const termino = busqueda.trim().toLowerCase();
  const resultados = useMemo(() => {
    if (!termino) return resoluciones;

    return resoluciones.filter((item) => {
      const base = `${item.titulo} ${item.descripcion} ${item.fecha}`.toLowerCase();
      return base.includes(termino);
    });
  }, [termino]);

  return (
    <section className="public-shell page-block">
      <section className="resolution-panel">
        <div className="resolution-panel__top">
          <div className="resolution-search">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
            <input
              type="search"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              placeholder="Buscar por nombre, descripción o fecha"
            />
          </div>
        </div>

        <div className="resolution-list">
          {resultados.length ? (
            resultados.map((item) => (
              <article key={item.id} className="resolution-card">
                <div className="resolution-card__body">
                  <p className="resolution-card__eyebrow">Resolución</p>
                  <h4>{item.titulo}</h4>
                  <p>{item.descripcion}</p>
                  <span className="resolution-card__date">
                    <i className="fa-regular fa-calendar" aria-hidden="true" />
                    {formatFecha(item.fecha)}
                  </span>
                </div>

                <a
                  className="resolution-card__cta"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-download" aria-hidden="true" />
                  Descargar
                </a>
              </article>
            ))
          ) : (
            <div className="resolution-empty">
              No se encontraron resoluciones con ese criterio de búsqueda.
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
