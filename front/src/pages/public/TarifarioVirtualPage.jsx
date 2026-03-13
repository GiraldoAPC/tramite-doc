import { useEffect, useMemo, useRef, useState } from "react";

const UIT = 5500;
const TAX_RATE = 0.18;
const NON_QUANTIFIABLE_RATE = 0.02;
const REQUEST_FEE = 500;

const tramos = [
  { key: "0-4", label: "De 0 a 4 UIT", min: 0, max: 4, rate: 0.05 },
  { key: "4-10", label: "De 4 a 10 UIT", min: 4, max: 10, rate: 0.045 },
  { key: "10-20", label: "De 10 a 20 UIT", min: 10, max: 20, rate: 0.04 },
  { key: "20-100", label: "De 20 a 100 UIT", min: 20, max: 100, rate: 0.035 },
  { key: "100-200", label: "De 100 a 200 UIT", min: 100, max: 200, rate: 0.03 },
  { key: "200+", label: "Mas de 200 UIT", min: 200, max: Number.POSITIVE_INFINITY, rate: 0.025 },
];

const cargosFijos = [
  { codigo: "AR-01", concepto: "Presentacion de solicitud de arbitraje", monto: 500 },
  { codigo: "DA-01", concepto: "Designacion de arbitro", monto: 500 },
  { codigo: "RR-01", concepto: "Resolucion de recusacion de un arbitro", monto: 500 },
  { codigo: "RR-02", concepto: "Resolucion de recusacion de dos arbitros", monto: 750 },
  { codigo: "RR-03", concepto: "Resolucion de recusacion de tres arbitros", monto: 1000 },
  { codigo: "RA-01", concepto: "Postulacion a la inscripcion al registro de arbitros", monto: 100 },
  { codigo: "RA-02", concepto: "Inscripcion al registro de arbitros", monto: 500 },
  { codigo: "RA-03", concepto: "Renovacion del registro de arbitros", monto: 500 },
  { codigo: "EC-01", concepto: "Emision de copias simples por pagina", monto: 1 },
  { codigo: "EC-02", concepto: "Emision de copias certificadas por pagina", monto: 3 },
  { codigo: "CA-01", concepto: "Resolucion de incidencias sobre liquidacion de costos arbitrales", monto: 500 },
];

function getRate(uitValue) {
  return tramos.find((item) => uitValue >= item.min && uitValue < item.max) ?? tramos[tramos.length - 1];
}

function formatMoney(value) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(Number(value || 0));
}

