import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

export default function HomePage() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/health`)
      .then((r) => r.json())
      .then(setHealth)
      .catch(() => setHealth({ ok: false }));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="public-shell hero__grid">
          <div>
            <p className="hero__kicker">Web pública + React + Laravel</p>
            <h2 className="hero__title">
              Portal público integrado, listo para crecer con contenido dinámico
            </h2>
            <p className="hero__copy">
              Esta base reemplaza gradualmente `webcorte` dentro de React para
              que puedas jalar datos públicos desde Laravel sin duplicar vistas.
            </p>
            <div className="hero__actions">
              <Link to="/arbitraje" className="btn btn--primary">
                Ver Arbitraje
              </Link>
              <Link to="/organizacion" className="btn btn--ghost">
                Ver Organización
              </Link>
            </div>
          </div>

          <aside className="hero__panel" aria-label="Estado del sistema">
            <h3>Estado backend</h3>
            <p className="hero__panel-label">API Laravel</p>
            <p className={`hero__status ${health?.ok ? "ok" : "warn"}`}>
              {health?.ok ? "Conectado" : "Sin respuesta"}
            </p>
            <pre className="hero__pre">
              {health ? JSON.stringify(health, null, 2) : "Consultando..."}
            </pre>
          </aside>
        </div>
      </section>

      <section className="public-shell cards-section">
        <article className="info-card">
          <p className="info-card__eyebrow">Paso 1</p>
          <h3>Migrar diseño</h3>
          <p>
            Pasar visualmente `webcorte/index.php` a componentes React.
          </p>
        </article>

        <article className="info-card">
          <p className="info-card__eyebrow">Paso 2</p>
          <h3>Contenido dinámico</h3>
          <p>
            Exponer banners, textos y secciones desde endpoints públicos de
            Laravel.
          </p>
        </article>

        <article className="info-card">
          <p className="info-card__eyebrow">Paso 3</p>
          <h3>Panel admin</h3>
          <p>
            Editar el contenido desde `/app` usando Sanctum y formularios.
          </p>
        </article>
      </section>
    </>
  );
}
