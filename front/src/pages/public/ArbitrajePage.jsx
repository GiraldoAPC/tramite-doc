export default function ArbitrajePage() {
  return (
    <section className="public-shell page-block">
      <div className="page-block__header">
        <p className="page-block__eyebrow">Vista pública</p>
        <h2>Arbitraje</h2>
        <p>
          Aquí migramos el contenido de `webcorte/arbitraje.php` a componentes
          React y luego lo conectamos con datos de Laravel.
        </p>
      </div>

      <div className="content-grid">
        <article className="content-card">
          <h3>Servicios</h3>
          <p>
            Lista de servicios arbitrales, requisitos y flujo de atención.
          </p>
        </article>
        <article className="content-card">
          <h3>Normativa</h3>
          <p>
            Reglamentos, formatos y documentos descargables administrados desde
            backend.
          </p>
        </article>
        <article className="content-card">
          <h3>Contacto</h3>
          <p>
            Información pública, horarios y canales para consultas de usuarios.
          </p>
        </article>
      </div>
    </section>
  );
}
