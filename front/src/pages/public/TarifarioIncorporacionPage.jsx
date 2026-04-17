const tramos = [
  { key: "0-4", label: "De 0 a 4 UIT", rate: 0.05 },
  { key: "4-10", label: "De 4 a 10 UIT", rate: 0.045 },
  { key: "10-20", label: "De 10 a 20 UIT", rate: 0.04 },
  { key: "20-100", label: "De 20 a 100 UIT", rate: 0.035 },
  { key: "100-200", label: "De 100 a 200 UIT", rate: 0.03 },
  { key: "200+", label: "Más de 200 UIT", rate: 0.025 },
];

export default function TarifarioIncorporacionPage() {
  return (
    <section className="public-shell page-block">
      <section className="tariff-grid">
        <article className="tariff-panel tariff-panel--soft">
          <div className="tariff-panel__head">
            <p className="page-block__eyebrow">Tasas por cuantía</p>
            <h3>Honorarios del árbitro único y gastos de la Corte</h3>
          </div>

          <div className="tariff-table-wrap">
            <table className="tariff-table">
              <thead>
                <tr>
                  <th>Tramo</th>
                  <th>Tasa</th>
                </tr>
              </thead>
              <tbody>
                {tramos.map((tramoItem) => (
                  <tr key={tramoItem.key}>
                    <td>{tramoItem.label}</td>
                    <td>{(tramoItem.rate * 100).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="tariff-panel tariff-panel--soft">
          <div className="tariff-panel__head">
            <p className="page-block__eyebrow">Notas operativas</p>
            <h3>Criterios resumidos de aplicación</h3>
          </div>

          <div className="tariff-criteria tariff-criteria--stack">
            <article className="tariff-criteria__item">
              <span className="tariff-criteria__dot" aria-hidden="true" />
              <div>
                <h4>No cuantificadas</h4>
                <p>Se liquidan según el cuadro de tasas, previa cuantificación.</p>
              </div>
            </article>

            <article className="tariff-criteria__item">
              <span className="tariff-criteria__dot" aria-hidden="true" />
              <div>
                <h4>No cuantificables</h4>
                <p>Se aplica el 2% del monto contractual por cada pretensión.</p>
              </div>
            </article>

            <article className="tariff-criteria__item">
              <span className="tariff-criteria__dot" aria-hidden="true" />
              <div>
                <h4>Tribunal arbitral</h4>
                <p>El resultado de honorarios del colegiado se multiplica por 2.</p>
              </div>
            </article>
          </div>
        </article>
      </section>
    </section>
  );
}
