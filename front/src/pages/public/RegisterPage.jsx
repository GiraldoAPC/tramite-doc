import { Link } from "react-router-dom";

const requiredDocuments = [
  "Copia de DNI del representante",
  "Contrato que contiene el convenio arbitral",
  "Contrato causal o documento principal de la controversia",
  "Comprobante de pago",
  "Contrato de consorcio, si corresponde",
  "Medios probatorios y anexos adicionales",
];

export default function RegisterPage() {
  return (
    <section className="auth-page">
      <div className="public-shell auth-page__shell">
        <div className="auth-card auth-card--request">
          <div className="auth-card__head auth-card__head--request">
            <div>
              <p className="auth-card__eyebrow">Inicio del proceso</p>
              <h2>Nueva solicitud arbitral</h2>
              <p>
                Complete la informacion necesaria para presentar su solicitud
                arbitral. La Secretaria General revisa los requisitos y luego
                comunica el numero de expediente correspondiente.
              </p>
            </div>

            <div className="auth-card__highlight">
              <strong>Informacion requerida</strong>
              <span>
                Identificacion de las partes, convenio arbitral, materia
                controvertida, notificaciones y documentos de sustento.
              </span>
            </div>
          </div>

          <form
            className="auth-form auth-form--request"
            onSubmit={(event) => event.preventDefault()}
          >
            <section className="auth-section">
              <div className="auth-section__head">
                <p className="auth-section__eyebrow">Representacion</p>
                <h3>Datos del representante</h3>
              </div>

              <div className="auth-grid auth-grid--two">
                <label>
                  Nombres y apellidos
                  <span className="auth-input">
                    <i className="fa-solid fa-user" aria-hidden="true" />
                    <input
                      type="text"
                      name="representante_nombre"
                      placeholder="Nombre completo del representante"
                      required
                    />
                  </span>
                </label>

                <label>
                  Cargo o calidad
                  <span className="auth-input">
                    <i className="fa-solid fa-briefcase" aria-hidden="true" />
                    <input
                      type="text"
                      name="representante_cargo"
                      placeholder="Apoderado, gerente, titular, etc."
                      required
                    />
                  </span>
                </label>

                <label>
                  Tipo de documento
                  <span className="auth-input auth-input--select">
                    <i className="fa-solid fa-address-card" aria-hidden="true" />
                    <select name="representante_tipo_documento" defaultValue="DNI" required>
                      <option value="DNI">DNI</option>
                      <option value="CE">Carnet de extranjeria</option>
                      <option value="PAS">Pasaporte</option>
                    </select>
                  </span>
                </label>

                <label>
                  Numero de documento
                  <span className="auth-input">
                    <i className="fa-solid fa-id-card" aria-hidden="true" />
                    <input
                      type="text"
                      name="representante_documento"
                      placeholder="Documento del representante"
                      required
                    />
                  </span>
                </label>

                <label>
                  Correo electronico
                  <span className="auth-input">
                    <i className="fa-solid fa-envelope" aria-hidden="true" />
                    <input
                      type="email"
                      name="representante_correo"
                      placeholder="correo@dominio.com"
                      required
                    />
                  </span>
                </label>

                <label>
                  Telefono celular
                  <span className="auth-input">
                    <i className="fa-solid fa-phone" aria-hidden="true" />
                    <input
                      type="tel"
                      name="representante_telefono"
                      placeholder="999999999"
                      required
                    />
                  </span>
                </label>
              </div>
            </section>

            <section className="auth-section">
              <div className="auth-section__head">
                <p className="auth-section__eyebrow">Partes procesales</p>
                <h3>Demandante y demandado</h3>
              </div>

              <div className="auth-grid auth-grid--two">
                <label>
                  Nombre o razon social del demandante
                  <span className="auth-input">
                    <i className="fa-solid fa-building-user" aria-hidden="true" />
                    <input
                      type="text"
                      name="demandante_nombre"
                      placeholder="Parte demandante"
                      required
                    />
                  </span>
                </label>

                <label>
                  DNI o RUC del demandante
                  <span className="auth-input">
                    <i className="fa-solid fa-file-lines" aria-hidden="true" />
                    <input
                      type="text"
                      name="demandante_documento"
                      placeholder="Documento o RUC"
                      required
                    />
                  </span>
                </label>

                <label>
                  Nombre o razon social del demandado
                  <span className="auth-input">
                    <i className="fa-solid fa-building" aria-hidden="true" />
                    <input
                      type="text"
                      name="demandado_nombre"
                      placeholder="Parte demandada"
                      required
                    />
                  </span>
                </label>

                <label>
                  DNI o RUC del demandado
                  <span className="auth-input">
                    <i className="fa-solid fa-file-signature" aria-hidden="true" />
                    <input
                      type="text"
                      name="demandado_documento"
                      placeholder="Documento o RUC"
                    />
                  </span>
                </label>
              </div>
            </section>

            <section className="auth-section">
              <div className="auth-section__head">
                <p className="auth-section__eyebrow">Base de la controversia</p>
                <h3>Informacion del arbitraje</h3>
              </div>

              <div className="auth-grid auth-grid--two">
                <label>
                  Convenio arbitral
                  <span className="auth-input auth-input--textarea">
                    <i className="fa-solid fa-scale-balanced" aria-hidden="true" />
                    <textarea
                      name="convenio_arbitral"
                      rows="4"
                      placeholder="Identifique la clausula o acuerdo arbitral aplicable"
                      required
                    />
                  </span>
                </label>

                <label>
                  Contrato causal
                  <span className="auth-input auth-input--textarea">
                    <i className="fa-solid fa-file-contract" aria-hidden="true" />
                    <textarea
                      name="contrato_causal"
                      rows="4"
                      placeholder="Contrato, orden, acuerdo o relacion juridica vinculada"
                      required
                    />
                  </span>
                </label>

                <label>
                  Materia controvertida
                  <span className="auth-input auth-input--textarea">
                    <i className="fa-solid fa-list-check" aria-hidden="true" />
                    <textarea
                      name="materia_controvertida"
                      rows="4"
                      placeholder="Describa la materia controvertida"
                      required
                    />
                  </span>
                </label>

                <label>
                  Resumen de la controversia
                  <span className="auth-input auth-input--textarea">
                    <i className="fa-solid fa-align-left" aria-hidden="true" />
                    <textarea
                      name="resumen_controversia"
                      rows="4"
                      placeholder="Resumen breve de los hechos y pretension principal"
                      required
                    />
                  </span>
                </label>

                <label>
                  Arbitro propuesto
                  <span className="auth-input">
                    <i className="fa-solid fa-gavel" aria-hidden="true" />
                    <input
                      type="text"
                      name="arbitro_propuesto"
                      placeholder="Si corresponde, indique arbitro propuesto"
                    />
                  </span>
                </label>

                <label>
                  Monto referencial en controversia
                  <span className="auth-input">
                    <i className="fa-solid fa-coins" aria-hidden="true" />
                    <input
                      type="text"
                      name="monto_controversia"
                      placeholder="Monto o indicar si es inestimable"
                    />
                  </span>
                </label>
              </div>
            </section>

            <section className="auth-section">
              <div className="auth-section__head">
                <p className="auth-section__eyebrow">Notificaciones</p>
                <h3>Canal oficial de comunicacion</h3>
              </div>

              <div className="auth-grid auth-grid--two">
                <label>
                  Medio principal de notificacion
                  <span className="auth-input auth-input--select">
                    <i className="fa-solid fa-bell" aria-hidden="true" />
                    <select name="medio_notificacion" defaultValue="electronica" required>
                      <option value="electronica">Notificacion electronica</option>
                      <option value="fisica">Mesa de partes fisica</option>
                      <option value="ambos">Ambas modalidades</option>
                    </select>
                  </span>
                </label>

                <label>
                  Domicilio procesal o direccion de contacto
                  <span className="auth-input">
                    <i className="fa-solid fa-location-dot" aria-hidden="true" />
                    <input
                      type="text"
                      name="domicilio_procesal"
                      placeholder="Direccion para notificaciones"
                      required
                    />
                  </span>
                </label>
              </div>

              <label className="auth-check">
                <input type="checkbox" name="acepta_reglamento" required />
                <span>
                  Declaro la aceptacion expresa del Reglamento de la Corte de
                  Arbitraje y la veracidad de la informacion presentada.
                </span>
              </label>
            </section>

            <section className="auth-section">
              <div className="auth-section__head">
                <p className="auth-section__eyebrow">Adjuntos</p>
                <h3>Documentos para cargar al expediente</h3>
              </div>

              <div className="auth-upload-list">
                {requiredDocuments.map((item, index) => (
                  <label key={item} className="auth-upload">
                    <span className="auth-upload__label">{item}</span>
                    <span className="auth-input auth-input--file">
                      <i className="fa-solid fa-paperclip" aria-hidden="true" />
                      <input type="file" name={`archivo_${index + 1}`} />
                    </span>
                  </label>
                ))}
              </div>
            </section>

            <div className="auth-request__actions">
              <button type="submit" className="auth-submit">
                <i className="fa-solid fa-file-circle-plus" aria-hidden="true" />
                <span>Registrar solicitud base</span>
              </button>

              <p className="auth-card__foot auth-card__foot--inline">
                Ya tienes acceso al sistema? <Link to="/acceso">Ingresa aqui</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
