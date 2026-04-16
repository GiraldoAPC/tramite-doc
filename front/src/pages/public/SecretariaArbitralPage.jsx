export default function SecretariaArbitralPage() {
  return (
    <section className="public-shell page-block">
      <section className="secretaria-panel">
        <div className="secretaria-panel__intro">
          <p>
            La Secretaria General cuenta con secretarios(as) arbitrales y personal
            administrativo, quienes son los encargados de asistir a los arbitros
            de los procesos arbitrales.
          </p>
        </div>

        <section className="secretaria-team">
          <article className="secretaria-responsable">
            <div className="secretaria-responsable__badge" aria-hidden="true">
              <i className="fa-solid fa-building-user" />
            </div>

            <div className="secretaria-responsable__body">
              <h3>Dra. Maria del Carmen Segura Cordova</h3>
            </div>
          </article>

          <article className="secretaria-responsable">
            <div className="secretaria-responsable__badge" aria-hidden="true">
              <i className="fa-solid fa-user-tie" />
            </div>

            <div className="secretaria-responsable__body">
              <h3>Angela Daniel Montalvo Orellana</h3>
            </div>
          </article>
        </section>
      </section>
    </section>
  );
}