function CustomSelect({ label, value, options, onChange, fullWidth = false }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const selected = options.find((item) => item.value === value) ?? options[0];

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className={`tariff-field${fullWidth ? " tariff-field--full" : ""}`} ref={rootRef}>
      <span>{label}</span>
      <div className={`tariff-select${open ? " is-open" : ""}`}>
        <button
          className="tariff-select__trigger"
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span>{selected?.label}</span>
          <i className="fa-solid fa-chevron-down" aria-hidden="true" />
        </button>

        {open ? (
          <div className="tariff-select__menu" role="listbox" aria-label={label}>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                className={`tariff-select__option${option.value === value ? " is-selected" : ""}`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {option.value === value ? (
                  <i className="fa-solid fa-check" aria-hidden="true" />
                ) : null}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function TarifarioVirtualPage() {
  const [monto, setMonto] = useState("");
  const [tipoArbitro, setTipoArbitro] = useState("unico");
  const [pretension, setPretension] = useState("cuantificada");
  const [montoContractual, setMontoContractual] = useState(0);
  const [cantidadPretensiones, setCantidadPretensiones] = useState(1);
  const [incluirIgv, setIncluirIgv] = useState(false);

  const pretensionOptions = [
    { value: "cuantificada", label: "Pretension cuantificada" },
    { value: "no_cuantificada", label: "Pretension no cuantificada" },
    { value: "no_cuantificable", label: "Pretension no cuantificable" },
  ];

  const arbitroOptions = [
    { value: "unico", label: "Arbitro unico" },
    { value: "tribunal", label: "Tribunal arbitral (3 arbitros)" },
  ];

  const resultado = useMemo(() => {
    const solicitud = REQUEST_FEE;
    let baseMonto = Number(monto) || 0;
    let detalleBase = "La base calculable corresponde al monto de la controversia.";

    if (pretension === "no_cuantificable") {
      baseMonto =
        ((Number(montoContractual) || 0) * NON_QUANTIFIABLE_RATE) *
        Math.max(1, Number(cantidadPretensiones) || 1);
      detalleBase = `La base calculable corresponde al ${(NON_QUANTIFIABLE_RATE * 100).toFixed(
        0
      )}% del monto contractual por cada pretension no cuantificable.`;
    } else if (pretension === "no_cuantificada") {
      detalleBase =
        "La pretension no cuantificada se liquida previa cuantificacion. En esta vista se usa el monto estimado ingresado.";
    }

    const uitValue = UIT > 0 ? baseMonto / UIT : 0;
    const tramo = getRate(uitValue);
    const honorariosBase = baseMonto * tramo.rate;
    const gastosAdminBase = baseMonto * tramo.rate;
    const multiplicadorArbitro = tipoArbitro === "tribunal" ? 2 : 1;
    const honorarios = honorariosBase * multiplicadorArbitro;
    const gastosAdmin = gastosAdminBase;
    const subtotal = solicitud + honorarios + gastosAdmin;
    const impuesto = incluirIgv ? subtotal * TAX_RATE : 0;
    const total = subtotal + impuesto;

    return {
      baseMonto,
      detalleBase,
      uitValue,
      tramo,
      solicitud,
      honorarios,
      gastosAdmin,
      subtotal,
      impuesto,
      total,
    };
  }, [cantidadPretensiones, incluirIgv, monto, montoContractual, pretension, tipoArbitro]);

  const resetCalculator = () => {
    setMonto("");
    setTipoArbitro("unico");
    setPretension("cuantificada");
    setMontoContractual(0);
    setCantidadPretensiones(1);
    setIncluirIgv(false);
  };

  return (
    <section className="public-shell page-block">
      <div className="page-block__header">
        <p className="page-block__eyebrow">Servicios institucionales</p>
        <h2>Tarifario virtual</h2>
        <p>
          Cuadro de tasas y calculadora referencial para costos arbitrales,
          conforme al anexo institucional vigente.
        </p>
      </div>

      <section className="tariff-hero">
        <div className="tariff-hero__copy">
          <span className="tariff-kicker">Cuadro de tasas</span>
          <h3>Calculadora de costos arbitrales</h3>
          <p>
            Estime gastos administrativos, honorarios arbitrales y costo total
            segun la cuantia, tipo de arbitro y reglas aplicables del tarifario.
          </p>
        </div>

        <a
          className="roster-download"
          href="/docs/tarifario-gastos-arbitrales.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-solid fa-file-pdf" aria-hidden="true" />
          Descargar PDF
        </a>
      </section>

      <section className="tariff-calculator-grid">
        <article className="tariff-panel">
          <div className="tariff-panel__head">
            <p className="page-block__eyebrow">Datos del arbitraje</p>
            <h3>Configuracion de la liquidacion</h3>
          </div>

          <div className="tariff-form tariff-form--stack">
            <CustomSelect
              label="Tipo de pretension"
              value={pretension}
              options={pretensionOptions}
              onChange={setPretension}
              fullWidth
            />

            {pretension !== "no_cuantificable" ? (
              <label className="tariff-field">
                <span>
                  {pretension === "no_cuantificada"
                    ? "Monto estimado para cuantificacion previa (S/)"
                    : "Monto de la controversia (S/)"}
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={monto}
                  onChange={(event) => setMonto(event.target.value)}
                  placeholder="Ingrese el monto"
                />
              </label>
            ) : (
              <>
                <label className="tariff-field">
                  <span>Monto contractual (S/)</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={montoContractual}
                    onChange={(event) => setMontoContractual(Number(event.target.value))}
                    placeholder="Ingrese el monto contractual"
                  />
                </label>

                <label className="tariff-field">
                  <span>Cantidad de pretensiones</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={cantidadPretensiones}
                    onChange={(event) => setCantidadPretensiones(Number(event.target.value))}
                  />
                </label>
              </>
            )}

            <CustomSelect
              label="Tipo de arbitro"
              value={tipoArbitro}
              options={arbitroOptions}
              onChange={setTipoArbitro}
            />

            <label className="tariff-field">
              <span>Valor referencial UIT</span>
              <input type="text" value={formatMoney(UIT)} readOnly />
            </label>

            <div className="tariff-toggle tariff-field--full">
              <div>
                <strong>Incluir impuesto vigente</strong>
                <p>Se aplica una tasa referencial del {(TAX_RATE * 100).toFixed(0)}% sobre el subtotal.</p>
              </div>

              <label className="tariff-switch" aria-label="Incluir impuesto vigente">
                <input
                  type="checkbox"
                  checked={incluirIgv}
                  onChange={(event) => setIncluirIgv(event.target.checked)}
                />
                <span className="tariff-switch__slider" aria-hidden="true" />
              </label>
            </div>

            <div className="tariff-actions tariff-field--full">
              <button className="roster-download roster-download--button" type="button">
                <i className="fa-solid fa-calculator" aria-hidden="true" />
                Calculo actualizado
              </button>
              <button className="tariff-clear" type="button" onClick={resetCalculator}>
                Limpiar
              </button>
            </div>

            <div className="tariff-support-row tariff-field--full">
              <article className="tariff-support-card">
                <i className="fa-solid fa-scale-balanced" aria-hidden="true" />
                <div>
                  <strong>Tramo UIT</strong>
                  <p>La tasa se define segun el rango UIT aplicable a la controversia.</p>
                </div>
              </article>

              <article className="tariff-support-card">
                <i className="fa-solid fa-users" aria-hidden="true" />
                <div>
                  <strong>Tribunal x2</strong>
                  <p>En colegiado arbitral, los honorarios se multiplican por 2.</p>
                </div>
              </article>

              <article className="tariff-support-card">
                <i className="fa-solid fa-file-pdf" aria-hidden="true" />
                <div>
                  <strong>Anexo I</strong>
                  <p>La calculadora toma como base el cuadro de tasas institucional.</p>
                </div>
              </article>
            </div>
          </div>
        </article>

        <aside className="tariff-panel tariff-panel--accent">
          <div className="tariff-panel__head">
            <p className="page-block__eyebrow">Resumen del calculo</p>
            <h3>Resultado referencial</h3>
          </div>

          <div className="tariff-stat-grid">
            <article className="tariff-stat">
              <p>Base calculable</p>
              <strong>{formatMoney(resultado.baseMonto)}</strong>
              <span>{resultado.detalleBase}</span>
            </article>

            <article className="tariff-stat">
              <p>Equivalente en UIT</p>
              <strong>{resultado.uitValue.toFixed(2)} UIT</strong>
              <span>Valor referencial UIT: {formatMoney(UIT)}</span>
            </article>

            <article className="tariff-stat">
              <p>Tramo aplicado</p>
              <strong>
                {resultado.tramo.min} a{" "}
                {resultado.tramo.max === Number.POSITIVE_INFINITY ? "mas" : resultado.tramo.max} UIT
              </strong>
              <span>{(resultado.tramo.rate * 100).toFixed(2)}% de aplicacion</span>
            </article>
          </div>

          <div className="tariff-results tariff-results--compact">
            <div className="tariff-result">
              <span>Solicitud de arbitraje</span>
              <strong>{formatMoney(resultado.solicitud)}</strong>
            </div>
            <div className="tariff-result">
              <span>Honorarios arbitrales</span>
              <strong>{formatMoney(resultado.honorarios)}</strong>
            </div>
            <div className="tariff-result">
              <span>Gastos administrativos</span>
              <strong>{formatMoney(resultado.gastosAdmin)}</strong>
            </div>
            <div className="tariff-result">
              <span>Subtotal</span>
              <strong>{formatMoney(resultado.subtotal)}</strong>
            </div>
            <div className="tariff-result">
              <span>Impuesto</span>
              <strong>{formatMoney(resultado.impuesto)}</strong>
            </div>
          </div>

          <div className="tariff-total-card">
            <p>Costo total estimado</p>
            <strong>{formatMoney(resultado.total)}</strong>
          </div>
        </aside>
      </section>

      <section className="tariff-grid">
        <article className="tariff-panel tariff-panel--soft">
          <div className="tariff-panel__head">
            <p className="page-block__eyebrow">Tasas por cuantia</p>
            <h3>Honorarios del arbitro unico y gastos de la Corte</h3>
          </div>

          <div className="tariff-table-wrap">
            <table className="tariff-table">
              <thead>
                <tr>
                  <th>Tramo</th>
                  <th>Tasa</th>
                </tr>
              </thead>
              <tbody>
                {tramos.map((tramoItem) => (
                  <tr key={tramoItem.key}>
                    <td>{tramoItem.label}</td>
                    <td>{(tramoItem.rate * 100).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="tariff-panel tariff-panel--soft">
          <div className="tariff-panel__head">
            <p className="page-block__eyebrow">Notas operativas</p>
            <h3>Criterios resumidos de aplicacion</h3>
          </div>

          <div className="tariff-criteria tariff-criteria--stack">
            <article className="tariff-criteria__item">
              <span className="tariff-criteria__dot" aria-hidden="true" />
              <div>
                <h4>No cuantificadas</h4>
                <p>Se liquidan segun el cuadro de tasas, previa cuantificacion.</p>
              </div>
            </article>

            <article className="tariff-criteria__item">
              <span className="tariff-criteria__dot" aria-hidden="true" />
              <div>
                <h4>No cuantificables</h4>
                <p>Se aplica el 2% del monto contractual por cada pretension.</p>
              </div>
            </article>

            <article className="tariff-criteria__item">
              <span className="tariff-criteria__dot" aria-hidden="true" />
              <div>
                <h4>Tribunal arbitral</h4>
                <p>El resultado de honorarios del colegiado se multiplica por 2.</p>
              </div>
            </article>
          </div>
        </article>
      </section>

      <section className="tariff-panel tariff-panel--soft">
        <div className="tariff-panel__head">
          <p className="page-block__eyebrow">Otros conceptos</p>
          <h3>Cargos fijos del cuadro de tasas</h3>
        </div>

        <div className="tariff-table-wrap">
          <table className="tariff-table tariff-table--wide">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Concepto</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {cargosFijos.map((item) => (
                <tr key={item.codigo}>
                  <td>{item.codigo}</td>
                  <td>{item.concepto}</td>
                  <td>{formatMoney(item.monto)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </section>
  );
}
