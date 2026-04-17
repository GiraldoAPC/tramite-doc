import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const UIT = 5350;
const IGV_RATE = 0.18;
const RECEIPT_RATE = 0.08;
const NON_QUANTIFIABLE_RATE = 0.02;
const REQUEST_FEE = 500;

const tariffBands = [
  { key: "0-1", label: "Cuantía entre 0 y 1 UIT", min: 0, max: 5350, rate: 0.05 },
  { key: "1-2", label: "Cuantía entre 1 y 2 UIT", min: 5351, max: 10700, rate: 0.05 },
  { key: "2-3", label: "Cuantía entre 2 y 3 UIT", min: 10701, max: 16050, rate: 0.05 },
  { key: "3-4", label: "Cuantía entre 3 y 4 UIT", min: 16051, max: 21400, rate: 0.05 },
  { key: "4-5", label: "Cuantía entre 4 y 5 UIT", min: 21401, max: 26750, rate: 0.045 },
  { key: "5-10", label: "Cuantía entre 5 y 10 UIT", min: 26751, max: 53500, rate: 0.045 },
  { key: "10-20", label: "Cuantía entre 10 y 20 UIT", min: 53501, max: 107000, rate: 0.04 },
  { key: "20-50", label: "Cuantía entre 20 y 50 UIT", min: 107001, max: 267500, rate: 0.035 },
  { key: "50-100", label: "Cuantía entre 50 y 100 UIT", min: 267501, max: 535000, rate: 0.035 },
  { key: "100-200", label: "Cuantía entre 100 y 200 UIT", min: 535001, max: 1070000, rate: 0.03 },
  { key: "200+", label: "Cuantía mayor a 200 UIT", min: 1070001, max: Number.POSITIVE_INFINITY, rate: 0.025 },
];

const serviceFeeGroups = [
  {
    title: "Organización y administración",
    eyebrow: "Actuaciones arbitrales",
    items: [
      { code: "AR-01", concept: "Presentación de solicitud de arbitraje", amount: "S/ 500.00" },
      { code: "AR-02", concept: "Honorarios del árbitro único", amount: "Según cuantía" },
      {
        code: "AR-03",
        concept: "Gastos administrativos de la Corte de Arbitraje",
        amount: "Según cuantía",
      },
    ],
  },
  {
    title: "Designación y recusación",
    eyebrow: "Montos fijos",
    items: [
      { code: "DA-01", concept: "Designación de árbitro", amount: "S/ 500.00" },
      {
        code: "RR-01",
        concept: "Resolución de recusación de un (1) árbitro",
        amount: "S/ 500.00",
      },
      {
        code: "RR-02",
        concept: "Resolución de recusación de dos (2) árbitros",
        amount: "S/ 750.00",
      },
      {
        code: "RR-03",
        concept: "Resolución de recusación de tres (3) árbitros",
        amount: "S/ 1,000.00",
      },
    ],
  },
  {
    title: "Registro y emisión de copias",
    eyebrow: "Servicios complementarios",
    items: [
      {
        code: "RA-01",
        concept: "Postulación a la inscripción al registro de árbitros",
        amount: "S/ 100.00",
      },
      { code: "RA-02", concept: "Inscripción al registro de árbitros", amount: "S/ 500.00" },
      { code: "RA-03", concept: "Renovación del registro de árbitros", amount: "S/ 500.00" },
      { code: "EC-01", concept: "Emisión de copias simples (por página)", amount: "S/ 1.00" },
      {
        code: "EC-02",
        concept: "Emisión de copias certificadas (por página)",
        amount: "S/ 3.00",
      },
      {
        code: "CA-01",
        concept:
          "Resolución de incidencias relacionadas a la primera liquidación y liquidaciones adicionales de costos arbitrales",
        amount: "S/ 500.00",
      },
    ],
  },
];

const tariffNotes = [
  "Tratándose de un tribunal de tres (3) árbitros, el resultado de honorarios debe multiplicarse por 2, siendo este el pago total del colegiado.",
  "Si las pretensiones no han sido cuantificadas por el proponente, la liquidación se realiza conforme al Cuadro de Tasas, previa cuantificación.",
  "Si las pretensiones son no cuantificables, la liquidación se realiza sobre el 2% del monto contractual por cada pretensión.",
  "La liquidación final integra las pretensiones cuantificadas, no cuantificadas y no cuantificables, según corresponda.",
];

