import { useState } from "react";

const arbitros = [
  { id: 1, nombre: "CARLOS MATHEUS LOPEZ", profesion: "ABOGADO" },
  { id: 2, nombre: "CARLOS ALBERTO SOTO COAGUILA", profesion: "ABOGADO" },
  { id: 3, nombre: "DANIEL TRIVEÑO DAZA", profesion: "ABOGADO" },
  { id: 4, nombre: "HALLEY LOPEZ ZALDIVAR", profesion: "ABOGADO" },
  { id: 5, nombre: "HUGO VILLAR ÑAÑEZ", profesion: "ABOGADO" },
  { id: 6, nombre: "HUGO ERNESTO SOLOGUREN CALMET PONTE", profesion: "ABOGADO" },
  { id: 7, nombre: "HUMBERTO FLORES AREVALO", profesion: "ABOGADO" },
  { id: 8, nombre: "JHOEL CHIPANA CATALÁN", profesion: "ABOGADO" },
  { id: 9, nombre: "JOSE ANTONIO LEON RODRIGUEZ", profesion: "ABOGADO" },
  { id: 10, nombre: "JOSE LUIS MANDUJANO RUBIN", profesion: "ABOGADO" },
  { id: 11, nombre: "LUIS PUGLIANINI GUERRA", profesion: "ABOGADO" },
  { id: 12, nombre: "MARIA DEL CARMEN SEGURA CORDOVA", profesion: "ABOGADA" },
  { id: 13, nombre: "PATRICK HURTADO TUEROS", profesion: "ABOGADO" },
  { id: 14, nombre: "RENEE LUCIA DE FATIMA PELAEZ RAMIREZ", profesion: "ABOGADA" },
  { id: 15, nombre: "SANDRO ESPINOZA QUIÑONES", profesion: "ABOGADO" },
  { id: 16, nombre: "ANTONIO ISAIAS SOLORZANO REPETTO", profesion: "MEDICO" },
  { id: 17, nombre: "LORENZO DOLORES RIVERA", profesion: "INGENIERO" },
  { id: 18, nombre: "KATTY MENDOZA MURGADO", profesion: "ABOGADA" },
  { id: 19, nombre: "ISABEL ANDRADE VILLAVICENSIOS", profesion: "ABOGADA" },
  { id: 20, nombre: "ADOLFO ALONSO PULGAR SOAREZ", profesion: "ABOGADO" },
  { id: 21, nombre: "ROY ALEX PARIASCA VALERIO", profesion: "ABOGADO" },
  { id: 22, nombre: "PATRICIA MARY LORA RIOS", profesion: "ABOGADA" },
  { id: 23, nombre: "CARLOS ENRIQUE ALVAREZ SOLIS", profesion: "ABOGADO" },
  { id: 24, nombre: "CLARA MARIA ZAVALA MORA", profesion: "ABOGADA" },
  { id: 25, nombre: "HOMERO ABSALON SALAZAR CHAVEZ", profesion: "ABOGADO" },
  { id: 26, nombre: "IVAN PAREDEZ NEYRA", profesion: "ABOGADO" },
  { id: 27, nombre: "MIGUEL ANGEL SANTA CRUZ VITAL", profesion: "ABOGADO" },
  { id: 28, nombre: "MARIA ROCIO CANO GUERINONI", profesion: "ABOGADA" },
  { id: 29, nombre: "RAFAEL ARTIEDA ARAMBURÚ", profesion: "ABOGADO" },
  { id: 30, nombre: "ROBERTO CARLOS BENAVIDES PONTEX", profesion: "ABOGADO" },
  { id: 31, nombre: "ENRIQUE MARTIN LA ROSA UBILLAS", profesion: "ABOGADO" },
  { id: 32, nombre: "ELIZABETH RAMOS LARA", profesion: "ABOGADA" },
  { id: 33, nombre: "JUAN MANUEL HURTADO FALVY", profesion: "ABOGADO" },
  { id: 34, nombre: "GIANFRANCO RAUL FERRUZO DAVILA", profesion: "ABOGADO" },
  { id: 35, nombre: "LUIS ALFREDO LEON SEGURA", profesion: "ABOGADO" },
  { id: 36, nombre: "GIORGIO SCHIAPPA-PIETRA FUENTES", profesion: "ABOGADO" },
  { id: 37, nombre: "LAURA GUTIERREZ GONZALES", profesion: "ABOGADA" },
  { id: 39, nombre: "JUAN CARLOS PINTO ESCOBEDO", profesion: "ABOGADO" },
  { id: 40, nombre: "IVETTE EVELYN ALVINO CRUZ", profesion: "ABOGADA" },
  { id: 41, nombre: "LIZBETH NAILEA ANCCASI IZARRA", profesion: "ABOGADA" },
];

const conteoProfesiones = arbitros.reduce((acc, arbitro) => {
  acc[arbitro.profesion] = (acc[arbitro.profesion] || 0) + 1;
  return acc;
}, {});

export default function NominaArbitrosPage() {
  const [busqueda, setBusqueda] = useState("");

  const termino = busqueda.trim().toLowerCase();
  const filtrados = arbitros.filter((arbitro) => {
    const base = `${arbitro.nombre} ${arbitro.profesion}`.toLowerCase();
    return base.includes(termino);
  });

  return (
    <section className="public-shell page-block">
      <section className="roster-panel">
        <div className="roster-panel__top">
          <div className="roster-panel__summary">
            <span className="roster-chip">
              <i className="fa-solid fa-users" aria-hidden="true" />
              {arbitros.length} árbitros
            </span>
            {Object.entries(conteoProfesiones).map(([profesion, cantidad]) => (
              <span
                key={profesion}
                className={`roster-chip ${
                  profesion === "ABOGADO" ? "roster-chip--soft" : "roster-chip--neutral"
                }`}
              >
                <i className="fa-solid fa-layer-group" aria-hidden="true" />
                {cantidad} {profesion.toLowerCase()}
                {cantidad !== 1 ? "s" : ""}
              </span>
            ))}
          </div>

          <a className="roster-download" href="/docs/nomina-de-arbitros-2026.xlsx" download>
            <i className="fa-solid fa-file-excel" aria-hidden="true" />
            Descargar Excel
          </a>
        </div>

        <div className="roster-toolbar">
          <label className="roster-search" htmlFor="nomina-search">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
            <input
              id="nomina-search"
              type="search"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              placeholder="Buscar por nombre o profesión"
            />
          </label>
        </div>

        <div className="roster-table-wrap">
          <table className="roster-table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Nombres</th>
                <th>Profesión</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.length > 0 ? (
                filtrados.map((arbitro) => (
                  <tr key={arbitro.id}>
                    <td data-label="N°">{arbitro.id}</td>
                    <td data-label="Nombres">{arbitro.nombre}</td>
                    <td data-label="Profesión">{arbitro.profesion}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="roster-empty" colSpan="3">
                    No se encontraron árbitros con ese criterio de búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
