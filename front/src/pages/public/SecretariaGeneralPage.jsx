export default function SecretariaGeneralPage() {
  return (
    <section className="public-shell page-block">
      <section className="secretaria-panel">
        <div className="secretaria-panel__intro">
          <p>
            La Corte cuenta con una Secretaría General, que constituye la autoridad
            administrativa responsable de la gestión y administración de la Corte,
            así como del fiel cumplimiento de los acuerdos adoptados por el Consejo
            Superior de Arbitraje.
          </p>

          <p>
            La Secretaría General se encuentra a cargo de la Dra. María del Carmen
            Segura Córdova, quien cuenta con sólidos conocimientos y amplia
            experiencia en mecanismos alternativos de solución de controversias,
            contribuyendo al adecuado funcionamiento y fortalecimiento institucional
            de la Corte.
          </p>
        </div>

        <article className="secretaria-responsable">
          <div className="secretaria-responsable__badge" aria-hidden="true">
            <i className="fa-solid fa-building-user" />
          </div>

          <div className="secretaria-responsable__body">
            <h3>Dra. María del Carmen Segura Córdova</h3>
            <p className="secretaria-responsable__role">
              Responsable de la gestión administrativa y el soporte institucional
              de la Corte de Arbitraje.
            </p>
          </div>
        </article>
      </section>
    </section>
  );
}
