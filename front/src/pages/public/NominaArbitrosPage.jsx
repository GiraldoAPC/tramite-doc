import { useState } from "react";

const arbitros = [
  { id: 1, nombre: "AUGUSTO VILLANUEVA LLAQUE", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 2, nombre: "CARLOS MATHEUS LOPEZ", profesion: "ABOGADO", rna: "" },
  { id: 3, nombre: "CARLOS ALBERTO SOTO COAGUILA", profesion: "ABOGADO", rna: "" },
  { id: 4, nombre: "DANIEL TRIVEÑO DAZA", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 5, nombre: "HALLEY LOPEZ ZALDIVAR", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 6, nombre: "HUGO VILLAR ÑAÑEZ", profesion: "ABOGADO", rna: "" },
  { id: 7, nombre: "HUGO ERNESTO SOLOGUREN CALMET PONTE", profesion: "ABOGADO", rna: "" },
  { id: 8, nombre: "HUMBERTO FLORES AREVALO", profesion: "ABOGADO", rna: "" },
  { id: 9, nombre: "JHOEL CHIPANA CATALÁN", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 10, nombre: "JOSE ANTONIO LEON RODRIGUEZ", profesion: "ABOGADO", rna: "" },
  { id: 11, nombre: "JOSE LUIS MANDUJANO RUBIN", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 12, nombre: "LUIS PUGLIANINI GUERRA", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 13, nombre: "MARIA DEL CARMEN SEGURA CORDOVA", profesion: "ABOGADA", rna: "" },
  { id: 14, nombre: "MARIO MANUEL SILVA LOPEZ", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 15, nombre: "PATRICK HURTADO TUEROS", profesion: "ABOGADO", rna: "" },
  { id: 16, nombre: "RENEE LUCIA DE FATIMA PELAEZ RAMIREZ", profesion: "ABOGADA", rna: "VIGENTE" },
  { id: 17, nombre: "SANDRO ESPINOZA QUIÑONES", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 18, nombre: "ANTONIO ISAIAS SOLORZANO REPETTO", profesion: "MEDICO", rna: "" },
  { id: 19, nombre: "LORENZO DOLORES RIVERA", profesion: "INGENIERO", rna: "" },
  { id: 20, nombre: "KATTY MENDOZA MURGADO", profesion: "ABOGADA", rna: "VIGENTE" },
  { id: 21, nombre: "ISABEL ANDRADE VILLAVICENSIOS", profesion: "ABOGADA", rna: "VIGENTE" },
  { id: 22, nombre: "ADOLFO ALONSO PULGAR SOAREZ", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 23, nombre: "ROY ALEX PARIASCA VALERIO", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 24, nombre: "PATRICIA MARY LORA RIOS", profesion: "ABOGADA", rna: "VIGENTE" },
  { id: 25, nombre: "CARLOS ENRIQUE ALVAREZ SOLIS", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 26, nombre: "CLARA MARIA ZAVALA MORA", profesion: "ABOGADA", rna: "VIGENTE" },
  { id: 27, nombre: "HOMERO ABSALON SALAZAR CHAVEZ", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 28, nombre: "IVAN PAREDEZ NEYRA", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 29, nombre: "MIGUEL ANGEL SANTA CRUZ VITAL", profesion: "ABOGADO", rna: "" },
  { id: 30, nombre: "MARIA ROCIO CANO GUERINONI", profesion: "ABOGADA", rna: "" },
  { id: 31, nombre: "RAFAEL ARTIEDA ARAMBURÚ", profesion: "ABOGADO", rna: "" },
  { id: 32, nombre: "ROBERTO CARLOS BENAVIDES PONTEX", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 33, nombre: "ENRIQUE MARTIN LA ROSA UBILLAS", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 34, nombre: "MIGUEL ERNESTO PALACIOS CHAVEZ", profesion: "ABOGADO", rna: "" },
  { id: 35, nombre: "ELIZABETH RAMOS LARA", profesion: "ABOGADA", rna: "" },
  { id: 36, nombre: "JUAN MANUEL HURTADO FALVY", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 37, nombre: "GIANFRANCO RAUL FERRUZO DAVILA", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 38, nombre: "LUIS ALFREDO LEON SEGURA", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 39, nombre: "GIORGIO SCHIAPPA-PIETRA FUENTES", profesion: "ABOGADO", rna: "" },
  { id: 40, nombre: "LAURA GUTIERREZ GONZALES", profesion: "ABOGADA", rna: "" },
  { id: 41, nombre: "JUAN CARLOS PINTO ESCOBEDO", profesion: "ABOGADO", rna: "VIGENTE" },
  { id: 42, nombre: "IVETTE EVELYN ALVINO CRUZ", profesion: "ABOGADA", rna: "VIGENTE" },
  { id: 43, nombre: "LIZBETH NAILEA ANCCASI IZARRA", profesion: "ABOGADA", rna: "" },
];

const vigentes = arbitros.filter((item) => item.rna === "VIGENTE").length;

export default function NominaArbitrosPage() {
  const [busqueda, setBusqueda] = useState("");

  const termino = busqueda.trim().toLowerCase();
  const filtrados = arbitros.filter((arbitro) => {
    const base = `${arbitro.nombre} ${arbitro.profesion} ${arbitro.rna || "sin dato"}`.toLowerCase();
    return base.includes(termino);
  });

  return (
    <section className="public-shell page-block">
      <div className="page-block__header">
        <p className="page-block__eyebrow">Directorio institucional</p>
        <h2>Nómina de árbitros</h2>
        <p>
          Relación oficial de profesionales que integran la nómina institucional
          de la Corte de Arbitraje para el periodo 2026.
        </p>
      </div>

      <section className="roster-panel">
        <div className="roster-panel__top">
          <div className="roster-panel__summary">
            <span className="roster-chip">
              <i className="fa-solid fa-users" aria-hidden="true" />
              {arbitros.length} árbitros
            </span>
            <span className="roster-chip roster-chip--soft">
              <i className="fa-solid fa-certificate" aria-hidden="true" />
              {vigentes} con RNA vigente
            </span>
            <span className="roster-chip roster-chip--neutral">
              <i className="fa-solid fa-filter" aria-hidden="true" />
              {filtrados.length} resultados
            </span>
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
              placeholder="Buscar por nombre, profesión o estado RNA"
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
                <th>RNA</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.length > 0 ? (
                filtrados.map((arbitro) => (
                  <tr key={arbitro.id}>
                    <td data-label="N°">{arbitro.id}</td>
                    <td data-label="Nombres">{arbitro.nombre}</td>
                    <td data-label="Profesión">{arbitro.profesion}</td>
                    <td data-label="RNA">
                      {arbitro.rna ? (
                        <span className="rna-badge">Vigente</span>
                      ) : (
                        <span className="rna-badge rna-badge--muted">Sin dato</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="roster-empty" colSpan="4">
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
