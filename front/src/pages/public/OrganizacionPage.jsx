export default function OrganizacionPage() {
  return (
    <section className="public-shell page-block">
      <div className="page-block__header">
        <p className="page-block__eyebrow">Vista pública</p>
        <h2>Organización</h2>
        <p>
          Página base para migrar `webcorte/organizacion.php` y publicar
          estructura institucional desde Laravel.
        </p>
      </div>

      <div className="timeline-list">
        <div className="timeline-item">
          <span className="timeline-item__dot" aria-hidden="true" />
          <div>
            <h3>Misión y visión</h3>
            <p>
              Sección editable en backend para que el equipo actualice textos.
            </p>
          </div>
        </div>

        <div className="timeline-item">
          <span className="timeline-item__dot" aria-hidden="true" />
          <div>
            <h3>Estructura organizacional</h3>
            <p>
              Miembros, cargos y perfiles con datos cargados desde API pública.
            </p>
          </div>
        </div>

        <div className="timeline-item">
          <span className="timeline-item__dot" aria-hidden="true" />
          <div>
            <h3>Documentos y enlaces</h3>
            <p>
              Publicación centralizada de archivos para evitar cambios manuales
              en vistas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
