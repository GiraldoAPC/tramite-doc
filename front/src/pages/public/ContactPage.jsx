export default function ContactPage() {
  return (
    <section className="public-shell page-block contact-page">
      <div className="contact-hero">
        <section className="contact-form-panel">
          <div className="contact-section-head">
            <p className="contact-section-head__eyebrow">Escribanos</p>
            <h3>Formulario de contacto</h3>
            <p>
              Envie su consulta y el equipo institucional podra derivarla al
              area arbitral o administrativa correspondiente.
            </p>
            <p className="contact-required-note">
              Todos los campos son obligatorios.
            </p>
          </div>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              Nombre completo
              <span className="contact-input">
                <i className="fa-solid fa-user" aria-hidden="true" />
                <em className="contact-required" aria-hidden="true">*</em>
                <input
                  type="text"
                  placeholder="Ingrese su nombre completo"
                  required
                  minLength="6"
                  autoComplete="name"
                />
              </span>
            </label>

            <label>
              Correo electronico
              <span className="contact-input">
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <em className="contact-required" aria-hidden="true">*</em>
                <input
                  type="email"
                  placeholder="correo@dominio.com"
                  required
                  autoComplete="email"
                />
              </span>
            </label>

            <label>
              Telefono
              <span className="contact-input">
                <i className="fa-solid fa-phone" aria-hidden="true" />
                <em className="contact-required" aria-hidden="true">*</em>
                <input
                  type="tel"
                  placeholder="972495162"
                  required
                  inputMode="numeric"
                  pattern="[0-9]{9,15}"
                  minLength="9"
                  autoComplete="tel"
                />
              </span>
            </label>

            <label className="contact-form__full">
              Mensaje
              <span className="contact-textarea">
                <i className="fa-solid fa-pen-to-square" aria-hidden="true" />
                <em className="contact-required" aria-hidden="true">*</em>
                <textarea
                  rows="6"
                  placeholder="Describa su consulta sobre arbitraje, escritos, solicitudes o atencion institucional."
                  required
                  minLength="20"
                />
              </span>
            </label>

            <button type="submit" className="contact-submit">
              <i className="fa-solid fa-paper-plane" aria-hidden="true" />
              <span>Enviar consulta</span>
            </button>
          </form>
        </section>

        <div className="contact-card">
          <p className="contact-card__eyebrow">Datos principales</p>
          <ul className="contact-info">
            <li>
              <i className="fa-solid fa-building-columns" aria-hidden="true" />
              <div>
                <strong>Direccion</strong>
                <span>Jr. Jose de Sucre 765 - 3 er Piso - Huaraz - Ancash - Peru</span>
              </div>
            </li>
            <li>
              <i className="fa-solid fa-phone-volume" aria-hidden="true" />
              <div>
                <strong>Telefono</strong>
                <span>972495162</span>
              </div>
            </li>
            <li>
              <i className="fa-solid fa-envelope-open-text" aria-hidden="true" />
              <div>
                <strong>Correo electronico</strong>
                <span>secretariageneralcaa@camaradeancash.org.pe</span>
                <span>centrodearbitrajedeancash@camaradeancash.org.pe</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <section className="contact-map-panel contact-map-panel--full">
        <div className="contact-map-panel__inner">
          <div className="contact-section-head">
            <p className="contact-section-head__eyebrow">Ubicacion</p>
            <h3>Mapa de referencia</h3>
            <p>
              Encuentrenos en la sede institucional para atencion presencial,
              coordinacion de tramites y consultas administrativas.
            </p>
          </div>
        </div>

        <div className="contact-map-wrap">
          <div className="contact-map-overlay">
            <p className="contact-map-overlay__eyebrow">Sede institucional</p>
            <h4>Camara de Comercio, Industria y Turismo de Ancash</h4>
            <p>Jr. Jose de Sucre 765 - 3 er Piso - Huaraz - Ancash - Peru</p>
            <a
              href="https://maps.app.goo.gl/sSMHNEHaX4BM6EAF8"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-map-overlay__cta"
            >
              <i className="fa-solid fa-location-arrow" aria-hidden="true" />
              <span>Abrir en Google Maps</span>
            </a>
          </div>

          <iframe
            title="Mapa Camara de Comercio de Ancash"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4679.253194886378!2d-77.53185849726285!3d-9.528940889254095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a90d1018ef143b%3A0xe71240442c2e6e4a!2sC%C3%A1mara%20de%20Comercio%2C%20Industria%20y%20Turismo%20de%20%C3%81ncash!5e0!3m2!1ses-419!2spe!4v1773384011539!5m2!1ses-419!2spe"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </section>
  );
}
