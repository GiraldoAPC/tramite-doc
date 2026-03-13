export default function ResourcePage({ eyebrow, title, description }) {
  return (
    <section className="public-shell page-block">
      <div className="page-block__header">
        <p className="page-block__eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  );
}
