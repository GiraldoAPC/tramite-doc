import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <section className="auth-page">
      <div className="public-shell auth-page__shell">
        <div className="auth-card">
          <div className="auth-card__head">
            <p className="auth-card__eyebrow">Acceso al sistema</p>
            <h2>Ingresar</h2>
            <p>
              Accede al panel de trámite documentario y servicios internos.
            </p>
          </div>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              Correo electrónico
              <span className="auth-input">
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <input type="email" placeholder="usuario@dominio.com" />
              </span>
            </label>

            <label>
              Contraseña
              <span className="auth-input">
                <i className="fa-solid fa-lock" aria-hidden="true" />
                <input type="password" placeholder="••••••••" />
              </span>
            </label>

            <button type="submit" className="auth-submit">
              <i className="fa-solid fa-right-to-bracket" aria-hidden="true" />
              <span>Ingresar al sistema</span>
            </button>
          </form>

          <p className="auth-card__foot">
            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
