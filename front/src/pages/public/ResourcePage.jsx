function ResourceLink({ document }) {
  const content = (
    <>
      <div className="resource-item__body">
        <p className="resource-item__eyebrow">{document.category}</p>
        <h3>{document.title}</h3>
        <p>{document.description}</p>
      </div>
      <span className="resource-item__cta">
        <i
          className={`fa-solid ${document.href ? "fa-file-pdf" : "fa-folder-open"}`}
          aria-hidden="true"
        />
        {document.href ? "PDF" : "Ubicación sugerida"}
      </span>
    </>
  );

  if (!document.href) {
    return (
      <article className="resource-item resource-item--placeholder">
        {content}
      </article>
    );
  }

  return (
    <a
      className="resource-item"
      href={document.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  );
}

export default function ResourcePage({
  eyebrow,
  title,
  description,
  documents = [],
  sections = [],
}) {
  const resolvedSections = sections.length
    ? sections
    : documents.length
      ? [{ title: "Documentos disponibles", items: documents }]
      : [];

  return (
    <section className="public-shell page-block">
      <div className="page-block__header">
        <p className="page-block__eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {resolvedSections.length ? (
        <div className="resource-sections">
          {resolvedSections.map((section) => (
            <section key={section.title} className="resource-section">
              <div className="resource-section__header">
                <p className="resource-section__eyebrow">{section.eyebrow ?? "Sección documental"}</p>
                <h3>{section.title}</h3>
                {section.description ? <p>{section.description}</p> : null}
              </div>

              <div className="resource-list">
                {section.items.map((document) => (
                  <ResourceLink
                    key={document.href ?? `${section.title}-${document.title}`}
                    document={document}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : null}
    </section>
  );
}
