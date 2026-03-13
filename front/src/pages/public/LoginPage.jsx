import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <section className="auth-page">
      <div className="public-shell auth-page__shell">
        <div className="auth-card">
          <div className="auth-card__head">
            <p className="auth-card__eyebrow">Panel arbitral</p>
            <h2>Ingresar</h2>
            <p>
              Accede al panel para revisar expedientes, actuaciones,
              notificaciones y tramites vinculados al proceso arbitral.
            </p>
          </div>

          <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
            <label>
              Correo electronico
              <span className="auth-input">
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <input
                  type="email"
                  name="correo"
                  placeholder="usuario@dominio.com"
                  required
                />
              </span>
            </label>

            <label>
              Contrasena
              <span className="auth-input">
                <i className="fa-solid fa-lock" aria-hidden="true" />
                <input
                  type="password"
                  name="contrasena"
                  placeholder="Ingrese su contrasena"
                  required
                />
              </span>
            </label>

            <button type="submit" className="auth-submit">
              <i className="fa-solid fa-right-to-bracket" aria-hidden="true" />
              <span>Ingresar al sistema</span>
            </button>
          </form>

          <p className="auth-card__foot">
            Necesitas presentar una solicitud?{" "}
            <Link to="/registro">Inicia una nueva solicitud aqui</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
