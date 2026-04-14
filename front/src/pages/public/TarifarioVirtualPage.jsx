import { useEffect, useMemo, useRef, useState } from "react";

const UIT = 5350;
const TAX_RATE = 0.18;
const NON_QUANTIFIABLE_RATE = 0.02;
const REQUEST_FEE = 500;

const tariffBands = [
  { key: "0-1", label: "Cuantia entre 0 y 1 UIT", min: 0, max: 5350, rate: 0.05 },
  { key: "1-2", label: "Cuantia entre >1 y 2 UIT", min: 5351, max: 10700, rate: 0.05 },
  { key: "2-3", label: "Cuantia entre 2 y 3 UIT", min: 10701, max: 16050, rate: 0.05 },
  { key: "3-4", label: "Cuantia entre 3 y 4 UIT", min: 16051, max: 21400, rate: 0.05 },
  { key: "4-5", label: "Cuantia entre 4 y 5 UIT", min: 21401, max: 26750, rate: 0.045 },
  { key: "5-10", label: "Cuantia entre 5 y 10 UIT", min: 26751, max: 53500, rate: 0.045 },
  { key: "10-20", label: "Cuantia entre 10 y 20 UIT", min: 53501, max: 107000, rate: 0.04 },
  { key: "20-50", label: "Cuantia entre 20 y 50 UIT", min: 107001, max: 267500, rate: 0.035 },
  { key: "50-100", label: "Cuantia entre 50 y 100 UIT", min: 267501, max: 535000, rate: 0.035 },
  { key: "100-200", label: "Cuantia entre 100 y 200 UIT", min: 535001, max: 1070000, rate: 0.03 },
  { key: "200+", label: "Cuantia mayor a 200 UIT", min: 1070001, max: Number.POSITIVE_INFINITY, rate: 0.025 },
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
  const [pretension, setPretension] = useState("cuantificada");
  const [montoContractual, setMontoContractual] = useState("");
  const [cantidadPretensiones, setCantidadPretensiones] = useState(1);

  const pretensionOptions = [
    { value: "cuantificada", label: "Pretension cuantificada" },
    { value: "no_cuantificable", label: "Pretension no cuantificable" },
  ];

  const arbitroOptions = [
    { value: "unico", label: "Arbitro unico" },
    { value: "tribunal", label: "Tribunal arbitral (3 arbitros)" },
  ];

  const resultado = useMemo(() => {
    const solicitud = REQUEST_FEE;
    let pretensionBases = parsePretensionAmounts(pretensionesTexto);
    let detalleBase = "Se aplica el Cuadro de Tasas 2025 a cada pretension ingresada.";

    if (pretension === "no_cuantificable") {
      const basePorPretension = (Number(montoContractual) || 0) * NON_QUANTIFIABLE_RATE;
      const cantidad = Math.max(1, Number(cantidadPretensiones) || 1);
      pretensionBases = Array.from({ length: cantidad }, () => basePorPretension);
      detalleBase =
        "Las pretensiones no cuantificables se liquidan sobre el 2% del monto contractual por cada pretension.";
    } else {
      detalleBase =
        "Se aplica el Cuadro de Tasas 2025 a cada pretension cuantificable ingresada.";
    }

    const items = pretensionBases.map((baseMonto, index) => {
      const tramo = getBandForAmount(baseMonto);
      const honorariosBase = baseMonto * tramo.rate;
      const gastosAdmin = baseMonto * tramo.rate;

      return {
        id: index + 1,
        baseMonto,
        tramo,
        honorariosBase,
        gastosAdmin,
      };
    });

    const totalBase = items.reduce((sum, item) => sum + item.baseMonto, 0);
    const honorariosBase = items.reduce((sum, item) => sum + item.honorariosBase, 0);
    const gastosAdmin = items.reduce((sum, item) => sum + item.gastosAdmin, 0);
    const multiplicadorArbitro = tipoArbitro === "tribunal" ? 2 : 1;
    const honorarios = honorariosBase * multiplicadorArbitro;
    const subtotal = solicitud + honorarios + gastosAdmin;
    const impuesto = subtotal * TAX_RATE;
    const total = subtotal + impuesto;
    const bandSummary = [...new Set(items.map((item) => item.tramo.label))];

    return {
      solicitud,
      items,
      totalBase,
      detalleBase,
      honorariosBase,
      multiplicadorArbitro,
      honorarios,
      gastosAdmin,
      subtotal,
      impuesto,
      total,
      bandSummary,
    };
  }, [cantidadPretensiones, montoContractual, pretension, pretensionesTexto, tipoArbitro]);

  const resetCalculator = () => {
    setPretensionesTexto("");
    setTipoArbitro("unico");
    setPretension("cuantificada");
    setMontoContractual("");
    setCantidadPretensiones(1);
  };

  return (
    <section className="public-shell page-block">
      <section className="tariff-hero">
        <div className="tariff-hero__copy">
          <h3>Calculadora de costos arbitrales</h3>
          <p>
            El calculo sigue el archivo <strong>Calculo 2025</strong> y la formula
            de pretensiones no cuantificables sobre el 2% del monto contractual por
            cada pretension. Los resultados ya incluyen IGV del 18%.
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
                <span>Montos de las pretensiones (uno por linea)</span>
                <textarea
                  rows="6"
                  value={pretensionesTexto}
                  onChange={(event) => setPretensionesTexto(event.target.value)}
                  placeholder={"Ejemplo:\n15000\n32500.50\n78000"}
                />
              </label>
            )}

            <CustomSelect
              label="Tipo de arbitro"
              value={tipoArbitro}
              options={arbitroOptions}
              onChange={setTipoArbitro}
            />

            <label className="tariff-field">
              <span>Valor referencial UIT 2025</span>
              <input type="text" value={formatMoney(UIT)} readOnly />
            </label>

            <div className="tariff-actions tariff-field--full">
              <button className="roster-download roster-download--button" type="button">
                <i className="fa-solid fa-calculator" aria-hidden="true" />
                Calculo actualizado
              </button>
              <button className="tariff-clear" type="button" onClick={resetCalculator}>
                Limpiar
              </button>
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
              <p>Pretensiones procesadas</p>
              <strong>{resultado.items.length}</strong>
              <span>Ingrese una por linea para aplicar el tarifario segun cada cuantia.</span>
            </article>

            <article className="tariff-stat">
              <p>Base liquidable total</p>
              <strong>{formatMoney(resultado.totalBase)}</strong>
              <span>{resultado.detalleBase}</span>
            </article>

            <article className="tariff-stat">
              <p>Tramos aplicados</p>
              <strong>{resultado.bandSummary.length ? resultado.bandSummary.length : 0}</strong>
              <span>
                {resultado.bandSummary.length
                  ? resultado.bandSummary.join(" | ")
                  : "Aun no hay montos validos para liquidar."}
              </span>
            </article>
          </div>

          <div className="tariff-results tariff-results--compact">
            <div className="tariff-result">
              <span>Solicitud de arbitraje</span>
              <strong>{formatMoney(resultado.solicitud)}</strong>
            </div>
            <div className="tariff-result">
              <span>Honorarios base</span>
              <strong>{formatMoney(resultado.honorariosBase)}</strong>
            </div>
            <div className="tariff-result">
              <span>Factor por tipo de arbitro</span>
              <strong>x{resultado.multiplicadorArbitro}</strong>
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
              <span>IGV</span>
              <strong>{formatMoney(resultado.impuesto)}</strong>
            </div>
          </div>

          <div className="tariff-total-card">
            <p>Costo total estimado</p>
            <strong>{formatMoney(resultado.total)}</strong>
          </div>

          {resultado.items.length ? (
            <div className="tariff-note">
              <p className="tariff-source">
                Detalle por pretension:
              </p>
              <div className="tariff-breakdown">
                {resultado.items.slice(0, 6).map((item) => (
                  <div className="tariff-breakdown__item" key={item.id}>
                    <strong>Pretension {item.id}</strong>
                    <span>
                      {formatMoney(item.baseMonto)} | {(item.tramo.rate * 100).toFixed(2)}% | {item.tramo.label}
                    </span>
                  </div>
                ))}
                {resultado.items.length > 6 ? (
                  <div className="tariff-breakdown__item">
                    <strong>Adicionales</strong>
                    <span>Se han considerado {resultado.items.length - 6} pretensiones mas en el total.</span>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </aside>
      </section>

    </section>
  );
}
