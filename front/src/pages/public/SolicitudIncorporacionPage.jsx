const directivaSecciones = [
  {
    title: "Objeto y alcance",
    text:
      "La directiva regula el procedimiento de inscripción, renovación y actualización de datos en el Registro de Árbitros de la Corte Superior de Arbitraje de la Cámara de Comercio, Industria y Turismo de Ancash.",
  },
  {
    title: "Órgano competente",
    text:
      "El Consejo Superior de Arbitraje es el órgano competente para decidir la inscripción y renovación en el Registro de Árbitros. La Secretaría General comunica las decisiones y puede solicitar información para mantener actualizado el registro.",
  },
  {
    title: "Inscripción ordinaria",
    text:
      "El postulante presenta solicitud, hoja de vida, antecedentes, título profesional, constancias de capacitación mínima de 120 horas, DNI y comprobante de pago por postulación de S/ 100.00. Luego se realiza evaluación curricular, evaluación de conocimientos y entrevista personal.",
  },
  {
    title: "Modalidad extraordinaria",
    text:
      "El Consejo Superior de Arbitraje puede incorporar, de manera excepcional, a profesionales de reconocido prestigio académico, profesional y moral, sin seguir el procedimiento ordinario de selección.",
  },
  {
    title: "Renovación",
    text:
      "La renovación debe solicitarse al menos 30 días antes del vencimiento del registro. Requiere solicitud, hoja de vida actualizada, declaración jurada, constancias de capacitación, DNI y comprobante de pago de S/ 500.00.",
  },
  {
    title: "Actualización y reglas finales",
    text:
      "La actualización de datos se atiende dentro de cinco días hábiles. Los pagos se realizan en tesorería de la Cámara de Comercio, y las comunicaciones pueden ser físicas o electrónicas según el procedimiento aplicable.",
  },
];

const documentosIncorporacion = [
  {
    title: "Directiva - Árbitros CSAA",
    description: "Lineamientos para inscripción, renovación y actualización del registro de árbitros.",
    href: "/documentos/solitud-incoproracion/DIRECTIVA%20-%20ARBITROS-CSAA.pdf",
    tag: "PDF",
  },
  {
    title: "FO-ARB-01 Solicitud de Incorporación - Registro de Árbitros V.01",
    description: "Formato principal para iniciar el trámite de incorporación al registro.",
    href: "/documentos/solitud-incoproracion/FO-ARB-01%20Solicitud%20de%20Incorporaci%C3%B3n%20-%20Registro%20de%20%C3%81rbitros%20V.01.docx",
    tag: "DOCX",
  },
  {
    title: "FO-ARB-03 Declaración Jurada - Registro de Árbitros V.01",
    description: "Formato complementario para la declaración jurada exigida en el procedimiento.",
    href: "/documentos/solitud-incoproracion/FO-ARB-03%20Declaraci%C3%B3n%20Jurada%20-%20Registro%20de%20%C3%81rbitros%20V.01.docx",
    tag: "DOCX",
  },
];

export default function SolicitudIncorporacionPage() {
  return (
    <section className="public-shell page-block">
      <section className="incorporacion-page">
        <article className="incorporacion-hero-card">
          <div className="incorporacion-hero-card__copy">
            <p>
              Acceda al resumen de la directiva, descargue los formatos oficiales y
              utilice el sistema para iniciar su solicitud ante la Corte.
            </p>
          </div>

          <div className="incorporacion-hero-card__actions">
            <a
              className="roster-download"
              href="/registro"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-solid fa-user-plus" aria-hidden="true" />
              Ingresar al sistema
            </a>
            <a
              className="tariff-clear incorporacion-hero-card__secondary"
              href="/acceso"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-solid fa-right-to-bracket" aria-hidden="true" />
              Panel de acceso
            </a>
          </div>
        </article>

        <section className="incorporacion-docs">
          {documentosIncorporacion.map((documento) => (
            <a
              key={documento.title}
              className="incorporacion-doc"
              href={documento.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="incorporacion-doc__icon" aria-hidden="true">
                <i className="fa-solid fa-file-circle-check" />
              </span>
              <span className="incorporacion-doc__body">
                <strong>{documento.title}</strong>
                <small>{documento.description}</small>
              </span>
              <span className="incorporacion-doc__tag">{documento.tag}</span>
            </a>
          ))}
        </section>

        <article className="tariff-panel incorporacion-summary">
          <div className="tariff-panel__head">
            <p className="page-block__eyebrow">Resumen de la directiva</p>
            <h3>Lineamientos para inscripción y renovación</h3>
          </div>

          <div className="incorporacion-summary__grid">
            {directivaSecciones.map((item) => (
              <article key={item.title} className="incorporacion-summary__item">
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </article>

        <section className="tariff-grid incorporacion-process">
          <article className="tariff-panel tariff-panel--accent">
            <div className="tariff-panel__head">
              <p className="page-block__eyebrow">Ruta de incorporación</p>
              <h3>Modalidad ordinaria</h3>
            </div>

            <div className="tariff-criteria tariff-criteria--stack">
              <article className="tariff-criteria__item">
                <span className="tariff-criteria__dot" aria-hidden="true" />
                <div>
                  <h4>1. Presentación de solicitud</h4>
                  <p>
                    Se presenta la solicitud dirigida al Presidente del Consejo
                    Superior de Arbitraje, junto con hoja de vida y documentación de sustento.
                  </p>
                </div>
              </article>

              <article className="tariff-criteria__item">
                <span className="tariff-criteria__dot" aria-hidden="true" />
                <div>
                  <h4>2. Verificación y evaluación</h4>
                  <p>
                    La Secretaría General revisa requisitos, luego se realiza evaluación
                    curricular, examen de conocimientos y entrevista personal.
                  </p>
                </div>
              </article>

              <article className="tariff-criteria__item">
                <span className="tariff-criteria__dot" aria-hidden="true" />
                <div>
                  <h4>3. Aprobación e incorporación</h4>
                  <p>
                    Si el postulante es aprobado, se comunica la decisión y se realiza
                    el pago por derecho de incorporación de S/ 500.00.
                  </p>
                </div>
              </article>
            </div>
          </article>

          <article className="tariff-panel">
            <div className="tariff-panel__head">
              <p className="page-block__eyebrow">Documentación clave</p>
              <h3>Requisitos principales</h3>
            </div>

            <div className="incorporacion-checklist">
              {[
                "Solicitud dirigida al Consejo Superior de Arbitraje.",
                "Hoja de vida descriptiva.",
                "Antecedentes policiales, judiciales y penales.",
                "Título profesional legalizado.",
                "Capacitación mínima de 120 horas académicas.",
                "DNI y comprobantes de pago según el trámite.",
              ].map((item) => (
                <div key={item} className="incorporacion-checklist__item">
                  <i className="fa-solid fa-circle-check" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </section>
  );
}
