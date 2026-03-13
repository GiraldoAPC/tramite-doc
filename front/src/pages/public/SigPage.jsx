const sigDocuments = [
  {
    category: "Certificacion ISO 9001",
    title: "Camara de Comercio 9001 IAS Spanish",
    description:
      "Certificacion vinculada al sistema de gestion de calidad institucional.",
    href: "/documentos/SIG/CAMARA%20DE%20COMERCIO%209001%20IAS%20SPANISH.pdf",
    accent: "sig-doc--quality",
  },
  {
    category: "Certificacion ISO 37001",
    title: "Camara de Comercio 37001 IAS Spanish",
    description:
      "Certificacion vinculada al sistema de gestion antisoborno institucional.",
    href: "/documentos/SIG/CAMARA%20DE%20COMERCIO%2037001%20IAS%20SPANISH.pdf",
    accent: "sig-doc--compliance",
  },
];

const sigMarks = [
  { src: "/img/certificaciones/ias.png", alt: "IAS" },
  { src: "/img/certificaciones/iaf.png", alt: "IAF" },
  { src: "/img/certificaciones/acs.png", alt: "ACS" },
];

export default function SigPage() {
  return (
    <section className="public-shell page-block sig-page">
      <div className="sig-hero">
        <div className="sig-hero__copy">
          <p className="page-block__eyebrow">Sistema Integrado de Gestion</p>
          <h2>Certificaciones y documentos SIG</h2>
          <p>
            Acceda a los certificados institucionales publicados para calidad y
            cumplimiento, con respaldo visual de los organismos de
            certificacion.
          </p>
        </div>

        <div className="sig-hero__marks" aria-label="Certificaciones">
          {sigMarks.map((mark) => (
            <div key={mark.alt} className="sig-mark">
              <img src={mark.src} alt={mark.alt} />
            </div>
          ))}
        </div>
      </div>

      <div className="sig-docs">
        {sigDocuments.map((document) => (
          <a
            key={document.href}
            className={`sig-doc ${document.accent}`}
            href={document.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="sig-doc__meta">
              <p className="sig-doc__eyebrow">{document.category}</p>
              <h3>{document.title}</h3>
              <p>{document.description}</p>
            </div>

            <div className="sig-doc__side">
              <div className="sig-doc__badge">
                <i className="fa-solid fa-shield-halved" aria-hidden="true" />
                <span>SIG</span>
              </div>
              <span className="sig-doc__cta">
                <i className="fa-solid fa-file-pdf" aria-hidden="true" />
                PDF
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
