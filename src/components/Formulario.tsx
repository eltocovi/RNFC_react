import { useId, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

export type TipoCampo =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select';

export interface CampoFormulario {
  name: string;
  label: string;
  type?: TipoCampo;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  help?: string;
  disabled?: boolean;
  options?: { label: string; value: string }[];
}

export interface FormularioProps {
  campos: CampoFormulario[];
  valoresIniciales?: Record<string, string>;
  onSubmit: (valores: Record<string, string>) => void | Promise<void>;
  titulo?: string;
  descripcion?: string;
  textoBoton?: string;
  cargando?: boolean;
  error?: string;
  exito?: string;
  pie?: ReactNode;
  columnas?: 1 | 2;
  reiniciarAlEnviar?: boolean;
  className?: string;
}

const SIN_VALORES: Record<string, string> = {};

const CLASES_CONTROL =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-rnfc-red focus:bg-white focus:ring-4 focus:ring-rnfc-red/10 disabled:cursor-not-allowed disabled:opacity-60';

function construirValores(
  campos: CampoFormulario[],
  iniciales: Record<string, string>,
): Record<string, string> {
  return Object.fromEntries(
    campos.map((campo) => {
      const inicial = iniciales[campo.name];
      if (inicial !== undefined) {
        return [campo.name, inicial];
      }

      if (campo.type === 'select') {
        return [campo.name, campo.options?.[0]?.value ?? ''];
      }

      return [campo.name, ''];
    }),
  );
}

export default function Formulario({
  campos,
  valoresIniciales = SIN_VALORES,
  onSubmit,
  titulo,
  descripcion,
  textoBoton = 'Enviar',
  cargando = false,
  error,
  exito,
  pie,
  columnas = 1,
  reiniciarAlEnviar = false,
  className = '',
}: FormularioProps) {
  const identificador = useId();
  const [valores, setValores] = useState<Record<string, string>>(() =>
    construirValores(campos, valoresIniciales),
  );

  function actualizarCampo(name: string, valor: string): void {
    setValores((actuales) => ({ ...actuales, [name]: valor }));
  }

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>): Promise<void> {
    evento.preventDefault();

    const formulario = evento.currentTarget;
    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      return;
    }

    if (cargando) {
      return;
    }

    await onSubmit(valores);

    if (reiniciarAlEnviar) {
      setValores(construirValores(campos, valoresIniciales));
    }
  }

  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 ${className}`}
    >
      {(titulo || descripcion) && (
        <div className="mb-6">
          {titulo && (
            <div className="flex items-center gap-3">
              <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-rnfc-red to-rnfc-red-dark" />
              <h2 className="font-display text-3xl leading-none tracking-wide text-slate-900">
                {titulo}
              </h2>
            </div>
          )}
          {descripcion && <p className="mt-3 text-sm leading-relaxed text-slate-500">{descripcion}</p>}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <svg className="mt-0.5 h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 8v5m0 3h.01M10.3 4.2 2.8 17.5A1.8 1.8 0 0 0 4.3 20h15.4a1.8 1.8 0 0 0 1.5-2.5L13.7 4.2a1.9 1.9 0 0 0-3.4 0Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {exito && (
        <div
          role="status"
          className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        >
          <svg className="mt-0.5 h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m5 12.5 4.3 4.3L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{exito}</span>
        </div>
      )}

      <form className="space-y-5" onSubmit={manejarEnvio} noValidate={false}>
        <div className={`grid gap-5 ${columnas === 2 ? 'sm:grid-cols-2' : ''}`}>
          {campos.map((campo) => {
            const id = `${identificador}-${campo.name}`;
            const tipo = campo.type ?? 'text';
            const esAnchoCompleto = tipo === 'textarea';

            return (
              <div key={campo.name} className={esAnchoCompleto ? 'sm:col-span-full' : ''}>
                <label
                  htmlFor={id}
                  className="mb-2 block text-[0.72rem] font-bold uppercase tracking-[0.14em] text-slate-500"
                >
                  {campo.label}
                  {campo.required && <span className="ml-1 text-rnfc-red">*</span>}
                </label>

                {tipo === 'textarea' ? (
                  <textarea
                    id={id}
                    name={campo.name}
                    value={valores[campo.name] ?? ''}
                    onChange={(evento) => actualizarCampo(campo.name, evento.target.value)}
                    placeholder={campo.placeholder}
                    required={campo.required}
                    disabled={campo.disabled || cargando}
                    rows={5}
                    className={`${CLASES_CONTROL} min-h-32 resize-y`}
                  />
                ) : tipo === 'select' ? (
                  <select
                    id={id}
                    name={campo.name}
                    value={valores[campo.name] ?? ''}
                    onChange={(evento) => actualizarCampo(campo.name, evento.target.value)}
                    required={campo.required}
                    disabled={campo.disabled || cargando}
                    className={CLASES_CONTROL}
                  >
                    {campo.options?.map((opcion) => (
                      <option key={opcion.value} value={opcion.value}>
                        {opcion.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={id}
                    name={campo.name}
                    type={tipo}
                    value={valores[campo.name] ?? ''}
                    onChange={(evento) => actualizarCampo(campo.name, evento.target.value)}
                    placeholder={campo.placeholder}
                    autoComplete={campo.autoComplete}
                    required={campo.required}
                    minLength={campo.minLength}
                    disabled={campo.disabled || cargando}
                    className={CLASES_CONTROL}
                  />
                )}

                {campo.help && <p className="mt-1.5 text-xs text-slate-400">{campo.help}</p>}
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-rnfc-red to-rnfc-red-dark px-5 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-rnfc-red/20 transition hover:from-rnfc-red-dark hover:to-rnfc-red-dark focus:outline-none focus:ring-4 focus:ring-rnfc-red/25 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {cargando && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {cargando ? 'Procesando...' : textoBoton}
        </button>

        {pie && <div className="border-t border-slate-100 pt-5">{pie}</div>}
      </form>
    </div>
  );
}