function getBandForAmount(amount) {
  return tariffBands.find((band) => amount >= band.min && amount <= band.max) ?? tariffBands[0];
}

function formatMoney(value) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(Number(value || 0));
}

function normalizeAmount(value) {
  const clean = String(value ?? "").trim().replace(/\s+/g, "");

  if (!clean) return Number.NaN;

  const hasComma = clean.includes(",");
  const hasDot = clean.includes(".");

  if (hasComma && hasDot) {
    const decimalSeparator = clean.lastIndexOf(",") > clean.lastIndexOf(".") ? "," : ".";
    const thousandsSeparator = decimalSeparator === "," ? "." : ",";
    const normalized = clean
      .split(thousandsSeparator)
      .join("")
      .replace(decimalSeparator, ".");

    return Number(normalized);
  }

  if (hasComma) {
    return Number(clean.replace(/\./g, "").replace(",", "."));
  }

  return Number(clean.replace(/,/g, ""));
}

function parsePretensionAmounts(source) {
  return String(source ?? "")
    .split(/\r?\n|;/)
    .map((item) => normalizeAmount(item))
    .filter((item) => Number.isFinite(item) && item > 0);
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
  const [pretensionesTexto, setPretensionesTexto] = useState("");
  const [tipoArbitro, setTipoArbitro] = useState("unico");
  const [tipoComprobante, setTipoComprobante] = useState("factura");
  const [pretension, setPretension] = useState("cuantificada");
  const [montoContractual, setMontoContractual] = useState("");
  const [cantidadPretensiones, setCantidadPretensiones] = useState(1);
  const [resultadoAbierto, setResultadoAbierto] = useState(false);
  const [resultadoVisible, setResultadoVisible] = useState(false);

  const pretensionOptions = [
    { value: "cuantificada", label: "Pretensión cuantificada" },
    { value: "no_cuantificable", label: "Pretensión no cuantificable" },
  ];

  const arbitroOptions = [
    { value: "unico", label: "Árbitro único" },
    { value: "tribunal", label: "Tribunal arbitral (3 árbitros)" },
  ];

  const comprobanteOptions = [
    { value: "factura", label: "Factura (IGV 18%)" },
    { value: "recibo", label: "Recibo por honorarios (8%)" },
  ];

  const pretensionTitle =
    pretensionOptions.find((option) => option.value === pretension)?.label ?? "Pretensión";

  const pretensionesProcesadasTexto =
    pretension === "no_cuantificable"
      ? "Cantidad de pretensiones consideradas en el cálculo sobre el monto contractual ingresado."
      : "Cantidad de pretensiones válidas tomadas del listado de montos ingresados.";

  const resultado = useMemo(() => {
    let pretensionBases = parsePretensionAmounts(pretensionesTexto);
    let detalleBase = "Se aplica el Cuadro de Tasas 2025 a cada pretensión ingresada.";

    if (pretension === "no_cuantificable") {
      const basePorPretension = (Number(montoContractual) || 0) * NON_QUANTIFIABLE_RATE;
      const cantidad = Math.max(1, Number(cantidadPretensiones) || 1);
      pretensionBases = Array.from({ length: cantidad }, () => basePorPretension);
      detalleBase =
        "Las pretensiones no cuantificables se liquidan sobre el 2% del monto contractual por cada pretensión.";
    } else {
      detalleBase =
        "Se aplica el Cuadro de Tasas 2025 a cada pretensión cuantificable ingresada.";
    }

    const items = pretensionBases.map((baseMonto, index) => {
      const tramo = getBandForAmount(baseMonto);
      const conceptoBase = baseMonto * tramo.rate;

      return {
        id: index + 1,
        baseMonto,
        tramo,
        conceptoBase,
      };
    });

    const totalBase = items.reduce((sum, item) => sum + item.baseMonto, 0);
    const conceptoBaseTotal = items.reduce((sum, item) => sum + item.conceptoBase, 0);
    const multiplicadorArbitro = tipoArbitro === "tribunal" ? 2 : 1;
    const gastosAdministrativosBase = REQUEST_FEE + conceptoBaseTotal;
    const gastosAdministrativosIgv = gastosAdministrativosBase * IGV_RATE;
    const gastosAdministrativosTotal = gastosAdministrativosBase + gastosAdministrativosIgv;
    const honorariosTribunalBase = conceptoBaseTotal * multiplicadorArbitro;
    const honorariosTribunalTasa = tipoComprobante === "factura" ? IGV_RATE : RECEIPT_RATE;
    const honorariosTribunalImpuesto = honorariosTribunalBase * honorariosTribunalTasa;
    const honorariosTribunalTotal = honorariosTribunalBase + honorariosTribunalImpuesto;
    const total = gastosAdministrativosTotal + honorariosTribunalTotal;
    const bandSummary = [...new Set(items.map((item) => item.tramo.label))];

    return {
      items,
      totalBase,
      detalleBase,
      tipoComprobante,
      gastosAdministrativosBase,
      gastosAdministrativosIgv,
      gastosAdministrativosTotal,
      honorariosTribunalBase,
      honorariosTribunalImpuesto,
      honorariosTribunalTotal,
      total,
      bandSummary,
    };
  }, [
    cantidadPretensiones,
    montoContractual,
    pretension,
    pretensionesTexto,
    tipoArbitro,
    tipoComprobante,
  ]);

  const openResultado = () => {
    setResultadoAbierto(true);
  };

  const closeResultado = () => {
    setResultadoVisible(false);
    window.setTimeout(() => {
      setResultadoAbierto(false);
    }, 220);
  };

  const resetCalculator = () => {
    setPretensionesTexto("");
    setTipoArbitro("unico");
    setTipoComprobante("factura");
    setPretension("cuantificada");
    setMontoContractual("");
    setCantidadPretensiones(1);
    setResultadoVisible(false);
    setResultadoAbierto(false);
  };

  useEffect(() => {
    if (!resultadoAbierto) return undefined;

    const frame = window.requestAnimationFrame(() => {
      setResultadoVisible(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [resultadoAbierto]);

  useEffect(() => {
    if (!resultadoAbierto) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") closeResultado();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [resultadoAbierto]);

  useEffect(() => {
    document.body.classList.toggle("tariff-print-open", resultadoAbierto);

    return () => {
      document.body.classList.remove("tariff-print-open");
    };
  }, [resultadoAbierto]);

  return (
    <section className="public-shell page-block">
      <section className="tariff-hero">
        <div className="tariff-hero__copy">
          <h3>Calculadora de costos arbitrales</h3>
          <p>
            El cálculo sigue el archivo <strong>Cálculo 2025</strong> y la fórmula
            de pretensiones no cuantificables sobre el 2% del monto contractual por
            cada pretensión. Los resultados separan gastos administrativos y
            honorarios del tribunal arbitral según el comprobante seleccionado.
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
            <h3>Configuración de la liquidación</h3>
          </div>

          <div className="tariff-config-layout">
            <div className="tariff-form tariff-form--stack">
              <CustomSelect
                label="Tipo de pretensión"
                value={pretension}
                options={pretensionOptions}
                onChange={setPretension}
                fullWidth
              />

              {pretension === "no_cuantificable" ? (
                <>
                  <label className="tariff-field">
                    <span>Monto contractual (S/)</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={montoContractual}
                      onChange={(event) => setMontoContractual(event.target.value)}
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
              ) : (
                <label className="tariff-field tariff-field--full">
                  <span>Montos de las pretensiones (uno por línea)</span>
                  <textarea
                    rows="6"
                    value={pretensionesTexto}
                    onChange={(event) => setPretensionesTexto(event.target.value)}
                    placeholder={"Ejemplo:\n15000\n32500.50\n78000"}
                  />
                </label>
              )}

              <CustomSelect
                label="Tipo de árbitro"
                value={tipoArbitro}
                options={arbitroOptions}
                onChange={setTipoArbitro}
              />

              <CustomSelect
                label="Comprobante del árbitro"
                value={tipoComprobante}
                options={comprobanteOptions}
                onChange={setTipoComprobante}
              />

              <label className="tariff-field">
                <span>Valor referencial UIT 2025</span>
                <input type="text" value={formatMoney(UIT)} readOnly />
              </label>

              <div className="tariff-actions tariff-field--full">
                <button
                  className="roster-download roster-download--button"
                  type="button"
                  onClick={openResultado}
                >
                  <i className="fa-solid fa-calculator" aria-hidden="true" />
                  Calcular
                </button>
                <button className="tariff-clear" type="button" onClick={resetCalculator}>
                  Limpiar
                </button>
              </div>
            </div>

            <aside className="tariff-support-row">
              <article className="tariff-support-card">
                <i className="fa-solid fa-circle-info" aria-hidden="true" />
                <div>
                  <strong>Indicaciones de uso</strong>
                  <p>
                    Ingrese un monto por línea si la pretensión es cuantificada. Si no lo
                    es, use el monto contractual y la cantidad de pretensiones para aplicar
                    el 2%. Luego elija si el árbitro emitirá factura o recibo por
                    honorarios.
                  </p>
                </div>
              </article>
              <article className="tariff-support-card">
                <i className="fa-solid fa-table-list" aria-hidden="true" />
                <div>
                  <strong>Resultado en ventana emergente</strong>
                  <p>
                    Al presionar Calcular se abrirá un modal con el resumen del cálculo y
                    el detalle por pretensión.
                  </p>
                </div>
              </article>
            </aside>
          </div>
        </article>
      </section>

      <section className="tariff-reference-section">
        <div className="tariff-reference-section__head">
          <p className="page-block__eyebrow">Anexo I</p>
          <h3>Cuadro de tasas institucional</h3>
          <p>
            Resumen tabulado del PDF oficial con tasas por cuantía, montos fijos y notas
            de aplicación para la liquidación de costos arbitrales.
          </p>
        </div>

        <div className="tariff-reference-grid">
          <article className="tariff-panel tariff-panel--accent tariff-reference-card tariff-reference-card--wide">
            <div className="tariff-panel__head">
              <p className="page-block__eyebrow">Actuaciones arbitrales</p>
              <h3>Organización y administración</h3>
            </div>

            <div className="tariff-reference-list">
              {serviceFeeGroups[0].items.map((item) => (
                <div key={item.code} className="tariff-reference-list__item">
                  <div>
                    <strong>{item.code}</strong>
                    <span>{item.concept}</span>
                  </div>
                  <em>{item.amount}</em>
                </div>
              ))}
            </div>

            <div className="tariff-table-wrap tariff-reference-card__table">
              <table className="tariff-table">
                <thead>
                  <tr>
                    <th>Tramo</th>
                    <th>Tasa</th>
                  </tr>
                </thead>
                <tbody>
                  {tariffBands.map((band) => (
                    <tr key={band.key}>
                      <td>{band.label}</td>
                      <td>{(band.rate * 100).toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          {serviceFeeGroups.slice(1).map((group) => (
            <article key={group.title} className="tariff-panel tariff-reference-card">
              <div className="tariff-panel__head">
                <p className="page-block__eyebrow">{group.eyebrow}</p>
                <h3>{group.title}</h3>
              </div>

              <div className="tariff-reference-list">
                {group.items.map((item) => (
                  <div key={item.code} className="tariff-reference-list__item">
                    <div>
                      <strong>{item.code}</strong>
                      <span>{item.concept}</span>
                    </div>
                    <em>{item.amount}</em>
                  </div>
                ))}
              </div>
            </article>
          ))}

          <article className="tariff-panel tariff-reference-card tariff-reference-card--wide">
            <div className="tariff-panel__head">
              <p className="page-block__eyebrow">Criterios de aplicación</p>
              <h3>Notas operativas del cuadro tarifario</h3>
            </div>

            <div className="tariff-criteria tariff-criteria--stack">
              {tariffNotes.map((note) => (
                <article key={note} className="tariff-criteria__item">
                  <span className="tariff-criteria__dot" aria-hidden="true" />
                  <div>
                    <p>{note}</p>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      {resultadoAbierto
        ? createPortal(
            <div
              className={`public-modal-backdrop tariff-detail-modal-backdrop${
                resultadoVisible ? " is-open" : ""
              }`}
              role="presentation"
              onClick={closeResultado}
            >
              <section
                className={`public-modal tariff-detail-modal${resultadoVisible ? " is-open" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="tariff-result-title"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="public-modal__head">
                  <div>
                    <p className="public-modal__eyebrow">Resumen del cálculo</p>
                    <h2 id="tariff-result-title">{pretensionTitle}</h2>
                    <p>
                      Revise el costo estimado, los conceptos liquidados y el detalle
                      aplicado a cada pretensión procesada.
                    </p>
                  </div>

                  <div className="tariff-detail-modal__head-actions">
                    <button
                      className="tariff-detail-modal__print"
                      type="button"
                      onClick={() => window.print()}
                    >
                      <i className="fa-solid fa-print" aria-hidden="true" />
                      Imprimir
                    </button>
                    <button
                      className="public-modal__close"
                      type="button"
                      onClick={closeResultado}
                      aria-label="Cerrar resultado"
                    >
                      <i className="fa-solid fa-xmark" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="tariff-stat-grid tariff-detail-modal__stats">
                  <article className="tariff-stat">
                    <p>Pretensiones procesadas</p>
                    <strong>{resultado.items.length}</strong>
                    <span>{pretensionesProcesadasTexto}</span>
                  </article>

                  <article className="tariff-stat">
                    <p>Base liquidable total</p>
                    <strong>{formatMoney(resultado.totalBase)}</strong>
                    <span>{resultado.detalleBase}</span>
                  </article>

                  <article className="tariff-stat">
                    <p>Tramos aplicados</p>
                    <strong>{resultado.bandSummary.length}</strong>
                    <span>
                      {resultado.bandSummary.length
                        ? resultado.bandSummary.join(" | ")
                        : "Aún no hay montos válidos para liquidar."}
                    </span>
                  </article>
                </div>

                <div className="tariff-detail-modal__concepts">
                  <article className="tariff-concept-card">
                    <p className="tariff-concept-card__title">Gastos administrativos</p>
                    <div className="tariff-results tariff-results--compact">
                      <div className="tariff-result">
                        <span>Base</span>
                        <strong>{formatMoney(resultado.gastosAdministrativosBase)}</strong>
                      </div>
                      <div className="tariff-result">
                        <span>IGV (18%)</span>
                        <strong>{formatMoney(resultado.gastosAdministrativosIgv)}</strong>
                      </div>
                      <div className="tariff-result">
                        <span>Total gastos administrativos</span>
                        <strong>{formatMoney(resultado.gastosAdministrativosTotal)}</strong>
                      </div>
                    </div>
                  </article>

                  <article className="tariff-concept-card">
                    <p className="tariff-concept-card__title">Honorarios del tribunal arbitral</p>
                    <div className="tariff-results tariff-results--compact">
                      <div className="tariff-result">
                        <span>Base</span>
                        <strong>{formatMoney(resultado.honorariosTribunalBase)}</strong>
                      </div>
                      <div className="tariff-result">
                        <span>
                          {resultado.tipoComprobante === "factura"
                            ? "IGV (18%)"
                            : "Retención (8%)"}
                        </span>
                        <strong>{formatMoney(resultado.honorariosTribunalImpuesto)}</strong>
                      </div>
                      <div className="tariff-result">
                        <span>Total honorarios del tribunal</span>
                        <strong>{formatMoney(resultado.honorariosTribunalTotal)}</strong>
                      </div>
                    </div>
                  </article>
                </div>

                <div className="tariff-total-card tariff-detail-modal__total">
                  <p>Costo total estimado</p>
                  <strong>{formatMoney(resultado.total)}</strong>
                </div>

                {resultado.items.length ? (
                  <div className="tariff-table-wrap tariff-detail-modal__table">
                    <table className="tariff-table">
                      <thead>
                        <tr>
                          <th>Pretensión</th>
                          <th>Base liquidable</th>
                          <th>Tasa</th>
                          <th>Tramo aplicado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultado.items.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{formatMoney(item.baseMonto)}</td>
                            <td>{(item.tramo.rate * 100).toFixed(2)}%</td>
                            <td>{item.tramo.label}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="tariff-note tariff-detail-modal__empty">
                    <p className="tariff-source">
                      Todavía no hay pretensiones válidas para mostrar en el detalle.
                    </p>
                  </div>
                )}
              </section>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
