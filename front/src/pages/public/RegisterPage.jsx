import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <section className="auth-page">
      <div className="public-shell auth-page__shell">
        <div className="auth-card auth-card--wide">
          <div className="auth-card__head">
            <p className="auth-card__eyebrow">Cuenta nueva</p>
            <h2>Registrarse</h2>
            <p>
              Crea tu cuenta para ingreso de solicitudes, escritos y consulta de
              expedientes.
            </p>
          </div>

          <form className="auth-form auth-form--grid" onSubmit={(e) => e.preventDefault()}>
            <label>
              Nombres y apellidos
              <span className="auth-input">
                <i className="fa-solid fa-user" aria-hidden="true" />
                <input type="text" placeholder="Nombre completo" />
              </span>
            </label>

            <label>
              DNI / RUC
              <span className="auth-input">
                <i className="fa-solid fa-id-card" aria-hidden="true" />
                <input type="text" placeholder="Documento" />
              </span>
            </label>

            <label>
              Correo electrónico
              <span className="auth-input">
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <input type="email" placeholder="usuario@dominio.com" />
              </span>
            </label>

            <label>
              Celular
              <span className="auth-input">
                <i className="fa-solid fa-phone" aria-hidden="true" />
                <input type="tel" placeholder="999 999 999" />
              </span>
            </label>

            <label>
              Contraseña
              <span className="auth-input">
                <i className="fa-solid fa-lock" aria-hidden="true" />
                <input type="password" placeholder="••••••••" />
              </span>
            </label>

            <label>
              Confirmar contraseña
              <span className="auth-input">
                <i className="fa-solid fa-shield-halved" aria-hidden="true" />
                <input type="password" placeholder="••••••••" />
              </span>
            </label>

            <button type="submit" className="auth-submit auth-submit--full">
              <i className="fa-solid fa-user-plus" aria-hidden="true" />
              <span>Crear cuenta</span>
            </button>
          </form>

          <p className="auth-card__foot">
            ¿Ya tienes cuenta? <Link to="/acceso">Ingresa aquí</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
